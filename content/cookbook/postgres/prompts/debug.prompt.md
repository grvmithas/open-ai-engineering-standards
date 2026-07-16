# PostgreSQL Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a PostgreSQL incident by testing platform-specific failure classes before mutation.

## Why

Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract. The debug decision is accepted only when `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints supports it; generic debug advice cannot establish that PostgreSQL state.

## How

Resolve every XML variable with sanitized PostgreSQL evidence for the schema, migration, query, index, transaction, replication path, or recovery runbook. Apply the invariant "Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal PostgreSQL engineer for a schema, migration, query, index, transaction, replication path, or recovery runbook. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with PostgreSQL invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: deadlock or long lock wait; connection exhaustion or pool leak; statement timeout from plan or blocker; unique/FK/check constraint conflict under concurrency; WAL, replication slot, replica lag, backup, or storage pressure.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: `\conninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology; `EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment; `pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints; schema-only dump, constraints, indexes, statistics, bloat, migration history, and table size; WAL generation, replication slots, replay lag, backup status, restore evidence, and RPO/RTO.</step>
  <step index="3">Select minimally invasive diagnostics from: `psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1`; `psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`; `psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`; `pg_dump --schema-only --no-owner --no-privileges &lt;database&gt; &gt; schema.sql`; `pg_isready -d &lt;database&gt;` for reachability only, not correctness.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress PostgreSQL validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the PostgreSQL state needed to distinguish deadlock or long lock wait, connection exhaustion or pool leak, statement timeout from plan or blocker.

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

- [ ] PostgreSQL version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a PostgreSQL-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
