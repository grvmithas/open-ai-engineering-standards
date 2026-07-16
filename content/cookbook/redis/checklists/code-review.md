# Redis Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Redis keyspace, cache, session store, rate limiter, stream consumer, or Redis topology.

## Why

Redis correctness depends on source plus `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`; `CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access; `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `redis-cli -u <redacted-uri> INFO server`; `redis-cli -u <redacted-uri> INFO memory`; `redis-cli -u <redacted-uri> SLOWLOG GET 20`; `redis-cli -u <redacted-uri> LATENCY DOCTOR`; `redis-cli -u <redacted-uri> --latency` from the application network. Findings must identify the violated Redis invariant.

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

The Redis review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] key format includes bounded namespace, tenant scope, schema version, and collision-safe identifier.
- [ ] data type and maximum cardinality are chosen from access pattern, not convenience.
- [ ] TTL and jitter prevent immortal cache data and synchronized expiry.
- [ ] Lua/function/MULTI or single-command atomicity protects concurrent invariants.
- [ ] cache stampede control is bounded and does not convert misses into source overload.
- [ ] client uses topology-aware discovery, deadlines, bounded pool/queue, and idempotent retries.
- [ ] maxmemory policy matches whether data is disposable, session-critical, or durable.
- [ ] SCAN replaces KEYS; large values and O(N) commands are excluded from request paths.
- [ ] Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Redis evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
