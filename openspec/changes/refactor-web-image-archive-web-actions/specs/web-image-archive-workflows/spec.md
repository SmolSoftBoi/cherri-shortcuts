## ADDED Requirements

### Requirement: Shortcut expands and validates webpage targets before discovery
The shortcut SHALL normalise the resolved target into a supported webpage URL before requesting page metadata, choosing a discovery path, or downloading page source.

#### Scenario: Shared short URL expands to a webpage target
- **WHEN** workflow input contains a shortened or redirecting URL that can be expanded into a supported webpage URL
- **THEN** the shortcut uses the expanded webpage target for page metadata and image discovery
- **THEN** the shortcut does not continue with the unexpanded short URL when a fuller webpage target is available

## MODIFIED Requirements

### Requirement: Shortcut resolves a source page from workflow input before Safari fallback
The shortcut SHALL derive its target webpage from workflow-provided `ShortcutInput` when a supported launch surface supplies usable input, MUST normalise that target enough to compare it with the current Safari page, and MUST fall back to the current Safari page only when no usable workflow input is available.

#### Scenario: Workflow input provides the target page
- **WHEN** the user launches the shortcut from a supported workflow surface and `ShortcutInput` contains a usable webpage URL or equivalent input that can be resolved to one
- **THEN** the shortcut resolves a supported webpage target from that input
- **THEN** the shortcut uses that resolved target instead of requiring the current Safari page

#### Scenario: Matching Safari page uses live webpage context
- **WHEN** the resolved workflow target and the current Safari page refer to the same webpage after the shortcut normalises them
- **THEN** the shortcut treats the current Safari page as the live source context
- **THEN** the shortcut uses live Safari webpage execution for image discovery

#### Scenario: Safari page remains the fallback
- **WHEN** the user launches the shortcut without usable workflow input but Safari has a current page URL
- **THEN** the shortcut uses the current Safari page as the target source

### Requirement: Shortcut supports archive discovery without a live Safari DOM
The shortcut SHALL support a non-Safari image discovery path for a validated webpage target when no matching live Safari page context is available.

#### Scenario: Workflow URL is processed without matching live Safari page
- **WHEN** the shortcut has a valid target webpage URL but the current Safari page is unavailable or does not match that target after normalisation
- **THEN** the shortcut fetches or parses the target page through a non-Safari web path
- **THEN** the shortcut still attempts to discover archiveable image URLs from that page

### Requirement: Unsupported workflow input fails clearly
The shortcut MUST stop with a user-visible explanation when it cannot derive a supported webpage target from workflow input or Safari context.

#### Scenario: No usable target page can be resolved
- **WHEN** the shortcut is launched without a usable workflow URL and without a current Safari page URL
- **THEN** the shortcut informs the user that it needs supported webpage input or an active Safari page
- **THEN** the shortcut does not continue into image download or archive creation

#### Scenario: Workflow input is not a supported webpage target
- **WHEN** the shortcut receives workflow input that cannot be resolved into a supported webpage URL
- **THEN** the shortcut informs the user that it needs a supported webpage URL
- **THEN** the shortcut does not continue into page fetch, image download, or archive creation
