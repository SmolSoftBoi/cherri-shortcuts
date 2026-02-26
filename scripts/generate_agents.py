#!/usr/bin/env python3
"""Generate and validate repository AGENTS.md files from a manifest."""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Mapping, Sequence


ManifestLines = List[str]
SectionMap = Dict[str, ManifestLines]


class ManifestError(ValueError):
    """Raised when the manifest shape is invalid."""


@dataclass(frozen=True)
class TargetConfig:
    path: str
    overrides: SectionMap
    additions: SectionMap


@dataclass(frozen=True)
class Manifest:
    generated_notice: str
    section_order: List[str]
    global_sections: SectionMap
    targets: List[TargetConfig]


def _expect_mapping(value: object, field: str) -> Mapping[str, object]:
    if not isinstance(value, dict):
        raise ManifestError(f"Expected '{field}' to be an object")
    return value


def _expect_string_list(value: object, field: str) -> List[str]:
    if not isinstance(value, list) or not all(isinstance(item, str) for item in value):
        raise ManifestError(f"Expected '{field}' to be an array of strings")
    return list(value)


def _parse_sections(value: object, field: str) -> SectionMap:
    raw_sections = _expect_mapping(value, field)
    sections: SectionMap = {}
    for section_name, lines_value in raw_sections.items():
        if not isinstance(section_name, str):
            raise ManifestError(f"Expected section names in '{field}' to be strings")
        sections[section_name] = _expect_string_list(lines_value, f"{field}.{section_name}")
    return sections


def load_manifest(manifest_path: Path) -> Manifest:
    try:
        raw = json.loads(manifest_path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ManifestError(f"Manifest not found: {manifest_path}") from exc
    except json.JSONDecodeError as exc:
        raise ManifestError(f"Invalid JSON in manifest {manifest_path}: {exc}") from exc

    root = _expect_mapping(raw, "manifest")
    generated_notice = root.get("generated_notice")
    if not isinstance(generated_notice, str) or not generated_notice.strip():
        raise ManifestError("Expected 'generated_notice' to be a non-empty string")

    section_order = _expect_string_list(root.get("section_order"), "section_order")
    global_sections = _parse_sections(root.get("global_sections"), "global_sections")

    raw_targets = root.get("targets")
    if not isinstance(raw_targets, list):
        raise ManifestError("Expected 'targets' to be an array")

    targets: List[TargetConfig] = []
    seen_paths: set[str] = set()
    for index, raw_target in enumerate(raw_targets):
        target_obj = _expect_mapping(raw_target, f"targets[{index}]")
        path_value = target_obj.get("path")
        if not isinstance(path_value, str) or not path_value:
            raise ManifestError(f"Expected targets[{index}].path to be a non-empty string")
        if path_value in seen_paths:
            raise ManifestError(f"Duplicate target path '{path_value}' in manifest")
        seen_paths.add(path_value)
        overrides = _parse_sections(target_obj.get("overrides", {}), f"targets[{index}].overrides")
        additions = _parse_sections(target_obj.get("additions", {}), f"targets[{index}].additions")
        targets.append(TargetConfig(path=path_value, overrides=overrides, additions=additions))

    return Manifest(
        generated_notice=generated_notice,
        section_order=section_order,
        global_sections=global_sections,
        targets=sorted(targets, key=lambda target: target.path),
    )


def merge_sections(global_sections: SectionMap, target: TargetConfig) -> SectionMap:
    merged: SectionMap = {name: list(lines) for name, lines in global_sections.items()}

    for name, lines in target.overrides.items():
        merged[name] = list(lines)

    for name, lines in target.additions.items():
        if name not in merged:
            merged[name] = list(lines)
            continue
        if merged[name] and lines and merged[name][-1] != "" and lines[0] != "":
            merged[name].append("")
        merged[name].extend(lines)

    return merged


def ordered_sections(section_order: Sequence[str], sections: SectionMap) -> Iterable[tuple[str, ManifestLines]]:
    emitted: set[str] = set()
    for section_name in section_order:
        if section_name in sections:
            emitted.add(section_name)
            yield section_name, sections[section_name]

    for section_name in sorted(name for name in sections if name not in emitted):
        yield section_name, sections[section_name]


def render_agents_markdown(manifest: Manifest, target: TargetConfig) -> str:
    sections = merge_sections(manifest.global_sections, target)
    lines: List[str] = [
        manifest.generated_notice,
        "",
        "# AGENTS.md",
        "",
    ]

    for section_name, section_lines in ordered_sections(manifest.section_order, sections):
        lines.append(f"## {section_name}")
        lines.append("")
        lines.extend(section_lines)
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def target_agents_path(repo_root: Path, target: TargetConfig) -> Path:
    directory = repo_root if target.path == "." else repo_root / target.path
    return directory / "AGENTS.md"


def validate_target_directories(repo_root: Path, targets: Sequence[TargetConfig]) -> None:
    missing_dirs = []
    for target in targets:
        directory = repo_root if target.path == "." else repo_root / target.path
        if not directory.is_dir():
            missing_dirs.append(target.path)
    if missing_dirs:
        joined = ", ".join(sorted(missing_dirs))
        raise ManifestError(f"Manifest target directories do not exist: {joined}")


def write_outputs(repo_root: Path, manifest: Manifest) -> int:
    validate_target_directories(repo_root, manifest.targets)
    changed = 0
    for target in manifest.targets:
        output_path = target_agents_path(repo_root, target)
        expected = render_agents_markdown(manifest, target)
        current = output_path.read_text(encoding="utf-8") if output_path.exists() else None
        if current != expected:
            output_path.write_text(expected, encoding="utf-8")
            changed += 1
            print(f"UPDATED {output_path.relative_to(repo_root)}")
        else:
            print(f"OK {output_path.relative_to(repo_root)}")
    print(f"Write complete: {changed} file(s) updated")
    return 0


def check_outputs(repo_root: Path, manifest: Manifest) -> int:
    validate_target_directories(repo_root, manifest.targets)
    missing: List[Path] = []
    outdated: List[Path] = []

    for target in manifest.targets:
        output_path = target_agents_path(repo_root, target)
        expected = render_agents_markdown(manifest, target)
        if not output_path.exists():
            missing.append(output_path)
            continue
        current = output_path.read_text(encoding="utf-8")
        if current != expected:
            outdated.append(output_path)

    if not missing and not outdated:
        print("All managed AGENTS.md files are up to date.")
        return 0

    for path in missing:
        print(f"MISSING  {path.relative_to(repo_root)}", file=sys.stderr)
    for path in outdated:
        print(f"OUTDATED {path.relative_to(repo_root)}", file=sys.stderr)
    return 1


def parse_args(argv: Sequence[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=("write", "check"), help="Write files or validate drift")
    parser.add_argument(
        "--root",
        default=".",
        help="Repository root (default: current directory)",
    )
    parser.add_argument(
        "--manifest",
        default="agents-manifest.json",
        help="Manifest path relative to --root (default: agents-manifest.json)",
    )
    return parser.parse_args(argv)


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    repo_root = Path(args.root).resolve()
    manifest_path = (repo_root / args.manifest).resolve()

    try:
        manifest = load_manifest(manifest_path)
    except ManifestError as exc:
        print(f"Manifest error: {exc}", file=sys.stderr)
        return 2

    if args.mode == "write":
        try:
            return write_outputs(repo_root, manifest)
        except ManifestError as exc:
            print(f"Manifest error: {exc}", file=sys.stderr)
            return 2

    try:
        return check_outputs(repo_root, manifest)
    except ManifestError as exc:
        print(f"Manifest error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
