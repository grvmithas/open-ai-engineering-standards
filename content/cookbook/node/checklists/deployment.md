# Node.js Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Node.js HTTP handler, worker, stream pipeline, package, or process lifecycle.

## Why

A syntactically valid Node.js artifact can still fail because of unhandled promise rejection or uncaught exception, event-loop blocking and CPU saturation, listener, handle, or heap retention, socket reset, timeout, or pool starvation, partial shutdown with in-flight work. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `node --version` and the package manager's immutable install command; `node --test` or the repository's exact test script; `node --trace-warnings <entrypoint>` for warning provenance; `node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`; `npm audit --omit=dev` with lockfile and exploitability review. Stop promotion on any failed item.

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

Promotion waits for "runtime image and `engines.node` agree on the exact major line" and "lockfile install succeeds without lifecycle surprises and production dependency audit is reviewed". Those Node.js target checks slow release but directly bound unhandled promise rejection or uncaught exception and make this rollback executable: Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

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

- [ ] runtime image and `engines.node` agree on the exact major line.
- [ ] lockfile install succeeds without lifecycle surprises and production dependency audit is reviewed.
- [ ] health endpoint distinguishes liveness from dependency readiness.
- [ ] SIGTERM test proves admission stops and in-flight requests drain before grace expiry.
- [ ] event-loop delay, heap, active handles, errors, and saturation have dashboards.
- [ ] load test holds queue and tail latency inside SLO under configured limits.
- [ ] canary compares socket resets, unhandled errors, memory, and event-loop delay.
- [ ] rollback preserves message and API compatibility with work produced by the new version.
- [ ] Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Node.js evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
