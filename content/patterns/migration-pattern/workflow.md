# Migration Pattern — Workflow

> **Pattern:** Migration  
> **Component:** workflow.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## End-to-end flow

```mermaid
flowchart TD
    A[Input: source→target + consumers] --> B[Migration Architect Activated]
    B --> C[Inventory consumers + invariants]
    C --> D[Design expand phase]
    D --> E[Dual-write / shadow read]
    E --> F[Reconciliation gates]
    F --> G{Gates green?}
    G -->|No| E
    G -->|Yes| H[Cutover primary read/write]
    H --> I{Stable soak?}
    I -->|No| J[Rollback to prior primary]
    I -->|Yes| K[Contract: remove old path]
    K --> L[Migration complete + audit pack]
```

## Step procedure

| Step | Actor | Action | Exit criteria |
|------|-------|--------|---------------|
| 1 | Human | Freeze source/target + SLOs | Spec reviewable |
| 2 | Consumer Inventory | List all readers/writers | Inventory table complete |
| 3 | Migration Architect | Expand: additive schema/API | Expand deployable alone |
| 4 | Migration Architect | Dual-write / shadow read | Both paths observed |
| 5 | Reconciler | Run count + semantic checks | Gate thresholds met |
| 6 | Human | Approve cutover | Named + dated |
| 7 | Ops / release | Flip primary; soak | Error/latency within SLO |
| 8 | Migration Architect | Contract old path | Old path removed safely |

## Deviation rule

If recon fails or soak burns SLO, **roll back primary** to the previous path. Do not contract. Do not “push through.”

## Parallelism rule

Consumer teams may migrate readers independently only after expand is live. Writers dual-write until the cutover gate passes.
