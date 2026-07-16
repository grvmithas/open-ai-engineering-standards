# Redis Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready keyspace, cache, session store, rate limiter, stream consumer, or Redis topology from repository and runtime evidence.

## Why

Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable. This prompt requires native Redis artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Redis engineer for a keyspace, cache, session store, rate limiter, stream consumer, or Redis topology. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Redis invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.</step>
  <step index="2">Preserve this Redis invariant: Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable.</step>
  <step index="3">Design against these failure classes: maxmemory/OOM or unsafe eviction; WRONGTYPE or key-schema collision; MOVED/ASK cluster routing mismatch; READONLY/failover topology mismatch; slow command, big key, fork, persistence, or network latency.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: key format includes bounded namespace, tenant scope, schema version, and collision-safe identifier; data type and maximum cardinality are chosen from access pattern, not convenience; TTL and jitter prevent immortal cache data and synchronized expiry; Lua/function/MULTI or single-command atomicity protects concurrent invariants; cache stampede control is bounded and does not convert misses into source overload; client uses topology-aware discovery, deadlines, bounded pool/queue, and idempotent retries; maxmemory policy matches whether data is disposable, session-critical, or durable; SCAN replaces KEYS; large values and O(N) commands are excluded from request paths.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `redis-cli -u &lt;redacted-uri&gt; INFO server`; `redis-cli -u &lt;redacted-uri&gt; INFO memory`; `redis-cli -u &lt;redacted-uri&gt; SLOWLOG GET 20`; `redis-cli -u &lt;redacted-uri&gt; LATENCY DOCTOR`; `redis-cli -u &lt;redacted-uri&gt; --latency` from the application network.</step>
  <step index="6">Define rollout and rollback exactly: Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Redis validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.

## Tradeoffs

The prompt rejects fast code generation when Redis version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported keyspace, cache, session store, rate limiter, stream consumer, or Redis topology boundary.

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

- [ ] Redis version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Redis-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
