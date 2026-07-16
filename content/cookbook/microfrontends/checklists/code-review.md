# Microfrontends Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Microfrontends domain slice, shell contract, route, federated remote, shared package, or independent frontend release.

## Why

Microfrontends correctness depends on source plus domain ownership, route manifest, shell API/event contracts, and compatibility matrix; host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers; independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: run each slice's immutable install, type-check, test, and production build independently; emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used; request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type; execute shell contract tests against the current and next remote manifests; measure duplicate dependencies and route Web Vitals in the assembled production build. Findings must identify the violated Microfrontends invariant.

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

The Microfrontends review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] slice maps to one durable business capability and accountable team.
- [ ] shell owns authentication context, navigation, layout, global error boundaries, and observability contract.
- [ ] route ownership is unique and deep-link behavior is independently testable.
- [ ] remote assets are immutable; runtime manifest supports health-aware fallback.
- [ ] shared dependency allowlist and singleton/version policy are explicit.
- [ ] cross-slice communication uses versioned events/URLs, not imported internal state.
- [ ] styles, DOM IDs, storage keys, and analytics namespaces cannot collide.
- [ ] slice can build, test, deploy, disable, and roll back without coordinated release.
- [ ] Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Microfrontends evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
