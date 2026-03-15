## 1. Web Target Resolution

- [x] 1.1 Refactor `shortcuts/web-image-archive.cherri` to extract, expand, and validate the resolved webpage target before page metadata or archive work begins.
- [x] 1.2 Add a clear early failure path for workflow or Safari input that does not produce a supported webpage URL.

## 2. Discovery Path Refactor

- [x] 2.1 Update the live Safari discovery branch to compare canonical targets before choosing the live-page path.
- [x] 2.2 Replace the helper-style live-page execution call with the documented Cherri `runJavaScriptOnWebpage(...)` action.
- [x] 2.3 Preserve the validated fetched-page fallback for targets that do not match the current Safari page.

## 3. Documentation and Verification

- [x] 3.1 Update `README.md` to describe webpage target normalisation, supported inputs, and live-versus-fallback discovery.
- [x] 3.2 Compile `shortcuts/web-image-archive.cherri` and record the verification outcome for the change.

## Verification

- `cherri shortcuts/web-image-archive.cherri --skip-sign --output /tmp/web-image-archive.shortcut`
- `git diff --check -- shortcuts/web-image-archive.cherri README.md`
