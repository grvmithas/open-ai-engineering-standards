# Migration Pattern — Subagents

> **Pattern:** Migration  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Consumer Inventory | Finds services, jobs, BI, partners using the surface | Start | Owned consumer table |
| Reconciler | Writes and runs count/semantic comparisons | Before cutover | Gate pass/fail + samples |
| Rollback Author | Specifies rollback per phase | During plan | Rollback steps + scripts refs |

## Consumer Inventory contract

- Include sync APIs, async consumers, batch jobs, reverse ETL, partner feeds
- Each row needs owner and “breakage mode”
- “Unknown” is not acceptable for High risk without explicit accept risk

## Reconciler contract

- At least one global count check and one semantic sample check
- Thresholds numeric (e.g. mismatch < 0.01%)
- Fail closed: no cutover on red gates

## Rollback Author contract

- Expand rollback: usually leave additive objects
- Dual rollback: stop dual-write; keep expand
- Cutover rollback: flip primary back
- Contract rollback: often impossible — mark PONR
