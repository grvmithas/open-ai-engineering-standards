# Debug: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to isolate a software defect through reproducible observations and falsifiable experiments authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| minimal reproduction | owner, revision, retrieval time, and authority recorded for minimal reproduction |
| expected-versus-actual record | owner, revision, retrieval time, and authority recorded for expected-versus-actual record |
| logs, traces, metrics, dumps | owner, revision, retrieval time, and authority recorded for logs, traces, metrics, dumps |
| environment and dependency lock | owner, revision, retrieval time, and authority recorded for environment and dependency lock |
| recent changes and known-good baseline | owner, revision, retrieval time, and authority recorded for recent changes and known-good baseline |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Debug context deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug context rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug context governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] minimal reproduction is present and provenance-bearing
- [ ] expected-versus-actual record is present and provenance-bearing
- [ ] logs, traces, metrics, dumps is present and provenance-bearing
- [ ] environment and dependency lock is present and provenance-bearing
- [ ] recent changes and known-good baseline is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
