# GraphQL Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent GraphQL failure classes without erasing the platform state needed to prove root cause.

## Why

Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Cannot return null for non-nullable field` | Resolver returned null or an error crossed a non-null contract. | non-null propagation and partial response |
| 2 | `N+1 query explosion` | Nested resolvers load each entity independently. | N+1 resolver fan-out |
| 3 | `Unknown field or argument` | Client operation and deployed schema differ. | client/schema validation drift |
| 4 | `Abstract type resolution failure` | Interface or union result lacks a valid runtime type. | interface/union runtime type resolution |
| 5 | `Query rejected for complexity` | Operation exceeds configured resource budget. | depth, complexity, alias, batch, or rate budget rejection |

### 1. `Cannot return null for non-nullable field`

**Failure class:** non-null propagation and partial response.

**Preserve first:** canonical SDL, generated schema, registry/composition result, and breaking-change report.

**Discriminate:** GraphQL error path. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For non-null propagation and partial response, correlate that observation to the exact GraphQL target, revision, request/job, and UTC interval; compare canonical SDL, generated schema, registry/composition result, and breaking-change report with one healthy peer or baseline.

**Native action:** run the repository's schema generation and validation script from a clean checkout. Start in the safest GraphQL read-only or dry-run mode available. Before changing the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, name which of non-null propagation and partial response and N+1 resolver fan-out the action distinguishes.

**Root-cause direction:** Resolver returned null or an error crossed a non-null contract.

**Correction:** Fix the resolver or make nullability accurately represent domain absence.

**Recovery proof:** Re-run `Cannot return null for non-nullable field` reproduction, verify the non-null propagation and partial response signal cleared in GraphQL error path. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Fix the resolver or make nullability accurately represent domain absence. restored the intended GraphQL behavior through one complete workload or rollout window.

**Rollback boundary:** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

### 2. `N+1 query explosion`

**Failure class:** N+1 resolver fan-out.

**Preserve first:** validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID.

**Discriminate:** resolver spans and query count. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For N+1 resolver fan-out, correlate that observation to the exact GraphQL target, revision, request/job, and UTC interval; compare validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID with one healthy peer or baseline.

**Native action:** execute the checked-in schema compatibility/composition command against the registry baseline. Start in the safest GraphQL read-only or dry-run mode available. Before changing the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, name which of N+1 resolver fan-out and client/schema validation drift the action distinguishes.

**Root-cause direction:** Nested resolvers load each entity independently.

**Correction:** Batch and cache by key within one request context.

**Recovery proof:** Re-run `N+1 query explosion` reproduction, verify the N+1 resolver fan-out signal cleared in resolver spans and query count. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Batch and cache by key within one request context. restored the intended GraphQL behavior through one complete workload or rollout window.

**Rollback boundary:** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

### 3. `Unknown field or argument`

**Failure class:** client/schema validation drift.

**Preserve first:** resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence.

**Discriminate:** schema validation. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For client/schema validation drift, correlate that observation to the exact GraphQL target, revision, request/job, and UTC interval; compare resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence with one healthy peer or baseline.

**Native action:** run integration tests with query counting and resolver tracing enabled. Start in the safest GraphQL read-only or dry-run mode available. Before changing the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, name which of client/schema validation drift and interface/union runtime type resolution the action distinguishes.

**Root-cause direction:** Client operation and deployed schema differ.

**Correction:** Validate operations in CI and use backward-compatible schema evolution.

**Recovery proof:** Re-run `Unknown field or argument` reproduction, verify the client/schema validation drift signal cleared in schema validation. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Validate operations in CI and use backward-compatible schema evolution. restored the intended GraphQL behavior through one complete workload or rollout window.

**Rollback boundary:** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

### 4. `Abstract type resolution failure`

**Failure class:** interface/union runtime type resolution.

**Preserve first:** gateway/subgraph routing, ownership, entity representations, and schema rollout matrix.

**Discriminate:** resolver trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For interface/union runtime type resolution, correlate that observation to the exact GraphQL target, revision, request/job, and UTC interval; compare gateway/subgraph routing, ownership, entity representations, and schema rollout matrix with one healthy peer or baseline.

**Native action:** send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials. Start in the safest GraphQL read-only or dry-run mode available. Before changing the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, name which of interface/union runtime type resolution and depth, complexity, alias, batch, or rate budget rejection the action distinguishes.

**Root-cause direction:** Interface or union result lacks a valid runtime type.

**Correction:** Return discriminated domain data and implement deterministic type resolution.

**Recovery proof:** Re-run `Abstract type resolution failure` reproduction, verify the interface/union runtime type resolution signal cleared in resolver trace. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Return discriminated domain data and implement deterministic type resolution. restored the intended GraphQL behavior through one complete workload or rollout window.

**Rollback boundary:** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

### 5. `Query rejected for complexity`

**Failure class:** depth, complexity, alias, batch, or rate budget rejection.

**Preserve first:** canonical SDL, generated schema, registry/composition result, and breaking-change report.

**Discriminate:** complexity report. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For depth, complexity, alias, batch, or rate budget rejection, correlate that observation to the exact GraphQL target, revision, request/job, and UTC interval; compare canonical SDL, generated schema, registry/composition result, and breaking-change report with one healthy peer or baseline.

**Native action:** capture introspection only where policy permits; production may intentionally disable ad hoc introspection. Start in the safest GraphQL read-only or dry-run mode available. Before changing the schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, name which of depth, complexity, alias, batch, or rate budget rejection and non-null propagation and partial response the action distinguishes.

**Root-cause direction:** Operation exceeds configured resource budget.

**Correction:** Reduce shape, paginate fields, or use an approved persisted operation.

**Recovery proof:** Re-run `Query rejected for complexity` reproduction, verify the depth, complexity, alias, batch, or rate budget rejection signal cleared in complexity report. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Reduce shape, paginate fields, or use an approved persisted operation. restored the intended GraphQL behavior through one complete workload or rollout window.

**Rollback boundary:** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes non-null propagation and partial response, N+1 resolver fan-out, client/schema validation drift, interface/union runtime type resolution, depth, complexity, alias, batch, or rate budget rejection and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
