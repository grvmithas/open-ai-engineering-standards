# Memory Lifecycle Governance

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Control memory from authorized creation through correction, expiry, deletion, and verifiable destruction.

## Why

Persistent memory creates privacy, stale-data, and accountability risk unless every derived copy can be found and governed.

## How

1. At ingestion record immutable source ID/version, tenant, subject, owner, purpose, ACL, classification, consent/legal basis where applicable, timestamps, content hash, parser/embedding versions, and derivation lineage.
2. Validate, scan, and stage records before publication; never learn directly from model output without approval.
3. Resolve conflicts using source authority, effective time, and explicit supersession. Preserve competing claims when no policy resolves them; do not let recency or similarity silently win.
4. Set retention and review dates by class. Expire access automatically; legal hold prevents destruction but not correction annotations.
5. Propagate correction/deletion tombstones to chunks, embeddings, graphs, caches, replicas, summaries, evaluation sets, and eligible backups; verify completion.
6. Keep minimal non-content audit evidence when law and policy permit, and provide data-subject/tenant exports.

## Tradeoffs

Lineage and deletion propagation cost storage and engineering effort. They are prerequisites for trustworthy correction and defensible retention.

## Anti-patterns

- “Indefinite” as a default retention class.
- Updating source text while leaving old embeddings and cached answers active.
- Resolving conflict by whichever result ranks first.

## Enterprise Considerations

Map controls to privacy, records, residency, discovery, and legal-hold obligations. Assign data stewards and publish deletion SLOs with exception evidence.

## Checklist

- [ ] Provenance and derivation lineage are complete.
- [ ] Retention, review, legal hold, correction, and deletion are policy-driven.
- [ ] Conflict decisions are deterministic and auditable.
- [ ] Tombstones reach every derivative and cache.
- [ ] Deletion and correction drills satisfy SLOs.

## References

- [NIST Privacy Framework 1.0](https://doi.org/10.6028/NIST.CSWP.01162020)
- [NIST SP 800-88 Rev. 1, Media Sanitization](https://doi.org/10.6028/NIST.SP.800-88r1)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
