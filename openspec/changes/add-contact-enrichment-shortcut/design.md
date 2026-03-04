## Context

The repository currently defines OpenSpec workflows but does not yet include a contact-enrichment Shortcut. The proposed feature introduces an orchestration flow across local contact data, external enrichment providers (Twilio Lookup and People Data Labs), and LLM-assisted normalisation (Apple Intelligence and ChatGPT).

Key constraints:
- Contact updates must be safe and user-approved.
- External providers can return partial, conflicting, or low-confidence data.
- Secrets must not be embedded in source files.
- Cherri contact update support appears strongest for identity/work profile fields; unsupported fields must be handled conservatively.

## Goals / Non-Goals

**Goals:**
- Build a deterministic enrichment pipeline for phone- and contact-seeded records.
- Use Twilio Lookup, People Data Labs, Apple Intelligence, and ChatGPT in a consistent order.
- Apply a fill-missing-only merge policy that never overwrites non-empty contact values.
- Provide user-configurable confidence thresholds with clear defaults.
- Require an explicit confirmation step before any contact update action.
- Keep provider credentials external to source and documented for setup.

**Non-Goals:**
- Fully automatic background updates without user confirmation.
- Overwriting existing contact values with model or provider output.
- Building a separate backend service for enrichment orchestration.
- Guaranteeing complete enrichment when providers return limited data.

## Decisions

### 1. Orchestration order: Twilio -> PDL Person -> PDL Company
The flow will first validate and normalise phone metadata with Twilio, then query PDL person enrichment, then query PDL company enrichment when company/domain hints exist.

Rationale:
- Twilio provides high-signal phone validation early, improving downstream lookup quality.
- PDL person output can supply company context used by PDL company enrichment.

Alternatives considered:
- PDL-first order: rejected because phone quality checks would be delayed.
- Parallel all-provider calls: rejected for higher complexity and harder conflict resolution.

### 2. Two-pass LLM normalisation with distinct roles
Use Apple Intelligence first for local-first structuring and normalisation, then ChatGPT as a tie-break and consistency pass. Both model calls must request dictionary output.

Rationale:
- Two independent passes reduce single-model bias and improve consistency checks.
- Dictionary outputs simplify deterministic merge evaluation.

Alternatives considered:
- Single LLM pass only: rejected due to weaker conflict handling.
- LLM-only enrichment without provider evidence: rejected for trust and accuracy risks.

### 3. Deterministic merge engine outside LLMs
LLMs may propose candidate values, but merge decisions are rule-based in the shortcut: apply only when current field is empty, candidate is non-empty, and confidence meets threshold.

Rationale:
- Preserves predictable behaviour and avoids accidental overwrites.
- Supports straightforward testing against scenario-driven requirements.

Alternatives considered:
- Let ChatGPT produce final patch directly: rejected due to non-determinism.

### 7. Confidence thresholds configurable with defaults
The shortcut will expose confidence thresholds as user-configurable values, with default thresholds pre-populated when the user does not provide overrides.

Rationale:
- Supports conservative defaults while allowing users to tune strictness for their own data quality tolerance.
- Keeps merge behaviour explicit and inspectable instead of hard-coded magic values.

Alternatives considered:
- Fixed global thresholds only: rejected because users have different tolerance for false positives.
- Fully unconstrained manual thresholds with no defaults: rejected because first-run behaviour would be unclear.

### 4. Mandatory preview and explicit confirmation gate
Before any `updateContact(...)` actions run, the shortcut must show proposed field-level updates and request user confirmation.

Rationale:
- Protects user trust and enables a final human quality check.
- Aligns with safe-contact-edit expectations for personal data.

Alternatives considered:
- Silent update mode: rejected for safety reasons.

### 5. Canonical internal enrichment dictionary schema
All provider and LLM outputs are normalised into one internal dictionary with field value, confidence, and evidence source metadata.

Rationale:
- Creates a single merge contract across heterogeneous upstream payloads.
- Supports traceability when values conflict.

Alternatives considered:
- Provider-specific merge branches only: rejected due to high maintenance burden.

### 6. Secret handling via environment/runtime input only
API credentials must be supplied from environment or secure runtime prompts and must not be hard-coded in sources or committed examples.

Rationale:
- Reduces credential leakage risk.
- Keeps setup auditable and rotation-friendly.

Alternatives considered:
- Static tokens in shortcut text or examples: rejected for security reasons.

## Risks / Trade-offs

- [Provider rate limits or billing spikes] -> Add per-provider failure handling, optional early-exit for missing inputs, and clear user-facing failure notes.
- [Conflicting provider/model outputs] -> Keep confidence + evidence metadata and resolve with deterministic tie-break rules.
- [Model hallucination or overreach] -> Restrict prompts to provided evidence and require dictionary schema validation before merge.
- [Unsupported contact fields in Cherri update actions] -> Maintain an explicit writable-field allowlist and skip unsupported fields with explanation.
- [Additional runtime latency from multi-step pipeline] -> Sequence high-signal calls first and stop early when insufficient identifiers remain.
- [User sets thresholds too low or too high] -> Apply bounded validation for overrides and provide safe defaults plus reset behaviour.

## Migration Plan

1. Add OpenSpec artefacts for proposal, design, specs, and tasks.
2. Implement shortcut modules and includes for input capture, provider calls, LLM normalisation, merge evaluation, and confirmation.
3. Add configuration and setup docs for credentials and required account capabilities.
4. Validate with representative contacts (complete, partial, conflicting, and invalid data).
5. Rollout as opt-in shortcut; rollback by reverting new shortcut files and associated docs.

## Open Questions

- What is the preferred credential bootstrap on-device (environment forwarding vs prompt-and-cache workflow)?
- Should phone/email write-back be deferred until Cherri exposes first-class update fields for those attributes?
- Do we need a lightweight enrichment audit log for debugging and trust transparency?
