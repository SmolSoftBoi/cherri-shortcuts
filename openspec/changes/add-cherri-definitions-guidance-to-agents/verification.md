# Verification Notes

## Managed AGENTS regeneration

Command run:

```bash
python3 scripts/generate_agents.py write
```

Result:
- Updated `AGENTS.md`
- Updated `.github/AGENTS.md`
- Updated `openspec/AGENTS.md`

## Definitions guidance presence check

Command run:

```bash
rg -n "Definitions and Shortcut Contracts|#define|ShortcutInput|content item types|OpenSpec artefacts" AGENTS.md .github/AGENTS.md openspec/AGENTS.md
```

Result:
- New `Definitions and Shortcut Contracts` section is present in root and scoped generated files.
- Required guidance text for `#define` contracts and runtime `ShortcutInput` alignment is present.

## Quality gates

Commands run:

```bash
python3 scripts/generate_agents.py check
python3 -m unittest tests/test_generate_agents.py
```

Results:
- `generate_agents.py check`: pass (`All managed AGENTS.md files are up to date.`)
- `test_generate_agents.py`: pass (`Ran 3 tests`, `OK`)

## Diff scope review

Reviewed diffs for:
- `agents-manifest.json`
- `AGENTS.md`
- `.github/AGENTS.md`

The change contains the intended Cherri definitions guidance updates and regenerated managed output.
