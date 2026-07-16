# Planning Skill

> **Skill ID:** `planning`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when An approved feature or remediation must be decomposed into executable repository changes.

## Why
A dependency-ordered plan with exact files, acceptance-criterion mapping, verification commands, approval points, and rollback steps is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An approved feature or remediation must be decomposed into executable repository changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A dependency-ordered plan with exact files
- acceptance-criterion mapping
- verification commands
- approval points
- rollback steps.

## Procedure
1. Restate acceptance criteria, non-goals, assumptions, and the definition of done.
2. Inspect repository topology, ownership, tests, and pinned tool versions.
3. Slice work into independently verifiable vertical increments and identify dependencies.
4. Attach exact files, commands, expected evidence, risk, approval, and rollback to each increment.
5. Run a plan review for completeness, sequencing, and scope leakage.

## Verification
Trace every acceptance criterion to at least one step and one check; ensure every mutation has rollback or explicit irreversibility approval.

## Unhappy Paths and Recovery
When requirements conflict, stop with one decision request. When an unknown blocks sequencing, add a time-boxed investigation step with a concrete output rather than guessing.

## Concrete Example
Plan an idempotent billing webhook: enumerate schema, handler, replay tests, metrics, rollout flag, and rollback in dependency order.

## Do Not Use This Skill When
Do not use to invent requirements, approve architecture, or implement the plan.

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
- [Google Engineering Practices - Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)
- [Atlassian Definition of Done](https://www.atlassian.com/agile/project-management/definition-of-done)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
