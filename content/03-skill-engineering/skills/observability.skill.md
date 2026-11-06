---
name: observability
description: "Observability procedure with verification and rollback evidence. Use when an AI system needs diagnosable traces, metrics, logs, cost, quality signals, or service objectives."
---

# Observability Skill

> **Skill ID:** `observability`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when an AI system needs diagnosable traces, metrics, logs, cost, quality signals, or service objectives.

## Why
A telemetry schema, trace topology, SLI/SLO definitions, dashboards, alerts, sampling/redaction policy, and incident queries is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An AI system needs diagnosable traces, metrics, logs, cost, quality signals, or service objectives.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A telemetry schema
- trace topology
- SLI/SLO definitions
- dashboards
- alerts
- sampling/redaction policy
- incident queries.

## Procedure
1. Map user request through retrieval, model calls, tool calls, validation, and downstream effects using stable trace correlation.
2. Adopt OpenTelemetry GenAI attributes where stable; define model/version, token, latency, retry, cache, tool, and outcome fields without content leakage.
3. Define availability, latency, quality, safety, and cost SLIs with owners and error-budget policy.
4. Choose head/tail sampling, redaction, retention, tenant controls, and high-cardinality limits.
5. Test telemetry during success, timeout, refusal, retry, tool failure, and partial effect; validate dashboards and actionable alerts.

## Verification
Verify trace continuity, metric cardinality, redaction, alert precision, SLO calculations, ingestion loss, and queryability during a simulated failure.

## Unhappy Paths and Recovery
If content cannot be logged, record hashes, categories, and references. If cardinality explodes, aggregate dimensions rather than dropping critical correlation.

## Concrete Example
Instrument a RAG request with retrieval spans, model usage, citation-validation outcome, tool effects, tenant-safe IDs, and a p95 latency SLO.

## Do Not Use This Skill When
Do not log raw prompts, credentials, or regulated content merely to simplify debugging.

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
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [Google SRE Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
