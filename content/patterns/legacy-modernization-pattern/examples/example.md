# Legacy Modernization: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Modernize COBOL credit-limit calculation. MOD-73 records 2,400 golden cases from sanitized production, exposes /limits/v2 behind route flag limit-v2, shadows for 14 days with zero cent-level mismatch, then canaries internal analysts before customers.

## Execution

1. Inventory business capabilities, consumers, and operational pain; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Capture golden-master and characterization tests before refactoring; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Create seams around time, I/O, state, and external dependencies; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Select a vertical capability by value, coupling, and reversibility; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Place a strangler route with shadow comparison; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Implement the replacement behind contract tests; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Shift traffic gradually and compare business outcomes; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Delete the legacy slice only after consumer and rollback expiry; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that characterized critical behavior = 100%.
- The owner records raw evidence that contract mismatch rate = 0.
- The owner records raw evidence that change lead time improves by target.
- The owner records raw evidence that legacy attack surface decreases each tranche.

## Rollback exercise

Legacy Modernization examples/example rollback exercise gate 1 is accepted only when "characterized critical behavior = 100%" is source-verifiable; otherwise, flip the strangler route to the legacy implementation and replay buffered work after reconciliation.

## Tradeoffs

Legacy Modernization examples/example deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization examples/example rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization examples/example governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
