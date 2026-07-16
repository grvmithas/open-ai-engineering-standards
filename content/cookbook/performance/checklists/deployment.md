# Performance Engineering Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Performance Engineering SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate.

## Why

A syntactically valid Performance Engineering artifact can still fail because of tail latency hidden by averages, benchmark/production workload mismatch, CPU, event-loop, thread-pool, or lock saturation, heap retention, allocation pressure, or GC pause, LCP, INP, or CLS field regression. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from run the repository's load test with a versioned scenario and export raw results; `npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence; `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime; capture Chrome DevTools Performance trace with production build and defined network/CPU conditions; query production histograms and traces by release/cohort; never average percentiles. Stop promotion on any failed item.

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

Promotion waits for "release artifact is identical to the profiled candidate and source maps/symbols are retained" and "CI budgets pass for bundle, startup, query, allocation, throughput, and latency metrics relevant to the change". Those Performance Engineering target checks slow release but directly bound tail latency hidden by averages and make this rollback executable: Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

## Anti-patterns

- Optimizing a local microbenchmark without production distribution or profile evidence moves code while leaving the system bottleneck unchanged.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Performance governance standardizes metric definitions, benchmark hardware, raw-result retention, RUM privacy, SLO ownership, exception expiry, and capacity-review cadence.

## Official sources

- [Web Vitals](https://web.dev/articles/vitals)
- [Chrome performance](https://developer.chrome.com/docs/devtools/performance/)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [Google SRE monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)

## Checklist

- [ ] release artifact is identical to the profiled candidate and source maps/symbols are retained.
- [ ] CI budgets pass for bundle, startup, query, allocation, throughput, and latency metrics relevant to the change.
- [ ] capacity model includes peak, failure-mode headroom, autoscaling delay, and downstream quotas.
- [ ] canary compares histograms—not averaged percentiles—by release and workload cohort.
- [ ] RUM checks p75 Web Vitals by device, geography, route, and connection where applicable.
- [ ] saturation, queueing, retries, cache hit, GC, and cost per operation remain inside guardrails.
- [ ] automatic rollback uses user-impact plus error signals, not one noisy synthetic sample.
- [ ] post-rollout window covers cache warmup, autoscaling, periodic jobs, and peak traffic.
- [ ] Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Performance Engineering evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
