# Performance Engineering Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate using Performance Engineering's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets. Generic software advice cannot verify that invariant because the decisive evidence lives in SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort; workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results; CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort
- workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results
- CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run
- baseline/candidate confidence, effect size, noise controls, capacity saturation, and cost per operation

## Native verification

- run the repository's load test with a versioned scenario and export raw results
- `npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence
- `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime
- capture Chrome DevTools Performance trace with production build and defined network/CPU conditions
- query production histograms and traces by release/cohort; never average percentiles

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

This cookbook requires deeper Performance Engineering evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
