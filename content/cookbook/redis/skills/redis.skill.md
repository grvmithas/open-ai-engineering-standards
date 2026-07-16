# Redis Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable Redis change or diagnosis for a keyspace, cache, session store, rate limiter, stream consumer, or Redis topology, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Redis can change. Do not activate for a name-only documentation edit.

## Why

Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable. The skill terminates only on Redis evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster` and `CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access.
2. **Select the boundary.** Name the changed keyspace, cache, session store, rate limiter, stream consumer, or Redis topology, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover maxmemory/OOM or unsafe eviction; WRONGTYPE or key-schema collision; MOVED/ASK cluster routing mismatch; READONLY/failover topology mismatch; slow command, big key, fork, persistence, or network latency.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`; key naming/type/TTL/cardinality specification plus client timeout/retry/pool settings.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `redis-cli -u <redacted-uri> INFO server`
2. `redis-cli -u <redacted-uri> INFO memory`
3. `redis-cli -u <redacted-uri> SLOWLOG GET 20`
4. `redis-cli -u <redacted-uri> LATENCY DOCTOR`
5. `redis-cli -u <redacted-uri> --latency` from the application network

7. **Apply review gates.**

- [ ] key format includes bounded namespace, tenant scope, schema version, and collision-safe identifier.
- [ ] data type and maximum cardinality are chosen from access pattern, not convenience.
- [ ] TTL and jitter prevent immortal cache data and synchronized expiry.
- [ ] Lua/function/MULTI or single-command atomicity protects concurrent invariants.
- [ ] cache stampede control is bounded and does not convert misses into source overload.
- [ ] client uses topology-aware discovery, deadlines, bounded pool/queue, and idempotent retries.
- [ ] maxmemory policy matches whether data is disposable, session-critical, or durable.
- [ ] SCAN replaces KEYS; large values and O(N) commands are excluded from request paths.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

## Verification

The Redis evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`. For manual keyspace, cache, session store, rate limiter, stream consumer, or Redis topology checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Redis telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Redis boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Redis workflow only when native validation, applicable review/deployment gates, and recovery signals for maxmemory/OOM or unsafe eviction and WRONGTYPE or key-schema collision pass. Otherwise record a named owner and the exact missing Redis evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

This skill fingerprints Redis through `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster` before editing and retains `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE` before recovery. The added work is warranted when maxmemory/OOM or unsafe eviction could make Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

## Anti-patterns

- Using unbounded values or KEYS on a shared production instance blocks Redis's command execution path and destabilizes unrelated tenants.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Redis governance allocates key prefixes, memory budgets, ACL patterns, persistence tiers, and noisy-neighbor controls; destructive commands require break-glass access.

## Official sources

- [Redis documentation](https://redis.io/docs/latest/)
- [Data types](https://redis.io/docs/latest/develop/data-types/)
- [Eviction](https://redis.io/docs/latest/develop/reference/eviction/)
- [Latency monitor](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency-monitor/)

## Checklist

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
