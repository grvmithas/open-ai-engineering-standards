# Planner Pattern — Problem

> **Pattern:** Planner  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Complex tasks given directly to coding agents without an explicit plan produce outputs that are token-level correct but architecturally wrong: missed dependencies, inconsistent interfaces, unplanned schema changes, and 2–3× rework.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Rework rate | >30% of agent-generated multi-file changes need a second architectural pass |
| Surprise files | PR touches files not listed in any plan |
| Interface drift | Coder invents API shapes or table columns not reviewed by a human |
| Rollback vacuum | Change ships with no documented revert path |

## Root cause

Agents optimize next-token correctness inside a local context window. Holistic task correctness (ordering, contracts, blast radius) is not enforced unless it is externalized as a reviewed plan.

## Non-goals of this pattern

- Not a substitute for a product requirements document
- Not a place to dump implementation code
- Not required for single-file typos, config toggles, or docs-only edits

## Related failure modes

See [failures.md](./failures.md) for recovery when plans are too vague, too detailed, or rubber-stamped.
