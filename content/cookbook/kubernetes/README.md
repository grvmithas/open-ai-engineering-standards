# Kubernetes Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release using Kubernetes's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Controllers own Pods; workload identity and network policy are least-privilege; probes, resources, topology, disruption, and rollout are explicit desired state. Generic software advice cannot verify that invariant because the decisive evidence lives in rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result; Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state; Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result
- Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state
- Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity
- ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy
- requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events

## Native verification

- `kubectl version` and `kubectl api-resources` against the target cluster
- `kubectl apply --server-side --dry-run=server -f <rendered.yaml>`
- `kubectl diff -f <rendered.yaml>`
- `kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`
- `kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

This cookbook requires deeper Kubernetes evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
