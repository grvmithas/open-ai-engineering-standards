# Documentation Skill

> **Skill ID:** `documentation`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when An API, system, decision, runbook, or operational task needs durable, implementation-verified documentation.

## Why
A selected Diataxis artifact, tested examples, ownership metadata, version applicability, and link validation evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An API, system, decision, runbook, or operational task needs durable, implementation-verified documentation.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A selected Diataxis artifact
- tested examples
- ownership metadata
- version applicability
- link validation evidence.

## Procedure
1. Identify the audience and choose tutorial, how-to, reference, or explanation; do not mix purposes.
2. Derive facts from source, schemas, commands, and deployed configuration; record version bounds.
3. Write task-first structure with prerequisites, safe commands, expected output, rollback, and failure paths.
4. Execute code samples and runbook commands in a disposable environment or mark them explicitly unverified.
5. Validate links, terminology, ownership, accessibility, and discoverability; schedule review or expiry.

## Verification
Examples execute as written; API names and defaults match source; local links resolve; a named owner and last-verified date exist.

## Unhappy Paths and Recovery
If implementation and existing docs disagree, treat implementation as evidence and raise a decision rather than silently choosing. Redact secrets from captured output.

## Concrete Example
Create a database failover runbook with prechecks, approval boundary, exact health signals, rollback, and post-event evidence.

## Do Not Use This Skill When
Do not use to generate marketing copy or document behavior that has not been implemented or approved.

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
- [Diataxis](https://diataxis.fr/)
- [Write the Docs Style Guide](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
