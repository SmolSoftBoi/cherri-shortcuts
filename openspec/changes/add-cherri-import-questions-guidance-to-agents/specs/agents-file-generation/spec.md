## ADDED Requirements

### Requirement: Include Cherri import-question guidance in generated AGENTS files
The system SHALL allow managed guidance to define Cherri import-question semantics, and generated `AGENTS.md` files MUST include this guidance when it is configured in the manifest.

#### Scenario: Root AGENTS includes import-question guidance
- **WHEN** the manifest defines Cherri import-question guidance in global sections
- **THEN** the generated root `AGENTS.md` includes the guidance in the configured Cherri section order
- **THEN** the guidance describes setup-time behaviour for `#question`

#### Scenario: Scoped AGENTS inherit import-question guidance
- **WHEN** scoped AGENTS files are generated from the same manifest without section override
- **THEN** each generated scoped `AGENTS.md` includes the same Cherri import-question guidance
- **THEN** contributors receive consistent import-question instructions across repository scopes

### Requirement: Preserve setup-time versus runtime input guidance
The system SHALL support guidance that differentiates import-time configuration from runtime input collection and MUST retain this distinction in generated agent files.

#### Scenario: Guidance distinguishes `#question` and `prompt(...)`
- **WHEN** contributors read generated AGENTS guidance for Cherri configuration flows
- **THEN** the guidance states that `#question` is for import/setup-time values
- **THEN** the guidance states that `prompt(...)` is for runtime input collection

#### Scenario: Guidance includes safe import-question reuse expectations
- **WHEN** a shortcut reuses an import-question value across multiple actions
- **THEN** generated guidance instructs contributors to use safe typed reuse patterns rather than direct inline references
- **THEN** contributors can avoid import-question binding mistakes in implementation

### Requirement: Preserve documentation expectations for import-time assumptions
The system SHALL support guidance that requires documentation updates when shortcut behaviour depends on import-question defaults or setup-time configuration.

#### Scenario: Import-time assumptions are documented
- **WHEN** a shortcut relies on import-question-provided configuration to alter behaviour
- **THEN** generated guidance instructs contributors to update shortcut README and relevant OpenSpec artefacts with those assumptions
- **THEN** reviewers can validate setup-time behaviour against published documentation
