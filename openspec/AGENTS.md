# Role and Objective
Support work in this repository as a Cherri Shortcuts toolkit for modular, maintainable Siri Shortcuts projects, using a docs-first approach and English (UK) output.

# Scope
This guidance applies to `openspec/` and all descendant paths.

# Core Instructions
- Prefer Cherri-native solutions and official Cherri documentation over ad hoc Shortcuts assumptions.
- Write in English (UK).
- For non-trivial work, begin with a short plan and then implement.
- Keep diffs small and reviewable.
- Use available tools, repository scripts, and official documentation whenever they materially improve correctness or completeness.
- Resolve prerequisite discovery, lookup, and validation before making changes that depend on them.
- Avoid speculative Cherri syntax or actions; confirm behaviour in official documentation first.
- If required context is missing, do not guess; prefer a reversible next step or look up the missing information first.
- If the user's intent is clear and the next step is low-risk and reversible, proceed without asking.
- Ask only when a missing choice would materially change the outcome or when an action is destructive.
- When answering user questions about Cherri, cite the official documentation page or pages used.
- Base factual claims on provided context, official documentation, or tool outputs; label unsupported inferences as inferences.
- User instructions override default style, tone, formatting, and initiative preferences; safety, honesty, privacy, and permission constraints remain binding.
- If newer user instructions conflict with earlier ones, follow the newer instruction.

# Environment and Tooling
- The local environment bootstrap at `.codex/environments/environment.toml` installs Cherri via Homebrew:
  - `brew tap electrikmilk/cherri`
  - `brew install electrikmilk/cherri/cherri`
- Use the repository's existing tooling and scripts if present.
- Do not add production dependencies without approval.
- Run shell commands only via the terminal tool.
- Use direct edit or patch tools when available rather than making equivalent changes through shell commands.
- Do not skip prerequisite discovery or validation steps just because the intended end state seems obvious.

# Cherri Docs-First Research Workflow
- Prefer official Cherri documentation on `https://www.cherrilang.org/`.
- Prefer Cherri CLI built-in docs for quick lookup when available:
  - `cherri --docs`
  - `cherri --docs=<category>`
  - `cherri --action=<action>`
- For web-related questions, start with `cherri --docs=web`.
- Use Definitions and Variables as companion docs when a web question crosses into launch surfaces, workflow input, or `ShortcutInput`.
- For image-related questions, use the narrowest matching docs surface first:
  - `cherri --docs=images` for still-image processing
  - `cherri --docs=photos` for Photos-library access
  - `cherri --docs=media` for broader screenshot, audio, or video work
- If a docs lookup is empty, unclear, or conflicting, try one or two alternative official-doc lookup paths before concluding.
- If docs are unclear or conflicting, note the uncertainty and cite the pages reviewed.
- Only cite sources reviewed in the current workflow; never fabricate citations, URLs, or quote spans.
- Base Cherri-specific claims on official docs or tool outputs, and label unsupported inferences as inferences.

# Cherri-Specific Coding Guidance
## Compilation and Debugging
- Compile `.cherri` files with `cherri <file>.cherri`.
- Use `--debug` when troubleshooting compile or runtime issues.
- If building outside macOS, use `--hubsign` to sign with RoutineHub credentials.

## Variables, Constants, and State
- Use `@name` for mutable variables.
- Prefer `const` for values that do not change.
- Keep side effects predictable and avoid unnecessary mutable state.

## Definitions, Includes, Functions, and Structure
- Use `#define` definitions for shortcut metadata such as name, icon, accepted input and output types, no-input behaviour, launch surfaces, and minimum supported version.
- Treat Cherri definitions as distinct from `function` declarations and action definitions.
- Use `#include` for modular code and package imports.
- Use `#include 'actions/web'` for Safari-page actions, HTTP/request actions, and URL parsing or utility helpers.
- Use `#include 'actions/images'` for still-image inspection and transformation.
- Use `#include 'actions/photos'` for selecting, searching, or saving through the Photos library.
- Use `#include 'actions/media'` for broader screenshot, audio, video, or media-transform actions that extend beyond still-image processing.
- Prefer official Web Actions names such as `runJavaScriptOnWebpage(...)`, `downloadURL(...)`, and `getURLs(...)` in guidance. If repository code uses helpers such as `runJS(...)`, describe them as local wrappers rather than official Cherri primitives.
- Include function support before writing functions:
  - `#include 'actions/scripting'`
- Be aware Cherri function scaffolding injects supporting actions at the start of the shortcut; avoid relying on incidental order.
- Use includes to keep shortcuts modular rather than creating monolithic files.

## Comments and Output
- Cherri comments are omitted from compiled shortcuts by default.
- Use `--comments` only when comments must be preserved in the compiled output.

## Packages
- Use Cherri's package manager commands for shared code:
  - `cherri --init`
  - `cherri --install <package>`
  - `cherri --packages`
  - `cherri --package <name>`
  - `cherri --tidy`
- Review package trust prompts carefully before installing.
- Keep package includes explicit and committed so builds stay reproducible.

## Practical Best Practices
- Prefer `const` over mutable variables when values are fixed.
- Use `nothing()` placeholders when Cherri control-flow syntax requires an action block.
- Avoid large pre-built arrays when a loop or generated values is clearer and cheaper.

# OpenSpec Workflow
- Treat `openspec/` as the specification source of truth and keep changes deliberate.
- Update proposal, design, spec, and tasks artefacts together when scope changes.
- Preserve OpenSpec schema structure and file naming conventions expected by the CLI.
- Treat work as incomplete until all requested artefacts are updated or explicitly marked `[blocked]`.
- Keep an internal checklist of requested artefacts and deliverables until completion.

# Directory-Specific Guidance
- Write OpenSpec artefacts in Markdown with a stable section structure so diffs are easy to review.
- Keep requirement language normative (`SHALL`/`MUST`) in spec files.
- Ensure each requirement has at least one scenario.

# Quality Gates
- Run the smallest relevant verification after changes:
  - Cherri compile for changed `.cherri` files
  - Existing tests, lint, typecheck, or build scripts, if and when added
- Before finalising, check that requested changes are complete, grounding is accurate, formatting is intact, and relevant verification or blockers are clearly reported.
- If no automated checks exist, state what was manually verified.

# Safety
- Ask before destructive changes, including deletions, history rewrites, and force pushes.
- Treat secrets as sensitive; do not hard-code keys or tokens.

# Reasoning and Execution
- Think step by step internally and do not reveal internal reasoning unless explicitly requested.
- For non-trivial work, begin with a short plan.
- Verify changes as you go and use the smallest relevant checks.
- Prefer low-risk, reversible progress when intent is clear.
- Do not stop early just to save tool calls when additional lookup or verification would materially improve correctness.

# Output and Style
- Use Markdown where semantically appropriate.
- Put file names, directory names, commands, and code identifiers in `backticks`.
- Keep responses concise and information-dense by default; avoid repeating the user's request.
- When reporting completed work, clearly state the files changed, verification run, and any blockers or follow-up items.
- Return exactly the requested deliverables in the order the user requested them.

# Stop Conditions
- Finish when the requested changes are complete, relevant verification has been run or blockers are clearly reported, and formatting remains intact.
- Escalate only when a missing decision would materially affect the outcome or when an action would be destructive.

# Reference Links
Official Cherri docs:
- Getting Started: https://www.cherrilang.org/getting-started/
- Docs index / CLI docs lookup: https://www.cherrilang.org/docs/
- Definitions: https://www.cherrilang.org/language/definitions/
- Includes: https://www.cherrilang.org/language/includes/
- Web actions: https://www.cherrilang.org/language/standard/web.html
- Images actions: https://www.cherrilang.org/language/standard/images.html
- Photos actions: https://www.cherrilang.org/language/standard/photos.html
- Media actions: https://www.cherrilang.org/language/standard/media.html
- Variables and constants: https://www.cherrilang.org/language/variables/
- Functions: https://www.cherrilang.org/language/functions/
- Packages: https://www.cherrilang.org/language/packages/
- Best practices: https://www.cherrilang.org/language/best-practices/
- Comments: https://www.cherrilang.org/language/comments/
