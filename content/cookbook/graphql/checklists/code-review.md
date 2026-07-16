# GraphQL Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a GraphQL schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph.

## Why

GraphQL correctness depends on source plus canonical SDL, generated schema, registry/composition result, and breaking-change report; validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID; resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: run the repository's schema generation and validation script from a clean checkout; execute the checked-in schema compatibility/composition command against the registry baseline; run integration tests with query counting and resolver tracing enabled; send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials; capture introspection only where policy permits; production may intentionally disable ad hoc introspection. Findings must identify the violated GraphQL invariant.

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

Review must prove "field and type names model domain capabilities rather than database tables" using canonical SDL, generated schema, registry/composition result, and breaking-change report. That GraphQL evidence costs more than diff inspection but exposes non-null propagation and partial response before merge.

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

- [ ] field and type names model domain capabilities rather than database tables.
- [ ] nullability communicates real absence and error propagation semantics.
- [ ] schema change is additive/deprecated and validated against registered operations.
- [ ] authorization is enforced for object/field access, not only at the gateway.
- [ ] DataLoader is request-scoped and keys include tenant/auth dimensions.
- [ ] lists require bounded pagination; depth, aliases, batches, and complexity are limited.
- [ ] resolver errors use stable safe codes while internal causes remain in traces.
- [ ] federated ownership, keys, entity resolution, and composition are tested across subgraph versions.
- [ ] Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native GraphQL evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
