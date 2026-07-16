# Debug: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Debug subagents operationalizes this pattern outcome: isolate a software defect through reproducible observations and falsifiable experiments.

| Subagent | Mandate | Required output |
|---|---|---|
| Reproducer | minimizes the failing input and environment | reproducer artifact with source IDs, uncertainty, and stop status |
| Telemetry analyst | correlates events across signals | telemetry analyst artifact with source IDs, uncertainty, and stop status |
| Hypothesis challenger | designs discriminating experiments | hypothesis challenger artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Debug specialists receive only sources needed for "Write a deterministic symptom statement without assigning cause."; the parent retains effect approval and accountability for "reproduction rate before fix is recorded".

## Tradeoffs

Debug subagents deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug subagents rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug subagents governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] Reproducer returned its required evidence
- [ ] Telemetry analyst returned its required evidence
- [ ] Hypothesis challenger returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
