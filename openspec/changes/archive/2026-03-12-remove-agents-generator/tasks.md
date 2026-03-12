## 1. Remove the generator workflow

- [x] 1.1 Delete `scripts/generate_agents.py` and remove `agents-manifest.json` if nothing else in the repository consumes it.
- [x] 1.2 Update checked-in `AGENTS.md` files to remove generated-file notices and any wording that assumes a generator-managed workflow.
- [x] 1.3 Remove generator-specific automated tests and any helper code that only exists to exercise the deleted CLI.

## 2. Align repository documentation

- [x] 2.1 Update `README.md` to describe `AGENTS.md` files as directly maintained repository documents.
- [x] 2.2 Remove stale references to the deleted `write` and `check` commands and correct the documented scoped `AGENTS.md` footprint to match the files that actually exist.

## 3. Verify the post-removal state

- [x] 3.1 Search the repository for references to `scripts/generate_agents.py`, `agents-manifest.json`, and generator-only workflow text, then remove any remaining stale references.
- [x] 3.2 Run the closest remaining quality gate for the touched files and confirm the repository no longer depends on the deleted generator workflow.
