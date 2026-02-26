## Context

The repository currently has no `AGENTS.md` files, so agent guidance depends on ad hoc prompts and local memory. The proposed change adds a repeatable generation workflow so root and directory-specific instructions can be created consistently and reviewed as normal Markdown files.

Constraints:
- Keep generated files human-readable and easy to review in Git.
- Avoid introducing new production dependencies for documentation generation.
- Support repository-level guidance plus narrower rules for selected subdirectories.

## Goals / Non-Goals

**Goals:**
- Define a deterministic process to generate `AGENTS.md` files from a single source of truth.
- Support a root `AGENTS.md` and optional directory-specific `AGENTS.md` files with clear precedence.
- Make regeneration safe and predictable so changes can be reviewed in small diffs.
- Provide validation/reporting so maintainers can confirm files are up to date.

**Non-Goals:**
- Building a generic documentation engine for arbitrary file types.
- Enforcing agent behaviour at runtime.
- Automatically inferring project rules from code without explicit inputs.

## Decisions

### 1. Use a manifest-driven generator

The generator will read a repository-owned manifest that defines:
- shared/global instruction content
- target directories that need local `AGENTS.md` files
- local overrides or additional sections per target

Why:
- Keeps the generation inputs explicit and version-controlled.
- Makes it easy to add or remove target directories without editing generator logic.

Alternatives considered:
- Hard-coded generation rules in the script: simpler initially, but harder to extend and review.
- Manual editing of multiple `AGENTS.md` files: no tooling cost, but drifts quickly and creates inconsistent guidance.

### 2. Generate Markdown from templates with stable section ordering

Generated files will use a fixed section structure and deterministic ordering of sections and targets.

Why:
- Produces small, predictable diffs.
- Makes generated files easier for humans and agents to scan.

Alternatives considered:
- Free-form string concatenation: quick to write, but higher risk of inconsistent output.
- Rich templating engine dependency: flexible, but unnecessary for a small Markdown generation use case.

### 3. Define explicit inheritance and override semantics

Root `AGENTS.md` contains global rules. Directory-level `AGENTS.md` files will include inherited guidance plus local additions/overrides, and the generated output will make that scope clear.

Why:
- Prevents ambiguity about which instructions apply in nested directories.
- Helps reviewers verify that local rules intentionally diverge from global rules.

Alternatives considered:
- Copy-paste full independent files per directory: simple but duplicates content and invites drift.
- Root-only file with no local files: insufficient for directory-specific workflows.

### 4. Provide a check mode in addition to write mode

The generation command will support a non-writing mode that reports missing/outdated `AGENTS.md` files.

Why:
- Enables CI and local verification without mutating the working tree.
- Encourages keeping generated files current.

Alternatives considered:
- Write-only command: simpler, but harder to use in CI and pre-merge checks.

## Risks / Trade-offs

- [Manifest becomes stale as directories evolve] → Keep target list explicit and add check-mode reporting for missing paths or unused entries.
- [Generated files feel too rigid for local nuance] → Allow local override sections in the manifest while preserving core structure.
- [Regeneration rewrites large files unnecessarily] → Use deterministic rendering and avoid timestamps or non-stable content.
- [Maintainers bypass the generator and edit outputs manually] → Document the workflow and provide validation that detects drift.

## Migration Plan

1. Add the generator, manifest, and templates.
2. Generate the initial root and directory `AGENTS.md` files.
3. Review and commit generated files with the manifest and generator together.
4. Add a check command to the standard quality gates (CI or local script) once the workflow is stable.

Rollback:
- Remove generated files, manifest, and generator artefacts in a single revert if the approach proves too rigid.

## Open Questions

- Which directories in this repository should receive dedicated `AGENTS.md` files initially (for example, `.github/`, `openspec/`, or future source folders)?
- Should local files restate inherited rules in full for readability, or reference root guidance and list only deltas?
- What command name should be standard for contributors (for example, `generate`, `check`, and `fix`) based on the repo’s chosen tooling?
