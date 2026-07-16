# Debug: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Debug failures operationalizes this pattern outcome: isolate a software defect through reproducible observations and falsifiable experiments.

| Failure | Observable signal | Recovery |
|---|---|---|
| shotgun debugging | many variables change together | restore baseline and test one hypothesis |
| log-led certainty | message is effect, not cause | trace backward to mechanism |
| non-reproduction dismissal | intermittent issue is closed | instrument frequency and conditions |
| fix masks symptom | alert clears but invariant still fails | test the specification directly |

## Rollback failure

Debug failures rollback failure gate 2 is accepted only when "reproduction rate before fix is recorded" is source-verifiable; otherwise, revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

## Tradeoffs

Debug failures deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug failures rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug failures governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for shotgun debugging
- [ ] Detection exists for log-led certainty
- [ ] Detection exists for non-reproduction dismissal
- [ ] Detection exists for fix masks symptom

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
