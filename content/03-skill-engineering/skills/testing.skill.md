# Testing Skill

> **Skill ID:** `testing`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A behavior change, defect, integration boundary, or release risk needs automated evidence.

## Why
A risk matrix, layered test set, deterministic fixtures, coverage rationale, and executable test report is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A behavior change, defect, integration boundary, or release risk needs automated evidence.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A risk matrix
- layered test set
- deterministic fixtures
- coverage rationale
- executable test report.

## Procedure
1. Convert requirements and failure history into observable behaviors and risk-ranked scenarios.
2. Choose unit, component, contract, integration, end-to-end, property, fuzz, or load tests at the cheapest truthful layer.
3. Build isolated fixtures with controlled clocks, randomness, network, identity, and data lifecycle.
4. Implement happy, boundary, negative, concurrency, retry, and recovery cases proportional to risk.
5. Run repeatability checks, mutation or fault checks where useful, and record excluded risk.

## Verification
Tests must fail for the intended defect, pass for the correct behavior, avoid order dependence, and produce actionable diagnostics.

## Unhappy Paths and Recovery
Quarantine is temporary and requires an owner and expiry. For nondeterminism, preserve seed and trace. If a dependency cannot be controlled, use a contract test plus a minimal real integration test.

## Concrete Example
Test payment idempotency with duplicate delivery, timeout-after-commit, reordered events, and concurrent requests against a real transaction boundary.

## Do Not Use This Skill When
Do not chase line coverage without a behavior or risk model.

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
- [Martin Fowler Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Google Testing Blog](https://testing.googleblog.com/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
