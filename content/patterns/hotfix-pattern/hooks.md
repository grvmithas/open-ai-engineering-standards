# Hotfix: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce hotfix gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | require incident ID and commander for emergency merge | fail closed without creating an effect |
| domain-gate | enforce file/scope allowlist and two-person review | fail closed without creating an effect |
| closure | open RCA and expiry issue when hotfix deploys | execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Hotfix hooks contract, gate 1 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
# oaies-hotfix: evaluate the three versioned policy rules documented above.
policy_check --pattern "hotfix" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Hotfix hooks verification records raw evidence for "time to containment meets severity target" and invokes "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" when the threshold is not demonstrated.

## Tradeoffs

Hotfix hooks deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix hooks rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix hooks governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: require incident ID and commander for emergency merge
- [ ] Automated test proves: enforce file/scope allowlist and two-person review
- [ ] Automated test proves: open RCA and expiry issue when hotfix deploys

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
