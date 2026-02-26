## 1. Generation Inputs and Scaffolding

- [x] 1.1 Define the repository manifest format for global agent guidance, target directories, and local overrides/additions
- [x] 1.2 Add generator templates or rendering helpers with a fixed section order for Markdown output
- [x] 1.3 Add a generation command entry point (write mode and check mode flags) using existing repo tooling

## 2. Core AGENTS File Generation

- [x] 2.1 Implement root `AGENTS.md` rendering from version-controlled manifest inputs
- [x] 2.2 Implement directory-target `AGENTS.md` generation for all configured paths
- [x] 2.3 Implement inheritance and override precedence for global versus directory-specific sections
- [x] 2.4 Ensure deterministic output (stable ordering and no non-deterministic content)

## 3. Validation and Workflow Integration

- [x] 3.1 Implement check mode to detect missing or out-of-date managed `AGENTS.md` files and return a failing exit status
- [x] 3.2 Add tests or fixture-based verification covering root generation, directory generation, overrides, and check-mode drift reporting
- [x] 3.3 Document how to configure, generate, and verify `AGENTS.md` files in the repository workflow
