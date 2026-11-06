---
name: node
description: "Node procedure with verification and rollback evidence. Use when a Node.js service, stream, worker, package, or event-loop behavior changes."
---

# Node Skill

> **Skill ID:** `node`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a Node.js service, stream, worker, package, or event-loop behavior changes.

## Why
An API or worker contract, bounded concurrency design, lifecycle handling, diagnostics, and Node-version test evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A Node.js service, stream, worker, package, or event-loop behavior changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An API or worker contract
- bounded concurrency design
- lifecycle handling
- diagnostics
- Node-version test evidence.

## Procedure
1. Read package engines, module mode, lockfile, and runtime flags; preserve ESM or CommonJS conventions.
2. Design input validation, abort/timeout propagation, backpressure, concurrency limits, and error ownership.
3. Implement structured errors and graceful startup/shutdown for sockets, pools, workers, and signals.
4. Test event-loop edge cases, stream failures, cancellation, unhandled rejection policy, and resource cleanup.
5. Run the pinned Node test, lint, type, package, and diagnostic commands; inspect handles for leaks.

## Verification
Verify no open-handle leak, unbounded Promise fan-out, swallowed stream error, or incompatible package export.

## Unhappy Paths and Recovery
If the event loop stalls, collect delay and CPU profiles. If a stream corrupts under retry, make replay/idempotency explicit. Stop on unsupported runtime versions.

## Concrete Example
Implement a CSV ingestion stream with pipeline backpressure, AbortSignal timeout, bounded writes, rejected-row reporting, and shutdown tests.

## Do Not Use This Skill When
Do not use for browser JavaScript or runtime-neutral TypeScript design.

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
- [Node.js API Documentation](https://nodejs.org/api/)
- [Node.js Diagnostics](https://nodejs.org/en/learn/diagnostics)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
