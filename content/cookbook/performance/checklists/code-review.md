# Performance Engineering Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Performance Engineering SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate.

## Why

Performance Engineering correctness depends on source plus SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort; workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results; CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: run the repository's load test with a versioned scenario and export raw results; `npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence; `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime; capture Chrome DevTools Performance trace with production build and defined network/CPU conditions; query production histograms and traces by release/cohort; never average percentiles. Findings must identify the violated Performance Engineering invariant.

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

The Performance Engineering review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] target metric maps to a named user journey and SLO.
- [ ] baseline and candidate use identical build, hardware, data, cache, and load conditions.
- [ ] arrival rate/concurrency and payload distribution come from production evidence.
- [ ] warmup, repetition, outlier policy, raw samples, and statistical uncertainty are reported.
- [ ] profile covers the slow interval and attributes work to code/resources.
- [ ] optimization does not trade correctness, security, accessibility, or another SLI silently.
- [ ] budgets are enforced at component, route, service, database, and cost boundaries.
- [ ] production RUM/telemetry confirms the same cohort-level improvement.
- [ ] Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Performance Engineering evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
