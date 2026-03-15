## 1. Refresh scoped Codex guidance

- [ ] 1.1 Audit the current root and scoped `AGENTS.md` files and decide which Codex-owned directories need distinct local guidance.
- [ ] 1.2 Update `AGENTS.md`, `.github/AGENTS.md`, and `openspec/AGENTS.md` to reflect the intended guidance hierarchy and add `.codex/AGENTS.md` if the audit shows local-only Codex guidance is needed.
- [ ] 1.3 Document which Codex-facing surfaces are authoritative versus mirrored so future updates follow one maintenance model.

## 2. Align skills, prompts, and metadata

- [ ] 2.1 Review the shared skills in `.codex/skills/` and `.github/skills/` and bring mirrored OpenSpec skills back into alignment.
- [ ] 2.2 Update local-only skills and any skill-local `agents/` metadata so assistant presentation hints stay next to the relevant `SKILL.md`.
- [ ] 2.3 Refresh any `.github/prompts/` text that depends on the updated skill wording or mirror rules.

## 3. Verify and document the new maintenance model

- [ ] 3.1 Verify that each Codex-local skill is either intentionally local-only or intentionally mirrored, and that the chosen scope is clear from the repository structure or guidance.
- [ ] 3.2 Manually review the changed Markdown and YAML assets for consistency, then document what was verified and any remaining follow-up questions.
