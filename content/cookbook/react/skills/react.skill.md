# React Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable React change or diagnosis for a component, Hook, context boundary, or route UI, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for React can change. Do not activate for a name-only documentation edit.

## Why

Rendering stays pure; state has one owner; Effects synchronize only with external systems. The skill terminates only on React evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries and `tsconfig.json` and ESLint React/Hook rules.
2. **Select the boundary.** Name the changed component, Hook, context boundary, or route UI, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover Rules of Hooks violations; stale closures and effect feedback loops; unstable keys or identity; hydration divergence; excessive render or bundle cost.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: the nearest component, test, CSS, and Storybook conventions; React DevTools Profiler commit/flamegraph for the reproduced interaction.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `npm run lint -- --max-warnings=0`
2. `npx tsc --noEmit`
3. `npm test -- --runInBand` using the repository test script
4. `npm run build` and inspect the emitted bundle report when configured
5. React DevTools Profiler: record the exact interaction and compare committed renders

7. **Apply review gates.**

- [ ] Hooks are top-level and exhaustive dependency analysis is satisfied without suppression.
- [ ] derived values are computed during render instead of mirrored through an Effect.
- [ ] state is colocated with its owner; context values and callbacks avoid accidental identity churn.
- [ ] list keys represent durable entity identity, never position where order can change.
- [ ] loading, empty, error, disabled, and interrupted interaction states are represented.
- [ ] native HTML semantics, focus behavior, accessible names, and keyboard operation are tested.
- [ ] tests assert user-visible behavior with the project's renderer rather than component internals.
- [ ] Profiler evidence justifies memoization; `useMemo` and `memo` are not speculative.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better React telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the React boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

This skill spends time fingerprinting React and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
