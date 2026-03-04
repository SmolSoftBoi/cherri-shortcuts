# Contact Enrichment Shortcut

This shortcut enriches missing contact profile fields using:
- Twilio Lookup (phone metadata)
- People Data Labs person/company enrichment
- Apple Intelligence + ChatGPT normalisation

It applies a fill-missing-only merge rule and asks for confirmation before updates.

## Shortcut Definitions

The shortcut declares:
- `#define name Contact Enrichment`
- `#define inputs contact, dictionary, text`
- `#define outputs text`

The declared input contract supports `Contact`, `Dictionary`, and `Text` content items so metadata aligns with runtime `ShortcutInput` parsing.

## Input Modes

The shortcut supports three seed input modes:
- `Use Shortcut Input` when the shortcut is invoked with input from another shortcut/app.
- `Select Contact` for an existing Contacts record.
- `Manual Entry` for typed identifiers.

Supported Shortcut input shapes:
- `Contact`: reads profile fields, first phone, and first email.
- `Dictionary`: reads keys such as `phone`, `phone_number`, `email`, `domain`, `company_domain`, `name`, `full_name`, `first_name`, `last_name`, `company`, `company_name`, `job_title`, `title`, `department`, `nickname`.
- `Text`: maps a single value to email (`@`), domain (`.` with no spaces), or phone (fallback).

Empty text Shortcut input is treated as no upstream input, so the shortcut falls back to `Select Contact` / `Manual Entry`.

## Files

- `contact-enrichment.cherri`: entry point
- `modules/config.cherri`: credentials + threshold settings
- `modules/input.cherri`: contact/manual input capture + normalisation
- `modules/providers.cherri`: Twilio + PDL requests and mapping
- `modules/llm.cherri`: Apple Intelligence + ChatGPT structured passes
- `modules/merge.cherri`: merge proposal + writable-field updates

## Credential Setup

Do not hard-code credentials in source files.

1. Configure import questions when adding/importing the shortcut:
   - Twilio Account SID
   - Twilio Auth Token
   - People Data Labs API Key
2. Leave any credential blank to skip that provider.
3. Runtime prompts remain only for enrichment input fields and confidence thresholds.

## Account Prerequisites

- Twilio account with Lookup API access.
- People Data Labs account with person/company enrichment access.
- Apple Intelligence and ChatGPT access from Shortcuts on the target device.

## Confidence Thresholds

The shortcut prompts for user-configurable thresholds with defaults:
- Name fields: `0.72`
- Company/domain: `0.70`
- Role fields (job title/department): `0.68`

Inputs are bounded to the `0..1` range.

## Writable Field Allowlist

The shortcut updates only these contact profile fields:
- First Name
- Last Name
- Name
- Company
- Job Title
- Department
- Nickname

Phone/email/domain write-back is intentionally excluded from automatic updates.
When starting from manual entry (no selected contact), the proposal is limited to fields supported by `newContact`: First Name, Last Name, and Company.

## Validation Matrix

Use these manual scenarios:

1. Complete contact
   - Expect no updates proposed.
2. Phone-only contact
   - Expect candidate fields proposed when provider/model confidence passes thresholds.
3. Conflicting provider data
   - Expect deterministic merge to fill only missing fields.
4. Invalid phone input
   - Expect Twilio skip/limited result and safe continuation.
5. Missing provider credentials
   - Expect provider status `missing_credentials` and safe continuation.
6. User declines confirmation
   - Expect no contact updates applied.
7. Shortcut input path
   - Provide `Contact`, `Dictionary`, and `Text` inputs and expect seed extraction to match the rules above.

## Compile

```bash
cherri shortcuts/contact-enrichment/contact-enrichment.cherri --skip-sign
```
