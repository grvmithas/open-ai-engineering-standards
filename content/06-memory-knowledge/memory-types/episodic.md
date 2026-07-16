# Episodic Memory

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Store attributable records of past events and decisions for later task-relevant recall.

## Why

Raw conversation history is noisy and privacy-heavy; model-generated recollections can convert inference into false fact.

## How

Write episodes only after a defined event boundary. Store event time, observed time, participants, tenant/ACL, source pointers, outcome, confidence, supersession, retention, and extractor version. Separate observed facts from model interpretations. Retrieve by authorized scope, temporal constraints, entities, and relevance; surface conflicts and source evidence. Correct or delete via lineage.

## Tradeoffs

Curated episodes are more reliable than transcripts but may omit nuance. Preserve source pointers and allow abstention when evidence is incomplete.

## Anti-patterns

- Saving every turn as permanent memory.
- Writing an agent’s summary as a verified fact.
- Retrieving stale episodes without effective-time filters.

## Enterprise Considerations

Episodes often contain personal data. Enforce purpose limitation, subject access, retention, correction, and deletion across derivatives.

## Checklist

- [ ] Fact and inference fields are separate.
- [ ] Event/effective times and provenance are retained.
- [ ] ACL, retention, conflict, correction, and deletion paths work.
- [ ] Recall usefulness and harmful-memory rates are evaluated.

## References

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [NIST Privacy Framework 1.0](https://doi.org/10.6028/NIST.CSWP.01162020)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
