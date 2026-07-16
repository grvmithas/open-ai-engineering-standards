# Enterprise Pattern — Failures

> **Pattern:** Enterprise  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Policy PDF as control

**Symptom:** Auditor asks how tool X is blocked; team opens a Confluence page.  
**Cause:** Controls never bound at the gateway/runtime.  
**Recovery:** BLOCK expansion; bind deny-by-default allowlist; re-run disable drill; attach gateway version to inventory.

## Failure 2: Shadow tools / debug bypass

**Symptom:** Traces show MCP servers or APIs not on the allowlist.  
**Cause:** “Temporary” debug mode or local agent config leaked to prod.  
**Recovery:** Revoke credentials; force gateway allowlist; alert on unknown tool names; treat as security incident if data exfil possible.

## Failure 3: Inventory drift

**Symptom:** Incident commander finds a second model endpoint mid-outage.  
**Cause:** Inventory updated at launch, never at material change.  
**Recovery:** Reconcile from gateway logs and cloud accounts; make inventory ID a release gate; schedule recurring drift scan.

## Failure 4: Immortal exceptions

**Symptom:** High-tier use case runs for months under a “temporary” waiver.  
**Cause:** Exception lacked expiry or owner accountability.  
**Recovery:** Expire immediately; either meet controls or disable; require new time-boxed exception with executive sponsor if truly needed.

## Failure 5: Unrehearsed kill switch

**Symptom:** On-call cannot disable during a harmful-output incident.  
**Cause:** Disable path existed only in the author’s head.  
**Recovery:** Write runbook steps; drill quarterly; fail go-live hooks until drill log exists.
