## Why

The existing `web-image-archive` shortcut already depends on Cherri web actions, but it still treats webpage targets too loosely: it trusts the first extracted URL, compares raw Safari and workflow URLs directly, and only discovers mismatches after page work has already started. Tightening that path now will make workflow-driven launches more predictable and keep the shortcut aligned with Cherri's documented web surface.

## What Changes

- Refine `web-image-archive` so it normalises candidate webpage targets before it chooses between live Safari extraction and fetched-page fallback.
- Add explicit supported-webpage validation so non-web or unresolved inputs fail before page metadata, download, or archive work begins.
- Refactor live-page extraction to use the documented Cherri web action path instead of a helper-style alias while preserving the current archive flow.
- Update shortcut documentation to explain canonical target handling, live-page matching, and unsupported input behaviour.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `web-image-archive-workflows`: refine webpage target resolution, validation, and live-Safari matching for the existing workflow-aware archive shortcut.

## Impact

- Affected code: `shortcuts/web-image-archive.cherri`, any supporting webpage-extraction helpers that remain necessary, and `README.md`.
- Affected systems: Cherri `actions/web`, workflow-provided `ShortcutInput`, Safari live-page execution, and fetched-page fallback discovery.
- Dependencies: no new third-party dependencies; stay within Cherri's built-in web, text, documents, scripting, and existing shortcut actions.
