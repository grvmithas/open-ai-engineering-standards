# Planner Pattern — Failures

> **Pattern:** Planner  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Plan too high-level

**Symptom:** Coder invents Redis vs in-memory vs CDN for “add a caching layer.”  
**Cause:** Plan stated outcomes without choosing mechanisms.  
**Recovery:** Return to planning. Enumerate options, pick one, record rejected alternatives. Re-approve.

## Failure 2: Plan too low-level

**Symptom:** Plan contains full method bodies; human approval is meaningless.  
**Cause:** Planner overstepped into coder role.  
**Recovery:** Strip to interfaces, data models, sequences, and tests. Keep code out of the plan.

## Failure 3: Rubber-stamp approval

**Symptom:** Implementation diverges; reviewer says they never understood the plan.  
**Cause:** Approval without comprehension.  
**Recovery:** Enforce the understanding test — approver restates the plan in their own words. Invalidate prior approval.

## Failure 4: Silent mid-flight deviation

**Symptom:** PR touches unplanned paths or breaks an unlisted contract.  
**Cause:** Coder “just fixed it” without replanning.  
**Recovery:** Freeze merge. Diff against plan. Replan deltas. Re-approve. Treat as process defect in retro.

## Failure 5: No rollback

**Symptom:** Bad deploy has no documented revert; team improvises under pressure.  
**Cause:** Plan omitted rollback or waved it as “redeploy previous.”  
**Recovery:** Add stage-specific rollback (including data expansion/contraction). Block release until present.
