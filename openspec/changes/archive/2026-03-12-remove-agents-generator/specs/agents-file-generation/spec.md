## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Apply explicit inheritance and overrides
**Reason**: The manifest-driven renderer is being removed, so the repository will no longer compose `AGENTS.md` files from shared sections, overrides, and additions.
**Migration**: Preserve any required shared guidance directly in the committed `AGENTS.md` files and review those edits like normal Markdown changes.

### Requirement: Support deterministic check mode
**Reason**: Deleting `scripts/generate_agents.py` removes the dedicated `write` and `check` workflow for validating generated output against the repository state.
**Migration**: Stop invoking the removed CLI and update documentation or tests to rely on the directly maintained `AGENTS.md` files instead.
