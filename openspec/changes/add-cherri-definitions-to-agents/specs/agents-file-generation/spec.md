## ADDED Requirements

### Requirement: AGENTS guidance covers Cherri definitions
The repository SHALL include Cherri definitions in maintained AGENTS files whenever those files provide contributor guidance about core Cherri language structure, and MUST describe definitions as the `#define` shortcut-metadata feature rather than as functions or action definitions.

#### Scenario: Repository-wide guidance is updated
- **WHEN** a maintainer updates repository-wide Cherri guidance in `AGENTS.md`
- **THEN** the guidance includes Cherri definitions alongside the other core language topics it curates
- **THEN** the wording makes clear that definitions refer to `#define` shortcut metadata

#### Scenario: Scoped guidance stays conceptually aligned
- **WHEN** a scoped AGENTS file restates or narrows Cherri language guidance for its directory
- **THEN** it preserves the repository's meaning of Cherri definitions
- **THEN** it does not describe functions or action definitions as though they were the same feature

### Requirement: AGENTS reference links include the Definitions page
The repository SHALL include the official Cherri Definitions documentation page in maintained AGENTS files wherever those files curate core Cherri language reference links.

#### Scenario: Cherri reference links are maintained
- **WHEN** a maintainer updates the Cherri reference links in an AGENTS file that already lists core language documentation
- **THEN** the list includes the official Definitions documentation page
- **THEN** the Definitions link is kept consistent with the other curated Cherri language references in that file
