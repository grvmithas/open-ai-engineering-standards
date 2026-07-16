# Agentic RAG

> **Version:** 1.0.0 | **Last updated:** 2026-07-16 | **Maturity:** Emerging

## Purpose

Govern agent-directed retrieval planning for queries that deterministic pipelines cannot handle within requirements.

## Why

An agent can iteratively decompose and inspect evidence, but also amplifies prompt injection, cost, loops, and unauthorized query generation.

## How

First prove failure of baseline and advanced deterministic RAG. Give the planner read-only, least-privilege retrieval tools with immutable tenant/ACL scope. Use typed plans, bounded subqueries, source allowlists, loop/no-progress detection, per-step evidence ledgers, total budgets, and explicit termination. Separate the untrusted-content reader from any privileged actor. Validate the final claim-evidence graph and citations before response.

## Tradeoffs

Agentic retrieval adapts to novel multi-step questions but is slower, less reproducible, and harder to secure. Keep it behind a routed, evaluated path and a deterministic fallback.

## Anti-patterns

- Giving a retrieval agent general-purpose tools or write access.
- Letting retrieved instructions alter the plan or authorization scope.
- Shipping because a few demos outperform fixed RAG.

## Enterprise Considerations

Require risk approval, full step-level traces, cost quotas, incident kill switches, and periodic benefit revalidation. The pattern remains emerging.

## Checklist

- [ ] Deterministic alternatives failed documented query classes.
- [ ] Tools are read-only, scoped, and independently authorized.
- [ ] Budgets, loop detection, termination, and fallback are enforced.
- [ ] Claim-level citation and adversarial tests pass.

## References

- [OWASP Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [ReAct](https://arxiv.org/abs/2210.03629) *(research pattern; not a security control)*

## Changelog

- **1.0.0 — 2026-07-16:** Initial emerging-practice standard.
