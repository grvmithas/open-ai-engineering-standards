# Next.js Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Next.js failure classes without erasing the platform state needed to prove root cause.

## Why

Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `You're importing a component that needs useState` | A Server Component imports client-only behavior. | Server/Client module boundary violations |
| 2 | `Dynamic server usage` | A static route reads request-specific data. | static-to-dynamic build conflicts |
| 3 | `Hydration failed` | Client output differs from server HTML. | RSC serialization failures |
| 4 | `Route Handler returns stale data` | Cache semantics were left implicit. | stale or over-invalidated cache entries |
| 5 | `NEXT_REDIRECT surfaced as an error` | redirect was caught by a broad catch block. | hydration and streaming boundary failures |

### 1. `You're importing a component that needs useState`

**Failure class:** Server/Client module boundary violations.

**Preserve first:** `package.json`, lockfile, `next.config.*`, and installed Next.js docs.

**Discriminate:** next build. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Server/Client module boundary violations, correlate that observation to the exact Next.js target, revision, request/job, and UTC interval; compare `package.json`, lockfile, `next.config.*`, and installed Next.js docs with one healthy peer or baseline.

**Native action:** `npm run lint -- --max-warnings=0` when the repository defines it. Start in the safest Next.js read-only or dry-run mode available. Before changing the App Router route, layout, Server Component, Client Component, or Route Handler, name which of Server/Client module boundary violations and static-to-dynamic build conflicts the action distinguishes.

**Root-cause direction:** A Server Component imports client-only behavior.

**Correction:** Move the smallest interactive subtree behind a use client boundary.

**Recovery proof:** Re-run `You're importing a component that needs useState` reproduction, verify the Server/Client module boundary violations signal cleared in next build. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Move the smallest interactive subtree behind a use client boundary. restored the intended Next.js behavior through one complete workload or rollout window.

**Rollback boundary:** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

### 2. `Dynamic server usage`

**Failure class:** static-to-dynamic build conflicts.

**Preserve first:** route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers.

**Discriminate:** next build. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For static-to-dynamic build conflicts, correlate that observation to the exact Next.js target, revision, request/job, and UTC interval; compare route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers with one healthy peer or baseline.

**Native action:** `npx tsc --noEmit`. Start in the safest Next.js read-only or dry-run mode available. Before changing the App Router route, layout, Server Component, Client Component, or Route Handler, name which of static-to-dynamic build conflicts and RSC serialization failures the action distinguishes.

**Root-cause direction:** A static route reads request-specific data.

**Correction:** Declare the route dynamic or move request access into an appropriate dynamic boundary.

**Recovery proof:** Re-run `Dynamic server usage` reproduction, verify the static-to-dynamic build conflicts signal cleared in next build. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Declare the route dynamic or move request access into an appropriate dynamic boundary. restored the intended Next.js behavior through one complete workload or rollout window.

**Rollback boundary:** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

### 3. `Hydration failed`

**Failure class:** RSC serialization failures.

**Preserve first:** build output showing static, dynamic, and route bundle classification.

**Discriminate:** browser console. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For RSC serialization failures, correlate that observation to the exact Next.js target, revision, request/job, and UTC interval; compare build output showing static, dynamic, and route bundle classification with one healthy peer or baseline.

**Native action:** `npm test -- --runInBand` using the checked-in test script. Start in the safest Next.js read-only or dry-run mode available. Before changing the App Router route, layout, Server Component, Client Component, or Route Handler, name which of RSC serialization failures and stale or over-invalidated cache entries the action distinguishes.

**Root-cause direction:** Client output differs from server HTML.

**Correction:** Remove time, randomness, or browser-only branches from initial render.

**Recovery proof:** Re-run `Hydration failed` reproduction, verify the RSC serialization failures signal cleared in browser console. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Remove time, randomness, or browser-only branches from initial render. restored the intended Next.js behavior through one complete workload or rollout window.

**Rollback boundary:** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

### 4. `Route Handler returns stale data`

**Failure class:** stale or over-invalidated cache entries.

**Preserve first:** response `Cache-Control`, `Vary`, revalidation, and RSC request evidence.

**Discriminate:** response cache headers. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For stale or over-invalidated cache entries, correlate that observation to the exact Next.js target, revision, request/job, and UTC interval; compare response `Cache-Control`, `Vary`, revalidation, and RSC request evidence with one healthy peer or baseline.

**Native action:** `npm run build` and retain the route classification table. Start in the safest Next.js read-only or dry-run mode available. Before changing the App Router route, layout, Server Component, Client Component, or Route Handler, name which of stale or over-invalidated cache entries and hydration and streaming boundary failures the action distinguishes.

**Root-cause direction:** Cache semantics were left implicit.

**Correction:** Declare revalidation or no-store behavior at the data boundary.

**Recovery proof:** Re-run `Route Handler returns stale data` reproduction, verify the stale or over-invalidated cache entries signal cleared in response cache headers. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Declare revalidation or no-store behavior at the data boundary. restored the intended Next.js behavior through one complete workload or rollout window.

**Rollback boundary:** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

### 5. `NEXT_REDIRECT surfaced as an error`

**Failure class:** hydration and streaming boundary failures.

**Preserve first:** `package.json`, lockfile, `next.config.*`, and installed Next.js docs.

**Discriminate:** server logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For hydration and streaming boundary failures, correlate that observation to the exact Next.js target, revision, request/job, and UTC interval; compare `package.json`, lockfile, `next.config.*`, and installed Next.js docs with one healthy peer or baseline.

**Native action:** `npm start` followed by production-mode HTTP and hydration smoke tests. Start in the safest Next.js read-only or dry-run mode available. Before changing the App Router route, layout, Server Component, Client Component, or Route Handler, name which of hydration and streaming boundary failures and Server/Client module boundary violations the action distinguishes.

**Root-cause direction:** redirect was caught by a broad catch block.

**Correction:** Call redirect outside try/catch or rethrow framework control-flow errors.

**Recovery proof:** Re-run `NEXT_REDIRECT surfaced as an error` reproduction, verify the hydration and streaming boundary failures signal cleared in server logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Call redirect outside try/catch or rethrow framework control-flow errors. restored the intended Next.js behavior through one complete workload or rollout window.

**Rollback boundary:** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes Server/Client module boundary violations, static-to-dynamic build conflicts, RSC serialization failures, stale or over-invalidated cache entries, hydration and streaming boundary failures and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
