# Structured State Offloading

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Move durable task state from conversation prose into typed, authoritative application storage.

## Why

Conversation summaries are lossy model outputs. State that affects permissions, workflow, money, or completion must be validated and stored outside the model with explicit ownership and versioning.

## How

```json
{
  "task_id": "T-204",
  "version": 7,
  "goal": "reconcile July invoices",
  "completed_step_ids": ["load-ledger"],
  "open_questions": ["missing exchange rate"],
  "evidence_ids": ["ledger-2026-07"],
  "next_allowed_actions": ["fetch-rate", "request-review"]
}
```

1. Define a schema and authoritative fields.
2. Let the model propose state changes.
3. Validate transitions, permissions, and preconditions in code.
4. Use optimistic concurrency or transactions.
5. Rehydrate only task-relevant fields with provenance.
6. Expire or archive state by retention policy.

## When

Use for long-running agents, resumable workflows, multi-turn tasks, and handoffs.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Durable, inspectable state | Schema and migration work |
| Reliable resume | Concurrency handling |
| Smaller prompts | Retrieval orchestration |

## Anti-Patterns

- Hidden chain-of-thought as persistent state.
- Free-form summaries as the source of truth.
- Model-authored completion flags without verification.
- Shared state without tenant keys or versions.

## Enterprise Considerations

Encrypt state, enforce tenant isolation, maintain transition audit logs, classify fields, support deletion and legal holds, and prohibit secrets in model-written notes.

## Checklist

- [ ] Durable state has a typed schema
- [ ] Transitions are authorized and validated
- [ ] Concurrency is controlled
- [ ] Provenance and version are retained
- [ ] Retention and deletion are enforced

## Changelog

- 1.0.0 (2026-07-16): Initial external state management standard.
