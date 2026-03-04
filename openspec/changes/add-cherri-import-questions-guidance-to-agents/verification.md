# Verification Notes

## Prompt Audit (Task 2.1)

Audit command:

```bash
rg -n "prompt\(" shortcuts -g '*.cherri' -g '!**/*_processed.cherri'
```

Findings:
- Stable setup-time candidates identified in `shortcuts/contact-enrichment/modules/config.cherri`:
  - Twilio Account SID
  - Twilio Auth Token
  - People Data Labs API Key
- Per-run prompts retained intentionally:
  - Manual enrichment seed prompts in `shortcuts/contact-enrichment/contact-enrichment.cherri` (phone/email/name/company/domain and related fields)
  - Confidence threshold prompts in `shortcuts/contact-enrichment/modules/config.cherri`

## Refactor Validation (Task 2.2)

Refactor applied:
- Added Cherri import questions for provider credentials in `shortcuts/contact-enrichment/modules/config.cherri`.
- Replaced runtime credential prompts with typed reads from import questions.

Verification command:

```bash
cherri shortcuts/contact-enrichment/contact-enrichment.cherri --no-ansi --skip-sign
```

Result: compile succeeds.

## Managed AGENTS Regeneration (Tasks 3.1, 3.2)

Commands:

```bash
python3 scripts/generate_agents.py write
rg -n "### Import Questions|#question|setup-time|runtime" AGENTS.md .github/AGENTS.md openspec/AGENTS.md
```

Result:
- Managed files regenerated successfully.
- Root and scoped AGENTS files include the new `### Import Questions` guidance subsection with setup-time/runtime rules.

## Quality Gates (Tasks 4.1, 4.2, 4.3)

Commands:

```bash
python3 scripts/generate_agents.py check
python3 -m unittest tests/test_generate_agents.py
cherri shortcuts/contact-enrichment/contact-enrichment.cherri --no-ansi --skip-sign
```

Result:
- `generate_agents.py check`: pass (`All managed AGENTS.md files are up to date.`)
- `unittest`: pass (`Ran 3 tests`, `OK`)
- Cherri compile: pass

## Documentation Updates (Tasks 2.3, 4.4)

Updated files:
- `shortcuts/contact-enrichment/README.md` (credential setup now documented as import-question-driven)
- `openspec/changes/add-contact-enrichment-shortcut/verification.md` (follow-up note for import-question adoption)
- `openspec/changes/add-cherri-import-questions-guidance-to-agents/verification.md` (this file)
