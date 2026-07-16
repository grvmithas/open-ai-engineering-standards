# Azure Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a subscription workload, Bicep module, managed identity, private endpoint, or release pipeline using Azure's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit. Generic software advice cannot verify that invariant because the decisive evidence lives in Bicep/ARM source, parameter provenance, compiled template, and What-If result; tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state; private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- Bicep/ARM source, parameter provenance, compiled template, and What-If result
- tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state
- private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution
- Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data

## Native verification

- `az version` and `az account show` before evidence collection
- `az bicep build --file main.bicep`
- `az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`
- `az role assignment list --assignee-object-id <object-id> --all`
- `az monitor activity-log list --resource-group <rg> --offset 2h`

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

This cookbook requires deeper Azure evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects subscription workload, Bicep module, managed identity, private endpoint, or release pipeline state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
