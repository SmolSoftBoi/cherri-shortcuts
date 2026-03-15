## Why

The current `web-image-archive` shortcut is too conservative about when it will use the live Safari DOM: during Safari Share Sheet runs it can still fall back to downloaded page source, which misses dynamic images and produces false "no images found" failures. This change is needed so Safari-originated runs use the richer live webpage context whenever Safari already has it.

## What Changes

- Update `web-image-archive` so live Safari DOM extraction is preferred whenever a current Safari webpage context exists, including Safari Share Sheet launches.
- Keep workflow URL extraction, expansion, and validation, but treat that logic as input resolution and fallback routing rather than a hard gate on live Safari discovery.
- Preserve the fetched-page fallback for runs where no live Safari webpage context is available or when the live Safari extraction does not yield usable image URLs.
- Refresh the shortcut documentation and failure expectations to explain that Safari context takes precedence for discovery when it exists.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `web-image-archive-workflows`: change discovery-source selection so Safari webpage context is preferred over fetched-page fallback whenever Safari exposes a live page during the shortcut run.

## Impact

- Affected code: `shortcuts/web-image-archive.cherri` and `README.md`.
- Affected systems: Cherri `actions/web`, Safari Share Sheet behaviour, live Safari webpage execution, and the non-Safari fetched-page fallback path.
- Dependencies: no new third-party dependencies; stay within Cherri's built-in web, scripting, text, and existing shortcut actions.
