# .NET Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice using .NET's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast. Generic software advice cannot verify that invariant because the decisive evidence lives in solution/project files, `global.json`, lock files, target frameworks, and package graph; DI registrations, options binding/validation, middleware order, and endpoint metadata; EF Core generated SQL, query plan, change tracker, and pool metrics.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- solution/project files, `global.json`, lock files, target frameworks, and package graph
- DI registrations, options binding/validation, middleware order, and endpoint metadata
- EF Core generated SQL, query plan, change tracker, and pool metrics
- dotnet-counters, dotnet-trace, dotnet-dump, and distributed traces

## Native verification

- `dotnet --info`
- `dotnet restore --locked-mode` when lock files are enabled
- `dotnet build --no-restore -warnaserror`
- `dotnet test --no-build`
- `dotnet list package --vulnerable --include-transitive` and review applicability

## Version-aware caution

Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.

## Tradeoffs

This cookbook requires deeper .NET evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
