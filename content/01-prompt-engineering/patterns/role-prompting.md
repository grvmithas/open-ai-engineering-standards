# Role Prompting Standard

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Use role text to establish task perspective and quality criteria without implying authority the model does not possess.

## Why

A specific role can focus vocabulary and review criteria. It cannot grant permissions, professional licensure, access, or factual expertise. Those properties come from the harness, evidence, and qualified human oversight.

## How

```xml
<role>
You perform application-security code review using the supplied repository evidence.
You identify OWASP-relevant findings and propose bounded remediations.
You do not approve deployments, access unavailable systems, or claim a finding is verified without evidence.
</role>
```

1. Name the function, domain, and deliverable.
2. State exclusions and escalation conditions.
3. Put actual authorization in code.
4. Evaluate whether the role improves task outcomes; remove decorative persona text.

## When

Use when a domain lens changes relevant checks or terminology. Skip generic personas such as “helpful expert.”

## Tradeoffs

| Benefit | Cost |
|---|---|
| Focused review criteria | Can anchor outputs too narrowly |
| Clear exclusions | More prompt maintenance |
| Consistent tone | Does not ensure correctness |

## Anti-Patterns

- “You are a doctor/lawyer” presented as qualification.
- Seniority claims such as “20 years of experience.”
- Role text used as access control.
- Character role-play unrelated to acceptance criteria.

## Enterprise Considerations

Require disclosure and human review where regulated advice is involved. Brand, legal, and accessibility requirements belong in explicit constraints and output checks.

## Checklist

- [ ] Role defines function and deliverable
- [ ] Exclusions and escalation conditions are explicit
- [ ] No false qualification or authority is claimed
- [ ] Authorization remains outside the prompt
- [ ] Evaluation demonstrates a useful effect

## Changelog

- 1.0.0 (2026-07-16): Initial bounded role prompting standard.
