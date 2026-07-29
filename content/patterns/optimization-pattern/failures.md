# Optimization Pattern — Failures

> **Pattern:** Optimization  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Optimization pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Intuition patch | No before/after | Revert; capture baseline; retry |
| Oracle skipped | Silent wrong answers | Restore tests/evals; block ship |
| Moving dashboard | Baseline edited mid-run | Freeze queries; re-baseline |
| p50 theater | p99 regresses | Hold to contractual guardrail |

## Escalation from Optimization failures

- Security-class impact during Optimization → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Optimization → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Optimization containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Optimization human gate “just this once” after a failure  
- Delete Optimization evidence to hide a bad run  
- Replace Optimization with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Optimization failure recovery table and escalation paths expanded.
