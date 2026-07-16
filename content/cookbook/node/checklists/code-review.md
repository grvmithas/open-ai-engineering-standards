# Node.js Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Node.js HTTP handler, worker, stream pipeline, package, or process lifecycle.

## Why

Node.js correctness depends on source plus runtime and package-manager pin plus lockfile integrity; module mode, export map, TypeScript target, and startup command; event-loop delay, heap, CPU profile, active handles, and request trace. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `node --version` and the package manager's immutable install command; `node --test` or the repository's exact test script; `node --trace-warnings <entrypoint>` for warning provenance; `node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`; `npm audit --omit=dev` with lockfile and exploitability review. Findings must identify the violated Node.js invariant.

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

The Node.js review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

## Anti-patterns

- Unbounded `Promise.all` over user-controlled input converts one request into connection-pool and memory exhaustion.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Node service governance pins runtime and package-manager lines, reviews install scripts and native addons, retains SBOMs, and tests shutdown against the orchestrator grace period.

## Official sources

- [Node.js API](https://nodejs.org/docs/latest/api/)
- [Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
- [Node.js diagnostics](https://nodejs.org/en/learn/diagnostics)
- [OWASP Node.js security](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

## Checklist

- [ ] every promise is awaited, returned, or intentionally supervised.
- [ ] CPU-heavy or synchronous filesystem/crypto work is absent from request paths.
- [ ] AbortSignal and deadlines reach outbound HTTP, database, and stream operations.
- [ ] stream pipelines use backpressure-aware APIs and one error boundary.
- [ ] HTTP body, header, queue, pool, and concurrency sizes are bounded.
- [ ] errors preserve cause and classification without leaking secrets.
- [ ] process handlers stop admission, drain work, close resources, then exit.
- [ ] package exports and module mode work from a clean immutable install.
- [ ] Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Node.js evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
