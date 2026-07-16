# Kubernetes Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable Kubernetes change or diagnosis for a controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Kubernetes can change. Do not activate for a name-only documentation edit.

## Why

Controllers own Pods; workload identity and network policy are least-privilege; probes, resources, topology, disruption, and rollout are explicit desired state. The skill terminates only on Kubernetes evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result and Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state.
2. **Select the boundary.** Name the changed controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover CrashLoopBackOff, probe failure, or bad configuration; ImagePullBackOff or architecture/registry identity failure; Pending due to requests, affinity, taints, topology, or volume; OOMKilled, throttling, node pressure, or eviction; Service/EndpointSlice/DNS/NetworkPolicy path failure.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity; ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy; requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `kubectl version` and `kubectl api-resources` against the target cluster
2. `kubectl apply --server-side --dry-run=server -f <rendered.yaml>`
3. `kubectl diff -f <rendered.yaml>`
4. `kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`
5. `kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`

7. **Apply review gates.**

- [ ] Pods are owned by Deployment, StatefulSet, Job, or another appropriate controller.
- [ ] ServiceAccount maps to workload identity; automounted tokens and RBAC are minimized.
- [ ] startup, readiness, and liveness probes test distinct contracts and have realistic timing.
- [ ] resource requests drive scheduling; limits and HPA signals come from measured behavior.
- [ ] PDB and rollout strategy permit both maintenance and safe availability.
- [ ] topology spread/anti-affinity distributes replicas across real failure domains.
- [ ] NetworkPolicy declares intended ingress and egress with DNS and dependency paths.
- [ ] securityContext, image digest, read-only filesystem, capabilities, and Pod Security compliance are explicit.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Kubernetes telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Kubernetes boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

## Version-aware caution

Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.

## Tradeoffs

This skill spends time fingerprinting Kubernetes and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
