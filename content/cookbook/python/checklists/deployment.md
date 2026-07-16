# Python Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Python package, FastAPI/Django boundary, asyncio task, worker, or library API.

## Why

A syntactically valid Python artifact can still fail because of environment or import resolution mismatch, unawaited coroutine or lost cancellation, blocking work in the event loop, resource/session leak, schema or type contract drift. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `python --version` and `python -m pip check`; `python -m pytest -q` with the repository configuration; `python -m ruff check .` when Ruff is declared; `python -m mypy .` when mypy is declared; `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics. Stop promotion on any failed item.

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

Promotion waits for "artifact is built once and installed into a clean environment with locked dependencies" and "deployed Python minor and native-wheel platform match build evidence". Those Python target checks slow release but directly bound environment or import resolution mismatch and make this rollback executable: Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

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

- [ ] artifact is built once and installed into a clean environment with locked dependencies.
- [ ] deployed Python minor and native-wheel platform match build evidence.
- [ ] database migrations and worker/application rollout order are backward compatible.
- [ ] ASGI/WSGI worker, timeout, keepalive, and pool settings are load-tested.
- [ ] startup imports, health checks, signal handling, and graceful worker drain pass.
- [ ] tracebacks, task failures, queue depth, pool usage, and memory are observable.
- [ ] canary checks error classes and latency by worker/process.
- [ ] rollback retains compatibility with queued task payloads and migrated schema.
- [ ] Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Python evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
