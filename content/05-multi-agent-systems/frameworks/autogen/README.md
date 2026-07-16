# AutoGen Production Integration

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Apply OAIES controls when Microsoft AutoGen is selected for multi-agent messaging and teams.

## Why

Conversation and team abstractions simplify coordination but can hide loops, authority boundaries, and correlated-agent failure.

## How

Pin the supported AutoGen release and use typed messages, explicit team membership, bounded termination conditions, isolated tool executors, and an external durable state/audit layer. Authenticate each runtime identity; authorize every tool call against original intent. Persist message digests and artifact provenance, not hidden reasoning. Validate saved-state compatibility before resume.

## Tradeoffs

Flexible conversational routing supports experimentation but is harder to reason about than a fixed workflow graph. Prefer explicit deterministic routing for regulated or irreversible work.

## Anti-patterns

- Letting model text select or extend privileges.
- Relying on “consensus” among same-model agents.
- Using message count alone as a success condition.

## Enterprise Considerations

Place model clients, tools, and remote runtimes behind tenant-aware gateways. Track framework/model versions in every trace and maintain an exit path through a framework-neutral message/state schema.

## Checklist

- [ ] Typed messages and authenticated runtime identities are enforced.
- [ ] Termination covers deadline, budget, no-progress, and cancellation.
- [ ] Tool execution is isolated and independently authorized.
- [ ] State save/load and upgrade compatibility are tested.

## References

- [AutoGen AgentChat documentation](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html)
- [AutoGen termination documentation](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/termination.html)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production integration standard.
