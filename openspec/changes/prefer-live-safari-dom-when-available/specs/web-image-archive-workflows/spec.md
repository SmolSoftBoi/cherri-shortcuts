## ADDED Requirements

### Requirement: Shortcut expands and validates webpage targets before discovery
The shortcut SHALL normalise any usable workflow-provided target into a supported webpage URL before it uses that target for fallback discovery or page metadata.

#### Scenario: Shared short URL expands to a webpage target
- **WHEN** workflow input contains a shortened or redirecting URL that can be expanded into a supported webpage URL
- **THEN** the shortcut uses the expanded webpage target for fallback page work
- **THEN** the shortcut does not continue with the unexpanded short URL when a fuller webpage target is available

### Requirement: Shortcut prefers live Safari DOM when Safari context exists
The shortcut SHALL prefer live Safari webpage execution for image discovery whenever Safari exposes a current webpage context during the shortcut run, including Share Sheet launches started from Safari.

#### Scenario: Safari Share Sheet run uses live DOM first
- **WHEN** the user runs the shortcut from Safari and Safari exposes a current webpage context
- **THEN** the shortcut attempts image discovery through the live Safari DOM before it falls back to downloaded page source

## MODIFIED Requirements

### Requirement: Shortcut resolves a source page from workflow input before Safari fallback
The shortcut SHALL derive a usable webpage target from workflow-provided `ShortcutInput` when a supported launch surface supplies one, SHALL preserve Safari current-page context as an available source even when workflow input is also present, and MUST fall back to the current Safari page only when no usable workflow target is available.

#### Scenario: Workflow input provides the target page
- **WHEN** the user launches the shortcut from a supported workflow surface and `ShortcutInput` contains a usable webpage URL or equivalent input that can be resolved to one
- **THEN** the shortcut resolves a supported webpage target from that input
- **THEN** the shortcut keeps that target available for page metadata or fetched-page fallback

#### Scenario: Safari page remains the fallback
- **WHEN** the user launches the shortcut without usable workflow input but Safari has a current page URL
- **THEN** the shortcut uses the current Safari page as the target source

### Requirement: Shortcut supports archive discovery without a live Safari DOM
The shortcut SHALL support a non-Safari image discovery path for a usable webpage target when no live Safari webpage context is available or when live Safari DOM extraction does not produce usable image URLs.

#### Scenario: Workflow URL is processed without live Safari context
- **WHEN** the shortcut has a valid target webpage URL but Safari does not expose a live page context for the run
- **THEN** the shortcut fetches or parses the target page through a non-Safari web path
- **THEN** the shortcut still attempts to discover archiveable image URLs from that page

#### Scenario: Live Safari extraction yields no usable image URLs
- **WHEN** the shortcut attempts live Safari DOM extraction but does not receive usable image URLs
- **THEN** the shortcut falls back to fetched-page discovery for a usable webpage target instead of stopping immediately

### Requirement: Unsupported workflow input fails clearly
The shortcut MUST stop with a user-visible explanation when it cannot derive a usable webpage source from workflow input or Safari context.

#### Scenario: No usable target page can be resolved
- **WHEN** the shortcut is launched without a usable workflow URL and without a current Safari page URL
- **THEN** the shortcut informs the user that it needs supported webpage input or an active Safari page
- **THEN** the shortcut does not continue into image download or archive creation

#### Scenario: Workflow input is unsupported and Safari context is unavailable
- **WHEN** the shortcut receives workflow input that cannot be resolved into a supported webpage URL and Safari does not provide a current webpage context
- **THEN** the shortcut informs the user that it needs a supported webpage URL
- **THEN** the shortcut does not continue into page fetch, image download, or archive creation
