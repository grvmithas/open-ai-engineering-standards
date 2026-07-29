# Reviewer Pattern — Failures

> **Pattern:** Reviewer  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Reviewer pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Invented citations | path:line does not open | Re-run with filesystem/GitHub read; drop unverified items |
| Approve on CI only | No severity pass | Block merge; run five-pass review |
| Severity inflation | All findings Critical | Recalibrate against checklist; keep Block list short |
| Scope blindness | Missed AuthZ file outside “main” hunk | Require planned-path coverage check |

## Escalation from Reviewer failures

- Security-class impact during Reviewer → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Reviewer → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Reviewer containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Reviewer human gate “just this once” after a failure  
- Delete Reviewer evidence to hide a bad run  
- Replace Reviewer with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Reviewer failure recovery table and escalation paths expanded.
