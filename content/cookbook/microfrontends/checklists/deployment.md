# Microfrontends Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Microfrontends domain slice, shell contract, route, federated remote, shared package, or independent frontend release.

## Why

A syntactically valid Microfrontends artifact can still fail because of eager shared-module consumption or share-scope initialization, unsatisfied singleton/range or duplicate framework runtime, remote entry unavailable, stale, or blocked by CSP/CORS, shell/slice route collision, cross-slice event/state contract drift. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from run each slice's immutable install, type-check, test, and production build independently; emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used; request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type; execute shell contract tests against the current and next remote manifests; measure duplicate dependencies and route Web Vitals in the assembled production build. Stop promotion on any failed item.

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

Promotion waits for "host and remote compatibility matrix passes for current and candidate versions" and "remote entry/chunks are immutable, integrity-aware where supported, and have correct cache/CORS/CSP headers". Those Microfrontends target checks slow release but directly bound eager shared-module consumption or share-scope initialization and make this rollback executable: Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.

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

- [ ] host and remote compatibility matrix passes for current and candidate versions.
- [ ] remote entry/chunks are immutable, integrity-aware where supported, and have correct cache/CORS/CSP headers.
- [ ] route, authentication, navigation, analytics, and accessibility contract tests pass assembled.
- [ ] failure injection proves an unavailable remote renders a bounded fallback.
- [ ] RUM identifies shell, remote, and shared-dependency versions.
- [ ] canary watches remote-load errors, duplicate runtime, route errors, Web Vitals, and business conversion.
- [ ] manifest/feature flag can remove the slice without redeploying unaffected domains.
- [ ] rollback selects the previous remote manifest while retaining shell contract compatibility.
- [ ] Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Microfrontends evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
