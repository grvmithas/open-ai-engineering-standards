# Next.js Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a App Router route, layout, Server Component, Client Component, or Route Handler using Next.js's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary. Generic software advice cannot verify that invariant because the decisive evidence lives in `package.json`, lockfile, `next.config.*`, and installed Next.js docs; route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers; build output showing static, dynamic, and route bundle classification.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `package.json`, lockfile, `next.config.*`, and installed Next.js docs
- route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers
- build output showing static, dynamic, and route bundle classification
- response `Cache-Control`, `Vary`, revalidation, and RSC request evidence

## Native verification

- `npm run lint -- --max-warnings=0` when the repository defines it
- `npx tsc --noEmit`
- `npm test -- --runInBand` using the checked-in test script
- `npm run build` and retain the route classification table
- `npm start` followed by production-mode HTTP and hydration smoke tests

## Version-aware caution

Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.

## Tradeoffs

This cookbook requires deeper Next.js evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects App Router route, layout, Server Component, Client Component, or Route Handler state.

## Anti-patterns

- Marking a layout or page `use client` pulls its import graph into the browser and discards the App Router's server-first boundary.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Next.js governance must pin hosting behavior, cache ownership, public environment-variable review, third-party script policy, and framework upgrade tests against installed documentation.

## Standards & Security Controls Alignment

- **NIST AI RMF 1.0**: Maps to `MANAGE 1.2` (bounded Route Handler context) and `MEASURE 2.1` (deterministic `npm run build` static/dynamic bundle analysis).
- **OWASP Top 10 for LLMs**: Enforces `LLM01` (Indirect Prompt Injection defense in Server Components) and `LLM07` (Insecure Plugin / Route Handler execution bounds).
- **Model Context Protocol (MCP)**: All AI tools invoked via Route Handlers or Server Actions must comply with MCP schema authorization policies.

## Official sources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Caching](https://nextjs.org/docs/app/guides/caching)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## Checklist

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
