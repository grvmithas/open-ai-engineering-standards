# Optimization Pattern — Problem

> **Pattern:** Optimization  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Performance and cost work without a frozen baseline, attributed bottleneck, and measured effect size produces changes that look faster in isolation and fail (or regress) under production distributions — while burning sprint capacity.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No baseline | PR description has no before percentiles under a named workload |
| Wrong path | Flamegraph / trace shows <15% of critical-path time in the changed code |
| Tail silence | Only mean or “feels faster” reported; p95/p99 absent |
| No kill switch | Optimization ships without a feature flag or config revert |
| Oracle gap | Benchmark never asserts business/correctness invariants |

## Root cause

Engineers and agents optimize what is easy to measure locally (microbenchmarks, single-request traces) instead of the metric that defines success under representative load, including variance and shifted bottlenecks.

## Non-goals of this pattern

- Not a substitute for fixing functional bugs
- Not a license for speculative rewrites (“rewrite in Rust”) without attribution
- Not capacity planning theater — must produce numbers that capacity owners can use
- Not incident containment (hotfix first)

## Related failure modes

See [failures.md](./failures.md) for microbenchmark theater, mean-vs-tail traps, and correctness collateral.
