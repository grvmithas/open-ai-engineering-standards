# Node.js Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a Node.js incident by testing platform-specific failure classes before mutation.

## Why

The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary. The debug decision is accepted only when event-loop delay, heap, CPU profile, active handles, and request trace supports it; generic debug advice cannot establish that Node.js state.

## How

Resolve every XML variable with sanitized Node.js evidence for the HTTP handler, worker, stream pipeline, package, or process lifecycle. Apply the invariant "The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Node.js engineer for a HTTP handler, worker, stream pipeline, package, or process lifecycle. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Node.js invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: unhandled promise rejection or uncaught exception; event-loop blocking and CPU saturation; listener, handle, or heap retention; socket reset, timeout, or pool starvation; partial shutdown with in-flight work.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: runtime and package-manager pin plus lockfile integrity; module mode, export map, TypeScript target, and startup command; event-loop delay, heap, CPU profile, active handles, and request trace; timeout, retry, pool, body-size, and graceful-shutdown configuration.</step>
  <step index="3">Select minimally invasive diagnostics from: `node --version` and the package manager's immutable install command; `node --test` or the repository's exact test script; `node --trace-warnings &lt;entrypoint&gt;` for warning provenance; `node --prof &lt;entrypoint&gt;` followed by `node --prof-process isolate-*.log`; `npm audit --omit=dev` with lockfile and exploitability review.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Node.js validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the Node.js state needed to distinguish unhandled promise rejection or uncaught exception, event-loop blocking and CPU saturation, listener, handle, or heap retention.

## Anti-patterns

- Unbounded `Promise.all` over user-controlled input converts one request into connection-pool and memory exhaustion.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Node service governance pins runtime and package-manager lines, reviews install scripts and native addons, retains SBOMs, and tests shutdown against the orchestrator grace period.

## Official sources

- [Node.js API](https://nodejs.org/docs/latest/api/)
- [Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
- [Node.js diagnostics](https://nodejs.org/en/learn/diagnostics/user-journey)
- [OWASP Node.js security](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

## Checklist

- [ ] Node.js version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Node.js-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
