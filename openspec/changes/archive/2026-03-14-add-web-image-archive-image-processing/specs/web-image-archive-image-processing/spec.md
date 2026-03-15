## ADDED Requirements

### Requirement: Shortcut offers an optional image-processing mode before archiving
The web image archive shortcut SHALL let the user choose how supported downloaded images are prepared before the archive is created.

#### Scenario: User keeps the original files
- **WHEN** the user selects the original-file mode
- **THEN** the shortcut archives the downloaded files without image conversion
- **THEN** the rest of the archive flow continues unchanged

#### Scenario: User selects a smaller-image preset
- **WHEN** the user selects a smaller-image preset
- **THEN** the shortcut attempts to convert supported still images before archiving them
- **THEN** the shortcut still completes the archive flow even if some files must remain original

### Requirement: Shortcut preserves unsupported or risky formats
The shortcut MUST preserve the original file when a downloaded asset should not be converted through the smaller-image presets.

#### Scenario: Animated GIF or SVG is discovered
- **WHEN** a downloaded asset is an animated GIF, an SVG, or another file that the shortcut does not safely convert
- **THEN** the shortcut keeps that asset as its original downloaded file
- **THEN** the shortcut does not fail the whole archive run because of that file

### Requirement: Shortcut records the processing outcome in the manifest
The shortcut SHALL include the selected processing mode and per-file processing outcome in the generated manifest.

#### Scenario: Archive manifest is generated after processing
- **WHEN** the shortcut finishes preparing files for the archive
- **THEN** the manifest records which processing mode was selected
- **THEN** the manifest indicates for each archived file whether it remained original or was converted
