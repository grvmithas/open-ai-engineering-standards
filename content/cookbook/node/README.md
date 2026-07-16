# Node.js Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a HTTP handler, worker, stream pipeline, package, or process lifecycle using Node.js's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary. Generic software advice cannot verify that invariant because the decisive evidence lives in runtime and package-manager pin plus lockfile integrity; module mode, export map, TypeScript target, and startup command; event-loop delay, heap, CPU profile, active handles, and request trace.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- runtime and package-manager pin plus lockfile integrity
- module mode, export map, TypeScript target, and startup command
- event-loop delay, heap, CPU profile, active handles, and request trace
- timeout, retry, pool, body-size, and graceful-shutdown configuration

## Native verification

- `node --version` and the package manager's immutable install command
- `node --test` or the repository's exact test script
- `node --trace-warnings <entrypoint>` for warning provenance
- `node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`
- `npm audit --omit=dev` with lockfile and exploitability review

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

This cookbook requires deeper Node.js evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects HTTP handler, worker, stream pipeline, package, or process lifecycle state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
