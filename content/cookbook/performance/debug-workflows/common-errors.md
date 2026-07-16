# Performance Engineering Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Performance Engineering failure classes without erasing the platform state needed to prove root cause.

## Why

Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `High p99 with normal average` | A tail cohort, queue, retry, or dependency dominates rare requests. | tail latency hidden by averages |
| 2 | `Benchmark improves but production does not` | Synthetic workload omits the production bottleneck or cache state. | benchmark/production workload mismatch |
| 3 | `CPU saturation` | Concurrency exceeds compute capacity or hot code consumes excessive cycles. | CPU, event-loop, thread-pool, or lock saturation |
| 4 | `Memory growth` | Objects, caches, listeners, or native allocations are retained. | heap retention, allocation pressure, or GC pause |
| 5 | `Core Web Vital regression` | A release changed critical rendering, interaction, or layout behavior. | LCP, INP, or CLS field regression |

### 1. `High p99 with normal average`

**Failure class:** tail latency hidden by averages.

**Preserve first:** SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort.

**Discriminate:** distributed traces and histograms. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** run the repository's load test with a versioned scenario and export raw results. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** A tail cohort, queue, retry, or dependency dominates rare requests.

**Correction:** Segment traces by route, dependency, region, and payload; remove the tail cause.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

### 2. `Benchmark improves but production does not`

**Failure class:** benchmark/production workload mismatch.

**Preserve first:** workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results.

**Discriminate:** profile comparison. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Synthetic workload omits the production bottleneck or cache state.

**Correction:** Rebuild the workload from production distributions and validate with telemetry.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

### 3. `CPU saturation`

**Failure class:** CPU, event-loop, thread-pool, or lock saturation.

**Preserve first:** CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run.

**Discriminate:** sampling profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Concurrency exceeds compute capacity or hot code consumes excessive cycles.

**Correction:** Profile on representative load, optimize the hot path, then cap concurrency.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

### 4. `Memory growth`

**Failure class:** heap retention, allocation pressure, or GC pause.

**Preserve first:** baseline/candidate confidence, effect size, noise controls, capacity saturation, and cost per operation.

**Discriminate:** heap profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** capture Chrome DevTools Performance trace with production build and defined network/CPU conditions. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Objects, caches, listeners, or native allocations are retained.

**Correction:** Compare heap snapshots by retaining path and bound cache ownership.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

### 5. `Core Web Vital regression`

**Failure class:** LCP, INP, or CLS field regression.

**Preserve first:** SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort.

**Discriminate:** CrUX/RUM and browser trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** query production histograms and traces by release/cohort; never average percentiles. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** A release changed critical rendering, interaction, or layout behavior.

**Correction:** Use field data to isolate template/device cohorts, then reproduce in lab.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes tail latency hidden by averages, benchmark/production workload mismatch, CPU, event-loop, thread-pool, or lock saturation, heap retention, allocation pressure, or GC pause, LCP, INP, or CLS field regression and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
