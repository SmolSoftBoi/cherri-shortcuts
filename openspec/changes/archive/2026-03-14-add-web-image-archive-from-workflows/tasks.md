## 1. Add workflow-aware entry handling

- [x] 1.1 Audit the current `web-image-archive` shortcut flow to identify where `ShortcutInput` should be resolved before the existing Safari-page lookup.
- [x] 1.2 Update `shortcuts/web-image-archive.cherri` to declare the supported Cherri `from workflows` definitions for the chosen launch surfaces.
- [x] 1.3 Implement source-page resolution that prefers usable workflow input and falls back to the current Safari page only when needed.

## 2. Add non-Safari discovery fallback

- [x] 2.1 Add a fallback discovery path for workflow-driven URL input when no matching live Safari page context is available.
- [x] 2.2 Keep the existing live Safari DOM extraction path for the active-page case and route the shortcut to the appropriate discovery mode.
- [x] 2.3 Update README or adjacent shortcut documentation to explain the supported launch surfaces, fallback behaviour, and limits.

## 3. Verify the updated shortcut

- [x] 3.1 Compile the updated `web-image-archive` shortcut and confirm the workflow-definition changes do not break the existing archive flow.
- [x] 3.2 Manually review the changed source and documentation to confirm the workflow surfaces, `ShortcutInput` handling, and failure messaging are consistent.
