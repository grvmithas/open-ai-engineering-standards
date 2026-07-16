# Architecture: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce architecture gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | reject ADRs without alternatives and measurable consequences | fail closed without creating an effect |
| domain-gate | run dependency and boundary fitness functions | fail closed without creating an effect |
| closure | reopen decisions when documented assumptions expire | supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Architecture hooks contract, gate 1 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
# oaies-architecture: evaluate the three versioned policy rules documented above.
policy_check --pattern "architecture" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Architecture hooks verification records raw evidence for "all priority scenarios have measurable responses" and invokes "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" when the threshold is not demonstrated.

## Tradeoffs

Architecture hooks deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture hooks rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture hooks governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: reject ADRs without alternatives and measurable consequences
- [ ] Automated test proves: run dependency and boundary fitness functions
- [ ] Automated test proves: reopen decisions when documented assumptions expire

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
