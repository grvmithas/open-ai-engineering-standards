# Azure Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Azure subscription workload, Bicep module, managed identity, private endpoint, or release pipeline.

## Why

Azure correctness depends on source plus Bicep/ARM source, parameter provenance, compiled template, and What-If result; tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state; private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `az version` and `az account show` before evidence collection; `az bicep build --file main.bicep`; `az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`; `az role assignment list --assignee-object-id <object-id> --all`; `az monitor activity-log list --resource-group <rg> --offset 2h`. Findings must identify the violated Azure invariant.

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

Review must prove "Bicep uses explicit supported API versions and deterministic names/scopes" using Bicep/ARM source, parameter provenance, compiled template, and What-If result. That Azure evidence costs more than diff inspection but exposes management-plane authorization or policy denial before merge.

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

- [ ] Bicep uses explicit supported API versions and deterministic names/scopes.
- [ ] managed identity replaces account keys and role scope is no broader than required.
- [ ] public network access is disabled or justified with compensating controls.
- [ ] private DNS zone and VNet links are modeled with endpoint lifecycle.
- [ ] policy assignments and exemptions have owner, expiry, and evidence.
- [ ] diagnostic settings route required categories to the governed destination.
- [ ] resource locks and deletion/recovery semantics match state criticality.
- [ ] tags, budgets, reservations, and data residency are defined at landing-zone boundaries.
- [ ] Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Azure evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
