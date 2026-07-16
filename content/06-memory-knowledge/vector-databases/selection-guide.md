# Retrieval Store Selection Guide

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Select vector infrastructure from measured workload, control, and lifecycle requirements.

## Why

Vector count alone does not determine a product or migration threshold. Filtering selectivity, update rate, latency, recall, tenancy, operations, and compliance dominate.

## How

Benchmark shortlisted stores with production-shaped vectors, metadata, ACL predicates, churn, concurrency, and failure modes. Gate on filtered retrieval quality, p95/p99 latency, ingest/delete/correction lag, backup/restore, tenant isolation, encryption/key control, observability, portability, and total cost. Start with the existing transactional platform only when it meets gates; select a specialized service when evidence shows a gap.

## Tradeoffs

Integrated stores simplify consistency and operations. Specialized stores can improve scale or ANN features but add distributed lifecycle and vendor risk.

## Anti-patterns

- Universal cutoffs such as “migrate at N vectors.”
- Selecting from vendor feature matrices without corpus benchmarks.
- Ignoring exact deletion, filtered recall, or restore behavior.

## Enterprise Considerations

Review residency, subprocessors, private networking, key ownership, auditability, export format, disaster recovery, and contract exit.

## Checklist

- [ ] Benchmark uses production corpus, filters, churn, and concurrency.
- [ ] Quality, latency, lifecycle lag, cost, and isolation gates are set.
- [ ] Restore, deletion, and portability are proven.
- [ ] Selection ADR records evidence and re-evaluation triggers.

## References

- [PostgreSQL pgvector](https://github.com/pgvector/pgvector)
- [ANN Benchmarks methodology](https://ann-benchmarks.com/) *(comparative benchmark; reproduce on own workload)*
- [NIST SP 800-53 Rev. 5](https://doi.org/10.6028/NIST.SP.800-53r5)

## Changelog

- **1.0.0 — 2026-07-16:** Replaced vendor/count mandates with workload evidence.
