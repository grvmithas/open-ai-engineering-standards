# PostgreSQL Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a PostgreSQL schema, migration, query, index, transaction, replication path, or recovery runbook.

## Why

PostgreSQL correctness depends on source plus `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology; `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment; `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`; `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`; `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`; `pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`; `pg_isready -d <database>` for reachability only, not correctness. Findings must identify the violated PostgreSQL invariant.

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

The PostgreSQL review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] primary keys, foreign keys, unique/check constraints, and nullability encode domain invariants.
- [ ] migration uses expand/backfill/contract and avoids table-rewrite or long ACCESS EXCLUSIVE surprises.
- [ ] index column order, predicate, include columns, and write amplification match measured queries.
- [ ] query review uses representative parameters and actual buffer/WAL evidence, not estimated cost alone.
- [ ] transactions acquire shared resources in one order and contain no remote calls/user think time.
- [ ] pool size is budgeted across instances below server connection reserve.
- [ ] retry handles serialization/deadlock by replaying the whole idempotent transaction.
- [ ] roles, schema privileges, row-level security, encryption, audit, backup, and retention match data classification.
- [ ] Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native PostgreSQL evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
