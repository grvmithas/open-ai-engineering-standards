# Architecture Pattern — Problem

> **Pattern:** Architecture  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Teams and agents commit to topologies without recording alternatives, evaluating quality attributes, or walking failure and trust boundaries. The “architecture” is a diagram that cannot guide implementation or survive review.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No ADR | Major new boundary with only a slide deck |
| Single option | Decision names a tool without rejected alternatives |
| Surprise tenancy bugs | Cross-tenant data access after launch |
| Irreversible coupling | Shared DB across “services” discovered too late |
| Rubber-stamp review | Approve with no conditions and no challenged assumptions |

## Root cause

Architecture work is treated as drawing boxes, not as deciding under forces. Without forced alternatives, QA scenarios, and independent challenge, agents optimize for familiarity and speed.

## Non-goals of this pattern

- Not detailed implementation planning (planner-pattern)
- Not code review of a PR (reviewer-pattern)
- Not library bike-shedding with identical boundaries
- Not a substitute for threat modeling workshops on Critical systems — it triggers them

## Related failure modes

See [failures.md](./failures.md).
