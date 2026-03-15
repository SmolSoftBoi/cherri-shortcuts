## 1. Discovery Preference Update

- [x] 1.1 Refactor `shortcuts/web-image-archive.cherri` so a usable current Safari page triggers live DOM extraction before fetched-page fallback.
- [x] 1.2 Adjust the workflow-input validation path so Safari-context runs are not aborted just because the shared input is missing, wrapped, or otherwise unsuitable for direct target matching.
- [x] 1.3 Update `shortcuts/support/extract_page_images.js` so the embedded Safari script finishes with `completion(result)`.

## 2. Fallback and Documentation

- [x] 2.1 Preserve the fetched-page fallback for runs without live Safari context or with empty live DOM results.
- [x] 2.2 Update `README.md` to explain that Safari context is preferred for discovery, especially for Safari Share Sheet runs, while non-Safari runs still rely on validated workflow URLs and fallback parsing.
- [x] 2.3 Stop reopening freshly saved files with `getFile(...)` and use the file returned by `saveFile(...)` directly for archive inputs.
- [x] 2.4 Build archive inputs from explicitly named in-memory items so downloaded images are included even when Shortcuts file-handle semantics vary at runtime.
- [x] 2.5 Attempt image downloads through the live Safari page context first when discovery came from Safari, so authenticated image requests can reuse the active session before falling back to `downloadURL(...)`.

## 3. Verification

- [x] 3.1 Compile `shortcuts/web-image-archive.cherri` after the control-flow update.
- [x] 3.2 Manually review the shortcut source and docs to confirm the Safari-first discovery preference and fallback behaviour are consistent.
- [x] 3.3 Run a syntax check on `shortcuts/support/extract_page_images.js` after the callback update.
- [x] 3.4 Re-compile `shortcuts/web-image-archive.cherri` after the `saveFile(...)` follow-up and confirm the file-flow change builds cleanly.
- [x] 3.5 Re-compile `shortcuts/web-image-archive.cherri` after the named archive-input follow-up and confirm the ZIP-input change builds cleanly.
- [x] 3.6 Re-compile `shortcuts/web-image-archive.cherri` after the Safari-context authenticated-download follow-up and confirm the live-download branch builds cleanly.

## Verification Commands

- `node --check shortcuts/support/extract_page_images.js`
- `cherri shortcuts/web-image-archive.cherri --skip-sign --output /tmp/web-image-archive.shortcut`
- `git diff --check -- shortcuts/web-image-archive.cherri README.md openspec/changes/prefer-live-safari-dom-when-available/tasks.md`
