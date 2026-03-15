# Capability: codex-cherri-web-guidance

## Purpose

Define how the repository maintains Codex-facing guidance for Cherri web actions and the official docs that support them.

## Requirements

### Requirement: Codex guidance covers Cherri web actions
The repository SHALL document Cherri web actions in its maintained Codex-facing guidance wherever Cherri includes, actions, or documentation lookup behaviour are already explained.

#### Scenario: AGENTS guidance explains web-action entry points
- **WHEN** a maintained `AGENTS.md` file explains Cherri language structure or documentation lookup expectations
- **THEN** it includes concise guidance that Cherri web questions start with `#include 'actions/web'`
- **THEN** it points Codex toward the official Cherri Web Actions documentation as the detailed source of truth

### Requirement: Codex guidance distinguishes the main Cherri web sub-surfaces
The repository SHALL explain the Cherri boundary between Safari-page actions, HTTP or request actions, and URL parsing or utility actions.

#### Scenario: Guidance differentiates Safari, HTTP, and URL utilities
- **WHEN** Codex-facing guidance describes Cherri web questions
- **THEN** it notes that some web actions operate on the live Safari page context
- **THEN** it notes that other web actions perform remote downloads or requests
- **THEN** it notes that URL helpers such as parsing or encoding utilities are a separate concern within the same `actions/web` surface

### Requirement: Cherri docs skill treats web questions as first-class documentation lookups
The local Cherri docs skill SHALL treat Cherri web-action questions as first-class docs lookups and steer them to the appropriate official documentation.

#### Scenario: Local Cherri docs skill includes web-action hints
- **WHEN** the `cherri-docs` skill or its adjacent assistant metadata describes supported Cherri docs questions
- **THEN** it includes Cherri web-action questions within scope
- **THEN** it directs those questions to the official Web Actions docs and related `cherri --docs=web` lookups first
- **THEN** it mentions companion docs such as Definitions or Variables when the web question crosses into launch surfaces, workflow input, or `ShortcutInput`

### Requirement: Guidance prefers official Cherri web action names
The repository SHALL avoid presenting repository-local helper names as though they were the canonical documented Cherri web actions.

#### Scenario: Guidance references webpage JavaScript execution
- **WHEN** Codex-facing guidance references JavaScript execution on webpages
- **THEN** it uses the documented Cherri action naming or clearly labels any repository helper as a local wrapper
