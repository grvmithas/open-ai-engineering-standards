# Legacy Modernization: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform legacy modernization work reproducibly.

## Characterization testing

**Trigger:** Relied-upon behavior lacks an authoritative specification. **Procedure:** Capture sanitized production examples, boundary cases, failure semantics, and side effects as golden-master tests without asserting the design is desirable. **Verification:** Tests fail when observed legacy behavior changes and identify the affected consumer. **Unhappy path:** Version intentionally changed behavior instead of silently updating fixtures.

## Seam extraction

**Trigger:** A legacy dependency prevents isolated replacement. **Procedure:** Introduce a narrow interface around time, I/O, state, or external authority while preserving behavior; route old code through the seam first. **Verification:** Characterization tests and production telemetry are unchanged before new implementation starts. **Unhappy path:** Revert the seam when it alters call order, state, or error semantics.

## Strangler rollout

**Trigger:** A replacement capability passes contract tests. **Procedure:** Shadow old and new outputs, classify mismatches, canary consumers, and retain an immediate routing switch until the rollback window expires. **Verification:** Business outcomes and contract results match at every traffic stage. **Unhappy path:** Flip routing to legacy and reconcile buffered work on mismatch.

## Tradeoffs

Independent Legacy Modernization skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Legacy Modernization, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Legacy Modernization skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Characterization testing produced its named, independently verifiable artifact
- [ ] Seam extraction produced its named, independently verifiable artifact
- [ ] Strangler rollout produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
