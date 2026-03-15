## Why

The existing `web-image-archive` shortcut already supports workflow-aware webpage input and optional model-driven metadata, but it still archives the downloaded files exactly as they were found. That means the current shortcut bundles images into a `.zip`, yet it does not offer any Cherri-native way to shrink supported images before the archive is created.

## What Changes

- Update `web-image-archive` to offer an optional post-download image-processing mode before archive creation.
- Keep the current "original files" behaviour as the safe default.
- Add smaller-file presets for supported still images using Cherri image actions while preserving unsupported formats as their original files.
- Extend the manifest and README so users can see which processing mode ran and which files stayed unchanged.

## Capabilities

### New Capabilities
- `web-image-archive-image-processing`: Extend the existing web image archive shortcut with optional Cherri image-processing presets before the archive is created.

### Modified Capabilities
- None.

## Impact

- Affected code: `shortcuts/web-image-archive.cherri` and `README.md`
- Affected systems: Cherri compile output, Siri Shortcuts archive creation, and Cherri image-processing actions
- Dependencies: no new third-party dependencies; stay within Cherri's built-in `images`, `documents`, `text`, `web`, and `intelligence` actions
