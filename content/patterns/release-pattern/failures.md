# Release Pattern — Failures

> **Pattern:** Release  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Release pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Big-bang | All traffic bad | Restore progressive canary; name abort owner |
| Digest mystery | Cannot reproduce | Pin and record digests before next promote |
| Eval skipped | Quality regression | Block candidates on gate failure |
| Status MCP as truth | False “success” | Require human promote decision |

## Escalation from Release failures

- Security-class impact during Release → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Release → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Release containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Release human gate “just this once” after a failure  
- Delete Release evidence to hide a bad run  
- Replace Release with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Release failure recovery table and escalation paths expanded.
