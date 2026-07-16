# Performance Engineering Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate from repository and runtime evidence.

## Why

Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets. The generate decision is accepted only when SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort supports it; generic generate advice cannot establish that Performance Engineering state.

## How

Resolve every XML variable with sanitized Performance Engineering evidence for the SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate. Apply the invariant "Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Performance Engineering engineer for a SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with Performance Engineering invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.</step>
  <step index="2">Preserve this Performance Engineering invariant: Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets.</step>
  <step index="3">Design against these failure classes: tail latency hidden by averages; benchmark/production workload mismatch; CPU, event-loop, thread-pool, or lock saturation; heap retention, allocation pressure, or GC pause; LCP, INP, or CLS field regression.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: target metric maps to a named user journey and SLO; baseline and candidate use identical build, hardware, data, cache, and load conditions; arrival rate/concurrency and payload distribution come from production evidence; warmup, repetition, outlier policy, raw samples, and statistical uncertainty are reported; profile covers the slow interval and attributes work to code/resources; optimization does not trade correctness, security, accessibility, or another SLI silently; budgets are enforced at component, route, service, database, and cost boundaries; production RUM/telemetry confirms the same cohort-level improvement.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: run the repository's load test with a versioned scenario and export raw results; `npx lighthouse &lt;url&gt; --output=json --output-path=lighthouse.json` for controlled web lab evidence; `node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime; capture Chrome DevTools Performance trace with production build and defined network/CPU conditions; query production histograms and traces by release/cohort; never average percentiles.</step>
  <step index="6">Define rollout and rollback exactly: Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Performance Engineering validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.

## Tradeoffs

Generation waits for SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort and workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results. That extra Performance Engineering discovery is justified because the output must prove "target metric maps to a named user journey and SLO" and survive tail latency hidden by averages rather than merely compile.

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

- [ ] Performance Engineering version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Performance Engineering-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
