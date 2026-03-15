## Context

`web-image-archive` already extracts workflow URLs, expands and validates webpage targets, and chooses between a live Safari DOM path and a downloaded-page fallback. The problem is that the current live-DOM branch is gated too tightly: the shortcut only uses `runJavaScriptOnWebpage(...)` when its resolved target matches the current Safari page after canonicalisation. In Safari Share Sheet runs, that equality can still fail even though Safari clearly has the live page open, which pushes the shortcut onto the weaker fetched-page parser.

That fallback is materially worse for modern sites because it only sees downloadable URLs that can be recovered from raw page source. It misses images injected into the DOM, lazy-loaded sources, and other runtime state that Safari already has available.

## Goals / Non-Goals

**Goals:**

- Prefer live Safari DOM extraction whenever Safari exposes a current webpage context during the shortcut run.
- Preserve workflow URL expansion and validation for metadata, fallback routing, and non-Safari runs.
- Allow Safari-context runs to continue even when workflow input is missing, wrapped, or otherwise unsuitable for direct matching.
- Keep the non-Safari fallback path for cases where no live Safari context exists or live DOM extraction does not produce usable images.

**Non-Goals:**

- Removing the fetched-page fallback entirely.
- Expanding image discovery beyond the existing extractor script.
- Adding new workflow surfaces or changing the optional model and image-processing features.
- Solving every case where Safari might be open on the wrong page; this change is about prioritising the live page when Safari is clearly in play.

## Decisions

### Prefer Safari context for discovery, not just for fallback

If `getCurrentURL()` returns a usable Safari page, the shortcut should attempt live DOM extraction first, regardless of whether workflow input was also supplied. Workflow input remains useful for input handling and fallback, but it should no longer block the live Safari path.

Alternative considered:
- Keep using canonical URL equality as the gate for live DOM extraction. Rejected because that is the behaviour causing Share Sheet failures on pages Safari already has open.

### Separate input validation from discovery-source selection

Workflow URL extraction, expansion, and validation should still happen, but invalid or mismatched workflow input should not force an early failure when Safari already provides a usable current page. Early failure should be reserved for runs where neither workflow input nor Safari context yields a usable webpage source.

Alternative considered:
- Preserve the current early failure when workflow input is present but invalid. Rejected because Safari Share Sheet runs can still provide a valid live page even when the shared input is not suitable for direct target matching.

### Keep fetched-page parsing as a secondary path

The shortcut should still fall back to `downloadURL(...)` plus source parsing when live Safari context is unavailable or when the Safari DOM extraction does not return usable image URLs. This keeps non-Safari launch surfaces working and provides a recovery path for Safari runs where DOM extraction fails unexpectedly.

Alternative considered:
- Make live Safari DOM extraction the only path whenever Safari is open. Rejected because the fallback remains useful for robustness and for runs outside Safari.

## Risks / Trade-offs

- [Safari may be open on an unrelated page during a non-Safari-triggered run] → Keep workflow-based fallback available and document that this preference is aimed at Safari-originated runs, especially the Share Sheet.
- [Relaxing the workflow-input gate reduces strictness] → Retain the explicit failure path when neither Safari context nor validated workflow input can supply a usable webpage source.
- [Trying live DOM first can add one failed attempt before fallback] → The extracted-page path remains available immediately after the live attempt and is still cheaper than forcing every Safari run through HTML parsing.

## Migration Plan

1. Refactor the discovery selection in `shortcuts/web-image-archive.cherri` so a usable Safari current page triggers live DOM extraction first.
2. Adjust the early validation path so invalid workflow input does not abort runs that still have Safari page context available.
3. Preserve and document the fetched-page fallback for runs without Safari context or with empty live DOM results.
4. Compile the shortcut and manually verify the updated control flow and documentation.

## Open Questions

- None at proposal time.
