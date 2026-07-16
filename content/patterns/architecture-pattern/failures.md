# Architecture Pattern — Failures

> **Pattern:** Architecture  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Slide-only architecture

**Symptom:** Implementers invent APIs; diagrams contradict code.  
**Cause:** No ADR decision record.  
**Recovery:** Write ADR; freeze interfaces; replan.

## Failure 2: Single alternative / tool shopping

**Symptom:** “Use Kafka” with no comparison to sync or queue alternatives.  
**Cause:** Solution-first thinking.  
**Recovery:** Score ≥2 options against QA scenarios; record rejects.

## Failure 3: Self-approved High risk

**Symptom:** Author approved multi-region PII design alone.  
**Cause:** Missing SoD.  
**Recovery:** Invalidate acceptance; independent review.

## Failure 4: No failure walk

**Symptom:** First dependency outage cascades globally.  
**Cause:** Happy-path-only design.  
**Recovery:** Run Failure Walker; add mitigations; amend ADR.

## Failure 5: Silent implementation drift

**Symptom:** Services share a DB though ADR forbade it.  
**Cause:** Coding without ADR conformance check.  
**Recovery:** Stop feature work; amend or revert to ADR; re-approve.
