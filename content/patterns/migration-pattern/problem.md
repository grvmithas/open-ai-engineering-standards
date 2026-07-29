# Migration Pattern — Problem

> **Pattern:** Migration  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Data or service moves ship as big-bang cuts: no dual-write/verify window, secrets in scripts, and irreversible drops without a rollback owner.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No return path | Rollback is “restore from backup someday” |
| Integrity surprises | Parity checks appear after cutover |
| Secret leakage | Connection strings in migration PRs |
| Digest drift | Unpinned images/jobs run “latest” |

## Root cause

Migrations look like engineering chores until they are irreversible. Speed bias deletes verify windows that are the only safe abort.

## What breaks when this pattern is skipped

- Cutover war rooms become default
- Data class incidents during move
- Follow-up migrations to undo the last migration

## Non-goals of this pattern

- Not a rewrite of product behavior (use Legacy Modernization)
- Not a license to skip security on “temporary” scripts
- Not MCP-driven DROP without a phase gate

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Migration problem page expanded with skip-impact and operator symptoms.
