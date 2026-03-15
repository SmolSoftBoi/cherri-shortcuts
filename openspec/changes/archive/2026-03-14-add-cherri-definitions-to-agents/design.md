## Context

The repository already maintains its AGENTS files directly in Markdown and uses them to guide contributors on Cherri-specific topics such as includes, variables, functions, packages, comments, and documentation lookup. However, the current guidance does not explicitly mention Cherri definitions, even though definitions are a first-class part of the language and control shortcut metadata such as icon, input and output types, launch behaviour, and naming.

That omission matters because “definitions” is an overloaded word in Cherri discussions. Without explicit repository guidance, contributors may confuse `#define` shortcut metadata with functions, action definitions, or raw actions. The implementation should close that gap with minimal edits to the maintained AGENTS files rather than broad restructuring.

## Goals / Non-Goals

**Goals:**

- Add explicit guidance for Cherri `#define` definitions to the maintained AGENTS files that already provide Cherri language guidance.
- Clarify that Cherri definitions are shortcut metadata, distinct from functions and action definitions.
- Add the official Cherri Definitions documentation page to the curated AGENTS reference links wherever comparable Cherri language references are already listed.

**Non-Goals:**

- Rewriting the AGENTS files into a full Cherri language tutorial.
- Expanding the change to skills, prompts, or other Codex assets beyond AGENTS file content.
- Changing the repository's direct-edit maintenance model for AGENTS files.

## Decisions

### Treat “Cherri definitions” as `#define` shortcut metadata

The guidance will use “Cherri definitions” to mean the `#define` language feature documented in the official Definitions page, not functions, action definitions, or raw actions.

Alternative considered:
- Use broader wording that treats definitions as any reusable declaration. Rejected because it would blur distinct Cherri concepts and make the AGENTS guidance less precise.

### Update every maintained AGENTS file that curates core Cherri guidance

The change will target the maintained AGENTS files that already carry Cherri-specific language guidance and reference links: the repository root, `.github/`, and `openspec/`.

Alternative considered:
- Update only the repository root AGENTS file. Rejected because scoped AGENTS files in this repo already repeat and adapt Cherri guidance, so leaving them unchanged would preserve inconsistency.

### Add definitions guidance near the existing language structure guidance

Definitions guidance should live alongside the current sections that discuss Cherri language structure and reference links, rather than in a new isolated policy block.

Alternative considered:
- Add a separate definitions-only section far from the existing Cherri guidance. Rejected because it would make the guidance harder to scan and less likely to stay in sync with the related language topics.

## Risks / Trade-offs

- [Definitions may still be confused with functions or action definitions] → Use explicit wording that names `#define` and distinguishes it from other Cherri declaration styles.
- [Scoped AGENTS files could drift again after the update] → Apply the same conceptual wording and reference link additions across all maintained AGENTS files that already curate Cherri guidance.
- [This change overlaps with the broader `update-codex-agents-and-skills` proposal] → Keep this change narrowly focused on AGENTS content so it can be merged cleanly or folded into the broader change later if preferred.

## Migration Plan

1. Review the maintained AGENTS files for where Cherri language guidance and reference links currently appear.
2. Add concise definitions guidance and the official Definitions link to each relevant AGENTS file.
3. Manually review the updated AGENTS files together to confirm the terminology and links stay consistent.

## Open Questions

- Should the eventual broader Codex guidance refresh reuse the same wording verbatim, or keep only the conceptual requirement and allow each scoped AGENTS file to phrase it differently?
