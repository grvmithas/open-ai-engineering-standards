# Enterprise Pattern — Checklist

> **Pattern:** Enterprise  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** No production/pilot traffic until checked items for the assigned tier are done.

## Inventory & risk

- [ ] Inventory ID assigned and linked from the service catalog
- [ ] Business and technical owners named
- [ ] Data classes and jurisdictions documented
- [ ] Risk tier assigned from the org rubric (not invented ad hoc)
- [ ] RACI for incidents and model changes recorded

## Controls & runtime

- [ ] Every mandatory control mapped to an enforcement point
- [ ] Policy bundle pins models, prompt versions, tool allowlist, residency
- [ ] Gateway shows active bundle version matching the package
- [ ] Credentials for tools are least-privilege and revocable
- [ ] Audit logging + redaction configured and reachable by responders
- [ ] Kill-switch drill completed within tier RTO (≤15m high tier)

## Enablement

- [ ] Pilot scope limited (tenants/regions) with exit criteria
- [ ] Quality/safety/cost alerts routed to on-call
- [ ] Required approvers recorded (risk/privacy/security as tier demands)
- [ ] Exception records (if any) have owner + expiry

## Anti-stubs

- [ ] No “we’re compliant because vendor says so” as sole evidence
- [ ] No standing debug bypass that disables the allowlist
