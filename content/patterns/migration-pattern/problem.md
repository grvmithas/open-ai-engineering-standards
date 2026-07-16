# Migration Pattern — Problem

> **Pattern:** Migration  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Schema, API, and data-store changes cause downtime or silent corruption when teams cut over in one step without consumer inventory, expand/contract phases, reconciliation, or phase-specific rollback.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Irreversible deploy | Old column/path removed in same change as cutover |
| Consumer surprise | Unknown reader breaks after deploy |
| Silent skew | Row counts or checksums diverge post-cutover |
| Endless dual-write | Compatibility layer still present quarters later |
| Backup unproven | Restore never rehearsed before point of no return |

## Root cause

Migrations are scheduled like app deploys. Compatibility is a multi-phase project: expand, dual/shadow, reconcile, cutover, contract — with quantitative gates and an explicit point of no return.

## Non-goals of this pattern

- Not a general feature planner (use planner-pattern for product work)
- Not legacy rewrite strategy (use legacy-modernization-pattern)
- Not CI database fixture resets
- Not required for unused additive expand-only columns with no cutover

## Related failure modes

See [failures.md](./failures.md).
