## Why

Contributors currently rely on implicit knowledge for Cherri `#define` metadata and shortcut input/output contracts, which leads to inconsistent declarations across shortcuts. We need explicit Codex agents guidance now so input and output behaviour is defined consistently and documented at authoring time.

## What Changes

- Add Cherri definitions guidance to managed agents files, including when and how to declare `#define` metadata for shortcut input and output contracts.
- Add practical rules for mapping `ShortcutInput` and content-item types to typed Cherri flows, including validation and coercion boundaries.
- Add guidance for documenting input/output assumptions in shortcut README and OpenSpec artefacts when behaviour depends on definitions.
- Regenerate managed AGENTS files from the manifest so guidance is consistent across repository scopes.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-file-generation`: expand generated agent guidance to cover Cherri definitions for shortcut input/output contracts and their documentation expectations.

## Impact

- Affected code: `agents-manifest.json` and generated `AGENTS.md` files.
- Affected process: Codex agent behaviour when authoring or reviewing Cherri shortcuts.
- External dependencies: none.
- User-visible effect: clearer, repeatable guidance for defining shortcut input/output behaviour in Cherri projects.
