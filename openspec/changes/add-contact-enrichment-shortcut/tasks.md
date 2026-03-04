## 1. Shortcut scaffolding and configuration

- [x] 1.1 Create the new contact enrichment shortcut source structure and required Cherri includes (`contacts`, `web`, `intelligence`, and supporting actions).
- [x] 1.2 Define configuration loading for Twilio and People Data Labs credentials without hard-coded secrets.
- [x] 1.3 Add setup documentation/examples for required credentials and account prerequisites.

## 2. Input capture and canonical schema

- [x] 2.1 Implement input capture for both selected contacts and manual seed fields.
- [x] 2.2 Implement normalisation of seed inputs into one canonical enrichment dictionary schema.
- [x] 2.3 Add validation and early-exit behaviour for missing minimum identifiers.
- [x] 2.4 Add confidence-threshold settings capture with sensible defaults and bounded input validation.

## 3. Provider enrichment pipeline

- [x] 3.1 Implement Twilio Lookup request/response mapping for phone validation metadata.
- [x] 3.2 Implement People Data Labs person enrichment request/response mapping.
- [x] 3.3 Implement conditional People Data Labs company enrichment based on available company/domain context.
- [x] 3.4 Add provider error handling for timeout/failure with partial-results continuation.

## 4. LLM normalisation and merge rules

- [x] 4.1 Implement Apple Intelligence pass that returns dictionary-form candidate fields from provider evidence.
- [x] 4.2 Implement ChatGPT pass that resolves conflicts using the same evidence plus first-pass output.
- [x] 4.3 Implement schema validation for model outputs, including confidence and evidence-source requirements.
- [x] 4.4 Implement deterministic fill-missing-only merge logic that never overwrites non-empty contact fields.
- [x] 4.5 Apply user-configured (or default) confidence thresholds during merge eligibility checks.

## 5. Review, confirmation, and updates

- [x] 5.1 Implement proposed-update preview generation with field-by-field before/after display.
- [x] 5.2 Implement explicit confirmation gate prior to any `updateContact(...)` action.
- [x] 5.3 Implement writable-field allowlist updates and no-op exit when user declines or no trusted updates remain.

## 6. Verification and hardening

- [x] 6.1 Validate the shortcut against representative scenarios: complete contact, phone-only contact, conflicting data, invalid phone, and provider failure.
- [x] 6.2 Verify secret-safety expectations by checking sources/examples for absence of literal API credentials.
- [x] 6.3 Run the closest available project quality gates and record verification outcomes for the change.
