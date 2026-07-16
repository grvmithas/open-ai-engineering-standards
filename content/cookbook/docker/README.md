# Docker Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a Dockerfile, BuildKit build, OCI image, Compose service, or container release using Docker's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly. Generic software advice cannot verify that invariant because the decisive evidence lives in Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance; base and final image digests, platform manifest, layer history, SBOM, and vulnerability report; runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance
- base and final image digests, platform manifest, layer history, SBOM, and vulnerability report
- runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal
- Compose rendered config, network/DNS state, container inspect, events, and resource stats

## Native verification

- `docker version` and `docker buildx version`
- `docker buildx build --check .` when supported by the pinned builder
- `docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`
- `docker image inspect <image>` and `docker history --no-trunc <image>`
- `docker compose config` before applying a Compose change

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

This cookbook requires deeper Docker evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects Dockerfile, BuildKit build, OCI image, Compose service, or container release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
