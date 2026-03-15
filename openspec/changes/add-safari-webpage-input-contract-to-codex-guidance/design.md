## Context

The repository already maintains Codex-facing guidance for Cherri web questions through the root and scoped `AGENTS.md` files and the local `cherri-docs` skill. That guidance currently points Codex to `#include 'actions/web'`, the official Cherri Web Actions docs, and companion Cherri docs when workflow input or launch surfaces matter.

Recent shortcut work exposed an unaddressed gap: `runJavaScriptOnWebpage(...)` is documented by Cherri as a Safari webpage action, but the operational contract behind that action comes from Apple Shortcuts. In practice, guidance also needs to explain that webpage JavaScript execution depends on Safari webpage input, is strongest in Safari Share Sheet flows, and becomes fragile when shortcuts convert webpage input to plain text too early or chain multiple webpage JavaScript actions without preserving Safari webpage input.

This change is guidance-led and should stay scoped to the Codex-facing surfaces that already explain Cherri web behaviour:

- `AGENTS.md`, `.github/AGENTS.md`, and `openspec/AGENTS.md`
- `.codex/skills/cherri-docs/SKILL.md`
- adjacent skill-local `agents/` metadata that shapes the Cherri docs skill

## Goals / Non-Goals

**Goals:**

- Teach Codex-facing guidance that `runJavaScriptOnWebpage(...)` depends on Safari webpage input and is not a generic URL-string action.
- Add companion Apple Shortcuts references for Safari webpage JavaScript execution alongside the existing Cherri Web Actions references.
- Surface the common design mistakes that follow from missing this contract, especially converting webpage input to text too early and chaining multiple webpage JavaScript actions without preserving Safari webpage input.
- Keep the guidance scoped to the Cherri web guidance surfaces rather than broad repository-wide prompt changes.

**Non-Goals:**

- Refactoring the `web-image-archive` shortcut or any other `.cherri` source as part of this proposal.
- Replacing the official Cherri docs as the source of truth for Cherri action names or includes.
- Documenting every Safari privacy or automation setting in depth beyond what is necessary to explain the webpage input contract.

## Decisions

### Treat Cherri docs and Apple docs as complementary, not competing

The guidance will keep the official Cherri Web Actions docs as the primary source for Cherri action names, includes, and CLI lookup patterns. It will add official Apple Shortcuts pages as companion references specifically for the Safari webpage input contract and multi-action behaviour of webpage JavaScript execution.

Alternative considered:
- Keep only Cherri docs in the guidance. Rejected because the Safari webpage input contract is not fully conveyed by the Cherri action signature alone.

### Make Safari webpage input explicit in Codex guidance

The guidance will name Safari webpage input as a concrete concept whenever it discusses `runJavaScriptOnWebpage(...)`. It should state that passing or deriving a URL string is not equivalent to preserving the Safari webpage input object that the Apple action expects.

Alternative considered:
- Phrase the issue as a generic Safari context or permission note. Rejected because that is too vague and does not explain the actual design constraint.

### Call out the two most common failure patterns

The updated guidance will explicitly warn about:

1. Converting Safari webpage input into text or URL values too early, then expecting webpage JavaScript actions to keep working.
2. Using multiple `runJavaScriptOnWebpage(...)` actions without preserving Safari webpage input for each action.

Alternative considered:
- Keep the guidance at a purely conceptual level. Rejected because the value here is preventing recurring design mistakes in actual shortcuts.

### Keep the scope limited to Cherri web guidance surfaces

The change will update the maintained AGENTS files, the local Cherri docs skill, and adjacent skill metadata only. It will not reopen the broader `update-codex-agents-and-skills` change or change unrelated skills.

Alternative considered:
- Fold this into the broader Codex guidance refresh. Rejected because this is a focused Cherri web guidance concern with a clear existing capability.

## Risks / Trade-offs

- [Apple guidance evolves separately from Cherri docs] → Keep Apple references companion-level and phrase repository guidance at the contract level rather than mirroring full Apple text.
- [Guidance becomes too Safari-specific for general web questions] → Limit the new wording to `runJavaScriptOnWebpage(...)` and related troubleshooting cases.
- [Codex over-rotates to Apple docs for general Cherri web questions] → Preserve Cherri docs as the first stop for action names and broad web-surface guidance.
- [The guidance still leaves room for ambiguity about input objects versus text] → Use explicit wording that webpage input and URL text are different shortcut values.

## Migration Plan

1. Update the maintained AGENTS files to extend Cherri web guidance with Safari webpage input contract notes and companion Apple docs links.
2. Update `.codex/skills/cherri-docs/SKILL.md` and its adjacent metadata so Safari webpage JavaScript questions are routed through both Cherri and Apple docs appropriately.
3. Manually review the updated Markdown and YAML for consistent terminology around Safari webpage input, Share Sheet scope, and companion docs.

## Open Questions

- None at proposal time.
