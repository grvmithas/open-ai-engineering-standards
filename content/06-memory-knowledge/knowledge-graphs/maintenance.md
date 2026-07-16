# Knowledge Graph Maintenance

> **Version:** 1.0.0 | **Last updated:** 2026-07-16 | **Maturity:** Emerging for automated repair

## Purpose

Keep graph knowledge current, correctable, and reconstructable as sources and ontologies change.

## Why

Stale edges and bad entity merges spread errors across many answers. Graph derivatives must never outlive source corrections or deletions.

## How

Use append/version semantics with valid and transaction time. Process source changes through lineage-aware deltas; tombstone descendants on deletion. Version ontology and migration code, detect orphaned nodes, contradictory edges, merge anomalies, provenance gaps, and ACL drift. Rebuild from authoritative sources on corruption and compare graph/query regressions before promotion.

## Tradeoffs

Incremental maintenance is faster but complex; full rebuilds are simpler and safer but expensive. Maintain both a delta path and tested rebuild path.

## Anti-patterns

- In-place edge mutation without history.
- Manual graph fixes that do not correct the source pipeline.
- Automated entity merge repair without review.

## Enterprise Considerations

Assign ontology and domain stewards, publish freshness/deletion SLOs, and retain migration/audit evidence. Automated LLM repair remains emerging.

## Checklist

- [ ] Temporal/version semantics and lineage are enforced.
- [ ] Corrections/deletions propagate to all graph descendants.
- [ ] Integrity, ACL-drift, and contradiction monitors run.
- [ ] Rebuild and ontology rollback are tested.

## References

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [W3C OWL 2 Overview](https://www.w3.org/TR/owl2-overview/)

## Changelog

- **1.0.0 — 2026-07-16:** Initial emerging-practice standard.
