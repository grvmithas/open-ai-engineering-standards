# Docker Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Docker Dockerfile, BuildKit build, OCI image, Compose service, or container release.

## Why

Docker correctness depends on source plus Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance; base and final image digests, platform manifest, layer history, SBOM, and vulnerability report; runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `docker version` and `docker buildx version`; `docker buildx build --check .` when supported by the pinned builder; `docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`; `docker image inspect <image>` and `docker history --no-trunc <image>`; `docker compose config` before applying a Compose change. Findings must identify the violated Docker invariant.

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

Review must prove "base image is maintained and pinned by digest with an update mechanism" using Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance. That Docker evidence costs more than diff inspection but exposes architecture or entrypoint exec-format mismatch before merge.

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

- [ ] base image is maintained and pinned by digest with an update mechanism.
- [ ] multi-stage build leaves compilers, package caches, and credentials outside runtime.
- [ ] BuildKit secret/SSH mounts are used instead of ARG/ENV for sensitive build input.
- [ ] `.dockerignore` excludes VCS, local secrets, test output, and irrelevant context.
- [ ] runtime image has a numeric non-root user and writable paths are explicit.
- [ ] ENTRYPOINT/CMD preserve signal delivery and use exec form.
- [ ] HEALTHCHECK tests process capability without mutating dependencies.
- [ ] labels, SBOM, provenance, platform manifest, and source revision identify the artifact.
- [ ] Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Docker evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
