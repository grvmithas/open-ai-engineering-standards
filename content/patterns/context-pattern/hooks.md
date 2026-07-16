# Context: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce context gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject excerpts without revision and source ID | fail closed without creating an effect |
| domain-gate | expire manifests when tracked revisions change | fail closed without creating an effect |
| closure | scan context for secrets and prompt-injection instructions | invalidate the manifest, purge derived caches, and rebuild from authoritative revisions |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Context hooks contract, gate 1 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
# oaies-context: evaluate the three versioned policy rules documented above.
policy_check --pattern "context" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Context hooks verification records raw evidence for "required-decision source recall = 100%" and invokes "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" when the threshold is not demonstrated.

## Tradeoffs

Context hooks deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context hooks rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context hooks governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject excerpts without revision and source ID
- [ ] Automated test proves: expire manifests when tracked revisions change
- [ ] Automated test proves: scan context for secrets and prompt-injection instructions

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
