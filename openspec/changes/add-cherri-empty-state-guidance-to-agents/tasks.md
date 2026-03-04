## 1. Manifest empty-state guidance

- [x] 1.1 Add an `Empty States and Nullability` subsection under Cherri-specific guidance in `agents-manifest.json`.
- [x] 1.2 Define absent-vs-empty rules for `nil`, empty text, empty collections, and `nothing()` output clearing.
- [x] 1.3 Add branching/coercion rules for empty-state checks (`typeOf(...)`, null checks, count checks) and documentation expectations.

## 2. Managed AGENTS regeneration and consistency

- [x] 2.1 Regenerate managed `AGENTS.md` files from the updated manifest.
- [x] 2.2 Verify root and scoped generated files include identical empty-state guidance unless explicitly overridden.

## 3. Verification and change hygiene

- [x] 3.1 Run managed-file check mode to confirm no AGENTS drift remains.
- [x] 3.2 Run existing generation tests and confirm they still pass.
- [x] 3.3 Record verification outcomes and diff-scope notes in the change verification artefact.
