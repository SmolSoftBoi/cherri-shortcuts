## Context

`web-image-archive` already supports workflow URL resolution, Safari-first discovery, fallback HTML parsing, optional image conversion, and optional model metadata. The weak point is how it uses webpage JavaScript: the shortcut currently runs one JavaScript action to discover live images and then a second JavaScript action inside the download loop to fetch authenticated image bytes. That shape is brittle against the Apple Shortcuts webpage-input contract and increases the chance of Safari Share Sheet failures.

The shortcut also only declares workflow surfaces today. It does not make the accepted input types explicit, even though the Safari-enhanced path is meaningfully different when the shortcut is launched with a Safari webpage input versus plain text or URL-like input.

## Goals / Non-Goals

**Goals:**

- Collapse the Safari-enhanced path down to one `runJavaScriptOnWebpage(...)` action per run.
- Carry forward enough data from that single Safari JavaScript result to avoid a second webpage JavaScript step for authenticated same-origin images.
- Make the shortcut input contract explicit for Safari webpage input and text-based URL input.
- Preserve the existing non-Safari URL fallback path and archive flow.

**Non-Goals:**

- Removing the non-Safari fallback path.
- Expanding support to new workflow surfaces beyond the ones already in place.
- Guaranteeing authenticated downloads for every cross-origin image source; the Safari byte-carry path is best-effort and should mainly improve same-origin authenticated images.

## Decisions

### Use one Safari webpage JavaScript action to return structured image records

The Safari path will run one extractor script that returns newline-delimited records. Each record will include the suggested filename, resolved image URL, optional alt text, and an optional data URL payload for same-origin images that Safari can fetch with the active session.

Alternative considered:
- Preserve the existing discovery action plus per-image JavaScript download actions. Rejected because it keeps the repeated webpage JavaScript pattern that conflicts with the Safari webpage-input contract.

### Keep URL fallback as a parallel normalised record format

The fallback HTML parsing path will continue to discover image URLs from downloaded page source, but it will normalise those results into the same record format the Safari path uses. That keeps the downstream archive loop simple and avoids branching the entire processing pipeline.

Alternative considered:
- Keep two separate downstream loops for Safari and fallback discovery. Rejected because it would duplicate the image preparation and archive logic.

### Make accepted input types explicit

The shortcut will declare inputs that cover Safari webpage input and text-based input. This keeps the Safari Share Sheet contract visible in the source and makes it clearer why the shortcut can support both live Safari runs and plain URL-driven fallback runs.

Alternative considered:
- Leave input types implicit and rely only on `#define from`. Rejected because the input contract is a meaningful part of the runtime behaviour now.

## Risks / Trade-offs

- [Single-pass Safari extraction returns larger payloads] → Only embed data URL payloads for same-origin images where Safari session reuse is most likely to matter.
- [Some authenticated images remain unreachable] → Preserve `downloadURL(...)` fallback when the Safari record does not carry usable bytes.
- [Input-type declarations narrow where the shortcut appears] → Limit the change to Safari webpage and text input types that match the existing supported flows.
- [Normalising to record lines adds parsing complexity] → Keep the format flat, tab-delimited, and close to the current extractor output.

## Migration Plan

1. Update the shortcut definitions and input handling to make Safari webpage and text input explicit.
2. Refactor the Safari extractor script so it returns structured records with optional embedded data payloads.
3. Refactor the archive loop in `web-image-archive.cherri` to consume record lines, prefer embedded Safari bytes when present, and fall back to `downloadURL(...)` otherwise.
4. Update the README and verification notes, then recompile the shortcut.

## Open Questions

- None at proposal time.
