---
name: python
description: "Execute a repeatable Python change or diagnosis for a package, FastAPI/Django boundary, asyncio task, worker, or library API, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Python can change."
---

# Python Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Python change or diagnosis for a package, FastAPI/Django boundary, asyncio task, worker, or library API, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Python can change. Do not activate for a name-only documentation edit.

## Why

Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation. The skill terminates only on Python evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report and type-checker, formatter, linter, and test configuration.
2. **Select the boundary.** Name the changed package, FastAPI/Django boundary, asyncio task, worker, or library API, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover environment or import resolution mismatch; unawaited coroutine or lost cancellation; blocking work in the event loop; resource/session leak; schema or type contract drift.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: async task dump, traceback with chained causes, profile, and open-resource evidence; ASGI/WSGI server, worker count, timeout, and database-pool settings.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `python --version` and `python -m pip check`
2. `python -m pytest -q` with the repository configuration
3. `python -m ruff check .` when Ruff is declared
4. `python -m mypy .` when mypy is declared
5. `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics

7. **Apply review gates.**

- [ ] package imports work after installation, not through `sys.path` mutation.
- [ ] public functions and data boundaries have useful types without blanket `Any`.
- [ ] context managers close files, sessions, transactions, and locks on every path.
- [ ] async functions await async I/O and offload measured blocking work intentionally.
- [ ] task groups define ownership, cancellation, and exception aggregation.
- [ ] mutable defaults, import-time side effects, and hidden globals are absent.
- [ ] validation errors are mapped without weakening domain invariants.
- [ ] tests cover interpreter/framework integration from a clean environment.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

## Verification

The Python evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report. For manual package, FastAPI/Django boundary, asyncio task, worker, or library API checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Python telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Python boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Python workflow only when native validation, applicable review/deployment gates, and recovery signals for environment or import resolution mismatch and unawaited coroutine or lost cancellation pass. Otherwise record a named owner and the exact missing Python evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

This skill fingerprints Python through `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report before editing and retains async task dump, traceback with chained causes, profile, and open-resource evidence before recovery. The added work is warranted when environment or import resolution mismatch could make Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
