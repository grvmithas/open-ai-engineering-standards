# MongoDB Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a MongoDB incident by testing platform-specific failure classes before mutation.

## Why

Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries. The debug decision is accepted only when `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting supports it; generic debug advice cannot establish that MongoDB state.

## How

Resolve every XML variable with sanitized MongoDB evidence for the document model, collection validator, query, aggregation, index, transaction, or shard key. Apply the invariant "Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal MongoDB engineer for a document model, collection validator, query, aggregation, index, transaction, or shard key. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with MongoDB invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: E11000 unique-index conflict; aggregation memory/spill or blocking stage; transaction/topology incompatibility or transient abort; shard-key routing or hotspot failure; server-selection, TLS, DNS, or pool timeout.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: `db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology; `getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution; `explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting; replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics.</step>
  <step index="3">Select minimally invasive diagnostics from: `mongosh '&lt;redacted-uri&gt;' --eval 'db.version()'`; `db.collection.explain('executionStats').find(&lt;representative-filter&gt;).sort(&lt;sort&gt;)`; `db.collection.getIndexes()` and `db.getCollectionInfos({name:'&lt;collection&gt;'})`; `db.runCommand({collStats:'&lt;collection&gt;'})`; `db.adminCommand({replSetGetStatus:1})` where topology and privileges permit.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress MongoDB validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the MongoDB state needed to distinguish E11000 unique-index conflict, aggregation memory/spill or blocking stage, transaction/topology incompatibility or transient abort.

## Anti-patterns

- Normalizing every relation into separate collections forces joins or multi-document transactions and discards document-level atomicity.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

MongoDB governance owns database/collection naming, validator enforcement, encryption and audit settings, shard-key approval, backup evidence, and access to profiler samples containing data.

## Official sources

- [MongoDB manual](https://www.mongodb.com/docs/manual/)
- [Data modeling](https://www.mongodb.com/docs/manual/data-modeling/)
- [Query plans](https://www.mongodb.com/docs/manual/core/query-plans/)
- [Sharding](https://www.mongodb.com/docs/manual/sharding/)

## Checklist

- [ ] MongoDB version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a MongoDB-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
