# Debug Skill

> **Skill ID:** `debug`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A reproducible defect, regression, crash, failed test, or unexplained production symptom needs root-cause analysis.

## Why
A reproduction, evidence timeline, falsifiable hypothesis log, root-cause statement, regression test, and verified fix or containment is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A reproducible defect, regression, crash, failed test, or unexplained production symptom needs root-cause analysis.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A reproduction
- evidence timeline
- falsifiable hypothesis log
- root-cause statement
- regression test
- verified fix or containment.

## Procedure
1. Capture exact expected/actual behavior, environment, frequency, onset, and blast radius.
2. Create the smallest reliable reproduction and preserve logs, traces, dumps, and recent-change evidence.
3. Rank falsifiable hypotheses by likelihood and test cost; define confirming and disconfirming observations.
4. Change one variable per experiment and update the hypothesis log from observed evidence.
5. Fix the root cause, add a regression test, search for the same pattern, and verify in the affected environment.

## Verification
The original reproduction must fail before and pass after the fix; adjacent tests and production indicators must remain healthy.

## Unhappy Paths and Recovery
If reproduction is intermittent, add correlation IDs and controlled load. If evidence is insufficient, contain impact and state what instrumentation is missing. Stop repeating an unchanged experiment.

## Concrete Example
Diagnose intermittent 500s after a cache release by correlating trace IDs, reproducing concurrent misses, proving a race, and adding a concurrency regression test.

## Do Not Use This Skill When
Do not use for a known syntax error, a feature request, or an incident that first requires emergency containment.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [Google SRE Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/)
- [Microsoft Debugging Fundamentals](https://learn.microsoft.com/windows-hardware/drivers/debugger/debugger-engine-overview)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
