## Context

The current repository `.gitignore` covers only a narrow set of generated shortcut files and local environment files. Recent workflow changes (OpenSpec artefacts, generated AGENTS files, IDE metadata, and local tooling output) increase the chance of accidental staging when ignore rules are incomplete or not consistently grouped. The update should also permit limited repository structure reorganisation if that makes ignore boundaries clearer.

## Goals / Non-Goals

**Goals:**
- Define a clear ignore policy for local-only, generated, temporary, and IDE-specific files in this repository.
- Keep `.gitignore` readable and category-based so future updates remain predictable.
- Permit focused repository structure adjustments when they reduce ignore-rule complexity.
- Preserve tracked project artefacts that are intentionally version-controlled.

**Non-Goals:**
- Ignoring files that are required for reproducible builds or OpenSpec history.
- Introducing tooling beyond standard gitignore semantics.
- Performing broad structural refactors unrelated to ignore hygiene.

## Decisions

### 1. Use category-based `.gitignore` sections
Group rules under explicit headings (for example: build outputs, debug artefacts, environment files, IDE/editor/OS noise).

Rationale:
- Keeps ignore intent reviewable.
- Reduces duplicate or conflicting pattern additions.

Alternatives considered:
- Flat ungrouped list: rejected due to lower maintainability.

### 2. Ignore only non-source or machine-local artefacts
Add rules only for files that should never be source-controlled (for example generated binaries, local env, IDE directories, transient editor files).

Rationale:
- Prevents accidental loss of meaningful project files.

Alternatives considered:
- Broad wildcard ignores: rejected due to risk of masking legitimate files.

### 3. Allow targeted repository structure adjustments
Allow moving or regrouping generated/local artefact paths when it simplifies ignore patterns and keeps source-controlled paths explicit.

Rationale:
- Prevents complex or brittle wildcard patterns.
- Improves maintainability of ignore policy over time.

Alternatives considered:
- Forbid all structural adjustments: rejected because it can force over-complicated `.gitignore` patterns.

### 4. Keep policy explicit in OpenSpec artefacts
Capture the intended rule categories in spec/tasks so future updates follow the same principles.

Rationale:
- Ensures consistent maintenance beyond a one-off edit.

Alternatives considered:
- One-time implementation without spec guidance: rejected because policy drift would likely recur.

## Risks / Trade-offs

- [Overly broad patterns could hide important files] → Prefer narrow patterns and verify with `git status` before/after updates.
- [Under-scoped patterns may still allow noise into commits] → Include representative local/tooling artefacts based on observed workflow.
- [Structure changes could disrupt contributor expectations] → Limit adjustments to targeted paths and document any moves in verification notes.
- [Future contributors may add ad hoc rules] → Keep sectioned structure and document rationale in specs/tasks.

## Migration Plan

1. Update `.gitignore` with the agreed category-based rule set, including IDE-specific directories.
2. Apply any targeted path reorganisation needed to simplify ignore boundaries.
3. Verify no intended tracked files are unintentionally ignored.
4. Run lightweight checks (`git status`, existing repo checks if relevant).
5. Record verification outcomes in change artefacts.

Rollback: revert `.gitignore` to previous committed state.

## Open Questions

- Which IDE-specific directories should be included as defaults for this repository (`.idea/`, `.vscode/`, `.fleet/`, etc.)?
- Do we want repository-level conventions for temporary files used by local skill scripts?
