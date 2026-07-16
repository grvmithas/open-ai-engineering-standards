# Microfrontends Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a domain slice, shell contract, route, federated remote, shared package, or independent frontend release using Microfrontends's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment. Generic software advice cannot verify that invariant because the decisive evidence lives in domain ownership, route manifest, shell API/event contracts, and compatibility matrix; host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers; independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- domain ownership, route manifest, shell API/event contracts, and compatibility matrix
- host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers
- independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior
- RUM segmented by shell/slice versions, route, remote-load failure, and duplicate framework/runtime cost

## Native verification

- run each slice's immutable install, type-check, test, and production build independently
- emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used
- request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type
- execute shell contract tests against the current and next remote manifests
- measure duplicate dependencies and route Web Vitals in the assembled production build

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

This cookbook requires deeper Microfrontends evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects domain slice, shell contract, route, federated remote, shared package, or independent frontend release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
