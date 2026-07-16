# Microfrontends Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable Microfrontends change or diagnosis for a domain slice, shell contract, route, federated remote, shared package, or independent frontend release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Microfrontends can change. Do not activate for a name-only documentation edit.

## Why

Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment. The skill terminates only on Microfrontends evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture domain ownership, route manifest, shell API/event contracts, and compatibility matrix and host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers.
2. **Select the boundary.** Name the changed domain slice, shell contract, route, federated remote, shared package, or independent frontend release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover eager shared-module consumption or share-scope initialization; unsatisfied singleton/range or duplicate framework runtime; remote entry unavailable, stale, or blocked by CSP/CORS; shell/slice route collision; cross-slice event/state contract drift.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior; RUM segmented by shell/slice versions, route, remote-load failure, and duplicate framework/runtime cost.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. run each slice's immutable install, type-check, test, and production build independently
2. emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used
3. request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type
4. execute shell contract tests against the current and next remote manifests
5. measure duplicate dependencies and route Web Vitals in the assembled production build

7. **Apply review gates.**

- [ ] slice maps to one durable business capability and accountable team.
- [ ] shell owns authentication context, navigation, layout, global error boundaries, and observability contract.
- [ ] route ownership is unique and deep-link behavior is independently testable.
- [ ] remote assets are immutable; runtime manifest supports health-aware fallback.
- [ ] shared dependency allowlist and singleton/version policy are explicit.
- [ ] cross-slice communication uses versioned events/URLs, not imported internal state.
- [ ] styles, DOM IDs, storage keys, and analytics namespaces cannot collide.
- [ ] slice can build, test, deploy, disable, and roll back without coordinated release.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

## Verification

The Microfrontends evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain domain ownership, route manifest, shell API/event contracts, and compatibility matrix. For manual domain slice, shell contract, route, federated remote, shared package, or independent frontend release checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Microfrontends telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Microfrontends boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Microfrontends workflow only when native validation, applicable review/deployment gates, and recovery signals for eager shared-module consumption or share-scope initialization and unsatisfied singleton/range or duplicate framework runtime pass. Otherwise record a named owner and the exact missing Microfrontends evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

This skill fingerprints Microfrontends through domain ownership, route manifest, shell API/event contracts, and compatibility matrix before editing and retains independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior before recovery. The added work is warranted when eager shared-module consumption or share-scope initialization could make Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
