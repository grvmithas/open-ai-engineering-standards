# Root Cause Pattern — Context

> **Pattern:** Root Cause  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Incident is mitigated or stable under monitoring (harm contained)
- [ ] Incident ID, severity, duration, and impact summary exist
- [ ] Raw timeline sources available (alerts, deploys, flags, chat, tickets)
- [ ] Facilitator will enforce blameless norms aloud
- [ ] Likely action owners attend (or delegate with authority)
- [ ] Draft will use the RCA structure from the SDLC prompt (summary, timeline, 5 Whys, detection gap, remediation, prevention)

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- SEV1 or SEV2 mitigated
- SEV3 with clear recurrence risk or customer commitment to a writeup
- Hotfix/rollback fixed symptoms but systemic gap remains
- Near-miss that would have been SEV1 with minor timing differences

## Do not apply when

- Incident still uncontained — finish [hotfix-pattern](../hotfix-pattern/README.md) first
- Purpose is to punish an individual — wrong process
- No evidence timeline can be constructed (still write what is known; mark gaps; do not invent)
- Purely speculative tabletop with no real event (use game-day notes instead)

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Incident summary | Incident ticket | ID, SEV, impact, duration |
| Timeline sources | APM, CD, flags, chat | Timestamps |
| Contributing context | Deploys, traffic, config | Facts labeled |
| Logs/metrics | Observability | Key excerpts linked |
| Mitigation steps | IC timeline | What already ran |

## Authority boundary

The RCA agent **drafts**. Humans in the RCA meeting own the root-cause statement and action assignments. Legal/comms may restrict external versions. The agent must not invent owners or due dates.
