# Redis Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Redis keyspace, cache, session store, rate limiter, stream consumer, or Redis topology.

## Why

A syntactically valid Redis artifact can still fail because of maxmemory/OOM or unsafe eviction, WRONGTYPE or key-schema collision, MOVED/ASK cluster routing mismatch, READONLY/failover topology mismatch, slow command, big key, fork, persistence, or network latency. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `redis-cli -u <redacted-uri> INFO server`; `redis-cli -u <redacted-uri> INFO memory`; `redis-cli -u <redacted-uri> SLOWLOG GET 20`; `redis-cli -u <redacted-uri> LATENCY DOCTOR`; `redis-cli -u <redacted-uri> --latency` from the application network. Stop promotion on any failed item.

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

The Redis deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] record Redis/client versions, cluster topology, memory headroom, fragmentation, persistence, replication, and failover state.
- [ ] estimate new key count, value size, TTL distribution, command complexity, and network bytes at peak.
- [ ] load-test eviction, stampede, failover, reconnect, and source fallback behavior.
- [ ] ACL categories/key patterns grant the application only its required commands and prefixes.
- [ ] canary monitors used_memory, evictions, hit ratio, latency, blocked clients, replication, and errors.
- [ ] stream consumer groups, pending entries, and idempotency survive rolling consumer versions.
- [ ] rollback can read/delete the new key version without `FLUSH*` or broad scans.
- [ ] persistent uses prove backup/restore and replica promotion according to RPO/RTO.
- [ ] Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Redis evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
