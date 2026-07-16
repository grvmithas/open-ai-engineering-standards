# Legacy Modernization: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce legacy modernization gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | block modernization without characterization coverage | fail closed without creating an effect |
| domain-gate | compare old/new business outputs in shadow | fail closed without creating an effect |
| closure | reject legacy deletion while consumers or rollback window remain | flip the strangler route to the legacy implementation and replay buffered work after reconciliation |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Legacy Modernization hooks contract, gate 1 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
# oaies-legacy-modernization: evaluate the three versioned policy rules documented above.
policy_check --pattern "legacy-modernization" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Legacy Modernization hooks verification records raw evidence for "characterized critical behavior = 100%" and invokes "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" when the threshold is not demonstrated.

## Tradeoffs

Legacy Modernization hooks deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization hooks rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization hooks governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: block modernization without characterization coverage
- [ ] Automated test proves: compare old/new business outputs in shadow
- [ ] Automated test proves: reject legacy deletion while consumers or rollback window remain

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
