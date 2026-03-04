## 1. Manifest Guidance Update

- [x] 1.1 Add a Cherri import-question subsection to `agents-manifest.json` under Cherri-specific guidance.
- [x] 1.2 Capture setup-time vs runtime input rules (`#question` vs `prompt(...)`) and safe reuse constraints in concise policy text.
- [x] 1.3 Add/confirm documentation expectation language for import-question-dependent shortcut behaviour.

## 2. Shortcut Refactor Planning and Adoption

- [x] 2.1 Audit existing shortcuts for runtime prompts that can be treated as setup-time stable values.
- [x] 2.2 Refactor selected shortcut(s) to adopt `#question` for eligible setup-time values while preserving per-run prompts.
- [x] 2.3 Update affected shortcut README/OpenSpec verification notes to describe import-question adoption behaviour.

## 3. Regenerate Managed AGENTS Files

- [x] 3.1 Run `python3 scripts/generate_agents.py write` to regenerate managed AGENTS files from the manifest.
- [x] 3.2 Verify root and scoped AGENTS outputs include the new import-question guidance consistently.

## 4. Verification and Quality Gates

- [x] 4.1 Run `python3 scripts/generate_agents.py check` and confirm no managed-file drift remains.
- [x] 4.2 Run existing test coverage for generator tooling (`python3 -m unittest tests/test_generate_agents.py`).
- [x] 4.3 Compile modified shortcut sources with Cherri and confirm successful output.
- [x] 4.4 Record verification outcomes in the change `verification.md` for manifest and shortcut refactor work.
