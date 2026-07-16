# Debug Pattern — Enterprise Notes

> **Pattern:** Debug  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

Retain: symptom package, experiment log, root cause, fix SHA, regression test ID, verifier. Link from incident ticket and PR.

## Separation of duties / access

| Activity | Who |
|----------|-----|
| Read prod logs/traces | On-call / approved debugger |
| Mutate prod data | Incident commander approval |
| Merge fix | Reviewer ≠ sole debugger when High-risk |
| Close incident | IC after verification evidence |

## Blameless posture

Debug and RCA artifacts name systems and conditions, not people as moral failures. Accountability is owning preventive actions with due dates.

## Anti-claim

A completed debug report is **not** automatically a regulatory postmortem or legal hold document. Use your incident management system of record when those obligations exist.
