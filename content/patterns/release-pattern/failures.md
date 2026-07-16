# Release Pattern — Failures

> **Pattern:** Release  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Mutable tag deploy

**Symptom:** Rollback redeploys different bits than intended; forensics cannot pin the build.  
**Cause:** `:latest` / moving tags used as release identity.  
**Recovery:** Halt; pin digests; rebuild attestation; block floating tags in CD.

## Failure 2: Abort criteria renegotiated mid-canary

**Symptom:** Error rate breaches original threshold; team “temporarily” raises it.  
**Cause:** Criteria were treated as suggestions.  
**Recovery:** Abort on original criteria immediately; restore prior; file process defect; require new Go for any threshold change.

## Failure 3: One-shot 100% expose

**Symptom:** Outage affects all users before detection.  
**Cause:** Skipped progressive stages “because staging looked fine.”  
**Recovery:** Mandate canary for SLO-sensitive services; auto-fail hooks if exposure jumps 0→100 without waiver.

## Failure 4: Irreversible migration bundled with app

**Symptom:** Rollback cannot restore service without data surgery.  
**Cause:** Contract/destructive schema shipped with app cutover.  
**Recovery:** Abort app via flag; keep expand; schedule forward fix; ban destructive DDL in the same change as first exposure.

## Failure 5: Unrehearsed rollback

**Symptom:** Abort decision made; operators fumble commands past RTO.  
**Cause:** Rollback never drilled.  
**Recovery:** Restore manually; schedule drill; fail pre-release hook until drill date is recent per policy.
