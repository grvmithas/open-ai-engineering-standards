# Latency Engineering for Model Workloads

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Design latency budgets that preserve user experience and operational reliability without sacrificing required quality.

## Why

End-to-end latency includes queueing, retrieval, model time-to-first-token, generation, tools, validation, retries, and approvals. Optimizing only model response time moves bottlenecks rather than meeting the user-visible objective.

## How

1. Define a user-journey SLO and error budget.
2. Allocate budgets to admission, retrieval, generation, tools, and validation.
3. Instrument p50, p95, and p99 plus time-to-first-token and tokens per second.
4. Stream only when partial output is safe and useful.
5. Parallelize independent reads; serialize dependent or state-changing work.
6. Bound retries by the remaining deadline and use jittered backoff.
7. Shed load or degrade to a prequalified path before queues exceed the SLO.

```typescript
const deadline = Date.now() + 8_000;
const [profile, policy] = await Promise.all([
  loadProfile(userId),
  loadPolicy(tenantId),
]);
const remainingMs = deadline - Date.now();
if (remainingMs < 2_000) return qualifiedFallback();
return generate({ profile, policy, timeoutMs: remainingMs });
```

## When

Use for synchronous experiences, tool-using agents, batch workflows with deadlines, capacity planning, and provider failover.

## Tradeoffs

| Technique | Benefit | Cost |
|---|---|---|
| Streaming | Better perceived latency | Harder moderation and rollback |
| Parallel retrieval | Lower wall-clock time | Higher burst load |
| Fallback model | Better availability | Possible quality variance |
| Shorter output | Faster completion | Less detail |

## Anti-Patterns

- **Average-only reporting:** hides tail failures.
- **Unbounded retries:** amplifies overload and exceeds deadlines.
- **Unsafe streaming:** exposes content before validation.
- **Serial independent calls:** wastes the latency budget.

## Enterprise Considerations

Publish workload-specific SLOs, capacity-test contracted limits, log regional/provider dependencies, and define graceful degradation approved by product, security, and compliance.

## Checklist

- [ ] End-to-end SLO and component budgets are defined
- [ ] Tail latency and time-to-first-token are measured
- [ ] Retries respect a total deadline
- [ ] Independent I/O is parallelized safely
- [ ] Streaming is gated for unsafe or irreversible content
- [ ] Fallback quality is continuously evaluated

## Changelog

- 1.0.0 (2026-07-16): Initial latency budgeting and degradation standard.
