# Advanced RAG

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Add query transformation, multi-query retrieval, reranking, and contextual assembly only where baseline error analysis justifies them.

## Why

Advanced stages can improve hard queries but also distort intent, multiply cost, and hide authorization or provenance failures.

## How

Classify baseline failures; add one versioned stage at a time and run ablations. Preserve the original query and authenticated scope through rewriting. Generate bounded variants, retrieve each under identical ACLs, fuse/deduplicate, rerank authorized candidates, and enforce evidence/citation checks. Cap expansion, latency, tokens, and retries; fall back to baseline or abstain on stage failure.

## Tradeoffs

Reranking and expansion improve selected query classes at higher latency and provider exposure. Use smaller deterministic stages where they meet the gate.

## Anti-patterns

- Letting a rewrite change tenant, time range, or requested action.
- Adding components without ablation results.
- Treating reranker score as factual support.

## Enterprise Considerations

Audit every transformation, review provider data handling for each stage, and monitor segmented regressions and denial-of-wallet attacks.

## Checklist

- [ ] Each stage maps to measured baseline failures.
- [ ] Original intent and ACL scope are immutable.
- [ ] Ablation proves incremental quality within budgets.
- [ ] Failure fallback and citation verification pass.

## References

- [Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)](https://arxiv.org/abs/2212.10496) *(research technique; evaluate locally)*
- [BEIR benchmark](https://arxiv.org/abs/2104.08663)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
