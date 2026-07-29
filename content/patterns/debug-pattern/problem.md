# Debug Pattern — Problem

> **Pattern:** Debug  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Failures get shotgun patches: first plausible cause wins, intermittent bugs “clear” after restarts, and no regression proof exists for the pre-fix behavior.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Patch-first thrash | Multiple speculative fixes before a hypothesis list |
| Works on my machine | Fix never verified in the failing environment |
| Evidence destroyed | Restarts wipe logs needed for RCA |
| No regression net | Same defect returns within a sprint |

## Root cause

Debugging under pressure rewards action over isolation. Without ranked hypotheses and a failing-env gate, teams optimize for looking busy.

## What breaks when this pattern is skipped

- SEVs recur with the same fingerprint
- Hotfixes expand blast radius
- Observability exists but is never consulted before coding

## Non-goals of this pattern

- Not a feature delivery track
- Not an excuse to skip tests “until later”
- Not automatic production mutation via MCP

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Debug problem page expanded with skip-impact and operator symptoms.
