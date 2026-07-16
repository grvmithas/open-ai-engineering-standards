# MongoDB Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a MongoDB document model, collection validator, query, aggregation, index, transaction, or shard key.

## Why

A syntactically valid MongoDB artifact can still fail because of E11000 unique-index conflict, aggregation memory/spill or blocking stage, transaction/topology incompatibility or transient abort, shard-key routing or hotspot failure, server-selection, TLS, DNS, or pool timeout. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `mongosh '<redacted-uri>' --eval 'db.version()'`; `db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`; `db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`; `db.runCommand({collStats:'<collection>'})`; `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit. Stop promotion on any failed item.

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

The MongoDB deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] record server, FCV, driver, topology, oplog window, balancer, chunk distribution, and backups.
- [ ] introduce validator changes with compatible validation level/action before enforcement.
- [ ] build indexes with capacity and replication-lag monitoring; verify plans before hiding/removing old indexes.
- [ ] backfill documents in resumable `_id`/shard-key ranges with throttling.
- [ ] test retryable writes, failover, duplicate-key, transient transaction, and pool behavior.
- [ ] monitor examined/returned ratio, spills, queues, replication lag, disk, chunks, and p99.
- [ ] rollback preserves readers for both old/new document shapes and index sets.
- [ ] shard-key or destructive changes have a vendor-supported migration and restore plan.
- [ ] Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native MongoDB evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
