# Root Cause Pattern — Problem

> **Pattern:** Root Cause  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

After containment, teams skip evidence-bound RCA: blame replaces timeline, “fixed” means volume dipped, and no regression detector is added.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Blame RCA | Names without causal chain |
| Volume ≠ fixed | Fingerprint quiet; defect remains |
| No follow-ups | RCA closed with zero owners |
| Lost chronology | Monitors edited mid-RCA |

## Root cause

Learning work competes with the next feature. Without a forced evidence bar, RCA becomes narrative therapy.

## What breaks when this pattern is skipped

- Repeat incidents with identical causes
- Auditors find no learning trail
- Fixes that never get a detector

## Non-goals of this pattern

- Not punishment
- Not optional documentation fluff
- Not automatic ticket closure via MCP summary

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Root Cause problem page expanded with skip-impact and operator symptoms.
