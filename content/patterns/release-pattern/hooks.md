# Release: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce release gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject unsigned or mismatched artifacts | fail closed without creating an effect |
| domain-gate | block promotion until hold period and signal gates pass | fail closed without creating an effect |
| closure | automatically abort on SLO burn or security signal | halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Release hooks contract, gate 1 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
# oaies-release: evaluate the three versioned policy rules documented above.
policy_check --pattern "release" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Release hooks verification records raw evidence for "artifact-to-runtime digest match = 100%" and invokes "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" when the threshold is not demonstrated.

## Tradeoffs

Release hooks deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release hooks rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release hooks governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject unsigned or mismatched artifacts
- [ ] Automated test proves: block promotion until hold period and signal gates pass
- [ ] Automated test proves: automatically abort on SLO burn or security signal

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
