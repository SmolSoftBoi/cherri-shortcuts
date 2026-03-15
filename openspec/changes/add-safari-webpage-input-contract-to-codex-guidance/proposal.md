## Why

The repository's Codex-facing Cherri web guidance currently explains `actions/web` at a high level, but it does not capture the Safari webpage input contract behind `runJavaScriptOnWebpage(...)`. That gap makes it too easy to design shortcuts around ambient Safari state, misread Safari runtime errors as simple permission issues, and miss the Apple-side requirement that webpage JavaScript actions operate on Safari webpage input.

## What Changes

- Update the maintained Codex-facing guidance so Cherri web advice explicitly covers the Safari webpage input contract for `runJavaScriptOnWebpage(...)`.
- Teach that Safari webpage JavaScript execution is tied to Safari webpage input, is primarily a Safari Share Sheet flow, and should not be modelled as a generic URL-string action.
- Add companion Apple Shortcuts documentation references alongside the existing Cherri Web Actions references when guidance discusses webpage JavaScript execution.
- Refresh the local `cherri-docs` skill and any adjacent assistant metadata so Safari webpage input requirements are surfaced during Cherri web lookups.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `codex-cherri-web-guidance`: expand the repository's Cherri web guidance so Safari webpage JavaScript execution is documented with its Safari webpage input contract and companion Apple documentation.

## Impact

- Affected code: `AGENTS.md`, `.github/AGENTS.md`, `openspec/AGENTS.md`, `.codex/skills/cherri-docs/SKILL.md`, and any adjacent skill-local `agents/` metadata that describes Cherri web guidance scope.
- Affected systems: Codex-facing Cherri guidance, local Cherri docs skill discovery, and the repository's documented expectations for Safari webpage JavaScript execution.
- Dependencies: no new runtime dependencies; guidance changes should rely on the existing Cherri docs workflow plus companion Apple Shortcuts documentation for Safari webpage execution behaviour.
