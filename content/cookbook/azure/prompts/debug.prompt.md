# Azure Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a Azure incident by testing platform-specific failure classes before mutation.

## Why

Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit. The debug decision is accepted only when private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution supports it; generic debug advice cannot establish that Azure state.

## How

Resolve every XML variable with sanitized Azure evidence for the subscription workload, Bicep module, managed identity, private endpoint, or release pipeline. Apply the invariant "Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Azure engineer for a subscription workload, Bicep module, managed identity, private endpoint, or release pipeline. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with Azure invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: management-plane authorization or policy denial; ARM/Bicep dependency or API-version deployment failure; managed identity token/role mismatch; private DNS, route, NSG, or endpoint failure; throttling, quota, regional capacity, or service degradation.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: Bicep/ARM source, parameter provenance, compiled template, and What-If result; tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state; private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution; Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data.</step>
  <step index="3">Select minimally invasive diagnostics from: `az version` and `az account show` before evidence collection; `az bicep build --file main.bicep`; `az deployment group what-if --resource-group &lt;rg&gt; --template-file main.bicep --parameters @prod.bicepparam`; `az role assignment list --assignee-object-id &lt;object-id&gt; --all`; `az monitor activity-log list --resource-group &lt;rg&gt; --offset 2h`.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Azure validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the Azure state needed to distinguish management-plane authorization or policy denial, ARM/Bicep dependency or API-version deployment failure, managed identity token/role mismatch.

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

- [ ] Azure version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Azure-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
