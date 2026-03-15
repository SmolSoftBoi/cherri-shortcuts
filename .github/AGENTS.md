# Role and Objective
Provide repository-wide guidance for working effectively in this Cherri Shortcuts toolkit, with an emphasis on accurate, maintainable, and well-supported Cherri usage.

# Scope
- This guidance applies to the entire repository.

# Project Context
- This repository is a Cherri Shortcuts toolkit for modular, maintainable Siri Shortcuts projects.
- Prefer Cherri-native solutions and official Cherri documentation over ad hoc Shortcuts assumptions.
- Write in English (UK).

# Core Instructions
- For non-trivial work, start with a short plan and then implement.
- Keep diffs small and reviewable.
- For repository or code-change tasks, inspect the relevant files and existing patterns before editing.
- Avoid speculative Cherri syntax or actions; confirm behaviour in official documentation first.
- When answering user questions about Cherri, cite the official documentation page or pages actually used.
- Use the repository's existing tooling and scripts if present.
- Use tools, repository files, and documentation lookups whenever they materially improve correctness, completeness, or grounding.
- Do not stop early just to save tool calls when additional inspection or lookup is needed to complete the task correctly.
- Before taking an action, resolve prerequisite inspection, lookup, or validation steps first; do not skip them because the intended end state seems obvious.
- If required context is missing, do not guess; prefer the relevant lookup or inspection step first. If uncertainty remains, label it explicitly.
- Do not add production dependencies without approval.
- If the user's intent is clear and the next step is reversible and low-risk, proceed without asking. Ask permission only for destructive changes, external side effects, or choices that would materially change the outcome.
- User instructions override default style, tone, formatting, and initiative preferences unless they conflict with safety, honesty, privacy, or permission constraints.
- Treat the task as incomplete until all requested deliverables are handled or explicitly marked as blocked, with the missing dependency stated.

## Cherri-First Research Workflow
- Prefer official Cherri documentation on `https://www.cherrilang.org/`.
- Prefer Cherri CLI built-in docs for quick lookup when available:
  - `cherri --docs`
  - `cherri --docs=<category>`
  - `cherri --action=<action>`
- For web-related questions, start with `cherri --docs=web`; use Definitions and Variables as companion docs when launch surfaces, workflow input, or `ShortcutInput` materially affect the answer.
- For `runJavaScriptOnWebpage(...)`, also use the official Apple Shortcuts pages on webpage JavaScript input and usage as companion sources because Safari webpage input, Share Sheet scope, repeated action input, and `completion(...)` behaviour are Apple-side contract details.
- For image-related questions, use the narrowest matching docs surface first:
  - `cherri --docs=images` for still-image processing
  - `cherri --docs=photos` for Photos-library access
  - `cherri --docs=media` for broader screenshot, audio, or video work
- Base Cherri-specific claims only on the documentation pages reviewed or direct tool outputs.
- Only cite documentation pages actually reviewed in the current workflow; never fabricate citations, URLs, or quoted behaviour.
- If documentation is unclear or conflicting, note the uncertainty and cite the pages reviewed.
- If a documentation lookup returns empty, partial, or unclear results, try one or two reasonable fallback lookups before concluding that the information is unavailable.

## Cherri-Specific Coding Guidance
### Compilation and Debugging
- Compile `.cherri` files with `cherri <file>.cherri`.
- Use `--debug` when troubleshooting compile-time or runtime issues.
- If building outside macOS, use `--hubsign` to sign with RoutineHub credentials.

### Variables, Constants, and State
- Use `@name` for mutable variables.
- Prefer `const` for values that do not change.
- Keep side effects predictable and avoid unnecessary mutable state.

### Definitions, Includes, Functions, and Structure
- Use `#define` definitions for shortcut metadata such as name, icon, accepted input and output types, no-input behaviour, launch surfaces, and minimum supported version.
- Treat Cherri definitions as distinct from `function` declarations and action definitions.
- Use `#include` for modular code and package imports.
- Use `#include 'actions/web'` for Safari-page actions, HTTP/request actions, and URL parsing or utility helpers.
- Use `#include 'actions/images'` for still-image inspection and transformation.
- Use `#include 'actions/photos'` for selecting, searching, or saving through the Photos library.
- Use `#include 'actions/media'` for broader screenshot, audio, video, or media-transform actions that extend beyond still-image processing.
- Prefer official Web Actions names such as `runJavaScriptOnWebpage(...)`, `downloadURL(...)`, and `getURLs(...)` in explanations. Treat repository helpers such as `runJS(...)` as local wrappers rather than official Cherri actions.
- Treat `runJavaScriptOnWebpage(...)` as a Safari webpage-input action rather than a generic URL-string action. Converting Safari webpage input into text or URL values too early can break later webpage JavaScript execution.
- If a shortcut uses repeated `runJavaScriptOnWebpage(...)` actions, preserve Safari webpage input for each action instead of relying on ambient Safari state or derived text.
- Include function support before writing functions:
  - `#include 'actions/scripting'`
- Be aware that Cherri function scaffolding injects supporting actions at the start of the shortcut; avoid relying on incidental order.
- Use includes to keep shortcuts modular rather than creating monolithic files.

### Comments and Output
- Cherri comments are omitted from compiled shortcuts by default.
- Use `--comments` only when comments must be preserved in the compiled output.

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

# Environment and Tooling
- The local environment bootstrap in `.codex/environments/environment.toml` installs Cherri via Homebrew:
  - `brew tap electrikmilk/cherri`
  - `brew install electrikmilk/cherri/cherri`
- Only run shell commands via the terminal tool.
- Use direct edit or patch tools for file changes when available instead of shell-based editing workarounds.

# Planning and Verification
- Decompose non-trivial work with a short plan before implementation.
- Run the smallest relevant verification after changes:
  - Cherri compile for changed `.cherri` files
  - Existing tests, lint, typecheck, or build scripts, if present
- Before finalising, check that changes are consistent with repository conventions, grounded in the documentation or inspected code, correctly formatted for the requested response, and that no destructive or approval-gated action was taken without permission.
- If no automated checks exist, state what was manually verified.

# OpenSpec Workflow
- For non-trivial feature work, use the OpenSpec prompts and skills in `.github/prompts/` and `openspec/`.
- Keep proposal, design, specs, and tasks aligned before implementation when using OpenSpec.

# Safety
- Ask before destructive changes, including deletions, history rewrites, and force pushes.
- Treat secrets as sensitive; do not hard-code keys or tokens.

# Reference Links
- Getting Started: `https://www.cherrilang.org/getting-started/`
- Docs index / CLI docs lookup: `https://www.cherrilang.org/docs/`
- Definitions: `https://www.cherrilang.org/language/definitions/`
- Includes: `https://www.cherrilang.org/language/includes/`
- Web actions: `https://www.cherrilang.org/language/standard/web.html`
- Apple Shortcuts: Intro to the Run JavaScript on Webpage action on Mac: `https://support.apple.com/en-asia/guide/shortcuts-mac/apd218e2187d/mac`
- Apple Shortcuts: Use the Run JavaScript on Webpage action on Mac: `https://support.apple.com/en-afri/guide/shortcuts-mac/apdb71a01d93/mac`
- Apple Shortcuts: Advanced privacy and security settings on Mac: `https://support.apple.com/en-euro/guide/shortcuts-mac/apdfeb05586f/mac`
- Images actions: `https://www.cherrilang.org/language/standard/images.html`
- Photos actions: `https://www.cherrilang.org/language/standard/photos.html`
- Media actions: `https://www.cherrilang.org/language/standard/media.html`
- Variables and constants: `https://www.cherrilang.org/language/variables/`
- Functions: `https://www.cherrilang.org/language/functions/`
- Packages: `https://www.cherrilang.org/language/packages/`
- Best practices: `https://www.cherrilang.org/language/best-practices/`
- Comments: `https://www.cherrilang.org/language/comments/`

# Reasoning and Response Style
- Think through the task step by step internally.
- Keep user-facing responses concise, information-dense, and avoid repeating the user's request.
- For longer or multi-phase work, provide brief progress updates only when starting a major phase or when the plan materially changes; do not narrate routine tool calls.
- If the user specifies a response format, return exactly that format.
- Return exactly the requested sections in the requested order; if a length limit applies, apply it only to the section it governs.
- For code, use higher verbosity where it improves readability, including clear names, comments, and straightforward control flow.
- Use Markdown only where semantically appropriate.
- Format file, directory, function, and class names in `backticks`.

# Stop Conditions
- Finish only when all requested deliverables are completed or explicitly marked as blocked with the missing dependency stated.
- Escalate only when approval is required for destructive changes, external side effects, production dependencies, or materially outcome-changing choices.
