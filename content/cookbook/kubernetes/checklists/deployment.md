# Kubernetes Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Kubernetes controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release.

## Why

A syntactically valid Kubernetes artifact can still fail because of CrashLoopBackOff, probe failure, or bad configuration, ImagePullBackOff or architecture/registry identity failure, Pending due to requests, affinity, taints, topology, or volume, OOMKilled, throttling, node pressure, or eviction, Service/EndpointSlice/DNS/NetworkPolicy path failure. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `kubectl version` and `kubectl api-resources` against the target cluster; `kubectl apply --server-side --dry-run=server -f <rendered.yaml>`; `kubectl diff -f <rendered.yaml>`; `kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`; `kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`. Stop promotion on any failed item.

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

Promotion waits for "rendered manifests are retained and server-side dry-run/admission succeeds on the target cluster" and "`kubectl diff` contains no unapproved immutable-field replacement or selector change". Those Kubernetes target checks slow release but directly bound CrashLoopBackOff, probe failure, or bad configuration and make this rollback executable: Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

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

- [ ] rendered manifests are retained and server-side dry-run/admission succeeds on the target cluster.
- [ ] `kubectl diff` contains no unapproved immutable-field replacement or selector change.
- [ ] image digest, signature/SBOM policy, ServiceAccount identity, Secret references, and ConfigMap revision are verified.
- [ ] requests fit node pools and quota; HPA, PDB, topology spread, and surge capacity can coexist.
- [ ] GitOps controller reports the expected revision and no manual drift.
- [ ] rollout status, events, probe failures, EndpointSlices, and user-impact SLO are watched together.
- [ ] canary rollback threshold covers 5xx, latency, restarts, OOM, and unavailable replicas.
- [ ] rollback uses controller or GitOps revision and accounts for schema/config compatibility.
- [ ] Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Kubernetes evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
