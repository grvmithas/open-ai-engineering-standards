# Python Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Python package, FastAPI/Django boundary, asyncio task, worker, or library API.

## Why

Python correctness depends on source plus `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report; type-checker, formatter, linter, and test configuration; async task dump, traceback with chained causes, profile, and open-resource evidence. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `python --version` and `python -m pip check`; `python -m pytest -q` with the repository configuration; `python -m ruff check .` when Ruff is declared; `python -m mypy .` when mypy is declared; `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics. Findings must identify the violated Python invariant.

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

The Python review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] package imports work after installation, not through `sys.path` mutation.
- [ ] public functions and data boundaries have useful types without blanket `Any`.
- [ ] context managers close files, sessions, transactions, and locks on every path.
- [ ] async functions await async I/O and offload measured blocking work intentionally.
- [ ] task groups define ownership, cancellation, and exception aggregation.
- [ ] mutable defaults, import-time side effects, and hidden globals are absent.
- [ ] validation errors are mapped without weakening domain invariants.
- [ ] tests cover interpreter/framework integration from a clean environment.
- [ ] Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Python evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
