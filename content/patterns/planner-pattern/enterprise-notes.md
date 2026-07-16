# Planner Pattern — Enterprise Notes

> **Pattern:** Planner  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

The approved plan is the primary oversight artifact for AI-assisted implementation. Store it with the change record (PR / change ticket), versioned, with approver identity.

## Regulated environments

In financial services, healthcare, and similar regimes:

- Approver identity via SSO / change-management system, not free-text name only
- Retention aligned to the claim period and jurisdiction (not a fixed arbitrary day count)
- Material deviations require the same approval class as the original plan

## Scale

At 100+ engineers, planning quality predicts delivery velocity more than raw coding speed. Invest in plan templates, reviewer training, and hooks — not only in coder agents.

## Governance mapping

| Concern | Plan section that evidences it |
|---------|--------------------------------|
| Human oversight before AI coding | Approval footer |
| Change blast radius | File list + Mermaid diagram |
| Recoverability | Rollback plan |
| Security review trigger | Security considerations + risk flags |
| Separation of duties | Planner ≠ approver ≠ deployer where policy requires |

## Anti-claim

Passing internal plan review is **not** external certification, legal compliance, or a substitute for domain-regulated change boards where those boards already exist. Map the plan into those boards; do not replace them with a markdown file.
