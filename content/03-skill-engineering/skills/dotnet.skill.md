---
name: dotnet
description: ".NET procedure with verification and rollback evidence. Use when a .NET API, worker, library, EF Core model, or asynchronous workflow changes."
---

# .NET Skill

> **Skill ID:** `dotnet`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a .NET API, worker, library, EF Core model, or asynchronous workflow changes.

## Why
A nullable-safe contract, dependency lifetime map, cancellation behavior, tests, and publish output is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A .NET API, worker, library, EF Core model, or asynchronous workflow changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A nullable-safe contract
- dependency lifetime map
- cancellation behavior
- tests
- publish output.

## Procedure
1. Inspect target frameworks, SDK pinning, nullable settings, analyzers, package lock policy, and hosting model.
2. Define records/interfaces and validation; pass CancellationToken through I/O boundaries and avoid sync-over-async.
3. Choose DI lifetimes deliberately; dispose owned resources and keep scoped dependencies out of singletons.
4. Test model binding, authorization, EF translation/transactions, cancellation, and hosted-service shutdown.
5. Run dotnet restore with lock policy, build, test, format/analyzers, and publish for the target runtime.

## Verification
Verify nullable warnings, analyzer errors, async deadlocks, DI captive dependencies, query client evaluation, and publish trimming warnings are resolved.

## Unhappy Paths and Recovery
If EF cannot translate a query, rewrite and inspect SQL rather than forcing client evaluation. If cancellation is lost, trace token flow from transport to storage.

## Concrete Example
Build a background processor using Channel with bounded capacity, scoped handlers, shutdown cancellation, retry classification, and WebApplicationFactory tests.

## Do Not Use This Skill When
Do not use for unmanaged Windows internals or language-neutral cloud architecture.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [.NET Architecture Guides](https://learn.microsoft.com/dotnet/architecture/)
- [ASP.NET Core Fundamentals](https://learn.microsoft.com/aspnet/core/fundamentals/)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
