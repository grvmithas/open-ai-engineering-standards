# Kubernetes Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Kubernetes controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release.

## Why

Kubernetes correctness depends on source plus rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result; Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state; Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `kubectl version` and `kubectl api-resources` against the target cluster; `kubectl apply --server-side --dry-run=server -f <rendered.yaml>`; `kubectl diff -f <rendered.yaml>`; `kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`; `kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`. Findings must identify the violated Kubernetes invariant.

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

The Kubernetes review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] Pods are owned by Deployment, StatefulSet, Job, or another appropriate controller.
- [ ] ServiceAccount maps to workload identity; automounted tokens and RBAC are minimized.
- [ ] startup, readiness, and liveness probes test distinct contracts and have realistic timing.
- [ ] resource requests drive scheduling; limits and HPA signals come from measured behavior.
- [ ] PDB and rollout strategy permit both maintenance and safe availability.
- [ ] topology spread/anti-affinity distributes replicas across real failure domains.
- [ ] NetworkPolicy declares intended ingress and egress with DNS and dependency paths.
- [ ] securityContext, image digest, read-only filesystem, capabilities, and Pod Security compliance are explicit.
- [ ] Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Kubernetes evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
