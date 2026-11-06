# Agent SDKs and Agent-to-Agent Protocols

> **Handbook:** Pick the right layer when you build agents into a product, not just use them in the IDE  
> **Repo anchors:** [Multi-agent systems](../05-multi-agent-systems/README.md) · [MCP in 2026](./mcp-remote-servers-and-auth.md)  
> **Version:** 1.0 | **Updated:** 2026-11-06

---

## Purpose

Choose between building on a coding-agent harness SDK, a general agent SDK, a graph orchestration framework, or plain model API calls — and know when agent-to-agent protocols (A2A) are warranted versus MCP tools.

## Why

Most teams now need agents in two places: **in their engineering workflow** (covered by IDE runtimes) and **inside their product** (support agents, ops automation, data workflows). The product side has consolidated into a few layers, and choosing the wrong one is expensive: teams hand-build tool loops that an SDK provides, or adopt a heavyweight graph framework for a single-turn tool call.

## How

### Layer decision

| Need | Use | Examples |
|------|-----|----------|
| One model call, maybe one tool | Model API directly | Provider SDK with structured output |
| Tool-using agent with handoffs, guardrails, tracing | General agent SDK | OpenAI Agents SDK, Google Agent Development Kit, Microsoft Agent Framework |
| Agent that edits code, runs commands, uses skills/subagents | Coding-agent harness SDK | Claude Agent SDK, Cursor SDK, Codex SDK/`codex exec` |
| Long-running, branching, resumable workflows with explicit state | Graph orchestration | LangGraph, ADK workflows |
| Agents owned by different teams/vendors cooperating over the network | A2A protocol | Agent cards + task lifecycle over HTTP |

Default to the **lowest layer that meets the requirement**. Each step up adds dependencies, abstractions to debug, and upgrade churn.

### MCP vs A2A

| Question | MCP | A2A |
|----------|-----|-----|
| What is on the other side? | A tool or data source with defined operations | Another autonomous agent with its own reasoning |
| Who controls the work? | The calling agent | The remote agent, within the delegated task |
| Interaction | Request → result (plus elicitation) | Task with lifecycle: submitted → working → input-required → completed |
| Discovery | Server tool list; MCP Registry | Agent card (capabilities, auth, endpoint) |
| Use when | You need capability | You need delegation across an ownership boundary |

Inside one codebase or one team, subagents plus MCP tools cover nearly every case. Reach for A2A when a **different team or vendor** owns the other agent and you need a stable contract between autonomous systems.

### Production requirements regardless of layer

1. Structured outputs validated against schemas at every agent boundary.
2. Tracing with spans per model call and tool call (OpenTelemetry GenAI conventions).
3. Budgets: max turns, max tool calls, max spend per task — enforced in code.
4. Human approval for external effects, implemented as an interrupt the framework can resume from.
5. Eval suite per agent before release (see [Evaluating coding agents](./evaluating-coding-agents.md) for the method).

## Tradeoffs

| Choice | Gain | Cost |
|--------|------|------|
| Vendor agent SDK | Fast start, first-class model features | Coupling to one provider's abstractions |
| Coding-harness SDK | Inherits file/shell tools, skills, subagents, hooks | Heavy runtime; sandboxing is your responsibility |
| Graph framework | Explicit state, resumability | Abstraction overhead; harder debugging |
| A2A | Clean cross-org contracts | Distributed-systems complexity: auth, versioning, partial failure |

## Anti-patterns

- **Multi-agent by default.** Five agents passing messages where one agent with five tools would do; latency and failure modes multiply.
- **A2A between agents in the same service.** Use function calls or subagents; network protocols add failure modes for no ownership benefit.
- **Exposing an agent as an MCP tool to dodge A2A semantics.** Long-running, stateful delegation hidden behind a "tool" breaks timeouts and retries.
- **No budgets.** Agent loops without turn and spend caps eventually loop forever on a bad input.
- **Coding-harness SDK in production with host shell access.** Run it in a container or VM sandbox with no ambient credentials.

## Enterprise considerations

- Standardize on one general agent SDK per language to keep tracing, guardrails, and eval tooling consistent.
- A2A endpoints are APIs: authenticate (OAuth/mTLS), rate-limit, version agent cards, and log task IDs end to end.
- Record model and SDK versions per release; agent behavior changes with both.

## Checklist

- [ ] Lowest sufficient layer chosen and justified
- [ ] MCP for capabilities; A2A only across ownership boundaries
- [ ] Schemas validated at every agent boundary
- [ ] Tracing, budgets, and approval interrupts implemented
- [ ] Coding-harness agents sandboxed without ambient credentials
- [ ] Eval suite gates each agent release

## Changelog

- 2026-11-06: Initial chapter — layer decision table, MCP vs A2A, production requirements.
