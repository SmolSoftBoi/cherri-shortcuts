# Verification Notes

## Manifest and generation updates

Command run:

```bash
python3 scripts/generate_agents.py write
```

Result:
- Updated `AGENTS.md`
- Updated `.github/AGENTS.md`
- Updated `openspec/AGENTS.md`

## Empty-state guidance presence and consistency

Commands run:

```bash
rg -n "Empty States and Nullability|nil|nothing\(\)|absent-vs-empty" AGENTS.md .github/AGENTS.md openspec/AGENTS.md
```

```bash
for f in AGENTS.md .github/AGENTS.md openspec/AGENTS.md; do
  awk 'BEGIN{s=0} /^### Empty States and Nullability/{s=1} /^### / && $0 !~ /^### Empty States and Nullability/ && s==1{exit} s==1{print}' "$f" > /tmp/empty-section-$(echo $f | tr '/.' '__').txt
 done
shasum /tmp/empty-section-AGENTS_md.txt /tmp/empty-section-_github_AGENTS_md.txt /tmp/empty-section-openspec_AGENTS_md.txt
```

Result:
- The `Empty States and Nullability` section is present in root and scoped generated AGENTS files.
- Section hashes match across files, confirming identical guidance text (unless future overrides are introduced).

## Quality gates

Commands run:

```bash
python3 scripts/generate_agents.py check
python3 -m unittest tests/test_generate_agents.py
```

Results:
- `generate_agents.py check`: pass (`All managed AGENTS.md files are up to date.`)
- `test_generate_agents.py`: pass (`Ran 3 tests`, `OK`)

## Diff scope notes

Command run:

```bash
git diff --name-only -- agents-manifest.json AGENTS.md .github/AGENTS.md openspec/AGENTS.md openspec/changes/add-cherri-empty-state-guidance-to-agents
```

Result:
- Manifest/generation changes are scoped to:
  - `agents-manifest.json`
  - `AGENTS.md`
  - `.github/AGENTS.md`
  - `openspec/AGENTS.md` (generated)
- Change artefacts for this change are under `openspec/changes/add-cherri-empty-state-guidance-to-agents/`.
- Repository includes unrelated pre-existing dirty/untracked paths; they were not modified by this change beyond files listed above.
