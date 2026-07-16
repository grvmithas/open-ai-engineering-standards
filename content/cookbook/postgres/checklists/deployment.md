# PostgreSQL Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a PostgreSQL schema, migration, query, index, transaction, replication path, or recovery runbook.

## Why

A syntactically valid PostgreSQL artifact can still fail because of deadlock or long lock wait, connection exhaustion or pool leak, statement timeout from plan or blocker, unique/FK/check constraint conflict under concurrency, WAL, replication slot, replica lag, backup, or storage pressure. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`; `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`; `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`; `pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`; `pg_isready -d <database>` for reachability only, not correctness. Stop promotion on any failed item.

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

The PostgreSQL deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] record server major, extensions, parameter constraints, table sizes, replica state, and backup/restore status.
- [ ] run migration in a production-like clone and measure lock level, duration, WAL, disk, and replica lag.
- [ ] use lock_timeout and statement_timeout appropriate to the migration; fail instead of blocking critical traffic.
- [ ] deploy additive schema and compatible application code before backfill or contract removal.
- [ ] backfill in bounded resumable batches with progress, throttling, and replica-lag guardrails.
- [ ] monitor locks, connection use, deadlocks, query latency, WAL, storage, and replication during rollout.
- [ ] verify constraints and statistics after backfill before enabling reads or dropping old shape.
- [ ] rollback plan distinguishes reversible DDL from restore/forward-fix and protects committed data.
- [ ] Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native PostgreSQL evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
