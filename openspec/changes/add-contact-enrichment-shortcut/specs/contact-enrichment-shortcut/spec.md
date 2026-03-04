## ADDED Requirements

### Requirement: Accept contact selection or manual seed fields
The shortcut SHALL accept either a selected contact or manual seed fields (phone number, email, name, company, and domain) and MUST build a normalised enrichment input object from whichever source is provided.

#### Scenario: User starts from selected contact
- **WHEN** the user selects an existing contact
- **THEN** the shortcut uses available contact values to construct enrichment input fields
- **THEN** the shortcut continues even if some fields are missing

#### Scenario: User starts from manual entry
- **WHEN** the user provides a phone number or other manual identifiers instead of selecting a contact
- **THEN** the shortcut constructs the enrichment input object from those values
- **THEN** the shortcut proceeds without requiring an existing contact record

### Requirement: Run provider enrichment in deterministic order
The shortcut SHALL execute provider enrichment in this order: Twilio Lookup, People Data Labs Person Enrichment, then People Data Labs Company Enrichment when company or domain context exists.

#### Scenario: Phone-led enrichment path
- **WHEN** a valid phone number is available
- **THEN** the shortcut calls Twilio Lookup before any People Data Labs request
- **THEN** downstream requests receive normalised phone context from prior steps

#### Scenario: Company enrichment gating
- **WHEN** no company name or domain context is available after person enrichment
- **THEN** the shortcut skips the company enrichment request
- **THEN** the shortcut continues with available evidence only

### Requirement: Normalise candidates using Apple Intelligence and ChatGPT
The shortcut SHALL run a two-pass LLM normalisation phase using Apple Intelligence first and ChatGPT second, and each pass MUST return structured dictionary output mapped to the canonical enrichment schema.

#### Scenario: Structured candidate normalisation
- **WHEN** provider responses are collected
- **THEN** Apple Intelligence receives provider evidence and returns dictionary-form candidate fields
- **THEN** ChatGPT receives the same evidence plus first-pass output and returns dictionary-form resolved candidates

#### Scenario: Evidence-bounded model behaviour
- **WHEN** either LLM proposes a value
- **THEN** the value includes confidence and evidence-source metadata in the internal schema
- **THEN** values without acceptable schema fields are excluded from merge evaluation

### Requirement: Apply fill-missing-only merge policy
The shortcut SHALL apply updates only where the existing contact field is empty and the candidate field is non-empty, and MUST NOT overwrite existing non-empty values.

#### Scenario: Existing value protection
- **WHEN** a contact field already has a non-empty value
- **THEN** the shortcut keeps the existing value regardless of candidate output
- **THEN** that field is excluded from pending updates

#### Scenario: Missing field enrichment
- **WHEN** a contact field is empty and candidate confidence meets the configured threshold
- **THEN** the shortcut marks that field as a proposed update
- **THEN** the proposed value is included in the confirmation preview

### Requirement: Support user-configurable confidence thresholds with defaults
The shortcut SHALL provide user-configurable confidence thresholds for merge eligibility and MUST apply default threshold values when the user does not provide overrides.

#### Scenario: Defaults are used without overrides
- **WHEN** the shortcut runs and the user does not customise confidence thresholds
- **THEN** the shortcut applies the defined default threshold values during merge evaluation
- **THEN** only candidates meeting those defaults are proposed for update

#### Scenario: User overrides thresholds
- **WHEN** the user provides custom confidence threshold values
- **THEN** the shortcut validates the override values against supported bounds
- **THEN** the shortcut uses the validated overrides for merge evaluation in that run

### Requirement: Require explicit confirmation before contact updates
The shortcut SHALL present a preview of all proposed field updates and MUST require explicit user confirmation before executing any contact update actions.

#### Scenario: User confirms update
- **WHEN** one or more proposed updates exist and the user confirms
- **THEN** the shortcut executes update actions only for the approved proposed fields
- **THEN** the shortcut reports completion with the list of applied fields

#### Scenario: User rejects update
- **WHEN** the user cancels or declines at the confirmation step
- **THEN** the shortcut performs no contact update actions
- **THEN** the shortcut exits with a no-change result

### Requirement: Handle partial failures without unsafe writes
The shortcut SHALL tolerate provider or model failures by continuing with remaining valid evidence, and MUST block updates when no trustworthy proposed fields remain.

#### Scenario: External API failure
- **WHEN** one provider request fails or times out
- **THEN** the shortcut logs or surfaces the failure context to the user
- **THEN** the shortcut continues with successful upstream/downstream evidence where possible

#### Scenario: No trustworthy output
- **WHEN** no candidate fields pass schema and confidence checks
- **THEN** the shortcut presents a no-updates message
- **THEN** the shortcut exits without calling contact update actions

### Requirement: Keep provider credentials out of source
The shortcut implementation SHALL source provider credentials from environment-backed or secure runtime inputs and MUST NOT hard-code API secrets in committed shortcut sources or examples.

#### Scenario: Missing credentials
- **WHEN** required provider credentials are not available at runtime
- **THEN** the shortcut reports which credential is missing
- **THEN** the shortcut stops before making external API requests

#### Scenario: Source safety
- **WHEN** shortcut source files and examples are reviewed
- **THEN** no literal API secrets are present
- **THEN** setup documentation describes how to provide credentials safely
