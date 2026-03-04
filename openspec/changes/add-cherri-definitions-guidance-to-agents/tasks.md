## 1. Manifest guidance updates

- [x] 1.1 Add a Cherri definitions subsection in `agents-manifest.json` under Cherri-specific coding guidance.
- [x] 1.2 Include rules for declaring `#define` input/output contracts and aligning them with runtime `ShortcutInput` handling.
- [x] 1.3 Include guidance to document definition-dependent behaviour in shortcut README/OpenSpec artefacts.

## 2. Managed AGENTS generation

- [x] 2.1 Regenerate managed `AGENTS.md` files from the updated manifest.
- [x] 2.2 Verify root and scoped generated files include the new Cherri definitions guidance with consistent wording.

## 3. Verification and readiness

- [x] 3.1 Run existing managed-file check mode to confirm no AGENTS drift remains.
- [x] 3.2 Review diff scope to ensure only intended manifest and generated AGENTS changes are included.
- [x] 3.3 Record verification outcomes in the change notes if repository convention requires it.
