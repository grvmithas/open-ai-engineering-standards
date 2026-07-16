# Root Cause Pattern — Failures

> **Pattern:** Root Cause  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Multiple “root causes”

**Symptom:** Document lists several root causes; readers cannot prioritize.  
**Cause:** Analysis stopped at triggers and contributing factors.  
**Recovery:** Choose the systemic condition that allowed the trigger to matter; demote the rest.

## Failure 2: Vague prevention (“improve monitoring”)

**Symptom:** Actions cannot be verified done; recurrence likely.  
**Cause:** Meeting ended without specificity.  
**Recovery:** Rewrite per SDLC norm — named alert, threshold, routing, owner, due date.

## Failure 3: Blame drift

**Symptom:** Narrative centers a person; future incidents go underground.  
**Cause:** Blameless norm not enforced.  
**Recovery:** Rewrite to system conditions; facilitator restates norm; remove punitive language.

## Failure 4: Ownerless actions

**Symptom:** Tickets never created; due dates slip silently.  
**Cause:** Assignment deferred “after the meeting.”  
**Recovery:** Reopen DRAFT; assign in a 15-minute follow-up with the same attendees.

## Failure 5: RCA during active harm

**Symptom:** Meeting debates causes while customers still failing.  
**Cause:** Started before containment.  
**Recovery:** Stop; return to [hotfix-pattern](../hotfix-pattern/README.md); resume RCA after mitigate.
