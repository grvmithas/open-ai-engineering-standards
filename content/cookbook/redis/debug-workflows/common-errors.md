# Redis Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Redis failure classes without erasing the platform state needed to prove root cause.

## Why

Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `OOM command not allowed` | Memory reached maxmemory and policy cannot evict eligible keys. | maxmemory/OOM or unsafe eviction |
| 2 | `WRONGTYPE operation` | A key is reused with an incompatible data structure. | WRONGTYPE or key-schema collision |
| 3 | `MOVED or ASK` | Cluster client addressed a slot through the wrong node. | MOVED/ASK cluster routing mismatch |
| 4 | `READONLY replica` | Writes are sent to a replica after topology change. | READONLY/failover topology mismatch |
| 5 | `Latency spike` | Slow commands, big keys, fork, persistence, or network saturation blocks service. | slow command, big key, fork, persistence, or network latency |

### 1. `OOM command not allowed`

**Failure class:** maxmemory/OOM or unsafe eviction.

**Preserve first:** `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`.

**Discriminate:** INFO memory. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `redis-cli -u <redacted-uri> INFO server`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Memory reached maxmemory and policy cannot evict eligible keys.

**Correction:** Inspect keyspace and policy; bound data and choose policy by durability needs.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

### 2. `WRONGTYPE operation`

**Failure class:** WRONGTYPE or key-schema collision.

**Preserve first:** `CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access.

**Discriminate:** TYPE and OBJECT. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `redis-cli -u <redacted-uri> INFO memory`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** A key is reused with an incompatible data structure.

**Correction:** Version and namespace key schemas; verify TYPE during incident diagnosis.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

### 3. `MOVED or ASK`

**Failure class:** MOVED/ASK cluster routing mismatch.

**Preserve first:** `SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`.

**Discriminate:** CLUSTER SLOTS. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `redis-cli -u <redacted-uri> SLOWLOG GET 20`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Cluster client addressed a slot through the wrong node.

**Correction:** Use a cluster-aware client and refresh slot topology.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

### 4. `READONLY replica`

**Failure class:** READONLY/failover topology mismatch.

**Preserve first:** key naming/type/TTL/cardinality specification plus client timeout/retry/pool settings.

**Discriminate:** ROLE and client logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `redis-cli -u <redacted-uri> LATENCY DOCTOR`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Writes are sent to a replica after topology change.

**Correction:** Use topology-aware discovery and retry only idempotent operations.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

### 5. `Latency spike`

**Failure class:** slow command, big key, fork, persistence, or network latency.

**Preserve first:** `INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`.

**Discriminate:** LATENCY DOCTOR and SLOWLOG. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `redis-cli -u <redacted-uri> --latency` from the application network. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Slow commands, big keys, fork, persistence, or network saturation blocks service.

**Correction:** Correlate latency doctor, slowlog, command stats, and host metrics.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes maxmemory/OOM or unsafe eviction, WRONGTYPE or key-schema collision, MOVED/ASK cluster routing mismatch, READONLY/failover topology mismatch, slow command, big key, fork, persistence, or network latency and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
