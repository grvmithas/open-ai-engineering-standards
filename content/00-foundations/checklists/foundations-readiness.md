# Foundations Readiness Checklist

> Complete this checklist before proceeding to Level 1: Prompt Engineering.
> **Version:** 1.2.0  
> **Last updated:** 2026-07-16

---

## Purpose

Gate progression on demonstrated system-design readiness rather than document completion.

## Why

Security, authorization, privacy, and evaluation controls are critical gates. An aggregate score must not allow a critical control to fail.

## How

Complete all items and attach a design, test, calculation, or policy reference as evidence. Any unchecked item blocks readiness.

## When

Run before Level 1 work, architecture approval, or onboarding a materially different workload, provider, or data classification.

## Mental Models

- [ ] I can explain what a "token" is and why token count matters for system design
- [ ] I can explain the difference between a context window and memory
- [ ] I can identify the harness controls required by my workload's risks
- [ ] I can justify what belongs on each side of the deterministic boundary
- [ ] I can identify the failure modes relevant to my workload and map each to detection, prevention, and recovery

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
| Deterministic boundary | [03-50-50-rule.md](../03-50-50-rule.md) |
| Failure modes | [04-failure-modes.md](../04-failure-modes.md) |
| Provider/cost | [05-provider-landscape.md](../05-provider-landscape.md), [06-cost-mental-models.md](../06-cost-mental-models.md) |
| Latency | [07-latency-tradeoffs.md](../07-latency-tradeoffs.md) |

## Tradeoffs

| Benefit | Cost |
|---|---|
| Evidence-based readiness | Up-front design work |
| No critical-control averaging | Slower initial progression |

## Anti-Patterns

- Self-attesting without evidence.
- Passing by percentage while trust-boundary work remains incomplete.
- Treating provider abstraction as identical behavior across providers.

## Enterprise Considerations

Store evidence with architecture and model-risk records. Require security, privacy, procurement, or compliance review where the workload's data and impact demand it.

## Checklist

- [ ] All readiness items are checked
- [ ] Evidence is linked for each project-specific claim
- [ ] Named owners accept residual risks
- [ ] Review date is scheduled

## Changelog

- 1.2.0 (2026-07-16): Replaced memorization counts with workload-specific control evidence.
- 1.1.0 (2026-07-16): Replaced aggregate score with critical evidence gates.
