---
name: architecture
description: "Architecture procedure with verification and rollback evidence. Use when a request changes system boundaries, deployment topology, data ownership, or a cross-team interface."
---

# Architecture Skill

> **Skill ID:** `architecture`  
> **Version:** 2.1  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a request changes system boundaries, deployment topology, data ownership, or a cross-team interface.

## Why
An architecture decision record, C4 context/container views, interface contracts, quality-attribute scenarios, and a migration sequence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A request changes system boundaries, deployment topology, data ownership, or a cross-team interface.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An architecture decision record
- C4 context/container views
- interface contracts
- quality-attribute scenarios
- a migration sequence.

## Procedure
1. Quantify latency, availability, consistency, privacy, cost, and recovery objectives.
2. Map actors, trust boundaries, data flows, failure domains, and ownership.
3. Evaluate one recommended design against two credible alternatives with scenario-based tradeoffs.
4. Specify APIs, data ownership, resilience, observability, capacity assumptions, and rollout/rollback.
5. Record the decision and validate it through threat, failure, and operability reviews.

## Verification
Render Mermaid diagrams; validate every interface has an owner and error contract; walk through dependency loss, region loss, overload, and rollback scenarios.

## Unhappy Paths and Recovery
If quality attributes conflict, escalate the specific business priority. If capacity inputs are absent, publish formulas and mark estimates provisional. If migration cannot be reversed, require an approved recovery design.

## Concrete Example
Design tenant isolation for a document service: deliver an ADR choosing database-per-tenant or row isolation, a C4 diagram, RTO/RPO analysis, and staged migration.

## Do Not Use This Skill When
Do not use for a local implementation choice that does not alter a boundary or quality attribute.

## Tradeoffs
ADRs with C4 views and quality-attribute scenarios delay coding start; they prevent irreversible mistakes in data ownership, trust boundaries, and unowned APIs. Evaluating one recommendation against two credible alternatives costs design time; skipping alternatives produces path-dependent lock-in that later migrations cannot cheaply undo.

## Anti-Patterns
- Drawing topology boxes without quantified latency, availability, consistency, RTO/RPO, or cost objectives.
- Splitting into services (or keeping a monolith) without ownership and failure-domain analysis.
- Leaving interface error contracts, idempotency, and data ownership implicit “for later.”
- Shipping irreversible migrations without an approved recovery or rollback design.
- Architecture-by-PR: accumulating boundary changes across merges with no ADR.

## Enterprise Considerations
Cross-team interfaces need named owners and change control before topology ships. Data residency, tenancy isolation, and retention constraints belong in the ADR—not as post-hoc compliance patches. Capacity and recovery assumptions must be reviewable by ops/SRE before executive sign-off on deployment topology changes.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [C4 Model](https://c4model.com/)
- [AWS Architecture Decision Records](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/welcome.html)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.1 (2026-07-29):** De-boilerplated Tradeoffs, Anti-Patterns, and Enterprise Considerations with architecture-domain content (ADRs, quality attributes, irreversible migrations).
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
