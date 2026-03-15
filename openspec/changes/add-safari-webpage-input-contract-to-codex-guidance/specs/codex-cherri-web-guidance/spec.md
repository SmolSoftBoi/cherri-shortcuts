## ADDED Requirements

### Requirement: Codex guidance explains the Safari webpage input contract for webpage JavaScript execution
The repository SHALL document that `runJavaScriptOnWebpage(...)` operates on Safari webpage input and SHALL avoid presenting it as a generic URL-string or ambient Safari-state action.

#### Scenario: Guidance explains Safari webpage input expectations
- **WHEN** a maintained Codex-facing guidance surface references `runJavaScriptOnWebpage(...)`
- **THEN** it states that webpage JavaScript execution depends on Safari webpage input
- **THEN** it distinguishes Safari webpage input from plain text or URL values derived from that input

#### Scenario: Guidance warns about common input-contract mistakes
- **WHEN** Codex-facing guidance discusses troubleshooting or composing multiple webpage JavaScript actions
- **THEN** it warns that converting webpage input to text too early can break later webpage JavaScript execution
- **THEN** it warns that each webpage JavaScript action needs Safari webpage input rather than assuming ambient Safari state is enough

### Requirement: Cherri web guidance uses companion Apple documentation for Safari webpage contract questions
The repository SHALL point Safari webpage JavaScript questions to official Apple Shortcuts documentation as companion material alongside the official Cherri Web Actions docs.

#### Scenario: Guidance links companion Apple docs for Safari webpage execution
- **WHEN** Codex-facing guidance discusses Safari Share Sheet execution, webpage-input requirements, or repeated `runJavaScriptOnWebpage(...)` usage
- **THEN** it cites the official Cherri Web Actions documentation for the Cherri action surface
- **THEN** it also cites the relevant official Apple Shortcuts documentation for the Safari webpage input contract
