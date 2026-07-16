# PostgreSQL Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a schema, migration, query, index, transaction, replication path, or recovery runbook using PostgreSQL's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract. Generic software advice cannot verify that invariant because the decisive evidence lives in `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology; `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment; `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology
- `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment
- `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints
- schema-only dump, constraints, indexes, statistics, bloat, migration history, and table size
- WAL generation, replication slots, replay lag, backup status, restore evidence, and RPO/RTO

## Native verification

- `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`
- `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`
- `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`
- `pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`
- `pg_isready -d <database>` for reachability only, not correctness

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

This cookbook requires deeper PostgreSQL evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects schema, migration, query, index, transaction, replication path, or recovery runbook state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
