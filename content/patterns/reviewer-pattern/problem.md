# Reviewer Pattern — Problem

> **Pattern:** Reviewer  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

AI-touched changes merge on “tests green” or vibe checks, shipping AuthZ holes, invented path:line findings, or rubber-stamp approvals that no human can defend.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Green CI, bad AuthZ | Critical access-control defects found after merge |
| Unverifiable findings | Comments cite files/lines that do not exist |
| AI as merge boss | Bot approve without a named human owner |
| Severity theater | Everything is Medium; nothing blocks |

## Root cause

Review without a severity model and evidence bar collapses to either noise or false confidence. Models invent plausible citations unless forced to open the diff.

## What breaks when this pattern is skipped

- Security incidents trace to unreviewed AI diffs
- Review threads argue tone instead of path:line evidence
- Release trains slow because every finding is renegotiated

## Non-goals of this pattern

- Not a replacement for human merge authority
- Not a full pentest
- Not required for pure markdown typos with no behavior change

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Reviewer problem page expanded with skip-impact and operator symptoms.
