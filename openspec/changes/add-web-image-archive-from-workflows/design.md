## Context

`shortcuts/web-image-archive.cherri` currently assumes a live Safari page: it reads the current page URL, runs JavaScript against the active webpage to collect image URLs, and stops if no current Safari URL is available. The shortcut already has stable presentation definitions, but it does not yet use Cherri's `#define from` workflow surfaces to broaden how users can invoke it.

That gap matters because the current shortcut is useful beyond the exact “run from active Safari tab” path. Cherri's workflow definitions can expose the shortcut through surfaces such as the Share Sheet, on-screen content, and Spotlight input, but those entry points only help if the shortcut can resolve a source page and choose an image-discovery strategy that matches the available context.

## Goals / Non-Goals

**Goals:**

- Add supported `from workflows` definitions to the existing web image archive shortcut.
- Let the shortcut resolve its target page from `ShortcutInput` when launched from supported workflow surfaces, while preserving the current Safari-page fallback.
- Support a non-Safari discovery mode for workflow-driven URL input so the shortcut remains useful when no live webpage DOM is available.
- Keep the existing archive and optional metadata flow intact after the target page has been resolved.

**Non-Goals:**

- Rebuilding the shortcut around every workflow value listed in the Cherri docs.
- Adding Quick Actions, Watch, notifications, or sleep-mode entry points that do not naturally fit webpage archiving.
- Guaranteeing full parity between live DOM extraction and fetched HTML parsing for JavaScript-heavy or highly dynamic sites.
- Changing the optional metadata provider model beyond what is required to keep it compatible with the new entry paths.

## Decisions

### Support the workflow surfaces that fit webpage archiving

The shortcut will target `sharesheet`, `onscreen`, and `spotlight` workflow surfaces. These are the surfaces that can naturally supply webpage context or user-supplied URL input for an archive action.

Alternative considered:
- Add every available workflow surface from the Cherri docs. Rejected because several surfaces do not fit this shortcut's purpose and would add confusing entry points without improving the archive behaviour.

### Resolve the source page through an ordered input pipeline

The shortcut should resolve its target page in this order:

1. A usable URL derived from `ShortcutInput`
2. The current Safari page URL
3. A user-visible failure path when neither source is available

This keeps workflow-driven launches first-class while preserving the existing Safari behaviour.

Alternative considered:
- Keep the current Safari-only resolution and only add `from` definitions. Rejected because it would make the new workflow surfaces largely cosmetic.

### Use dual discovery modes

The shortcut should use live DOM extraction when it has an active Safari page for the resolved target URL, and fall back to fetched-page parsing when it only has URL input from a workflow surface. This preserves the higher-fidelity Safari path while still letting workflow-driven invocations succeed.

Alternative considered:
- Use only live DOM extraction. Rejected because Share Sheet or Spotlight launches may not have a live page context.
- Use only fetched HTML parsing. Rejected because it would reduce quality for the existing Safari-first case and miss some already-loaded DOM state.

### Keep workflow definitions aligned with documented limits

The shortcut documentation should explain which workflow surfaces are supported and that live Safari extraction remains the most complete mode. Workflow-driven URL input should be framed as a practical fallback rather than a perfect substitute.

Alternative considered:
- Present all launch surfaces as equivalent. Rejected because that would overstate what fetched-page parsing can reliably discover.

## Risks / Trade-offs

- [Fetched HTML parsing misses images that only exist in the live DOM] → Prefer live Safari extraction whenever the target URL matches the active page and document the fallback limitations.
- [Workflow input may not contain a clean URL] → Normalise `ShortcutInput`, validate the result, and stop with a clear message when the shortcut cannot derive a usable source page.
- [Adding more launch surfaces increases behavioural complexity] → Limit the workflow set to the surfaces that fit the shortcut and keep the resolution order explicit.
- [Share Sheet support may invite unsupported contexts] → Document the supported input expectation and fail clearly when the shared item does not produce a usable webpage target.

## Migration Plan

1. Add the chosen Cherri `from workflows` definitions to the existing shortcut and update its source-page resolution logic.
2. Add a fallback image-discovery path for workflow-driven URL input when no live Safari page context is available.
3. Refresh the README and any related shortcut guidance to explain the supported launch surfaces and their limits.
4. Compile the shortcut and manually review the changed guidance to confirm the workflow behaviour is documented consistently.

## Open Questions

- Should the implementation also add `search` for discoverability once the `spotlight` input path exists, or keep the first pass limited to the workflow surfaces that directly change behaviour?
