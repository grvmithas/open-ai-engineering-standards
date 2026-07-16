# Cost Engineering for Model Workloads

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Turn model spend into a forecastable, attributable engineering constraint.

## Why

Price per token is not total cost. Production cost includes input, output, cached tokens, retrieval, tools, retries, evaluations, moderation, storage, and human review. The useful unit is cost per accepted business outcome.

## How

1. Measure tokens and non-model services by tenant, feature, model version, and outcome.
2. Calculate `effective_cost = total_workload_cost / accepted_results`.
3. Set per-request hard limits and per-tenant daily/monthly budgets.
4. Reduce repeated static context through supported caching.
5. Route only after each route passes the same quality gate.
6. Alert on cost per accepted result, retry rate, and output-token drift.

```python
def effective_cost(model, retrieval, tools, review, accepted):
    if accepted <= 0:
        raise ValueError("accepted results must be positive")
    return (model + retrieval + tools + review) / accepted
```

## When

Apply before launch, during capacity planning, when changing prompts or models, and whenever volume, retry rate, or output length shifts.

## Tradeoffs

| Optimization | Benefit | Cost |
|---|---|---|
| Shorter context | Lower spend and latency | Possible evidence loss |
| Smaller model routing | Lower unit price | Routing and quality risk |
| Caching | Avoids repeated processing | Freshness and invalidation complexity |
| Human review | Lower failure impact | Labor and latency |

## Anti-Patterns

- **Token price as TCO:** omits retries and supporting services.
- **Cheapest-model default:** optimizes price while acceptance rate collapses.
- **Unlimited output:** allows verbosity to become an unbounded cost center.
- **Cost without attribution:** prevents ownership and corrective action.

## Enterprise Considerations

Integrate tags with FinOps allocation, forecast peak concurrency, enforce quota exceptions through approval, and separate customer-billable usage from internal evaluation traffic.

## Checklist

- [ ] Cost is measured per accepted outcome
- [ ] Retries, tools, retrieval, and review are included
- [ ] Hard request and tenant limits are enforced
- [ ] Spend is attributable to owner and model version
- [ ] Quality gates constrain optimization
- [ ] Alerts detect token and retry drift

## Changelog

- 1.0.0 (2026-07-16): Initial total-cost and unit-economics standard.
