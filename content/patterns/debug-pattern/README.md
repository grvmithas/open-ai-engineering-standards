# Debug Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Isolate a software defect through reproducible observations and falsifiable experiments.

## Applicability

- actual behavior violates a specification
- the failure is intermittent or environment-sensitive
- multiple plausible causes remain

## Evidence

- minimal reproduction
- expected-versus-actual record
- logs, traces, metrics, dumps
- environment and dependency lock
- recent changes and known-good baseline

## Components

Debug README components gate 1 is accepted only when "reproduction rate before fix is recorded" is source-verifiable; otherwise, revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

README is component thirteen.

## Outcome measures

- reproduction rate before fix is recorded
- regression test fails before and passes after
- no unrelated variable changes during causal experiment
- recurrence monitor remains clear for one release window. For the Debug README contract, gate 1 is evidenced by "reproduction rate before fix is recorded"; failure invokes this domain recovery: Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

## Rollback

Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

## Tradeoffs

Debug README deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug README rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Citations

- [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/)
- [Scientific method](https://plato.stanford.edu/entries/scientific-method/)
- [OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
