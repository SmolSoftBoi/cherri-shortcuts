# Capability: apple-intelligence-image-archive

## Purpose

Define how the `web-image-archive` shortcut builds archives and optionally enriches them with Apple Intelligence metadata.

## Requirements

### Requirement: Shortcut archives webpage images
The shortcut SHALL accept webpage context from Safari, discover downloadable image sources from that page, download the discovered image files, and create a `.zip` archive from the downloaded results.

#### Scenario: Archive is created from a page with images
- **WHEN** the user runs the shortcut from a Safari page that contains one or more downloadable images
- **THEN** the shortcut downloads the discovered images
- **THEN** the shortcut creates a `.zip` archive containing the downloaded image files

### Requirement: Shortcut reports when no archiveable images are available
The shortcut MUST detect when the current webpage does not yield any downloadable images and SHALL stop with a user-visible failure message instead of producing an empty archive.

#### Scenario: Page contains no downloadable images
- **WHEN** the user runs the shortcut on a Safari page that does not expose any downloadable image sources
- **THEN** the shortcut informs the user that no images were found
- **THEN** the shortcut does not create an empty archive

### Requirement: Shortcut can enrich archive metadata with Apple Intelligence
The shortcut SHALL support an optional Apple Intelligence step that generates archive metadata, including a suggested archive name and a summary of the collected images, after the image set has already been determined.

#### Scenario: Apple Intelligence metadata is enabled
- **WHEN** the user runs the shortcut on a supported device and the Apple Intelligence step is enabled
- **THEN** the shortcut requests archive metadata from Apple Intelligence using the collected page context
- **THEN** the shortcut uses the returned metadata to improve the archive name or produce a human-readable manifest for the archive contents

### Requirement: Archive creation does not depend on Apple Intelligence success
The shortcut MUST complete the deterministic download-and-archive flow even when Apple Intelligence is unavailable, disabled, skipped, or returns unusable metadata.

#### Scenario: Apple Intelligence is unavailable
- **WHEN** the shortcut cannot obtain usable metadata from Apple Intelligence
- **THEN** the shortcut falls back to a deterministic archive name
- **THEN** the shortcut still produces the archive from the downloaded images

### Requirement: Shortcut declares Cherri definitions for presentation metadata
The shortcut SHALL declare Cherri `#define` metadata for its compiled name and icon presentation so the built Shortcut has a stable default identity without changing the runtime archive flow.

#### Scenario: Shortcut is compiled
- **WHEN** the Cherri source is compiled into a Shortcut
- **THEN** the compiled Shortcut uses the defined shortcut name
- **THEN** the compiled Shortcut includes the configured default icon metadata
