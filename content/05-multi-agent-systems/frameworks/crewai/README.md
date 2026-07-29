# CrewAI Production Integration

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Apply AIES controls when CrewAI crews or flows are selected as the orchestration layer.

## Why

Role and delegation abstractions are application structure, not security boundaries. Production safety still requires external identity, policy, state, provenance, and budget enforcement.

## How

Use Flows for explicit state and event routing; define Pydantic state schemas and deterministic completion conditions. Disable unconstrained delegation, wrap tools with policy checks and idempotency, and persist checkpoints in a tenant-scoped durable store. Attach authenticated identity, task, delegation, budget, and provenance metadata to every event and output.

## Tradeoffs

Crews provide rapid role composition but increase emergent routing. Prefer a Flow with explicit transitions whenever correctness or auditability is more important than open-ended collaboration.

## Anti-patterns

- Treating role names or backstories as access controls.
- Enabling delegation without depth, audience, and budget attenuation.
- Depending on framework memory as the system of record.

## Enterprise Considerations

Review telemetry and hosted-service data paths before enabling them. Pin dependencies, scan tool plugins, and keep framework-neutral state and audit exports.

## Checklist

- [ ] Flow state schema and terminal outcomes are explicit.
- [ ] Delegation and tools are externally authorized and bounded.
- [ ] Persistence is tenant-scoped, encrypted, and recoverable.
- [ ] Telemetry, data residency, and dependency risks are approved.

## References

- [CrewAI Flows documentation](https://docs.crewai.com/en/concepts/flows)
- [CrewAI production architecture documentation](https://docs.crewai.com/en/concepts/production-architecture)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production integration standard.
