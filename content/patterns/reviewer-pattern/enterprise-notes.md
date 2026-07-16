# Reviewer Pattern — Enterprise Notes

> **Pattern:** Reviewer  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

Store the review report with the change record: verdict, findings IDs, fix verification, reviewer identity, timestamps. Link it from the PR. Retain per your change-management policy.

## Separation of duties

| Role | Allowed | Forbidden on High-risk |
|------|---------|------------------------|
| Author | Push fixes | Final Approve |
| Reviewer | Findings + verdict | Silent merge without report |
| Deployer / release | Promote after Approve | Override Block without incident commander |

For regulated changes, final Approve must come from SSO-identified humans, not free-text names alone.

## Scale

At high PR volume, invest in severity calibration and risk-based review depth — not in requiring every nit on every PR. Route public/PII/payment/AI changes to security-capable reviewers.

## Governance mapping

| Concern | Review artifact that evidences it |
|---------|-----------------------------------|
| Independent challenge | Reviewer identity ≠ author |
| Security oversight | Pass 2 findings or documented N/A |
| Test accountability | AC→test map |
| Fix closure | Previous findings verification table |

## Anti-claim

A completed code review is **not** a penetration test, SOC2 control attestation, or legal compliance certification. Map High findings into your existing vulnerability and change processes; do not replace those processes with a markdown report.
