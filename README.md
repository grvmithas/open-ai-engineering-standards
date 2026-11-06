# AI Engineering Standard (AIES) Website

**Version:** 1.1.0  
**Last updated:** 2026-11-06

## Purpose

This repository publishes the AI Engineering Standard as a statically generated Next.js documentation site. Canonical authored content lives in `content/`; the application, search index, navigation, and deployment configuration live at the repository root.

## Why

A single root-level Next.js project removes monorepo root-directory ambiguity and lets Vercel use its native Next.js adapter. Build-time rendering keeps documentation fast and inexpensive while preserving curated navigation, full-text search, Mermaid diagrams, code highlighting, and stable document URLs.

## How

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3100`. `predev` and `prebuild` run `npm run generate`, which embeds the kit corpus and regenerates the content manifest and `public/search-index.json` deterministically from `content/`.

### Quality gates

```bash
npm run lint          # zero warnings
npm run typecheck
npm test              # content, portal, links, workflows, mermaid, a11y, security, SoA conformance, kit conformance
npm run build
```

The generated manifest is the source of truth for document routes, navigation, search, sitemap entries, and published document counts. `npm run content:check-generated` fails when committed generated artifacts do not match `content/`.

### Starter kit (`packages/`)

`packages/kit-core` generates the harness; `packages/create-aies-kit` is the published CLI (it vendors kit-core at pack time). The website's `/api/kit` route and the CLI share the same generator.

```bash
npm run kit:embed      # re-embed content into packages/kit-core/lib/embedded-corpus.js (part of generate)
npm run kit:check      # conformance: 9 runtimes × 4 stacks, frontmatter/TOML/JSON, guard behavior, layout snapshot
npm run kit:snapshot   # accept an intentional layout change (review the diff first)
npm run kit:vendor     # vendor kit-core into the CLI package
```

Release: bump `packages/create-aies-kit/package.json`, add a `## [x.y.z]` entry to its `CHANGELOG.md`, push tag `create-aies-kit-vX.Y.Z`. `release-kit.yml` verifies, smoke-tests the packed tarball, and publishes with npm provenance (OIDC trusted publishing preferred; `NPM_TOKEN` repository secret as fallback). Never publish from a laptop `.env`.

### Operations

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `repository-integrity.yml` | PR, push to `main` | All gates, embedded-corpus drift, kit install + audit E2E on Linux/Windows, build, dependency audit |
| `eval-gate.yml` | PR touching prompts/agents/skills/eval | DeepEval suite; explicit *skipped* summary when `OPENAI_API_KEY` is absent |
| `release-kit.yml` | `create-aies-kit-v*` tag | Verified, provenance-signed npm publish |
| `scheduled-health.yml` | Weekly | Tests, audit, remote MCP/doc liveness (`scripts/check-external.mjs`), freshness (`npm run content:freshness`); opens an issue on drift |

Triage runbook: [`content/handbook/vendor-watchlist.md`](content/handbook/vendor-watchlist.md).

### Vercel deployment

1. Import this repository into Vercel.
2. Select the Next.js framework preset.
3. Keep the root directory as `.`.
4. Do not configure an output directory or custom build command.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin, such as `https://www.ai-standards.dev`.

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
- [ ] `npm run kit:check` passes and the embedded corpus is current.
- [ ] `scheduled-health.yml` has an owner; no open drift issue older than one week.

## Changelog

### 1.1.0 — 2026-11-06

- 2026 modernization (see `plans/aies-2026-modernization-plan.md`): kit 2.0 (nine runtimes, native subagents/commands/hooks, Agent Skills, remote MCP, parallel worktrees, plugin bundle, cloud setup); Agentic engineering handbook track; 24 MCP specs refreshed to spec `2026-07-28` with deployment-status tables.
- CI: all gates incl. kit conformance and SoA tests; kit install E2E; conditional eval gate; tag-driven provenance release; weekly health workflow.
- Lint debt cleared (zero warnings): storage-backed providers moved to `useSyncExternalStore`.

### 1.0.0 — 2026-07-16

- Migrated the AIES content and website into one root-level Next.js repository.
- Preserved all canonical documents, routes, search, diagrams, assets, and evaluation workflows.
- Removed deployment configuration that caused Vercel to serve `.next` as a static directory.
