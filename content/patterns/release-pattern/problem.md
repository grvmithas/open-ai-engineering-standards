# Release Pattern — Problem

> **Pattern:** Release  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Shipping a green CI build to 100% of production without digest pinning, progressive exposure, and pre-declared abort criteria produces outages that exceed rollback RTO and destroy trust in the delivery pipeline.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Digest drift | Runtime image digest ≠ release record |
| Big-bang expose | Traffic jumps 0→100% with no canary hold |
| Soft abort | Thresholds rewritten after alerts fire |
| Rollback theater | “Rollback” is undocumented or never rehearsed |
| Flag absence | No kill switch short of redeploy |

## Root cause

Teams conflate **build verification** with **exposure control**. Verification answers “is this artifact acceptable?” Exposure control answers “how much blast radius do we accept right now, and when do we stop?”

## Non-goals of this pattern

- Not a substitute for product QA ownership of acceptance tests
- Not an incident process (see hotfix + RCA patterns)
- Not permission to waive security gates casually
- Not required for docs-only changes with no runtime artifact

## Related failure modes

See [failures.md](./failures.md).
