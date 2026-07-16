# Next.js Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Next.js App Router route, layout, Server Component, Client Component, or Route Handler.

## Why

A syntactically valid Next.js artifact can still fail because of Server/Client module boundary violations, static-to-dynamic build conflicts, RSC serialization failures, stale or over-invalidated cache entries, hydration and streaming boundary failures. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `npm run lint -- --max-warnings=0` when the repository defines it; `npx tsc --noEmit`; `npm test -- --runInBand` using the checked-in test script; `npm run build` and retain the route classification table; `npm start` followed by production-mode HTTP and hydration smoke tests. Stop promotion on any failed item.

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

Promotion waits for "`next build` route classification matches the reviewed static/dynamic design" and "standalone or platform output includes every required runtime asset and server file". Those Next.js target checks slow release but directly bound Server/Client module boundary violations and make this rollback executable: Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.

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

- [ ] `next build` route classification matches the reviewed static/dynamic design.
- [ ] standalone or platform output includes every required runtime asset and server file.
- [ ] environment variables are separated into server-only and intentionally public `NEXT_PUBLIC_` values.
- [ ] cache invalidation is tested against the production cache/CDN topology.
- [ ] streaming, redirects, rewrites, headers, middleware/proxy, and Route Handlers pass production smoke tests.
- [ ] RSC and hydration errors remain zero in the canary cohort.
- [ ] new and old deployments can serve shared cached HTML/RSC payloads during rollout.
- [ ] rollback includes cache purge or tag invalidation when payload compatibility changed.
- [ ] Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Next.js evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
