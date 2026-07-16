# Context: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Context subagents operationalizes this pattern outcome: construct a minimal, provenance-bearing information package that preserves decision quality.

| Subagent | Mandate | Required output |
|---|---|---|
| Source scout | discovers candidate material without summarizing it | source scout artifact with source IDs, uncertainty, and stop status |
| Provenance curator | scores authority and resolves conflicts | provenance curator artifact with source IDs, uncertainty, and stop status |
| Context compressor | extracts lossless decision-relevant passages | context compressor artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Context specialists receive only sources needed for "List decisions the operator must make and evidence each decision requires."; the parent retains effect approval and accountability for "required-decision source recall = 100%".

## Tradeoffs

Context subagents deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context subagents rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context subagents governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Source scout returned its required evidence
- [ ] Provenance curator returned its required evidence
- [ ] Context compressor returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
