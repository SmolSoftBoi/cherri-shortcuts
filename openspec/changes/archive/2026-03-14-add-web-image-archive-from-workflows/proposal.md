## Why

The existing `web-image-archive` shortcut is still Safari-page-first and assumes the user runs it from the active page, even though Cherri's `#define from` workflows could make it easier to launch from supported Shortcuts surfaces. Updating it now will turn the shortcut into a more flexible entry-point-aware tool instead of a single-context utility.

## What Changes

- Update the existing `web-image-archive` shortcut to declare supported Cherri `from workflows` definitions for the launch surfaces that fit webpage archiving.
- Add input-resolution logic so the shortcut can derive its target page from `ShortcutInput` when launched from supported workflow surfaces, while preserving the current Safari-page fallback.
- Add a non-Safari fallback discovery path for workflow-driven URL input so the shortcut can still collect images when there is no live Safari DOM available.
- Refresh the shortcut documentation and user-facing guidance to explain the supported launch surfaces and their limits.

## Capabilities

### New Capabilities
- `web-image-archive-workflows`: Extend the existing web image archive shortcut with Cherri workflow-surface definitions and matching input handling for supported launch surfaces.

### Modified Capabilities
- None.

## Impact

- Affected code: `shortcuts/web-image-archive.cherri`, any supporting helper modules needed for non-Safari image discovery, and repository documentation such as `README.md`.
- Affected systems: Cherri compile output, Siri Shortcuts launch surfaces, Safari live-page execution, and workflow-driven URL handling through `ShortcutInput`.
- Dependencies: no new third-party dependencies are expected; the change should stay within Cherri's built-in web, text, documents, and scripting capabilities.
