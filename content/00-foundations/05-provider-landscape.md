# Provider Selection Standard

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Select and govern model providers using measured workload fitness rather than brand preference or benchmark headlines.

## Why

Model quality, price, latency, regions, retention, structured-output behavior, and tool support change independently. A provider decision is a workload-specific procurement and reliability decision, not a permanent architecture identity.

## How

1. Define representative evaluations and failure-cost-weighted acceptance thresholds.
2. Record mandatory controls: regions, encryption, retention, training use, identity, audit, and incident terms.
3. Benchmark candidate model versions with identical inputs, concurrency, and retry policy.
4. Measure quality, p50/p95 latency, effective cost per successful task, and rate-limit behavior.
5. Select one primary and one tested contingency for critical workloads.
6. Isolate provider APIs behind a narrow internal contract without pretending capabilities are identical.
7. Requalify explicit model versions before upgrades.

| Criterion | Required evidence |
|---|---|
| Quality | Workload evaluation results |
| Cost | Cost per accepted result, including retries |
| Reliability | Error and throttling behavior at target load |
| Governance | Contracted retention, region, access, and training terms |
| Portability | Passing contingency-provider test |

## When

Use for initial selection, regulated-data onboarding, material model upgrades, regional expansion, and annual vendor review.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Provider abstraction | Reduced migration blast radius | Lowest-common-denominator risk |
| Explicit model pinning | Reproducible evaluation | Upgrade process required |
| Contingency provider | Resilience and leverage | Duplicate qualification cost |

## Anti-Patterns

- **Leaderboard procurement:** public benchmarks do not represent your workload.
- **Blind multi-provider routing:** routing before models pass the same gates hides quality differences.
- **Fake portability:** normalizes away provider-specific safety or tool semantics.
- **Silent model aliases:** permits behavior changes without requalification.

## Enterprise Considerations

Security and legal must verify subprocessors, data location, deletion, breach notification, IP terms, and audit rights. Maintain a model inventory and approved-use matrix by data classification.

## Checklist

- [ ] Workload-specific evaluation gates exist
- [ ] Effective cost includes retries and failed outputs
- [ ] Data handling terms satisfy classification policy
- [ ] Model versions are explicit and requalified
- [ ] Critical workloads have a tested contingency
- [ ] Provider-specific behavior is preserved where material

## Changelog

- 1.0.0 (2026-07-16): Initial provider selection and governance standard.
