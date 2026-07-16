# Architecture: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Architecture failures operationalizes this pattern outcome: choose and govern a system design against quantified quality-attribute scenarios.

| Failure | Observable signal | Recovery |
|---|---|---|
| diagram as architecture | boxes lack decisions and measures | write scenarios and ADRs |
| best-practice cargo cult | pattern ignores workload | test options against actual model |
| premature distribution | operational burden exceeds need | retain modular monolith baseline |
| frozen ADR | assumptions changed silently | trigger scheduled and event review |

## Rollback failure

Architecture failures rollback failure gate 2 is accepted only when "all priority scenarios have measurable responses" is source-verifiable; otherwise, supersede the adr, disable the new topology at its seam, and restore the prior approved architecture.

## Tradeoffs

Architecture failures deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture failures rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture failures governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for diagram as architecture
- [ ] Detection exists for best-practice cargo cult
- [ ] Detection exists for premature distribution
- [ ] Detection exists for frozen ADR

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
