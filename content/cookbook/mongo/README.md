# MongoDB Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a document model, collection validator, query, aggregation, index, transaction, or shard key using MongoDB's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries. Generic software advice cannot verify that invariant because the decisive evidence lives in `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology; `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution; `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology
- `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution
- `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting
- replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics

## Native verification

- `mongosh '<redacted-uri>' --eval 'db.version()'`
- `db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`
- `db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`
- `db.runCommand({collStats:'<collection>'})`
- `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

This cookbook requires deeper MongoDB evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects document model, collection validator, query, aggregation, index, transaction, or shard key state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
