# Optimization Pattern — Failures

> **Pattern:** Optimization  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Microbenchmark theater

**Symptom:** Local loop is 5–10× faster; production p99 unchanged.  
**Cause:** Optimized a cold path or used a non-representative fixture.  
**Recovery:** Re-trace production critical path; KILL the flag; only reopen with matching workload ID.

## Failure 2: Mean improved, tail died

**Symptom:** Average latency down; p99 and error-budget burn up.  
**Cause:** Guardrails omitted tails, GC pauses, lock contention, or queueing.  
**Recovery:** Abort canary; restore baseline; redesign for tail (batching, timeouts, concurrency limits).

## Failure 3: Correctness collateral

**Symptom:** Faster responses with stale cache, lost updates, or wrong aggregates.  
**Cause:** Oracle absent or waived “temporarily.”  
**Recovery:** Immediate flag disable; add oracle assertions before any re-canary.

## Failure 4: Confounded experiments

**Symptom:** Results swing between deploys; nobody can reproduce the win.  
**Cause:** Two optimizations or unrelated releases flipped in the same window.  
**Recovery:** Serialize; invalidate the evaluation package; re-run single-flag A/B.

## Failure 5: No kill switch

**Symptom:** Regression requires a full redeploy to undo.  
**Cause:** Optimization merged without a feature flag / config gate.  
**Recovery:** Treat as release defect; emergency config revert or hotfix rollback; ban unflagged perf changes on the critical path.
