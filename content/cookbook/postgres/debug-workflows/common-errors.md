# PostgreSQL Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent PostgreSQL failure classes without erasing the platform state needed to prove root cause.

## Why

Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `deadlock detected` | Transactions lock the same resources in inconsistent order. | deadlock or long lock wait |
| 2 | `remaining connection slots are reserved` | Clients exceed connection capacity or leak sessions. | connection exhaustion or pool leak |
| 3 | `canceling statement due to statement timeout` | Query plan or lock wait exceeds its budget. | statement timeout from plan or blocker |
| 4 | `duplicate key violates unique constraint` | Concurrency or idempotency violates a declared uniqueness invariant. | unique/FK/check constraint conflict under concurrency |
| 5 | `replica lag` | Replay cannot keep up because of write volume, I/O, conflicts, or long queries. | WAL, replication slot, replica lag, backup, or storage pressure |

### 1. `deadlock detected`

**Failure class:** deadlock or long lock wait.

**Preserve first:** `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology.

**Discriminate:** log_lock_waits and pg_stat_activity. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Transactions lock the same resources in inconsistent order.

**Correction:** Standardize lock order, shorten transactions, and retry the whole transaction.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

### 2. `remaining connection slots are reserved`

**Failure class:** connection exhaustion or pool leak.

**Preserve first:** `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment.

**Discriminate:** pg_stat_activity. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Clients exceed connection capacity or leak sessions.

**Correction:** Use bounded pools, find leaks, and reserve operator access.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

### 3. `canceling statement due to statement timeout`

**Failure class:** statement timeout from plan or blocker.

**Preserve first:** `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints.

**Discriminate:** pg_stat_activity and EXPLAIN. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Query plan or lock wait exceeds its budget.

**Correction:** Separate execution from lock time, inspect blockers and actual plan.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

### 4. `duplicate key violates unique constraint`

**Failure class:** unique/FK/check constraint conflict under concurrency.

**Preserve first:** schema-only dump, constraints, indexes, statistics, bloat, migration history, and table size.

**Discriminate:** constraint metadata. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Concurrency or idempotency violates a declared uniqueness invariant.

**Correction:** Use an atomic upsert or return the existing idempotent result.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

### 5. `replica lag`

**Failure class:** WAL, replication slot, replica lag, backup, or storage pressure.

**Preserve first:** WAL generation, replication slots, replay lag, backup status, restore evidence, and RPO/RTO.

**Discriminate:** pg_stat_replication. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `pg_isready -d <database>` for reachability only, not correctness. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Replay cannot keep up because of write volume, I/O, conflicts, or long queries.

**Correction:** Measure WAL generation/replay and remove the limiting cause.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes deadlock or long lock wait, connection exhaustion or pool leak, statement timeout from plan or blocker, unique/FK/check constraint conflict under concurrency, WAL, replication slot, replica lag, backup, or storage pressure and prevents recurring incidents hidden by state reset.

## Anti-patterns

- A one-step column rename/drop on a hot table breaks mixed-version application instances and can hold an ACCESS EXCLUSIVE lock.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

PostgreSQL governance assigns schema ownership, migration approval, privileged-role controls, extension allowlists, audit/retention policy, and regularly evidenced restore objectives.

## Official sources

- [PostgreSQL documentation](https://www.postgresql.org/docs/current/)
- [EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- [Explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html)
- [Monitoring statistics](https://www.postgresql.org/docs/current/monitoring-stats.html)
- [Backup and restore](https://www.postgresql.org/docs/current/backup.html)

## Checklist

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
