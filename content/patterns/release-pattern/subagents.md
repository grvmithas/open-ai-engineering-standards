# Release: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Release subagents operationalizes this pattern outcome: promote a signed artifact through progressive exposure with objective abort criteria.

| Subagent | Mandate | Required output |
|---|---|---|
| Release conductor | owns stage transitions and ledger | release conductor artifact with source IDs, uncertainty, and stop status |
| Provenance verifier | validates signatures and SBOM policy | provenance verifier artifact with source IDs, uncertainty, and stop status |
| Canary analyst | compares cohorts and invokes abort | canary analyst artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Release specialists receive only sources needed for "Freeze artifact digest, configuration, migrations, and release evidence."; the parent retains effect approval and accountability for "artifact-to-runtime digest match = 100%".

## Tradeoffs

Release subagents deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release subagents rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release subagents governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Release conductor returned its required evidence
- [ ] Provenance verifier returned its required evidence
- [ ] Canary analyst returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
