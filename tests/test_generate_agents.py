import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = REPO_ROOT / "scripts" / "generate_agents.py"


def fixture_manifest() -> dict[str, object]:
    return {
        "version": 1,
        "generated_notice": "<!-- test generated -->",
        "section_order": [
            "Scope",
            "Working Approach",
            "Directory-Specific Guidance",
        ],
        "global_sections": {
            "Scope": ["Root scope."],
            "Working Approach": ["- Shared rule."],
        },
        "targets": [
            {"path": ".", "overrides": {}, "additions": {}},
            {
                "path": ".github",
                "overrides": {"Scope": ["GitHub scope override."]},
                "additions": {
                    "Working Approach": ["- GitHub extension."],
                    "Directory-Specific Guidance": ["- GitHub local note."],
                },
            },
            {
                "path": "openspec",
                "overrides": {"Working Approach": ["- OpenSpec override."]},
                "additions": {},
            },
        ],
    }


class GenerateAgentsTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.repo_root = Path(self.temp_dir.name)
        (self.repo_root / ".github").mkdir()
        (self.repo_root / "openspec").mkdir()
        manifest_path = self.repo_root / "agents-manifest.json"
        manifest_path.write_text(json.dumps(fixture_manifest(), indent=2), encoding="utf-8")

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def run_cli(self, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT_PATH), *args, "--root", str(self.repo_root)],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_write_generates_root_and_directory_targets(self) -> None:
        result = self.run_cli("write")
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        root_text = (self.repo_root / "AGENTS.md").read_text(encoding="utf-8")
        github_text = (self.repo_root / ".github" / "AGENTS.md").read_text(encoding="utf-8")
        openspec_text = (self.repo_root / "openspec" / "AGENTS.md").read_text(encoding="utf-8")

        self.assertIn("# AGENTS.md", root_text)
        self.assertIn("## Scope", root_text)
        self.assertIn("Root scope.", root_text)

        self.assertIn("GitHub scope override.", github_text)
        self.assertIn("- Shared rule.", github_text)
        self.assertIn("- GitHub extension.", github_text)
        self.assertIn("## Directory-Specific Guidance", github_text)
        self.assertIn("- GitHub local note.", github_text)

        self.assertIn("- OpenSpec override.", openspec_text)
        self.assertNotIn("- Shared rule.", openspec_text)

    def test_check_mode_passes_after_write(self) -> None:
        self.assertEqual(self.run_cli("write").returncode, 0)
        result = self.run_cli("check")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("up to date", result.stdout)

    def test_check_mode_reports_missing_and_outdated_files(self) -> None:
        self.assertEqual(self.run_cli("write").returncode, 0)

        root_path = self.repo_root / "AGENTS.md"
        root_path.write_text(root_path.read_text(encoding="utf-8") + "\n# drift\n", encoding="utf-8")
        (self.repo_root / ".github" / "AGENTS.md").unlink()

        result = self.run_cli("check")
        self.assertEqual(result.returncode, 1)
        self.assertIn("OUTDATED AGENTS.md", result.stderr)
        self.assertIn("MISSING  .github/AGENTS.md", result.stderr)


if __name__ == "__main__":
    unittest.main()
