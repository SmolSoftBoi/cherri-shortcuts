## Why

The current `web-image-archive` shortcut uses `runJavaScriptOnWebpage(...)` in a way that does not align cleanly with the Safari webpage input contract behind the Apple Shortcuts action. That mismatch makes Safari Share Sheet runs brittle, especially once the shortcut chains multiple webpage JavaScript steps or converts shared webpage input into plain text too early.

## What Changes

- Refactor `web-image-archive` so the Safari-enhanced path uses a single `runJavaScriptOnWebpage(...)` action to gather live DOM image records and any reusable authenticated image payloads in one pass.
- Update the shortcut metadata and input handling so Safari webpage input and text-based URL input are both explicit parts of the shortcut contract.
- Preserve the existing URL-driven fallback path for non-Safari runs or cases where live Safari discovery does not yield usable image records.
- Refresh the shortcut documentation to explain the Safari webpage-input contract and the new single-action Safari JavaScript flow.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `web-image-archive-workflows`: refine the shortcut so Safari webpage input is treated as a first-class input contract and the live Safari path no longer depends on repeated webpage JavaScript actions.

## Impact

- Affected code: `shortcuts/web-image-archive.cherri`, `shortcuts/support/extract_page_images.js`, `README.md`, and the new change artefacts.
- Affected systems: Cherri workflow definitions, Safari Share Sheet input handling, live Safari DOM extraction, authenticated image retrieval for same-origin Safari sessions, and fallback URL-based page parsing.
- Dependencies: no new runtime dependencies; rely on existing Cherri web, text, documents, images, and scripting actions plus the documented Apple Shortcuts webpage-input contract.
