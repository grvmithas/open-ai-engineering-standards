# Context: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Context problem operationalizes this pattern outcome: construct a minimal, provenance-bearing information package that preserves decision quality.

## Observable problem

1. When the task crosses repositories or domains, an undocumented assumption can become a production decision.
2. When source authority or freshness is uncertain, an undocumented assumption can become a production decision.
3. When the work will outlive one model context window, an undocumented assumption can become a production decision.

## Quality boundary

Context problem quality boundary gate 2 is accepted only when "required-decision source recall = 100%" is source-verifiable; otherwise, invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

## Tradeoffs

Context problem deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context problem rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context problem governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
