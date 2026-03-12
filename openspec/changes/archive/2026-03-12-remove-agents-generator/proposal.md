## Why

The repository currently treats `AGENTS.md` files as generated artefacts backed by `scripts/generate_agents.py`, `agents-manifest.json`, and a matching spec. Deleting the script without updating that contract would leave the documentation, tests, and OpenSpec capability in a broken state, so we need a coordinated change that retires the generation workflow cleanly.

## What Changes

- Remove the repository’s generated `AGENTS.md` workflow, including the `scripts/generate_agents.py` entry point and its manifest-driven maintenance model.
- Update repository documentation so `AGENTS.md` files are treated as normal, directly maintained Markdown files rather than generated outputs.
- Remove or replace tests that only validate the deleted generator CLI.
- **BREAKING**: Maintainers will no longer use `python3 scripts/generate_agents.py write` or `check` to manage `AGENTS.md` files.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-file-generation`: Retire the requirement that the repository generate and validate managed `AGENTS.md` files from a manifest and update the capability to match the new maintenance model.

## Impact

- Affected code: `scripts/generate_agents.py`, `tests/test_generate_agents.py`, `README.md`, `agents-manifest.json`, and generated-file notices in existing `AGENTS.md` files.
- Affected systems: repository contributor workflow and OpenSpec capability documentation for agent guidance management.
- Dependencies: no new dependencies; this change removes a repo-local maintenance tool.
