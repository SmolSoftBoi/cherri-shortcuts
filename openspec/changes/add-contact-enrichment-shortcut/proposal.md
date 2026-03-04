## Why

Contacts are often captured with incomplete information (for example, phone-only records), which slows follow-up and causes fragmented address books. We need a repeatable enrichment flow now so users can recover missing identity and company data without manually researching each contact.

## What Changes

- Add a new Cherri Shortcut flow that accepts either a selected contact or raw input fields (phone number, email, name, company, and domain).
- Add enrichment requests to Twilio Lookup and People Data Labs to gather validated phone intelligence and candidate person/company attributes.
- Add a two-pass LLM normalisation step using Apple Intelligence first and ChatGPT second, both returning structured dictionary output.
- Add a deterministic merge policy: fill missing fields only, never overwrite non-empty existing contact values.
- Add user-configurable confidence thresholds with sensible defaults for merge eligibility.
- Add a review step that shows proposed updates and requires explicit user confirmation before any contact update action runs.
- Add configuration and documentation for required API credentials (Twilio and People Data Labs) without hard-coding secrets.

## Capabilities

### New Capabilities
- `contact-enrichment-shortcut`: Enriches incomplete contacts from phone and related fields using external providers plus LLM-assisted normalisation, then applies confirmed fill-missing-only updates.

### Modified Capabilities
- None.

## Impact

- Affected area: new OpenSpec capability and forthcoming Cherri shortcut sources for contact enrichment.
- External systems: Twilio Lookup API, People Data Labs Person Enrichment API, People Data Labs Company Enrichment API, Apple Intelligence, and ChatGPT.
- User-visible behaviour: new shortcut with preview-and-confirm update flow; no blind writes to Contacts.
- User-visible behaviour: confidence thresholds can be adjusted by the user, with defaults applied when no override is provided.
- Security and operations: API keys must be sourced from environment or secure user-provided input at runtime; docs and examples must describe credential setup.
