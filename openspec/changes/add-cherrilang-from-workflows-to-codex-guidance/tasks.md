## 1. Update Codex guidance for Cherri workflow definitions

- [ ] 1.1 Audit the maintained `AGENTS.md` files to find where Cherri definitions are already explained and identify the right place to add `#define from` workflow guidance.
- [ ] 1.2 Update the relevant `AGENTS.md` files with concise guidance that `#define from` changes shortcut launch surfaces or input handling, not just shortcut presentation.
- [ ] 1.3 Add the related runtime guidance for `#define quickactions` and `ShortcutInput` where it fits the existing Cherri definitions sections.

## 2. Update the local Cherri docs skill

- [ ] 2.1 Refresh `.codex/skills/cherri-docs/SKILL.md` so workflow-definition questions are explicitly in scope and routed to the official Cherri Definitions docs.
- [ ] 2.2 Update any adjacent `agents/` metadata for `cherri-docs` so assistant-facing hints mention workflow-definition lookups when appropriate.

## 3. Verify and document consistency

- [ ] 3.1 Manually review the changed Markdown and YAML files to confirm the `from workflows`, `quickactions`, and `ShortcutInput` guidance is consistent across the affected Codex surfaces.
- [ ] 3.2 Record the verification results in the implementation summary, including which files were reviewed and whether any follow-up scope questions remain.
