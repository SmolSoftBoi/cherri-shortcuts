## ADDED Requirements

### Requirement: Shortcut declares input types that match Safari webpage and URL-based runs
The web image archive shortcut SHALL declare shortcut input types that cover Safari webpage input and text-based webpage targets, and those input types MUST align with the live Safari path and fallback URL path the shortcut implements.

#### Scenario: Shortcut input types match runtime behaviour
- **WHEN** the `web-image-archive` shortcut is compiled
- **THEN** the compiled shortcut accepts Safari webpage input for Safari Share Sheet runs
- **THEN** it also accepts text-based input for URL-driven fallback runs

### Requirement: Safari-enhanced discovery uses one webpage JavaScript action per run
The shortcut SHALL avoid repeated `runJavaScriptOnWebpage(...)` usage within a single run and MUST gather live Safari image records through one webpage JavaScript action when the Safari-enhanced path is used.

#### Scenario: Safari run gathers image records in one pass
- **WHEN** the shortcut runs with usable live Safari webpage context
- **THEN** it executes one webpage JavaScript action to gather the live image records it needs for downstream processing
- **THEN** it does not depend on a second webpage JavaScript action inside the per-image download loop

#### Scenario: Safari record carries reusable authenticated bytes
- **WHEN** the live Safari webpage JavaScript action can fetch a same-origin image with the active Safari session
- **THEN** the resulting Safari record may include reusable image data for downstream archive preparation only when the embedded payload is `image/jpeg`, `image/png`, or `image/webp`
- **THEN** each embedded reusable image payload is capped at `1,048,576` bytes and the webpage JavaScript action includes embedded payloads for at most `10` Safari records per run
- **THEN** the webpage JavaScript action falls back to the image URL alone when the image type, size, or embedded-payload count exceeds those limits
- **THEN** the shortcut can avoid a separate webpage JavaScript fetch for that image later in the run

## MODIFIED Requirements

### Requirement: Shortcut resolves a source page from workflow input before Safari fallback
The shortcut SHALL resolve its target webpage from workflow-provided `ShortcutInput` when a supported launch surface supplies usable input, SHALL treat Safari webpage input as a first-class source for the live Safari path, and MUST fall back to the current Safari page URL only when no usable workflow target is available.

#### Scenario: Workflow input provides the target page
- **WHEN** the user launches the shortcut from a supported workflow surface and `ShortcutInput` contains a usable webpage URL, Safari webpage input, or equivalent input that can be resolved to one
- **THEN** the shortcut resolves a supported target page from that input
- **THEN** it keeps the live Safari path available when that input represents a Safari webpage

#### Scenario: Safari page remains the fallback
- **WHEN** the user launches the shortcut without usable workflow input but Safari has a current page URL
- **THEN** the shortcut uses the current Safari page as the target source

### Requirement: Shortcut supports archive discovery without a live Safari DOM
The shortcut SHALL support a non-Safari image discovery path for a usable webpage target when no live Safari webpage context is available or when live Safari discovery does not produce usable image records.

#### Scenario: Workflow URL is processed without live Safari context
- **WHEN** the shortcut has a valid target webpage URL from a supported workflow surface but no usable live Safari webpage context for the run
- **THEN** the shortcut fetches or parses the target page through a non-Safari fallback path
- **THEN** it still attempts to discover archiveable image records from that page

#### Scenario: Live Safari discovery yields no usable image records
- **WHEN** the shortcut attempts live Safari discovery but does not receive usable image records
- **THEN** the shortcut falls back to URL-based page fetching and parsing instead of stopping immediately
