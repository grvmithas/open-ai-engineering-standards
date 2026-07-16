# External Durable Memory

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Store cross-session facts, preferences, and task state in durable systems with transactional governance.

## Why

External persistence survives context and process failure, but broad shared stores create stale-write, tenant-leakage, and deletion risks.

## How

Separate authoritative task state from recall-oriented memory. Use typed schemas, tenant keys, row-level authorization, optimistic concurrency, idempotent writes, encryption, audit events, retention, and backup/restore. Require explicit write criteria and validation; agent outputs enter a pending state until policy approves them. Maintain lineage to every cache, index, and summary.

## Tradeoffs

Transactional stores improve correctness but do not provide semantic retrieval by themselves. Add indexes as replaceable derivatives, never as the sole record.

## Anti-patterns

- A shared vector store as authoritative state.
- Unversioned upserts and last-write-wins preferences.
- Backups that cannot honor deletion or tenant restore boundaries.

## Enterprise Considerations

Define RPO/RTO, residency, key ownership, legal hold, deletion, and tenant-level restore. Exercise failover and corrupt-index rebuilds.

## Checklist

- [ ] Authoritative and derived stores are distinguished.
- [ ] Transactions, versions, idempotency, and audit are enforced.
- [ ] Tenant isolation and deletion include backups and derivatives.
- [ ] Restore and re-index drills pass.

## References

- [NIST SP 800-53 Rev. 5](https://doi.org/10.6028/NIST.SP.800-53r5)
- [NIST SP 800-34 Rev. 1](https://doi.org/10.6028/NIST.SP.800-34r1)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
