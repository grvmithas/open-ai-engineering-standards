# Docker Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Docker Dockerfile, BuildKit build, OCI image, Compose service, or container release.

## Why

A syntactically valid Docker artifact can still fail because of architecture or entrypoint exec-format mismatch, runtime file permission or read-only filesystem failure, image/build-cache/log disk exhaustion, OOM kill or CPU throttling, Compose DNS, network, dependency, or health failure. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `docker version` and `docker buildx version`; `docker buildx build --check .` when supported by the pinned builder; `docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`; `docker image inspect <image>` and `docker history --no-trunc <image>`; `docker compose config` before applying a Compose change. Stop promotion on any failed item.

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

The Docker deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] registry digest—not mutable tag—is promoted between environments.
- [ ] signature/provenance, SBOM, license, and vulnerability policy pass.
- [ ] target node architectures are present in the OCI manifest.
- [ ] container starts with read-only root filesystem, dropped capabilities, and intended user where supported.
- [ ] memory/CPU limits and writable-volume growth are load-tested.
- [ ] SIGTERM reaches PID 1 and exits within orchestrator grace period.
- [ ] health, logs, metrics, and OOM state are visible before rollout.
- [ ] rollback references the previous digest and preserves volume/schema compatibility.
- [ ] Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Docker evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
