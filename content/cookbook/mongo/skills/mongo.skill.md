# MongoDB Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable MongoDB change or diagnosis for a document model, collection validator, query, aggregation, index, transaction, or shard key, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for MongoDB can change. Do not activate for a name-only documentation edit.

## Why

Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries. The skill terminates only on MongoDB evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology and `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution.
2. **Select the boundary.** Name the changed document model, collection validator, query, aggregation, index, transaction, or shard key, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover E11000 unique-index conflict; aggregation memory/spill or blocking stage; transaction/topology incompatibility or transient abort; shard-key routing or hotspot failure; server-selection, TLS, DNS, or pool timeout.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting; replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `mongosh '<redacted-uri>' --eval 'db.version()'`
2. `db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`
3. `db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`
4. `db.runCommand({collStats:'<collection>'})`
5. `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit

7. **Apply review gates.**

- [ ] embed values updated/read atomically and reference independent or unbounded aggregates.
- [ ] document growth remains below the BSON limit with explicit array/cardinality bounds.
- [ ] `$jsonSchema` validation and application models evolve compatibly.
- [ ] compound index prefix/order supports filter, sort, and projection evidence.
- [ ] writes handle duplicate key and retryable/transient labels idempotently.
- [ ] aggregations filter/project early and bound `$lookup`, `$group`, and sort work.
- [ ] shard key has cardinality, distribution, monotonicity, targeting, and zone evidence.
- [ ] transactions are reserved for cross-document invariants and remain short.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

## Verification

The MongoDB evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology. For manual document model, collection validator, query, aggregation, index, transaction, or shard key checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better MongoDB telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the MongoDB boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the MongoDB workflow only when native validation, applicable review/deployment gates, and recovery signals for E11000 unique-index conflict and aggregation memory/spill or blocking stage pass. Otherwise record a named owner and the exact missing MongoDB evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

This skill fingerprints MongoDB through `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology before editing and retains `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting before recovery. The added work is warranted when E11000 unique-index conflict could make Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
