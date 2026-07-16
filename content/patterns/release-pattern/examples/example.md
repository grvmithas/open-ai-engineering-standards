# Release: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Release checkout 2026.07.16+5 digest sha256:91ab. REL-712 includes SLSA provenance, SBOM-712, rollback drill rb-44 at 6m12s. Canary 1% for 30m then 10% for 60m; abort at checkout error +0.3pp or p99 +120ms.

## Execution

1. Freeze artifact digest, configuration, migrations, and release evidence; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Verify provenance, policy, compatibility, and environment readiness; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Rehearse rollback and forward-fix against production-like state; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Deploy internal or dark with no customer authority; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Canary a representative cohort with automatic abort thresholds; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Hold and compare SLO, business, security, and support signals; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Expand 1/10/25/50/100% with approval at risk boundaries; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Close after observation window; preserve artifact and release ledger; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that artifact-to-runtime digest match = 100%.
- The owner records raw evidence that deployment success > 99%.
- The owner records raw evidence that rollback completes within RTO.
- The owner records raw evidence that no accelerated SLO burn during holds.

## Rollback exercise

Release examples/example rollback exercise gate 1 is accepted only when "artifact-to-runtime digest match = 100%" is source-verifiable; otherwise, halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

## Tradeoffs

Release examples/example deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release examples/example rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release examples/example governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
