# Evaluation Metrics Catalog

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Define claim-level faithfulness, groundedness, context recall, hallucination rate, and decision rules.

## Why
Metric names are often inconsistent; operational definitions prevent score laundering.

## When
Use when specifying evaluation plans and dashboards.

## How
1. Faithfulness: supported claims divided by verifiable claims in supplied context.
2. Groundedness: weighted support score for each externally checkable claim against approved sources.
3. Context recall: required reference facts retrieved divided by all required facts.
4. Hallucination rate: unsupported or contradicted claims divided by verifiable claims; also report severe-case rate.
5. Report numerator, denominator, abstentions, confidence interval, slice results, judge version, and threshold rationale.

## Evidence contract
The decision record is the **metric specification registry**. It records metric ID; unit; numerator; denominator; abstention rule; severity weighting; confidence method; owner. The measurement owner owns completeness; the evidence is invalid when an implementation changes without a metric-version change. Dataset, annotation, rubric, scorer, and run identifiers are content-addressed so a disputed result can be replayed.

## Failure response and recovery
**Trigger:** denominator integrity fails or a severe error is averaged away.

**Immediate response:** invalidate the report and recompute from claim-level annotations. Preserve the metric specification registry, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to evaluation metrics catalog.

## Decision authority
The **measurement owner** accepts the operational decision. The **domain risk reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Evaluation automation enforces the approved statistical rule; the evaluation and domain owners decide ambiguity, severe-case disposition, and residual uncertainty.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Claim-level metrics | Actionable diagnosis | Annotation cost |
| Aggregate score | Simple trend | Masks severe tails |

## Anti-patterns
- A universal 0.85 threshold.
- Counting unverifiable style statements as hallucinations.
- Reporting means without denominators.

## Enterprise considerations
- Set stricter gates for safety-critical claims.
- Provide human appeal for consequential outcomes.

## Framework relationship
For **Evaluation Metrics Catalog**, this informative profile governs measurement evidence for the stated decision only; it neither makes an evaluator authoritative nor transfers fitness decisions to a framework.

| Source | Relationship for Evaluation Metrics Catalog | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.5 | Interpret outcomes against the documented use case, sampling frame, and uncertainty. |
| ISO/IEC 42001 | 42001 clause 9.1 | Use management-system evidence only within the organization’s declared scope and independent assessment process. |
| Domain threat/control source | Misinformation and overreliance metrics | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Definitions are fixed.
- [ ] Severe failures are separately gated.
- [ ] Confidence intervals are reported.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the metric specification registry, failure trigger, accountable decision, and scoped framework relationships for evaluation metrics catalog. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
