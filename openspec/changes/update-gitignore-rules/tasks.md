## 1. Define Ignore Policy Scope

- [x] 1.1 Audit current repository-generated and local-only artefacts that should be ignored.
- [x] 1.2 Decide section structure and pattern scope for `.gitignore` updates (build, debug, local env, IDE/editor/OS noise).
- [x] 1.3 Confirm supported IDE-specific directories to ignore by default for this repository.

## 2. Update Git Ignore Rules

- [x] 2.1 Update root `.gitignore` with category-based sections and scoped patterns.
- [x] 2.2 Ensure existing intentional ignore rules are preserved and duplicates are removed.
- [x] 2.3 Apply targeted repository structure adjustments if needed to simplify ignore boundaries.

## 3. Validate and Record Outcomes

- [x] 3.1 Verify `git status` reflects expected behaviour for ignored artefacts and source files.
- [x] 3.2 Run relevant existing checks if touched by the change and confirm no unintended impacts.
- [x] 3.3 Record verification notes for `.gitignore` behaviour, IDE ignore coverage, and any structure adjustments in the change artefacts.
