# Prompt Regression Gates

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Block releases that exceed justified quality, safety, latency, or cost tolerances.

## Why
A quality gain that violates safety or budget is not a valid improvement.

## When
Use on prompt, model, retrieval, tool, policy, and provider changes.

## How
1. Declare baseline and non-inferiority margin.
2. Run deterministic checks first, then model-graded and adversarial suites.
3. Evaluate risk slices and severe-case zero-tolerance rules.
4. Require human disposition for flaky or disputed failures.
5. Store signed gate result and prevent bypass without expiring exception.

## Gate configuration
```yaml
gate_version: prompt-release/5
candidate_manifest: sha256:...
baseline_manifest: sha256:...
dataset_manifest: sha256:...
stages:
  deterministic:
    - schema_valid
    - required_variables_resolve
    - forbidden_secret_patterns_absent
    - tool_contracts_compatible
  severe:
    allowed_failures: 0
    cases: [authorization-bypass, secret-exfiltration, harmful-side-effect]
  quality:
    primary_metric: task_success
    paired_non_inferiority_margin: -0.02
    confidence: 0.95
    bootstrap_resamples: 10000
  slices:
    required: [locale, risk_tier, long_context, prior_incident]
    correction: holm
    minimum_cases: 50
  operations:
    p95_latency_delta_max: 0.10
    unit_cost_delta_max: 0.15
    malformed_output_rate_max: 0.005
exception:
  permitted_for: [latency, cost, non_severe_quality]
  prohibited_for: [severe, authorization, data_boundary]
  maximum_days: 14
```

Values are examples. The gate owner replaces them with measured service-specific margins before observing candidate results.

## Gate ordering
Run schema, static policy, tool compatibility, and deterministic security assertions first. A deterministic failure stops expensive model calls. Next run severe incident and abuse sentinels. Only then run semantic quality, slice, latency, and cost evaluations. Retries retain the original failing result and reason; a later pass does not erase flakiness.

## Signed decision record
```json
{
  "gate_version": "prompt-release/5",
  "candidate_manifest": "sha256:...",
  "baseline_manifest": "sha256:...",
  "dataset_manifest": "sha256:...",
  "evaluator_versions": ["task-success/4", "judge/3"],
  "results_uri": "immutable://...",
  "decision": "blocked",
  "failed_rules": ["severe.authorization-bypass"],
  "executed_at": "2026-07-16T12:00:00Z",
  "runner_identity": "ci-workload-id",
  "signature": "sigstore-or-enterprise-signature"
}
```

## Operator runbook
1. Confirm candidate/baseline/dataset digests and runner integrity.
2. Reproduce the failing case once under the same seed and provider version; preserve both outcomes.
3. Classify as product defect, evaluator defect, infrastructure defect, or nondeterminism.
4. Severe/security failures remain blocked and open incident or security handling when production exposure exists.
5. For evaluator/infrastructure defects, repair and issue a new evaluator/gate version; never edit a historical result.
6. Exceptions record business need, residual risk, compensating control, owner, approvers, exposure telemetry, expiry, and exit.

## Evidence contract
The decision record is the **gate decision record**. It records baseline; non-inferiority margins; per-slice results; retries; severe failures; exception expiry. The evaluation gate owner owns completeness; the evidence is invalid when the suite, scorer, or baseline changes without re-baselining. Store repository commit, built envelope digest, registry version, environment alias, and signer as one release lineage.

## Failure response and recovery
**Trigger:** a zero-tolerance case fails or confidence bound exceeds margin.

**Immediate response:** block promotion; an expiring exception cannot waive severe cases. Preserve the gate decision record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt regression gates.

## Decision authority
The **evaluation gate owner** accepts the operational decision. The **risk acceptance authority** provides independent challenge for high-risk scope, failed gates, or exceptions. Promotion services may verify signatures and gates; named release and risk owners decide exceptions and production exposure.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Strict gate | Predictable quality | More blocked changes |
| Advisory gate | Faster flow | Uncontrolled regressions |

## Anti-patterns
- Averaging away catastrophic failures.
- Silently retrying until a pass.

## Enterprise considerations
- Audit bypasses.
- Set risk-specific tolerances.

## Framework relationship
**Prompt Regression Gates** is informative prompt-supply-chain guidance. Qualification remains specific to the rendered envelope, model, tools, data, and intended task.

| Source | Relationship for Prompt Regression Gates | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.6; MANAGE 1.3 | Apply governance outcomes to the complete execution envelope, not prompt text alone. |
| ISO/IEC 42001 | 42001 clauses 8.4 and 9.1 | Management-system alignment depends on controlled authoring, approval, distribution, and corrective action. |
| Domain threat/control source | Security assertions mapped to the current OWASP LLM risks | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All material changes trigger gate.
- [ ] Exceptions expire.
- [ ] Severe failures block.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the gate decision record, failure trigger, accountable decision, and scoped framework relationships for prompt regression gates. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
