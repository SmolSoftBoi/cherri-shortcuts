## ADDED Requirements

### Requirement: Codex guidance covers Cherri image actions
The repository SHALL document Cherri image actions in its maintained Codex-facing guidance wherever Cherri includes, actions, or documentation lookup behaviour are already explained.

#### Scenario: AGENTS guidance explains image-action entry points
- **WHEN** a maintained `AGENTS.md` file explains Cherri language structure or documentation lookup expectations
- **THEN** it includes concise guidance that Cherri image processing uses `#include 'actions/images'`
- **THEN** it points Codex toward the official Cherri Images documentation as the detailed source of truth

### Requirement: Codex guidance distinguishes image processing from related Photos and Media surfaces
The repository SHALL explain the Cherri boundary between manipulating image values, interacting with the Photos library, and using nearby Media actions.

#### Scenario: Guidance differentiates `images`, `photos`, and `media`
- **WHEN** Codex-facing guidance describes Cherri image questions
- **THEN** it notes that `actions/images` is for processing or inspecting image values
- **THEN** it notes that `actions/photos` is the companion surface for selecting, searching, or saving through the Photos library
- **THEN** it notes that `actions/media` is the nearby companion surface for broader audio, video, screenshot, or media-transform questions

### Requirement: Cherri docs skill treats image questions as first-class documentation lookups
The local Cherri docs skill SHALL treat Cherri image-action questions as first-class docs lookups and steer them to the appropriate official documentation.

#### Scenario: Local Cherri docs skill includes image-action hints
- **WHEN** the `cherri-docs` skill or its adjacent assistant metadata describes supported Cherri docs questions
- **THEN** it includes Cherri image-action questions within scope
- **THEN** it directs image-processing questions to the official Images docs, with the official Photos and Media docs as companion sources when the question involves photo-library access or nearby media transforms
