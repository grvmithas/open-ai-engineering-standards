# Context: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Context failures operationalizes this pattern outcome: construct a minimal, provenance-bearing information package that preserves decision quality.

| Failure | Observable signal | Recovery |
|---|---|---|
| repository dump | attention is diluted by irrelevant files | rebuild from decision inventory |
| summary drift | compression removes exceptions | compare claims to anchored excerpts |
| authority collision | wiki conflicts with contract | escalate to owner and record resolution |
| context fossilization | long task uses old revisions | invalidate changed slices |

## Rollback failure

Context failures rollback failure gate 2 is accepted only when "required-decision source recall = 100%" is source-verifiable; otherwise, invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

## Tradeoffs

Context failures deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context failures rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context failures governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for repository dump
- [ ] Detection exists for summary drift
- [ ] Detection exists for authority collision
- [ ] Detection exists for context fossilization

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
