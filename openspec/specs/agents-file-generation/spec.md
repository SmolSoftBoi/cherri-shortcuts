# Capability: agents-file-generation

## Purpose

Define how the repository generates and validates managed `AGENTS.md` files from version-controlled inputs, including root and directory-scoped guidance.

## Requirements

### Requirement: Generate root AGENTS file
The system SHALL generate a repository-root `AGENTS.md` file from version-controlled generation inputs and MUST produce valid Markdown output.

#### Scenario: Root AGENTS file is created
- **WHEN** a maintainer runs the generation command in write mode for a repository with no root `AGENTS.md`
- **THEN** the system creates `AGENTS.md` at the repository root
- **THEN** the file contains the required standard sections in the configured order

### Requirement: Generate scoped AGENTS files for configured directories
The system SHALL generate directory-level `AGENTS.md` files for each configured target directory and MUST place each file inside its target directory.

#### Scenario: Directory targets receive generated files
- **WHEN** the manifest defines one or more target directories with local agent guidance
- **THEN** the system generates an `AGENTS.md` file in each target directory
- **THEN** each generated file includes the configured local guidance for that directory

### Requirement: Apply explicit inheritance and overrides
The system SHALL apply global guidance to all generated `AGENTS.md` files and MUST apply directory-specific overrides or additions according to defined precedence rules.

#### Scenario: Local guidance extends global guidance
- **WHEN** a target directory defines local additions without overriding a global section
- **THEN** the generated directory `AGENTS.md` includes the applicable global guidance and the local additions

#### Scenario: Local guidance overrides a global section
- **WHEN** a target directory defines an override for a supported section
- **THEN** the generated directory `AGENTS.md` uses the local section content instead of the global section content

### Requirement: Support deterministic check mode
The system SHALL provide a non-writing check mode that compares expected generated output with files on disk and MUST return a failing status when any managed `AGENTS.md` file is missing or out of date.

#### Scenario: Check mode passes when files are current
- **WHEN** a maintainer runs the generation command in check mode and all managed `AGENTS.md` files match the expected rendered output
- **THEN** the system exits successfully without modifying any files

#### Scenario: Check mode reports drift
- **WHEN** a maintainer runs the generation command in check mode and at least one managed `AGENTS.md` file is missing or differs from expected output
- **THEN** the system reports the affected file paths
- **THEN** the system exits with a failing status without modifying any files
