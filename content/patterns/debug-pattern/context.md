# Debug Pattern — Context

> **Pattern:** Debug  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Expected behavior stated in one sentence
- [ ] Actual behavior stated (verbatim error when available)
- [ ] Environment named (dev / staging / prod / test)
- [ ] Logs, traces, metrics, or failing test available — or gap documented
- [ ] Permission to run reproducing experiments in a safe environment

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Spec or prior behavior is violated
- Failing test, stack trace, or error-budget burn
- Intermittent / race / environment-sensitive failure
- Previous quick fix failed or was reverted

## Do not apply when

- Request is a new feature, not a defect
- Typo/syntax error with obvious single-line fix
- Pure third-party outage (document workaround; open vendor ticket)
- Containment still incomplete on SEV1 — stabilize first

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Symptom package | Ticket / user / alert | Expected, actual, when started |
| Repro notes | Author or on-call | Steps or “cannot repro” |
| Telemetry | Logs/traces/metrics | Correlated timestamps |
| Recent changes | git log / deploy board | Suspect window |

## Authority boundary

The debug agent may propose and implement **root-cause fixes** in non-prod and via PR. Production mutation, data export, and emergency rollbacks require the human on-call / incident commander.
