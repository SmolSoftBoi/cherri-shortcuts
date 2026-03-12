## Context

The current repository documents `AGENTS.md` as generated output managed by `scripts/generate_agents.py`, `agents-manifest.json`, and dedicated CLI tests. That contract is now stale: the repository still contains checked-in `AGENTS.md` files, but the documented scoped footprint already diverges from reality because `openspec/AGENTS.md` is not present.

Deleting `scripts/generate_agents.py` therefore needs a broader clean-up than removing one file. The implementation must preserve the useful guidance content, remove the dead generator workflow, and update the OpenSpec capability so the repository’s documented behaviour matches the maintained files on disk.

## Goals / Non-Goals

**Goals:**

- Remove the generator-specific maintenance path for `AGENTS.md`.
- Preserve existing `AGENTS.md` guidance as ordinary committed Markdown files that can be edited directly.
- Align tests, README guidance, and OpenSpec requirements with the post-generator workflow.
- Leave the repository in a state where no documented command depends on the deleted script.

**Non-Goals:**

- Rewriting the substantive guidance inside existing `AGENTS.md` files beyond what is needed to remove generated-file notices.
- Introducing a new replacement generator, linter, or manifest format.
- Recreating `openspec/AGENTS.md` unless a separate change explicitly decides that `openspec/` still needs a scoped guidance file.

## Decisions

### Convert managed `AGENTS.md` files into directly maintained source files

The repository will keep the existing committed `AGENTS.md` files and stop treating them as generated artefacts. This keeps useful guidance in place while removing the maintenance indirection.

Alternative considered:
- Keep the generator and only deprecate it in docs. Rejected because the user explicitly wants the generator script deleted, and a partially retained workflow would leave dead code and stale instructions behind.

### Remove the manifest-driven toolchain as a single unit

Implementation should remove `scripts/generate_agents.py`, the manifest that only feeds that script, and tests that only validate the generator CLI. Documentation that references `write` or `check` commands must be updated in the same change.

Alternative considered:
- Delete only the script and leave the manifest, tests, or README sections in place. Rejected because it would leave the repository with broken references and failing expectations.

### Keep the capability but retire generator-specific requirements

The existing `agents-file-generation` capability will be updated rather than deleted outright. The delta spec will preserve the repository’s requirement to maintain root and scoped `AGENTS.md` files, while removing manifest inheritance and check-mode requirements that no longer apply.

Alternative considered:
- Remove the capability entirely. Rejected because the repository still has agent guidance files whose expected maintenance model should remain documented in OpenSpec.

## Risks / Trade-offs

- [Manual drift between `AGENTS.md` files] -> Preserve direct-edit expectations in docs and rely on normal review to catch unintended divergence.
- [Spec name is slightly broader than the new behaviour] -> Update the requirement text to describe direct maintenance clearly and leave any capability rename for a separate follow-up if it becomes confusing.
- [Scoped file footprint is already inconsistent] -> Treat the current checked-in files as the source of truth during implementation and update docs accordingly instead of recreating missing files automatically.

## Migration Plan

1. Remove generator-specific code and data sources.
2. Update checked-in `AGENTS.md` files and contributor docs to remove generated-file instructions.
3. Remove generator-only tests and verify no references to the deleted CLI remain.
4. Keep rollback simple by relying on version control to restore the removed maintenance workflow if needed.

## Open Questions

- None for this proposal. The implementation assumes the repository should only keep the currently committed `AGENTS.md` files unless a follow-up change introduces additional scoped guidance files.
