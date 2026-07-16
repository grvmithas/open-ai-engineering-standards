# PostgreSQL Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable PostgreSQL change or diagnosis for a schema, migration, query, index, transaction, replication path, or recovery runbook, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for PostgreSQL can change. Do not activate for a name-only documentation edit.

## Why

Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract. The skill terminates only on PostgreSQL evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology and `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment.
2. **Select the boundary.** Name the changed schema, migration, query, index, transaction, replication path, or recovery runbook, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover deadlock or long lock wait; connection exhaustion or pool leak; statement timeout from plan or blocker; unique/FK/check constraint conflict under concurrency; WAL, replication slot, replica lag, backup, or storage pressure.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints; schema-only dump, constraints, indexes, statistics, bloat, migration history, and table size; WAL generation, replication slots, replay lag, backup status, restore evidence, and RPO/RTO.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`
2. `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`
3. `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`
4. `pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`
5. `pg_isready -d <database>` for reachability only, not correctness

7. **Apply review gates.**

- [ ] primary keys, foreign keys, unique/check constraints, and nullability encode domain invariants.
- [ ] migration uses expand/backfill/contract and avoids table-rewrite or long ACCESS EXCLUSIVE surprises.
- [ ] index column order, predicate, include columns, and write amplification match measured queries.
- [ ] query review uses representative parameters and actual buffer/WAL evidence, not estimated cost alone.
- [ ] transactions acquire shared resources in one order and contain no remote calls/user think time.
- [ ] pool size is budgeted across instances below server connection reserve.
- [ ] retry handles serialization/deadlock by replaying the whole idempotent transaction.
- [ ] roles, schema privileges, row-level security, encryption, audit, backup, and retention match data classification.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better PostgreSQL telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the PostgreSQL boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

This skill spends time fingerprinting PostgreSQL and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
