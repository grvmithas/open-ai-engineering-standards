# Next.js Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Next.js App Router route, layout, Server Component, Client Component, or Route Handler.

## Why

Next.js correctness depends on source plus `package.json`, lockfile, `next.config.*`, and installed Next.js docs; route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers; build output showing static, dynamic, and route bundle classification. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `npm run lint -- --max-warnings=0` when the repository defines it; `npx tsc --noEmit`; `npm test -- --runInBand` using the checked-in test script; `npm run build` and retain the route classification table; `npm start` followed by production-mode HTTP and hydration smoke tests. Findings must identify the violated Next.js invariant.

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

The Next.js review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] `use client` appears only at the smallest browser-interactive boundary.
- [ ] Server Components do not import browser-only modules and client props are serializable.
- [ ] request-time APIs and uncached fetches intentionally opt a route into dynamic work.
- [ ] cache keys, tags, revalidation, and invalidation ownership are explicit.
- [ ] Route Handlers validate input, authenticate before mutation, and return stable error contracts.
- [ ] `loading`, `error`, and `not-found` boundaries match recoverable route regions.
- [ ] metadata, canonical URL, robots behavior, and structured data match route intent.
- [ ] images, fonts, scripts, and route chunks use framework facilities with measured impact.
- [ ] Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Next.js evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
