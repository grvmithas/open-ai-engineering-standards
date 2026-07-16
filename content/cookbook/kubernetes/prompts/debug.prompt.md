# Kubernetes Debug Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose a Kubernetes incident by testing platform-specific failure classes before mutation.

## Why

Controllers own Pods; workload identity and network policy are least-privilege; probes, resources, topology, disruption, and rollout are explicit desired state. This prompt requires native Kubernetes artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Kubernetes engineer for a controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Kubernetes invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Classify the symptom into: CrashLoopBackOff, probe failure, or bad configuration; ImagePullBackOff or architecture/registry identity failure; Pending due to requests, affinity, taints, topology, or volume; OOMKilled, throttling, node pressure, or eviction; Service/EndpointSlice/DNS/NetworkPolicy path failure.</step>
  <step index="2">Capture these artifacts before restart, failover, cache clear, or rollback: rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result; Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state; Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity; ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy; requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events.</step>
  <step index="3">Select minimally invasive diagnostics from: `kubectl version` and `kubectl api-resources` against the target cluster; `kubectl apply --server-side --dry-run=server -f &lt;rendered.yaml&gt;`; `kubectl diff -f &lt;rendered.yaml&gt;`; `kubectl auth can-i --as=system:serviceaccount:&lt;ns&gt;:&lt;sa&gt; &lt;verb&gt; &lt;resource&gt;`; `kubectl rollout status deployment/&lt;name&gt; -n &lt;ns&gt; --timeout=&lt;budget&gt;`.</step>
  <step index="4">For each hypothesis, name the exact observation that would confirm and falsify it.</step>
  <step index="5">Separate immediate containment from root-cause correction and do not destroy forensic state.</step>
  <step index="6">Use this rollback boundary: Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.</step>
</instructions>
<output_format>
Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Kubernetes validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the Kubernetes state needed to distinguish CrashLoopBackOff, probe failure, or bad configuration, ImagePullBackOff or architecture/registry identity failure, Pending due to requests, affinity, taints, topology, or volume.

## Anti-patterns

- Directly patching a production Pod bypasses controller history, GitOps convergence, rollout safety, and reproducible incident recovery.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Kubernetes platform governance owns admission policy, supported APIs, node/CNI/CSI baselines, namespace tenancy, workload identity, image policy, and audit-log retention.

## Official sources

- [Kubernetes workloads](https://kubernetes.io/docs/concepts/workloads/controllers/)
- [Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)
- [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Pod disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
- [Security checklist](https://kubernetes.io/docs/concepts/security/security-checklist/)

## Checklist

- [ ] Kubernetes version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Kubernetes-specific debug prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
