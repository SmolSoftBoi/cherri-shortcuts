# Scope
Applies to `.github/` and all descendant paths.

# Project Context
- This repository is a Cherri Shortcuts toolkit for modular, maintainable Siri Shortcuts projects.
- Prefer Cherri-native solutions and official Cherri documentation over ad hoc Shortcuts assumptions.
- Write in English (UK).

# Working Approach
- For non-trivial work, begin with a short plan, then implement.
- Keep diffs small and reviewable.
- Avoid speculative Cherri syntax or actions; confirm behaviour in the official documentation first.
- When answering user questions about Cherri, cite the official documentation page or pages used.
- If required context is missing, do not guess; check the relevant documentation, repository files, or existing scripts first.
- If the user's intent is clear and the next step is reversible and low-risk, proceed without asking; ask only when a missing choice would materially change the outcome or when approval is required.

# Environment and Tooling
- The local environment bootstrap file `.codex/environments/environment.toml` installs Cherri via Homebrew using:
  - `brew tap electrikmilk/cherri`
  - `brew install electrikmilk/cherri/cherri`
- Use the repository's existing tooling and scripts when present.
- Use tools and lookups whenever they materially improve correctness, completeness, or grounding.
- Do not add production dependencies without approval.

# Research Workflow
## Cherri Docs First
- Prefer official Cherri documentation on `https://www.cherrilang.org/`.
- Prefer Cherri CLI built-in documentation for quick lookup when available:
  - `cherri --docs`
  - `cherri --docs=<category>`
  - `cherri --action=<action>`
- If the documentation is unclear or conflicting, note the uncertainty and cite the pages reviewed.

# Cherri-Specific Coding Guidance
## Compilation and Debugging
- Compile `.cherri` files with `cherri <file>.cherri`.
- Use `--debug` when troubleshooting compile-time or runtime issues.
- If building outside macOS, use `--hubsign` to sign with RoutineHub credentials.

## Variables, Constants, and State
- Use `@name` for mutable variables.
- Prefer `const` for values that do not change.
- Keep side effects predictable and avoid unnecessary mutable state.

## Includes, Functions, and Structure
- Use `#include` for modular code and package imports.
- Include function support before writing functions:
  - `#include 'actions/scripting'`
- Be aware that Cherri function scaffolding injects supporting actions at the start of the shortcut; do not rely on incidental order.
- Use includes to keep shortcuts modular rather than creating monolithic files.

## Comments and Output
- Cherri comments are omitted from compiled shortcuts by default.
- Use `--comments` only when comments must be preserved in compiled output.

## Packages
- Use Cherri's package manager commands for shared code:
  - `cherri --init`
  - `cherri --install <package>`
  - `cherri --packages`
  - `cherri --package <name>`
  - `cherri --tidy`
- Review package trust prompts carefully before installing.
- Keep package includes explicit and committed so builds remain reproducible.

## Practical Best Practices
- Prefer `const` over mutable variables when values are fixed.
- Use `nothing()` placeholders when Cherri control-flow syntax requires an action block.
- Avoid large pre-built arrays when a loop or generated values would be clearer and cheaper.

# Quality Gates
- Run the smallest relevant verification after changes:
  - Cherri compile for changed `.cherri` files
  - Existing test, lint, typecheck, or build scripts, if present
- Before finalising, check that the result is correct, grounded in the docs or repository context used, and consistent with the requested scope.
- If no automated checks exist, state what was manually verified.

# OpenSpec Workflow
- For non-trivial feature work, use the OpenSpec prompts and skills in `.github/prompts/` and `openspec/`.
- Keep proposal, design, specs, and tasks aligned before implementation when using OpenSpec.

# Safety
- Ask before destructive changes, including deletions, history rewrites, and force pushes.
- Treat secrets as sensitive; do not hard-code keys or tokens.

# Directory-Specific Guidance
- Keep prompt files in `.github/prompts/` concise and task-oriented.
- Preserve prompt filenames and slash-command naming conventions unless the user requests a rename.
- When changing prompt text, prefer minimal edits that preserve the existing workflow intent.

# Reference Links
## Official Cherri Docs
- Getting Started: https://www.cherrilang.org/getting-started/
- Docs index / CLI docs lookup: https://www.cherrilang.org/docs/
- Includes: https://www.cherrilang.org/language/includes/
- Variables and constants: https://www.cherrilang.org/language/variables/
- Functions: https://www.cherrilang.org/language/functions/
- Packages: https://www.cherrilang.org/language/packages/
- Best practices: https://www.cherrilang.org/language/best-practices/
- Comments: https://www.cherrilang.org/language/comments/