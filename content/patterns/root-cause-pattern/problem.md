# Root Cause Pattern — Problem

> **Pattern:** Root Cause  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

After incidents, teams document symptoms and triggers, scatter “root causes,” assign ownerless actions, or blame individuals. The systemic condition that made the failure consequential remains, so the incident class recurs.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Recurrence | Same failure class within two quarters |
| Action rot | >50% RCA actions open past due without escalation |
| Vague actions | Items like “improve monitoring” with no alert definition |
| Multi-root | Document claims >1 root cause |
| Blame | Named individuals as the moral of the story |

## Root cause

Postmortems are treated as narrative closure instead of a **commitment device** that changes detection, prevention, and recovery systems — with one systemic root cause and owned, dated work.

## Non-goals of this pattern

- Not live incident containment ([hotfix-pattern](../hotfix-pattern/README.md))
- Not HR/performance management
- Not a substitute for security forensics when a breach requires that track
- Not endless analysis without publishing actions

## Related failure modes

See [failures.md](./failures.md). Aligns with anti-patterns in the SDLC root-cause-analysis prompt (vague monitoring, multi-root, missing owners).
