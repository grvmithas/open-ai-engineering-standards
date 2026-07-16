# GraphQL Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable GraphQL change or diagnosis for a schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for GraphQL can change. Do not activate for a name-only documentation edit.

## Why

Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets. The skill terminates only on GraphQL evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture canonical SDL, generated schema, registry/composition result, and breaking-change report and validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID.
2. **Select the boundary.** Name the changed schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover non-null propagation and partial response; N+1 resolver fan-out; client/schema validation drift; interface/union runtime type resolution; depth, complexity, alias, batch, or rate budget rejection.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence; gateway/subgraph routing, ownership, entity representations, and schema rollout matrix.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. run the repository's schema generation and validation script from a clean checkout
2. execute the checked-in schema compatibility/composition command against the registry baseline
3. run integration tests with query counting and resolver tracing enabled
4. send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials
5. capture introspection only where policy permits; production may intentionally disable ad hoc introspection

7. **Apply review gates.**

- [ ] field and type names model domain capabilities rather than database tables.
- [ ] nullability communicates real absence and error propagation semantics.
- [ ] schema change is additive/deprecated and validated against registered operations.
- [ ] authorization is enforced for object/field access, not only at the gateway.
- [ ] DataLoader is request-scoped and keys include tenant/auth dimensions.
- [ ] lists require bounded pagination; depth, aliases, batches, and complexity are limited.
- [ ] resolver errors use stable safe codes while internal causes remain in traces.
- [ ] federated ownership, keys, entity resolution, and composition are tested across subgraph versions.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

## Verification

The GraphQL evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain canonical SDL, generated schema, registry/composition result, and breaking-change report. For manual schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better GraphQL telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the GraphQL boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the GraphQL workflow only when native validation, applicable review/deployment gates, and recovery signals for non-null propagation and partial response and N+1 resolver fan-out pass. Otherwise record a named owner and the exact missing GraphQL evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.

## Tradeoffs

This skill fingerprints GraphQL through canonical SDL, generated schema, registry/composition result, and breaking-change report before editing and retains resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence before recovery. The added work is warranted when non-null propagation and partial response could make Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
