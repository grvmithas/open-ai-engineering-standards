# Level 5: Multi-Agent Systems

> **Prerequisites:** Level 4: Agent Engineering
> **Goal:** Orchestrate multiple agents reliably, with defined communication protocols and failure isolation  
> **Updated:** 2026-11-06

---

## Why Multi-Agent Systems

Single agents hit fundamental limits:
- **Context saturation:** Long tasks fill the context window, degrading reasoning
- **Tool overload:** Many tools degrade agent tool selection accuracy
- **Specialization:** A generalist agent cannot match a specialist on specific domains
- **Parallelization:** Sequential single-agent execution cannot parallelize independent work
- **Isolation:** A failed action in a single agent affects the entire task

Multi-agent systems solve these through separation of concerns. The key principle: **separate agents maintain separate contexts, enabling specialization and isolation.**

**When NOT to use multi-agent systems:**
- Single-step tasks
- Tasks that fit in one context window
- Tasks with no natural separation of concerns
- Teams that don't yet have reliable single agents (fix single agent reliability first)

---

## Architecture Patterns

### Pattern 1: Supervisor Pattern (Most Common)

```mermaid
graph TD
    H[Human] --> S[Supervisor Agent]
    S --> P[Planner Agent]
    S --> C[Coder Agent]
    S --> R[Reviewer Agent]
    S --> T[Testing Agent]
    P --> S
    C --> S
    R --> S
    T --> S
    S --> H
```

**When to use:** Complex tasks where a coordinator needs to delegate to and monitor specialists.
**Key property:** The supervisor maintains the overall plan and state; specialists execute focused subtasks.

### Pattern 2: Pipeline Pattern

```mermaid
graph LR
    A[Research Agent] --> B[Planner Agent]
    B --> C[Coder Agent]
    C --> D[Reviewer Agent]
    D --> E[Testing Agent]
    E --> F[Documentation Agent]
    F --> G[Release Agent]
```

**When to use:** Tasks with a clear sequential dependency — each stage feeds the next.
**Key property:** Each agent's output is the next agent's input. No shared state.

### Pattern 3: Parallel Specialist Pattern

```mermaid
graph TD
    O[Orchestrator] --> S[Security Agent]
    O --> P[Performance Agent]
    O --> A[Accessibility Agent]
    S --> O
    P --> O
    A --> O
    O --> Report[Combined Report]
```

**When to use:** Independent checks that can run simultaneously.
**Key property:** Agents work in parallel on separate concerns; orchestrator combines results.

### Pattern 4: Hierarchical Pattern

```mermaid
graph TD
    L[Lead Agent] --> F[Feature Agent 1]
    L --> G[Feature Agent 2]
    F --> FR[React Subagent]
    F --> FA[API Subagent]
    G --> GD[DB Subagent]
    G --> GG[GraphQL Subagent]
```

**When to use:** Very large tasks that decompose into independent sub-features.
**Key property:** Multiple levels of delegation; top-level maintains business context.

---

## Communication Protocol (AIES Standard)

All agent-to-agent communication uses a standard message schema:

```typescript
interface AgentMessage {
  // Routing
  from: string;              // Sending agent ID
  to: string;                // Receiving agent ID
  session_id: string;        // Shared across all agents in this task
  message_id: string;        // UUID for this message
  
  // Content
  type: MessageType;         // "task" | "result" | "question" | "escalation" | "complete"
  priority: "high" | "normal";
  
  // Task context (included in every message)
  task_context: {
    story_id: string;        // The story this task belongs to
    objective: string;       // What the overall task is achieving
    constraints: string[];   // Active constraints (security, performance, etc.)
  };
  
  // Message body
  content: string;           // The actual message content
  artifacts: Artifact[];     // Files, plans, or code produced
  
  // State management
  requires_response: boolean;
  timeout_seconds: number;
  escalation_target: string; // Who to escalate to if this message is not answered
}

type MessageType = 
  | "task"        // Delegating a task
  | "result"      // Returning a completed task result
  | "question"    // Asking for clarification (blocks until answered)
  | "escalation"  // Agent cannot proceed without human input
  | "complete";   // Task fully complete, session can close
```

---

## State Management

**The critical challenge in multi-agent systems:** How do agents share state without creating coupling?

### AIES State Management Pattern

```mermaid
graph TD
    A[Shared Task State Store] --> S[Supervisor]
    A --> C[Coder]
    A --> R[Reviewer]
    
    S -->|write: plan_approved=true| A
    C -->|write: implementation_complete=true| A
    R -->|write: review_passed=true| A
```

**Rules:**
1. State is stored in one place — not in any individual agent's context
2. Agents read and write state explicitly — no implicit context passing
3. Every state change is logged (who changed what, when)
4. State schema is defined upfront — agents cannot add arbitrary state

### Minimum State Schema

```typescript
interface TaskState {
  task_id: string;
  status: "planning" | "implementing" | "reviewing" | "testing" | "complete" | "failed";
  
  // Gate states (boolean flags that must be set before next stage)
  gates: {
    plan_approved: boolean;         // Human approved the plan
    implementation_complete: boolean;
    review_passed: boolean;
    tests_passing: boolean;
    security_approved: boolean;
    deployment_approved: boolean;
  };
  
  // Artifacts
  artifacts: {
    implementation_plan?: string;   // File path or content
    code_files?: string[];          // File paths
    test_results?: string;          // Test output
    review_report?: string;         // Review findings
  };
  
  // Agent status
  active_agents: string[];
  completed_agents: string[];
  failed_agents: string[];
}
```

---

## Failure Isolation

**The most important property of a multi-agent system:** a failing agent should not corrupt the overall task.

### Failure Isolation Pattern

```python
async def execute_agent_task(agent: Agent, task: Task, state: TaskState) -> AgentResult:
    """Execute an agent task with full isolation."""
    try:
        result = await agent.execute(task, timeout=agent.timeout_seconds)
        
        # Validate agent output before accepting it
        validated = await validate_output(result, expected_schema=task.output_schema)
        
        # Update state only after validation
        await state.update(agent.id, status="complete", artifacts=validated.artifacts)
        
        return validated
        
    except AgentTimeoutError:
        await state.update(agent.id, status="failed", reason="timeout")
        await escalate_to_human(f"Agent {agent.id} timed out. Current state: {state.summary()}")
        raise
        
    except AgentLoopError:
        await state.update(agent.id, status="failed", reason="loop_detected")
        await escalate_to_human(f"Agent {agent.id} detected loop. Last action: {agent.last_action}")
        raise
        
    except ValidationError as e:
        await state.update(agent.id, status="failed", reason=f"invalid_output: {e}")
        # Don't escalate — try recovery
        return await retry_with_different_context(agent, task, state, error=e)
```

---

## Framework Integrations

### LangGraph (Recommended for Stateful Graphs)
See [frameworks/langgraph/](./frameworks/langgraph/) for:
- Graph definition patterns
- State management with LangGraph
- Human-in-the-loop integration
- Streaming output

### Choosing a layer (2026)

Frameworks are one of three layers. Vendor agent SDKs (Claude Agent SDK, OpenAI Agents SDK, Google ADK, Microsoft Agent Framework — the successor that merges AutoGen and Semantic Kernel) give you the loop, tools, and handoffs; A2A connects agents across services and vendors; graph frameworks such as LangGraph give you explicit, checkpointed state machines. Pick per [Agent SDKs & A2A](../handbook/agent-sdks-and-a2a.md). For coding work inside one repository, prefer IDE-native subagents plus [parallel worktrees](../handbook/parallel-agents-and-worktrees.md) over a hand-built orchestrator.

### AutoGen (Microsoft)
New Microsoft projects should start on Microsoft Agent Framework; keep AutoGen guidance for existing systems.
See [frameworks/autogen/](./frameworks/autogen/) for:
- Conversation-based multi-agent setup
- GroupChat patterns
- Tool registration

### CrewAI (Role-Based)
See [frameworks/crewai/](./frameworks/crewai/) for:
- Crew and role definition
- Task delegation patterns
- Sequential vs. parallel execution

---

## Production Standards

Operational specs that expand this level beyond the overview:

| Standard | What it covers |
|----------|----------------|
| [Architecture and benefit](./standards/architecture-and-benefit.md) | Supervisor, pipeline, parallel, hierarchical patterns with Mermaid |
| [Identity and delegation](./standards/identity-and-delegation.md) | Workload identity, delegation tokens, confused-deputy defenses |
| [Message provenance](./standards/message-provenance.md) | `AgentMessage` schema, delivery, idempotency, audit |
| [Durable state and checkpoints](./standards/durable-state-checkpoints.md) | Authoritative state vs chat context; recovery |
| [Threat controls](./standards/threat-controls.md) | Cross-agent injection, tool abuse, exfiltration |
| [Cost and termination](./standards/cost-and-termination.md) | Budgets, max hops, kill switches, cost attribution |

---

## Anti-Patterns

### ❌ Agents That Share Context Windows
If agents share the same context window, you have one agent with multiple roles — not a multi-agent system. Context sharing defeats the purpose.

### ❌ No Communication Schema
Agents that communicate via free-form text cannot be reliably parsed, monitored, or debugged. Structured message schemas are required.

### ❌ Coordinator Without Authority
A supervisor that can only suggest but not direct is an advisory board, not an orchestrator. The supervisor must have authority to terminate failing agents and reassign tasks.

### ❌ No Failure Isolation
A system where one failing agent brings down the entire task is not a multi-agent system — it's a pipeline with multiple failure points and no recovery.

---

## Readiness Gate

Before deploying a multi-agent system, verify:
- [ ] Single agent system reliable (before adding multi-agent complexity)
- [ ] Communication schema defined and versioned
- [ ] State management centralized (not distributed across agent contexts)
- [ ] Failure isolation tested (kill one agent, verify task continues or escalates gracefully)
- [ ] Human escalation path tested end-to-end
- [ ] All agent interactions logged in audit trail
- [ ] Total system timeout enforced (not just per-agent timeout)
- [ ] Cost per task bounded and monitored
- [ ] Parallel coding agents isolated per worktree with task contracts and serial merge ([Parallel agents & worktrees](../handbook/parallel-agents-and-worktrees.md))

## Changelog

- **2026-11-06:** Added the 2026 layer-selection guidance (agent SDKs, A2A, Microsoft Agent Framework as AutoGen successor) and the parallel-worktree readiness item.
