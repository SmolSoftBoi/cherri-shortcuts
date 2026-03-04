## Context

Managed `AGENTS.md` files are generated from `agents-manifest.json` and currently provide Cherri type and definitions guidance, but they do not define a consistent empty-state policy. Contributors therefore mix absent values (`nil`/unset), intentionally empty values (`""`, `[]`, `{}`), and output clearing (`nothing()`) in inconsistent ways. This ambiguity can alter control flow and update behaviour in shortcuts that rely on `ShortcutInput`, optional action arguments, and dictionary lookups.

## Goals / Non-Goals

**Goals:**
- Define repository-wide guidance for Cherri empty-state semantics in managed agent files.
- Clarify when to use absent vs intentionally empty values for each core Cherri value category.
- Clarify runtime checks and coercions for empty-state branching (`typeOf(...)`, null checks, count checks).
- Require documentation updates when empty-state semantics materially affect shortcut behaviour.

**Non-Goals:**
- Changing Cherri language semantics or compiler defaults.
- Refactoring all existing shortcuts as part of this change.
- Adding new lint tooling in this iteration.

## Decisions

### 1. Add a dedicated empty-state subsection in Cherri guidance
Add `### Empty States and Nullability` under `Cherri-Specific Coding Guidance` in `agents-manifest.json`.

Rationale:
- Keeps semantics close to existing type and definitions guidance.
- Ensures all generated AGENTS scopes receive consistent wording.

Alternatives considered:
- Place in best-practices section only: rejected because semantics are type-contract related.

### 2. Define absent vs empty as separate states
Guidance will explicitly separate:
- absent/unset (`nil` or missing values)
- intentionally empty text (`""`)
- intentionally empty collections (`[]`, `{}`)
- cleared action output (`nothing()`)

Rationale:
- Prevents implicit coercion mistakes in flow decisions and merge logic.

Alternatives considered:
- Single “empty value” concept: rejected due to lost behavioural intent.

### 3. Add branching rules for runtime evaluation
Guidance will require explicit checks before treating a value as present:
- type checks where source type is uncertain (`typeOf(...)`)
- null/missing checks for dictionary extraction
- count checks for arrays before indexing

Rationale:
- Aligns with existing shortcut patterns that ingest provider responses and mixed `ShortcutInput` values.

Alternatives considered:
- Leave checks discretionary: rejected because consistency is the core objective.

### 4. Add documentation expectation for semantic emptiness
Guidance will require README/OpenSpec notes when shortcut behaviour depends on empty-state distinctions.

Rationale:
- Makes assumptions reviewable and easier to validate in scenario testing.

Alternatives considered:
- Keep purely code-level guidance: rejected because intent can be lost in reviews.

## Risks / Trade-offs

- [Guidance may be interpreted as too strict for simple shortcuts] → Keep policy concise with practical examples.
- [Contributors may still use legacy patterns] → Keep generated AGENTS authoritative and verify updates in check mode.
- [Semantic terms may drift from Cherri docs wording] → Keep phrasing aligned with documented Cherri concepts (`nil`, typed values, `nothing()`).

## Migration Plan

1. Update `agents-manifest.json` with the empty-state/nullability subsection.
2. Regenerate managed AGENTS files.
3. Verify generated files contain the new policy text in root and scoped outputs.
4. Run check mode and existing generation tests.

Rollback: revert manifest and regenerated AGENTS files for this change.

## Open Questions

- Should a follow-up change add a checklist for reviewing legacy shortcuts against the new empty-state policy?
- Should we define a preferred pattern for provider-response dictionary extraction (`getValue` + null checks vs coercion helpers)?
