## Why

The repository currently tracks generated and local-only files with minimal `.gitignore` coverage, which can cause accidental staging of environment or tooling artefacts. We need explicit ignore rules now to keep commits focused on source-controlled assets and reduce review noise.

## What Changes

- Expand `.gitignore` rules to cover local environment files, generated shortcut build/debug outputs, IDE-specific directories, and other non-source artefacts produced during normal development.
- Define a clear repository policy for what should be ignored versus committed.
- Allow limited repository structure reorganisation where it improves ignore-rule clarity and maintenance.
- Document the expected `.gitignore` structure so future additions remain consistent and reviewable.

## Capabilities

### New Capabilities
- `gitignore-management`: maintain deterministic `.gitignore` policy for local, generated, and temporary files in this repository.

### Modified Capabilities
- None.

## Impact

- Affected code: `.gitignore` at repository root and any repository paths moved to support cleaner ignore boundaries.
- Affected process: local developer workflow and staging hygiene.
- External dependencies: none.
- User-visible effect: fewer accidental commits of local/generated/IDE files, cleaner diffs, and clearer directory intent where structure is adjusted.
