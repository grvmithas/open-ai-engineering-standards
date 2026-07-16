# Migration Pattern — Enterprise Notes

> **Pattern:** Migration  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

Retain: consumer inventory, phase PRs, recon outputs, soak metrics, cutover approver (SSO), PONR acknowledgment. Link to change ticket.

## Separation of duties

| Role | Allowed | Forbidden (High-risk) |
|------|---------|------------------------|
| Migration author | Design + implement phases | Sole cutover approval |
| Data owner | Approve recon semantics | Skip recon |
| SRE / release | Execute cutover window | Contract without soak file |

## Regulated data

Personal or financial data migrations need data-owner sign-off on reconciliation meaning — not only “row counts match.”

## Anti-claim

Passing internal gates is **not** an external audit opinion on data integrity. Map into existing change-advisory processes where required.
