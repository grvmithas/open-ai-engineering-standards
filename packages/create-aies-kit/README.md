# @grvmithas/create-aies-kit

Scaffold a **complete AIES harness** into your repo using **IDE-native paths** (no `.aies/` folder).

```bash
npx @grvmithas/create-aies-kit@latest \
  --stack nextjs --ide cursor --role fullstack \
  --maturity intermediate --goal new-product \
  --model claude --data-class internal --yes
```

Then enhance for *this* repository:

```bash
npx @grvmithas/create-aies-kit@latest enhance
```

Then open `*/prompts/enhance-repo.prompt.md` in your IDE agent so it adapts artifacts to your conventions.

## Layout contract

| Location | Contents |
|----------|----------|
| IDE folder (`.cursor` / `.github` / `.claude` / …) | **prompts**, **skills**, **agents** only (+ IDE rules / MCP config) |
| Repo root | `cookbook/{stack}/`, `guides/`, `mcps/`, `templates/`, `MODEL_POLICY.md`, root instruction files |

**Anti-pattern:** Nesting cookbook (or guides/MCP specs) under `.github/`. That folder is for Copilot discovery and GitHub metadata only.

## What you get

| Path | Purpose |
|------|---------|
| `AIES.md` | Operator guide — plans, prompts, skills, MCP, enhance |
| `implementation_plan.md` | Plan of record |
| `AGENTS.md` | Multi-agent / IDE agent contract |
| `CLAUDE.md` | Root Claude / multi-IDE contract |
| `copilot-instructions.md` | Root Copilot instructions |
| `.github/copilot-instructions.md` | Copilot discovery copy |
| IDE `prompts/` `skills/` `agents/` | Lifecycle + create/enhance artifacts |
| `cookbook/{stack}/` | Full stack cookbook at **repo root** |

Maturity only changes the **reading path** in `AIES.md`.

## MCP

`mcpServers` starts empty. `_aiesRecommended` holds enable-ready stubs (stack + enhance scan). Copy after human approval; never commit secrets.

Docs: https://www.ai-standards.dev/quickstart

## Changelog

- **1.3.0** — Ephemeral `plans/{STORY_ID}-plan.md` + `reviews/{STORY_ID}-code-review.md`; agent hooks shipped; enhance-repo v2 with IDE chat invoke + deep guardrail scan (lint/style FE+BE).
- **1.2.0** — Layout fix: cookbook/guides/mcps/templates at repo root for all IDEs; `.github` holds prompts/skills/agents (+ copilot-instructions) only.
- **1.1.0** — Self-contained package (embedded corpus + generator).
- **1.0.0** — Initial publish (incomplete; do not use).
