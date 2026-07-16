# How Language Models Process Information

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Define the model mechanics that affect production design without anthropomorphizing the model or treating implementation details as guarantees.

## Why

A language model maps an input token sequence to probability distributions over subsequent tokens. It does not retrieve beliefs, preserve private session state, or guarantee that a plausible completion is true. Engineering controls must therefore verify outputs and explicitly supply current state.

## How

1. **Tokenize and budget.** Measure tokens with the provider's tokenizer; characters-to-token ratios are only planning estimates.
2. **Assemble the full request.** Account for system instructions, user input, retrieved material, tool schemas, history, and reserved output tokens.
3. **Treat position as an evaluated variable.** Long-context performance depends on model, task, content, and placement. Liu et al. found U-shaped retrieval performance in tested models, not a universal percentage rule [1].
4. **Separate context from memory.** Context is sent on the current request. Durable memory is application state selected, authorized, and inserted by the harness.
5. **Verify claims and actions.** Use source checks, schemas, execution tests, and authorization gates outside the model.

```python
def request_budget(window: int, output_reserve: int, fixed: int, retrieved: int) -> int:
    available = window - output_reserve - fixed
    if retrieved > available:
        raise ValueError("context budget exceeded")
    return available - retrieved
```

## When

Use this model when designing token budgets, multi-turn systems, retrieval, tool use, caching, and evaluations. Re-measure after changing the model or prompt because behavior is not portable across versions.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Reserve output capacity | Prevents truncation | Less input capacity |
| Retrieve only relevant evidence | Higher signal and lower cost | Retrieval can omit needed evidence |
| Externalize state | Auditable, durable behavior | More application complexity |

## Anti-Patterns

- **Model-as-database:** assumes parametric knowledge is current and attributable.
- **Context-window-equals-memory:** confuses request payload with durable state.
- **Fixed position heuristics:** applies percentages from one benchmark to every task.
- **Exposed chain-of-thought:** requires private reasoning text for debugging. Request concise conclusions, evidence, and verification artifacts instead.

## Enterprise Considerations

Record model/version, tokenizer, context sources, retention class, and token usage. Enforce tenant filtering before retrieval, redact regulated data before provider submission, and test provider data-retention settings contractually.

## Checklist

- [ ] Token counts use the deployed model's tokenizer
- [ ] Output and tool-call capacity are reserved
- [ ] Context sources are authorized and attributable
- [ ] Long-context behavior is measured on representative tasks
- [ ] Claims and side effects are verified outside the model
- [ ] No workflow depends on exposed private reasoning

## References

1. Liu et al., “Lost in the Middle: How Language Models Use Long Contexts,” TACL 2024, https://doi.org/10.1162/tacl_a_00638
2. Vaswani et al., “Attention Is All You Need,” NeurIPS 2017, https://arxiv.org/abs/1706.03762

## Changelog

- 1.0.0 (2026-07-16): Initial production standard.
