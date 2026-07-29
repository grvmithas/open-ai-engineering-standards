# Hotfix Pattern — Problem

> **Pattern:** Hotfix  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

SEVs invite speculative coding and mass restarts: no IC, out-of-path edits, and evidence destroyed before RCA can start.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No IC | Multiple people mutate prod |
| Path explosion | Hotfix PR touches unrelated modules |
| Evidence wipe | Restarts before log capture |
| Customer data in chat | PII pasted into incident channels |

## Root cause

Incident adrenaline rewards visible action. Containment and evidence look passive even when they are the correct first moves.

## What breaks when this pattern is skipped

- Blast radius expands during “fix”
- RCA impossible after the fact
- Repeat SEVs from the same hole

## Non-goals of this pattern

- Not a feature delivery shortcut
- Not a full RCA (that follows containment)
- Not unscoped refactors during SEV

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Hotfix problem page expanded with skip-impact and operator symptoms.
