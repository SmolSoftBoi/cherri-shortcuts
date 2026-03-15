## Why

The repository's Codex guidance now covers Cherri definitions, workflow surfaces, and image-related actions, but it still does not teach agents or skills how Cherri's web actions are organised or where `actions/web` stops and starts. Adding that guidance now will help future Codex-assisted edits route Safari-page, HTTP, and URL-parsing questions to the right official Cherri docs faster.

## What Changes

- Update the maintained `AGENTS.md` files with concise guidance for Cherri web actions, including the `#include 'actions/web'` entry point and the `cherri --docs=web` lookup path.
- Extend the relevant Codex skill guidance so Cherri docs lookups explicitly treat web-action questions as in scope and point to the official Web Actions docs first, with companion docs such as Definitions or Variables when a web question crosses into launch surfaces or `ShortcutInput`.
- Add practical boundary guidance that distinguishes Safari-page actions, HTTP or request actions, and URL parsing or utility actions within the Cherri web surface.
- Allow narrow supporting edits to nearby `.cherri` shortcut source files when that is the clearest way to keep repository guidance and live examples aligned with the web-action guidance.
- Document the maintenance expectation that Cherri web guidance stays aligned across the Codex-facing files that already explain Cherri language usage and docs lookup behaviour.

## Capabilities

### New Capabilities
- `codex-cherri-web-guidance`: Maintain Codex-facing guidance for Cherri web actions, their main sub-surfaces, and the official Cherri docs sources that should back those answers.

### Modified Capabilities
- None.

## Impact

- Affected code: `AGENTS.md`, `.github/AGENTS.md`, `openspec/AGENTS.md`, `.codex/skills/cherri-docs/SKILL.md`, adjacent skill-local metadata that presents Cherri docs guidance, and any nearby `.cherri` shortcut source files that need small alignment edits
- Affected systems: local Codex guidance, the local Cherri docs skill, repository-maintained instructions for Cherri web-action questions, and any shortcut examples kept in sync with that guidance
- Dependencies: no new runtime dependencies; the change stays within committed Markdown and YAML guidance assets
