# React Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a React component, Hook, context boundary, or route UI.

## Why

A syntactically valid React artifact can still fail because of Rules of Hooks violations, stale closures and effect feedback loops, unstable keys or identity, hydration divergence, excessive render or bundle cost. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `npm run lint -- --max-warnings=0`; `npx tsc --noEmit`; `npm test -- --runInBand` using the repository test script; `npm run build` and inspect the emitted bundle report when configured; React DevTools Profiler: record the exact interaction and compare committed renders. Stop promotion on any failed item.

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

The React deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

## Anti-patterns

- A page-wide context holding unrelated mutable state causes every consumer to share a render and release boundary.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

For React estates, govern design-system packages, browser support, telemetry consent, third-party scripts, and accessibility evidence centrally; product teams retain ownership of feature behavior.

## Official sources

- [React Learn](https://react.dev/learn)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)

## Checklist

- [ ] production build completes with the repository's exact React renderer and bundler versions.
- [ ] route-level chunks and source-map policy are inspected for unexpected dependency or secret exposure.
- [ ] SSR or prerendered pages hydrate without console errors under production mode.
- [ ] critical interactions pass keyboard, focus, screen-reader smoke, and error-boundary tests.
- [ ] real-user error and Web Vital dashboards are segmented by release.
- [ ] canary cohort shows no increase in hydration, render, or JavaScript errors.
- [ ] feature flag can disable the changed interaction without requiring an asset rollback.
- [ ] rollback restores a compatible server/API contract for cached clients.
- [ ] Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native React evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
