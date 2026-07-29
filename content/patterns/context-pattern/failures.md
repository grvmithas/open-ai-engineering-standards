# Context Pattern — Failures

> **Pattern:** Context  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Context pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Unranked dump | Model cites noise | Rebuild pack with ranking + budget |
| Trust mix | Retrieval in system channel | Move to data channel; add trust labels |
| Stale ADR | Implementation follows retired topology | Pin ADR versions; drop superseded docs |
| Budget denial | Truncation deletes the only relevant file | Re-prioritize; split packs by phase |

## Escalation from Context failures

- Security-class impact during Context → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Context → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Context containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Context human gate “just this once” after a failure  
- Delete Context evidence to hide a bad run  
- Replace Context with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Context failure recovery table and escalation paths expanded.
