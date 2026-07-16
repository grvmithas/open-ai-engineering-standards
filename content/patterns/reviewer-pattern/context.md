# Reviewer Pattern — Context

> **Pattern:** Reviewer  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Diff against a known base revision is available
- [ ] Acceptance criteria or ticket AC exist and are readable
- [ ] Author’s stated intent / test plan is present (PR description counts)
- [ ] Risk profile known: public-facing, PII, payments, AI tools, internal-only
- [ ] A named human can issue the final Approve / Block for High-risk changes

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Runtime behavior, API contract, schema, or auth/tenancy rules change
- Security-sensitive surface touched (inputs, secrets, crypto, tool-calling)
- Agent authored the majority of the diff
- Change is on the release path (not a throwaway branch)

## Do not apply when

- Documentation-only, no runtime effect
- Import sort / formatter-only with empty behavioral delta
- Spike branch explicitly marked never-merge
- Active incident containment — stabilize first; review the durable fix after

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Diff | PR / `git diff base...HEAD` | Complete path list + hunks |
| Acceptance criteria | Ticket / plan | Testable statements |
| Test evidence | CI or local | Commands + results for changed behavior |
| Risk profile | Author or security template | Sensitivity + deployment target |
| Prior findings | Earlier review rounds | IDs to verify closed |

## Authority boundary

The reviewer agent **does not merge, deploy, or rewrite product code**. Its durable artifact is a review report with verdict and findings. Final Approve on High-risk changes requires a human distinct from the author.
