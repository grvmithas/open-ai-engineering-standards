# Open AI Engineering Standard (OAIES)

> **The definitive open-source standard for building production-grade AI systems.**
> Not a tutorial. Not a template. A *standard* — opinionated, battle-tested, and built by engineers who ship.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)
[![Standard](https://img.shields.io/badge/standard-OAIES%20v1.0-purple.svg)](README.md)

---

## Why This Exists

Every serious engineering discipline has a standard.
- **Web:** React, Next.js conventions
- **APIs:** REST, OpenAPI, GraphQL
- **DevOps:** The Twelve-Factor App
- **AI Engineering:** Nothing. Until now.

Most AI repositories give you "here are five ways to do X." This repository gives you **one way** — the right way — informed by production deployments, enterprise constraints, and the collective wisdom of engineers who have shipped AI systems at scale.

**If you are starting any AI product, you fork this first.**

---

## Maturity Model

This repository is structured as a 10-level AI Engineering Maturity Model. Enter at your current level. Ascend deliberately.

| Level | Name | When You're Ready |
|-------|------|-------------------|
| **L0** | [AI Foundations](./00-foundations/) | You're new to building with LLMs |
| **L1** | [Prompt Engineering](./01-prompt-engineering/) | You understand tokens and context |
| **L2** | [Context Engineering](./02-context-engineering/) | You're building multi-turn systems |
| **L3** | [Skill Engineering](./03-skill-engineering/) | You're automating recurring workflows |
| **L4** | [Agent Engineering](./04-agent-engineering/) | You're building autonomous agents |
| **L5** | [Multi-Agent Systems](./05-multi-agent-systems/) | You're orchestrating agent networks |
| **L6** | [Memory & Knowledge](./06-memory-knowledge/) | You need persistent agent memory |
| **L7** | [LLMOps](./07-llmops/) | You're running AI in production |
| **L8** | [AI SDLC](./08-ai-sdlc/) | You're building AI-first processes |
| **L9** | [Enterprise AI](./09-enterprise-ai/) | You need governance and compliance |
| **L10** | [AI Org Playbook](./10-ai-org-playbook/) | You're building an AI-first organization |

---

## The Standard Workflow

**Every feature. Every time. No exceptions.**

```
Idea → Research → Requirements → Story Kickoff → Context Collection →
Knowledge Gathering → Planning → Architecture → Human Approval →
Prompt Generation → Coding → Self Review → Agent Review → Testing →
Evaluation → Security → Performance → Accessibility → Documentation →
Deployment → Monitoring → Continuous Improvement → Postmortem →
Lessons Learned → Knowledge Base Update
```

See the [AI SDLC](./08-ai-sdlc/) for the complete workflow specification with prompts for every stage.

---

## What's Inside

### 🏗️ Core Sections (Maturity Levels)
- **[00-foundations/](./00-foundations/)** — How LLMs think, the harness principle, failure modes
- **[01-prompt-engineering/](./01-prompt-engineering/)** — XML-structured prompts, patterns, anti-patterns
- **[02-context-engineering/](./02-context-engineering/)** — Context fidelity, progressive disclosure, state management
- **[03-skill-engineering/](./03-skill-engineering/)** — 26 reusable agent skills
- **[04-agent-engineering/](./04-agent-engineering/)** — 20 agent definitions, subagents, hooks
- **[05-multi-agent-systems/](./05-multi-agent-systems/)** — Orchestration patterns, A2A communication
- **[06-memory-knowledge/](./06-memory-knowledge/)** — Memory types, knowledge graphs, hybrid RAG
- **[07-llmops/](./07-llmops/)** — Evaluation, PromptOps, cost optimization, observability
- **[08-ai-sdlc/](./08-ai-sdlc/)** — Complete SDLC with 15 production prompts
- **[09-enterprise-ai/](./09-enterprise-ai/)** — Governance, security, compliance, templates
- **[10-ai-org-playbook/](./10-ai-org-playbook/)** — Roles, operating models, culture

### ⭐ Unique Differentiators
- **[patterns/](./patterns/)** — 12 AI Engineering Patterns (full 13-component specification — nobody else has this)
- **[cookbook/](./cookbook/)** — AI Cookbook for 18 technology stacks
- **[mcps/](./mcps/)** — 24 production-ready MCP integration specs

### 🛠️ Operational Resources
- **[prompts/](./prompts/)** — Standard prompt library (cross-referenced with SDLC)
- **[skills/](./skills/)** — All 26 skills (installable in `.claude/skills/`)
- **[agents/](./agents/)** — All 20 agent definitions (installable in `.claude/agents/`)
- **[hooks/](./hooks/)** — 12 lifecycle hooks (pre/post code, commit, review, deploy)
- **[checklists/](./checklists/)** — Quality gates for every stage
- **[evaluation/](./evaluation/)** — RAGAS, DeepEval, Promptfoo setup guides
- **[security/](./security/)** — Prompt injection defense, sandboxing, red teaming
- **[observability/](./observability/)** — OpenTelemetry, LangSmith, Langfuse, dashboards
- **[templates/](./templates/)** — ADR, PRD, RFC, Runbook, Playbook templates
- **[papers/](./papers/)** — Curated breakthrough research papers
- **[resources/](./resources/)** — Books, talks, repositories, standards

---

## Quick Start

### Use with Claude Code
```bash
# Clone into your project
git clone https://github.com/your-org/oaies .oaies

# Copy the behavioral contract
cp .oaies/CLAUDE.md ./CLAUDE.md

# Install skills
mkdir -p .claude/skills
cp .oaies/skills/*.skill.md .claude/skills/

# Install agents
mkdir -p .claude/agents
cp .oaies/agents/*.agent.md .claude/agents/

# Start a feature using the standard workflow
# Reference: .oaies/08-ai-sdlc/prompts/story-kickoff.prompt.md
```

### Use with Cursor / Windsurf / Roo
```bash
# Copy rules into your IDE's rules folder
cp .oaies/rules/*.md .cursorrules
# or
cp .oaies/rules/*.md .windsurfrules
```

### Use standalone
Browse the maturity model from [Level 0](./00-foundations/) and follow the standard workflow defined in [Level 8](./08-ai-sdlc/).

---

## Design Principles

| Principle | What It Means |
|-----------|---------------|
| **Opinionated** | One standard, not a menu of options |
| **Production-first** | Every recommendation is battle-tested |
| **Enterprise-ready** | Governance, compliance, and audit trails built in |
| **Living standard** | Updated quarterly with technology radar insights |
| **Context-complete** | Every decision includes Why, When, Tradeoffs, Anti-patterns |

---

## The 50/50 Rule

> **50% AI reasoning. 50% deterministic code.**

The biggest mistake in AI engineering is treating the LLM as the entire system. The model is one component. The deterministic harness around it — validation, authorization, execution, logging — is equally important. This repository enforces both halves equally.

---

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

The standard for contributions is high by design. Every addition must include:
- Clear "Why" rationale
- Documented tradeoffs
- At least one anti-pattern
- Enterprise consideration
- Working example

---

## Versioning

| Version | Focus |
|---------|-------|
| v1.0 | AI Foundations, Prompt Engineering, Context Engineering |
| v2.0 | Agent Engineering, Multi-Agent Systems |
| v3.0 | LLMOps, AI SDLC |
| v4.0 | Enterprise AI, AI Org Playbook |
| v5.0 | Patterns Library complete |
| v10.0 | Full Cookbook across all technology stacks |

---

## License

MIT — Use it, adapt it, build on it. If it helps you, give it a star and consider contributing back.

---

*OAIES v1.0 — "The standard doesn't tell you what you can do. It tells you what you must do."*
