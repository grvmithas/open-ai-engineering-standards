# React Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a component, Hook, context boundary, or route UI using React's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Rendering stays pure; state has one owner; Effects synchronize only with external systems. Generic software advice cannot verify that invariant because the decisive evidence lives in `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries; `tsconfig.json` and ESLint React/Hook rules; the nearest component, test, CSS, and Storybook conventions.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries
- `tsconfig.json` and ESLint React/Hook rules
- the nearest component, test, CSS, and Storybook conventions
- React DevTools Profiler commit/flamegraph for the reproduced interaction

## Native verification

- `npm run lint -- --max-warnings=0`
- `npx tsc --noEmit`
- `npm test -- --runInBand` using the repository test script
- `npm run build` and inspect the emitted bundle report when configured
- React DevTools Profiler: record the exact interaction and compare committed renders

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

This cookbook requires deeper React evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects component, Hook, context boundary, or route UI state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
