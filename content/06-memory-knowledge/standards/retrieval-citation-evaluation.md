# Retrieval, Citation, and Compaction Evaluation

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Define workload-specific evidence for retrieval quality, citation support, and memory-compaction safety.

## Why

No universal recall threshold or framework score proves production readiness. Metrics depend on corpus, query distribution, risk, annotation quality, and the cost of misses.

## How

1. Create versioned, adjudicated query sets covering answerable, unanswerable, exact identifier, semantic, temporal, relationship, multilingual, ACL, stale, conflicting, and adversarial cases.
2. Evaluate retrieval separately with recall@k, precision@k, MRR/nDCG where relevant, latency, cost, ACL violations, freshness, and abstention behavior.
3. Evaluate generation for claim correctness, completeness, unsupported-claim rate, and source use; do not collapse all stages into one judge score.
4. Verify each citation deterministically resolves to an authorized source/version, then evaluate whether cited spans entail each material claim. Sample human review and calibrate model judges against it.
5. For compaction, replay tasks before/after compression and test retention of commitments, constraints, unresolved questions, entities, dates, quantities, provenance, permissions, and safety instructions. Measure omission, contradiction, and task-success delta.
6. Set gates from risk appetite and baseline performance; publish confidence intervals and segment results. Run offline gates on every material change and online canaries with rollback.

## Tradeoffs

High-quality labels are expensive and evolve with the corpus. They are more reliable than arbitrary percentages or uncalibrated LLM judges.

## Anti-patterns

- Using answer fluency as retrieval evaluation.
- Verifying only that a citation URL exists.
- Testing summaries with generic similarity, which can hide lost negation or numbers.

## Enterprise Considerations

Protect evaluation data from training leakage, report tenant/cohort performance, retain evaluator versions, and require domain experts for high-impact claims.

## Checklist

- [ ] Query set covers ACL, conflict, freshness, and adversarial cases.
- [ ] Retrieval and generation are evaluated independently.
- [ ] Citations resolve and support material claims.
- [ ] Judge calibration and human sampling are documented.
- [ ] Compaction loss and rollback gates pass.

## References

- [BEIR benchmark](https://arxiv.org/abs/2104.08663)
- [RAGAS](https://arxiv.org/abs/2309.15217) *(evaluation method; calibrate before use)*
- [NIST AI 600-1, Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
