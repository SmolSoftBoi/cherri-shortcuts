## ADDED Requirements

### Requirement: Maintain category-based gitignore structure
The repository SHALL maintain `.gitignore` rules in clear category sections and MUST keep rule intent readable for future updates.

#### Scenario: Sectioned ignore rules are present
- **WHEN** contributors review `.gitignore`
- **THEN** ignore patterns are grouped under named sections
- **THEN** each section reflects a coherent class of ignored files

### Requirement: Ignore local-only and generated artefacts
The repository SHALL ignore local-only and generated development artefacts that are not meant to be source-controlled, including IDE-specific directories agreed for this repository.

#### Scenario: Local environment and generated outputs are ignored
- **WHEN** a developer creates local environment files or generated shortcut artefacts
- **THEN** those files match `.gitignore` rules
- **THEN** `git status` does not stage them by default

#### Scenario: IDE directories are ignored
- **WHEN** a developer uses supported IDE tooling that creates local metadata directories
- **THEN** those IDE-specific directories match `.gitignore` rules
- **THEN** repository status remains focused on source-controlled files

### Requirement: Avoid over-broad ignore patterns
The repository SHALL avoid ignore patterns that hide expected source-controlled project files.

#### Scenario: Source files remain visible to git
- **WHEN** contributors add or modify normal project source files
- **THEN** those files remain visible in `git status`
- **THEN** ignore rules do not mask required repository artefacts

### Requirement: Support targeted repository structure adjustments for ignore hygiene
The repository SHALL allow targeted path reorganisation when it improves ignore-rule clarity, and MUST keep moved source-controlled paths discoverable and documented.

#### Scenario: Structure adjustment improves ignore boundaries
- **WHEN** existing directory placement causes brittle or overly broad ignore patterns
- **THEN** maintainers may reorganise affected paths to separate source-controlled and local/generated artefacts
- **THEN** the resulting `.gitignore` rules become more explicit and maintainable
