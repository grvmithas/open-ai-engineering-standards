# Hotfix Pattern — Subagents

> **Pattern:** Hotfix  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Impact Assessor | Quantifies who/what is hurt | After SEV declare | Impact statement + success metric |
| Containment Advisor | Orders flag/route/LKG options | Immediately | Ranked containment table |
| Minimal Diff Scout | Finds smallest safe code change | If code required | Allowed path list + patch sketch |
| Verification Runner | Runs probes and abort watches | After each action | Pass/fail with timestamps |

## Impact Assessor contract

- Prefer numbers: error rate, users, regions, $ if known
- Define the metric that means “contained”
- Separate confirmed impact from speculation

## Containment Advisor contract

- Prefer faster reversible actions over clever fixes
- Always include flag-off and LKG redeploy if they exist
- Estimate ETA honestly; escalate if ETA > SEV budget

## Minimal Diff Scout contract

- Allowed paths only; explicit forbidden list (fmt, deps, refactors)
- No drive-by tests unrelated to the failure unless required to unlock CI
- Call out if minimal patch is unsafe — recommend contain-only

## Verification Runner contract

- Use pre-agreed probes; do not invent success
- Watch abort criteria for the hotfix deploy
- On fail, recommend return to containment, not another speculative patch
