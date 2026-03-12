# AGENTS.md

## Scope
This file applies to `openspec/` and its descendants.

## Purpose
- Support work in this repository as a Cherri Shortcuts toolkit for modular, maintainable Siri Shortcuts projects.
- Prefer Cherri-native solutions and official Cherri documentation over ad hoc Shortcuts assumptions.
- Write in English (UK).

## Working Approach
- For non-trivial work, start with a short plan and then implement.
- Keep diffs small and reviewable.
- Use available tools, repository scripts, and official docs whenever they materially improve correctness or completeness.
- Avoid speculative Cherri syntax or actions; confirm behaviour in official docs first.
- If required context is missing, do not guess; prefer a reversible next step or look up the missing information first.
- If the user's intent is clear and the next step is low-risk and reversible, proceed without asking; ask only when a missing choice would materially change the outcome or an action is destructive.
- When answering user questions about Cherri, cite the official docs page(s) used.

## Environment and Tooling
- The local environment bootstrap at `.codex/environments/environment.toml` installs Cherri via Homebrew:
  - `brew tap electrikmilk/cherri`
  - `brew install electrikmilk/cherri/cherri`
- Use the repository's existing tooling and scripts if present.
- Do not add production dependencies without approval.

## Cherri Docs-First Research Workflow
- Prefer official Cherri docs on `https://www.cherrilang.org/`.
- Prefer Cherri CLI built-in docs for quick lookup when available:
  - `cherri --docs`
  - `cherri --docs=<category>`
  - `cherri --action=<action>`
- If a docs lookup is empty, unclear, or conflicting, try one or two alternative official-doc lookup paths before concluding.
- If docs are unclear or conflicting, note the uncertainty and cite the pages reviewed.

## Cherri-Specific Coding Guidance

### Compilation and Debugging
- Compile `.cherri` files with `cherri <file>.cherri`.
- Use `--debug` when troubleshooting compile or runtime issues.
- If building outside macOS, use `--hubsign` to sign with RoutineHub credentials.

### Variables, Constants, and State
- Use `@name` for mutable variables.
- Prefer `const` for values that do not change.
- Keep side effects predictable and avoid unnecessary mutable state.

### Includes, Functions, and Structure
- Use `#include` for modular code and package imports.
- Include function support before writing functions:
  - `#include 'actions/scripting'`
- Be aware Cherri function scaffolding injects supporting actions at the start of the shortcut; avoid relying on incidental order.
- Use includes to keep shortcuts modular rather than creating monolithic files.

### Comments and Output
- Cherri comments are omitted from compiled shortcuts by default.
- Use `--comments` only when you explicitly need comments preserved in the compiled output.

### Packages
- Use Cherri's package manager commands for shared code:
  - `cherri --init`
  - `cherri --install <package>`
  - `cherri --packages`
  - `cherri --package <name>`
  - `cherri --tidy`
- Review package trust prompts carefully before installing.
- Keep package includes explicit and committed so builds stay reproducible.

### Practical Best Practices
- Prefer `const` over mutable variables when values are fixed.
- Use `nothing()` placeholders when Cherri control-flow syntax requires an action block.
- Avoid large pre-built arrays when a loop or generated values is clearer and cheaper.

## Quality Gates
- Run the smallest relevant verification after changes:
  - Cherri compile for changed `.cherri` files.
  - Existing tests, lint, typecheck, or build scripts, if and when added.
- Before finalising, check that requested changes are complete, formatting is intact, and relevant verification or blockers are clearly reported.
- If no automated checks exist, state what was manually verified.

## OpenSpec Workflow
- Treat `openspec/` as the spec source of truth and keep changes deliberate.
- Update proposal, design, spec, and tasks artefacts together when scope changes.
- Preserve OpenSpec schema structure and file naming conventions expected by the CLI.

## Safety
- Ask before destructive changes, including deletions, history rewrites, and force pushes.
- Treat secrets as sensitive; do not hard-code keys or tokens.

## Directory-Specific Guidance
- Write OpenSpec artefacts in Markdown with stable section structure so diffs are easy to review.
- Keep requirement language normative (`SHALL`/`MUST`) in spec files.
- Ensure each requirement has at least one scenario.

## Reference Links
Official Cherri docs:
- Getting Started: https://www.cherrilang.org/getting-started/
- Docs index / CLI docs lookup: https://www.cherrilang.org/docs/
- Includes: https://www.cherrilang.org/language/includes/
- Variables and constants: https://www.cherrilang.org/language/variables/
- Functions: https://www.cherrilang.org/language/functions/
- Packages: https://www.cherrilang.org/language/packages/
- Best practices: https://www.cherrilang.org/language/best-practices/
- Comments: https://www.cherrilang.org/language/comments/