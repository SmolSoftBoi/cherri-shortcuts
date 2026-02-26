---
name: cherri-docs
description: Use when the user asks how to build with Cherri products or APIs and needs up-to-date official documentation with citations; prioritise Cherri docs MCP tools and restrict any fallback browsing to official Cherri domains.
---

# Cherri Docs

Provide authoritative, current guidance from Cherri docs using the `cherrilang.org` MCP server. Always prioritise the docs MCP tools over `web.run` for Cherri-related questions. Only if the MCP server is installed and returns no meaningful results should you fall back to web search.

## Workflow

1. Clarify the Cherri product/scope and the task.
2. Use Cherri docs MCP search/discovery first (including MCP resources/templates if needed).
3. Fetch the best page and the specific section needed (use anchors/section selectors when supported).
4. Answer with concise guidance and cite the doc source(s).
5. Provide code snippets only when the docs support them.

## If MCP Server Is Missing

If Cherri docs MCP tools fail or no Cherri docs resources are available:

1. Confirm the `cherrilang.org` docs MCP server is not already configured by checking available MCP tools/resources.
2. Run the team-standard install command for the Cherri docs MCP server yourself (use existing project/local MCP setup patterns; do not guess new conventions).
3. If it fails due to permissions/sandboxing, immediately retry the same command with escalated permissions and include a one-sentence justification for approval.
4. Only if the escalated attempt fails, ask the user to run the install command.
5. Ask the user to restart Codex.
6. Re-run the docs search/fetch after restart.

## Quality Rules

- Treat Cherri docs as the source of truth; avoid speculation.
- Keep quotes short and within policy limits; prefer paraphrase with citations.
- If multiple pages differ, call out the difference and cite both.
- If docs do not cover the user’s need, say so and offer next steps.

## Tooling Notes

- Always use MCP doc tools before any web search for Cherri-related questions.
- If the MCP server is installed but returns no meaningful results, then use web search as a fallback.
- When falling back to web search, restrict to official Cherri domains (`cherrilang.org`) and cite sources.
