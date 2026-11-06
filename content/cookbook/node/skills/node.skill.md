---
name: node
description: "Execute a repeatable Node.js change or diagnosis for a HTTP handler, worker, stream pipeline, package, or process lifecycle, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Node.js can change."
---

# Node.js Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Node.js change or diagnosis for a HTTP handler, worker, stream pipeline, package, or process lifecycle, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Node.js can change. Do not activate for a name-only documentation edit.

## Why

The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary. The skill terminates only on Node.js evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture runtime and package-manager pin plus lockfile integrity and module mode, export map, TypeScript target, and startup command.
2. **Select the boundary.** Name the changed HTTP handler, worker, stream pipeline, package, or process lifecycle, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover unhandled promise rejection or uncaught exception; event-loop blocking and CPU saturation; listener, handle, or heap retention; socket reset, timeout, or pool starvation; partial shutdown with in-flight work.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: event-loop delay, heap, CPU profile, active handles, and request trace; timeout, retry, pool, body-size, and graceful-shutdown configuration.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `node --version` and the package manager's immutable install command
2. `node --test` or the repository's exact test script
3. `node --trace-warnings <entrypoint>` for warning provenance
4. `node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`
5. `npm audit --omit=dev` with lockfile and exploitability review

7. **Apply review gates.**

- [ ] every promise is awaited, returned, or intentionally supervised.
- [ ] CPU-heavy or synchronous filesystem/crypto work is absent from request paths.
- [ ] AbortSignal and deadlines reach outbound HTTP, database, and stream operations.
- [ ] stream pipelines use backpressure-aware APIs and one error boundary.
- [ ] HTTP body, header, queue, pool, and concurrency sizes are bounded.
- [ ] errors preserve cause and classification without leaking secrets.
- [ ] process handlers stop admission, drain work, close resources, then exit.
- [ ] package exports and module mode work from a clean immutable install.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

## Verification

The Node.js evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain runtime and package-manager pin plus lockfile integrity. For manual HTTP handler, worker, stream pipeline, package, or process lifecycle checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Node.js telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Node.js boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Node.js workflow only when native validation, applicable review/deployment gates, and recovery signals for unhandled promise rejection or uncaught exception and event-loop blocking and CPU saturation pass. Otherwise record a named owner and the exact missing Node.js evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

This skill fingerprints Node.js through runtime and package-manager pin plus lockfile integrity before editing and retains event-loop delay, heap, CPU profile, active handles, and request trace before recovery. The added work is warranted when unhandled promise rejection or uncaught exception could make Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

## Anti-patterns

- Unbounded `Promise.all` over user-controlled input converts one request into connection-pool and memory exhaustion.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Node service governance pins runtime and package-manager lines, reviews install scripts and native addons, retains SBOMs, and tests shutdown against the orchestrator grace period.

## Official sources

- [Node.js API](https://nodejs.org/docs/latest/api/)
- [Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
- [Node.js diagnostics](https://nodejs.org/en/learn/diagnostics/user-journey)
- [OWASP Node.js security](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

## Checklist

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
