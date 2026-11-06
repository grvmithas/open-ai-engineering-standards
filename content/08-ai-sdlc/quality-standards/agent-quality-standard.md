# Agent Quality Standard

> **Applies to:** Every production agent definition — IDE-native subagents, background/cloud agents, and SDK-built agents  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Agents are programs with probabilistic steps. This standard makes them operable: bounded, observable, and stoppable.

## Why

An agent definition is now an executable artifact. Claude Code, Cursor, Copilot, Codex, Gemini CLI, Kiro, and OpenCode all load agent files with frontmatter (`name`, `description`, `tools`, `model`) and spawn them with their own context window and tool set. The `description` decides *when* the parent delegates; the `tools` list decides *what it can break*. A vague definition is not a style problem — it is an over-privileged process that triggers at the wrong time and never stops.

## How

1. **Write the frontmatter first.** `name` (kebab-case, ≤ 64 chars), `description` (≤ 1024 chars, states *when to delegate* and *when not to*), explicit `tools` allowlist, and `model` only when the task needs a specific tier.
2. **Write the body as a contract:** role and exclusions, inputs, output schema, termination, escalation.
3. **Enforce outside the prompt.** Tool permissions in the runtime config, hooks for policy, budget limits in the harness. The body describes; the harness enforces.
4. **Test before shipping:** run the scenarios in the Testing checklist; record results in the PR.
5. **Validate mechanically:** `npm run validate` enforces frontmatter; `create-aies-kit audit` checks installed agents.

## Checklist — minimum bar

### Definition

- [ ] Frontmatter present: `name`, `description`, `tools` (explicit list)
- [ ] `description` states the delegation trigger and at least one "do not use for" case
- [ ] Role is specific with explicit exclusions
- [ ] Tool list is least-privilege (no “all tools”; read-only by default)
- [ ] Memory requirements documented (what is read/written, retention)
- [ ] Communication protocol defined (inputs, outputs, escalation)
- [ ] Success termination criteria defined
- [ ] Failure termination criteria defined (including max iterations / budget)
- [ ] Recovery strategy for each major failure mode
- [ ] Success metrics a human can check

### Safety

- [ ] Tool execution validated by a harness (schema, authz, policy) — not by model prose alone
- [ ] High-impact operations require human approval
- [ ] Agent cannot exceed the invoking user’s permissions
- [ ] Actions are audited (who/what/when/tool/args redacted appropriately)
- [ ] Background agents run in an isolated branch, worktree, or VM with no production credentials

### Testing

- [ ] Happy-path scenarios covered
- [ ] At least two adversarial / injection scenarios covered for tool-using agents
- [ ] Tool-failure recovery tested
- [ ] Loop / budget exhaustion verified
- [ ] Delegation tested: the parent invokes the agent for in-scope tasks and does **not** invoke it for the documented out-of-scope case

## Reference shape

```markdown
---
name: example-reviewer
description: Reviews a diff for correctness and security. Use after implementation, before PR. Do not use for writing code.
tools: Read, Grep, Glob
model: inherit
---

## Role
...
## Inputs
...
## Output format
...
## Termination
- Success: ...
- Failure: max 20 tool calls or 15 minutes; return partial findings and escalate.
## Success metrics
...
```

See [coder.agent.md](../../04-agent-engineering/agents/coder.agent.md) for a complete example.

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| Narrow agents with explicit tool lists | Predictable delegation, small blast radius | More agent files to maintain |
| Read-only default | Safe to auto-delegate | Write tasks need an explicit second agent or human step |
| Hard budgets | No runaway cost or loops | Occasional legitimate long task stops early and needs a resume |
| Portable frontmatter only (`name`/`description`/`tools`/`model`) | Same file works across runtimes | Can't use runtime-specific fields without a per-runtime overlay |

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Unbounded loops | Hard max iterations + wall-clock budget |
| “You are helpful” as the whole role | State exclusions and authority limits |
| Shared static API keys across agents | Per-workload identity |
| Agent approves its own deploy | Separation of duties |
| `description: "General purpose helper"` | The parent delegates everything or nothing; write a trigger condition |
| Omitting `tools` (inherits everything) | Explicit allowlist; read-only unless the job is writing |

## Enterprise considerations

- **Inventory:** every agent definition is a governed asset — owner, version, risk tier — listed in the AI system inventory required by ISO/IEC 42001 and the EU AI Act deployer obligations.
- **Identity:** agents acting on enterprise systems use workload identity (OIDC federation, scoped tokens) with per-agent audit trails; never a developer's personal token.
- **Change control:** agent definitions ship through PR review like code; a changed `tools` list is a security-relevant change and triggers security review.
- **Kill switch:** you can disable an agent org-wide (managed settings / policy file) without a code release.

## Related

- [Agent engineering README](../../04-agent-engineering/README.md)
- [IDE-native subagents](../../handbook/ide-native-subagents.md)
- [Multi-agent systems](../../05-multi-agent-systems/README.md)
- [Planner agent](../../patterns/planner-pattern/agent.md)

## Changelog

- **1.2 — 2026-11-06:** Added Why, How, portable frontmatter requirements, delegation testing, background-agent isolation, Tradeoffs, and Enterprise considerations; reference shape now uses the native agent-file format.
- **1.1 — 2026-07-16:** Initial minimum bar.
