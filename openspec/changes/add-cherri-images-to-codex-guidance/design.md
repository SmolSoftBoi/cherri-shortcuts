## Context

The repository already teaches Codex about Cherri definitions and workflow surfaces through the maintained `AGENTS.md` files and the local `cherri-docs` skill. That guidance currently stops short of Cherri image-related actions. As a result, Codex-facing guidance does not yet explain that Cherri image processing starts with `#include 'actions/images'`, that photo-library access is a separate concern under `actions/photos`, or that nearby video and other media transforms may live under `actions/media`.

This change is guidance-led, but it crosses several Codex-facing surfaces and may include narrow supporting source edits:

- repository and scoped `AGENTS.md` files
- the local `.codex/skills/cherri-docs/SKILL.md`
- adjacent `agents/` metadata that shapes how the Cherri docs skill is presented

The implementation must stay aligned with the official Cherri Images docs and the companion Photos and Media docs when a question crosses from image manipulation into library access or adjacent media transforms.

## Goals / Non-Goals

**Goals:**

- Teach Codex-facing guidance where Cherri image-action questions belong and which include or docs page should ground the answer.
- Capture the practical boundary between `actions/images`, `actions/photos`, and `actions/media` so future guidance does not mix up image processing, Photos-library access, and nearby media transforms.
- Keep the guidance scoped to the Cherri-facing AGENTS and skill surfaces that already explain language usage and docs lookup behaviour.
- Permit narrow supporting edits to nearby `.cherri` source files when the guidance would otherwise drift from repository examples or helper comments.

**Non-Goals:**

- Broadly refactoring existing `.cherri` shortcuts or adding new image-processing features to them.
- Duplicating the full Cherri Images action catalogue in repository guidance.
- Rewriting GitHub OpenSpec prompts or mirrored OpenSpec skills that are not the Cherri docs surface for this topic.

## Decisions

### Add image guidance where Cherri language guidance already exists

The change will update the maintained `AGENTS.md` files and the local `cherri-docs` skill, because those are the Codex-facing surfaces that already explain Cherri language structure and docs lookup behaviour.

Alternative considered:
- Update every skill or prompt that mentions Cherri. Rejected because most of those files are workflow instructions rather than language guidance.

### Explain the `images` versus `photos` boundary, and mention the nearby `media` surface

The guidance will explicitly say that `#include 'actions/images'` is for manipulating image values, while `#include 'actions/photos'` is for selecting, searching, saving, or otherwise interacting with the Photos library. It will also mention `#include 'actions/media'` as the nearby companion surface for video, audio, screenshots, and broader media transforms when a question extends beyond still-image processing.

Alternative considered:
- Mention only `actions/images`. Rejected because Codex would still be prone to answering photo-library or video-adjacent questions from the wrong docs page.

### Keep the official Images, Photos, and Media docs as the detailed source of truth

The repository guidance will stay concise and point to the official Cherri Images documentation, plus the companion Photos and Media documentation when the question crosses those boundaries. CLI lookups such as `cherri --docs=images`, `cherri --docs=photos`, `cherri --docs=media`, and `cherri --action=<action>` should be treated as the quick local path.

Alternative considered:
- Copy the complete Images, Photos, and Media action lists into AGENTS and skill files. Rejected because it would duplicate external docs and raise drift risk.

### Allow narrow source alignment edits when they materially improve the guidance

The change may touch existing `.cherri` shortcut files when a small source edit or helper comment is the clearest way to keep repository guidance aligned with real examples. These source changes should remain small and directly related to the clarified Cherri images and media guidance.

Alternative considered:
- Forbid any `.cherri` source edits. Rejected because the user explicitly allowed them, and a small example-alignment update may be more maintainable than leaving guidance disconnected from live source.

## Risks / Trade-offs

- [Image guidance becomes too broad] → Keep the repository wording focused on entry points, boundaries, and documentation sources rather than full action reference material.
- [AGENTS and skill guidance drift from each other] → Update the maintained AGENTS files and the `cherri-docs` skill in the same change and keep the images-versus-photos-versus-media wording conceptually aligned.
- [Optional source edits expand beyond alignment work] → Keep any `.cherri` edits tightly scoped to examples, helper comments, or directly related guidance alignment.
- [Future Cherri docs add or move image or media actions] → Preserve the official Images, Photos, and Media docs links as the detailed source of truth and keep repository wording at the behaviour level.

## Migration Plan

1. Update the maintained AGENTS files to extend the Cherri language guidance with image-action, Photos-boundary, and nearby Media-boundary reminders.
2. Update the local `cherri-docs` skill and adjacent metadata so image-action questions are explicitly in scope and routed to the right official docs.
3. Apply any small supporting `.cherri` source edits only if they materially improve alignment between the guidance and repository examples.
4. Manually review the changed Markdown, YAML, and any touched Cherri source files for consistent terminology, docs links, and scope.

## Open Questions

- If a supporting `.cherri` source edit becomes useful, which existing shortcut or helper comment would be the most valuable place to anchor the clarified images, photos, and media guidance?
