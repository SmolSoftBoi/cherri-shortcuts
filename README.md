# Cherri Shortcuts

A Cherri shortcuts toolkit for creating modular, maintainable Siri Shortcuts projects.

## Managed AGENTS Files

This repository generates `AGENTS.md` files from a version-controlled manifest (`agents-manifest.json`).

- Root file: `AGENTS.md`
- Scoped files (current targets): `.github/AGENTS.md`, `openspec/AGENTS.md`

### Configure

Edit `agents-manifest.json`:

- `global_sections`: shared guidance applied to all generated files
- `targets`: directory targets plus `overrides` and `additions`
- `section_order`: deterministic section ordering

### Generate

```bash
python3 scripts/generate_agents.py write
```

### Verify (Check Mode)

```bash
python3 scripts/generate_agents.py check
```

`check` exits non-zero if any managed `AGENTS.md` file is missing or out of date.
