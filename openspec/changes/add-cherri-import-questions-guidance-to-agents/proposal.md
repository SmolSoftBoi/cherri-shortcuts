## Why

Contributors currently lack explicit Codex agent guidance for Cherri import questions, so setup-time configuration patterns are applied inconsistently and sometimes mixed with runtime prompts. We need clear guidance now so shortcut authors use `#question` predictably, understand its constraints, and document import-time assumptions.

## What Changes

- Add Cherri import-question guidance to managed Codex agent files.
- Define when to use `#question` (import/setup-time values) versus runtime `prompt(...)` input.
- Add usage constraints for import questions, including single-binding expectations and safe reuse patterns through typed actions.
- Add guidance for documenting import-question assumptions in shortcut README/OpenSpec artefacts when shortcut behaviour depends on setup-time values.
- Refactor eligible existing shortcuts to adopt import questions for stable setup-time configuration values.
- Regenerate managed AGENTS files from the manifest so guidance remains consistent across repository scopes.

## Capabilities

### New Capabilities
- `shortcut-import-question-adoption`: identify and refactor existing shortcuts to use Cherri import questions where setup-time configuration is stable and user-visible.

### Modified Capabilities
- `agents-file-generation`: expand generated AGENTS guidance to cover Cherri import-question semantics, constraints, and documentation expectations.

## Impact

- Affected code: `agents-manifest.json`, generated `AGENTS.md` files, and eligible shortcuts under `shortcuts/`.
- Affected process: Codex agent behaviour when designing shortcut configuration and setup workflows.
- External dependencies: none.
- User-visible effect: more consistent setup-time configuration patterns, fewer mistakes mixing import-time and runtime input paths, and reduced repeated credential/setup prompts in refactored shortcuts.
