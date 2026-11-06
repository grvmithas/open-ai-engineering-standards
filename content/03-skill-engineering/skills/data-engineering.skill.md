---
name: data-engineering
description: "Data Engineering procedure with verification and rollback evidence. Use when a batch, streaming, transformation, lineage, or data-quality pipeline changes."
---

# Data Engineering Skill

> **Skill ID:** `data-engineering`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a batch, streaming, transformation, lineage, or data-quality pipeline changes.

## Why
A source-to-target contract, lineage, idempotency and replay design, quality rules, orchestration, backfill plan, and SLO evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A batch, streaming, transformation, lineage, or data-quality pipeline changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A source-to-target contract
- lineage
- idempotency and replay design
- quality rules
- orchestration
- backfill plan
- SLO evidence.

## Procedure
1. Define source ownership, schema, event time, keys, null semantics, classification, freshness, volume, and retention.
2. Choose batch or streaming semantics; define watermark, ordering, deduplication, checkpoint, partitioning, and exactly-once claims precisely.
3. Implement immutable raw capture, deterministic transforms, schema evolution, lineage, and quarantine for invalid records.
4. Design idempotent backfills and replay with bounded windows, capacity estimates, reconciliation, and rollback.
5. Test quality constraints, late/duplicate/out-of-order data, restart recovery, backfill, lineage, cost, and freshness alerts.

## Verification
Verify row/event reconciliation, uniqueness, referential and domain constraints, checkpoint recovery, schema compatibility, freshness SLO, and replay equivalence.

## Unhappy Paths and Recovery
If source history is mutable or incomplete, snapshot and state limitations. If a backfill threatens production, throttle, partition, or use isolated capacity with approval.

## Concrete Example
Build an orders stream with schema registry compatibility, event-time watermark, dedupe key, dead-letter quarantine, replay test, and source-to-warehouse reconciliation.

## Do Not Use This Skill When
Do not claim exactly-once delivery without defining the transactional boundary and observable guarantee.

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
- [Apache Beam Programming Guide](https://beam.apache.org/documentation/programming-guide/)
- [OpenLineage Specification](https://openlineage.io/docs/spec/)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
