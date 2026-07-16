# Docker Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready Dockerfile, BuildKit build, OCI image, Compose service, or container release from repository and runtime evidence.

## Why

Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly. The generate decision is accepted only when Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance supports it; generic generate advice cannot establish that Docker state.

## How

Resolve every XML variable with sanitized Docker evidence for the Dockerfile, BuildKit build, OCI image, Compose service, or container release. Apply the invariant "Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Docker engineer for a Dockerfile, BuildKit build, OCI image, Compose service, or container release. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with Docker invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.</step>
  <step index="2">Preserve this Docker invariant: Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly.</step>
  <step index="3">Design against these failure classes: architecture or entrypoint exec-format mismatch; runtime file permission or read-only filesystem failure; image/build-cache/log disk exhaustion; OOM kill or CPU throttling; Compose DNS, network, dependency, or health failure.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: base image is maintained and pinned by digest with an update mechanism; multi-stage build leaves compilers, package caches, and credentials outside runtime; BuildKit secret/SSH mounts are used instead of ARG/ENV for sensitive build input; `.dockerignore` excludes VCS, local secrets, test output, and irrelevant context; runtime image has a numeric non-root user and writable paths are explicit; ENTRYPOINT/CMD preserve signal delivery and use exec form; HEALTHCHECK tests process capability without mutating dependencies; labels, SBOM, provenance, platform manifest, and source revision identify the artifact.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `docker version` and `docker buildx version`; `docker buildx build --check .` when supported by the pinned builder; `docker buildx build --platform &lt;platforms&gt; --provenance=true --sbom=true -t &lt;image&gt; .`; `docker image inspect &lt;image&gt;` and `docker history --no-trunc &lt;image&gt;`; `docker compose config` before applying a Compose change.</step>
  <step index="6">Define rollout and rollback exactly: Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Docker validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.

## Tradeoffs

Generation waits for Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance and base and final image digests, platform manifest, layer history, SBOM, and vulnerability report. That extra Docker discovery is justified because the output must prove "base image is maintained and pinned by digest with an update mechanism" and survive architecture or entrypoint exec-format mismatch rather than merely compile.

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

- [ ] Docker version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Docker-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
