# Reviewer Pattern — Failures

> **Pattern:** Reviewer  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Style volume hides a bug

**Symptom:** Dozens of naming/import nits; production null-deref on an untested path.  
**Cause:** Review optimized for comment count.  
**Recovery:** Cap nits (e.g. 10). Force Correctness + Security before any style comments. Re-review.

## Failure 2: Green CI equals approved

**Symptom:** Merge after “all checks green”; AC for authZ never tested.  
**Cause:** CI covers happy path only; reviewer skipped AC→test map.  
**Recovery:** Require AC→test matrix. Request changes until critical AC have tests.

## Failure 3: Author self-review as final

**Symptom:** Same agent/human authored the PR and issued Approve.  
**Cause:** No separation of duties.  
**Recovery:** Invalidate approval. Assign independent reviewer + human gate for High-risk.

## Failure 4: Unverified “fixed”

**Symptom:** Findings marked resolved; same bug still in the new revision.  
**Cause:** Reviewer trusted the author’s claim without re-checking.  
**Recovery:** Re-open IDs until verified against the new diff or failing-then-passing test.

## Failure 5: Severity miscalibration

**Symptom:** Everything Critical (alarm fatigue) or internet-exploitable issue marked Nit.  
**Cause:** No shared severity definitions.  
**Recovery:** Apply Critical = reachable + high impact; Block only on Critical; train on examples.
