# Evaluation Framework Selection

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Define a qualified evaluation stack instead of selecting tools by popularity.

## Why
Different evaluators expose different failure modes; no single score establishes fitness.

## When
Use during platform selection and provider requalification.

## How
1. Inventory deterministic, reference-based, model-graded, security, latency, and cost checks.
2. Run a time-boxed bake-off on the same versioned golden set.
3. Measure agreement with blinded human labels, failure-detection rate, latency, cost, exportability, and data handling.
4. Select DeepEval for code-native gates, RAGAS for retrieval diagnostics, Promptfoo for adversarial matrices, and OpenTelemetry-compatible tracing for portable evidence.
5. Pin versions and requalify on material upgrades.

## Qualified tool roles
| Tool | Normative role | Release use | Do not use as |
|---|---|---|---|
| DeepEval | Code-native test orchestration and regression assertions | Pull-request and scheduled gates | Sole RAG retrieval diagnosis |
| RAGAS | Retrieval and generation diagnostics for RAG pipelines | Pre-release comparison and production sampling | Sole security gate |
| Promptfoo | Provider/prompt matrices and adversarial testing | Security campaigns and cross-provider qualification | Sole proof of business correctness |

## Evidence contract
The decision record is the **evaluator qualification report**. It records tool/version; blinded corpus; false-pass rate; false-fail rate; latency; cost; export test. The evaluation platform owner owns completeness; the evidence is invalid when human labels or evaluator configuration change. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** false-pass rate exceeds the approved tolerance.

**Immediate response:** remove the evaluator from blocking gates and replay decisions with the prior qualified version. Preserve the evaluator qualification report, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to evaluation framework selection.

## Decision authority
The **evaluation platform owner** accepts the operational decision. The **domain label owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Specialized stack | Broad diagnostic coverage | More integration work |
| Single framework | Simpler operations | Blind spots and lock-in |

## Anti-patterns
- Using a judge score without calibration.
- Hard-coding universal thresholds without baseline evidence.

## Enterprise considerations
- Keep raw results exportable.
- Contractually restrict provider use of evaluation data.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Evaluation Framework Selection | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.6 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Evaluator compromise is treated as supply-chain risk | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Tool roles are documented.
- [ ] Calibration is repeated on drift.
- [ ] Versions are pinned and SBOM-recorded.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the evaluator qualification report, failure trigger, accountable decision, and scoped framework relationships for evaluation framework selection. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
