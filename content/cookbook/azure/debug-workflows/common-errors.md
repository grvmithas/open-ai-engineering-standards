# Azure Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Azure failure classes without erasing the platform state needed to prove root cause.

## Why

Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `AuthorizationFailed` | The principal lacks a role at the effective scope or propagation is incomplete. | management-plane authorization or policy denial |
| 2 | `DeploymentFailed` | An ARM/Bicep child operation failed. | ARM/Bicep dependency or API-version deployment failure |
| 3 | `ManagedIdentityCredential authentication unavailable` | Identity is absent, disabled, or requested with the wrong client ID. | managed identity token/role mismatch |
| 4 | `Private endpoint DNS failure` | The hostname does not resolve to the private endpoint from the workload network. | private DNS, route, NSG, or endpoint failure |
| 5 | `429 throttling` | Requests exceed a service or subscription quota. | throttling, quota, regional capacity, or service degradation |

### 1. `AuthorizationFailed`

**Failure class:** management-plane authorization or policy denial.

**Preserve first:** Bicep/ARM source, parameter provenance, compiled template, and What-If result.

**Discriminate:** Azure Activity Log. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For management-plane authorization or policy denial, correlate that observation to the exact Azure target, revision, request/job, and UTC interval; compare Bicep/ARM source, parameter provenance, compiled template, and What-If result with one healthy peer or baseline.

**Native action:** `az version` and `az account show` before evidence collection. Start in the safest Azure read-only or dry-run mode available. Before changing the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, name which of management-plane authorization or policy denial and ARM/Bicep dependency or API-version deployment failure the action distinguishes.

**Root-cause direction:** The principal lacks a role at the effective scope or propagation is incomplete.

**Correction:** Verify principal, scope, deny assignments, and least-privilege role.

**Recovery proof:** Re-run `AuthorizationFailed` reproduction, verify the management-plane authorization or policy denial signal cleared in Azure Activity Log. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Verify principal, scope, deny assignments, and least-privilege role. restored the intended Azure behavior through one complete workload or rollout window.

**Rollback boundary:** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

### 2. `DeploymentFailed`

**Failure class:** ARM/Bicep dependency or API-version deployment failure.

**Preserve first:** tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state.

**Discriminate:** deployment operations. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For ARM/Bicep dependency or API-version deployment failure, correlate that observation to the exact Azure target, revision, request/job, and UTC interval; compare tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state with one healthy peer or baseline.

**Native action:** `az bicep build --file main.bicep`. Start in the safest Azure read-only or dry-run mode available. Before changing the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, name which of ARM/Bicep dependency or API-version deployment failure and managed identity token/role mismatch the action distinguishes.

**Root-cause direction:** An ARM/Bicep child operation failed.

**Correction:** Inspect nested deployment operations and correct the first causal error.

**Recovery proof:** Re-run `DeploymentFailed` reproduction, verify the ARM/Bicep dependency or API-version deployment failure signal cleared in deployment operations. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Inspect nested deployment operations and correct the first causal error. restored the intended Azure behavior through one complete workload or rollout window.

**Rollback boundary:** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

### 3. `ManagedIdentityCredential authentication unavailable`

**Failure class:** managed identity token/role mismatch.

**Preserve first:** private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution.

**Discriminate:** identity sign-in logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For managed identity token/role mismatch, correlate that observation to the exact Azure target, revision, request/job, and UTC interval; compare private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution with one healthy peer or baseline.

**Native action:** `az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`. Start in the safest Azure read-only or dry-run mode available. Before changing the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, name which of managed identity token/role mismatch and private DNS, route, NSG, or endpoint failure the action distinguishes.

**Root-cause direction:** Identity is absent, disabled, or requested with the wrong client ID.

**Correction:** Enable the intended identity and grant its resource-plane role.

**Recovery proof:** Re-run `ManagedIdentityCredential authentication unavailable` reproduction, verify the managed identity token/role mismatch signal cleared in identity sign-in logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Enable the intended identity and grant its resource-plane role. restored the intended Azure behavior through one complete workload or rollout window.

**Rollback boundary:** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

### 4. `Private endpoint DNS failure`

**Failure class:** private DNS, route, NSG, or endpoint failure.

**Preserve first:** Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data.

**Discriminate:** DNS lookup and Network Watcher. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For private DNS, route, NSG, or endpoint failure, correlate that observation to the exact Azure target, revision, request/job, and UTC interval; compare Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data with one healthy peer or baseline.

**Native action:** `az role assignment list --assignee-object-id <object-id> --all`. Start in the safest Azure read-only or dry-run mode available. Before changing the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, name which of private DNS, route, NSG, or endpoint failure and throttling, quota, regional capacity, or service degradation the action distinguishes.

**Root-cause direction:** The hostname does not resolve to the private endpoint from the workload network.

**Correction:** Link the correct private DNS zone and test from the caller subnet.

**Recovery proof:** Re-run `Private endpoint DNS failure` reproduction, verify the private DNS, route, NSG, or endpoint failure signal cleared in DNS lookup and Network Watcher. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Link the correct private DNS zone and test from the caller subnet. restored the intended Azure behavior through one complete workload or rollout window.

**Rollback boundary:** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

### 5. `429 throttling`

**Failure class:** throttling, quota, regional capacity, or service degradation.

**Preserve first:** Bicep/ARM source, parameter provenance, compiled template, and What-If result.

**Discriminate:** Azure Monitor metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For throttling, quota, regional capacity, or service degradation, correlate that observation to the exact Azure target, revision, request/job, and UTC interval; compare Bicep/ARM source, parameter provenance, compiled template, and What-If result with one healthy peer or baseline.

**Native action:** `az monitor activity-log list --resource-group <rg> --offset 2h`. Start in the safest Azure read-only or dry-run mode available. Before changing the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline, name which of throttling, quota, regional capacity, or service degradation and management-plane authorization or policy denial the action distinguishes.

**Root-cause direction:** Requests exceed a service or subscription quota.

**Correction:** Honor Retry-After, add jitter, smooth concurrency, and request quota only with evidence.

**Recovery proof:** Re-run `429 throttling` reproduction, verify the throttling, quota, regional capacity, or service degradation signal cleared in Azure Monitor metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Honor Retry-After, add jitter, smooth concurrency, and request quota only with evidence. restored the intended Azure behavior through one complete workload or rollout window.

**Rollback boundary:** Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes management-plane authorization or policy denial, ARM/Bicep dependency or API-version deployment failure, managed identity token/role mismatch, private DNS, route, NSG, or endpoint failure, throttling, quota, regional capacity, or service degradation and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
