# GraphQL Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph from repository and runtime evidence.

## Why

Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets. This prompt requires native GraphQL artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

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
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.</step>
  <step index="2">Preserve this GraphQL invariant: Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets.</step>
  <step index="3">Design against these failure classes: non-null propagation and partial response; N+1 resolver fan-out; client/schema validation drift; interface/union runtime type resolution; depth, complexity, alias, batch, or rate budget rejection.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: field and type names model domain capabilities rather than database tables; nullability communicates real absence and error propagation semantics; schema change is additive/deprecated and validated against registered operations; authorization is enforced for object/field access, not only at the gateway; DataLoader is request-scoped and keys include tenant/auth dimensions; lists require bounded pagination; depth, aliases, batches, and complexity are limited; resolver errors use stable safe codes while internal causes remain in traces; federated ownership, keys, entity resolution, and composition are tested across subgraph versions.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: run the repository's schema generation and validation script from a clean checkout; execute the checked-in schema compatibility/composition command against the registry baseline; run integration tests with query counting and resolver tracing enabled; send the exact operation with `curl -H 'content-type: application/json' --data @operation.json &lt;endpoint&gt;` using sanitized credentials; capture introspection only where policy permits; production may intentionally disable ad hoc introspection.</step>
  <step index="6">Define rollout and rollback exactly: Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
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

The prompt rejects fast code generation when GraphQL version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph boundary.

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

- 1.1.0 (2026-07-16): Rebuilt as a GraphQL-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
