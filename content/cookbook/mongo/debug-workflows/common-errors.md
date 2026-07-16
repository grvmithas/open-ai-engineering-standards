# MongoDB Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent MongoDB failure classes without erasing the platform state needed to prove root cause.

## Why

Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `E11000 duplicate key` | A write violates a unique index or races with another writer. | E11000 unique-index conflict |
| 2 | `Exceeded memory limit for aggregation` | A stage requires unbounded in-memory state. | aggregation memory/spill or blocking stage |
| 3 | `Transaction numbers are only allowed on a replica set` | Transactions are attempted on unsupported standalone topology. | transaction/topology incompatibility or transient abort |
| 4 | `Shard key update or routing failure` | Write lacks the required key or targets an immutable/routing constraint. | shard-key routing or hotspot failure |
| 5 | `Server selection timeout` | Driver cannot discover a healthy compatible server. | server-selection, TLS, DNS, or pool timeout |

### 1. `E11000 duplicate key`

**Failure class:** E11000 unique-index conflict.

**Preserve first:** `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology.

**Discriminate:** index metadata. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For E11000 unique-index conflict, correlate that observation to the exact MongoDB target, revision, request/job, and UTC interval; compare `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology with one healthy peer or baseline.

**Native action:** `mongosh '<redacted-uri>' --eval 'db.version()'`. Start in the safest MongoDB read-only or dry-run mode available. Before changing the document model, collection validator, query, aggregation, index, transaction, or shard key, name which of E11000 unique-index conflict and aggregation memory/spill or blocking stage the action distinguishes.

**Root-cause direction:** A write violates a unique index or races with another writer.

**Correction:** Treat the index as the authority and implement idempotent conflict handling.

**Recovery proof:** Re-run `E11000 duplicate key` reproduction, verify the E11000 unique-index conflict signal cleared in index metadata. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Treat the index as the authority and implement idempotent conflict handling. restored the intended MongoDB behavior through one complete workload or rollout window.

**Rollback boundary:** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

### 2. `Exceeded memory limit for aggregation`

**Failure class:** aggregation memory/spill or blocking stage.

**Preserve first:** `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution.

**Discriminate:** explain executionStats. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For aggregation memory/spill or blocking stage, correlate that observation to the exact MongoDB target, revision, request/job, and UTC interval; compare `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution with one healthy peer or baseline.

**Native action:** `db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`. Start in the safest MongoDB read-only or dry-run mode available. Before changing the document model, collection validator, query, aggregation, index, transaction, or shard key, name which of aggregation memory/spill or blocking stage and transaction/topology incompatibility or transient abort the action distinguishes.

**Root-cause direction:** A stage requires unbounded in-memory state.

**Correction:** Filter early, use supporting indexes, bound groups/sorts, and assess disk use.

**Recovery proof:** Re-run `Exceeded memory limit for aggregation` reproduction, verify the aggregation memory/spill or blocking stage signal cleared in explain executionStats. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Filter early, use supporting indexes, bound groups/sorts, and assess disk use. restored the intended MongoDB behavior through one complete workload or rollout window.

**Rollback boundary:** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

### 3. `Transaction numbers are only allowed on a replica set`

**Failure class:** transaction/topology incompatibility or transient abort.

**Preserve first:** `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting.

**Discriminate:** hello command. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For transaction/topology incompatibility or transient abort, correlate that observation to the exact MongoDB target, revision, request/job, and UTC interval; compare `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting with one healthy peer or baseline.

**Native action:** `db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`. Start in the safest MongoDB read-only or dry-run mode available. Before changing the document model, collection validator, query, aggregation, index, transaction, or shard key, name which of transaction/topology incompatibility or transient abort and shard-key routing or hotspot failure the action distinguishes.

**Root-cause direction:** Transactions are attempted on unsupported standalone topology.

**Correction:** Use a replica set or redesign around document-level atomicity.

**Recovery proof:** Re-run `Transaction numbers are only allowed on a replica set` reproduction, verify the transaction/topology incompatibility or transient abort signal cleared in hello command. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Use a replica set or redesign around document-level atomicity. restored the intended MongoDB behavior through one complete workload or rollout window.

**Rollback boundary:** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

### 4. `Shard key update or routing failure`

**Failure class:** shard-key routing or hotspot failure.

**Preserve first:** replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics.

**Discriminate:** sharding metadata. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For shard-key routing or hotspot failure, correlate that observation to the exact MongoDB target, revision, request/job, and UTC interval; compare replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics with one healthy peer or baseline.

**Native action:** `db.runCommand({collStats:'<collection>'})`. Start in the safest MongoDB read-only or dry-run mode available. Before changing the document model, collection validator, query, aggregation, index, transaction, or shard key, name which of shard-key routing or hotspot failure and server-selection, TLS, DNS, or pool timeout the action distinguishes.

**Root-cause direction:** Write lacks the required key or targets an immutable/routing constraint.

**Correction:** Include the full routing key and redesign key changes as controlled moves.

**Recovery proof:** Re-run `Shard key update or routing failure` reproduction, verify the shard-key routing or hotspot failure signal cleared in sharding metadata. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Include the full routing key and redesign key changes as controlled moves. restored the intended MongoDB behavior through one complete workload or rollout window.

**Rollback boundary:** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

### 5. `Server selection timeout`

**Failure class:** server-selection, TLS, DNS, or pool timeout.

**Preserve first:** `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology.

**Discriminate:** driver topology logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For server-selection, TLS, DNS, or pool timeout, correlate that observation to the exact MongoDB target, revision, request/job, and UTC interval; compare `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology with one healthy peer or baseline.

**Native action:** `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit. Start in the safest MongoDB read-only or dry-run mode available. Before changing the document model, collection validator, query, aggregation, index, transaction, or shard key, name which of server-selection, TLS, DNS, or pool timeout and E11000 unique-index conflict the action distinguishes.

**Root-cause direction:** Driver cannot discover a healthy compatible server.

**Correction:** Check URI, DNS, TLS, firewall, topology, and driver diagnostics.

**Recovery proof:** Re-run `Server selection timeout` reproduction, verify the server-selection, TLS, DNS, or pool timeout signal cleared in driver topology logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Check URI, DNS, TLS, firewall, topology, and driver diagnostics. restored the intended MongoDB behavior through one complete workload or rollout window.

**Rollback boundary:** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes E11000 unique-index conflict, aggregation memory/spill or blocking stage, transaction/topology incompatibility or transient abort, shard-key routing or hotspot failure, server-selection, TLS, DNS, or pool timeout and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
