## ADDED Requirements

### Requirement: Codex guidance covers Cherri `from workflows`
The repository SHALL document Cherri `#define from` workflow definitions in its maintained Codex-facing guidance wherever Cherri definitions are already explained.

#### Scenario: AGENTS guidance explains workflow behaviour
- **WHEN** a maintained `AGENTS.md` file explains Cherri definitions
- **THEN** it includes concise guidance that `#define from` controls where a shortcut appears or accepts input
- **THEN** it distinguishes workflow-surface definitions from purely cosmetic shortcut metadata

### Requirement: Workflow guidance covers related runtime concepts
The repository SHALL explain the related Cherri concepts that materially affect how `from workflows` behave at runtime.

#### Scenario: Quick actions and Spotlight input are covered
- **WHEN** Codex-facing guidance describes Cherri workflow definitions
- **THEN** it notes that `#define quickactions` depends on `quickactions` being included in the `from` definition
- **THEN** it notes that Spotlight input should be handled through `ShortcutInput`

### Requirement: Cherri docs skill steers workflow-definition questions to official docs
The local Cherri docs skill SHALL treat `from workflows` questions as first-class Cherri documentation lookups and direct them to the official Definitions documentation.

#### Scenario: Local Cherri docs skill includes workflow-definition hints
- **WHEN** the `cherri-docs` skill or its adjacent assistant metadata describes supported Cherri docs questions
- **THEN** it includes `#define from`, related quick action definitions, or workflow-surface questions within scope
- **THEN** it points users toward the official Cherri Definitions documentation as the detailed source of truth
