## Why

The repository's Codex guidance explains Cherri definitions and workflow surfaces, but it still does not teach agents or local skills how Cherri image-related actions are organised or where `actions/images`, `actions/photos`, and `actions/media` stop and start. Adding that guidance now will help future Codex-assisted edits steer image, photo-library, and nearby media questions to the right official documentation faster.

## What Changes

- Update the maintained `AGENTS.md` files with concise guidance for Cherri image-related actions, including the `#include 'actions/images'` entry point and the distinction between image processing, photo-library access, and nearby media transforms.
- Extend the relevant Codex skill guidance so Cherri docs lookups explicitly treat Cherri image-action questions as in scope and route users to the official Images docs, with the Photos and Media docs as companion sources when the question crosses those boundaries.
- Allow narrow supporting edits to nearby shortcut source files when that is the clearest way to keep repository guidance, examples, or helper comments aligned with the new Cherri images and media guidance.
- Document the maintenance expectation that Cherri image-related guidance stays aligned across the Codex-facing files that already explain Cherri language and docs lookup behaviour.

## Capabilities

### New Capabilities
- `codex-cherri-image-guidance`: Maintain Codex-facing guidance for Cherri image actions, related Photos and Media boundaries, and the official Cherri docs sources that should back those answers.

### Modified Capabilities
- None.

## Impact

- Affected code: `AGENTS.md`, `.github/AGENTS.md`, `openspec/AGENTS.md`, `.codex/skills/cherri-docs/SKILL.md`, adjacent skill-local metadata that presents Cherri docs guidance, and any nearby `.cherri` shortcut source files that need small alignment edits.
- Affected systems: local Codex guidance, the local Cherri docs skill, repository-maintained instructions for Cherri image-processing questions, and any example shortcut source kept in sync with that guidance.
- Dependencies: no new runtime dependencies; the change stays within committed Markdown, YAML, and existing Cherri source assets.
