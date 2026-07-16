# Agent Quality Standard

> **Applies to:** Every production agent definition  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Purpose

Agents are programs with probabilistic steps. This standard makes them operable: bounded, observable, and stoppable.

## Minimum bar

### Definition

- [ ] Role is specific with explicit exclusions
- [ ] Tool list is least-privilege (no “all tools”)
- [ ] Memory requirements documented (what is read/written, retention)
- [ ] Communication protocol defined (inputs, outputs, escalation)
- [ ] Success termination criteria defined
- [ ] Failure termination criteria defined (including max iterations / budget)
- [ ] Recovery strategy for each major failure mode

### Safety

- [ ] Tool execution validated by a harness (schema, authz, policy) — not by model prose alone
- [ ] High-impact operations require human approval
- [ ] Agent cannot exceed the invoking user’s permissions
- [ ] Actions are audited (who/what/when/tool/args redacted appropriately)

### Testing

- [ ] Happy-path scenarios covered
- [ ] At least two adversarial / injection scenarios covered for tool-using agents
- [ ] Tool-failure recovery tested
- [ ] Loop / budget exhaustion verified

## Reference shape

```yaml
name: example.agent
role: |
  ...
tools: []
memory: []
communication:
  inputs_from: []
  outputs_to: []
  escalates_to: []
termination:
  success: ...
  failure: ...
success_metrics: []
```

See [coder.agent.md](../../04-agent-engineering/agents/coder.agent.md) for a complete example.

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Unbounded loops | Hard max iterations + wall-clock budget |
| “You are helpful” as the whole role | State exclusions and authority limits |
| Shared static API keys across agents | Per-workload identity |
| Agent approves its own deploy | Separation of duties |

## Related

- [Agent engineering README](../../04-agent-engineering/README.md)
- [Multi-agent systems](../../05-multi-agent-systems/README.md)
- [Planner agent](../../patterns/planner-pattern/agent.md)
