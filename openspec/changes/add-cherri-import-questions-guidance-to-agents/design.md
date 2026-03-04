## Context

Managed `AGENTS.md` files are generated from `agents-manifest.json` and already include Cherri guidance for docs-first usage, typing, definitions, and empty-state handling. However, they do not currently define how contributors should use Cherri import questions (`#question`) for setup-time configuration. Contributors can therefore mix import-time configuration with runtime prompts inconsistently, which makes shortcut setup behaviour less predictable.

## Goals / Non-Goals

**Goals:**
- Add explicit repository-wide guidance for Cherri import-question usage in managed agent files.
- Clarify setup-time vs runtime input decisions (`#question` vs `prompt(...)`).
- Document practical import-question constraints and safe reuse patterns.
- Require documentation updates when shortcut behaviour depends on import-time configuration.
- Refactor existing shortcuts where import questions provide a better setup-time UX than repeated runtime prompts.

**Non-Goals:**
- Changing Cherri language behaviour or compiler support for import questions.
- Introducing new tooling beyond existing manifest/generation checks.
- Forcing import-question adoption for values that are intentionally per-run inputs.

## Decisions

### 1. Add an import-question subsection under existing Cherri guidance
Add a dedicated subsection (for example `### Import Questions`) under `Cherri-Specific Coding Guidance` in `agents-manifest.json`.

Rationale:
- Keeps import-question semantics alongside related Cherri contract guidance.
- Ensures root and scoped generated AGENTS files receive identical defaults.

Alternatives considered:
- Place guidance in general best-practices section: rejected because import questions are a Cherri language contract concern.

### 2. Define setup-time vs runtime boundary explicitly
Guidance will require contributors to treat `#question` as import/setup-time configuration and `prompt(...)` as runtime user input.

Rationale:
- Reduces ambiguous UX and inconsistent configuration flows.
- Aligns with Shortcuts import-question behaviour and review expectations.

Alternatives considered:
- Leave boundary implicit: rejected due to repeated confusion in shortcut authoring.

### 3. Document constraints and reuse pattern
Guidance will describe practical constraints (for example single-binding behaviour and no direct inline use) and prescribe safe reuse via typed intermediary actions (for example `text(questionValue)`).

Rationale:
- Prevents recurring wiring mistakes when values are reused across actions.
- Keeps the guidance actionable without over-specifying implementations.

Alternatives considered:
- Only link docs without concrete patterns: rejected because contributors need concise operational defaults.

### 4. Require documentation when import-time config changes behaviour
Guidance will require README/OpenSpec updates when shortcut behaviour depends on import-question defaults or required setup values.

Rationale:
- Makes setup assumptions auditable for users and reviewers.
- Improves scenario validation for import-time configuration paths.

Alternatives considered:
- Keep documentation optional: rejected because setup semantics are otherwise easy to miss.

### 5. Adopt import questions selectively in existing shortcuts
Refactors will target stable setup-time values (for example provider credentials or default configuration values) and will avoid converting clearly per-run user inputs.

Rationale:
- Improves import/setup UX without changing shortcut runtime intent.
- Avoids overusing import questions for ephemeral runtime decisions.

Alternatives considered:
- Refactor all prompts to import questions: rejected because some prompts are explicitly run-context inputs.
- Keep implementation out-of-scope: rejected because this change now permits shortcut adoption work.

## Risks / Trade-offs

- [Guidance could be interpreted as too strict for simple shortcuts] → Keep wording concise and principle-based.
- [Guidance may drift from current Cherri docs wording] → Keep terms aligned with official Cherri docs and existing repo doc-links.
- [Contributors may still hand-edit generated AGENTS files] → Preserve manifest-first workflow and verify with `generate_agents.py check`.
- [Refactors may alter first-run UX unexpectedly] → Limit adoption to stable setup values and document behaviour changes in shortcut READMEs.
- [Importing shortcuts with stale defaults could cause misconfiguration] → Keep blank/default-safe values and preserve runtime fallback behaviour where needed.

## Migration Plan

1. Update `agents-manifest.json` with the new import-question guidance subsection.
2. Identify eligible existing shortcuts and refactor selected setup-time prompts to import questions.
3. Update shortcut docs/OpenSpec verification notes for behaviour changes introduced by refactors.
4. Regenerate managed AGENTS files.
5. Validate generated root and scoped AGENTS files include the new guidance.
6. Run existing generation checks, tests, and compile checks for modified shortcuts.

Rollback: revert manifest and generated AGENTS updates for this change.

## Open Questions

- Should we include a stricter allowlist for which prompt categories can be converted to import questions?
- Should credential-bearing import questions always keep a runtime override prompt path?
