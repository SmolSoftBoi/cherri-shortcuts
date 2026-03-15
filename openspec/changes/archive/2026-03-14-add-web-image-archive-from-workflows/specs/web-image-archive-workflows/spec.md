## ADDED Requirements

### Requirement: Shortcut declares supported workflow surfaces
The web image archive shortcut SHALL declare Cherri `from workflows` definitions for the supported launch surfaces that fit webpage image archiving.

#### Scenario: Shortcut is compiled with workflow support
- **WHEN** the `web-image-archive` shortcut is compiled
- **THEN** the compiled shortcut exposes the supported workflow entry surfaces for webpage archiving
- **THEN** those workflow definitions are aligned with the shortcut's actual input-handling behaviour

### Requirement: Shortcut resolves a source page from workflow input before Safari fallback
The shortcut SHALL resolve its target webpage from workflow-provided `ShortcutInput` when a supported launch surface supplies usable input, and MUST fall back to the current Safari page only when no usable workflow input is available.

#### Scenario: Workflow input provides the target page
- **WHEN** the user launches the shortcut from a supported workflow surface and `ShortcutInput` contains a usable webpage URL or equivalent input that can be resolved to one
- **THEN** the shortcut uses that resolved target page instead of requiring the current Safari page

#### Scenario: Safari page remains the fallback
- **WHEN** the user launches the shortcut without usable workflow input but Safari has a current page URL
- **THEN** the shortcut uses the current Safari page as the target source

### Requirement: Shortcut supports archive discovery without a live Safari DOM
The shortcut SHALL support a non-Safari image discovery path for workflow-driven URL input when no live Safari webpage context is available.

#### Scenario: Shared or Spotlight URL is processed without live Safari context
- **WHEN** the shortcut has a valid target webpage URL from a supported workflow surface but no matching live Safari page context for DOM extraction
- **THEN** the shortcut fetches or parses the target page through a non-Safari fallback path
- **THEN** the shortcut still attempts to discover archiveable image URLs from that page

### Requirement: Unsupported workflow input fails clearly
The shortcut MUST stop with a user-visible explanation when it cannot derive a usable target page from workflow input or Safari context.

#### Scenario: No usable target page can be resolved
- **WHEN** the shortcut is launched without a usable workflow URL and without a current Safari page URL
- **THEN** the shortcut informs the user that it needs supported webpage input or an active Safari page
- **THEN** the shortcut does not continue into image download or archive creation
