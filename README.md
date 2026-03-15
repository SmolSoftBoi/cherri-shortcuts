# Cherri Shortcuts

A Cherri shortcuts toolkit for creating modular, maintainable Siri Shortcuts projects.

## Included Shortcuts

### `shortcuts/web-image-archive.cherri`

Build a workflow-aware shortcut that:

- accepts Safari webpage input or a webpage URL from the Share Sheet, on-screen content, Spotlight input, or the active Safari page
- expands and validates workflow-provided webpage targets before page discovery begins
- prefers live Safari DOM extraction for Safari webpage runs and direct Safari fallback runs
- falls back to parsing downloaded page source for image-bearing HTML attributes when Safari is unavailable or the live DOM path yields no usable image URLs
- optionally keeps the original files or converts supported still images to smaller JPEG or HEIF outputs before archiving
- creates a `.zip` archive plus a `manifest.txt` summary without leaving a persistent working folder behind
- optionally asks a compatible Shortcuts model provider for archive naming, summary, and tag suggestions

Compile it with:

```sh
cherri shortcuts/web-image-archive.cherri
```

Current behaviour:

- Run it from Safari, the Share Sheet, on-screen content, or Spotlight with a webpage URL.
- The shortcut explicitly accepts Safari webpage input and text input so Safari Share Sheet runs and URL-driven fallback runs both match the declared input contract.
- Workflow-provided `ShortcutInput` is resolved before the shortcut falls back to the active Safari page URL.
- Workflow URLs are expanded when possible, then validated as supported `http` or `https` webpage targets before page metadata or archive work begins.
- If workflow input does not resolve cleanly but Safari still exposes a usable current page, the shortcut keeps going and uses the Safari page as the resolved target instead of stopping immediately.
- If the run starts from Safari webpage input and the resolved target is not already the active Safari page, the shortcut asks Safari to show that page before it attempts live DOM extraction.
- The shortcut now attempts live Safari DOM extraction first for Safari webpage runs or direct Safari fallback runs, while plain URL-driven workflow launches stay on the fetched-page fallback path.
- The live Safari path now uses a single webpage JavaScript action to gather image records and any same-origin or blob-backed image bytes Safari can still resolve in the current page context, instead of running a second webpage JavaScript action inside the per-image loop.
- If Safari is unavailable, or the live Safari DOM path yields no usable image URLs, the shortcut falls back to validated workflow URLs and fetched-page parsing of `src`, `srcset`, and common social-image metadata.
- The deterministic archive flow works without any model step.
- The shortcut now prompts for an image-processing mode before archiving: `Original files`, `JPEG (smaller)`, or `HEIF (smaller on Apple devices)`.
- Smaller-image modes attempt to convert supported still images and strip metadata before the archive is built.
- Animated GIFs, SVGs, and any file that cannot be safely resolved as a still image stay in their original downloaded form.
- Optional metadata providers are only offered when the device reports a likely compatible model and system version; otherwise the shortcut keeps the deterministic `Skip metadata` path.
- The manifest records the selected processing mode plus whether each archived file stayed original or was converted.
- Live Safari extraction is still the most complete mode for pages that build image sources dynamically in the DOM.
- The fallback parser is still less complete than the live Safari DOM path, especially for CSS background images, authenticated requests, and deeply script-generated markup.
- CSS background images and infinite-scroll assets that have not yet loaded remain out of scope for this version.

## AGENTS Files

This repository keeps `AGENTS.md` guidance as normal Markdown files committed to the repo.

- Repository-wide guidance: `AGENTS.md`
- Scoped guidance: `.github/AGENTS.md`

Update the relevant file directly in your change and review it like any other documentation edit.

There is no generator or manifest step for maintaining these files.
