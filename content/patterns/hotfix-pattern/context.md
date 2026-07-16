# Hotfix Pattern — Context

> **Pattern:** Hotfix  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Severity (SEV1–SEV4) declared aloud in the incident channel
- [ ] Incident commander (IC) and scribe named
- [ ] Working communications channel + update cadence
- [ ] Last-known-good artifact digest **or** disable flag identified
- [ ] Impact hypothesis stated (what is broken for whom)
- [ ] Authorization for emergency deploy path granted by IC (and policy if required)

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Active customer-visible errors, incorrect money/data, auth failures, or safety issues
- Security exposure requiring immediate mitigation
- Error-budget burn that will breach SLO before a normal release can ship
- IC explicitly opens the hotfix lane

## Do not apply when

- Issue is annoying but within normal release tolerance — use [release-pattern](../release-pattern/README.md)
- Work is cleanup, refactor, or dependency bump without active harm
- You lack IC — declare roles first; do not freestyle prod
- Containment already restored service and only analysis remains — stop hotfixing; schedule durable fix

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Alert / report | Monitoring / support | Timestamp + symptom |
| Service map | Ops | Dependencies on the path |
| Recent changes | CD / flag history | Digests + deploy times |
| LKG digest / flag | Registry / flag service | Proven restore path |
| Runbook | Ops | Containment steps |

## Authority boundary

**IC owns decisions.** The hotfix agent proposes containment and minimal diffs. Nobody else deploys without IC ack. External customer communications follow the named communications authority — not the coding agent.
