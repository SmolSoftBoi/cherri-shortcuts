## Context

`shortcuts/web-image-archive.cherri` currently resolves a target page, discovers image URLs, downloads the files, optionally asks a compatible model for archive metadata, and then creates a `.zip` archive plus `manifest.txt`. The shortcut already handles workflow surfaces and model providers, so the missing piece is the actual image-processing layer between download and archive creation.

Cherri's official image actions are a good fit here because they can convert images, remove metadata, and prepare smaller outputs without introducing any extra dependency or external service. The shortcut should use that surface carefully so the optimisation path remains optional and the archive still succeeds for formats that should not be converted.

## Goals / Non-Goals

**Goals:**

- Add an optional image-processing choice to the existing web image archive shortcut.
- Keep the current "archive the originals" path intact for users who want the exact source files.
- Offer smaller-file presets for supported still images with Cherri image actions.
- Preserve unsupported or risky formats, such as animated GIFs and SVGs, instead of forcing a conversion that could lose information.
- Record the chosen processing mode and per-file outcome in the generated manifest.

**Non-Goals:**

- Building a full image editor into the shortcut.
- Replacing the existing workflow-input or metadata-provider behaviour.
- Guaranteeing that every image type can or should be converted.
- Adding video, audio, or Photos-library processing to this shortcut.

## Decisions

### Keep the original archive mode as the default

The shortcut will keep an `Original files` mode that matches the current behaviour. This preserves a predictable no-surprises path and keeps the new image-processing layer optional.

Alternative considered:
- Force a smaller-image mode for every run. Rejected because some users may need the original formats and metadata.

### Offer two smaller-file presets

The shortcut will offer:

1. `Original files`
2. `JPEG (smaller)`
3. `HEIF (smaller on Apple devices)`

These presets are simple to explain, map cleanly to Cherri's documented image actions, and keep the change reviewable.

Alternative considered:
- Add more granular controls for quality, resizing, and cropping. Rejected for this pass because it would add too much interaction and branching for a first image-processing layer.

### Preserve unsupported or risky formats

Animated GIFs and SVGs should stay as original files even when a smaller-image preset is selected. The shortcut should also preserve the original file when it cannot resolve a still image for conversion. This avoids losing animation or vector data and keeps archive creation resilient.

Alternative considered:
- Attempt conversion for every downloaded asset. Rejected because some formats are not appropriate for still-image conversion.

### Document the processing outcome in the manifest

The manifest should include the selected processing mode, a short summary of how many files were optimised, and a per-file note showing whether the archived item is original or converted. This makes the archive auditable without forcing the user to inspect each file manually.

Alternative considered:
- Only show the chosen mode in the UI. Rejected because the manifest is the durable output that travels with the archive.

## Risks / Trade-offs

- [Converted files may differ from the source format] -> Keep `Original files` as the default and preserve GIF/SVG assets as originals.
- [Some inputs may not resolve to a usable still image] -> Fall back to the original downloaded file instead of failing the whole archive.
- [Extra processing adds one more prompt to the shortcut] -> Limit the choice to three clear presets and keep the rest of the flow unchanged.
- [HEIF is less portable outside Apple tooling] -> Label the preset clearly as Apple-device-oriented.

## Migration Plan

1. Add the Cherri `images` include and a processing-mode choice to `web-image-archive`.
2. Process supported still images after download and before archive creation, while preserving unsupported assets.
3. Update the manifest and README to explain the new behaviour and limitations.
4. Compile the shortcut and manually review the resulting source and docs for consistency.
