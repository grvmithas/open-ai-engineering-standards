# Architecture Pattern — Failures

> **Pattern:** Architecture  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Architecture pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| No ADR | Tribal topology | Write ADR before more coding |
| No rejects | Decision looks arbitrary | Add rejected alternatives with rationale |
| Skipped threats | Trust holes | Run security skill on boundaries |
| ADR as diary | No scenarios | Rewrite with QA scenarios |

## Escalation from Architecture failures

- Security-class impact during Architecture → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Architecture → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Architecture containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Architecture human gate “just this once” after a failure  
- Delete Architecture evidence to hide a bad run  
- Replace Architecture with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Architecture failure recovery table and escalation paths expanded.
