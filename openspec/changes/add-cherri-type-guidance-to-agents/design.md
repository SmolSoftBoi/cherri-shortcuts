## Context

`AGENTS.md` files in this repository are generated from `agents-manifest.json` and inherited into scoped targets. Current guidance already covers Cherri docs-first workflow and coding practices, but it does not explicitly describe Cherri input/output typing and coercion expectations.

This omission has caused recurring implementation friction (for example variable coercion mistakes and signature mismatches) during Cherri shortcut work.

## Goals / Non-Goals

**Goals:**
- Add concise, authoritative Cherri input/output type guidance to the manifest-driven AGENTS content.
- Ensure root and scoped generated AGENTS files inherit the new guidance consistently.
- Preserve deterministic generation/check behaviour and existing section ordering conventions.

**Non-Goals:**
- Changing generator architecture or rendering algorithm.
- Introducing new managed targets beyond current root, `.github`, and `openspec` paths.
- Rewriting unrelated guidance sections.

## Decisions

### 1. Add guidance as manifest-managed content, not hand-edits
Update `agents-manifest.json` global section content and regenerate managed AGENTS files.

Rationale:
- Keeps source-of-truth in the manifest and preserves reproducible generation.
- Avoids drift caused by manual edits to generated files.

Alternatives considered:
- Manual edits to each `AGENTS.md`: rejected because generated files would drift and fail checks.

### 2. Place type guidance under Cherri-specific guidance
Insert a dedicated subsection for Cherri input/output types within `Cherri-Specific Coding Guidance`.

Rationale:
- Keeps related language semantics close to existing Cherri coding rules.
- Improves discoverability without adding a new top-level section.

Alternatives considered:
- New top-level section: rejected to avoid unnecessary section-order churn.

### 3. Keep guidance operational and concise
Include practical rules only: value/content-item distinction, function/action signatures, coercion patterns, and output-surface expectations.

Rationale:
- Reduces ambiguity while avoiding overlong policy text.
- Better fit for day-to-day coding decisions made by agents.

Alternatives considered:
- Full language reference inside AGENTS: rejected as too verbose and duplicative of official docs.

## Risks / Trade-offs

- [Guidance becomes stale as Cherri evolves] -> Link to official docs and keep guidance principle-based rather than action-exhaustive.
- [Overly strict wording could conflict with valid patterns] -> Frame rules as preferred defaults with explicit diagnostic tools (`typeOf`, typed signatures).
- [Section bloat reduces readability] -> Keep additions short and integrated under existing Cherri guidance.

## Migration Plan

1. Update `agents-manifest.json` with Cherri input/output type guidance content.
2. Regenerate managed AGENTS files using `python3 scripts/generate_agents.py write`.
3. Validate deterministic output with `python3 scripts/generate_agents.py check`.
4. Confirm generated files include the new guidance in root and scoped targets.

## Open Questions

- Should the same type guidance be mirrored into `.github` and `openspec` scoped additions when they diverge in future?
- Do we want a short troubleshooting appendix for common Cherri type/coercion errors, or keep this strictly as policy guidance?
