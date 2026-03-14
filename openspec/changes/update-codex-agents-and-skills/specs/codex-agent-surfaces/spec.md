## ADDED Requirements

### Requirement: Repository guidance is scoped for Codex-owned surfaces
The repository SHALL keep Codex-facing guidance in committed `AGENTS.md` files whose scope matches the directories that own distinct Codex workflows or assets.

#### Scenario: Codex-local assets receive scoped guidance
- **WHEN** a repository directory contains Codex-specific assets such as local skills, agent metadata, or environment bootstrap files with rules that differ from repository-wide guidance
- **THEN** the repository stores an `AGENTS.md` file in that directory or an applicable parent scope
- **THEN** the scoped guidance explains the local rules without requiring a generator step

### Requirement: Mirrored skills declare an authoritative source
The repository SHALL distinguish authoritative skill sources from mirror copies, and MUST keep mirrored skill instructions aligned with their authoritative source.

#### Scenario: Shared OpenSpec skills remain aligned
- **WHEN** a skill is intentionally maintained in both `.codex/skills/` and `.github/skills/`
- **THEN** the repository documents which copy is authoritative
- **THEN** the mirrored copy reflects the same behavioural instructions after an update

### Requirement: Local-only skills remain intentionally local
The repository SHALL allow Codex-local skills that have no GitHub-distributed consumer to remain outside `.github/skills/`, and MUST make that scope choice deliberate rather than accidental.

#### Scenario: Local-only specialist skill is not mirrored
- **WHEN** a skill is only used by local Codex workflows and is not referenced by GitHub-distributed prompts or workflows
- **THEN** the skill may exist only under `.codex/skills/`
- **THEN** the repository guidance or surrounding structure makes that local-only scope clear

### Requirement: Skill-local agent metadata lives with the skill
The repository SHALL keep assistant-specific skill metadata in version control alongside the skill it describes whenever that metadata is needed for presentation or invocation hints.

#### Scenario: Skill metadata is stored next to its skill
- **WHEN** a skill needs assistant-specific metadata such as display name, short description, or default prompt hints
- **THEN** the metadata is stored in a skill-local `agents/` directory
- **THEN** the metadata remains reviewable alongside the corresponding `SKILL.md`
