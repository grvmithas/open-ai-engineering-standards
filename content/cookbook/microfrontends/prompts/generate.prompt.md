# Microfrontends Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready domain slice, shell contract, route, federated remote, shared package, or independent frontend release from repository and runtime evidence.

## Why

Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment. The generate decision is accepted only when domain ownership, route manifest, shell API/event contracts, and compatibility matrix supports it; generic generate advice cannot establish that Microfrontends state.

## How

Resolve every XML variable with sanitized Microfrontends evidence for the domain slice, shell contract, route, federated remote, shared package, or independent frontend release. Apply the invariant "Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Microfrontends engineer for a domain slice, shell contract, route, federated remote, shared package, or independent frontend release. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Microfrontends invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.</step>
  <step index="2">Preserve this Microfrontends invariant: Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment.</step>
  <step index="3">Design against these failure classes: eager shared-module consumption or share-scope initialization; unsatisfied singleton/range or duplicate framework runtime; remote entry unavailable, stale, or blocked by CSP/CORS; shell/slice route collision; cross-slice event/state contract drift.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: slice maps to one durable business capability and accountable team; shell owns authentication context, navigation, layout, global error boundaries, and observability contract; route ownership is unique and deep-link behavior is independently testable; remote assets are immutable; runtime manifest supports health-aware fallback; shared dependency allowlist and singleton/version policy are explicit; cross-slice communication uses versioned events/URLs, not imported internal state; styles, DOM IDs, storage keys, and analytics namespaces cannot collide; slice can build, test, deploy, disable, and roll back without coordinated release.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: run each slice's immutable install, type-check, test, and production build independently; emit and inspect webpack stats (`webpack --profile --json &gt; stats.json`) when Module Federation is used; request remote entry and chunks with `curl -I &lt;immutable-asset-url&gt;` to verify cache, CORS, CSP, and content type; execute shell contract tests against the current and next remote manifests; measure duplicate dependencies and route Web Vitals in the assembled production build.</step>
  <step index="6">Define rollout and rollback exactly: Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Microfrontends validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.

## Tradeoffs

Generation waits for domain ownership, route manifest, shell API/event contracts, and compatibility matrix and host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers. That extra Microfrontends discovery is justified because the output must prove "slice maps to one durable business capability and accountable team" and survive eager shared-module consumption or share-scope initialization rather than merely compile.

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

- [ ] Microfrontends version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Microfrontends-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
