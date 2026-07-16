# Performance Skill

> **Skill ID:** `performance`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A measured latency, throughput, saturation, memory, CPU, or cost objective is missed.

## Why
A baseline profile, workload definition, bottleneck evidence, capacity model, optimized change, and before/after comparison is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A measured latency, throughput, saturation, memory, CPU, or cost objective is missed.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A baseline profile
- workload definition
- bottleneck evidence
- capacity model
- optimized change
- before/after comparison.

## Procedure
1. Define the SLI, percentile, workload mix, data size, concurrency, environment, and target.
2. Capture a statistically useful baseline and profiles without changing multiple variables.
3. Identify the dominant constrained resource using traces, flame graphs, query plans, and saturation metrics.
4. Change the bottleneck with a stated complexity and capacity hypothesis.
5. Repeat the same benchmark, inspect regressions, and document the new limit and rollback.

## Verification
Compare identical workloads with confidence intervals or repeated runs; confirm correctness and resource ceilings alongside speed.

## Unhappy Paths and Recovery
If the benchmark is noisy, isolate background load and warmup. If production profiling is unsafe, sample minimally or reproduce with representative data. Reject microbenchmarks disconnected from the SLI.

## Concrete Example
Reduce p95 search latency by using trace spans to isolate an N+1 query, validate an index with query plans, and compare p50/p95/p99 and DB CPU.

## Do Not Use This Skill When
Do not optimize code without a measured objective and representative baseline.

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
- [Google SRE Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Brendan Gregg USE Method](https://www.brendangregg.com/usemethod.html)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
