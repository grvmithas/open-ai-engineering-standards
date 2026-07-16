# Migration Pattern — Failures

> **Pattern:** Migration  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Contract first

**Symptom:** Column dropped with cutover; rollback needs backup restore.  
**Cause:** Treated migration as single deploy.  
**Recovery:** Restore; redesign expand → dual → cutover → contract.

## Failure 2: Unknown consumers

**Symptom:** Nightly job or partner feed breaks post-cutover.  
**Cause:** Incomplete inventory.  
**Recovery:** Halt contract; restore dual if needed; finish inventory; re-soak.

## Failure 3: No reconciliation

**Symptom:** API healthy; finance reports disagree.  
**Cause:** No count/semantic gates.  
**Recovery:** Run recon; repair data; delay contract until green.

## Failure 4: Dual-write forever

**Symptom:** Two writers still required months later.  
**Cause:** No contract exit criteria.  
**Recovery:** Define mismatch/error thresholds and a calendar date; execute contract.

## Failure 5: Fake rollback

**Symptom:** Plan says “redeploy previous” after destructive rewrite.  
**Cause:** Rollback ignored data plane.  
**Recovery:** Rewrite rollback for data; rehearse; mark true PONR.
