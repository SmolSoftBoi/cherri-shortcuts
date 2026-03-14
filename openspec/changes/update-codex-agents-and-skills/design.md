## Context

This repository now has several Codex-facing instruction surfaces with different audiences and scopes:

- repository-wide and directory-scoped `AGENTS.md` files
- local skills in `.codex/skills/`
- GitHub-distributed prompt and skill assets in `.github/prompts/` and `.github/skills/`
- skill-local assistant metadata such as `.codex/skills/cherri-docs/agents/openai.yaml`

The current layout is workable, but ownership is implicit rather than explicit. Some surfaces are duplicated, such as the OpenSpec skills in both `.codex/skills/` and `.github/skills/`, while other surfaces are intentionally local-only, such as `cherri-docs`. Without a documented model for which copy is authoritative and when assistant metadata should exist, routine updates can drift or become inconsistent.

## Goals / Non-Goals

**Goals:**

- Clarify the guidance hierarchy for Codex-facing files across root, `.github/`, `openspec/`, and `.codex/`.
- Define which skill copies are authoritative and how mirrored skill content stays aligned.
- Establish a lightweight pattern for skill-local agent metadata and companion descriptions.
- Keep all guidance directly edited in version control, without reintroducing a generator.

**Non-Goals:**

- Building an automated sync tool or generator for AGENTS files or skills.
- Expanding the repository to support every possible assistant vendor or metadata format.
- Reworking the functional behaviour of the OpenSpec prompts themselves beyond what is needed to keep skill and prompt guidance aligned.

## Decisions

### Treat `.codex/skills/` as the source of truth for local skill content

The design will treat `.codex/skills/` as the authoritative location for skill content that Codex uses locally. `.github/skills/` will remain a distribution mirror for the subset of skills that need to ship with GitHub-facing OpenSpec prompts.

Alternative considered:
- Treat `.github/skills/` as authoritative. Rejected because `.codex/skills/` already carries local-only skills and assistant metadata that do not naturally belong to GitHub prompt distribution.

### Keep scoped AGENTS guidance close to distinct Codex-owned surfaces

The design will update the existing root, `.github/`, and `openspec/` AGENTS files, and it may introduce `.codex/AGENTS.md` if the local skills and environment files need guidance that does not belong at the repository root.

Alternative considered:
- Keep all Codex guidance only at the repository root. Rejected because skill authoring, agent metadata, and local environment conventions are specific enough to justify a local scope.

### Use explicit mirroring rules instead of assuming every skill must exist twice

Not every skill should be mirrored. Shared OpenSpec skills should stay aligned between `.codex/skills/` and `.github/skills/`, while local specialist skills can remain Codex-only when there is no GitHub-distributed consumer.

Alternative considered:
- Mirror every skill into both directories. Rejected because it increases maintenance cost and would make `.github/skills/` carry assets that are only meaningful to local Codex workflows.

### Keep agent metadata next to the skill that uses it

Assistant-specific metadata will live under a skill-local `agents/` directory when needed. This keeps presentation metadata close to the skill instructions and avoids introducing a central registry.

Alternative considered:
- Store all assistant metadata in one root manifest. Rejected because it creates indirection and makes per-skill review harder.

## Risks / Trade-offs

- [Mirroring rules may still be applied inconsistently] → Document the authoritative source and mirror criteria in both AGENTS guidance and the affected skill directories.
- [Adding another scoped AGENTS file could increase overlap] → Keep each AGENTS file narrowly scoped and avoid copying whole sections unless the local directory truly owns them.
- [Skill metadata may diverge across assistants over time] → Limit metadata to lightweight, assistant-specific presentation hints and keep behavioural instructions in `SKILL.md`.
- [Prompt and skill updates can still drift when edited separately] → Update the proposal tasks so prompt, mirrored skill, and AGENTS changes are reviewed together.

## Migration Plan

1. Audit the current AGENTS files, skill directories, prompt files, and skill-local metadata.
2. Update or add scoped AGENTS guidance where Codex-owned surfaces need local rules.
3. Align mirrored skill copies and refresh any prompt text that depends on those skills.
4. Add or update skill-local `agents/` metadata where it clarifies assistant presentation or invocation.
5. Verify that the repository remains apply-ready with directly maintained Markdown and YAML assets only.

## Open Questions

- Should `.github/skills/` continue to carry only the OpenSpec-related skill subset, or should other broadly reusable local skills also be mirrored there?
