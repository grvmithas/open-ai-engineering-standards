# Migration: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce migration gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | block destructive contract before rollback expiry | fail closed without creating an effect |
| domain-gate | pause backfill when mismatch or lag thresholds fail | fail closed without creating an effect |
| closure | require restore drill evidence before first production write | stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Migration hooks contract, gate 1 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
# oaies-migration: evaluate the three versioned policy rules documented above.
policy_check --pattern "migration" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Migration hooks verification records raw evidence for "record and monetary reconciliation = 100%" and invokes "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" when the threshold is not demonstrated.

## Tradeoffs

Migration hooks deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration hooks rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration hooks governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: block destructive contract before rollback expiry
- [ ] Automated test proves: pause backfill when mismatch or lag thresholds fail
- [ ] Automated test proves: require restore drill evidence before first production write

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
