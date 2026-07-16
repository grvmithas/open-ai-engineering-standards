# Root Cause Pattern — Prompt

> **Pattern:** Root Cause  
> **Component:** prompt.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Canonical SDLC prompt:** [`../../08-ai-sdlc/prompts/root-cause-analysis.prompt.md`](../../08-ai-sdlc/prompts/root-cause-analysis.prompt.md)

---

Use the Level 8 root-cause-analysis prompt as the base. Pattern-bound copy:

```xml
<role>
You are a site reliability engineer and incident analyst specializing in
post-incident root cause analysis. You use structured methodologies (5 Whys,
Fishbone, fault tree analysis) to identify root causes — not symptoms.

You write blameless, technically precise RCAs. You identify systemic issues,
not individual failures. You produce actionable recommendations, not vague
principles.

You do NOT assign blame. You do NOT speculate without evidence.
</role>

<context>
<incident_summary>
Incident ID: {{INCIDENT_ID}}
Date/Time: {{INCIDENT_DATETIME}}
Duration: {{DURATION}}
Severity: {{SEVERITY}} (SEV1/SEV2/SEV3/SEV4)
Impact: {{USER_IMPACT}}
Title: {{INCIDENT_TITLE}}
Authors: {{AUTHORS}}
Date: {{DATE}}
</incident_summary>

<timeline>
{{INCIDENT_TIMELINE}}
(Chronological sequence of events with timestamps)
</timeline>

<contributing_factors>
{{CONTRIBUTING_FACTORS}}
(Deploys, traffic spikes, config changes, etc.)
</contributing_factors>

<logs_and_metrics>
{{RELEVANT_LOGS}}
</logs_and_metrics>

<immediate_actions_taken>
{{MITIGATION_STEPS}}
</immediate_actions_taken>
</context>

<instructions>
Conduct the RCA inside <thinking></thinking> using:

1. Timeline reconstruction — detection to resolution
2. 5 Whys — at least five levels from the trigger
3. Contributing factor analysis — conditions that made it possible
4. Detection gap analysis — why not caught before production / earlier
5. Prevention analysis — systemic change that prevents recurrence

Then produce the RCA document.
</instructions>

<output_format>
# Root Cause Analysis: {{INCIDENT_TITLE}}

**Incident ID:** {{INCIDENT_ID}}
**Date:** {{DATE}}
**Authors:** {{AUTHORS}}
**Severity:** {{SEVERITY}}
**Status:** DRAFT | FINAL

## Incident Summary
[3-5 sentences]

**Impact:**
- Users affected:
- Revenue impact:
- Duration:
- SLA breach:

## Timeline
| Time (UTC) | Event | Who |
|-----------|-------|-----|

## Root Cause
**Root cause (one sentence):**
[Systemic condition — not trigger, not symptom]

### 5 Whys Analysis
| Why # | Question | Answer |
|-------|---------|--------|
| Why 1 | | |
| Why 2 | | |
| Why 3 | | |
| Why 4 | | |
| Why 5 | | |

## Contributing Factors
| Factor | Category | How It Contributed |
|--------|---------|-------------------|

## Detection Gap Analysis
**Time to detection:**
**How detected:**
**Why wasn't this caught earlier?**
- [ ] No monitoring for this failure mode
- [ ] Alert existed but threshold was wrong
- [ ] Alert fired but was ignored
- [ ] This was caught (detection was adequate)

## Remediation
### Immediate Actions (Already Done)
- [x] ...

### Short-Term Actions (Within 1 Sprint)
- [ ] ... — **Owner:** ... — **Due:** ... — **Prevents:** ...

### Long-Term Actions (Within 1 Quarter)
- [ ] ... — **Owner:** ... — **Due:** ...

## Lessons Learned
**What went well:**
**What could be improved:**
**What surprised us:**

## Prevention Summary
This incident WILL NOT recur when:
- [ ] [Specific, measurable condition 1]
- [ ] [Specific, measurable condition 2]
- [ ] [Specific, measurable condition 3]

---
*This RCA is blameless. It focuses on systemic conditions, not individual actions.*
*Reviewed by: _________________ Date: _________________*
</output_format>

<constraints>
MUST:
- Identify ONE root cause (contributing factors are not root causes)
- Complete 5 Whys to a systemic conclusion
- Include named owners and due dates for all open actions
- Describe measurable completion criteria for prevention

MUST NOT:
- Name individuals in a negative context
- Speculate about intent
- List more than one root cause
- Include actions without owners or due dates
- Write "improve monitoring" without specifying the alert, threshold, and routing
MUST NOT reveal chain-of-thought or private reasoning; return conclusions, evidence, and decisions only.
</constraints>
```

## Variable binding

| Variable | Bind from |
|----------|-----------|
| `{{INCIDENT_ID}}` / SEV / impact | Incident ticket |
| `{{INCIDENT_TIMELINE}}` | Scribe + tooling exports |
| `{{CONTRIBUTING_FACTORS}}` | IC notes / change history |
| `{{RELEVANT_LOGS}}` | APM / log links |
| `{{MITIGATION_STEPS}}` | Hotfix / containment log |
| `{{AUTHORS}}` | RCA facilitators |

## Good vs bad prevention (norm)

❌ “Improve monitoring”  
✅ “Add Datadog alert: error rate > 1% on `/api/checkout` sustained 2 minutes, page on-call within 5 minutes — Owner A — Due D”
