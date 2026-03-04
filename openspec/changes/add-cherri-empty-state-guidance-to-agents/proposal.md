## Why

Cherri shortcuts in this repository currently treat "empty" values inconsistently (`nil`, empty strings, empty collections, and cleared output), which creates subtle behavioural drift across shortcut modules and reviews. We need explicit Codex agent guidance now so contributors make the same empty-state choices and document intent consistently.

## What Changes

- Add explicit empty-state guidance to managed Codex agent files for Cherri authoring and review workflows.
- Define when to use `nil` versus typed empty defaults (for example `""`, `[]`, `{}`) and when to use `nothing()` for output clearing.
- Add rules for treating missing optional values separately from intentionally empty values in runtime branching (`typeOf(...)`, dictionary lookups, optional action arguments).
- Add documentation expectations so shortcuts and OpenSpec artefacts record empty-state assumptions when behaviour depends on them.
- Regenerate managed AGENTS files from the manifest to keep guidance consistent across root and scoped contexts.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-file-generation`: expand generated AGENTS guidance to define Cherri empty-state semantics and documentation expectations.

## Impact

- Affected code: `agents-manifest.json` and generated `AGENTS.md` files.
- Affected process: Codex agent behaviour for Cherri implementation, review, and documentation updates.
- External dependencies: none.
- User-visible effect: more predictable empty-value handling in shortcut contributions and fewer ambiguous null/empty decisions.
