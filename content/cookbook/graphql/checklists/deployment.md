# GraphQL Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a GraphQL schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph.

## Why

A syntactically valid GraphQL artifact can still fail because of non-null propagation and partial response, N+1 resolver fan-out, client/schema validation drift, interface/union runtime type resolution, depth, complexity, alias, batch, or rate budget rejection. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from run the repository's schema generation and validation script from a clean checkout; execute the checked-in schema compatibility/composition command against the registry baseline; run integration tests with query counting and resolver tracing enabled; send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials; capture introspection only where policy permits; production may intentionally disable ad hoc introspection. Stop promotion on any failed item.

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

Promotion waits for "publish schema candidate and pass breaking/dangerous change plus federation composition checks" and "validate persisted/registered client operations against the candidate schema". Those GraphQL target checks slow release but directly bound non-null propagation and partial response and make this rollback executable: Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

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

- [ ] publish schema candidate and pass breaking/dangerous change plus federation composition checks.
- [ ] validate persisted/registered client operations against the candidate schema.
- [ ] deploy producing subgraph/resolver behavior before exposing new fields at the gateway.
- [ ] load-test representative operation cost, DataLoader batching, downstream calls, and partial failures.
- [ ] gateway limits depth, aliases, batches, body size, rate, and execution deadline.
- [ ] resolver traces, per-field errors, operation signatures, and downstream query counts are live.
- [ ] canary compares operation error/latency and subgraph fan-out by schema revision.
- [ ] rollback retains schema fields while reverting resolver routing; never remove a field to roll back implementation.
- [ ] Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native GraphQL evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
