# Planner: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce planner gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject plans containing unresolved blocking decisions | fail closed without creating an effect |
| domain-gate | verify every changed path exists or is explicitly new | fail closed without creating an effect |
| closure | require a test and rollback entry for every increment | stop implementation, revert partial increments, and return to the last approved plan revision |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Planner hooks contract, gate 1 is evidenced by "decision completeness = 100%"; failure invokes this domain recovery: Stop implementation, revert partial increments, and return to the last approved plan revision.
# oaies-planner: evaluate the three versioned policy rules documented above.
policy_check --pattern "planner" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Planner hooks verification records raw evidence for "decision completeness = 100%" and invokes "Stop implementation, revert partial increments, and return to the last approved plan revision" when the threshold is not demonstrated.

## Tradeoffs

Planner hooks deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner hooks rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner hooks governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject plans containing unresolved blocking decisions
- [ ] Automated test proves: verify every changed path exists or is explicitly new
- [ ] Automated test proves: require a test and rollback entry for every increment

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
