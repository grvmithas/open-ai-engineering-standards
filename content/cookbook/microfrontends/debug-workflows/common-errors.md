# Microfrontends Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Microfrontends failure classes without erasing the platform state needed to prove root cause.

## Why

Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Shared module is not available for eager consumption` | Federated share configuration and loading mode conflict. | eager shared-module consumption or share-scope initialization |
| 2 | `Unsatisfied shared dependency version` | Host and remote require incompatible singleton ranges. | unsatisfied singleton/range or duplicate framework runtime |
| 3 | `Remote entry fails to load` | URL, CORS, cache, or deployment ordering makes the remote unavailable. | remote entry unavailable, stale, or blocked by CSP/CORS |
| 4 | `Route collision` | Shell and slice both claim or rewrite the same route. | shell/slice route collision |
| 5 | `Cross-slice state drift` | Slices duplicate mutable global state or events lack contracts. | cross-slice event/state contract drift |

### 1. `Shared module is not available for eager consumption`

**Failure class:** eager shared-module consumption or share-scope initialization.

**Preserve first:** domain ownership, route manifest, shell API/event contracts, and compatibility matrix.

**Discriminate:** runtime federation logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** run each slice's immutable install, type-check, test, and production build independently. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Federated share configuration and loading mode conflict.

**Correction:** Load the container asynchronously and align share declarations.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

### 2. `Unsatisfied shared dependency version`

**Failure class:** unsatisfied singleton/range or duplicate framework runtime.

**Preserve first:** host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers.

**Discriminate:** federation share scope. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Host and remote require incompatible singleton ranges.

**Correction:** Set a governed compatibility range and test the deployed matrix.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

### 3. `Remote entry fails to load`

**Failure class:** remote entry unavailable, stale, or blocked by CSP/CORS.

**Preserve first:** independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior.

**Discriminate:** network trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** URL, CORS, cache, or deployment ordering makes the remote unavailable.

**Correction:** Use immutable remote assets, health-aware resolution, and a local fallback.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

### 4. `Route collision`

**Failure class:** shell/slice route collision.

**Preserve first:** RUM segmented by shell/slice versions, route, remote-load failure, and duplicate framework/runtime cost.

**Discriminate:** router diagnostics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** execute shell contract tests against the current and next remote manifests. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Shell and slice both claim or rewrite the same route.

**Correction:** Make the shell authoritative for route ownership and publish a route manifest.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

### 5. `Cross-slice state drift`

**Failure class:** cross-slice event/state contract drift.

**Preserve first:** domain ownership, route manifest, shell API/event contracts, and compatibility matrix.

**Discriminate:** contract/event telemetry. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** measure duplicate dependencies and route Web Vitals in the assembled production build. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Slices duplicate mutable global state or events lack contracts.

**Correction:** Keep server state authoritative and version the minimal integration events.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes eager shared-module consumption or share-scope initialization, unsatisfied singleton/range or duplicate framework runtime, remote entry unavailable, stale, or blocked by CSP/CORS, shell/slice route collision, cross-slice event/state contract drift and prevents recurring incidents hidden by state reset.

## Anti-patterns

- Splitting page widgets among teams creates chatty runtime coupling without independent domain ownership or deployability.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Microfrontend governance owns shell contracts, route allocation, shared-dependency policy, CSP origins, accessibility baseline, telemetry schema, and decommission windows.

## Official sources

- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [HTML custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Micro Frontends architecture](https://martinfowler.com/articles/micro-frontends.html)

## Checklist

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
