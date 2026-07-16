# Context Quality Gate

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Block release of context pipelines that lack evidence quality, isolation, or lifecycle controls.

## Why

Prompt quality cannot compensate for missing, stale, unauthorized, or adversarial context. Each critical item is a release gate, not part of an average score.

## How

### Selection and Evidence

- [ ] Task-required evidence is defined
- [ ] Retrieval recall and answer support pass representative evaluations
- [ ] Sources carry ID, revision, freshness, authority, and trust class
- [ ] Conflicts and insufficient evidence have explicit outcomes

### Security and Privacy

- [ ] Tenant and user authorization run before ranking
- [ ] Untrusted content is isolated from instructions
- [ ] Tool permissions and egress are least privilege
- [ ] Data minimization, retention, deletion, and residency are enforced
- [ ] Prompt-injection tests prove privileges cannot increase

### Capacity and Operations

- [ ] Token budgets reserve output and tool capacity
- [ ] Long-context operating envelope is measured on the workload
- [ ] Latency, cost, freshness, and truncation are monitored
- [ ] Structured state uses schema, versioning, and concurrency control
- [ ] Rollback and source-disable controls are tested

## When

Run before launch and after changing sources, indexes, access filters, model, prompt, chunking, ranking, compression, memory, or tool access.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Prevents data-boundary failures | Integration testing |
| Reproducible source lineage | Metadata overhead |
| Detects context regressions | Evaluation upkeep |

## Anti-Patterns

- A passing percentage despite a failed isolation item.
- Phrase-based injection detection as the security gate.
- Capacity inferred from advertised context size.
- Manual source inspection as the only quality test.

## Enterprise Considerations

Attach evidence to model-risk and change-management records. Require security approval for new context sources and privacy review for user or memory context.

## Checklist

- [ ] Every critical item above passes
- [ ] Evidence is stored with model and pipeline versions
- [ ] Named owners accept source and residual risk
- [ ] Production alerts map to rollback actions
- [ ] Review cadence is defined

## Changelog

- 1.0.0 (2026-07-16): Initial context release gate.
