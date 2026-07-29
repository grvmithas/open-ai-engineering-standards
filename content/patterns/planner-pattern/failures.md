# Planner Pattern — Failures

> **Pattern:** Planner  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Planner pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Plan too vague | Coder re-asks topology mid-PR | Return to planner; force file/owner/verify/rollback rows |
| Plan too code-like | Plan contains full function bodies | Strip to interfaces and sequences; re-approve |
| Rubber-stamp approval | Approver cannot restate the plan | Invalidate approval; require teach-back |
| Scope creep | Diff exceeds planned paths | Freeze PR; replan delta; re-approve |

## Escalation from Planner failures

- Security-class impact during Planner → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Planner → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Planner containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Planner human gate “just this once” after a failure  
- Delete Planner evidence to hide a bad run  
- Replace Planner with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Planner failure recovery table and escalation paths expanded.
