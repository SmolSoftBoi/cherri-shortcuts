## ADDED Requirements

### Requirement: Include Cherri definitions guidance in generated AGENTS files
The system SHALL allow managed agent guidance to define explicit instructions for Cherri `#define` input/output contracts, and generated `AGENTS.md` files MUST include this definitions guidance when configured in the manifest.

#### Scenario: Definitions guidance appears in generated root file
- **WHEN** the manifest contains Cherri definitions guidance in the global sections
- **THEN** the generated root `AGENTS.md` includes that guidance in the configured Cherri guidance section
- **THEN** the guidance text preserves required rules for input/output contract declarations and runtime alignment

#### Scenario: Definitions guidance appears in generated scoped files
- **WHEN** directory-scoped `AGENTS.md` files are generated from the same manifest
- **THEN** each generated scoped file includes the same global Cherri definitions guidance unless explicitly overridden
- **THEN** scoped files remain consistent with root guidance for Cherri definitions behaviour

### Requirement: Preserve definition-aware documentation expectations
The system SHALL support agent guidance that requires documentation updates when Cherri definitions affect shortcut behaviour.

#### Scenario: Guidance requires documentation updates for definition-dependent behaviour
- **WHEN** generated agent files include Cherri definitions guidance
- **THEN** the guidance instructs contributors to update shortcut docs or OpenSpec artefacts where input/output definitions change behaviour
- **THEN** contributors can apply this requirement consistently during proposal, implementation, and review workflows
