# Architecture Pattern — Problem

> **Pattern:** Architecture  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Topology and quality-attribute choices happen in chat, ADRs skip rejected alternatives, and trust boundaries appear only after implementation is expensive to unwind.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Architecture-by-chat | No durable ADR for consequential topology |
| One option only | No rejected alternative recorded |
| QA silence | Latency/availability/security scenarios unnamed |
| Late trust map | AuthZ boundaries discovered in review |

## Root cause

Design work feels slower than coding. Undocumented choices create irreversible cost that looks like “just implementation debt.”

## What breaks when this pattern is skipped

- Rework when non-functionals were never stated
- Security finds missing trust boundaries late
- Teams re-litigate the same topology quarterly

## Non-goals of this pattern

- Not an implementation plan (hand off to Planner)
- Not a vendor bake-off slide deck
- Not optional for multi-service or AuthZ-changing work

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Architecture problem page expanded with skip-impact and operator symptoms.
