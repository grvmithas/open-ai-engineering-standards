# Debug Pattern — Checklist

> **Pattern:** Debug  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** Do not merge a “bugfix” without characterization, root cause, and regression test.

## Intake

- [ ] Expected vs actual recorded
- [ ] Environment named
- [ ] Telemetry or failing test attached (or gap noted)
- [ ] Change window identified when possible

## Diagnosis

- [ ] Reproduced or explicitly not reproducible
- [ ] ≥3 hypotheses written
- [ ] Experiments single-variable with results
- [ ] Root cause one sentence (not symptom)

## Fix

- [ ] Fix targets root cause
- [ ] Diff narrowly scoped
- [ ] Regression test fails on old behavior / passes on new
- [ ] Verified in affected environment class
- [ ] Similar patterns scanned

## Handoff

- [ ] Debug report stored with PR/incident
- [ ] If production incident: RCA follow-up owned
