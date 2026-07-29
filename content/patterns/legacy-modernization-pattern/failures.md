# Legacy Modernization Pattern — Failures

> **Pattern:** Legacy Modernization  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Legacy Modernization pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| No golden tests | Parity bugs in prod | Stop rewrite; build characterization first |
| Orphan seam | Dual-run confusion | Assign boundary owner; redraw map |
| Dump context | Agent reimplements myths | Rebuild legacy pack with ranking |
| Flag day | Rollback impossible | Reintroduce incremental slices |

## Escalation from Legacy Modernization failures

- Security-class impact during Legacy Modernization → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Legacy Modernization → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Legacy Modernization containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Legacy Modernization human gate “just this once” after a failure  
- Delete Legacy Modernization evidence to hide a bad run  
- Replace Legacy Modernization with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Legacy Modernization failure recovery table and escalation paths expanded.
