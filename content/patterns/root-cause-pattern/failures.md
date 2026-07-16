# Root Cause: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Root Cause failures operationalizes this pattern outcome: explain why an incident occurred and prioritize controls that prevent or limit recurrence.

| Failure | Observable signal | Recovery |
|---|---|---|
| single root cause | complex interaction is collapsed | branch causal graph |
| five-whys certainty | stopping depth follows narrative convenience | test edges and alternatives |
| action = training | weak control leaves mechanism intact | apply corrective hierarchy |
| timeline by memory | hindsight overwrites event record | anchor to contemporaneous evidence |
| RCA closes at publication | actions never prove effect | run 30/60/90-day review |

## Rollback failure

Root Cause failures rollback failure gate 2 is accepted only when "100% causal edges cite evidence" is source-verifiable; otherwise, withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.

## Tradeoffs

Root Cause failures deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause failures rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause failures governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for single root cause
- [ ] Detection exists for five-whys certainty
- [ ] Detection exists for action = training
- [ ] Detection exists for timeline by memory
- [ ] Detection exists for RCA closes at publication

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
