# Legacy Modernization: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Legacy Modernization failures operationalizes this pattern outcome: replace obsolete internals incrementally while preserving observed business behavior.

| Failure | Observable signal | Recovery |
|---|---|---|
| rewrite program | value arrives only at project end | slice by deployable capability |
| clean-code regression | quirks used by consumers disappear | preserve or explicitly version behavior |
| dual-stack forever | operating cost doubles | fund deletion criteria with each slice |
| test theater | mocks restate implementation | capture production-derived examples |

## Rollback failure

Legacy Modernization failures rollback failure gate 2 is accepted only when "characterized critical behavior = 100%" is source-verifiable; otherwise, flip the strangler route to the legacy implementation and replay buffered work after reconciliation.

## Tradeoffs

Legacy Modernization failures deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization failures rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization failures governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for rewrite program
- [ ] Detection exists for clean-code regression
- [ ] Detection exists for dual-stack forever
- [ ] Detection exists for test theater

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
