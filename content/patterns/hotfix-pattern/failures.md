# Hotfix Pattern — Failures

> **Pattern:** Hotfix  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Debug past containment

**Symptom:** Long live debugging; error rate flat; customers still failing.  
**Cause:** Team optimized for understanding over stopping harm.  
**Recovery:** IC orders flag-off or LKG now; analysis continues after containment.

## Failure 2: Hotfix as refactor

**Symptom:** Emergency PR includes formatting, renames, dependency bumps.  
**Cause:** Scope discipline collapsed under pressure.  
**Recovery:** Revert; ship path-only patch; open separate cleanup after RCA.

## Failure 3: No incident commander

**Symptom:** Two engineers deploy conflicting fixes; status messages contradict.  
**Cause:** Roles never declared.  
**Recovery:** Stop deploys; declare IC; single-thread changes; reconcile runtime digest.

## Failure 4: Evidence destroyed

**Symptom:** Pods recycled / logs expired before capture; RCA starved.  
**Cause:** Restore actions without snapshot.  
**Recovery:** Snapshot remaining signals; document gaps; improve runbook preserve-first step.

## Failure 5: Parallel cowboy deploys

**Symptom:** “Helpful” change lands without IC ack and worsens metrics.  
**Cause:** No enforcement of single change thread.  
**Recovery:** Roll back unauthorized change; restrict prod credentials to IC-approved pipeline.
