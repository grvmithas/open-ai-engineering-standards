# Root Cause: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to explain why an incident occurred and prioritize controls that prevent or limit recurrence authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| normalized incident timeline | owner, revision, retrieval time, and authority recorded for normalized incident timeline |
| logs, traces, metrics, and deploys | owner, revision, retrieval time, and authority recorded for logs, traces, metrics, and deploys |
| decision and communication records | owner, revision, retrieval time, and authority recorded for decision and communication records |
| architecture and control design | owner, revision, retrieval time, and authority recorded for architecture and control design |
| interviews and counterfactual experiments | owner, revision, retrieval time, and authority recorded for interviews and counterfactual experiments |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Root Cause context deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause context rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause context governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] normalized incident timeline is present and provenance-bearing
- [ ] logs, traces, metrics, and deploys is present and provenance-bearing
- [ ] decision and communication records is present and provenance-bearing
- [ ] architecture and control design is present and provenance-bearing
- [ ] interviews and counterfactual experiments is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
