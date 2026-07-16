# Azure Skill

> **Skill ID:** `azure`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when An Azure identity, network, compute, data, policy, or deployment design changes.

## Why
An Azure architecture record, Bicep or Terraform change, RBAC matrix, policy results, cost estimate, and deployment/rollback evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An Azure identity, network, compute, data, policy, or deployment design changes.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An Azure architecture record
- Bicep or Terraform change
- RBAC matrix
- policy results
- cost estimate
- deployment/rollback evidence.

## Procedure
1. Identify subscription, tenant, region, data classification, RTO/RPO, and landing-zone constraints.
2. Use managed identity and least-privilege built-in roles; map control-plane and data-plane permissions separately.
3. Design private connectivity, DNS, encryption, backup, zone/region resilience, tags, budgets, and diagnostic settings.
4. Generate an IaC what-if or plan; evaluate Azure Policy and resource-provider limitations before approval.
5. Deploy through approved promotion, verify resource health and application SLIs, then test rollback or failover.

## Verification
Require successful Bicep build or Terraform validation, Azure what-if review, policy compliance, role assignment review, and post-deploy health evidence.

## Unhappy Paths and Recovery
If what-if shows replacement or deletion, stop for explicit effect approval. If a service is unavailable in-region, document the compliant alternative rather than silently changing region.

## Concrete Example
Move an app to Key Vault references with managed identity, private endpoint/DNS, least-privilege secret access, diagnostics, and what-if evidence.

## Do Not Use This Skill When
Do not use to make tenant-wide governance changes without the platform owner.

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
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Azure RBAC Best Practices](https://learn.microsoft.com/azure/role-based-access-control/best-practices)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
