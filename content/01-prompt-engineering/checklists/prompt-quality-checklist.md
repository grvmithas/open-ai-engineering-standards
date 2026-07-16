# Prompt Quality Gate

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Provide a verifiable release gate for production prompt changes.

## Why

Prompt review by inspection misses regressions, unsafe authority assumptions, and distribution-specific failures. A prompt is complete only when its contract and evaluations pass.

## How

Complete every required item. A failed security, authorization, privacy, schema, or regression item blocks release; do not use an aggregate passing score.

### Contract

- [ ] Role, context, instructions, output format, and constraints are separated
- [ ] Task scope and abstention behavior are explicit
- [ ] Output has a machine-checkable schema where consumed by code
- [ ] No instruction requires exposed chain-of-thought
- [ ] Examples are representative, consistent, and free of sensitive data

### Security and Data

- [ ] Untrusted input is identified as data, not authority
- [ ] Identity, authorization, and side-effect policy are enforced outside the model
- [ ] Retrieved and tool-provided content is treated as untrusted
- [ ] Only required, authorized data is submitted
- [ ] Logs and retention comply with data classification

### Evaluation

- [ ] Representative, edge, adversarial, and abstention cases pass
- [ ] Baseline comparison shows no material regression
- [ ] Quality, latency, and effective cost thresholds pass
- [ ] Model and prompt versions are pinned in results
- [ ] Rollback criteria and owner are recorded

## When

Run before initial release and after any prompt, model, tool, retrieval, schema, or policy change.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Repeatable release evidence | Evaluation maintenance |
| Security controls stay explicit | More integration work |
| Faster rollback | Versioning overhead |

## Anti-Patterns

- Percentage pass scores that permit a critical control to fail.
- Manual spot checks as the only evaluation.
- Treating injection phrase detection as authorization.
- Approving prompts independently of their harness.

## Enterprise Considerations

Store gate results with change records, control mappings, approver identity, model/version, dataset lineage, and retention policy. Require independent review for regulated or high-impact use cases.

## Checklist

- [ ] All blocking sections above pass
- [ ] Evidence is attached to the release record
- [ ] Named owner accepts residual risk
- [ ] Production monitoring covers gate metrics
- [ ] Rollback is tested

## Changelog

- 1.0.0 (2026-07-16): Initial risk-based prompt release gate.
