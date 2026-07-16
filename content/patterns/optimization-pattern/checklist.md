# Optimization Pattern — Checklist

> **Pattern:** Optimization  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** Do not promote the flag to 100% until every item is checked or waived with a named owner and expiry.

## Intake

- [ ] Target metric and owner named
- [ ] Minimum useful effect size written
- [ ] Guardrails and abort criteria pre-declared (not renegotiated mid-canary)
- [ ] Workload ID frozen and checked in
- [ ] Kill-switch feature flag exists and is tested disableable

## Evidence

- [ ] Baseline includes warm-up, sample count, p50/p95/p99, and timestamp
- [ ] Dominant cost attributed (≥30% or explicit stop)
- [ ] Exactly one hypothesis in scope
- [ ] Candidate vs control under identical workload ID
- [ ] Confidence interval or noise band stated
- [ ] Correctness oracle ran with zero failures
- [ ] Unit cost measured end-to-end when cost is in scope
- [ ] Shifted bottleneck inspected after the change

## Canary & promotion

- [ ] Progressive stages defined (e.g. 1% → 5% → 25%)
- [ ] Abort watcher named and on-call aware
- [ ] No concurrent conflicting optimizations on the same path
- [ ] Human recorded KEEP/KILL/REVISE with date
- [ ] If KEEP: capacity headroom documented

## Aftercare

- [ ] Flag default updated only after soak window
- [ ] Dashboards/alerts updated for new saturation shape if needed
- [ ] Failed hypotheses recorded so the team does not retry blindly
