# Root Cause: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce root cause gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject causal claims without evidence IDs | fail closed without creating an effect |
| domain-gate | flag person-blaming language and single-chain five-whys | fail closed without creating an effect |
| closure | block closure without action owner, due date, indicator, and review date | withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Root Cause hooks contract, gate 1 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
# oaies-root-cause: evaluate the three versioned policy rules documented above.
policy_check --pattern "root-cause" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Root Cause hooks verification records raw evidence for "100% causal edges cite evidence" and invokes "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" when the threshold is not demonstrated.

## Tradeoffs

Root Cause hooks deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause hooks rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause hooks governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject causal claims without evidence IDs
- [ ] Automated test proves: flag person-blaming language and single-chain five-whys
- [ ] Automated test proves: block closure without action owner, due date, indicator, and review date

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
