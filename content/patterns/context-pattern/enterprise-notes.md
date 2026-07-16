# Context: Enterprise Operations

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Context enterprise-notes operationalizes this pattern outcome: construct a minimal, provenance-bearing information package that preserves decision quality.

## Tailored controls

Context brokers enforce tenant boundaries, regional storage, document ACLs, deletion propagation, and source-level legal hold. Retrieval logs record source IDs without copying classified payloads.

## Governance model

Context enterprise-notes governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Metrics and assurance

- Control dashboard reports required-decision source recall = 100%.
- Control dashboard reports irrelevant token ratio < 20%.
- Control dashboard reports stale authoritative source rate < 2%.
- Control dashboard reports every excerpt has provenance.

Context enterprise-notes metrics and assurance gate 3 is accepted only when "required-decision source recall = 100%" is source-verifiable; otherwise, invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

## Tradeoffs

Context enterprise-notes deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context enterprise-notes rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Citations

- [NIST AI RMF](https://doi.org/10.6028/NIST.AI.100-1)
- [OWASP LLM Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)

## Checklist

- [ ] RACI, data flow, threat model, capacity, and recovery are current
- [ ] Audit evidence can be retrieved within one business day

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
