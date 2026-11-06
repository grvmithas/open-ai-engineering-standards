---
name: java
description: "Java procedure with verification and rollback evidence. Use when a Java library, JVM service, Spring component, transaction, or concurrency behavior changes."
---

# Java Skill

> **Skill ID:** `java`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a Java library, JVM service, Spring component, transaction, or concurrency behavior changes.

## Why
A typed API contract, transaction and resource model, build/test evidence, and JVM operational profile is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A Java library, JVM service, Spring component, transaction, or concurrency behavior changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A typed API contract
- transaction and resource model
- build/test evidence
- JVM operational profile.

## Procedure
1. Inspect JDK release, build tool, dependency management, static analysis, and framework versions.
2. Define nullability, exceptions, immutability, thread safety, and API compatibility at public boundaries.
3. Place transaction boundaries around invariants; close resources with try-with-resources and propagate context.
4. Test unit behavior, serialization, transactions, concurrency, and integration against representative services.
5. Run the repository build, tests, static analysis, dependency checks, and targeted JFR or heap evidence where relevant.

## Verification
Verify no thread leak, transaction ambiguity, unchecked resource ownership, binary incompatibility, or framework context failure.

## Unhappy Paths and Recovery
For deadlocks, capture thread dumps and lock order. For transaction surprises, reproduce isolation and proxy boundaries. Do not increase heap as a substitute for leak analysis.

## Concrete Example
Implement an inventory reservation service with optimistic locking, transactional invariants, retry-on-conflict limits, and Testcontainers integration tests.

## Do Not Use This Skill When
Do not use for Kotlin-specific language design or infrastructure-only JVM tuning.

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
- [Java Language Specification](https://docs.oracle.com/javase/specs/)
- [Spring Transaction Management](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
