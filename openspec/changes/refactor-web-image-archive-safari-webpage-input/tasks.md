## 1. Refactor the shortcut input contract

- [x] 1.1 Update `shortcuts/web-image-archive.cherri` definitions so the shortcut explicitly accepts Safari webpage input and text input.
- [x] 1.2 Refactor the early input-resolution logic so Safari-enhanced runs and text-based URL runs both fit the declared input contract.

## 2. Collapse the Safari path to one webpage JavaScript action

- [x] 2.1 Update `shortcuts/support/extract_page_images.js` so it returns structured image records with optional embedded data payloads from a single Safari webpage JavaScript action.
- [x] 2.2 Refactor `shortcuts/web-image-archive.cherri` to consume structured image records, prefer embedded Safari bytes when present, and remove the per-image `runJavaScriptOnWebpage(...)` download step.
- [x] 2.3 Preserve the existing non-Safari fallback by normalising fallback discoveries into the same record format used by the Safari path.

## 3. Update docs and verify

- [x] 3.1 Update `README.md` to explain the Safari webpage-input contract, the single-action Safari path, and the preserved non-Safari fallback.
- [x] 3.2 Compile `shortcuts/web-image-archive.cherri` after the refactor.
- [x] 3.3 Run `node --check shortcuts/support/extract_page_images.js`.
- [x] 3.4 Run `git diff --check -- shortcuts/web-image-archive.cherri shortcuts/support/extract_page_images.js README.md openspec/changes/refactor-web-image-archive-safari-webpage-input`.

## 4. Harden Safari extractor JavaScript error handling

- [x] 4.1 Guard URL parsing and filename decoding in `shortcuts/support/extract_page_images.js` so malformed image sources do not abort extraction.
- [x] 4.2 Ensure the Safari extractor still calls `completion(...)` after unexpected per-image or promise-level JavaScript failures.
- [x] 4.3 Re-run `node --check shortcuts/support/extract_page_images.js`, `cherri shortcuts/web-image-archive.cherri --skip-sign --output /tmp/web-image-archive.shortcut`, and `git diff --check -- shortcuts/support/extract_page_images.js openspec/changes/refactor-web-image-archive-safari-webpage-input`.
