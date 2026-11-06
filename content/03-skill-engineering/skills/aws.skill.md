---
name: aws
description: "AWS procedure with verification and rollback evidence. Use when an AWS IAM, network, compute, data, resilience, or deployment design changes."
---

# AWS Skill

> **Skill ID:** `aws`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when an AWS IAM, network, compute, data, resilience, or deployment design changes.

## Why
An AWS architecture record, IaC plan/change set, IAM analysis, cost estimate, and rollback/failover evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An AWS IAM, network, compute, data, resilience, or deployment design changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An AWS architecture record
- IaC plan/change set
- IAM analysis
- cost estimate
- rollback/failover evidence.

## Procedure
1. Establish account, organization, region, data class, RTO/RPO, quotas, and control-tower guardrails.
2. Design IAM roles from required API actions and resource conditions; avoid long-lived credentials.
3. Define VPC paths, encryption, backup, multi-AZ or multi-region behavior, logs, alarms, budgets, and tagging.
4. Review CloudFormation change set or Terraform plan plus IAM Access Analyzer findings before approval.
5. Promote through environments, validate CloudWatch/application SLIs, and exercise rollback or recovery.

## Verification
Check template validation, policy simulation or Access Analyzer, destructive replacements, quota headroom, backup restore evidence, and health alarms.

## Unhappy Paths and Recovery
Stop on resource replacement, public exposure, wildcard privilege, or cross-account trust not explicitly approved. For quota risk, secure capacity before deployment.

## Concrete Example
Create a cross-account S3 ingestion role constrained by external ID, object prefix, encryption key, Access Analyzer, and CloudTrail verification.

## Do Not Use This Skill When
Do not use to bypass organization service-control policies or account ownership.

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
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
