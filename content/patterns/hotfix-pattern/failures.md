# Hotfix Pattern — Failures

> **Pattern:** Hotfix  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Hotfix pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Coding first | Blast radius grows | Stop; evaluate rollback/flag; restart with IC |
| Restart storm | Evidence gone | Preserve signals; treat restart as last containment |
| Scope creep PR | Review impossible | Revert out-of-path; new PR with allowlist |
| No follow-up | Same SEV returns | Hand to Root Cause pattern |

## Escalation from Hotfix failures

- Security-class impact during Hotfix → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Hotfix → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Hotfix containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Hotfix human gate “just this once” after a failure  
- Delete Hotfix evidence to hide a bad run  
- Replace Hotfix with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Hotfix failure recovery table and escalation paths expanded.
