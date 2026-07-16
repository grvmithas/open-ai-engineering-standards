# Output Critique and Verification

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Use a bounded critique pass to find correctable defects before accepting model output.

## Why

Self-refinement can improve some generated outputs [1], but a model may repeat or rationalize the same mistake. Critique is a quality technique, not independent verification.

## How

1. Generate a candidate against an explicit rubric.
2. Validate objective properties with code first.
3. Ask for a defect list tied to rubric IDs, not private reasoning.
4. Revise once when defects are actionable.
5. Re-run validators and stop; escalate unresolved failures.

```xml
<instructions>
Review the candidate against R1–R5.
Return only defects as `{rubric_id, evidence, correction}`.
Do not reveal private chain-of-thought.
</instructions>
```

## When

Use for writing, code review, summaries, and plans where a rubric exists. Skip for simple deterministic extraction.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Catches omissions | Additional latency and spend |
| Rubric-aligned revision | Correlated errors remain |
| Explicit defect evidence | Can over-edit valid output |

## Anti-Patterns

- “Check your work” without a rubric.
- Infinite critique/rewrite loops.
- Treating self-approval as a compliance control.
- Requesting hidden reasoning for review.

## Enterprise Considerations

Audit candidate, rubric version, defects, revision, and validator results. Use independent tools or qualified reviewers for high-impact decisions.

## Checklist

- [ ] Critique references explicit rubric IDs
- [ ] Objective checks run in code
- [ ] Revision count is bounded
- [ ] Unresolved failures escalate
- [ ] High-impact outputs receive independent review

## References

1. Madaan et al., “Self-Refine: Iterative Refinement with Self-Feedback,” NeurIPS 2023, https://arxiv.org/abs/2303.17651

## Changelog

- 1.0.0 (2026-07-16): Initial bounded critique and verification standard.
