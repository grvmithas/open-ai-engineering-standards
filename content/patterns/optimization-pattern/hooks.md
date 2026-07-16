# Optimization: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce optimization gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject benchmarks without baseline and workload fingerprint | fail closed without creating an effect |
| domain-gate | fail CI when correctness or p99 guardrails regress | fail closed without creating an effect |
| closure | auto-disable canary on saturation or error-budget threshold | disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Optimization hooks contract, gate 1 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
# oaies-optimization: evaluate the three versioned policy rules documented above.
policy_check --pattern "optimization" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Optimization hooks verification records raw evidence for "approved effect size reached with confidence interval" and invokes "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" when the threshold is not demonstrated.

## Tradeoffs

Optimization hooks deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization hooks rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization hooks governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject benchmarks without baseline and workload fingerprint
- [ ] Automated test proves: fail CI when correctness or p99 guardrails regress
- [ ] Automated test proves: auto-disable canary on saturation or error-budget threshold

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
