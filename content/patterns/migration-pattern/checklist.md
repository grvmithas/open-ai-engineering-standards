# Migration Pattern — Checklist

> **Pattern:** Migration  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** No cutover without green recon; no contract without soak evidence + human approval.

## Design

- [ ] Source and target states explicit
- [ ] Consumer inventory complete with owners
- [ ] Expand → dual/shadow → cutover → contract sequenced
- [ ] Rollback defined per reversible phase
- [ ] Point of no return named
- [ ] Observability signals and thresholds set

## Before cutover

- [ ] Expand deployed and verified
- [ ] Dual/shadow running
- [ ] Reconciliation queries green
- [ ] Backup/restore rehearsed if High risk
- [ ] Named cutover approver recorded

## After cutover

- [ ] Soak within SLO
- [ ] Contract only after soak evidence file
- [ ] Audit pack (gates + recon + approvers) stored with ticket
