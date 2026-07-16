# Azure Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Azure subscription workload, Bicep module, managed identity, private endpoint, or release pipeline.

## Why

A syntactically valid Azure artifact can still fail because of management-plane authorization or policy denial, ARM/Bicep dependency or API-version deployment failure, managed identity token/role mismatch, private DNS, route, NSG, or endpoint failure, throttling, quota, regional capacity, or service degradation. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `az version` and `az account show` before evidence collection; `az bicep build --file main.bicep`; `az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`; `az role assignment list --assignee-object-id <object-id> --all`; `az monitor activity-log list --resource-group <rg> --offset 2h`. Stop promotion on any failed item.

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

Promotion waits for "Bicep build/lint and ARM What-If are retained and reviewed for deletes/replacements" and "target tenant, subscription, region, provider registration, quota, and policy state are preflighted". Those Azure target checks slow release but directly bound management-plane authorization or policy denial and make this rollback executable: Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

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

- [ ] Bicep build/lint and ARM What-If are retained and reviewed for deletes/replacements.
- [ ] target tenant, subscription, region, provider registration, quota, and policy state are preflighted.
- [ ] deployment identity has temporary least-privilege management-plane access.
- [ ] data-plane RBAC propagation and managed identity are tested from the workload.
- [ ] private DNS and endpoint connectivity are tested from every caller network.
- [ ] Azure Monitor alerts, Activity Log, diagnostics, and Service Health routing are active.
- [ ] safe-deployment rings use health criteria and stop on platform/user-impact regression.
- [ ] rollback accounts for non-reversible data-plane changes and resource deletion locks.
- [ ] Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Azure evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
