# AI Cookbook

> **Immediately useful. Zero setup required. Fork and adapt.**  
> **Updated:** 2026-07-29

---

## What This Is

The AI Cookbook is a collection of technology-specific AI engineering playbooks. Each entry contains everything you need to use AI tools effectively with that technology stack — prompts, agents, skills, hooks, debug workflows, and architecture patterns.

**Unlike generic AI resources, every cookbook entry is immediately actionable for that specific technology.**

---

## Why a Cookbook

AI engineering patterns don't change across technologies. The problems do:
- React developers hit different failure modes than Python developers
- Kubernetes debugging requires different context than Postgres optimization
- Azure deployments have different patterns than AWS

The cookbook adapts the AIES standard to each technology context so you don't have to.

---

## Available Cookbooks

| Technology | Status | Contents |
|-----------|--------|---------|
| [react/](./react/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug |
| [nextjs/](./nextjs/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug |
| [node/](./node/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug (also NestJS) |
| [python/](./python/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug (also FastAPI) |
| [java/](./java/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug |
| [dotnet/](./dotnet/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug |
| [react-native/](./react-native/README.md) | ✅ Kit-ready | README, prompts, skill, checklists, architecture, debug |
| [azure/](./azure/README.md) | 📋 Library | Domain cookbook (not a primary kit stack) |
| [aws/](./aws/README.md) | 📋 Library | Domain cookbook (not a primary kit stack) |
| [docker/](./docker/README.md) | 📋 Library | Domain cookbook |
| [kubernetes/](./kubernetes/README.md) | 📋 Library | Domain cookbook |
| [postgres/](./postgres/README.md) | 📋 Library | Domain cookbook |
| [redis/](./redis/README.md) | 📋 Library | Domain cookbook |
| [mongo/](./mongo/README.md) | 📋 Library | Domain cookbook |
| [graphql/](./graphql/README.md) | 📋 Library | Domain cookbook |
| [microfrontends/](./microfrontends/README.md) | 📋 Library | Domain cookbook |
| [performance/](./performance/README.md) | 📋 Library | Domain cookbook |
| [accessibility/](./accessibility/README.md) | 📋 Library | Domain cookbook |
| [seo/](./seo/README.md) | ✅ Library | Domain cookbook (technical SEO audits & metadata) |

### Honesty on parity

- **Kit-ready** stacks ship the minimum envelope and are what `create-aies-kit --stack` embeds.
- **Library** domain cookbooks share the same file layout (README · prompts · skill · checklists · debug · architecture) but are **not** primary kit stacks — depth and examples vary; treat them as adapters, not interchangeable with React/Next kit quality.
- Do **not** market “full cookbook parity for every domain” until each library entry has stack-specific prompts that cite native evidence (not generic software advice).

---

## Install into a product repo (preferred)

Do **not** copy files by hand and do **not** expect a `.aies/` folder. Run the kit CLI so content lands in IDE-native paths:

```bash
npx @grvmithas/create-aies-kit \
  --stack nextjs --ide cursor --role fullstack \
  --maturity intermediate --goal existing-codebase \
  --model claude --data-class internal --yes
```

| IDE | Prompts / skills / agents | Cookbook + guides + MCP specs |
|-----|---------------------------|-------------------------------|
| Cursor | `.cursor/prompts/`, `.cursor/skills/*/SKILL.md`, `.cursor/agents/` | `cookbook/{stack}/`, `guides/`, `mcps/` at **repo root** |
| GitHub Copilot | `.github/prompts/`, `.github/skills/`, `.github/agents/` | Same root dirs — **never** under `.github/cookbook` |
| Claude Code | `.claude/prompts/`, `.claude/skills/*/SKILL.md`, `.claude/agents/` | Same root dirs |

Root files: `AIES.md` (map) + `implementation_plan.md` (plan of record).  
Maturity only changes the reading path in `AIES.md` — the install is always complete.

---

## Each Cookbook Contains (shipped minimum)

```text
{technology}/
├── README.md
├── prompts/          generate · review · debug
├── skills/           {technology}.skill.md
├── architecture/     patterns.md
├── checklists/       code-review · deployment
└── debug-workflows/  common-errors.md
```

Optional later: agents, hooks, mcps, optimize/migrate prompts.

## Quick Start

Prefer the kit (IDE-native). Manual copy is only for one-off experiments:

```bash
npx @grvmithas/create-aies-kit --stack react --ide cursor --role frontend \
  --maturity beginner --goal learn --model claude --data-class public --yes
```

## Contributing a New Cookbook

New cookbooks must include at minimum:
- README with technology overview and when to use this cookbook
- At least 3 prompts (generate, review, debug)
- 1 skill file
- 1 debug workflow with at least 5 common errors
- Architecture patterns relevant to that technology

Missing any of these = PR rejected.

---

## Anti-Patterns

### ❌ Generic Prompts That Ignore the Technology
A React cookbook prompt must know what hooks are, what state management libraries exist, what patterns are idiomatic. "Write a React component" is not a cookbook entry.

### ❌ Cookbook Entries Without Debug Workflows
The most valuable part of any cookbook is the debugging section. Real practitioners spend more time debugging than generating. If your cookbook doesn't cover debugging, it's incomplete.
