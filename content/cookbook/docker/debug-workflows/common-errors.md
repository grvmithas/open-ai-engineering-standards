# Docker Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Docker failure classes without erasing the platform state needed to prove root cause.

## Why

Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `exec format error` | Image architecture or entrypoint executable format mismatches the runtime. | architecture or entrypoint exec-format mismatch |
| 2 | `permission denied at startup` | The runtime user cannot read or write required paths. | runtime file permission or read-only filesystem failure |
| 3 | `no space left on device` | Layers, build cache, logs, or writable data exhausted storage. | image/build-cache/log disk exhaustion |
| 4 | `container exits with code 137` | The process was SIGKILLed, commonly by an OOM limit. | OOM kill or CPU throttling |
| 5 | `service cannot resolve Compose peer` | Services are not on the same network or use the wrong hostname. | Compose DNS, network, dependency, or health failure |

### 1. `exec format error`

**Failure class:** architecture or entrypoint exec-format mismatch.

**Preserve first:** Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance.

**Discriminate:** docker image inspect. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `docker version` and `docker buildx version`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Image architecture or entrypoint executable format mismatches the runtime.

**Correction:** Build for the target platform and verify shebang and line endings.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

### 2. `permission denied at startup`

**Failure class:** runtime file permission or read-only filesystem failure.

**Preserve first:** base and final image digests, platform manifest, layer history, SBOM, and vulnerability report.

**Discriminate:** docker run with target user. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `docker buildx build --check .` when supported by the pinned builder. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** The runtime user cannot read or write required paths.

**Correction:** Create and chown only required paths during build.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

### 3. `no space left on device`

**Failure class:** image/build-cache/log disk exhaustion.

**Preserve first:** runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal.

**Discriminate:** docker system df. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Layers, build cache, logs, or writable data exhausted storage.

**Correction:** Measure Docker disk use and apply retention without deleting active data.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

### 4. `container exits with code 137`

**Failure class:** OOM kill or CPU throttling.

**Preserve first:** Compose rendered config, network/DNS state, container inspect, events, and resource stats.

**Discriminate:** docker inspect. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `docker image inspect <image>` and `docker history --no-trunc <image>`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** The process was SIGKILLed, commonly by an OOM limit.

**Correction:** Inspect runtime OOM state and reduce memory or set evidence-based limits.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

### 5. `service cannot resolve Compose peer`

**Failure class:** Compose DNS, network, dependency, or health failure.

**Preserve first:** Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance.

**Discriminate:** docker compose config. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `docker compose config` before applying a Compose change. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Services are not on the same network or use the wrong hostname.

**Correction:** Use the Compose service name on a shared declared network.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes architecture or entrypoint exec-format mismatch, runtime file permission or read-only filesystem failure, image/build-cache/log disk exhaustion, OOM kill or CPU throttling, Compose DNS, network, dependency, or health failure and prevents recurring incidents hidden by state reset.

## Anti-patterns

- Installing build tools, package caches, and credentials in the final stage expands attack surface and makes the image irreproducible.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Container governance approves base-image families, enforces digest promotion and signed provenance, applies vulnerability SLAs, and retains SBOMs for every deployed digest.

## Official sources

- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Build best practices](https://docs.docker.com/build/building/best-practices/)
- [Build secrets](https://docs.docker.com/build/building/secrets/)
- [Docker security](https://docs.docker.com/engine/security/)

## Checklist

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
