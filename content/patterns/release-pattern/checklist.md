# Release Pattern — Checklist

> **Pattern:** Release  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** No production exposure until Go is recorded and abort wiring is live.

## Pre-Go

- [ ] Artifact digests pinned (`sha256:…`)
- [ ] Provenance/attestation attached
- [ ] Gates green for those digests (or expiring exception)
- [ ] SBOM/dependency policy pass
- [ ] Migrations sequenced expand → app → later contract
- [ ] Feature flag or traffic split ready and tested
- [ ] Abort criteria numeric, owner named, dashboards linked
- [ ] Rollback owner + RTO + rehearsal/drill date
- [ ] Communications plan for medium/high risk

## During

- [ ] Stage holds observed (1% / 5% / 25% / 100% or equivalent)
- [ ] Abort criteria not edited mid-flight
- [ ] On abort: flag disabled / prior digest restored within RTO
- [ ] Recovery verified against baseline

## After

- [ ] Observation window completed
- [ ] Change ticket closed with final digests and decision log
- [ ] Contract migrations only after soak (if applicable)
