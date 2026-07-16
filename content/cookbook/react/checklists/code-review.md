# React Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a React component, Hook, context boundary, or route UI.

## Why

React correctness depends on source plus `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries; `tsconfig.json` and ESLint React/Hook rules; the nearest component, test, CSS, and Storybook conventions. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `npm run lint -- --max-warnings=0`; `npx tsc --noEmit`; `npm test -- --runInBand` using the repository test script; `npm run build` and inspect the emitted bundle report when configured; React DevTools Profiler: record the exact interaction and compare committed renders. Findings must identify the violated React invariant.

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

Review must prove "Hooks are top-level and exhaustive dependency analysis is satisfied without suppression" using `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries. That React evidence costs more than diff inspection but exposes Rules of Hooks violations before merge.

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

- [ ] Hooks are top-level and exhaustive dependency analysis is satisfied without suppression.
- [ ] derived values are computed during render instead of mirrored through an Effect.
- [ ] state is colocated with its owner; context values and callbacks avoid accidental identity churn.
- [ ] list keys represent durable entity identity, never position where order can change.
- [ ] loading, empty, error, disabled, and interrupted interaction states are represented.
- [ ] native HTML semantics, focus behavior, accessible names, and keyboard operation are tested.
- [ ] tests assert user-visible behavior with the project's renderer rather than component internals.
- [ ] Profiler evidence justifies memoization; `useMemo` and `memo` are not speculative.
- [ ] Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native React evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
