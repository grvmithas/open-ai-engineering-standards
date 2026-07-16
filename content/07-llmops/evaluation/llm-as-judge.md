# LLM-as-Judge Standard

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Use model graders only when calibrated, bounded, and backed by human adjudication.

## Why
Judges exhibit position, verbosity, style, self-preference, and domain biases.

## When
Use for semantic qualities that deterministic checks cannot measure.

## How
1. Write atomic rubrics with observable anchors and counterexamples.
2. Blind provider identity and randomize candidate order.
3. Calibrate against a stratified, double-reviewed human set.
4. Report agreement, sensitivity, specificity, confidence interval, and subgroup error.
5. Escalate low-confidence or high-impact judgments to humans; requalify on judge/provider changes.

## Judge contract
Define one judge task per construct. A faithfulness judge must not simultaneously grade style, completeness, and safety.

```yaml
judge_contract:
  id: faithfulness-claims
  version: 3
  input_schema: claim_context_v2
  rubric_digest: sha256:...
  judge_provider: approved-provider-id
  judge_model: immutable-model-version
  decoding:
    temperature: 0
    max_output_tokens: 600
  labels: [supported, contradicted, not_in_context, unverifiable]
  abstain_label: insufficient_evidence
  severe_labels: [contradicted]
  adjudication_queue: eval-faithfulness-review
  calibration_dataset_digest: sha256:...
```

The output schema includes `label`, `rubric_anchor`, `evidence_spans`, and `confidence_bucket`. Do not request or retain hidden chain-of-thought. Evidence spans and rubric anchors are reviewable; free-form reasoning is not a control.

## Human reference panel
1. Draw a stratified sample across risk, language, task, output length, provider, failure history, and protected/affected groups where lawful and relevant.
2. Train at least two independent domain-qualified annotators on a codebook containing positive, negative, boundary, and abstention examples.
3. Blind annotators to candidate system, provider, experiment arm, and existing model score.
4. Measure human-human reliability before judge-human agreement. Use Krippendorff’s alpha for nominal/ordinal labels with missing judgments; report raw agreement and class prevalence as well.
5. Adjudicate disagreements without revealing the judge output. Preserve original labels and the adjudicated label.
6. Lock a calibration set and a separate temporal validation set. Never optimize rubrics against the final holdout.

There is no universal acceptable alpha or correlation. The evaluation owner sets a floor from decision impact and label ambiguity before observing candidate results. For a release-blocking severe-error detector, require a predeclared severe-class recall floor and upper confidence bound on false negatives; aggregate agreement cannot compensate for missing severe cases.

## Calibration and bias tests
| Test | Method | Failure signal | Required response |
|---|---|---|---|
| Judge-human agreement | Confusion matrix by label and slice; macro-F1; balanced accuracy; Krippendorff alpha | Predeclared lower confidence bound fails | Human-only disposition until recalibrated |
| Position bias | Evaluate A/B and B/A with fixed seed and blinded IDs | Preference changes beyond tolerance | Use order randomization and aggregate paired orders |
| Verbosity bias | Add semantically equivalent concise/verbose pairs | Longer answer wins without rubric basis | Add length counterexamples; constrain evidence extraction |
| Self-preference | Compare same-provider and cross-provider outputs with hidden origin | Material origin-linked error | Change judge or add independent ensemble/human review |
| Style leakage | Paraphrase formatting while preserving facts | Label changes on non-construct edits | Tighten atomic rubric and normalization |
| Prompt injection | Put adversarial instructions in candidate/context fields | Judge follows evaluated content | Encode fields as data, isolate instructions, reject malformed output |
| Temporal drift | Repeat locked sentinel set on schedule | CUSUM/EWMA or fixed-window boundary breaches | Suspend automation and requalify |

## Statistical decision method
- Compute percentile bootstrap confidence intervals using at least 10,000 **stratified resamples** at the unit of independence. Resample conversations or users, not individual turns, when observations are clustered.
- For binary pass/fail labels, report Wilson intervals for rates and exact severe-failure counts. A zero observed rate is not zero risk; report the rule-of-three upper bound when appropriate.
- Compare candidate and baseline on paired cases. Use a paired bootstrap for score deltas, McNemar’s test for paired binary outcomes, or a predeclared permutation test when distribution assumptions are weak.
- Pre-register the non-inferiority margin, primary metric, severe-case rules, minimum sample size, exclusions, and direction of improvement. Do not choose them after seeing results.
- Correct families of slice or metric hypotheses using Holm’s procedure, or declare exploratory analyses. Never gate on whichever slice happens to pass.
- For online or repeated looks, use an approved group-sequential design or alpha-spending rule. Repeated fixed-horizon testing inflates false positives.

## Release-gate example
```yaml
gate:
  primary:
    metric: judge_human_macro_f1
    lower_95_ci: ">= 0.82"
  severe_class:
    recall_lower_95_ci: ">= 0.95"
    false_negative_count: 0
  bias:
    position_flip_rate_upper_95_ci: "<= 0.03"
    verbosity_preference_delta_upper_95_ci: "<= 0.05"
  slices:
    minimum_cases_per_declared_slice: 50
    worst_slice_recall_lower_95_ci: ">= approved_floor"
  operations:
    malformed_output_rate_upper_95_ci: "<= 0.005"
    p95_latency_ms: "<= service_budget"
    cost_per_1000_judgments_usd: "<= approved_budget"
```

These numbers are examples, not OAIES universal thresholds. Replace them with pre-approved, domain-derived values and retain the rationale.

## Production sampling
Sample by risk and novelty, not only uniform traffic. Oversample low-confidence outputs, new model/provider versions, overrides, complaints, long contexts, tool use, and underrepresented slices. Apply inverse-probability weights when estimating population rates from an enriched sample. Keep an unweighted severe-case queue for incident handling.

Store: source trace ID; sampled unit; inclusion probability; candidate release; judge contract; raw structured judgment; human disposition; latency; tokens; cost; and redaction result. Human corrections feed the next calibration dataset only after provenance and contamination review.

## Evidence contract
The decision record is the **judge calibration dossier**. It records rubric/version; human panel labels; confusion matrix; Krippendorff alpha; bootstrap intervals; slice errors. The evaluation science lead owns completeness; the evidence is invalid when judge agreement or severe-case recall falls below its release floor. Dataset, annotation, rubric, scorer, and run identifiers are content-addressed so a disputed result can be replayed.

## Failure response and recovery
**Trigger:** calibration drift, provider change, or order-bias test failure.

**Immediate response:** disable automated disposition, route cases to blinded human adjudication, and replay impacted decisions. Preserve the judge calibration dossier, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llm-as-judge standard.

### Runbook
1. Freeze the judge contract and export the affected decision IDs.
2. Determine the first bad judgment using sentinels, deployment annotations, provider notices, and configuration history.
3. Disable automated blocking/approval; retain deterministic checks.
4. Route consequential and exposed severe cases to blinded human adjudication first.
5. Replay the impacted window with the last qualified judge and compare dispositions.
6. Correct downstream release, moderation, or user decisions; notify accountable owners and affected-person channels where required.
7. Add the failure to bias/sentinel suites, re-run calibration, and require independent approval before reactivation.

## Decision authority
The **evaluation science lead** accepts the operational decision. The **domain assurance chair** provides independent challenge for high-risk scope, failed gates, or exceptions. Evaluation automation enforces the approved statistical rule; the evaluation and domain owners decide ambiguity, severe-case disposition, and residual uncertainty.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Model judge | Scalable semantic review | Bias and variable cost |
| Human review | Contextual accountability | Slow and expensive |

## Anti-patterns
- Using correlation alone.
- Letting a generating model judge itself.
- Treating chain-of-thought as evidence.

## Enterprise considerations
- Do not use automated grades as sole adverse-decision evidence.
- Preserve appeal and correction paths.

## Framework relationship
For **LLM-as-Judge Standard**, this informative profile governs measurement evidence for the stated decision only; it neither makes an evaluator authoritative nor transfers fitness decisions to a framework.

| Source | Relationship for LLM-as-Judge Standard | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.6 and 2.7 | Interpret outcomes against the documented use case, sampling frame, and uncertainty. |
| ISO/IEC 42001 | 42001 clause 9.1 | Use management-system evidence only within the organization’s declared scope and independent assessment process. |
| Domain threat/control source | Overreliance and model-output manipulation | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Construct, labels, abstention, severe classes, and evidence spans are defined.
- [ ] Human-human reliability precedes judge-human comparison.
- [ ] Calibration and temporal validation sets are separate and content-addressed.
- [ ] Confidence intervals use the correct independent sampling unit.
- [ ] Paired comparison, multiplicity, and repeated-look methods are predeclared.
- [ ] Position, verbosity, self-preference, style, and injection tests pass.
- [ ] Severe-class recall and false negatives gate independently of average agreement.
- [ ] Production sampling records inclusion probability and risk enrichment.
- [ ] Human adjudication and replay runbooks have been exercised.

## References
- Zheng et al., [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) (accessed 2026-07-16).
- NIST, [AI RMF Playbook — Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure) (accessed 2026-07-16).
- Artstein and Poesio, [Inter-Coder Agreement for Computational Linguistics](https://aclanthology.org/J08-4004/) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added judge contracts, blinded human panels, bias tests, stratified bootstrap and paired decision methods, release gates, production sampling, and replay runbook. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
