# Node.js Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Node.js failure classes without erasing the platform state needed to prove root cause.

## Why

The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `UnhandledPromiseRejection` | A promise chain has no awaited or returned error path. | unhandled promise rejection or uncaught exception |
| 2 | `EventEmitter memory leak warning` | Listeners accumulate without removal. | event-loop blocking and CPU saturation |
| 3 | `EADDRINUSE` | Another process owns the requested listening socket. | listener, handle, or heap retention |
| 4 | `ECONNRESET` | A peer closed a connection while work was in flight. | socket reset, timeout, or pool starvation |
| 5 | `Process stalls under load` | CPU work or synchronous I/O blocks the event loop. | partial shutdown with in-flight work |

### 1. `UnhandledPromiseRejection`

**Failure class:** unhandled promise rejection or uncaught exception.

**Preserve first:** runtime and package-manager pin plus lockfile integrity.

**Discriminate:** --trace-warnings. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For unhandled promise rejection or uncaught exception, correlate that observation to the exact Node.js target, revision, request/job, and UTC interval; compare runtime and package-manager pin plus lockfile integrity with one healthy peer or baseline.

**Native action:** `node --version` and the package manager's immutable install command. Start in the safest Node.js read-only or dry-run mode available. Before changing the HTTP handler, worker, stream pipeline, package, or process lifecycle, name which of unhandled promise rejection or uncaught exception and event-loop blocking and CPU saturation the action distinguishes.

**Root-cause direction:** A promise chain has no awaited or returned error path.

**Correction:** Await the promise and route errors through the application boundary.

**Recovery proof:** Re-run `UnhandledPromiseRejection` reproduction, verify the unhandled promise rejection or uncaught exception signal cleared in --trace-warnings. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Await the promise and route errors through the application boundary. restored the intended Node.js behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

### 2. `EventEmitter memory leak warning`

**Failure class:** event-loop blocking and CPU saturation.

**Preserve first:** module mode, export map, TypeScript target, and startup command.

**Discriminate:** emitter.listenerCount. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For event-loop blocking and CPU saturation, correlate that observation to the exact Node.js target, revision, request/job, and UTC interval; compare module mode, export map, TypeScript target, and startup command with one healthy peer or baseline.

**Native action:** `node --test` or the repository's exact test script. Start in the safest Node.js read-only or dry-run mode available. Before changing the HTTP handler, worker, stream pipeline, package, or process lifecycle, name which of event-loop blocking and CPU saturation and listener, handle, or heap retention the action distinguishes.

**Root-cause direction:** Listeners accumulate without removal.

**Correction:** Register once or remove listeners during resource teardown.

**Recovery proof:** Re-run `EventEmitter memory leak warning` reproduction, verify the event-loop blocking and CPU saturation signal cleared in emitter.listenerCount. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Register once or remove listeners during resource teardown. restored the intended Node.js behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

### 3. `EADDRINUSE`

**Failure class:** listener, handle, or heap retention.

**Preserve first:** event-loop delay, heap, CPU profile, active handles, and request trace.

**Discriminate:** process/socket inspection. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For listener, handle, or heap retention, correlate that observation to the exact Node.js target, revision, request/job, and UTC interval; compare event-loop delay, heap, CPU profile, active handles, and request trace with one healthy peer or baseline.

**Native action:** `node --trace-warnings <entrypoint>` for warning provenance. Start in the safest Node.js read-only or dry-run mode available. Before changing the HTTP handler, worker, stream pipeline, package, or process lifecycle, name which of listener, handle, or heap retention and socket reset, timeout, or pool starvation the action distinguishes.

**Root-cause direction:** Another process owns the requested listening socket.

**Correction:** Identify the owner or configure one authoritative port binding.

**Recovery proof:** Re-run `EADDRINUSE` reproduction, verify the listener, handle, or heap retention signal cleared in process/socket inspection. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Identify the owner or configure one authoritative port binding. restored the intended Node.js behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

### 4. `ECONNRESET`

**Failure class:** socket reset, timeout, or pool starvation.

**Preserve first:** timeout, retry, pool, body-size, and graceful-shutdown configuration.

**Discriminate:** structured network logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For socket reset, timeout, or pool starvation, correlate that observation to the exact Node.js target, revision, request/job, and UTC interval; compare timeout, retry, pool, body-size, and graceful-shutdown configuration with one healthy peer or baseline.

**Native action:** `node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`. Start in the safest Node.js read-only or dry-run mode available. Before changing the HTTP handler, worker, stream pipeline, package, or process lifecycle, name which of socket reset, timeout, or pool starvation and partial shutdown with in-flight work the action distinguishes.

**Root-cause direction:** A peer closed a connection while work was in flight.

**Correction:** Classify retry safety, enforce timeouts, and record peer/request context.

**Recovery proof:** Re-run `ECONNRESET` reproduction, verify the socket reset, timeout, or pool starvation signal cleared in structured network logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Classify retry safety, enforce timeouts, and record peer/request context. restored the intended Node.js behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

### 5. `Process stalls under load`

**Failure class:** partial shutdown with in-flight work.

**Preserve first:** runtime and package-manager pin plus lockfile integrity.

**Discriminate:** node --prof. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For partial shutdown with in-flight work, correlate that observation to the exact Node.js target, revision, request/job, and UTC interval; compare runtime and package-manager pin plus lockfile integrity with one healthy peer or baseline.

**Native action:** `npm audit --omit=dev` with lockfile and exploitability review. Start in the safest Node.js read-only or dry-run mode available. Before changing the HTTP handler, worker, stream pipeline, package, or process lifecycle, name which of partial shutdown with in-flight work and unhandled promise rejection or uncaught exception the action distinguishes.

**Root-cause direction:** CPU work or synchronous I/O blocks the event loop.

**Correction:** Profile and move bounded CPU work to worker threads or another service.

**Recovery proof:** Re-run `Process stalls under load` reproduction, verify the partial shutdown with in-flight work signal cleared in node --prof. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Profile and move bounded CPU work to worker threads or another service. restored the intended Node.js behavior through one complete workload or rollout window.

**Rollback boundary:** Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes unhandled promise rejection or uncaught exception, event-loop blocking and CPU saturation, listener, handle, or heap retention, socket reset, timeout, or pool starvation, partial shutdown with in-flight work and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
