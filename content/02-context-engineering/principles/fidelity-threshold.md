# Context Capacity Evaluation

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Establish a workload-specific operating envelope for context length and composition.

## Why

There is no single “fidelity threshold” or safe percentage of it. Performance can change non-monotonically with evidence position, distractors, output length, and task type. Capacity must be represented as an evaluated envelope with uncertainty.

## How

1. Stratify representative tasks by difficulty and source count.
2. Sweep token length, evidence position, distractor density, and output reserve.
3. Repeat trials to estimate variance.
4. Record quality, groundedness, latency, cost, and truncation.
5. Select an operating point that meets all gates with a measured safety margin.
6. Re-run after model, tokenizer, prompt, retrieval, or tool-schema changes.

## When

Use before setting production context budgets and when a workload approaches provider limits.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Larger test matrix | Better confidence | Evaluation expense |
| Conservative margin | Fewer tail failures | Less context capacity |
| Per-task envelopes | Accurate control | Routing complexity |

## Anti-Patterns

- “Never exceed 60%” without workload evidence.
- One needle test as the complete benchmark.
- Ignoring output and tool-schema tokens.
- Reusing results across model versions.

## Enterprise Considerations

Version datasets, protect sensitive fixtures, define statistical acceptance criteria, and retain results as model-risk evidence.

## Checklist

- [ ] Multiple context variables are swept
- [ ] Representative task outcomes are measured
- [ ] Variance and tail failures are included
- [ ] Operating margin is evidence-based
- [ ] Re-evaluation triggers are automated

## Changelog

- 1.0.0 (2026-07-16): Replaced universal threshold heuristics with capacity evaluation.
