# Cherri Shortcuts

A Cherri shortcuts toolkit for creating modular, maintainable Siri Shortcuts projects.

## Included Shortcuts

### `shortcuts/web-image-archive.cherri`

Build a workflow-aware shortcut that:

- accepts a webpage URL from the Share Sheet, on-screen content, Spotlight input, or the active Safari page
- prefers live Safari DOM extraction when the resolved target matches the current Safari page
- falls back to parsing downloaded page source for image URLs when no matching live Safari page is available
- downloads the discovered image files into a working folder
- optionally keeps the original files or converts supported still images to smaller JPEG or HEIF outputs before archiving
- creates a `.zip` archive plus a `manifest.txt` summary
- optionally asks a compatible Shortcuts model provider for archive naming, summary, and tag suggestions

Compile it with:

```sh
cherri shortcuts/web-image-archive.cherri
```

Current behaviour:

- Run it from Safari, the Share Sheet, on-screen content, or Spotlight with a webpage URL.
- Workflow-provided `ShortcutInput` is resolved before the shortcut falls back to the active Safari page.
- The deterministic archive flow works without any model step.
- The shortcut now prompts for an image-processing mode before archiving: `Original files`, `JPEG (smaller)`, or `HEIF (smaller on Apple devices)`.
- Smaller-image modes attempt to convert supported still images and strip metadata before the archive is built.
- Animated GIFs, SVGs, and any file that cannot be safely resolved as a still image stay in their original downloaded form.
- Optional metadata providers include `Apple Intelligence on Device`, `Private Cloud Compute`, `ChatGPT`, or `Skip metadata`.
- The manifest records the selected processing mode plus whether each archived file stayed original or was converted.
- Live Safari extraction is still the most complete mode for pages that build image sources dynamically in the DOM.
- The fallback parser only captures image URLs that can be recovered from the downloaded page source.
- CSS background images and infinite-scroll assets that have not yet loaded remain out of scope for this version.

## AGENTS Files

This repository keeps `AGENTS.md` guidance as normal Markdown files committed to the repo.

- Repository-wide guidance: `AGENTS.md`
- Scoped guidance: `.github/AGENTS.md`

Update the relevant file directly in your change and review it like any other documentation edit.

There is no generator or manifest step for maintaining these files.
