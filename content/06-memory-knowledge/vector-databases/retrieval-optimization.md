# Retrieval Optimization and Mode Selection

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Select vector, keyword, graph, and fused retrieval by evaluated query class.

## Why

No retrieval mode dominates all workloads. Exact identifiers favor lexical search, paraphrases favor dense retrieval, and explicit multi-hop relationships may favor graphs.

## How

| Mode | Select for | Primary failure |
|---|---|---|
| Keyword/BM25 | identifiers, names, quoted text, rare terms | vocabulary mismatch |
| Dense vector | semantic similarity, paraphrase | exactness, freshness, opaque neighbors |
| Graph | explicit entity relations and bounded multi-hop | ontology/edge quality and cost |
| Hybrid fusion | mixed query classes with measured complementary errors | latency and tuning complexity |

Route only with a deterministic classifier or validated query features. Apply ACL/time filters inside each retriever, normalize/fuse scores with a versioned method, rerank authorized candidates, deduplicate by source, and tune top-k/reranking using segmented evaluation. Fall back or abstain when confidence and evidence are insufficient.

## Tradeoffs

Fusion can improve robustness but costs more. Add each retriever only when its incremental quality exceeds its latency and operational budget.

## Anti-patterns

- “Hybrid by default” without ablation evidence.
- Comparing incomparable raw scores across retrievers.
- Optimizing average recall while exact-ID or ACL cases fail.

## Enterprise Considerations

Budget per tenant and query class, log routing/fusion versions, and monitor drift, cost, and unauthorized-candidate counts.

## Checklist

- [ ] Query taxonomy and per-mode baselines exist.
- [ ] ACL and temporal filters precede scoring.
- [ ] Fusion/reranking is versioned and ablated.
- [ ] Quality, latency, cost, and abstention gates pass by segment.

## References

- [BEIR benchmark](https://arxiv.org/abs/2104.08663)
- [Reciprocal Rank Fusion](https://doi.org/10.1145/1571941.1572114)

## Changelog

- **1.0.0 — 2026-07-16:** Initial retrieval-selection standard.
