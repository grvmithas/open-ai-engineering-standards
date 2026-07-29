# Continuous Evaluation

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Detect quality drift between releases and close the production-to-test feedback loop.

## Why
Provider behavior, traffic, knowledge, and adversaries change without repository changes.

## When
Run on each change, scheduled canaries, sampled production traffic, and after incidents.

## How
1. Gate pull requests on deterministic and compact regression suites.
2. Run full suites nightly and on provider/model notices.
3. Sample production by risk and failure signals; redact before review.
4. Compare to a declared baseline with uncertainty and minimum sample size.
5. Freeze rollout, roll back, or degrade safely when guardrails breach; open and learn from an incident.

## Execution matrix
| Trigger | Dataset | Decision method | Maximum runtime | Failure action |
|---|---|---|---|---|
| Pull request | Deterministic checks + compact severe/sentinel set | Zero severe failures; paired non-inferiority on primary metric | 15 minutes | Block merge |
| Staging promotion | Full release-regression + adversarial set | Predeclared quality/safety/latency/cost gates | 2 hours | Block promotion |
| Canary | Risk-enriched live sample + sentinels | Group-sequential guardrails and SLO burn | Declared canary horizon | Auto-abort to prior release |
| Nightly | Full qualified suite | Trend and change-point review | Batch window | Open evaluation incident/ticket by severity |
| Provider/model notice | Contract, sentinel, safety, and route qualification sets | Requalification against current production baseline | Before provider deadline | Freeze affected route |
| Production complaint/incident | Affected trace cohort + matched controls | Human adjudication and causal comparison | Incident SLA | Contain, correct, add regression |

## Statistical control
Use the user, conversation, document, or workflow as the independent unit; turns from the same unit are clustered. Persist sampling probability for risk-enriched production samples and apply inverse-probability weighting to population estimates.

- Binary rates: Wilson interval; severe events also report exact count and exposure.
- Continuous bounded scores: paired stratified bootstrap with at least 10,000 resamples.
- Baseline comparison: predeclared non-inferiority margin and lower confidence bound.
- Multiple primary/slice gates: Holm correction or explicitly exploratory labels.
- Repeated canary looks: group-sequential boundary or alpha-spending schedule.
- Drift: monitor locked sentinels with EWMA/CUSUM configured from stable baseline variance; confirm alerts with adjudicated samples before long-term model conclusions.

Do not compare runs with different datasets, judge contracts, sampling frames, or provider/model aliases as if only the candidate changed. Record a comparability flag and force re-baselining when causal isolation is lost.

## Run ledger schema
```json
{
  "run_id": "eval-2026-07-16-1842",
  "trigger": "canary",
  "candidate_release": "sha256:...",
  "baseline_release": "sha256:...",
  "dataset_manifest": "sha256:...",
  "judge_contract": "faithfulness-claims/3",
  "sampling_policy": "risk-enriched/2",
  "independent_unit": "conversation_id",
  "sample_size": 812,
  "primary_delta": -0.006,
  "confidence_interval_95": [-0.014, 0.002],
  "non_inferiority_margin": -0.02,
  "severe_failures": 0,
  "decision": "continue_canary",
  "decision_rule_version": "canary-gate/4",
  "reviewer": "evaluation-owner-role"
}
```

## Canary abort runbook
1. Stop new assignment to candidate while preserving stable cohort IDs.
2. Confirm rule inputs, telemetry freshness, and evaluator health; a broken evaluator does not authorize continued exposure.
3. Roll back candidate aliases/routes and cancel or checkpoint in-flight agent work.
4. Enumerate exposed users, decisions, side effects, and severe cases.
5. Human-adjudicate severe/contested cases and correct downstream actions.
6. Open an incident for material harm, security, data, financial, or authorization impact.
7. Add confirmed failures to the incident-sentinel partition and require a new release gate.

## Evidence contract
The decision record is the **evaluation run ledger**. It records release ID; dataset hash; sampling frame; sample size; baseline delta; interval; decision; reviewer. The production evaluation owner owns completeness; the evidence is invalid when sampling or baseline comparability is broken. Dataset, annotation, rubric, scorer, and run identifiers are content-addressed so a disputed result can be replayed.

## Failure response and recovery
**Trigger:** a severe case occurs or a guardrail crosses its sequential boundary.

**Immediate response:** halt rollout, preserve sampled traces, restore the previous route, and seed the incident case into regression. Preserve the evaluation run ledger, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to continuous evaluation.

## Decision authority
The **production evaluation owner** accepts the operational decision. The **on-call incident commander** provides independent challenge for high-risk scope, failed gates, or exceptions. Evaluation automation enforces the approved statistical rule; the evaluation and domain owners decide ambiguity, severe-case disposition, and residual uncertainty.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Frequent evaluation | Fast detection | Cost and reviewer load |
| Sparse evaluation | Lower cost | Longer unsafe exposure |

## Anti-patterns
- Testing only when prompts change.
- Alerting on noisy point estimates.
- Reusing production data without authorization.

## Enterprise considerations
- Use risk-weighted sampling.
- Route telemetry through approved regions and processors.

## Framework relationship
For **Continuous Evaluation**, this informative profile governs measurement evidence for the stated decision only; it neither makes an evaluator authoritative nor transfers fitness decisions to a framework.

| Source | Relationship for Continuous Evaluation | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 3; MANAGE 4 | Interpret outcomes against the documented use case, sampling frame, and uncertainty. |
| ISO/IEC 42001 | 42001 clauses 9.1 and 10.2 | Use management-system evidence only within the organization’s declared scope and independent assessment process. |
| Domain threat/control source | Monitoring and incident response for LLM risks | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] PR and scheduled gates run.
- [ ] Alerts name an owner.
- [ ] Rollback is exercised.
- [ ] Provider requalification is scheduled.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the evaluation run ledger, failure trigger, accountable decision, and scoped framework relationships for continuous evaluation. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
