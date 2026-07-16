# Reviewer Pattern — Problem

> **Pattern:** Reviewer  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Pull requests and agent-generated diffs merge with consequential defects because review focuses on style, trusts green CI, or skips requirement tracing and trust-boundary walks. The result is production incidents that were visible in the diff.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Escaped defects | Post-merge bugs that a severity-calibrated review would have blocked |
| Nit flooding | >15 Minor comments and zero Critical/High on a behavioral PR |
| Untested AC | Acceptance criteria with no corresponding test in the PR |
| Self-approve | Same agent/human authored and gave final Approve on High-risk change |
| Unverified “fixed” | Finding marked resolved without re-check on the new revision |

## Root cause

Reviewers optimize for speed or comment volume. Defect detection requires reconstructing intended behavior, walking trust boundaries, and calibrating severity from reachability × impact — work that is skipped under time pressure or when CI is treated as proof.

## Non-goals of this pattern

- Not a substitute for automated SAST/DAST (complements them)
- Not a place to rewrite the feature for the author
- Not required for docs-only or pure formatting commits
- Not an architecture redesign session (escalate to architecture-pattern)

## Related failure modes

See [failures.md](./failures.md) for recovery when reviews are nit-heavy, CI-blind, self-approved, or severity-miscalibrated.
