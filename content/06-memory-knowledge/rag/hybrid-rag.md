# Hybrid RAG

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Fuse complementary retrieval modes when workload evidence shows that one mode is insufficient.

## Why

Lexical and dense retrieval often fail on different queries; graph retrieval may add value for explicit relationship questions. None is universally required.

## How

Establish per-mode baselines, then run complementarity and ablation analysis by query class. Execute only justified retrievers under identical pre-retrieval ACL/time filters. Fuse with a documented method such as reciprocal rank fusion, deduplicate source versions, rerank, enforce context diversity and token budget, and verify citations. Route simple query classes to one mode to control latency.

## Tradeoffs

Hybrid retrieval may improve coverage but increases infrastructure, tuning, latency, and incident surface. Graph retrieval is an emerging optional branch, not part of the minimum definition.

## Anti-patterns

- Claiming universal recall gains or fixed percentages.
- Sending every query to every index.
- Fusing candidates before each retriever enforces authorization.

## Enterprise Considerations

Apply consistent deletion and correction across all indexes, record per-retriever provenance, and reconcile tenant isolation and residency controls.

## Checklist

- [ ] Complementary errors justify each retriever.
- [ ] ACL and lifecycle controls are equivalent across indexes.
- [ ] Fusion, routing, and reranking are versioned.
- [ ] Ablation, latency, cost, and citation gates pass.

## References

- [Reciprocal Rank Fusion](https://doi.org/10.1145/1571941.1572114)
- [BEIR benchmark](https://arxiv.org/abs/2104.08663)

## Changelog

- **1.0.0 — 2026-07-16:** Replaced universal hybrid mandate with evidence-based fusion.
