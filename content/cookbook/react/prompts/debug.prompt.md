# React Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a React incident by testing platform-specific failure classes before mutation.

## Why

Rendering stays pure; state has one owner; Effects synchronize only with external systems. This prompt requires native React artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

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
  <step index="1">Classify the symptom into: Rules of Hooks violations; stale closures and effect feedback loops; unstable keys or identity; hydration divergence; excessive render or bundle cost.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: `package.json` plus the lockfile entries for React, renderer, router, state, and test libraries; `tsconfig.json` and ESLint React/Hook rules; the nearest component, test, CSS, and Storybook conventions; React DevTools Profiler commit/flamegraph for the reproduced interaction.</step>
  <step index="3">Select minimally invasive diagnostics from: `npm run lint -- --max-warnings=0`; `npx tsc --noEmit`; `npm test -- --runInBand` using the repository test script; `npm run build` and inspect the emitted bundle report when configured; React DevTools Profiler: record the exact interaction and compare committed renders.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
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

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the React state needed to distinguish Rules of Hooks violations, stale closures and effect feedback loops, unstable keys or identity.

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

- 1.1.0 (2026-07-16): Rebuilt as a React-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
