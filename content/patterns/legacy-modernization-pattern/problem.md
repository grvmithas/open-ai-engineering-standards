# Legacy Modernization Pattern — Problem

> **Pattern:** Legacy Modernization  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Teams announce a rewrite without characterization tests or a strangler boundary, then discover parity debt after the old system is already half-deleted.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Rewrite thrash | Behavior diffs found late by users |
| No seam owner | Traffic straddles old/new with no boundary map |
| Doc archaeology | Agents drown in unranked legacy manuals |
| Big-bang cut | Flag day replaces incremental slices |

## Root cause

Modernization is sold as greenfield speed. Without golden tests and a owned strangler seam, every slice invents behavior.

## What breaks when this pattern is skipped

- Parity incidents after each release
- Rewrite estimates explode mid-program
- Two systems diverge without an owner

## Non-goals of this pattern

- Not a pure data-center migration (use Migration)
- Not drive-by cleanup unrelated to the seam
- Not deleting legacy paths without characterization proof

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Legacy Modernization problem page expanded with skip-impact and operator symptoms.
