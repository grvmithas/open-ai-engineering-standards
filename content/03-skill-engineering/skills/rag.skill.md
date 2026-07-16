# Rag Skill

> **Skill ID:** `rag`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A product must ground generation in an external corpus using retrieval.

## Why
A corpus/data contract, chunking and metadata design, retrieval pipeline, golden queries, quality report, and operational runbook is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A product must ground generation in an external corpus using retrieval.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A corpus/data contract
- chunking and metadata design
- retrieval pipeline
- golden queries
- quality report
- operational runbook.

## Procedure
1. Define answerable questions, corpus authority, update SLA, tenancy, permissions, and abstention behavior.
2. Ingest with stable document/chunk IDs, provenance, ACL metadata, deduplication, and deletion propagation.
3. Choose chunking and embeddings from corpus structure; create lexical/vector/hybrid retrieval with filters and reranking.
4. Build labeled queries with relevant passages, hard negatives, freshness cases, and permission tests.
5. Measure retrieval before generation, then grounded answer quality, citations, latency, and cost; tune against held-out cases.

## Verification
Report recall@k, precision@k or nDCG, citation correctness, faithfulness, abstention, ACL leakage, ingestion lag, and p95 latency.

## Unhappy Paths and Recovery
If recall is low, diagnose ingestion, query, filters, chunking, embedding, then ranking in order. Never tune solely on generated-answer scores.

## Concrete Example
Build policy-document RAG with section-aware chunks, effective-date filters, hybrid retrieval, reranking, citation spans, and revoked-document deletion tests.

## Do Not Use This Skill When
Do not use RAG when authoritative data fits in a deterministic query or a small maintained prompt.

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
- [OpenAI Retrieval Guide](https://platform.openai.com/docs/guides/retrieval)
- [NIST IR Evaluation Overview](https://www.nist.gov/itl/iad/ig/trec-data)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
