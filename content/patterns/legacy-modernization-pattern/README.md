# Legacy Modernization Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Replace obsolete internals incrementally while preserving observed business behavior.

## Applicability

- unsupported technology creates material risk
- change lead time is dominated by legacy coupling
- contracts are undocumented but production behavior is relied upon

## Evidence

- characterization tests
- runtime dependency and call graph
- consumer contracts
- change and incident history
- support/security lifecycle dates

## Components

Legacy Modernization README components gate 1 is accepted only when "characterized critical behavior = 100%" is source-verifiable; otherwise, flip the strangler route to the legacy implementation and replay buffered work after reconciliation.

README is component thirteen.

## Outcome measures

- characterized critical behavior = 100%
- contract mismatch rate = 0
- change lead time improves by target
- legacy attack surface decreases each tranche

## Rollback

Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.

## Tradeoffs

Legacy Modernization README deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization README rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Citations

- [Strangler Fig pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Working Effectively with Legacy Code](https://www.pearson.com/en-us/subject-catalog/p/working-effectively-with-legacy-code/P200000009240)
- [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
