# Context Type Catalog

> Version: 1.1.0  
> Last updated: 2026-07-16

## Purpose

Classify context by source, lifecycle, authority, and inclusion trigger so assembly policy remains explicit.

## Why

Types are design aids, not a requirement to include every category. Each added source expands cost, privacy exposure, staleness risk, and injection surface.

## How

| Type | Include when | Required control |
|---|---|---|
| Project | Repository norms affect task | Version and scope |
| Business | Domain rules decide outcome | Authoritative owner |
| Architecture | Components or flows matter | Current diagram/ADR |
| Conversation | Prior turn changes intent | Compression and consent |
| Knowledge | External evidence is needed | Provenance and trust |
| Memory | Approved durable fact matters | Schema and expiry |
| User | Preferences or role matter | Minimize and authorize |
| Task | When a model is asked to perform a task | Acceptance criteria |
| Code | Implementation evidence needed | Revision and path |
| Historical | Prior incident informs action | Retention and relevance |
| Decision | Existing decision constrains work | ADR status |
| Risk | Threat/control affects task | Control owner |
| Dependency | Contract/version affects work | Exact version |

1. Start with task context.
2. Add a type only when an acceptance criterion requires it.
3. Select authorized sources and preserve provenance.
4. Apply freshness and token budgets.
5. Record why each included source was selected.

## When

Use during context-source inventory, retrieval design, prompt review, and incident analysis.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Explicit source policy | Catalog maintenance |
| Better minimization | Potential omissions |
| Clear ownership | More metadata |

## Anti-Patterns

- Including all 13 types by default.
- Treating user role text as proof of authorization.
- Storing model-inferred preferences as facts without confirmation.
- Mixing authoritative policy with untrusted knowledge.

## Enterprise Considerations

Assign data classification, owner, retention, geographic constraints, and access-control mechanism to every source type. User and memory context require privacy review.

## Checklist

- [ ] Every included type has a task need
- [ ] Source authority and owner are known
- [ ] Authorization and freshness are enforced
- [ ] Retention and minimization are documented
- [ ] Context-selection decisions are observable

## Changelog

- 1.1.0 (2026-07-16): Scoped task context inclusion to actual model tasks.
- 1.0.0 (2026-07-16): Initial 13-type context catalog.
