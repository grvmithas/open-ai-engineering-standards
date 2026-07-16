# Optimization Pattern — Enterprise Notes

> **Pattern:** Optimization  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Cost and capacity governance

Optimization claims that ignore reserved instances, provider quotas, and invoice lines are incomplete. Attach unit-cost evidence to the KEEP decision when FinOps owns the metric.

## Multi-tenant fairness

A global mean win that starves a noisy-neighbor tenant is a failed optimization. Include fairness/abort signals for shared platforms (queue depth per tenant, p99 per tier).

## Regulated latency paths

In trading, payments, clinical, or emergency workflows, latency guardrails may be contractual. Do not raise p99 ceilings via an optimization review alone — map to the existing change board when SLAs are contractual.

## Evidence retention

Store baseline artifact, candidate artifact, workload ID, flag name, and approver identity with the change record. Retention follows your change-management policy, not an invented day count in this pattern.

## Anti-claim

Internal KEEP approval is **not** a certification of energy efficiency, green IT, vendor SLA compliance, or regulatory performance attestation. It is an engineering decision under declared metrics.
