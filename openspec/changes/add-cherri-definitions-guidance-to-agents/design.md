## Context

The repository uses `agents-manifest.json` as the source of truth for managed `AGENTS.md` files at root and scoped directories. Recent shortcut work introduced explicit handling of `ShortcutInput` and content-item type coercion, but there is no dedicated guidance in the generated agent files describing when to use Cherri `#define` declarations for inputs and outputs. This leaves agents to infer input/output contracts ad hoc, creating inconsistent shortcut definitions and documentation.

## Goals / Non-Goals

**Goals:**
- Add explicit, reusable guidance in managed agents files for Cherri definitions that describe shortcut inputs and outputs.
- Standardise how agents map `#define` input/output declarations to runtime handling (`ShortcutInput`, `typeOf(...)`, typed coercions).
- Require lightweight documentation of input/output assumptions when shortcut behaviour depends on those definitions.
- Preserve deterministic generation through existing manifest-driven workflows.

**Non-Goals:**
- Changing Cherri compiler behaviour or adding new language features.
- Reworking existing shortcut business logic as part of this documentation change.
- Introducing new generation tooling beyond current scripts.

## Decisions

### 1. Add definitions guidance in the existing Cherri guidance section
We will extend the existing `Cherri-Specific Coding Guidance` section in `agents-manifest.json` with a dedicated subsection for `#define` input/output definitions.

Rationale:
- Keeps all Cherri language guidance in one place.
- Ensures generated files in every managed scope receive consistent instructions.

Alternatives considered:
- Create a standalone top-level section for definitions: rejected to avoid fragmenting Cherri guidance.
- Put this only in root `AGENTS.md`: rejected because scoped files would drift in expectations.

### 2. Define contract-to-runtime alignment rules
Guidance will explicitly require that declared input/output content item types match runtime handling and output actions.

Rationale:
- Prevents mismatch between metadata contracts and implementation logic.
- Reduces ambiguity when shortcuts are chained from other shortcuts/apps.

Alternatives considered:
- High-level prose without concrete alignment rules: rejected because it is easy to interpret inconsistently.

### 3. Require definition-aware documentation updates
Guidance will require updates to shortcut README/OpenSpec artefacts when input/output contracts influence behaviour.

Rationale:
- Keeps operational behaviour transparent for contributors and reviewers.
- Makes verification scenarios easier to reason about in spec/task workflows.

Alternatives considered:
- Keep documentation optional: rejected because behaviour drift is likely.

### 4. Use existing generation and verification commands
Implementation will continue to use `scripts/generate_agents.py write` and `scripts/generate_agents.py check`.

Rationale:
- Maintains deterministic managed-file workflow already defined in capability specs.
- Avoids introducing additional moving parts.

Alternatives considered:
- Manual AGENTS edits: rejected because managed files are generated.

## Risks / Trade-offs

- [Guidance becomes too prescriptive for simple shortcuts] -> Keep rules concise and focused on contract/runtime consistency.
- [Manifest wording diverges from actual Cherri docs] -> Ground wording in currently supported Cherri definitions and type concepts.
- [Contributors forget to regenerate managed files] -> Keep check-mode verification as a required quality gate.

## Migration Plan

1. Update `agents-manifest.json` with the new Cherri definitions guidance subsection.
2. Regenerate managed `AGENTS.md` files using the existing write command.
3. Run check mode to verify generated files are current.
4. Validate wording references and examples for consistency with current Cherri documentation.

Rollback: revert manifest and generated AGENTS file changes for this change set.

## Open Questions

- Should the guidance prescribe default `#define` input/output type sets for common shortcut classes (for example: contact enrichment, file processors)?
- Should future changes include a lint rule that flags shortcuts handling `ShortcutInput` without corresponding definitions?
