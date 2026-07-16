# Long-Context Placement

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Evaluate and mitigate position-dependent failures in long model inputs.

## Why

Liu et al. observed U-shaped retrieval performance in tested long-context models [1]. The study does not establish universal “first 25%/last 25%” rules. Position effects vary by model, task, content, and prompting.

## How

1. Create representative tasks with known required evidence.
2. Move that evidence across beginning, middle, and end positions.
3. Vary distractor count and document order.
4. Measure task accuracy and citation support, not retrieval alone.
5. Reduce context, improve retrieval, structure sources, or use progressive disclosure where failures appear.
6. Repeat after model or prompt changes.

## When

Use when requests include long code, document sets, transcripts, or conversation history.

## Tradeoffs

| Mitigation | Benefit | Cost |
|---|---|---|
| Retrieve fewer sources | Less distraction | Lower recall |
| Repeat a concise contract | Reinforces task | More tokens; no guarantee |
| Progressive disclosure | Smaller working set | Additional tool loop |

## Anti-Patterns

- Universal position percentages.
- Duplicating full policies at both ends.
- Assuming advertised context size implies stable utilization.
- Needle tests unrelated to the production task.

## Enterprise Considerations

Keep benchmark datasets representative and access-controlled. Record exact model/version and ensure repeated context does not duplicate sensitive data into broader logs.

## Checklist

- [ ] Position sensitivity is measured on production-like tasks
- [ ] Distractor density is varied
- [ ] Task correctness and citations are scored
- [ ] Mitigations reduce measured failures
- [ ] Tests rerun on model changes

## References

1. Liu et al., “Lost in the Middle,” TACL 2024, https://doi.org/10.1162/tacl_a_00638

## Changelog

- 1.0.0 (2026-07-16): Replaced unsupported placement percentages with evaluation.
