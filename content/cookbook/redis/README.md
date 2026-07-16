# Redis Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a keyspace, cache, session store, rate limiter, stream consumer, or Redis topology using Redis's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable. Generic software advice cannot verify that invariant because the decisive evidence lives in `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`; `CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access; `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`
- `CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access
- `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`
- key naming/type/TTL/cardinality specification plus client timeout/retry/pool settings

## Native verification

- `redis-cli -u <redacted-uri> INFO server`
- `redis-cli -u <redacted-uri> INFO memory`
- `redis-cli -u <redacted-uri> SLOWLOG GET 20`
- `redis-cli -u <redacted-uri> LATENCY DOCTOR`
- `redis-cli -u <redacted-uri> --latency` from the application network

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

This cookbook requires deeper Redis evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects keyspace, cache, session store, rate limiter, stream consumer, or Redis topology state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
