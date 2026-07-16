# Open AI Engineering Standard Website

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This repository publishes the Open AI Engineering Standard as a statically generated Next.js documentation site. Canonical authored content lives in `content/`; the application, search index, navigation, and deployment configuration live at the repository root.

## Why

A single root-level Next.js project removes monorepo root-directory ambiguity and lets Vercel use its native Next.js adapter. Build-time rendering keeps documentation fast and inexpensive while preserving curated navigation, full-text search, Mermaid diagrams, code highlighting, and stable document URLs.

## How

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The `prebuild` script generates `public/search-index.json` deterministically from `content/`.

### Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The generated manifest is the source of truth for document routes, navigation, search, sitemap entries, and published document counts. `npm run content:check-generated` fails when committed generated artifacts do not match `content/`.

### Vercel deployment

1. Import this repository into Vercel.
2. Select the Next.js framework preset.
3. Keep the root directory as `.`.
4. Do not configure an output directory or custom build command.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin, such as `https://oaies.dev`.

Vercel uses native Next.js auto-detection and runs `npm run build`.

## Tradeoffs

- Static generation requires a new deployment for content changes.
- Manifest-derived navigation prevents authored documents from becoming undiscoverable, but document titles and directory placement now directly affect information architecture.
- The client-side search index avoids a hosted search service, but its download size grows with the content corpus.

## Anti-patterns

- Do not set Vercel's output directory to `.next`; `.next` is a framework build directory, not a static web root.
- Do not duplicate canonical documents outside `content/`; duplicate copies drift and make authorship ambiguous.
- Do not bypass `npm run build`; the prebuild lifecycle generates the search index required by the search dialog.
- Do not hand-edit `src/generated/content-manifest.json` or `public/search-index.json`; regenerate them from canonical content.

## Enterprise considerations

- Vercel production access, environment variables, custom domains, and deployment approvals must be controlled through role-based access.
- Pull requests must run lint, production build, evaluation gates, and link validation before merge.
- Authored content remains versioned in Git for provenance, review history, and audit evidence.
- `NEXT_PUBLIC_SITE_URL` must be environment-specific so sitemap, robots, and canonical metadata identify the approved production origin.

## Deployment checklist

- [ ] `npm run lint` passes with no warnings or errors.
- [ ] `npm run typecheck` and `npm test` pass.
- [ ] `npm run build` generates all expected static routes.
- [ ] `/`, `/docs/README`, `/search-index.json`, and `/sitemap.xml` return HTTP 200.
- [ ] `/docs` permanently redirects to `/docs/README`.
- [ ] `NEXT_PUBLIC_SITE_URL` matches the production domain.
- [ ] Vercel has no custom output-directory override.

## Changelog

### 1.0.0 — 2026-07-16

- Migrated the OAIES content and website into one root-level Next.js repository.
- Preserved all canonical documents, routes, search, diagrams, assets, and evaluation workflows.
- Removed deployment configuration that caused Vercel to serve `.next` as a static directory.
