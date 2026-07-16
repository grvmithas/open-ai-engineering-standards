# Architecture Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Choose and govern a system design against quantified quality-attribute scenarios.

## Applicability

- a decision is expensive to reverse
- quality attributes conflict
- multiple teams depend on a stable boundary

## Evidence

- quality-attribute scenarios
- workload and failure model
- threat model
- cost and capacity model
- ADRs and organizational constraints

## Components

Architecture README components gate 1 is accepted only when "all priority scenarios have measurable responses" is source-verifiable; otherwise, supersede the adr, disable the new topology at its seam, and restore the prior approved architecture.

README is component thirteen.

## Outcome measures

- all priority scenarios have measurable responses
- prototype validates highest-risk assumption
- fitness functions run in CI or operations
- ADR review date and owner are current

## Rollback

Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.

## Tradeoffs

Architecture README deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture README rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Citations

- [ISO/IEC/IEEE 42010 overview](https://www.iso.org/standard/74393.html)
- [SEI ATAM](https://insights.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/)
- [Thoughtworks fitness functions](https://www.thoughtworks.com/insights/books/building-evolutionary-architectures)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
