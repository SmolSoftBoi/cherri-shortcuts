## Context

The repository already documents Cherri definitions in the maintained `AGENTS.md` files, and the local `cherri-docs` skill provides docs-first guidance for Cherri questions. That guidance currently stops at the general idea of `#define` metadata and does not explain that Cherri's `#define from` workflows affect where a shortcut appears, when `#define quickactions` is valid, or how Spotlight input maps to `ShortcutInput`.

This change is documentation-only, but it crosses several Codex-facing surfaces:

- repository and scoped `AGENTS.md` files
- the local `.codex/skills/cherri-docs/SKILL.md`
- any adjacent `agents/` metadata that shapes how the Cherri docs skill is presented

The implementation must stay aligned with the official Cherri Definitions docs, especially the `From (Workflows)` and `Quick Action Types` sections.

## Goals / Non-Goals

**Goals:**

- Teach Codex-facing guidance that `#define from` is shortcut-behaviour metadata, not just presentation metadata.
- Capture the supported workflow values at a high level and explain the relationship between `from`, `quickactions`, and `ShortcutInput`.
- Keep the guidance scoped to the Cherri-facing AGENTS and skill surfaces that already explain shortcut definitions.

**Non-Goals:**

- Changing shortcut source files or adding new runtime workflow definitions to existing `.cherri` shortcuts.
- Rewriting the GitHub OpenSpec prompts or mirrored OpenSpec skills, which are not the Cherri docs surface for this topic.
- Reproducing the full Cherri Definitions page verbatim inside repository guidance.

## Decisions

### Add `from workflows` guidance where Cherri definitions are already documented

The change will update the maintained `AGENTS.md` files and the local `cherri-docs` skill, because those are the Codex-facing surfaces that already explain Cherri definitions and docs lookup behaviour.

Alternative considered:
- Update every Codex skill and prompt that mentions Cherri. Rejected because most of those surfaces are OpenSpec workflow instructions rather than Cherri language guidance.

### Explain behavioural implications, not just the syntax list

The guidance will explicitly call out that `#define from` changes invocation surfaces, that `#define quickactions` depends on `quickactions` being present in the `from` definition, and that Spotlight input should be handled through `ShortcutInput`.

Alternative considered:
- List only the supported workflow names. Rejected because it would miss the main reason this topic matters in Codex guidance: avoiding incorrect assumptions about runtime behaviour.

### Keep the official docs links as the detailed source of truth

The repository guidance will stay concise and point to the official Cherri Definitions documentation for the full workflow list and details, rather than trying to duplicate the whole matrix in multiple files.

Alternative considered:
- Copy the complete workflow list and quick action explanation into every guidance surface. Rejected because it increases drift risk and duplicates external documentation unnecessarily.

## Risks / Trade-offs

- [Workflow guidance becomes too verbose] → Keep the repository wording concise and point to the official Definitions docs for the exhaustive list.
- [AGENTS and skill guidance drift from each other] → Update the maintained AGENTS files and the `cherri-docs` skill in the same change and keep the workflow wording conceptually aligned.
- [Future Cherri docs add or rename workflow values] → Phrase repository guidance at the behaviour level and preserve the official docs link for the current value list.

## Migration Plan

1. Update the relevant AGENTS files to extend the existing Cherri definitions guidance with `from workflows` behaviour.
2. Update the local `cherri-docs` skill and nearby metadata so the skill can steer Cherri workflow-definition questions to the right official docs and concepts.
3. Manually review the changed Markdown and YAML files for consistent scope, wording, and documentation links.

## Open Questions

- Should `.codex/AGENTS.md` also include a short reminder that only the local `cherri-docs` skill, not the mirrored OpenSpec skills, needs this workflow-definition guidance?
