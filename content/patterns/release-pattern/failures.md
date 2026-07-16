# Release: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Release failures operationalizes this pattern outcome: promote a signed artifact through progressive exposure with objective abort criteria.

| Failure | Observable signal | Recovery |
|---|---|---|
| Friday optimism | staffing cannot support observation | reschedule or staff release |
| mutable artifact | stages run different bytes | promote by digest only |
| manual canary judgment | weak signals are rationalized | encode thresholds |
| rollback breaks schema | contract migration is irreversible | use expand-contract compatibility |

## Rollback failure

Release failures rollback failure gate 2 is accepted only when "artifact-to-runtime digest match = 100%" is source-verifiable; otherwise, halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

## Tradeoffs

Release failures deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release failures rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release failures governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for Friday optimism
- [ ] Detection exists for mutable artifact
- [ ] Detection exists for manual canary judgment
- [ ] Detection exists for rollback breaks schema

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
