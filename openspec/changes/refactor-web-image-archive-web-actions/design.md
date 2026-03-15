## Context

`shortcuts/web-image-archive.cherri` already supports workflow input, Safari fallback, fetched-page discovery, optional model metadata, and optional image processing. The weak point is the webpage target pipeline: the shortcut currently takes the first URL from `ShortcutInput`, compares it directly to `getCurrentURL()`, fetches page details before validating the target, and uses a helper-style `runJS(...)` call even though Cherri documents `runJavaScriptOnWebpage(...)` as the web action for live Safari execution.

That combination makes the shortcut tolerant in some cases, but it also leaves avoidable ambiguity. A shared short URL, a wrapper URL that expands to the active page, or non-web input that still contains a URL-like token can push the shortcut into the wrong discovery branch or fail later than necessary.

## Goals / Non-Goals

**Goals:**

- Canonicalise workflow-provided and Safari-provided webpage targets before discovery begins.
- Reject unsupported targets before page metadata, downloads, or archive creation.
- Use documented Cherri web actions for live Safari webpage execution.
- Preserve the existing archive, image-processing, and optional metadata-provider behaviour after target resolution is complete.

**Non-Goals:**

- Adding new workflow surfaces beyond the ones already supported by `web-image-archive`.
- Replacing the current image extraction script or expanding scope to CSS background images, infinite-scroll assets, or login-gated content.
- Changing the archive manifest format except where the updated web-target handling needs clearer user-facing wording.
- Broadly refactoring unrelated shortcut logic.

## Decisions

### Build an ordered web-target resolution pipeline

The shortcut will resolve its target in this order:

1. Extract a candidate URL from `ShortcutInput`
2. Expand that URL when Cherri can provide a fuller target
3. Validate the resulting scheme and host as a supported webpage URL
4. Fall back to the current Safari page only when workflow input does not yield a usable webpage target

This keeps workflow-driven runs first-class while making the chosen target explicit before any downstream work starts.

Alternative considered:
- Keep using the first extracted URL as-is. Rejected because short URLs, redirecting URLs, and malformed inputs can push the shortcut into the wrong branch or fail too late.

### Compare canonical targets before choosing the live Safari path

The shortcut should only use live Safari webpage execution when the resolved workflow target and the current Safari page describe the same webpage after normalisation. A direct raw-string comparison is too brittle for wrapped or expanded URLs.

Alternative considered:
- Always prefer Safari whenever a current page exists. Rejected because it can silently ignore workflow input and archive the wrong page.

### Fail before page work when the target is not a supported webpage

The shortcut should stop before `getWebpageContents(...)`, `downloadURL(...)`, or archive creation when the resolved target does not have a supported web scheme and host. This keeps the failure mode clear and avoids wasted work.

Alternative considered:
- Let the later page fetch or download step fail implicitly. Rejected because the resulting behaviour is less predictable and harder to explain.

### Use the documented live-page web action name

The live Safari extraction path should call `runJavaScriptOnWebpage(...)` directly. That keeps the source aligned with Cherri's documented web surface and removes ambiguity between official actions and local helper names.

Alternative considered:
- Keep `runJS(...)` as a local alias. Rejected because the shortcut source is clearer when it names the official Cherri action directly.

## Risks / Trade-offs

- [Expanded URLs may not always improve equality checks] -> Treat expansion as a best-effort normalisation step and keep the fetched-page fallback when the live page still does not match.
- [Stricter validation can reject inputs that used to fail later] -> Use a direct user-facing message that explicitly asks for a supported webpage URL.
- [Canonical comparison still cannot guarantee semantic equality for every site] -> Keep live Safari matching conservative and preserve the validated fetched-page fallback.
- [Changing the live-page action name could expose hidden helper assumptions] -> Keep the extraction script unchanged and compile the shortcut after the refactor to catch any Cherri syntax issues.

## Migration Plan

1. Refactor the target-resolution block in `shortcuts/web-image-archive.cherri` so it extracts, expands, and validates webpage targets before page work begins.
2. Update the live Safari discovery branch to use canonical target matching and `runJavaScriptOnWebpage(...)`.
3. Keep the fetched-page fallback for validated targets that do not match the current Safari page.
4. Refresh `README.md` so the shortcut's supported web-input behaviour matches the implementation.
5. Compile the shortcut and record verification notes in the change.

## Open Questions

- None at proposal time.
