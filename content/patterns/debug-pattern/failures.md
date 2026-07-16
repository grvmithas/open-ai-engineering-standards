# Debug Pattern — Failures

> **Pattern:** Debug  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Symptom → fix

**Symptom:** Catch-all handler returns 200; underlying race remains.  
**Cause:** No hypothesis testing.  
**Recovery:** Revert masking change; restart debug workflow; fix cause.

## Failure 2: Multi-variable thrash

**Symptom:** “It works” after changing code, config, and infra together.  
**Cause:** Experiments not isolated.  
**Recovery:** Bisect; re-confirm with one variable; discard unrelated changes.

## Failure 3: No regression test

**Symptom:** Bug returns after a refactor.  
**Cause:** Fix merged without failing-first test.  
**Recovery:** Add test; keep it in CI; treat absence as process defect.

## Failure 4: Cannot reproduce → guess

**Symptom:** Patch based on intuition; prod still broken.  
**Cause:** Skipped repro locking.  
**Recovery:** Capture more telemetry; improve repro; avoid prod speculation patches.

## Failure 5: Fix everywhere silently

**Symptom:** Huge PR “while debugging” touches unrelated modules.  
**Cause:** Similarity scan turned into drive-by rewrite.  
**Recovery:** Split follow-ups; merge only causal fix + test.
