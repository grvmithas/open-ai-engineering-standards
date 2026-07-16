# .NET Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable .NET change or diagnosis for a ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for .NET can change. Do not activate for a name-only documentation edit.

## Why

DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast. The skill terminates only on .NET evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture solution/project files, `global.json`, lock files, target frameworks, and package graph and DI registrations, options binding/validation, middleware order, and endpoint metadata.
2. **Select the boundary.** Name the changed ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover invalid DI lifetime or missing registration; concurrent or overlong DbContext use; query translation, N+1, or serialization cycle; request cancellation versus upstream timeout; thread-pool, connection-pool, or GC saturation.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: EF Core generated SQL, query plan, change tracker, and pool metrics; dotnet-counters, dotnet-trace, dotnet-dump, and distributed traces.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `dotnet --info`
2. `dotnet restore --locked-mode` when lock files are enabled
3. `dotnet build --no-restore -warnaserror`
4. `dotnet test --no-build`
5. `dotnet list package --vulnerable --include-transitive` and review applicability

7. **Apply review gates.**

- [ ] singleton services do not capture scoped dependencies.
- [ ] CancellationToken flows from endpoint through every asynchronous I/O call.
- [ ] one scoped DbContext handles one unit of work and is never used concurrently.
- [ ] EF projections select only required columns and generated SQL is inspected.
- [ ] request/response contracts are separate from tracked entities.
- [ ] options use typed binding and startup validation.
- [ ] middleware order preserves exception handling, forwarded headers, authentication, and authorization.
- [ ] ProblemDetails and logs disclose no secrets or internal stack details.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

## Verification

The .NET evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain solution/project files, `global.json`, lock files, target frameworks, and package graph. For manual ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better .NET telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the .NET boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the .NET workflow only when native validation, applicable review/deployment gates, and recovery signals for invalid DI lifetime or missing registration and concurrent or overlong DbContext use pass. Otherwise record a named owner and the exact missing .NET evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

This skill fingerprints .NET through solution/project files, `global.json`, lock files, target frameworks, and package graph before editing and retains EF Core generated SQL, query plan, change tracker, and pool metrics before recovery. The added work is warranted when invalid DI lifetime or missing registration could make Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
