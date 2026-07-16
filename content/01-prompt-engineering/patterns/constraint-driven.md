# Constraint-Driven Prompting

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Express measurable task boundaries while assigning enforceable guarantees to code.

## Why

Constraints reduce ambiguity, but prompt text remains probabilistic. A production constraint must have an owner, verification method, and failure response.

## How

```xml
<constraints>
- Return one JSON object matching schema `TicketDecisionV2`.
- Cite only source IDs present in <evidence>.
- Use `needs_review` when evidence does not support a decision.
</constraints>
```

1. Convert acceptance criteria into observable properties.
2. Separate prompt guidance from hard system controls.
3. Remove redundant or conflicting constraints.
4. Validate schema, citations, bounds, and permissions after generation.
5. Reject or route invalid results; do not silently repair security-critical fields.

## When

Use for structured extraction, classification, bounded generation, and tool proposals.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Clear acceptance criteria | More validators |
| Easier regression testing | Overconstraint can lower recall |
| Predictable recovery | Some failures require review |

## Anti-Patterns

- Arbitrary “at least three” or “no more than five” constraint rules.
- Natural-language constraints with no validator.
- Prompt-only permissions or spend limits.
- Contradictory MUST statements.

## Enterprise Considerations

Trace constraints to policy controls and evidence. Version schema changes, define backward compatibility, and make rejection rates observable by tenant and model version.

## Checklist

- [ ] Every constraint is observable
- [ ] Security and authorization constraints are enforced in code
- [ ] Conflicts and precedence are documented
- [ ] Failure handling is explicit
- [ ] Constraint pass rates are evaluated

## Changelog

- 1.0.0 (2026-07-16): Initial measurable constraint standard.
