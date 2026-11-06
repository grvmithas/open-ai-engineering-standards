---
name: nextjs
description: "Next.js procedure with verification and rollback evidence. Use when a Next.js route, rendering boundary, cache policy, middleware, server action, or deployment behavior changes."
---

# Next.js Skill

> **Skill ID:** `nextjs`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a Next.js route, rendering boundary, cache policy, middleware, server action, or deployment behavior changes.

## Why
A version-pinned route design, server/client boundary map, cache and invalidation contract, build output, and route tests is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A Next.js route, rendering boundary, cache policy, middleware, server action, or deployment behavior changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A version-pinned route design
- server/client boundary map
- cache and invalidation contract
- build output
- route tests.

## Procedure
1. Read the repository-installed Next.js documentation and package version before selecting an API.
2. Classify each route as static, dynamic, streamed, or client-interactive and document runtime constraints.
3. Place data access and secrets on the server; minimize client boundaries and serialized props.
4. Define cache keys, revalidation, tags, dynamic triggers, middleware matchers, and error/not-found behavior.
5. Run route tests, type/lint checks, production build, and inspect route/build diagnostics.

## Verification
The installed-version build must pass; verify caching with repeated requests and invalidation; test redirects, errors, and authorization at the actual route boundary.

## Unhappy Paths and Recovery
When docs conflict with memory, installed docs win. For dynamic opt-outs, identify the exact API causing them. Do not suppress hydration or build errors to pass.

## Concrete Example
Add a product route that streams inventory, caches catalog data by tag, keeps pricing dynamic, and verifies tag invalidation in integration tests.

## Do Not Use This Skill When
Do not use without checking the installed Next.js version, or for generic React-only component work.

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
- [Next.js Installed Documentation](https://nextjs.org/docs)
- [Next.js Data Fetching and Caching](https://nextjs.org/docs/app/building-your-application/data-fetching)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
