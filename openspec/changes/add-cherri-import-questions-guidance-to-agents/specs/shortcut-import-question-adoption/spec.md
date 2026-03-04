## ADDED Requirements

### Requirement: Audit existing shortcuts for import-question candidates
The change SHALL evaluate existing shortcuts for setup-time values that are suitable for Cherri import questions and MUST document which values are eligible versus out of scope.

#### Scenario: Candidate evaluation is explicit
- **WHEN** a shortcut currently uses runtime prompts for configuration values
- **THEN** the change records whether each prompt is setup-time stable or per-run input
- **THEN** only setup-time stable prompts are marked as import-question candidates

### Requirement: Refactor selected shortcuts to adopt import questions safely
For selected eligible prompts, the change SHALL replace runtime prompt-only configuration with Cherri import-question wiring and MUST preserve existing runtime behaviour for non-eligible prompts.

#### Scenario: Stable configuration prompt is converted
- **WHEN** a prompt captures a stable setup-time configuration value
- **THEN** the shortcut uses `#question` to capture that value at import/setup time
- **THEN** the resulting runtime flow continues to work without functional regression

#### Scenario: Per-run prompt remains runtime input
- **WHEN** a prompt captures per-run contextual input
- **THEN** the prompt remains a runtime `prompt(...)` interaction
- **THEN** the refactor does not force setup-time entry for that input

### Requirement: Document and verify refactor outcomes
Shortcut documentation and verification artefacts SHALL describe import-question adoption changes and MUST include validation results for modified shortcuts.

#### Scenario: Docs and verification are updated
- **WHEN** a shortcut is refactored to use import questions
- **THEN** its README/OpenSpec notes describe the setup-time configuration behaviour
- **THEN** verification records include successful compile/check outcomes for modified shortcut sources
