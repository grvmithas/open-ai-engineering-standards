# Compatibility Policy

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This policy defines compatibility guarantees for AIES documents, URLs, generated artifacts, website behavior, and releases.

## Why

Teams embed standard links and automation in governance systems. Unannounced semantic or structural changes break controls even when the repository still builds.

## How

AIES uses semantic versioning for the repository release.

| Change | Version impact | Required action |
|---|---|---|
| Typo, citation repair, non-normative clarification | Patch | Preserve meaning and URLs |
| Backward-compatible recommendation or additive artifact | Minor | Document adoption impact |
| Removed or reversed normative requirement, URL removal, manifest schema break | Major | RFC, migration guide, and deprecation notice |

Published document URLs remain stable within a major version. A moved page requires a permanent redirect and preserved inbound anchors where practical. Generated manifest consumers must check `schemaVersion` and ignore unknown fields.

Normative guidance may change when security, law, or verified evidence makes the existing requirement unsafe. Such emergency changes follow `GOVERNANCE.md` and may bypass deprecation, but must include an explicit advisory.

Deprecations remain supported for at least one minor release and 90 days, whichever is longer. Release notes identify replacement guidance and the removal target.

## Tradeoffs

- Stable URLs constrain content reorganization.
- Deprecation periods prolong maintenance of obsolete interfaces.
- Major releases communicate risk but require downstream migration.

## Anti-patterns

- **Silent semantic rewrite:** changing a requirement without release impact hides downstream risk.
- **Redirect-free moves:** repository search success does not repair external links.
- **Version by marketing milestone:** versions describe compatibility, not project prestige.
- **Consumer assumptions about unknown fields:** generated schemas must remain extensible.

## Enterprise considerations

Enterprise forks must pin an upstream revision, record local deviations, and test upgrades against internal controls. Release adoption should include legal, security, accessibility, and policy-owner review when normative behavior changes.

## Checklist

- [ ] Change is classified as patch, minor, or major.
- [ ] Existing URLs and anchors are preserved or redirected.
- [ ] Generated schema compatibility is assessed.
- [ ] Deprecation includes replacement and removal date.
- [ ] Breaking changes include an RFC and migration guide.
- [ ] Emergency changes include an advisory.

## Changelog

### 1.0.0 — 2026-07-16

- Established semantic versioning, URL stability, schema, and deprecation guarantees.
