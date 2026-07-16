# Hotfix Pattern — Checklist

> **Pattern:** Hotfix  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** No emergency code deploy until containment was attempted or IC documents why containment is impossible.

## Declare

- [ ] SEV declared
- [ ] IC + scribe named in channel topic
- [ ] Comms cadence set
- [ ] Impact + containment success metric written

## Contain

- [ ] Evidence preserved (digests, flag states, key traces)
- [ ] Fastest reversible containment executed
- [ ] Impact trending down (or escalation triggered)

## Hotfix (only if needed)

- [ ] Allowed paths listed; lockfiles/refactors forbidden
- [ ] IC + one reviewer ack
- [ ] Abort criteria for the deploy defined
- [ ] Probes verify improvement
- [ ] Timeline updated with digests

## Exit

- [ ] Status MITIGATED / MONITORING
- [ ] Durable fix owner assigned
- [ ] RCA scheduled with [root-cause-pattern](../root-cause-pattern/README.md)
- [ ] Emergency exceptions time-boxed
