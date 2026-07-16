# Kubernetes Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Kubernetes failure classes without erasing the platform state needed to prove root cause.

## Why

Controllers own Pods; workload identity and network policy are least-privilege; probes, resources, topology, disruption, and rollout are explicit desired state. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `CrashLoopBackOff` | The container repeatedly exits or fails startup probes. | CrashLoopBackOff, probe failure, or bad configuration |
| 2 | `ImagePullBackOff` | Image name, tag/digest, registry access, or credentials are invalid. | ImagePullBackOff or architecture/registry identity failure |
| 3 | `Pending Pod` | Scheduler cannot satisfy resources, affinity, taints, or volume constraints. | Pending due to requests, affinity, taints, topology, or volume |
| 4 | `OOMKilled` | Container exceeds its memory limit or node experiences pressure. | OOMKilled, throttling, node pressure, or eviction |
| 5 | `Service unreachable` | Selector, endpoints, port mapping, policy, or DNS is wrong. | Service/EndpointSlice/DNS/NetworkPolicy path failure |

### 1. `CrashLoopBackOff`

**Failure class:** CrashLoopBackOff, probe failure, or bad configuration.

**Preserve first:** rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result.

**Discriminate:** kubectl describe and logs --previous. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For CrashLoopBackOff, probe failure, or bad configuration, correlate that observation to the exact Kubernetes target, revision, request/job, and UTC interval; compare rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result with one healthy peer or baseline.

**Native action:** `kubectl version` and `kubectl api-resources` against the target cluster. Start in the safest Kubernetes read-only or dry-run mode available. Before changing the controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, name which of CrashLoopBackOff, probe failure, or bad configuration and ImagePullBackOff or architecture/registry identity failure the action distinguishes.

**Root-cause direction:** The container repeatedly exits or fails startup probes.

**Correction:** Inspect previous logs, termination reason, config, and startup dependencies.

**Recovery proof:** Re-run `CrashLoopBackOff` reproduction, verify the CrashLoopBackOff, probe failure, or bad configuration signal cleared in kubectl describe and logs --previous. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Inspect previous logs, termination reason, config, and startup dependencies. restored the intended Kubernetes behavior through one complete workload or rollout window.

**Rollback boundary:** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

### 2. `ImagePullBackOff`

**Failure class:** ImagePullBackOff or architecture/registry identity failure.

**Preserve first:** Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state.

**Discriminate:** Pod events. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For ImagePullBackOff or architecture/registry identity failure, correlate that observation to the exact Kubernetes target, revision, request/job, and UTC interval; compare Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state with one healthy peer or baseline.

**Native action:** `kubectl apply --server-side --dry-run=server -f <rendered.yaml>`. Start in the safest Kubernetes read-only or dry-run mode available. Before changing the controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, name which of ImagePullBackOff or architecture/registry identity failure and Pending due to requests, affinity, taints, topology, or volume the action distinguishes.

**Root-cause direction:** Image name, tag/digest, registry access, or credentials are invalid.

**Correction:** Verify digest and node-side registry authentication.

**Recovery proof:** Re-run `ImagePullBackOff` reproduction, verify the ImagePullBackOff or architecture/registry identity failure signal cleared in Pod events. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Verify digest and node-side registry authentication. restored the intended Kubernetes behavior through one complete workload or rollout window.

**Rollback boundary:** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

### 3. `Pending Pod`

**Failure class:** Pending due to requests, affinity, taints, topology, or volume.

**Preserve first:** Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity.

**Discriminate:** kubectl describe pod. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Pending due to requests, affinity, taints, topology, or volume, correlate that observation to the exact Kubernetes target, revision, request/job, and UTC interval; compare Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity with one healthy peer or baseline.

**Native action:** `kubectl diff -f <rendered.yaml>`. Start in the safest Kubernetes read-only or dry-run mode available. Before changing the controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, name which of Pending due to requests, affinity, taints, topology, or volume and OOMKilled, throttling, node pressure, or eviction the action distinguishes.

**Root-cause direction:** Scheduler cannot satisfy resources, affinity, taints, or volume constraints.

**Correction:** Read scheduling events and correct the specific unsatisfied predicate.

**Recovery proof:** Re-run `Pending Pod` reproduction, verify the Pending due to requests, affinity, taints, topology, or volume signal cleared in kubectl describe pod. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Read scheduling events and correct the specific unsatisfied predicate. restored the intended Kubernetes behavior through one complete workload or rollout window.

**Rollback boundary:** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

### 4. `OOMKilled`

**Failure class:** OOMKilled, throttling, node pressure, or eviction.

**Preserve first:** ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy.

**Discriminate:** container metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For OOMKilled, throttling, node pressure, or eviction, correlate that observation to the exact Kubernetes target, revision, request/job, and UTC interval; compare ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy with one healthy peer or baseline.

**Native action:** `kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`. Start in the safest Kubernetes read-only or dry-run mode available. Before changing the controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, name which of OOMKilled, throttling, node pressure, or eviction and Service/EndpointSlice/DNS/NetworkPolicy path failure the action distinguishes.

**Root-cause direction:** Container exceeds its memory limit or node experiences pressure.

**Correction:** Profile working set and leaks; set evidence-based requests and limits.

**Recovery proof:** Re-run `OOMKilled` reproduction, verify the OOMKilled, throttling, node pressure, or eviction signal cleared in container metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Profile working set and leaks; set evidence-based requests and limits. restored the intended Kubernetes behavior through one complete workload or rollout window.

**Rollback boundary:** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

### 5. `Service unreachable`

**Failure class:** Service/EndpointSlice/DNS/NetworkPolicy path failure.

**Preserve first:** requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events.

**Discriminate:** EndpointSlice and ephemeral debug container. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Service/EndpointSlice/DNS/NetworkPolicy path failure, correlate that observation to the exact Kubernetes target, revision, request/job, and UTC interval; compare requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events with one healthy peer or baseline.

**Native action:** `kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`. Start in the safest Kubernetes read-only or dry-run mode available. Before changing the controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, name which of Service/EndpointSlice/DNS/NetworkPolicy path failure and CrashLoopBackOff, probe failure, or bad configuration the action distinguishes.

**Root-cause direction:** Selector, endpoints, port mapping, policy, or DNS is wrong.

**Correction:** Trace DNS to Service to EndpointSlice to Pod from the caller.

**Recovery proof:** Re-run `Service unreachable` reproduction, verify the Service/EndpointSlice/DNS/NetworkPolicy path failure signal cleared in EndpointSlice and ephemeral debug container. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Trace DNS to Service to EndpointSlice to Pod from the caller. restored the intended Kubernetes behavior through one complete workload or rollout window.

**Rollback boundary:** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes CrashLoopBackOff, probe failure, or bad configuration, ImagePullBackOff or architecture/registry identity failure, Pending due to requests, affinity, taints, topology, or volume, OOMKilled, throttling, node pressure, or eviction, Service/EndpointSlice/DNS/NetworkPolicy path failure and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
