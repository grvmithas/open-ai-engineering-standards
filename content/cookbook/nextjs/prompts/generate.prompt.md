# Next.js Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready App Router route, layout, Server Component, Client Component, or Route Handler from repository and runtime evidence.

## Why

Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary. This prompt requires native Next.js artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Next.js engineer for a App Router route, layout, Server Component, Client Component, or Route Handler. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with Next.js invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.</step>
  <step index="2">Preserve this Next.js invariant: Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary.</step>
  <step index="3">Design against these failure classes: Server/Client module boundary violations; static-to-dynamic build conflicts; RSC serialization failures; stale or over-invalidated cache entries; hydration and streaming boundary failures.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: `use client` appears only at the smallest browser-interactive boundary; Server Components do not import browser-only modules and client props are serializable; request-time APIs and uncached fetches intentionally opt a route into dynamic work; cache keys, tags, revalidation, and invalidation ownership are explicit; Route Handlers validate input, authenticate before mutation, and return stable error contracts; `loading`, `error`, and `not-found` boundaries match recoverable route regions; metadata, canonical URL, robots behavior, and structured data match route intent; images, fonts, scripts, and route chunks use framework facilities with measured impact.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `npm run lint -- --max-warnings=0` when the repository defines it; `npx tsc --noEmit`; `npm test -- --runInBand` using the checked-in test script; `npm run build` and retain the route classification table; `npm start` followed by production-mode HTTP and hydration smoke tests.</step>
  <step index="6">Define rollout and rollback exactly: Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Next.js validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

The prompt rejects fast code generation when Next.js version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported App Router route, layout, Server Component, Client Component, or Route Handler boundary.

## Anti-patterns

- Marking a layout or page `use client` pulls its import graph into the browser and discards the App Router's server-first boundary.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Next.js governance must pin hosting behavior, cache ownership, public environment-variable review, third-party script policy, and framework upgrade tests against installed documentation.

## Official sources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Caching](https://nextjs.org/docs/app/guides/caching)
- [Production checklist](https://nextjs.org/docs/app/guides/production-checklist)

## Checklist

- [ ] Next.js version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Next.js-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
