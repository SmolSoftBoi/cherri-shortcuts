## 1. Update Codex guidance for Cherri web actions

- [x] 1.1 Audit the maintained `AGENTS.md` files to find where Cherri includes, actions, or docs lookup rules are already explained and identify the right place to add web guidance.
- [x] 1.2 Update the relevant `AGENTS.md` files with concise guidance for `#include 'actions/web'`, `cherri --docs=web`, and the official Cherri Web Actions docs.
- [x] 1.3 Add the related boundary guidance that distinguishes Safari-page actions, HTTP or request actions, and URL parsing utilities where it fits the existing Cherri sections, mentioning companion docs when the question crosses into workflow surfaces or `ShortcutInput`.
- [x] 1.4 Clarify any wording that could confuse repository helpers with official Cherri web action names.

## 2. Update the local Cherri docs skill

- [x] 2.1 Refresh `.codex/skills/cherri-docs/SKILL.md` so Cherri web-action questions are explicitly in scope and routed to the official Web Actions docs first, with companion docs mentioned when relevant.
- [x] 2.2 Update any adjacent `agents/` metadata for `cherri-docs` so assistant-facing hints reflect the expanded web-guidance scope.

## 3. Align any supporting shortcut examples if needed

- [x] 3.1 Review nearby `.cherri` source files or helper comments only if needed to keep repository guidance aligned with live examples.
- [x] 3.2 Apply only small, directly related shortcut refactors when the review shows the guidance would otherwise drift from repository examples.

## 4. Verify and document consistency

- [x] 4.1 Manually review the changed Markdown, YAML, and any touched Cherri source files to confirm the web-action, companion-docs, Safari-versus-HTTP-versus-URL, and official-name guidance is consistent across the affected Codex surfaces.
- [x] 4.2 Record the verification results in the implementation summary, including which files were reviewed and whether any follow-up scope questions remain.
