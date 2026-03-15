## Why

The repository's Codex-facing behaviour is currently shaped by several separate surfaces: repository and scoped `AGENTS.md` files, local skills in `.codex/skills/`, mirrored OpenSpec skills in `.github/skills/`, prompt files in `.github/prompts/`, and skill-local agent metadata such as `.codex/skills/cherri-docs/agents/openai.yaml`. Those surfaces are useful, but they are only partly aligned today, which creates drift risk and makes it harder to know which files are authoritative.

Updating these files now will make Codex guidance more predictable for both local and GitHub-distributed workflows, while keeping the repository's existing “edit committed Markdown directly” approach intact.

## What Changes

- Refresh the repository's root and scoped `AGENTS.md` files so Codex-facing guidance is clearly layered by ownership and directory scope.
- Define which skill directories are authoritative, which are mirrors, and how shared OpenSpec skills should stay aligned between `.codex/skills/` and `.github/skills/`.
- Add or update skill-local agent metadata and companion skill guidance so skills expose consistent descriptions, usage expectations, and assistant-specific hints.
- Document the maintenance workflow for AGENTS files, skills, prompts, and agent metadata without reintroducing a generator step.

## Capabilities

### New Capabilities
- `codex-agent-surfaces`: Maintain Codex-facing AGENTS guidance, skill definitions, and skill-local agent metadata consistently across the repository's local and GitHub-distributed surfaces.

### Modified Capabilities
- None.

## Impact

- Affected code: `AGENTS.md`, `.github/AGENTS.md`, `openspec/AGENTS.md`, any new `.codex/AGENTS.md`, `.codex/skills/**`, `.github/skills/**`, `.github/prompts/**`, and skill-local `agents/` metadata files.
- Affected systems: local Codex skill discovery, GitHub-distributed OpenSpec skills and prompts, and assistant-specific skill presentation metadata.
- Dependencies: no new runtime dependencies are expected; the change should stay within version-controlled Markdown and YAML guidance assets.
