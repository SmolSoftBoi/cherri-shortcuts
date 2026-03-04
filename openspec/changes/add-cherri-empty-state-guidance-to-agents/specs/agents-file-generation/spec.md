## ADDED Requirements

### Requirement: Include Cherri empty-state policy in generated AGENTS files
The system SHALL allow managed guidance to define Cherri empty-state semantics, and generated `AGENTS.md` files MUST include this policy when configured in the manifest.

#### Scenario: Root AGENTS includes empty-state guidance
- **WHEN** the manifest defines empty-state guidance under Cherri-specific sections
- **THEN** the generated root `AGENTS.md` includes that guidance in the configured section order
- **THEN** the guidance distinguishes absent and intentionally empty values

#### Scenario: Scoped AGENTS include the same empty-state guidance
- **WHEN** scoped AGENTS files are generated from the same manifest without section override
- **THEN** each generated scoped `AGENTS.md` includes the same empty-state policy text
- **THEN** contributors receive consistent empty-state instructions across repository scopes

### Requirement: Specify nullability and output-clearing expectations
The system SHALL support guidance that defines nullability and output-clearing semantics for Cherri workflows.

#### Scenario: Guidance differentiates nil and typed empties
- **WHEN** contributors read generated AGENTS guidance for Cherri value handling
- **THEN** the guidance states when to use absent values (`nil`/unset) versus typed empty values (`""`, `[]`, `{}`)
- **THEN** contributors can apply deterministic branching and coercion decisions

#### Scenario: Guidance defines output-empty semantics
- **WHEN** a workflow must clear current output rather than emit an empty value
- **THEN** the guidance directs contributors to use `nothing()` for output clearing
- **THEN** contributors avoid conflating output clearing with empty text/dictionary/array values

### Requirement: Preserve documentation expectations for empty-state-dependent behaviour
The system SHALL support guidance that requires documentation updates when empty-state semantics affect shortcut behaviour.

#### Scenario: Empty-state assumptions are documented
- **WHEN** shortcut logic depends on absent-vs-empty distinctions
- **THEN** generated guidance instructs contributors to update shortcut README or OpenSpec artefacts with those assumptions
- **THEN** reviewers can verify behavioural intent against documentation
