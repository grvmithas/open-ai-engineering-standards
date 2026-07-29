# Migration Pattern — Failures

> **Pattern:** Migration  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Migration pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Big-bang | Cutover fails; restore unclear | Insert verify window; assign rollback owner |
| Secret in git | Credential scanned | Rotate; move to secret store; rewrite history policy |
| Skipped parity | Silent data loss | Halt; run integrity checks; do not proceed |
| Unpinned job | Wrong migrator version | Pin digests; re-run from known good |

## Escalation from Migration failures

- Security-class impact during Migration → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Migration → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Migration containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Migration human gate “just this once” after a failure  
- Delete Migration evidence to hide a bad run  
- Replace Migration with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Migration failure recovery table and escalation paths expanded.
