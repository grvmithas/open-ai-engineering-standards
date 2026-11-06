---
name: nextjs
description: "Execute a repeatable Next.js change or diagnosis for a App Router route, layout, Server Component, Client Component, or Route Handler, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Next.js can change."
---

# Next.js Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Next.js change or diagnosis for a App Router route, layout, Server Component, Client Component, or Route Handler, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Next.js can change. Do not activate for a name-only documentation edit.

## Why

Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary. The skill terminates only on Next.js evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `package.json`, lockfile, `next.config.*`, and installed Next.js docs and route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers.
2. **Select the boundary.** Name the changed App Router route, layout, Server Component, Client Component, or Route Handler, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover Server/Client module boundary violations; static-to-dynamic build conflicts; RSC serialization failures; stale or over-invalidated cache entries; hydration and streaming boundary failures.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: build output showing static, dynamic, and route bundle classification; response `Cache-Control`, `Vary`, revalidation, and RSC request evidence.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `npm run lint -- --max-warnings=0` when the repository defines it
2. `npx tsc --noEmit`
3. `npm test -- --runInBand` using the checked-in test script
4. `npm run build` and retain the route classification table
5. `npm start` followed by production-mode HTTP and hydration smoke tests

7. **Apply review gates.**

- [ ] `use client` appears only at the smallest browser-interactive boundary.
- [ ] Server Components do not import browser-only modules and client props are serializable.
- [ ] request-time APIs and uncached fetches intentionally opt a route into dynamic work.
- [ ] cache keys, tags, revalidation, and invalidation ownership are explicit.
- [ ] Route Handlers validate input, authenticate before mutation, and return stable error contracts.
- [ ] `loading`, `error`, and `not-found` boundaries match recoverable route regions.
- [ ] metadata, canonical URL, robots behavior, and structured data match route intent.
- [ ] images, fonts, scripts, and route chunks use framework facilities with measured impact.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

## Verification

The Next.js evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain `package.json`, lockfile, `next.config.*`, and installed Next.js docs. For manual App Router route, layout, Server Component, Client Component, or Route Handler checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Next.js telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Next.js boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Next.js workflow only when native validation, applicable review/deployment gates, and recovery signals for Server/Client module boundary violations and static-to-dynamic build conflicts pass. Otherwise record a named owner and the exact missing Next.js evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

This skill fingerprints Next.js through `package.json`, lockfile, `next.config.*`, and installed Next.js docs before editing and retains build output showing static, dynamic, and route bundle classification before recovery. The added work is warranted when Server/Client module boundary violations could make Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
