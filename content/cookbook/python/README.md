# Python Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a package, FastAPI/Django boundary, asyncio task, worker, or library API using Python's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation. Generic software advice cannot verify that invariant because the decisive evidence lives in `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report; type-checker, formatter, linter, and test configuration; async task dump, traceback with chained causes, profile, and open-resource evidence.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report
- type-checker, formatter, linter, and test configuration
- async task dump, traceback with chained causes, profile, and open-resource evidence
- ASGI/WSGI server, worker count, timeout, and database-pool settings

## Native verification

- `python --version` and `python -m pip check`
- `python -m pytest -q` with the repository configuration
- `python -m ruff check .` when Ruff is declared
- `python -m mypy .` when mypy is declared
- `PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics

## Version-aware caution

Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.

## Tradeoffs

This cookbook requires deeper Python evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects package, FastAPI/Django boundary, asyncio task, worker, or library API state.

## Anti-patterns

- Calling `asyncio.create_task` without retained ownership loses exceptions, cancellation, and shutdown guarantees.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Python governance requires approved indexes, hash-locked dependencies, native-wheel provenance, supported interpreter lines, and controls for notebook or dynamic-code execution.

## Standards & Security Controls Alignment

- **NIST AI RMF 1.0**: Maps to `MANAGE 1.2` (Pydantic / type-safe input boundaries) and `MEASURE 2.1` (`mypy` static typing and `pytest` quality gates).
- **OWASP Top 10 for LLMs**: Prevents `LLM02` (Insecure Output Handling) and `LLM08` (Excessive Agency via PydanticAI / LangChain structured outputs).
- **Model Context Protocol (MCP)**: FastMCP and Python MCP SDK tools must define Pydantic schemas and enforce explicit timeout limits.

## Official sources

- [Python documentation](https://docs.python.org/3/)
- [asyncio](https://docs.python.org/3/library/asyncio.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## Checklist

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
