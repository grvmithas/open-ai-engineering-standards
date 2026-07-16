# Indexing Patterns

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Create reconstructable lexical, vector, and graph derivatives without losing provenance or access policy.

## Why

Chunk size, overlap, and embedding choice are corpus-dependent. Arbitrary defaults can split evidence, duplicate noise, or prevent exact correction.

## How

Parse into logical units before token limits; preserve headings, tables, code, page/span offsets, and parent-child relationships. Assign stable source/chunk/version IDs and store tenant, ACL, classification, effective time, hash, parser, embedding model, and lineage. Tune chunking/overlap on retrieval evaluation; overlap is not mandatory when semantic boundaries preserve context. Stage and validate new index versions, then atomically switch aliases. Keep a full rebuild path.

## Tradeoffs

Smaller chunks improve precision but lose context; larger chunks preserve context but consume prompt budget. Parent-child retrieval can balance both at added complexity.

## Anti-patterns

- Mandating a fixed percentage overlap.
- Updating embeddings without recording model/version or re-evaluating.
- Indexing documents whose ACL or provenance is missing.

## Enterprise Considerations

Scan parsers and source formats, encrypt derivatives, scope queues and caches by tenant, and include index versions in legal hold/deletion workflows.

## Checklist

- [ ] Logical structure and source offsets are preserved.
- [ ] IDs, ACLs, hashes, versions, and lineage are complete.
- [ ] Chunking is selected by evaluation.
- [ ] Atomic rollout, rollback, deletion, and rebuild are tested.

## References

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
