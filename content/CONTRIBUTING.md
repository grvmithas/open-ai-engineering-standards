# Contributing to OAIES

## The Standard for Contributing

This repository defines a standard. Contributions that lower that standard are rejected — respectfully, but firmly.

Before opening a PR, ask yourself: *Would a principal engineer at Anthropic, OpenAI, Microsoft, or Google approve this?*

---

## What We Accept

### ✅ High-value contributions
- New AI Engineering Patterns (full 13-component specification required)
- New cookbook entries for unlisted technology stacks
- Updates to existing content based on production learnings
- New MCP integration specs
- Anti-pattern additions with root cause analysis
- Corrections to factual errors with citations

### ❌ We do not accept
- "Awesome lists" of tools without integration guidance
- Tutorial-style content ("Let me explain what an LLM is...")
- Hedged recommendations ("You could do X or Y or Z...")
- Unverified claims without production evidence
- Placeholder content or TODOs
- Generic advice that applies to any software project

---

## Document Quality Standard

Every contribution MUST include:

| Required Element | Description |
|---|---|
| **Purpose** | One sentence — what problem this solves |
| **Why** | The reasoning — why this approach over alternatives |
| **Tradeoffs** | What you give up by choosing this approach |
| **Anti-pattern** | At least one thing NOT to do, with root cause |
| **Enterprise note** | Compliance, scale, or governance consideration |
| **Checklist** | Minimum verifiable quality gates (at least 3 items) |

Missing any of these = PR closed.

---

## File Naming Conventions

Follow these exactly. PRs that deviate will be asked to rename.

```
prompts/     → {purpose}.prompt.md
skills/      → {domain}.skill.md
agents/      → {role}.agent.md
subagents/   → {technology}.subagent.md
hooks/       → {trigger}-{action}.hook.sh
mcps/        → {service}.mcp.md
templates/   → {document-type}.template.md
checklists/  → {domain}-checklist.md
patterns/    → {name}-pattern/ (directory with full 13-component spec)
cookbook/    → {technology}/ (directory with full cookbook structure)
```

---

## Adding a New AI Engineering Pattern

Patterns are the most valuable contribution. Each must contain all 13 components:

```
patterns/{name}-pattern/
├── README.md           ← Overview and use cases
├── problem.md          ← The problem this pattern solves
├── context.md          ← When to apply this pattern
├── workflow.md         ← Step-by-step with Mermaid diagram
├── prompt.md           ← Production XML-structured prompt
├── agent.md            ← Agent definition
├── subagents.md        ← Required subagents
├── skills.md           ← Required skills
├── hooks.md            ← Pre/post hooks
├── checklist.md        ← Quality gate checklist
├── examples/           ← At least one working example
├── failures.md         ← Common failure modes with recovery
└── enterprise-notes.md ← Compliance, scale, governance
```

---

## PR Checklist

Before submitting:

- [ ] All required document elements present
- [ ] File naming follows conventions
- [ ] No placeholder text or TODOs
- [ ] Mermaid diagrams render correctly
- [ ] All internal links are valid
- [ ] Content is written at principal-engineer level
- [ ] Enterprise considerations documented
- [ ] Anti-patterns included
- [ ] Changelog updated

---

## Code of Conduct

We hold content to a high standard — not contributors. Everyone is welcome regardless of experience level. The bar is on the *contribution*, not the *contributor*.

If your PR is rejected, the feedback will be specific and constructive. Use it to improve the contribution and resubmit.

---

*OAIES — "The standard doesn't tell you what you can do. It tells you what you must do."*
