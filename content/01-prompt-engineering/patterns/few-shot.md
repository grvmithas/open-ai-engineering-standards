# Few-Shot Example Standard

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Use curated examples to clarify ambiguous labels, boundaries, and output structure.

## Why

Examples can improve in-context task performance [1], but copied or unrepresentative examples create bias and accidental policy. Examples supplement explicit instructions and schema validation; they do not replace them.

## How

1. Choose examples from the production distribution.
2. Cover one ordinary case, one boundary case, and one valid refusal or abstention.
3. Remove secrets and tenant data.
4. Keep labels and explanations consistent with the rubric.
5. Test the prompt with and without examples; retain only measured gains.

```xml
<examples>
  <example>
    <input>Cancel order 42; it shipped yesterday.</input>
    <output>{"action":"escalate","reason_code":"already_shipped"}</output>
  </example>
  <example>
    <input>Cancel order 43; status unavailable.</input>
    <output>{"action":"needs_review","reason_code":"missing_status"}</output>
  </example>
</examples>
```

## When

Use when label boundaries or exact formatting remain ambiguous after clear instructions. Avoid examples for volatile facts that belong in retrieved context.

## Tradeoffs

| Benefit | Cost |
|---|---|
| More consistent interpretation | More tokens and maintenance |
| Boundary cases become explicit | Example bias |
| Easier output imitation | Can overfit superficial wording |

## Anti-Patterns

- Fixed “2–3 examples” rules without evaluation.
- Examples containing production PII or secrets.
- Only positive/easy cases.
- Contradictions between examples and written policy.

## Enterprise Considerations

Version examples as evaluation-sensitive assets. Track source, consent, data classification, label owner, and review date; prohibit cross-tenant examples.

## Checklist

- [ ] Examples represent production and edge cases
- [ ] No regulated or tenant-specific data is embedded
- [ ] Examples agree with policy and schema
- [ ] Incremental quality gain is measured
- [ ] Example set is versioned and reviewed

## References

1. Brown et al., “Language Models are Few-Shot Learners,” NeurIPS 2020, https://arxiv.org/abs/2005.14165

## Changelog

- 1.0.0 (2026-07-16): Initial few-shot curation standard.
