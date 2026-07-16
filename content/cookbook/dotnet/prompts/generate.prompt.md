# .NET Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice from repository and runtime evidence.

## Why

DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast. This prompt requires native .NET artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

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
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.</step>
  <step index="2">Preserve this .NET invariant: DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast.</step>
  <step index="3">Design against these failure classes: invalid DI lifetime or missing registration; concurrent or overlong DbContext use; query translation, N+1, or serialization cycle; request cancellation versus upstream timeout; thread-pool, connection-pool, or GC saturation.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: singleton services do not capture scoped dependencies; CancellationToken flows from endpoint through every asynchronous I/O call; one scoped DbContext handles one unit of work and is never used concurrently; EF projections select only required columns and generated SQL is inspected; request/response contracts are separate from tracked entities; options use typed binding and startup validation; middleware order preserves exception handling, forwarded headers, authentication, and authorization; ProblemDetails and logs disclose no secrets or internal stack details.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `dotnet --info`; `dotnet restore --locked-mode` when lock files are enabled; `dotnet build --no-restore -warnaserror`; `dotnet test --no-build`; `dotnet list package --vulnerable --include-transitive` and review applicability.</step>
  <step index="6">Define rollout and rollback exactly: Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
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

The prompt rejects fast code generation when .NET version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice boundary.

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

- 1.1.0 (2026-07-16): Rebuilt as a .NET-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
