---
name: devops
description: "DevOps procedure with verification and rollback evidence. Use when a build, CI/CD, release pipeline, infrastructure automation, or artifact supply-chain flow changes."
---

# DevOps Skill

> **Skill ID:** `devops`  
> **Version:** 2.1  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a build, CI/CD, release pipeline, infrastructure automation, or artifact supply-chain flow changes.

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
Pinning actions/images, signing digests, and canary health gates add pipeline latency and operational overhead; they eliminate “green CI, wrong artifact in prod” failures. Progressive delivery slows time-to-100% traffic but bounds blast radius when SLOs regress—faster all-at-once deploys win only when rollback is proven and cheap.

## Anti-Patterns
- Floating tags on the release path (`actions@main`, `image:latest`) instead of immutable digests or pinned SHAs.
- Long-lived cloud keys or PATs in CI secrets when OIDC federation to the cloud role is available.
- Rebuilding per environment instead of promoting the same signed artifact digest.
- Shipping without automated rollback criteria tied to health checks or error-budget burn.
- Manual production mutations that bypass the delivery system “just this once.”

## Enterprise Considerations
Separate who merges code, who approves environment promotion, and who holds break-glass credentials. Secrets belong in a vault or short-lived OIDC tokens—never echoed into workflow logs, SBOM annotations, or artifact metadata. Retain SBOM, provenance attestations, and promotion audit events for supply-chain and change-management compliance (SLSA-aligned).

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
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.1 (2026-07-29):** De-boilerplated Tradeoffs, Anti-Patterns, and Enterprise Considerations with devops-domain content (canaries, digest promotion, OIDC, SLSA evidence).
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
