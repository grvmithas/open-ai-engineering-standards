# Debug: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce debug gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | capture environment fingerprint before mutation | fail closed without creating an effect |
| domain-gate | reject fixes without a pre-fix failing test | fail closed without creating an effect |
| closure | remove diagnostic flags and PII before closure | revert probes and fix, restore the locked environment, and preserve diagnostic artifacts |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Debug hooks contract, gate 1 is evidenced by "reproduction rate before fix is recorded"; failure invokes this domain recovery: Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.
# oaies-debug: evaluate the three versioned policy rules documented above.
policy_check --pattern "debug" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Debug hooks verification records raw evidence for "reproduction rate before fix is recorded" and invokes "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" when the threshold is not demonstrated.

## Tradeoffs

Debug hooks deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug hooks rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug hooks governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: capture environment fingerprint before mutation
- [ ] Automated test proves: reject fixes without a pre-fix failing test
- [ ] Automated test proves: remove diagnostic flags and PII before closure

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
