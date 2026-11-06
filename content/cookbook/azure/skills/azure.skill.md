---
name: azure
description: "Execute a repeatable Azure change or diagnosis for a subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Azure can change."
---

# Azure Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Azure change or diagnosis for a subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Azure can change. Do not activate for a name-only documentation edit.

## Why

Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit. The skill terminates only on Azure evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture Bicep/ARM source, parameter provenance, compiled template, and What-If result and tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state.
2. **Select the boundary.** Name the changed subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover management-plane authorization or policy denial; ARM/Bicep dependency or API-version deployment failure; managed identity token/role mismatch; private DNS, route, NSG, or endpoint failure; throttling, quota, regional capacity, or service degradation.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution; Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `az version` and `az account show` before evidence collection
2. `az bicep build --file main.bicep`
3. `az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`
4. `az role assignment list --assignee-object-id <object-id> --all`
5. `az monitor activity-log list --resource-group <rg> --offset 2h`

7. **Apply review gates.**

- [ ] Bicep uses explicit supported API versions and deterministic names/scopes.
- [ ] managed identity replaces account keys and role scope is no broader than required.
- [ ] public network access is disabled or justified with compensating controls.
- [ ] private DNS zone and VNet links are modeled with endpoint lifecycle.
- [ ] policy assignments and exemptions have owner, expiry, and evidence.
- [ ] diagnostic settings route required categories to the governed destination.
- [ ] resource locks and deletion/recovery semantics match state criticality.
- [ ] tags, budgets, reservations, and data residency are defined at landing-zone boundaries.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

## Verification

The Azure evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain Bicep/ARM source, parameter provenance, compiled template, and What-If result. For manual subscription workload, Bicep module, managed identity, private endpoint, or release pipeline checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Azure telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Azure boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Azure workflow only when native validation, applicable review/deployment gates, and recovery signals for management-plane authorization or policy denial and ARM/Bicep dependency or API-version deployment failure pass. Otherwise record a named owner and the exact missing Azure evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

This skill fingerprints Azure through Bicep/ARM source, parameter provenance, compiled template, and What-If result before editing and retains private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution before recovery. The added work is warranted when management-plane authorization or policy denial could make Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

## Anti-patterns

- Portal-authored production resources create configuration that cannot be reviewed, reproduced, or safely rolled back.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Azure governance maps management groups to policy initiatives, centralizes Activity Logs and diagnostics, time-bounds exemptions, and records data residency and cost ownership.

## Official sources

- [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Bicep deployments](https://learn.microsoft.com/azure/azure-resource-manager/bicep/deploy-cli)
- [Managed identities](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview)

## Checklist

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
