# .NET Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a .NET ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice.

## Why

.NET correctness depends on source plus solution/project files, `global.json`, lock files, target frameworks, and package graph; DI registrations, options binding/validation, middleware order, and endpoint metadata; EF Core generated SQL, query plan, change tracker, and pool metrics. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `dotnet --info`; `dotnet restore --locked-mode` when lock files are enabled; `dotnet build --no-restore -warnaserror`; `dotnet test --no-build`; `dotnet list package --vulnerable --include-transitive` and review applicability. Findings must identify the violated .NET invariant.

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

Review must prove "singleton services do not capture scoped dependencies" using solution/project files, `global.json`, lock files, target frameworks, and package graph. That .NET evidence costs more than diff inspection but exposes invalid DI lifetime or missing registration before merge.

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

- [ ] singleton services do not capture scoped dependencies.
- [ ] CancellationToken flows from endpoint through every asynchronous I/O call.
- [ ] one scoped DbContext handles one unit of work and is never used concurrently.
- [ ] EF projections select only required columns and generated SQL is inspected.
- [ ] request/response contracts are separate from tracked entities.
- [ ] options use typed binding and startup validation.
- [ ] middleware order preserves exception handling, forwarded headers, authentication, and authorization.
- [ ] ProblemDetails and logs disclose no secrets or internal stack details.
- [ ] Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native .NET evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
