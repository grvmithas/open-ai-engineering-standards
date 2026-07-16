# Legacy Modernization: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Legacy Modernization problem operationalizes this pattern outcome: replace obsolete internals incrementally while preserving observed business behavior.

## Observable problem

1. When unsupported technology creates material risk, an undocumented assumption can become a production decision.
2. When change lead time is dominated by legacy coupling, an undocumented assumption can become a production decision.
3. When contracts are undocumented but production behavior is relied upon, an undocumented assumption can become a production decision.

## Quality boundary

Legacy Modernization problem quality boundary gate 2 is accepted only when "characterized critical behavior = 100%" is source-verifiable; otherwise, flip the strangler route to the legacy implementation and replay buffered work after reconciliation.

## Tradeoffs

Legacy Modernization problem deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization problem rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization problem governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
