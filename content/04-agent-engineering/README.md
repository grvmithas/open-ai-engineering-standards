# Level 4: Agent Engineering

> **Prerequisites:** Level 3: Skill Engineering
> **Goal:** Build autonomous agents that are reliable, verifiable, and production-safe

---

## The Agent Engineering Standard

An agent is not a prompt that calls tools. An agent is a **software system** that uses an LLM as one component of its reasoning, wrapped by a deterministic harness, with defined memory, communication protocols, and termination criteria.

Most "agents" in production today fail because they were built like prompts, not like software.

---

## The OAIES Agent Specification

Every agent in this library follows this specification:

```yaml
name: string                      # Agent identifier
role: string                      # What this agent does (and does NOT do)

tools:                            # Exact tools available to this agent
  - tool_name: description        # Only what's needed (least privilege)

memory:
  type: in-context | episodic | semantic | external
  scope: session | persistent | shared
  compression: summarization | pruning | none

communication:
  receives_from: [human | agent_name]
  outputs_to: [human | agent_name | tool]
  protocol: message_schema

termination:
  success: "Specific, measurable success condition"
  failure: "Specific failure condition (including max_iterations)"
  timeout: seconds

error_handling:
  tool_failure: retry | fallback | escalate
  model_failure: retry_with_backoff | escalate
  loop_detection: after_n_same_tool_calls

security:
  max_privilege_level: read | write | admin
  requires_human_approval: [list of high-impact operations]
  audit_logging: required
```

---

## Why Termination Criteria Matter

The #1 failure mode for agents in production is the **infinite loop** — the agent keeps calling tools without making progress. This happens when:
- Success criteria are vague ("do the task well")
- The agent has no way to recognize it's stuck
- No loop detection exists

**The OAIES standard requires ALL three:**
1. Explicit success criteria (what does done look like?)
2. Explicit failure criteria (when do we stop and escalate?)
3. Loop detection (same tool called N times in a row → stop)

---

## The Agent Library

### Core Agents

| Agent | Role | Install |
|-------|------|---------|
| [planner.agent.md](./agents/planner.agent.md) | Creates implementation plans | `.claude/agents/` |
| [architect.agent.md](./agents/architect.agent.md) | Designs system architecture | `.claude/agents/` |
| [research.agent.md](./agents/research.agent.md) | Gathers and synthesizes information | `.claude/agents/` |
| [coder.agent.md](./agents/coder.agent.md) | Implements approved plans | `.claude/agents/` |
| [reviewer.agent.md](./agents/reviewer.agent.md) | Reviews code and artifacts | `.claude/agents/` |
| [security.agent.md](./agents/security.agent.md) | Performs security audits | `.claude/agents/` |
| [testing.agent.md](./agents/testing.agent.md) | Generates and runs tests | `.claude/agents/` |
| [documentation.agent.md](./agents/documentation.agent.md) | Generates technical docs | `.claude/agents/` |
| [observability.agent.md](./agents/observability.agent.md) | Monitors and diagnoses | `.claude/agents/` |
| [devops.agent.md](./agents/devops.agent.md) | Manages CI/CD and infrastructure | `.claude/agents/` |

### Specialist Agents
| Agent | Role |
|-------|------|
| [rag.agent.md](./agents/rag.agent.md) | RAG pipeline design and optimization |
| [knowledge.agent.md](./agents/knowledge.agent.md) | Knowledge capture and retrieval |
| [prompt-engineer.agent.md](./agents/prompt-engineer.agent.md) | Prompt design and optimization |
| [context-engineer.agent.md](./agents/context-engineer.agent.md) | Context assembly and curation |

---

## Subagent Library

Subagents are specialized, isolated agents for specific technology tasks. They run in their own context (not cluttering the main agent's context window).

| Subagent | Technology | Task |
|---------|-----------|------|
| [react.subagent.md](./subagents/react.subagent.md) | React | Component generation and debugging |
| [nextjs-routing.subagent.md](./subagents/nextjs-routing.subagent.md) | Next.js | Route configuration and middleware |
| [postgres.subagent.md](./subagents/postgres.subagent.md) | PostgreSQL | Query optimization and migrations |
| [docker.subagent.md](./subagents/docker.subagent.md) | Docker | Dockerfile and compose optimization |
| [kubernetes.subagent.md](./subagents/kubernetes.subagent.md) | Kubernetes | Manifest generation and debugging |
| [github-actions.subagent.md](./subagents/github-actions.subagent.md) | GitHub Actions | Workflow creation and debugging |

---

## Hooks Library

Hooks are **deterministic shell scripts** that run outside the agent's control. They enforce safety guarantees that prompts cannot.

```bash
# The key insight: hooks are not AI instructions
# They are code that runs deterministically before or after agent actions

# pre-commit.hook.sh — runs before every git commit
#!/bin/bash
# Block commits with credentials or secrets
git diff --cached | grep -E "(password|secret|api_key|token)" \
  && echo "ERROR: Potential secret in commit. Remove before committing." \
  && exit 1

# Block commits that would break tests
npm test --silent || (echo "ERROR: Tests failing. Fix before committing." && exit 1)

echo "Pre-commit checks passed."
```

| Hook | Trigger | Purpose |
|------|---------|---------|
| [pre-planning.hook.sh](./hooks/pre-planning.hook.sh) | Before planning | Verify prerequisites |
| [pre-code.hook.sh](./hooks/pre-code.hook.sh) | Before coding | Verify plan is approved |
| [post-code.hook.sh](./hooks/post-code.hook.sh) | After coding | Run linter, type check |
| [pre-commit.hook.sh](./hooks/pre-commit.hook.sh) | Before git commit | Run tests, check secrets |
| [pre-review.hook.sh](./hooks/pre-review.hook.sh) | Before review | Format and lint |
| [deployment.hook.sh](./hooks/deployment.hook.sh) | Before deploy | Verify all gates passed |
| [knowledge-capture.hook.sh](./hooks/knowledge-capture.hook.sh) | After task | Trigger knowledge capture |

---

## Agent Engineering Anti-Patterns

### ❌ Agent Without Termination Criteria
```yaml
# Wrong
termination: "when done"

# Correct
termination:
  success: "All acceptance criteria from the story are verified passing"
  failure: "After 5 tool call cycles without measurable progress, escalate to human"
  timeout: 300  # 5 minutes maximum
```

### ❌ Agent With Too Many Tools
An agent with 30 tools will use the wrong tool at the wrong time. Context degradation means tool selection accuracy drops as tool count increases.

**Rule:** Maximum 10 tools per agent. If you need more, split into subagents.

### ❌ Agent That Assumes Persistent State
Each agent invocation may not have the previous conversation's context. Design agents to reconstruct necessary state from external memory, not from implicit conversation history.

### ❌ Agent Without Human Approval for High-Impact Operations
```yaml
# Wrong — agent can delete without approval
tools:
  - delete_file

# Correct — high-impact requires approval
tools:
  - delete_file
security:
  requires_human_approval:
    - delete_file  # Requires explicit "yes" before executing
```

---

## Readiness Gate

Before proceeding to Level 5, verify:
- [ ] At least 3 agents installed with full OAIES specifications
- [ ] All agents have explicit termination criteria (success AND failure)
- [ ] Loop detection implemented for all agents
- [ ] Hooks installed for pre-commit (secrets check + tests)
- [ ] High-impact operations require human approval
- [ ] All agent actions are logged in audit trail
- [ ] At least one agent has been tested for adversarial input
