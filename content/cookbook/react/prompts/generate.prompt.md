# React Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready component, Hook, context boundary, or route UI from repository and runtime evidence.

## Why

Rendering stays pure; state has one owner; Effects synchronize only with external systems. The generate decision is accepted only when `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries supports it; generic generate advice cannot establish that React state.

## How

Resolve every XML variable with sanitized React evidence for the component, Hook, context boundary, or route UI. Apply the invariant "Rendering stays pure; state has one owner; Effects synchronize only with external systems." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal React engineer for a component, Hook, context boundary, or route UI. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with React invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.</step>
  <step index="2">Preserve this React invariant: Rendering stays pure; state has one owner; Effects synchronize only with external systems.</step>
  <step index="3">Design against these failure classes: Rules of Hooks violations; stale closures and effect feedback loops; unstable keys or identity; hydration divergence; excessive render or bundle cost.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: Hooks are top-level and exhaustive dependency analysis is satisfied without suppression; derived values are computed during render instead of mirrored through an Effect; state is colocated with its owner; context values and callbacks avoid accidental identity churn; list keys represent durable entity identity, never position where order can change; loading, empty, error, disabled, and interrupted interaction states are represented; native HTML semantics, focus behavior, accessible names, and keyboard operation are tested; tests assert user-visible behavior with the project's renderer rather than component internals; Profiler evidence justifies memoization; `useMemo` and `memo` are not speculative.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `npm run lint -- --max-warnings=0`; `npx tsc --noEmit`; `npm test -- --runInBand` using the repository test script; `npm run build` and inspect the emitted bundle report when configured; React DevTools Profiler: record the exact interaction and compare committed renders.</step>
  <step index="6">Define rollout and rollback exactly: Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress React validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.

## Tradeoffs

Generation waits for `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries and `tsconfig.json` and ESLint React/Hook rules. That extra React discovery is justified because the output must prove "Hooks are top-level and exhaustive dependency analysis is satisfied without suppression" and survive Rules of Hooks violations rather than merely compile.

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

- [ ] React version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a React-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
