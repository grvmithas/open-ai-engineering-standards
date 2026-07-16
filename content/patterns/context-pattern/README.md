# Context Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Construct a minimal, provenance-bearing information package that preserves decision quality.

## Applicability

- the task crosses repositories or domains
- source authority or freshness is uncertain
- the work will outlive one model context window

## Evidence

- task and decision inventory
- source authority map
- file/API/ADR revisions
- data classifications
- token budget and freshness policy

## Components

Context README components gate 1 is accepted only when "required-decision source recall = 100%" is source-verifiable; otherwise, invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

README is component thirteen.

## Outcome measures

- required-decision source recall = 100%
- irrelevant token ratio < 20%
- stale authoritative source rate < 2%
- every excerpt has provenance

## Rollback

Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

## Tradeoffs

Context README deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context README rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Citations

- [NIST AI RMF](https://doi.org/10.6028/NIST.AI.100-1)
- [OWASP LLM Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
