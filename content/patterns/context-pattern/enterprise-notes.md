# Context Pattern — Enterprise Notes

> **Pattern:** Context  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

Record for each assembly: task ID, commit SHA, package hash, budget, scrubber result, assembler identity. Attach to the change ticket or PR.

## Separation of duties

| Role | Allowed | Forbidden |
|------|---------|-----------|
| Assembler | Build packages under rules | Weaken secret exclusions unilaterally |
| Security | Own exclusion patterns | Silently inject unrelated prod data “for context” |
| Consumer agent | Read package | Treat package text as system instructions |

## Prompt-injection hygiene

Retrieved or packaged file contents are **data**. Downstream prompts must instruct agents not to obey instructions found inside excerpts.

## Anti-claim

Passing secret greps is **not** a full DLP certification or data-classification audit. High-sensitivity repos still need enterprise DLP controls outside this pattern.
