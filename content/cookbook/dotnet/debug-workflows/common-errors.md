# .NET Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent .NET failure classes without erasing the platform state needed to prove root cause.

## Why

DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Cannot consume scoped service from singleton` | Dependency injection lifetimes are incompatible. | invalid DI lifetime or missing registration |
| 2 | `A second operation was started on this context` | Concurrent work shares one DbContext. | concurrent or overlong DbContext use |
| 3 | `Possible object cycle detected` | API serialization traverses cyclic entity graphs. | query translation, N+1, or serialization cycle |
| 4 | `TaskCanceledException` | Request cancellation and upstream timeout are conflated. | request cancellation versus upstream timeout |
| 5 | `Configuration value is null` | Options were not bound or validated. | thread-pool, connection-pool, or GC saturation |

### 1. `Cannot consume scoped service from singleton`

**Failure class:** invalid DI lifetime or missing registration.

**Preserve first:** solution/project files, `global.json`, lock files, target frameworks, and package graph.

**Discriminate:** DI validation. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For invalid DI lifetime or missing registration, correlate that observation to the exact .NET target, revision, request/job, and UTC interval; compare solution/project files, `global.json`, lock files, target frameworks, and package graph with one healthy peer or baseline.

**Native action:** `dotnet --info`. Start in the safest .NET read-only or dry-run mode available. Before changing the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, name which of invalid DI lifetime or missing registration and concurrent or overlong DbContext use the action distinguishes.

**Root-cause direction:** Dependency injection lifetimes are incompatible.

**Correction:** Create an explicit scope per operation or correct the consumer lifetime.

**Recovery proof:** Re-run `Cannot consume scoped service from singleton` reproduction, verify the invalid DI lifetime or missing registration signal cleared in DI validation. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Create an explicit scope per operation or correct the consumer lifetime. restored the intended .NET behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

### 2. `A second operation was started on this context`

**Failure class:** concurrent or overlong DbContext use.

**Preserve first:** DI registrations, options binding/validation, middleware order, and endpoint metadata.

**Discriminate:** EF Core logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For concurrent or overlong DbContext use, correlate that observation to the exact .NET target, revision, request/job, and UTC interval; compare DI registrations, options binding/validation, middleware order, and endpoint metadata with one healthy peer or baseline.

**Native action:** `dotnet restore --locked-mode` when lock files are enabled. Start in the safest .NET read-only or dry-run mode available. Before changing the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, name which of concurrent or overlong DbContext use and query translation, N+1, or serialization cycle the action distinguishes.

**Root-cause direction:** Concurrent work shares one DbContext.

**Correction:** Await each operation or create independent scopes.

**Recovery proof:** Re-run `A second operation was started on this context` reproduction, verify the concurrent or overlong DbContext use signal cleared in EF Core logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Await each operation or create independent scopes. restored the intended .NET behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

### 3. `Possible object cycle detected`

**Failure class:** query translation, N+1, or serialization cycle.

**Preserve first:** EF Core generated SQL, query plan, change tracker, and pool metrics.

**Discriminate:** ASP.NET Core logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For query translation, N+1, or serialization cycle, correlate that observation to the exact .NET target, revision, request/job, and UTC interval; compare EF Core generated SQL, query plan, change tracker, and pool metrics with one healthy peer or baseline.

**Native action:** `dotnet build --no-restore -warnaserror`. Start in the safest .NET read-only or dry-run mode available. Before changing the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, name which of query translation, N+1, or serialization cycle and request cancellation versus upstream timeout the action distinguishes.

**Root-cause direction:** API serialization traverses cyclic entity graphs.

**Correction:** Map entities to bounded response DTOs.

**Recovery proof:** Re-run `Possible object cycle detected` reproduction, verify the query translation, N+1, or serialization cycle signal cleared in ASP.NET Core logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Map entities to bounded response DTOs. restored the intended .NET behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

### 4. `TaskCanceledException`

**Failure class:** request cancellation versus upstream timeout.

**Preserve first:** dotnet-counters, dotnet-trace, dotnet-dump, and distributed traces.

**Discriminate:** distributed trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For request cancellation versus upstream timeout, correlate that observation to the exact .NET target, revision, request/job, and UTC interval; compare dotnet-counters, dotnet-trace, dotnet-dump, and distributed traces with one healthy peer or baseline.

**Native action:** `dotnet test --no-build`. Start in the safest .NET read-only or dry-run mode available. Before changing the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, name which of request cancellation versus upstream timeout and thread-pool, connection-pool, or GC saturation the action distinguishes.

**Root-cause direction:** Request cancellation and upstream timeout are conflated.

**Correction:** Inspect the caller token and classify timeout separately.

**Recovery proof:** Re-run `TaskCanceledException` reproduction, verify the request cancellation versus upstream timeout signal cleared in distributed trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Inspect the caller token and classify timeout separately. restored the intended .NET behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

### 5. `Configuration value is null`

**Failure class:** thread-pool, connection-pool, or GC saturation.

**Preserve first:** solution/project files, `global.json`, lock files, target frameworks, and package graph.

**Discriminate:** startup logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For thread-pool, connection-pool, or GC saturation, correlate that observation to the exact .NET target, revision, request/job, and UTC interval; compare solution/project files, `global.json`, lock files, target frameworks, and package graph with one healthy peer or baseline.

**Native action:** `dotnet list package --vulnerable --include-transitive` and review applicability. Start in the safest .NET read-only or dry-run mode available. Before changing the ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, name which of thread-pool, connection-pool, or GC saturation and invalid DI lifetime or missing registration the action distinguishes.

**Root-cause direction:** Options were not bound or validated.

**Correction:** Bind one options object and ValidateOnStart.

**Recovery proof:** Re-run `Configuration value is null` reproduction, verify the thread-pool, connection-pool, or GC saturation signal cleared in startup logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Bind one options object and ValidateOnStart. restored the intended .NET behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes invalid DI lifetime or missing registration, concurrent or overlong DbContext use, query translation, N+1, or serialization cycle, request cancellation versus upstream timeout, thread-pool, connection-pool, or GC saturation and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
