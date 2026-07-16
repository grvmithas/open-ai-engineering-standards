# Legacy Modernization Pattern — Failures

> **Pattern:** Legacy Modernization  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Big-bang rewrite

**Symptom:** Multi-year rewrite; never cuts over; morale collapse.  
**Cause:** No capability slices or seams.  
**Recovery:** Freeze rewrite scope; pick one slice; strangler with parity.

## Failure 2: Parity by demo

**Symptom:** Exec demo succeeds; month-end batch diverges.  
**Cause:** No characterization harness.  
**Recovery:** Capture legacy golden outputs; block ramp on harness.

## Failure 3: Dual forever

**Symptom:** New and legacy both paid indefinitely.  
**Cause:** No retirement Definition of Done.  
**Recovery:** Add retirement checklist; calendar the decommission.

## Failure 4: Seam churn

**Symptom:** Every sprint invents a new integration style.  
**Cause:** No seam ADR.  
**Recovery:** Lock one seam per slice; revisit only on hard failure.

## Failure 5: Premature legacy delete

**Symptom:** Rolled to 40%; deleted batch job; cannot fall back.  
**Cause:** Skipped retirement hooks.  
**Recovery:** Restore legacy; reduce traffic; fix process gates.
