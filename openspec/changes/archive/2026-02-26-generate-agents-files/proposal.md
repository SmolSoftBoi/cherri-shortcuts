## Why

This repository does not yet define agent-facing guidance files, which makes AI-assisted work inconsistent across directories and tasks. We need a repeatable way to generate `AGENTS.md` files now so future automation and contributors can rely on a stable instruction baseline.

## What Changes

- Add a capability to generate `AGENTS.md` files from repository context and conventions.
- Define how generated files are structured, where they are placed, and how local directory rules extend global rules.
- Define validation expectations so generated files remain consistent and reviewable when regenerated.

## Capabilities

### New Capabilities
- `agents-file-generation`: Generate and maintain repository and subdirectory `AGENTS.md` files with consistent sections, inheritance rules, and project-specific guidance.

### Modified Capabilities
- None.

## Impact

- Affected areas: repository documentation, contributor workflow, AI agent onboarding.
- Likely implementation surface: generation script/command, templates, and docs for usage/regeneration.
- Dependencies: no new production dependencies required; use existing tooling where possible.
