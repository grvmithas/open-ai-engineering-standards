# GraphQL Review Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Review a GraphQL change using native configuration, failure, and operational evidence.

## Why

Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets. The review decision is accepted only when validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID supports it; generic review advice cannot establish that GraphQL state.

## How

Resolve every XML variable with sanitized GraphQL evidence for the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph. Apply the invariant "Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal GraphQL engineer for a schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with GraphQL invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Reconstruct the exact version, target, changed resources/contracts, and rollback boundary from evidence.</step>
  <step index="2">Check every technology gate: field and type names model domain capabilities rather than database tables; nullability communicates real absence and error propagation semantics; schema change is additive/deprecated and validated against registered operations; authorization is enforced for object/field access, not only at the gateway; DataLoader is request-scoped and keys include tenant/auth dimensions; lists require bounded pagination; depth, aliases, batches, and complexity are limited; resolver errors use stable safe codes while internal causes remain in traces; federated ownership, keys, entity resolution, and composition are tested across subgraph versions.</step>
  <step index="3">Inspect these failure classes explicitly: non-null propagation and partial response; N+1 resolver fan-out; client/schema validation drift; interface/union runtime type resolution; depth, complexity, alias, batch, or rate budget rejection.</step>
  <step index="4">Require relevant native outputs from: run the repository's schema generation and validation script from a clean checkout; execute the checked-in schema compatibility/composition command against the registry baseline; run integration tests with query counting and resolver tracing enabled; send the exact operation with `curl -H 'content-type: application/json' --data @operation.json &lt;endpoint&gt;` using sanitized credentials; capture introspection only where policy permits; production may intentionally disable ad hoc introspection.</step>
  <step index="5">Report only findings with file/resource location, violated invariant, production impact, and a deterministic verification.</step>
  <step index="6">Block release when rollback is not credible: Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.</step>
</instructions>
<output_format>
Return severity-ordered findings with location, native evidence, impact, required correction, and verification command. Then return version cautions, missing evidence, rollback assessment, and SHIP/BLOCK.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress GraphQL validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

GraphQL review correlates source with validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID and resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence. The cost is a deeper review; the benefit is direct evidence for "field and type names model domain capabilities rather than database tables" and "nullability communicates real absence and error propagation semantics" instead of generic style findings.

## Anti-patterns

- Mapping every table and unrestricted relation directly into GraphQL creates authorization gaps, cyclic queries, and unbounded resolver fan-out.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

GraphQL governance assigns type/field ownership, schema review, operation registration, cost limits, deprecation windows, and controls introspection and trace payload retention.

## Official sources

- [GraphQL specification](https://spec.graphql.org/)
- [GraphQL Learn](https://graphql.org/learn/)
- [GraphQL response](https://graphql.org/learn/response/)
- [OWASP GraphQL](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)

## Checklist

- [ ] GraphQL version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a GraphQL-specific review prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
