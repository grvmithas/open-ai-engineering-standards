---
name: docker
description: "Execute a repeatable Docker change or diagnosis for a Dockerfile, BuildKit build, OCI image, Compose service, or container release, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Docker can change."
---

# Docker Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Docker change or diagnosis for a Dockerfile, BuildKit build, OCI image, Compose service, or container release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Docker can change. Do not activate for a name-only documentation edit.

## Why

Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly. The skill terminates only on Docker evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance and base and final image digests, platform manifest, layer history, SBOM, and vulnerability report.
2. **Select the boundary.** Name the changed Dockerfile, BuildKit build, OCI image, Compose service, or container release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover architecture or entrypoint exec-format mismatch; runtime file permission or read-only filesystem failure; image/build-cache/log disk exhaustion; OOM kill or CPU throttling; Compose DNS, network, dependency, or health failure.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal; Compose rendered config, network/DNS state, container inspect, events, and resource stats.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `docker version` and `docker buildx version`
2. `docker buildx build --check .` when supported by the pinned builder
3. `docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`
4. `docker image inspect <image>` and `docker history --no-trunc <image>`
5. `docker compose config` before applying a Compose change

7. **Apply review gates.**

- [ ] base image is maintained and pinned by digest with an update mechanism.
- [ ] multi-stage build leaves compilers, package caches, and credentials outside runtime.
- [ ] BuildKit secret/SSH mounts are used instead of ARG/ENV for sensitive build input.
- [ ] `.dockerignore` excludes VCS, local secrets, test output, and irrelevant context.
- [ ] runtime image has a numeric non-root user and writable paths are explicit.
- [ ] ENTRYPOINT/CMD preserve signal delivery and use exec form.
- [ ] HEALTHCHECK tests process capability without mutating dependencies.
- [ ] labels, SBOM, provenance, platform manifest, and source revision identify the artifact.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

## Verification

The Docker evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance. For manual Dockerfile, BuildKit build, OCI image, Compose service, or container release checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Docker telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Docker boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Docker workflow only when native validation, applicable review/deployment gates, and recovery signals for architecture or entrypoint exec-format mismatch and runtime file permission or read-only filesystem failure pass. Otherwise record a named owner and the exact missing Docker evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

This skill fingerprints Docker through Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance before editing and retains runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal before recovery. The added work is warranted when architecture or entrypoint exec-format mismatch could make Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
