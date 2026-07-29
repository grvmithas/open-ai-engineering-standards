# AIES Evaluation Foundation

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This evaluation foundation separates system-component failures from final-answer failures using versioned cases and deterministic offline checks. Paid models and provider credentials are optional extensions, never prerequisites for the default quality gate.

## Why

A single relevance score hides the failure boundary. Retrieval can leak a forbidden document while the answer appears correct; a correct answer can follow an unauthorized tool call; and a valid final response can still lack the trace needed to prove control order.

## How

Run the committed offline suite:

```bash
node --test eval/test/*.test.mjs
node eval/run.mjs \
  --dataset eval/datasets/v1 \
  --candidates eval/fixtures/candidates.pass.jsonl
```

The runner evaluates each candidate independently across seven dimensions:

| Dimension | Deterministic gate |
|---|---|
| Retrieval | Required IDs present; forbidden IDs absent |
| Routing | Selected route belongs to the case allowlist |
| Tools | Required calls present; every call allowlisted |
| Memory | Write policy respected; forbidden values absent |
| Policy | Actual allow/deny decision equals the expected decision |
| Trace | Required spans, valid IDs, and authorization-before-retrieval order |
| Final output | Schema version and required/forbidden content assertions |

Datasets are immutable within a version. Correct an existing case by publishing `datasets/v2`; do not silently reinterpret historical release evidence. Candidate JSONL records use `{ "id": "...", "actual": { "<dimension>": ... } }`. Missing candidates and missing dimension outputs fail closed.

### Judge calibration procedure

Do not put an uncalibrated LLM judge in a release gate. Use this reproducible procedure when deterministic assertions cannot represent a quality property:

1. Freeze the judge provider, model identifier, prompt, decoding parameters, rubric, and response schema.
2. Sample cases by category and risk tier. Keep policy-sensitive and adversarial prevalence explicit; do not use convenience sampling.
3. Have at least two qualified reviewers independently label each output `accept` or `reject` without seeing judge scores.
4. Resolve disagreements through a third reviewer and retain the original labels, adjudication, and reviewer role—not reviewer identity—in the calibration artifact.
5. Split records by case ID into calibration and untouched holdout sets before selecting a threshold.
6. Record one JSONL calibration row per adjudicated output:

```json
{"caseId":"case-001","gold":"reject","judgeScore":0.42}
```

7. Select the threshold on the calibration split:

```bash
node eval/calibrate.mjs calibration.jsonl > calibration-report.json
```

8. Lock the selected threshold, then measure sensitivity, specificity, agreement, and false-accept count once on the holdout split. Release only if the predeclared policy-sensitive false-accept limit and all other acceptance criteria pass.
9. Store dataset digest, split manifest, labels, judge configuration, calibration report, and holdout report together.
10. Recalibrate on any model, prompt, rubric, language mix, policy, or material dataset change.

`calibrate.mjs` maximizes balanced accuracy and breaks ties toward specificity and then the higher threshold. Its output explicitly labels calibration-set metrics as estimates. This repository commits no judge scores or claimed quality levels; teams must generate and review their own artifacts.

## Tradeoffs

- Lexical final-output checks are reproducible and cheap but cannot establish semantic quality.
- Exact document and tool identifiers require stable observability contracts.
- Seven independent gates produce better diagnosis but require candidate adapters to capture intermediate state.
- Balanced-accuracy threshold selection protects both classes but does not encode organization-specific harm costs; the holdout acceptance policy must do that.

## Anti-patterns

- Do not average dimensions into one score that allows a policy or authorization failure to be offset by fluent output.
- Do not tune thresholds on the holdout set.
- Do not report calibration-set metrics as expected production performance.
- Do not send policy-sensitive data to a hosted judge without an approved data-processing boundary.
- Do not make paid API keys mandatory for pull-request tests.
- Do not mutate a released dataset version.

## Enterprise considerations

- Treat test prompts, retrieved documents, intermediate tool state, and judge rationales according to their source data classification.
- Require provenance and SHA-256 digests for datasets, candidate outputs, judge configuration, and reports in release evidence.
- Track results by risk tier, language, tenant class, and policy domain; aggregate rates alone can hide concentrated harm.
- Gate judge changes through model-risk review and maintain a deterministic fallback gate when a provider is unavailable.
- Retain reviewer adjudication under access controls and monitor reviewer agreement for rubric drift.

## Checklist

- [ ] Normal, edge, adversarial, and policy-sensitive categories are represented.
- [ ] Retrieval, routing, tools, memory, policy, trace, and final output are evaluated separately.
- [ ] Missing intermediate outputs fail closed.
- [ ] Offline tests pass with no network or provider keys.
- [ ] Dataset version and digest are retained with the result.
- [ ] Judge configuration is frozen before labeling.
- [ ] Calibration and holdout cases are separated by case ID.
- [ ] No calibration result is presented as production performance.
- [ ] Policy-sensitive false accepts meet a predeclared limit.
- [ ] Dataset changes create a new version.

## Changelog

### 1.0.0 — 2026-07-16

- Replaced the paid-key sample test with versioned, dependency-free component evaluations.
- Added normal, edge, adversarial, and policy-sensitive datasets, positive and negative candidates, and deterministic calibration tooling.
