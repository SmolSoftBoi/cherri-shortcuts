## 1. Manifest guidance updates

- [x] 1.1 Add a Cherri input/output type guidance subsection to `agents-manifest.json` under the global Cherri-specific guidance content.
- [x] 1.2 Ensure guidance covers value/content-item distinctions, typed signatures, coercion checks, and output-surface expectations.
- [x] 1.3 Keep section order and existing scoped overrides/additions intact.

## 2. Regenerate managed AGENTS files

- [x] 2.1 Run `python3 scripts/generate_agents.py write` to regenerate managed AGENTS files from manifest changes.
- [x] 2.2 Verify the new typing guidance appears in root and inherited scoped `AGENTS.md` outputs.

## 3. Verification

- [x] 3.1 Run `python3 scripts/generate_agents.py check` and confirm no managed AGENTS drift remains.
- [x] 3.2 Review generated diffs for minimal, guidance-focused changes only.
- [x] 3.3 Document verification results in the change notes before implementation completion.
