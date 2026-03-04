## Why

Codex responses in this repository are currently missing concise, explicit guidance on Cherri input/output typing, which has led to avoidable syntax and coercion mistakes during shortcut work. Capturing a canonical type contract in managed AGENTS files now will reduce recurring errors and improve implementation consistency.

## What Changes

- Add Cherri input/output typing guidance to managed AGENTS content generated from `agents-manifest.json`.
- Define practical rules for value types, content-item coercion, function/action signatures, and output-surface expectations.
- Add explicit recommendations to use `typeOf(...)`, typed function signatures, and controlled coercion patterns in Cherri workflows.
- Regenerate managed `AGENTS.md` files so root and scoped agent files inherit the new typing guidance.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-file-generation`: Generated AGENTS outputs include explicit Cherri input/output typing guidance from manifest-controlled global sections.

## Impact

- Affected files: `agents-manifest.json` and generated `AGENTS.md` files in managed targets.
- Affected process: repository guidance used by Codex agents during Cherri implementation and review.
- No new runtime dependencies, external APIs, or production code paths.
