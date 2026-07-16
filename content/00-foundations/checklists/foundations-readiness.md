# Foundations Readiness Checklist

> Complete this checklist before proceeding to Level 1: Prompt Engineering.
> **Minimum passing score: 10/12 items checked.**

---

## Mental Models

- [ ] I can explain what a "token" is and why token count matters for system design
- [ ] I can explain the difference between a context window and memory
- [ ] I can draw the Harness Architecture from memory (7 components)
- [ ] I can explain the 50/50 Rule and give an example of what belongs on each side
- [ ] I can name and describe at least 5 of the 10 LLM failure modes

## System Design Readiness

- [ ] For my current project, I have defined the task boundary (where AI ends, determinism begins)
- [ ] For my current project, I have assessed the failure cost (what happens when the model is wrong)
- [ ] For my current project, I have defined the trust boundary (what the model can and cannot access)
- [ ] For my current project, I have an evaluation strategy (not "we'll check it manually")

## Provider & Cost

- [ ] I understand the difference between API cost and total cost of ownership for AI features
- [ ] I have calculated a rough token budget for my primary use case
- [ ] I have a plan for provider abstraction (not hardcoding a single provider's API)

---

## If You Cannot Check These Items

| Missing Item | Read This |
|---|---|
| Mental models | [01-how-llms-think.md](../01-how-llms-think.md) |
| Harness Architecture | [02-the-harness-principle.md](../02-the-harness-principle.md) |
| 50/50 Rule | [03-50-50-rule.md](../03-50-50-rule.md) |
| Failure modes | [04-failure-modes.md](../04-failure-modes.md) |
| Provider/cost | [05-provider-landscape.md](../05-provider-landscape.md), [06-cost-mental-models.md](../06-cost-mental-models.md) |
| Latency | [07-latency-tradeoffs.md](../07-latency-tradeoffs.md) |
