# Enterprise: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce enterprise gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | block unregistered model or use-case identifiers | fail closed without creating an effect |
| domain-gate | enforce data-class and regional routing policy | fail closed without creating an effect |
| closure | trip kill switch on prohibited output or control failure | disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Enterprise hooks contract, gate 1 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
# oaies-enterprise: evaluate the three versioned policy rules documented above.
policy_check --pattern "enterprise" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Enterprise hooks verification records raw evidence for "inventory completeness = 100%" and invokes "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" when the threshold is not demonstrated.

## Tradeoffs

Enterprise hooks deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise hooks rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise hooks governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: block unregistered model or use-case identifiers
- [ ] Automated test proves: enforce data-class and regional routing policy
- [ ] Automated test proves: trip kill switch on prohibited output or control failure

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
