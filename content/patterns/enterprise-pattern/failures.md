# Enterprise Pattern — Failures

> **Pattern:** Enterprise  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Enterprise pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Deny-by-default skipped | Incident via tool | Disable writes; write SoA; re-enable narrowly |
| Tenant assumption | Cross-talk in retrieval | Add isolation tests; fix pack roots |
| Eval optional | Regressions in prod answers | Make eval release-blocking |
| Paper NIST | Auditor pushback | Map evidence IDs; drop logo claims |

## Escalation from Enterprise failures

- Security-class impact during Enterprise → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Enterprise → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Enterprise containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Enterprise human gate “just this once” after a failure  
- Delete Enterprise evidence to hide a bad run  
- Replace Enterprise with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Enterprise failure recovery table and escalation paths expanded.
