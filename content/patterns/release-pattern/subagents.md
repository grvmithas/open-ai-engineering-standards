# Release Pattern — Subagents

> **Pattern:** Release  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Artifact Verifier | Confirms digest, provenance, SBOM policy | Before go/no-go | Verification receipt |
| Gate Aggregator | Collates CI/security/quality gates for digest | Before go/no-go | Gate matrix |
| Canary Controller | Executes progressive exposure / flag stages | After GO | Stage timestamps + metric snapshots |
| Rollback Operator | Disables flag / redeploys prior digest | On abort or failed soak | Recovery verification |

## Artifact Verifier contract

- Reject releases identified only by mutable tags
- Provenance must cover the exact digest
- SBOM policy fail ⇒ NO_GO unless expiring exception exists

## Gate Aggregator contract

- Gates must reference the same digest (no “close enough” builds)
- Stale gates (artifact rebuilt) invalidate the matrix
- Surface skipped jobs explicitly

## Canary Controller contract

- Load abort criteria before stage 1; do not accept mid-flight edits
- Emit continue / hold / abort with timestamps
- On abort, hand off immediately to Rollback Operator

## Rollback Operator contract

- Prefer flag disable first when safe; then prior digest if needed
- Never run contract-phase migrations during abort
- Verify recovery against pre-canary baseline before declaring success
