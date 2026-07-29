# Planner Pattern — Problem

> **Pattern:** Planner  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Multi-file or cross-boundary work handed straight to a coder agent yields token-local correctness and system-level failure: missed dependencies, invented contracts, and 2–3× rework.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Second architectural pass | More than ~30% of AI multi-file PRs need a redesign mid-flight |
| Surprise paths | PR touches files never listed in an approved plan |
| Interface invention | New API shapes or schema columns appear without human review |
| No revert story | Deployable change ships without a named rollback |

## Root cause

Next-token models optimize local coherence inside a context window. Ordering, blast radius, and contract stability are not enforced unless externalized as a reviewed plan.

## What breaks when this pattern is skipped

- Coder asks architectural questions mid-implementation
- Reviewer finds AuthZ or schema changes that were never planned
- Hotfix expands because the original change had no return path

## Non-goals of this pattern

- Not a product requirements substitute
- Not a dumping ground for implementation code
- Not required for single-file typos, pure config toggles, or docs-only edits

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Planner problem page expanded with skip-impact and operator symptoms.
