# Seo Skill

> **Skill ID:** `seo`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A public web page or site changes crawlability, indexing, canonicalization, metadata, or structured data.

## Why
A crawl/indexability audit, canonical and redirect map, metadata/schema implementation, rendered-page evidence, and monitoring plan is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A public web page or site changes crawlability, indexing, canonicalization, metadata, or structured data.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A crawl/indexability audit
- canonical and redirect map
- metadata/schema implementation
- rendered-page evidence
- monitoring plan.

## Procedure
1. Identify target URLs, search intent, canonical entities, locale variants, robots policy, and indexation goals.
2. Inspect status codes, redirects, canonicals, robots.txt, meta robots, sitemaps, hreflang, and internal links as a crawler sees them.
3. Ensure server-rendered title, description, headings, content, link semantics, and share metadata match the canonical page.
4. Add only schema.org markup that matches visible content and validate syntax and eligibility.
5. Test rendered HTML and URL variants; monitor coverage, crawl errors, structured data, and Core Web Vitals after release.

## Verification
Verify one canonical per entity, no redirect chains, valid sitemap URLs, intended indexability, structured-data validation, and stable rendered metadata.

## Unhappy Paths and Recovery
If product requirements conflict with indexing, document the chosen policy. Do not cloak, doorway-page, keyword-stuff, or mark up content users cannot see.

## Concrete Example
Consolidate product-filter URLs with canonical rules, parameter crawl controls, stable server metadata, Product schema, and redirect tests.

## Do Not Use This Skill When
Do not use SEO to justify deceptive content or override accessibility and user experience.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Schema.org](https://schema.org/docs/documents.html)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
