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

**Discriminate:** python -m pip. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For environment or import resolution mismatch, correlate that observation to the exact Python target, revision, request/job, and UTC interval; compare `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report with one healthy peer or baseline.

**Native action:** `python --version` and `python -m pip check`. Start in the safest Python read-only or dry-run mode available. Before changing the package, FastAPI/Django boundary, asyncio task, worker, or library API, name which of environment or import resolution mismatch and unawaited coroutine or lost cancellation the action distinguishes.

**Root-cause direction:** Interpreter, environment, package layout, or import path is wrong.

**Correction:** Run through the project environment and install the package rather than mutating sys.path.

**Recovery proof:** Re-run `ModuleNotFoundError` reproduction, verify the environment or import resolution mismatch signal cleared in python -m pip. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Run through the project environment and install the package rather than mutating sys.path. restored the intended Python behavior through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 2. `coroutine was never awaited`

**Failure class:** unawaited coroutine or lost cancellation.

**Preserve first:** type-checker, formatter, linter, and test configuration.

**Discriminate:** asyncio debug mode. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For unawaited coroutine or lost cancellation, correlate that observation to the exact Python target, revision, request/job, and UTC interval; compare type-checker, formatter, linter, and test configuration with one healthy peer or baseline.

**Native action:** `python -m pytest -q` with the repository configuration. Start in the safest Python read-only or dry-run mode available. Before changing the package, FastAPI/Django boundary, asyncio task, worker, or library API, name which of unawaited coroutine or lost cancellation and blocking work in the event loop the action distinguishes.

**Root-cause direction:** An async function was called without awaiting or scheduling it.

**Correction:** Await it within the owning event loop and preserve cancellation.

**Recovery proof:** Re-run `coroutine was never awaited` reproduction, verify the unawaited coroutine or lost cancellation signal cleared in asyncio debug mode. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Await it within the owning event loop and preserve cancellation. restored the intended Python behavior through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 3. `Event loop is already running`

**Failure class:** blocking work in the event loop.

**Preserve first:** async task dump, traceback with chained causes, profile, and open-resource evidence.

**Discriminate:** asyncio task inspection. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For blocking work in the event loop, correlate that observation to the exact Python target, revision, request/job, and UTC interval; compare async task dump, traceback with chained causes, profile, and open-resource evidence with one healthy peer or baseline.

**Native action:** `python -m ruff check .` when Ruff is declared. Start in the safest Python read-only or dry-run mode available. Before changing the package, FastAPI/Django boundary, asyncio task, worker, or library API, name which of blocking work in the event loop and resource/session leak the action distinguishes.

**Root-cause direction:** Code attempts to nest an event loop.

**Correction:** Expose async APIs and let the host own the loop.

**Recovery proof:** Re-run `Event loop is already running` reproduction, verify the blocking work in the event loop signal cleared in asyncio task inspection. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Expose async APIs and let the host own the loop. restored the intended Python behavior through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 4. `Validation error at boundary`

**Failure class:** resource/session leak.

**Preserve first:** ASGI/WSGI server, worker count, timeout, and database-pool settings.

**Discriminate:** schema validation output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For resource/session leak, correlate that observation to the exact Python target, revision, request/job, and UTC interval; compare ASGI/WSGI server, worker count, timeout, and database-pool settings with one healthy peer or baseline.

**Native action:** `python -m mypy .` when mypy is declared. Start in the safest Python read-only or dry-run mode available. Before changing the package, FastAPI/Django boundary, asyncio task, worker, or library API, name which of resource/session leak and schema or type contract drift the action distinguishes.

**Root-cause direction:** Untrusted data violates the declared schema.

**Correction:** Return structured field errors; do not weaken the model.

**Recovery proof:** Re-run `Validation error at boundary` reproduction, verify the resource/session leak signal cleared in schema validation output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Return structured field errors; do not weaken the model. restored the intended Python behavior through one complete workload or rollout window.

**Rollback boundary:** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

### 5. `Circular import`

**Failure class:** schema or type contract drift.

**Preserve first:** `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report.

**Discriminate:** python -X importtime. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For schema or type contract drift, correlate that observation to the exact Python target, revision, request/job, and UTC interval; compare `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report with one healthy peer or baseline.

**Native action:** `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics. Start in the safest Python read-only or dry-run mode available. Before changing the package, FastAPI/Django boundary, asyncio task, worker, or library API, name which of schema or type contract drift and environment or import resolution mismatch the action distinguishes.

**Root-cause direction:** Modules depend on each other's import-time side effects.

**Correction:** Move shared contracts downward and defer runtime wiring to composition.

**Recovery proof:** Re-run `Circular import` reproduction, verify the schema or type contract drift signal cleared in python -X importtime. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Move shared contracts downward and defer runtime wiring to composition. restored the intended Python behavior through one complete workload or rollout window.

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
