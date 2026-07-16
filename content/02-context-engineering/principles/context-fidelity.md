# Context Fidelity

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Deliver the minimum authorized evidence needed for the current task while preserving provenance and freshness.

## Why

“Signal-to-noise” is a useful metaphor, not a universal formula. Relevance, completeness, authority, freshness, and conflict handling must be evaluated separately; shorter context can still omit decisive evidence.

## How

1. Derive required evidence from task acceptance criteria.
2. Filter by tenant and user authorization before ranking.
3. Rank by task relevance and source authority.
4. Preserve source ID, timestamp, version, and trust class.
5. Detect conflicts and force abstention or review.
6. Measure answer correctness, citation support, retrieval recall, latency, and cost.

```json
{"source_id":"policy-17","version":"4.2","effective_at":"2026-06-01","trust":"authoritative","content":"..."}
```

## When

Use for retrieval, code assistants, multi-turn systems, and any task assembled from multiple sources.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Aggressive filtering | Lower cost and distraction | Recall risk |
| Rich provenance | Better attribution | More tokens |
| Freshness checks | Current answers | Source latency |

## Anti-Patterns

- Optimizing token count without measuring evidence recall.
- Ranking before access control.
- Mixing policy, user claims, and web text without trust labels.
- Treating a single scalar “fidelity” score as sufficient.

## Enterprise Considerations

Enforce row-level tenant controls, source retention policy, legal holds, geographic restrictions, and auditable lineage from output claim to source version.

## Checklist

- [ ] Required evidence is defined
- [ ] Authorization precedes ranking
- [ ] Provenance and freshness are preserved
- [ ] Conflicts trigger deterministic handling
- [ ] Recall and grounded correctness are evaluated

## Changelog

- 1.0.0 (2026-07-16): Defined multidimensional context fidelity.
