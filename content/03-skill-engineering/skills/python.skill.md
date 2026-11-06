---
name: python
description: "Python procedure with verification and rollback evidence. Use when a Python package, service, async task, CLI, or data-processing module changes."
---

# Python Skill

> **Skill ID:** `python`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a Python package, service, async task, CLI, or data-processing module changes.

## Why
A typed module contract, dependency and environment specification, tests, packaging evidence, and operational error behavior is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A Python package, service, async task, CLI, or data-processing module changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A typed module contract
- dependency and environment specification
- tests
- packaging evidence
- operational error behavior.

## Procedure
1. Inspect pyproject, supported Python versions, dependency groups, formatter, type checker, and test conventions.
2. Model types and exceptions at public boundaries; validate external data and avoid mutable defaults.
3. For async or multiprocessing code, define cancellation, cleanup, serialization, and concurrency ownership.
4. Write pytest cases with isolated temp paths, clocks, environment, and network; add property tests for invariant-heavy logic.
5. Run the pinned formatter, linter, type checker, tests, build, and package metadata validation.

## Verification
Verify wheels and source distributions build, imports work in a clean environment, type checks pass, and resources close on exceptions.

## Unhappy Paths and Recovery
If dependency resolution diverges, reproduce from the lock or constraints file. If typing requires broad ignores, narrow the interface rather than masking errors.

## Concrete Example
Create an async client with httpx timeouts, typed response models, retry classification, cancellation-safe cleanup, and respx tests.

## Do Not Use This Skill When
Do not use for notebooks whose primary goal is exploratory analysis rather than maintained software.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [Python Documentation](https://docs.python.org/3/)
- [PyPA Packaging Guide](https://packaging.python.org/)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
