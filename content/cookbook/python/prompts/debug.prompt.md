# Python Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a Python incident by testing platform-specific failure classes before mutation.

## Why

Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation. The debug decision is accepted only when async task dump, traceback with chained causes, profile, and open-resource evidence supports it; generic debug advice cannot establish that Python state.

## How

Resolve every XML variable with sanitized Python evidence for the package, FastAPI/Django boundary, asyncio task, worker, or library API. Apply the invariant "Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Python engineer for a package, FastAPI/Django boundary, asyncio task, worker, or library API. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Python invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: environment or import resolution mismatch; unawaited coroutine or lost cancellation; blocking work in the event loop; resource/session leak; schema or type contract drift.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report; type-checker, formatter, linter, and test configuration; async task dump, traceback with chained causes, profile, and open-resource evidence; ASGI/WSGI server, worker count, timeout, and database-pool settings.</step>
  <step index="3">Select minimally invasive diagnostics from: `python --version` and `python -m pip check`; `python -m pytest -q` with the repository configuration; `python -m ruff check .` when Ruff is declared; `python -m mypy .` when mypy is declared; `PYTHONASYNCIODEBUG=1 python -m &lt;module&gt;` for asyncio diagnostics.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Python validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the Python state needed to distinguish environment or import resolution mismatch, unawaited coroutine or lost cancellation, blocking work in the event loop.

## Anti-patterns

- Calling `asyncio.create_task` without retained ownership loses exceptions, cancellation, and shutdown guarantees.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Python governance requires approved indexes, hash-locked dependencies, native-wheel provenance, supported interpreter lines, and controls for notebook or dynamic-code execution.

## Official sources

- [Python documentation](https://docs.python.org/3/)
- [asyncio](https://docs.python.org/3/library/asyncio.html)
- [Packaging User Guide](https://packaging.python.org/en/latest/)
- [Typing specification](https://typing.python.org/en/latest/spec/)

## Checklist

- [ ] Python version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Python-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
