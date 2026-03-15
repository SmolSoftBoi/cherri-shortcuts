## 1. Add optional image-processing to the shortcut

- [x] 1.1 Audit the current `web-image-archive` flow to identify the smallest point to insert optional Cherri image processing before archive creation.
- [x] 1.2 Update `shortcuts/web-image-archive.cherri` to offer clear processing presets and apply them to supported still images while preserving unsupported files.
- [x] 1.3 Extend the manifest and user-facing summary so the archive records the selected processing mode and the per-file outcome.

## 2. Document the new shortcut behaviour

- [x] 2.1 Update `README.md` to explain the new image-processing presets, what stays unconverted, and how this fits the existing archive flow.

## 3. Verify the updated shortcut

- [x] 3.1 Compile the updated `web-image-archive` shortcut and confirm the new image-processing flow builds cleanly.
- [x] 3.2 Manually review the changed source and documentation to confirm the processing presets, fallback behaviour, and manifest text are consistent.
