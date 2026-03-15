## Context

The repository already teaches Codex about Cherri definitions, workflow surfaces, and image-related action boundaries through the maintained `AGENTS.md` files and the local `cherri-docs` skill. That guidance currently stops short of Cherri web actions. As a result, Codex-facing guidance does not yet explain that Cherri web questions usually start with `#include 'actions/web'`, that `cherri --docs=web` is the narrowest local docs lookup, or that the web surface itself spans Safari-page actions, HTTP fetch or request actions, and URL parsing utilities.

This change is guidance-led, but it crosses several Codex-facing surfaces and may include narrow supporting source edits:

- repository and scoped `AGENTS.md` files
- the local `.codex/skills/cherri-docs/SKILL.md`
- adjacent `agents/` metadata that shapes how the Cherri docs skill is presented
- nearby `.cherri` shortcuts or helper comments when a small refactor is the clearest way to keep examples aligned with the guidance

The implementation must stay aligned with the official Cherri Web Actions docs and avoid mixing repository helper names with the documented Cherri action names.

## Goals / Non-Goals

**Goals:**

- Teach Codex-facing guidance where Cherri web-action questions belong and which include or docs page should ground the answer.
- Capture the practical boundary between Safari-page actions, HTTP or request actions, and URL parsing utilities inside `actions/web`.
- Mention companion docs such as Definitions or Variables when a web question crosses into workflow surfaces, `ShortcutInput`, or related runtime concepts.
- Keep the guidance scoped to the Cherri-facing AGENTS and skill surfaces that already explain language usage and docs lookup behaviour.
- Make the guidance explicit that official Cherri action names are the source of truth even when repository helpers wrap some of that behaviour.
- Permit narrow supporting refactors in existing shortcuts when they materially improve the alignment between repository guidance and live examples.

**Non-Goals:**

- Broadly refactoring existing `.cherri` shortcuts or adding new web features to them.
- Duplicating the full Cherri Web Actions catalogue in repository guidance.
- Rewriting GitHub OpenSpec prompts or mirrored OpenSpec skills that are not the Cherri docs surface for this topic.

## Decisions

### Add web guidance where Cherri language guidance already exists

The change will update the maintained `AGENTS.md` files and the local `cherri-docs` skill, because those are the Codex-facing surfaces that already explain Cherri language structure and docs lookup behaviour.

Alternative considered:
- Update every skill or prompt that mentions Cherri. Rejected because most of those files are workflow instructions rather than language guidance.

### Explain the three main web sub-surfaces

The guidance will explicitly frame `actions/web` as covering:

1. Safari-page actions such as current-page context or webpage execution
2. HTTP or request actions such as downloads and JSON or form requests
3. URL parsing or utility actions such as `getURLs`, `getURLDetail`, and encoding or decoding helpers

Alternative considered:
- Mention only `#include 'actions/web'`. Rejected because Codex would still be prone to giving vague or muddled answers about which part of the web surface applies.

### Prefer official Cherri action names over repository helper names

The guidance will treat documented Cherri action names such as `runJavaScriptOnWebpage(...)` as canonical and avoid presenting local wrappers or helper aliases as though they were first-class documented web actions.

Alternative considered:
- Ignore helper-versus-official naming distinctions. Rejected because that would make Codex guidance less reliable when the repo contains convenience wrappers.

### Keep the official Web Actions docs as the detailed source of truth

The repository guidance will stay concise and point to the official Cherri Web Actions documentation, with local CLI lookups such as `cherri --docs=web` and `cherri --action=<action>` treated as the quick path. When a web question crosses into workflow surfaces or `ShortcutInput`, the guidance should also mention companion docs such as Definitions or Variables instead of forcing the entire answer through the Web Actions page alone.

Alternative considered:
- Copy the complete web-action list into AGENTS and skill files. Rejected because it would duplicate external docs and raise drift risk.

### Allow narrow source alignment edits when they materially improve the guidance

The change may touch existing `.cherri` shortcut files when a small refactor or helper-comment adjustment is the clearest way to keep repository guidance aligned with real examples. These source changes should remain small and directly related to the clarified Cherri web guidance.

Alternative considered:
- Forbid any `.cherri` source edits. Rejected because the user explicitly allowed shortcut refactors, and a small example-alignment update may be more maintainable than leaving guidance disconnected from live source.

## Risks / Trade-offs

- [Web guidance becomes too broad] → Keep the repository wording focused on entry points, boundaries, and documentation sources rather than full reference material.
- [Helper names are mistaken for official Cherri actions] → Keep the guidance anchored to documented action names and describe local wrappers only as wrappers.
- [Safari, HTTP, and URL utilities get blurred together] → Explicitly name the three sub-surfaces and give each a clear role in the guidance.
- [Companion docs references become too broad] → Mention Definitions or Variables only when the web question actually crosses into launch surfaces, workflow input, or runtime metadata.
- [Future Cherri docs add or move web actions] → Preserve the official Web Actions docs link and keep repository wording at the behaviour level.
- [Optional source edits expand beyond alignment work] → Keep any `.cherri` refactor tightly scoped to examples, helper comments, or directly related guidance alignment.

## Migration Plan

1. Update the maintained AGENTS files to extend the Cherri language guidance with web-action entry points and boundary reminders.
2. Update the local `cherri-docs` skill and adjacent metadata so web-action questions are explicitly in scope and routed to the right official docs.
3. Apply any small supporting `.cherri` source edits only if they materially improve alignment between the guidance and repository examples.
4. Manually review the changed Markdown, YAML, and any touched Cherri source files for consistent terminology, docs links, and scope.

## Open Questions

- If a supporting `.cherri` refactor becomes useful, which existing shortcut or helper comment would be the most valuable place to anchor the clarified web guidance?
