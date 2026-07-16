# Durable State and Checkpoints

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Provide recoverable, conflict-safe workflow state independent of model context and worker lifetime.

## Why

Agents retry, crash, duplicate messages, and race. A transcript cannot provide atomic transitions, exactly-once effects, schema migration, or deterministic recovery.

## How

1. Store authoritative state in a transactional system; workers receive immutable state snapshots and expected versions.
2. Model transitions as a state machine with terminal states `succeeded`, `failed`, `cancelled`, and `expired`.
3. Require compare-and-swap version checks, idempotency keys, outbox/inbox deduplication, and leases for exclusive work.
4. Checkpoint after validated boundaries and before irreversible effects. Include schema version, workflow definition digest, inputs, outputs, tool receipts, budget consumed, pending work, and provenance pointers.
5. Separate checkpoint creation from external side effects; use compensating transactions where atomic commit is impossible.
6. On resume, verify digests and compatibility, reacquire authorization, reconcile uncertain side effects, then continue from the last committed transition.
7. Test worker death, duplicate delivery, stale writes, partial writes, corrupt checkpoints, schema upgrades, and regional failover.

## Tradeoffs

Fine-grained checkpoints improve recovery but increase storage and contention. Checkpoint only validated semantic boundaries, not every token or reasoning step.

## Anti-patterns

- Last-write-wins state updates from multiple agents.
- Replaying a tool call because a response was lost without checking its idempotency receipt.
- Restoring old credentials, policy decisions, or budgets from a checkpoint.

## Enterprise Considerations

Encrypt state, segregate tenants, classify checkpoint data, and apply retention/deletion policy. Recovery objectives must include the state store, artifact store, audit log, and identity dependencies.

## Checklist

- [ ] State machine, invariants, schema versions, and terminal states are explicit.
- [ ] Optimistic concurrency and idempotency are enforced.
- [ ] Checkpoints carry provenance, budget, and workflow digests.
- [ ] Resume re-authorizes and reconciles side effects.
- [ ] Failure-injection and disaster-recovery tests pass.

## References

- [AWS Builders’ Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
- [CloudEvents 1.0 specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)
- [NIST SP 800-34 Rev. 1, Contingency Planning](https://doi.org/10.6028/NIST.SP.800-34r1)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
