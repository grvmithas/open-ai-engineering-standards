# Python Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Python failure classes without erasing the platform state needed to prove root cause.

## Why

Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `ModuleNotFoundError` | Interpreter, environment, package layout, or import path is wrong. | environment or import resolution mismatch |
| 2 | `coroutine was never awaited` | An async function was called without awaiting or scheduling it. | unawaited coroutine or lost cancellation |
| 3 | `Event loop is already running` | Code attempts to nest an event loop. | blocking work in the event loop |
| 4 | `Validation error at boundary` | Untrusted data violates the declared schema. | resource/session leak |
| 5 | `Circular import` | Modules depend on each other's import-time side effects. | schema or type contract drift |

### 1. `ModuleNotFoundError`

**Failure class:** environment or import resolution mismatch.

**Preserve first:** `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report.

**Discriminate:** python -m pip. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `python --version` and `python -m pip check`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Interpreter, environment, package layout, or import path is wrong.

**Correction:** Run through the project environment and install the package rather than mutating sys.path.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 2. `coroutine was never awaited`

**Failure class:** unawaited coroutine or lost cancellation.

**Preserve first:** type-checker, formatter, linter, and test configuration.

**Discriminate:** asyncio debug mode. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `python -m pytest -q` with the repository configuration. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** An async function was called without awaiting or scheduling it.

**Correction:** Await it within the owning event loop and preserve cancellation.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 3. `Event loop is already running`

**Failure class:** blocking work in the event loop.

**Preserve first:** async task dump, traceback with chained causes, profile, and open-resource evidence.

**Discriminate:** asyncio task inspection. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `python -m ruff check .` when Ruff is declared. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Code attempts to nest an event loop.

**Correction:** Expose async APIs and let the host own the loop.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 4. `Validation error at boundary`

**Failure class:** resource/session leak.

**Preserve first:** ASGI/WSGI server, worker count, timeout, and database-pool settings.

**Discriminate:** schema validation output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `python -m mypy .` when mypy is declared. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Untrusted data violates the declared schema.

**Correction:** Return structured field errors; do not weaken the model.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 5. `Circular import`

**Failure class:** schema or type contract drift.

**Preserve first:** `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report.

**Discriminate:** python -X importtime. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Modules depend on each other's import-time side effects.

**Correction:** Move shared contracts downward and defer runtime wiring to composition.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes environment or import resolution mismatch, unawaited coroutine or lost cancellation, blocking work in the event loop, resource/session leak, schema or type contract drift and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
