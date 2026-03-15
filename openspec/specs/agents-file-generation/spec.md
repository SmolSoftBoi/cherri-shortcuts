# Capability: agents-file-generation

## Purpose

Define how the repository maintains committed `AGENTS.md` files as directly edited Markdown documents, including root and directory-scoped guidance.

## Requirements

### Requirement: Generate root AGENTS file
The repository SHALL keep a repository-root `AGENTS.md` file under version control as a directly maintained Markdown document that contributors can edit without running a generation command.

#### Scenario: Root AGENTS file is edited directly
- **WHEN** a maintainer updates repository-wide agent guidance
- **THEN** they edit `AGENTS.md` directly in the repository
- **THEN** no manifest or generator step is required to keep the file valid

### Requirement: Generate scoped AGENTS files for configured directories
The repository SHALL keep any supported directory-scoped `AGENTS.md` files under version control as directly maintained Markdown documents placed inside their target directories.

#### Scenario: Scoped AGENTS file is edited directly
- **WHEN** a maintained subdirectory needs local agent guidance
- **THEN** the repository stores an `AGENTS.md` file inside that directory
- **THEN** maintainers update that file directly without running a generation command

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
