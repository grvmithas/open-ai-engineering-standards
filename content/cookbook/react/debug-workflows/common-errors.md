# React Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent React failure classes without erasing the platform state needed to prove root cause.

## Why

Rendering stays pure; state has one owner; Effects synchronize only with external systems. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Rendered more hooks than during the previous render` | A Hook is called conditionally or after an early return. | Rules of Hooks violations |
| 2 | `Too many re-renders` | Render synchronously calls a state setter. | stale closures and effect feedback loops |
| 3 | `Maximum update depth exceeded` | An Effect updates a dependency that changes on every execution. | unstable keys or identity |
| 4 | `Hydration mismatch` | Server and client render different initial trees. | hydration divergence |
| 5 | `Stale event or Effect value` | A closure captured obsolete props or state. | excessive render or bundle cost |

### 1. `Rendered more hooks than during the previous render`

**Failure class:** Rules of Hooks violations.

**Preserve first:** `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries.

**Discriminate:** eslint-plugin-react-hooks. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Rules of Hooks violations, correlate that observation to the exact React target, revision, request/job, and UTC interval; compare `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries with one healthy peer or baseline.

**Native action:** `npm run lint -- --max-warnings=0`. Start in the safest React read-only or dry-run mode available. Before changing the component, Hook, context boundary, or route UI, name which of Rules of Hooks violations and stale closures and effect feedback loops the action distinguishes.

**Root-cause direction:** A Hook is called conditionally or after an early return.

**Correction:** Move every Hook to the component top level and branch inside the Hook or rendered output.

**Recovery proof:** Re-run `Rendered more hooks than during the previous render` reproduction, verify the Rules of Hooks violations signal cleared in eslint-plugin-react-hooks. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Move every Hook to the component top level and branch inside the Hook or rendered output. restored the intended React behavior through one complete workload or rollout window.

**Rollback boundary:** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

### 2. `Too many re-renders`

**Failure class:** stale closures and effect feedback loops.

**Preserve first:** `tsconfig.json` and ESLint React/Hook rules.

**Discriminate:** React DevTools Profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For stale closures and effect feedback loops, correlate that observation to the exact React target, revision, request/job, and UTC interval; compare `tsconfig.json` and ESLint React/Hook rules with one healthy peer or baseline.

**Native action:** `npx tsc --noEmit`. Start in the safest React read-only or dry-run mode available. Before changing the component, Hook, context boundary, or route UI, name which of stale closures and effect feedback loops and unstable keys or identity the action distinguishes.

**Root-cause direction:** Render synchronously calls a state setter.

**Correction:** Move the update to an event or external-system Effect and prove its termination condition.

**Recovery proof:** Re-run `Too many re-renders` reproduction, verify the stale closures and effect feedback loops signal cleared in React DevTools Profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Move the update to an event or external-system Effect and prove its termination condition. restored the intended React behavior through one complete workload or rollout window.

**Rollback boundary:** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

### 3. `Maximum update depth exceeded`

**Failure class:** unstable keys or identity.

**Preserve first:** the nearest component, test, CSS, and Storybook conventions.

**Discriminate:** React DevTools Profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For unstable keys or identity, correlate that observation to the exact React target, revision, request/job, and UTC interval; compare the nearest component, test, CSS, and Storybook conventions with one healthy peer or baseline.

**Native action:** `npm test -- --runInBand` using the repository test script. Start in the safest React read-only or dry-run mode available. Before changing the component, Hook, context boundary, or route UI, name which of unstable keys or identity and hydration divergence the action distinguishes.

**Root-cause direction:** An Effect updates a dependency that changes on every execution.

**Correction:** Remove derived state or stabilize the true external dependency.

**Recovery proof:** Re-run `Maximum update depth exceeded` reproduction, verify the unstable keys or identity signal cleared in React DevTools Profiler. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Remove derived state or stabilize the true external dependency. restored the intended React behavior through one complete workload or rollout window.

**Rollback boundary:** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

### 4. `Hydration mismatch`

**Failure class:** hydration divergence.

**Preserve first:** React DevTools Profiler commit/flamegraph for the reproduced interaction.

**Discriminate:** browser console. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For hydration divergence, correlate that observation to the exact React target, revision, request/job, and UTC interval; compare React DevTools Profiler commit/flamegraph for the reproduced interaction with one healthy peer or baseline.

**Native action:** `npm run build` and inspect the emitted bundle report when configured. Start in the safest React read-only or dry-run mode available. Before changing the component, Hook, context boundary, or route UI, name which of hydration divergence and excessive render or bundle cost the action distinguishes.

**Root-cause direction:** Server and client render different initial trees.

**Correction:** Make initial output deterministic and defer browser-only data until after hydration.

**Recovery proof:** Re-run `Hydration mismatch` reproduction, verify the hydration divergence signal cleared in browser console. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Make initial output deterministic and defer browser-only data until after hydration. restored the intended React behavior through one complete workload or rollout window.

**Rollback boundary:** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

### 5. `Stale event or Effect value`

**Failure class:** excessive render or bundle cost.

**Preserve first:** `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries.

**Discriminate:** eslint-plugin-react-hooks. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For excessive render or bundle cost, correlate that observation to the exact React target, revision, request/job, and UTC interval; compare `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries with one healthy peer or baseline.

**Native action:** React DevTools Profiler: record the exact interaction and compare committed renders. Start in the safest React read-only or dry-run mode available. Before changing the component, Hook, context boundary, or route UI, name which of excessive render or bundle cost and Rules of Hooks violations the action distinguishes.

**Root-cause direction:** A closure captured obsolete props or state.

**Correction:** Declare every reactive dependency or use a functional state update.

**Recovery proof:** Re-run `Stale event or Effect value` reproduction, verify the excessive render or bundle cost signal cleared in eslint-plugin-react-hooks. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Declare every reactive dependency or use a functional state update. restored the intended React behavior through one complete workload or rollout window.

**Rollback boundary:** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes Rules of Hooks violations, stale closures and effect feedback loops, unstable keys or identity, hydration divergence, excessive render or bundle cost and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
