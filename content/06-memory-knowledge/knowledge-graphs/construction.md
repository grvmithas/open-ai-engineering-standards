# Knowledge Graph Construction

> **Version:** 1.0.0 | **Last updated:** 2026-07-16 | **Maturity:** Emerging for LLM-assisted construction

## Purpose

Construct relationship-centric knowledge with explicit ontology, provenance, and review.

## Why

Graphs help multi-hop, entity, and relationship queries, but LLM extraction can create plausible unsupported edges at scale.

## How

Start only after relationship-heavy queries beat document retrieval in a pilot. Define competency questions and a versioned ontology; assign stable entity IDs. Extract candidate entities/relations with source spans, confidence, extractor version, tenant/ACL, and valid time. Validate schema deterministically, reconcile entities conservatively, and require human or trusted-rule approval for high-impact edges. Publish immutable graph versions and rollback manifests.

## Tradeoffs

Graphs improve explicit traversal and conflict representation but add ontology, entity-resolution, and stewardship cost. Keep source documents authoritative.

## Anti-patterns

- Creating edges without source-span provenance.
- Global fuzzy entity merges.
- Building a graph because it appears more advanced than hybrid search.

## Enterprise Considerations

Tenant-scope nodes and edges, govern ontology changes, and audit merges/splits. LLM-generated graph construction remains emerging and requires corpus-specific validation.

## Checklist

- [ ] Competency questions justify the graph.
- [ ] Ontology and entity identity are versioned.
- [ ] Every edge has source, time, ACL, and extraction provenance.
- [ ] Merge, rollback, and correction tests pass.

## References

- [W3C RDF 1.1 Concepts](https://www.w3.org/TR/rdf11-concepts/)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [GraphRAG paper](https://arxiv.org/abs/2404.16130) *(emerging research)*

## Changelog

- **1.0.0 — 2026-07-16:** Initial emerging-practice standard.
