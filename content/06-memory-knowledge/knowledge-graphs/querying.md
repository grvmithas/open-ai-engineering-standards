# Knowledge Graph Querying

> **Version:** 1.0.0 | **Last updated:** 2026-07-16 | **Maturity:** Emerging for LLM-generated queries

## Purpose

Use graph traversal safely for entity, relationship, temporal, and multi-hop retrieval.

## Why

Graph retrieval can answer queries poorly served by lexical or vector search, but unconstrained generated queries can leak data or produce expensive traversals.

## How

Map each validated query class to parameterized templates or a constrained query AST. Resolve entities within tenant scope, apply node/edge ACL and temporal predicates before traversal, enforce path depth/cardinality/cost limits, and return source-backed subgraphs. If an LLM proposes a query, parse, authorize, estimate, and execute it through a read-only gateway. Evaluate against vector/keyword baselines.

## Tradeoffs

Templates are safer and predictable but less flexible. Generated graph queries remain emerging and require a sandbox and deterministic policy.

## Anti-patterns

- Executing raw model-generated Cypher/SPARQL.
- Applying ACL only to final nodes.
- Presenting a path as causal evidence without source support.

## Enterprise Considerations

Use read replicas, workload limits, tenant partitions, query audit logs, and denial-of-wallet alerts.

## Checklist

- [ ] Traversal is ACL- and time-filtered at every hop.
- [ ] Queries are parameterized, bounded, and read-only.
- [ ] Returned edges resolve to authorized evidence.
- [ ] Graph retrieval demonstrates benefit per query class.

## References

- [W3C SPARQL 1.1 Query](https://www.w3.org/TR/sparql11-query/)
- [OWASP Query Parameterization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)

## Changelog

- **1.0.0 — 2026-07-16:** Initial emerging-practice standard.
