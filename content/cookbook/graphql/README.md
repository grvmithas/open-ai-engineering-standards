# GraphQL Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph using GraphQL's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets. Generic software advice cannot verify that invariant because the decisive evidence lives in canonical SDL, generated schema, registry/composition result, and breaking-change report; validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID; resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- canonical SDL, generated schema, registry/composition result, and breaking-change report
- validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID
- resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence
- gateway/subgraph routing, ownership, entity representations, and schema rollout matrix

## Native verification

- run the repository's schema generation and validation script from a clean checkout
- execute the checked-in schema compatibility/composition command against the registry baseline
- run integration tests with query counting and resolver tracing enabled
- send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials
- capture introspection only where policy permits; production may intentionally disable ad hoc introspection

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

This cookbook requires deeper GraphQL evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
