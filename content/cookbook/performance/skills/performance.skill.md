---
name: performance
description: "Execute a repeatable Performance Engineering change or diagnosis for a SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Performance Engineering can change."
---

# Performance Engineering Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Performance Engineering change or diagnosis for a SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Performance Engineering can change. Do not activate for a name-only documentation edit.

## Why

Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets. The skill terminates only on Performance Engineering evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort and workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results.
2. **Select the boundary.** Name the changed SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover tail latency hidden by averages; benchmark/production workload mismatch; CPU, event-loop, thread-pool, or lock saturation; heap retention, allocation pressure, or GC pause; LCP, INP, or CLS field regression.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run; baseline/candidate confidence, effect size, noise controls, capacity saturation, and cost per operation.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. run the repository's load test with a versioned scenario and export raw results
2. `npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence
3. `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime
4. capture Chrome DevTools Performance trace with production build and defined network/CPU conditions
5. query production histograms and traces by release/cohort; never average percentiles

7. **Apply review gates.**

- [ ] target metric maps to a named user journey and SLO.
- [ ] baseline and candidate use identical build, hardware, data, cache, and load conditions.
- [ ] arrival rate/concurrency and payload distribution come from production evidence.
- [ ] warmup, repetition, outlier policy, raw samples, and statistical uncertainty are reported.
- [ ] profile covers the slow interval and attributes work to code/resources.
- [ ] optimization does not trade correctness, security, accessibility, or another SLI silently.
- [ ] budgets are enforced at component, route, service, database, and cost boundaries.
- [ ] production RUM/telemetry confirms the same cohort-level improvement.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

## Verification

The Performance Engineering evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort. For manual SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Performance Engineering telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Performance Engineering boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Performance Engineering workflow only when native validation, applicable review/deployment gates, and recovery signals for tail latency hidden by averages and benchmark/production workload mismatch pass. Otherwise record a named owner and the exact missing Performance Engineering evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

This skill fingerprints Performance Engineering through SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort before editing and retains CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run before recovery. The added work is warranted when tail latency hidden by averages could make Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
