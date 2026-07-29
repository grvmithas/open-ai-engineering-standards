# Root Cause Pattern — Failures

> **Pattern:** Root Cause  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Root Cause pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Narrative only | No citations | Rebuild timeline from GitHub/Sentry/Datadog |
| Closed cold | No owners | Reopen; assign due dates |
| Detector missing | Defect returns | Add failing test or alert before close |
| Mid-RCA monitor edit | Baseline lost | Restore pre-fix queries; continue |

## Escalation from Root Cause failures

- Security-class impact during Root Cause → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Root Cause → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Root Cause containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Root Cause human gate “just this once” after a failure  
- Delete Root Cause evidence to hide a bad run  
- Replace Root Cause with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Root Cause failure recovery table and escalation paths expanded.
