# Planning Before High-Impact Execution

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Separate intent clarification and execution for complex, ambiguous, or high-impact work.

## Why

A plan reduces rework when choices are costly. It is not universally beneficial: forcing approval for trivial, reversible work adds latency and can fragment useful context.

## How

1. Classify the task by ambiguity, reversibility, blast radius, and decision authority.
2. For low-risk work, execute with normal validation.
3. For material decisions, return a concise plan containing scope, assumptions, steps, risks, verification, and rollback.
4. Obtain approval from the actual authority.
5. Execute only the approved scope and report deviations.

```xml
<output_format>
Return:
1. Scope and exclusions
2. Assumptions requiring confirmation
3. Ordered implementation steps
4. Risks and rollback
5. Verification gates
</output_format>
```

The plan is a visible work product, not private chain-of-thought.

## When

Require planning for destructive actions, cross-system migrations, architecture choices, ambiguous requirements, and expensive operations. Skip approval for routine, reversible changes when policy permits.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Early alignment | Additional round trip |
| Clear rollback | Plans can become stale |
| Bounded scope | Less opportunistic adaptation |

## Anti-Patterns

- “Plan before executing—always.”
- Requiring `<thinking>` disclosure.
- Approval from a model instead of an accountable person or policy engine.
- Treating a plan as proof that execution succeeded.

## Enterprise Considerations

Map approval requirements to change-management policy, segregation of duties, and risk tier. Preserve approved plan version, actor, execution evidence, and exceptions.

## Checklist

- [ ] Planning trigger is risk-based
- [ ] Plan states scope, risks, verification, and rollback
- [ ] Approval authority is explicit
- [ ] Execution deviations are recorded
- [ ] Completion is verified independently

## Changelog

- 1.0.0 (2026-07-16): Established risk-based planning without chain-of-thought exposure.
