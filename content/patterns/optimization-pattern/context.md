# Optimization Pattern — Context

> **Pattern:** Optimization  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Target metric named (e.g. checkout `p99_latency_ms`, `cost_per_1k_requests`)
- [ ] Minimum useful effect size declared (e.g. ≥15% p99 reduction or ≥20% unit-cost cut)
- [ ] Guardrails listed (error rate, p99 ceiling, CPU/mem saturation, neighbor fairness)
- [ ] Workload fixture frozen (RPS mix, concurrency, payload distribution, region)
- [ ] Correctness oracle defined and runnable in CI or bench harness
- [ ] Feature flag / config key exists to disable the optimization in <5 minutes
- [ ] Human owner available for canary go/abort

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- SLO or error-budget burn attributed to latency/throughput/cost
- Profiling shows a dominant resource (≥30% of critical path or spend)
- Growth model shows capacity cliff within planning horizon
- Provider/token unit cost exceeds budget with a hypothesized mechanism

## Do not apply when

- No metric owner and no success threshold (“make checkout faster”)
- Active customer-harming incident — contain via [hotfix-pattern](../hotfix-pattern/README.md)
- Change is purely correctness (wrong results) — fix, then re-measure
- Theoretical maximum gain of the hot path cannot meet the minimum useful effect
- Environment cannot run a representative workload (no staging parity and no safe canary)

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| SLO / budget | Service catalog / FinOps | Numeric threshold + window |
| Baseline report | Bench harness | Warm-up + n≥30 + percentiles |
| Profiles / traces | Continuous profiler / APM | End-to-end critical path |
| Workload definition | Load-test repo | Versioned, checked in |
| Oracle | Test suite / golden set | Fail-closed on mismatch |
| Flag name | Flag service | Kill-switch documented |

## Authority boundary

The optimization agent **proposes one change and evaluates evidence**. It does not promote to 100% traffic. Named human owns canary abort and promotion. Coding agents implement only the hypothesized change behind the flag.
