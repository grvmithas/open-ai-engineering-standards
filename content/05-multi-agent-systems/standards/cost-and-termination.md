# Cost, Budgets, and Termination

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Bound resource consumption and guarantee every multi-agent workflow reaches an explicit terminal outcome.

## Why

Per-call limits do not prevent fan-out, retries, recursive delegation, or unproductive debate from exhausting time and money.

## How

1. Allocate a workflow envelope for currency, tokens, tool calls, agents, concurrent branches, wall time, delegation depth, and retries.
2. Atomically reserve child budgets from the parent; unused amounts return, but children cannot mint budget.
3. Record actual and committed spend by task, tenant, model, tool, and agent.
4. Apply soft thresholds for adaptation and hard thresholds that reject new work and cancel safely.
5. Terminate on success criteria, deadline, cancellation, budget exhaustion, policy denial, repeated action/state digest, no measurable progress, or unrecoverable failure.
6. Propagate cancellation to descendants, revoke leases/tokens, compensate pending effects, checkpoint the terminal reason, and produce a partial-result manifest.
7. Alert on fan-out, retry, spend-rate, and zombie-work anomalies.

## Tradeoffs

Hard budgets can stop tasks that would succeed with one more attempt. Explicit escalation and risk-tiered overrides are safer than unlimited automatic extension.

## Anti-patterns

- Estimating cost only after completion.
- Resetting retry or token counters when work moves to another agent.
- Treating timeout as cancellation without stopping descendants and external jobs.

## Enterprise Considerations

Enforce tenant quotas and chargeback tags. Financial limits must fail closed, overrides require accountable approval, and metering records must be reconciled with provider invoices.

## Checklist

- [ ] Parent-to-child budget conservation is atomic.
- [ ] Hard limits cover fan-out, retries, tools, time, and spend.
- [ ] All terminal conditions and partial-result behavior are tested.
- [ ] Cancellation revokes descendants, leases, and credentials.
- [ ] Cost telemetry reconciles against provider billing.

## References

- [FinOps Framework: FinOps for AI](https://www.finops.org/framework/technology-categories/ai/)
- [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/)
- [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
