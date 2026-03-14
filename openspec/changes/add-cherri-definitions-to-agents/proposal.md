## Why

The repository's AGENTS files already guide contributors on several Cherri language topics, but they do not explicitly cover Cherri definitions. That leaves a gap in repository guidance for one of Cherri's core language features, especially because “definitions” can otherwise be confused with functions or action definitions.

## What Changes

- Update the maintained AGENTS guidance so it explicitly covers Cherri `#define` definitions as shortcut metadata.
- Add repository guidance that distinguishes Cherri definitions from functions and action definitions where that distinction matters.
- Expand the curated Cherri reference links in AGENTS files to include the official Definitions documentation page.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-file-generation`: AGENTS file content guidance should include Cherri definitions terminology and references alongside the repository's existing Cherri language guidance.

## Impact

- Affected code: `AGENTS.md`, `.github/AGENTS.md`, and `openspec/AGENTS.md`.
- Affected systems: contributor guidance for Codex and other agent workflows operating in this repository.
- Dependencies: no new dependencies are expected; the change relies on existing committed Markdown guidance and official Cherri documentation.
