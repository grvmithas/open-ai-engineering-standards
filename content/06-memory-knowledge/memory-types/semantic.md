# Semantic Memory

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Serve governed factual and conceptual knowledge with source-level attribution and temporal validity.

## Why

Semantic memory becomes dangerous when extracted claims lose their source, scope, qualifiers, or effective dates.

## How

Ingest authoritative sources through validation and provenance capture. Represent claims with subject, predicate, object/value, qualifiers, valid time, source version, confidence, ACL, and supersession. Keep extracted claims linked to source spans. Resolve conflicts by documented source authority and time; return multiple claims or abstain when unresolved. Rebuild derivatives after corrections.

## Tradeoffs

Normalized claims support precise retrieval and conflict handling but require extraction and stewardship. Source chunks are simpler but make entity and temporal reasoning harder.

## Anti-patterns

- Treating embedding similarity as factual confidence.
- Flattening conflicting claims into one “canonical” answer without policy.
- Dropping qualifiers during extraction.

## Enterprise Considerations

Assign domain owners and authority tiers. Version taxonomies, preserve lineage, and audit corrections affecting regulated decisions.

## Checklist

- [ ] Claims retain source spans, qualifiers, and effective time.
- [ ] Authority and conflict policies are explicit.
- [ ] Corrections propagate to indexes and answers.
- [ ] Unsupported claims trigger abstention.

## References

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [W3C RDF 1.1 Concepts](https://www.w3.org/TR/rdf11-concepts/)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
