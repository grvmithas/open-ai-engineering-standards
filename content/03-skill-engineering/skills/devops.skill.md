# Devops Skill

> **Skill ID:** `devops`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A build, CI/CD, release pipeline, infrastructure automation, or artifact supply-chain flow changes.

## Why
A pipeline design, immutable artifact flow, provenance controls, promotion policy, rollback, and reliability evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A build, CI/CD, release pipeline, infrastructure automation, or artifact supply-chain flow changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A pipeline design
- immutable artifact flow
- provenance controls
- promotion policy
- rollback
- reliability evidence.

## Procedure
1. Map source, builder identity, dependencies, artifact registry, environments, and approval boundaries.
2. Pin actions/images/tools by immutable version; isolate credentials and apply least permissions to each job.
3. Build once, generate SBOM and provenance, scan, sign, and promote the same digest across environments.
4. Make deployments concurrency-safe with health gates, canary or progressive rollout, and automated rollback criteria.
5. Test pipeline branches, failure paths, cache poisoning resistance, restore procedure, and audit events.

## Verification
Verify reproducibility, artifact digest continuity, provenance, secret isolation, environment protection, rollback, and pipeline retry behavior.

## Unhappy Paths and Recovery
If a third-party action is unpinned or privileged, block it. If rollback is impossible, require a forward-recovery runbook and explicit approval.

## Concrete Example
Design a GitHub Actions release that uses OIDC, pinned actions, signed OCI images, environment approval, canary health checks, and digest promotion.

## Do Not Use This Skill When
Do not use for manual production changes that bypass the delivery system.

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
- [SLSA v1.0](https://slsa.dev/spec/v1.0/)
- [OpenSSF Scorecard](https://scorecard.dev/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
