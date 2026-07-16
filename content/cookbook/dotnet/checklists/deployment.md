# .NET Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a .NET ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice.

## Why

A syntactically valid .NET artifact can still fail because of invalid DI lifetime or missing registration, concurrent or overlong DbContext use, query translation, N+1, or serialization cycle, request cancellation versus upstream timeout, thread-pool, connection-pool, or GC saturation. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `dotnet --info`; `dotnet restore --locked-mode` when lock files are enabled; `dotnet build --no-restore -warnaserror`; `dotnet test --no-build`; `dotnet list package --vulnerable --include-transitive` and review applicability. Stop promotion on any failed item.

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

The .NET deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] SDK used to publish matches `global.json` and runtime image compatibility.
- [ ] locked restore, build with warnings as errors, tests, and package vulnerability review pass.
- [ ] EF migration is scripted/idempotent and compatible with mixed application versions.
- [ ] Kestrel limits, thread pool, connection pool, and GC/container settings are load-tested.
- [ ] health checks distinguish process liveness, readiness, and degraded dependencies.
- [ ] dotnet counters, traces, logs, and exception telemetry are live before canary.
- [ ] canary compares GC pause, thread-pool queue, dependency duration, and errors.
- [ ] rollback verifies prior binaries can read schema and queued contracts.
- [ ] Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native .NET evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
