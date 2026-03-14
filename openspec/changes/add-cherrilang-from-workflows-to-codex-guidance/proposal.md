## Why

The repository's Codex guidance now explains Cherri definitions in general, but it still does not teach agents or skills how Cherri's `#define from` workflows affect shortcut launch surfaces and input handling. Adding that guidance now will close a concrete documentation gap and help future Codex-assisted edits avoid treating workflow definitions as cosmetic metadata.

## What Changes

- Update the maintained `AGENTS.md` files with concise guidance for Cherri's `#define from` workflow definitions and when they change shortcut behaviour.
- Extend the relevant Codex skill guidance so Cherri docs lookups and local skill instructions cover supported workflow values, `#define quickactions`, and `ShortcutInput` for Spotlight input.
- Document the maintenance expectation that workflow-surface guidance stays aligned across the Codex-facing files that explain Cherri definitions.

## Capabilities

### New Capabilities
- `codex-cherri-workflow-guidance`: Maintain Codex-facing guidance for Cherri `#define from` workflow definitions, related quick action definitions, and their runtime implications.

### Modified Capabilities
- None.

## Impact

- Affected code: `AGENTS.md`, `.codex/AGENTS.md`, `.github/AGENTS.md`, `openspec/AGENTS.md`, `.codex/skills/cherri-docs/SKILL.md`, and any adjacent skill-local metadata that presents Cherri docs guidance.
- Affected systems: local Codex guidance, local Cherri docs skill behaviour, and repository-maintained instructions for Cherri shortcut metadata.
- Dependencies: no new runtime dependencies; the change stays within committed Markdown and YAML guidance assets.
