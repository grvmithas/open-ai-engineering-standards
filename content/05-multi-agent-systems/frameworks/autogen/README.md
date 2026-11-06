# AutoGen Production Integration

> **Version:** 1.1.0 | **Last updated:** 2026-11-06

## Purpose

Apply AIES controls to **existing** Microsoft AutoGen systems, and migrate them to Microsoft Agent Framework (MAF) on a planned schedule.

> **Status (2026-11):** AutoGen is in **maintenance mode**. Microsoft Agent Framework 1.0 reached GA on 2026-04-03 and is the successor to both AutoGen and Semantic Kernel (Semantic Kernel receives security fixes only). Do not start new builds on AutoGen.

## Why

Conversation and team abstractions simplify coordination but can hide loops, authority boundaries, and correlated-agent failure.

## When

| Situation | Decision |
|---|---|
| New multi-agent build on the Microsoft stack | Microsoft Agent Framework 1.0 — not AutoGen |
| Existing AutoGen system in production | Keep running under the controls below; schedule migration before the next major feature |
| Problem solvable by one agent with tools | Neither — start single-agent (see below) |

**Single agent first.** Anthropic's and Cognition's 2025–2026 guidance converge: multi-agent systems multiply token cost (often 4–15×), fragment context, and create coordination failures that a single agent with good tools and a plan file does not have. Add agents only for parallelizable, read-heavy work (research fan-out, independent reviews) or hard isolation boundaries.

## How

### Operating an existing AutoGen system

Pin the supported AutoGen release and use typed messages, explicit team membership, bounded termination conditions, isolated tool executors, and an external durable state/audit layer. Authenticate each runtime identity; authorize every tool call against original intent. Persist message digests and artifact provenance, not hidden reasoning. Validate saved-state compatibility before resume.

### Migrating to Microsoft Agent Framework

1. Inventory agents, tools, termination conditions, and saved-state formats in the AutoGen system.
2. Map AutoGen `AgentChat` teams to MAF workflows (graph-based, checkpointed) — prefer an explicit workflow over group-chat routing for anything regulated or irreversible.
3. Re-implement tools as MAF tools with typed schemas; keep the AIES tool contract (side-effect class, authorization, idempotency) unchanged.
4. Use MAF's built-in human-approval and checkpointing on a durable store instead of custom resume logic.
5. Run the existing eval suite against both implementations; cut over only when the MAF build matches or beats the AutoGen baseline on task success, cost, and latency.
6. Keep a framework-neutral message/state schema so the next migration is cheaper.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Stay on AutoGen short term | No migration risk now | No new features; security fixes only; growing ecosystem drift |
| Migrate to MAF | Supported runtime, workflows, approvals, checkpointing | Re-implementation and re-evaluation effort |
| Conversational (group-chat) routing | Fast experimentation | Harder to reason about than a fixed workflow graph; prefer deterministic routing for regulated or irreversible work |

## Anti-patterns

- Letting model text select or extend privileges.
- Relying on “consensus” among same-model agents.
- Using message count alone as a success condition.
- Starting a new project on AutoGen in 2026 because existing examples use it.
- Porting AutoGen group chat 1:1 into MAF instead of redesigning as an explicit workflow.

## Enterprise Considerations

Place model clients, tools, and remote runtimes behind tenant-aware gateways. Track framework/model versions in every trace and maintain an exit path through a framework-neutral message/state schema.

## Checklist

- [ ] Typed messages and authenticated runtime identities are enforced.
- [ ] Termination covers deadline, budget, no-progress, and cancellation.
- [ ] Tool execution is isolated and independently authorized.
- [ ] State save/load and upgrade compatibility are tested.
- [ ] A dated migration plan to Microsoft Agent Framework exists, gated by eval parity.
- [ ] No new AutoGen projects are started.

## References

- [Microsoft Agent Framework 1.0 announcement](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
- [AutoGen maintenance-mode announcement](https://github.com/microsoft/autogen/discussions/7066)
- [AutoGen AgentChat documentation](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html)
- [AutoGen termination documentation](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/termination.html)

## Changelog

- **1.1.0 — 2026-11-06:** Maintenance-mode status, Microsoft Agent Framework 1.0 as successor, migration path, single-agent-first guidance.
- **1.0.0 — 2026-07-16:** Initial production integration standard.
