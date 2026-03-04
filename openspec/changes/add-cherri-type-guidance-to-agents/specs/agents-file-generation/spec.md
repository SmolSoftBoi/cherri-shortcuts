## ADDED Requirements

### Requirement: Include Cherri input/output typing guidance in managed AGENTS content
The system SHALL allow manifest-defined Cherri input/output typing guidance to be rendered into managed `AGENTS.md` outputs, and generated files MUST include that guidance in all targets inheriting the relevant global section.

#### Scenario: Root AGENTS includes type guidance
- **WHEN** maintainers add Cherri input/output typing guidance to the manifest-controlled global guidance and run generation in write mode
- **THEN** the root `AGENTS.md` includes the configured typing guidance content
- **THEN** the guidance appears within the configured section ordering rules

#### Scenario: Scoped AGENTS inherit type guidance
- **WHEN** a target directory does not override the section containing Cherri typing guidance
- **THEN** the generated scoped `AGENTS.md` inherits the typing guidance from global content
- **THEN** the scoped file preserves any local additions alongside inherited guidance

#### Scenario: Check mode detects missing type guidance
- **WHEN** managed `AGENTS.md` files on disk are missing the newly configured typing guidance content
- **THEN** check mode reports those files as missing or out-of-date
- **THEN** check mode exits with a failing status
