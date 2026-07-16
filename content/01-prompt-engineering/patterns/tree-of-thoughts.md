# Multi-Candidate Search

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Explore multiple candidate solutions when the decision space is genuinely branching and evaluation can distinguish candidates.

## Why

Tree-of-Thoughts reported gains on selected search problems [1]. It is not a universal reasoning upgrade: generating branches increases cost, and model-scored branches can share the generator's errors.

## How

1. Define the decision, constraints, and scoring rubric.
2. Generate a small, fixed number of materially different candidates.
3. Reject candidates violating deterministic constraints.
4. Score survivors using tests, evidence, or an independently validated rubric.
5. Select one candidate and return the choice plus checkable justification.

```json
{
  "candidate_id": "B",
  "scorecard": {"correctness": 5, "risk": 4, "operability": 5},
  "evidence": ["test:contract-17", "adr:0042"]
}
```

## When

Use for architecture, planning, or constrained search with meaningful alternatives. Do not use when one deterministic calculation answers the question.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Broader solution search | Multiplicative inference cost |
| Explicit comparison | Evaluator bias |
| Better fallback visibility | More orchestration |

## Anti-Patterns

- Branching without an objective evaluator.
- Exposing all private reasoning traces.
- Calling minor wording variations different candidates.
- Using search to avoid a required stakeholder decision.

## Enterprise Considerations

Cap branch count and spend, retain scorecards and evidence, and require human decision authority where risk acceptance or policy interpretation is involved.

## Checklist

- [ ] Branching is justified by decision complexity
- [ ] Candidate count and budget are capped
- [ ] Deterministic constraints reject invalid candidates
- [ ] Selection cites tests or evidence
- [ ] Human authority remains explicit

## References

1. Yao et al., “Tree of Thoughts: Deliberate Problem Solving with Large Language Models,” NeurIPS 2023, https://arxiv.org/abs/2305.10601

## Changelog

- 1.0.0 (2026-07-16): Scoped multi-candidate search to evaluable decisions.
