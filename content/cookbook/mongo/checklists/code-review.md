# MongoDB Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a MongoDB document model, collection validator, query, aggregation, index, transaction, or shard key.

## Why

MongoDB correctness depends on source plus `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology; `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution; `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `mongosh '<redacted-uri>' --eval 'db.version()'`; `db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`; `db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`; `db.runCommand({collStats:'<collection>'})`; `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit. Findings must identify the violated MongoDB invariant.

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

Review must prove "embed values updated/read atomically and reference independent or unbounded aggregates" using `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology. That MongoDB evidence costs more than diff inspection but exposes E11000 unique-index conflict before merge.

## Anti-patterns

- Normalizing every relation into separate collections forces joins or multi-document transactions and discards document-level atomicity.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

MongoDB governance owns database/collection naming, validator enforcement, encryption and audit settings, shard-key approval, backup evidence, and access to profiler samples containing data.

## Official sources

- [MongoDB manual](https://www.mongodb.com/docs/manual/)
- [Data modeling](https://www.mongodb.com/docs/manual/data-modeling/)
- [Query plans](https://www.mongodb.com/docs/manual/core/query-plans/)
- [Sharding](https://www.mongodb.com/docs/manual/sharding/)

## Checklist

- [ ] embed values updated/read atomically and reference independent or unbounded aggregates.
- [ ] document growth remains below the BSON limit with explicit array/cardinality bounds.
- [ ] `$jsonSchema` validation and application models evolve compatibly.
- [ ] compound index prefix/order supports filter, sort, and projection evidence.
- [ ] writes handle duplicate key and retryable/transient labels idempotently.
- [ ] aggregations filter/project early and bound `$lookup`, `$group`, and sort work.
- [ ] shard key has cardinality, distribution, monotonicity, targeting, and zone evidence.
- [ ] transactions are reserved for cross-document invariants and remain short.
- [ ] Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native MongoDB evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
