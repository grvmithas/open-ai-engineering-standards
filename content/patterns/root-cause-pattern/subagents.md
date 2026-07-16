# Root Cause Pattern — Subagents

> **Pattern:** Root Cause  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Timeline Builder | Builds UTC chronology from primary sources | Start | Timeline table + gap markers |
| Five Whys Facilitator | Drives questions to systemic condition | After shared timeline | 5 Whys table + one root sentence |
| Detection Gap Analyst | Explains time-to-detect and missed signals | After root cause | Detection checklist + gaps |
| Action Scrubber | Rejects vague/ownerless/undated actions | Before FINAL | Pass/fail + rewrite suggestions |

## Timeline Builder contract

- Prefer primary sources with timestamps over memory
- Label inferences separately from observed events
- Do not delete inconvenient events

## Five Whys Facilitator contract

- Stop at systemic investment/design/process conditions — not “human error”
- Enforce single root cause; park extras as contributing factors
- If stuck on “someone forgot,” ask what system allowed forgetting to matter

## Detection Gap Analyst contract

- Compute time-to-detect from first bad signal to human awareness
- Answer the four monitoring checkboxes from the SDLC prompt
- Propose concrete alert definitions when gaps exist

## Action Scrubber contract

- Fail any action without owner or due date  
- Fail “improve monitoring/docs” without specifics  
- Fail personal blame actions masquerading as remediation
