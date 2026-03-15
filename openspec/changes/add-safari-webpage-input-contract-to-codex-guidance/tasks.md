## 1. Update Codex-facing AGENTS guidance

- [x] 1.1 Audit the maintained `AGENTS.md` files for the current Cherri web guidance wording and identify where Safari webpage input contract notes belong.
- [x] 1.2 Update `AGENTS.md`, `.github/AGENTS.md`, and `openspec/AGENTS.md` so `runJavaScriptOnWebpage(...)` is described as a Safari webpage-input action rather than a generic URL-string action.
- [x] 1.3 Add companion Apple Shortcuts documentation references anywhere the AGENTS guidance discusses Safari webpage JavaScript execution.

## 2. Refresh the local Cherri docs skill

- [x] 2.1 Update `.codex/skills/cherri-docs/SKILL.md` so Safari webpage JavaScript questions are routed through both the official Cherri Web Actions docs and the relevant Apple Shortcuts docs.
- [x] 2.2 Update adjacent skill-local `agents/` metadata so the Cherri docs skill description also reflects the Safari webpage input contract and companion-docs expectation.

## 3. Verify wording and references

- [x] 3.1 Manually review the changed Markdown and YAML assets for consistent wording around Safari webpage input, Share Sheet scope, and repeated webpage JavaScript actions.
- [x] 3.2 Verify that the final guidance clearly distinguishes Safari webpage input from derived text or URL values and records the companion Apple docs links accurately.
