# .NET Review Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Review a .NET change using native configuration, failure, and operational evidence.

## Why

DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast. The review decision is accepted only when DI registrations, options binding/validation, middleware order, and endpoint metadata supports it; generic review advice cannot establish that .NET state.

## How

Resolve every XML variable with sanitized .NET evidence for the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice. Apply the invariant "DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal .NET engineer for a ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with .NET invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Reconstruct the exact version, target, changed resources/contracts, and rollback boundary from evidence.</step>
  <step index="2">Check every technology gate: singleton services do not capture scoped dependencies; CancellationToken flows from endpoint through every asynchronous I/O call; one scoped DbContext handles one unit of work and is never used concurrently; EF projections select only required columns and generated SQL is inspected; request/response contracts are separate from tracked entities; options use typed binding and startup validation; middleware order preserves exception handling, forwarded headers, authentication, and authorization; ProblemDetails and logs disclose no secrets or internal stack details.</step>
  <step index="3">Inspect these failure classes explicitly: invalid DI lifetime or missing registration; concurrent or overlong DbContext use; query translation, N+1, or serialization cycle; request cancellation versus upstream timeout; thread-pool, connection-pool, or GC saturation.</step>
  <step index="4">Require relevant native outputs from: `dotnet --info`; `dotnet restore --locked-mode` when lock files are enabled; `dotnet build --no-restore -warnaserror`; `dotnet test --no-build`; `dotnet list package --vulnerable --include-transitive` and review applicability.</step>
  <step index="5">Report only findings with file/resource location, violated invariant, production impact, and a deterministic verification.</step>
  <step index="6">Block release when rollback is not credible: Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.</step>
</instructions>
<output_format>
Return severity-ordered findings with location, native evidence, impact, required correction, and verification command. Then return version cautions, missing evidence, rollback assessment, and SHIP/BLOCK.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress .NET validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

.NET review correlates source with DI registrations, options binding/validation, middleware order, and endpoint metadata and EF Core generated SQL, query plan, change tracker, and pool metrics. The cost is a deeper review; the benefit is direct evidence for "singleton services do not capture scoped dependencies" and "CancellationToken flows from endpoint through every asynchronous I/O call" instead of generic style findings.

## Anti-patterns

- Registering DbContext or a service that captures it as singleton introduces cross-request concurrency and stale tracking.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

.NET governance pins SDK and runtime support lines, controls NuGet sources and package signatures, and treats dumps/traces as sensitive production records.

## Official sources

- [.NET documentation](https://learn.microsoft.com/dotnet/)
- [ASP.NET Core fundamentals](https://learn.microsoft.com/aspnet/core/fundamentals/)
- [EF Core](https://learn.microsoft.com/ef/core/)
- [Diagnostics tools](https://learn.microsoft.com/dotnet/core/diagnostics/)

## Checklist

- [ ] .NET version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a .NET-specific review prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
