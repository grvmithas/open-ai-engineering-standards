# Memory Security and Poisoning Recovery

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Prevent cross-tenant disclosure and detect, contain, and recover from poisoned memory or retrieval indexes.

## Why

Post-retrieval filtering is too late: unauthorized candidates may enter caches, rerankers, prompts, traces, or side channels. Poisoned content can persist and repeatedly steer privileged agents.

## How

1. Derive tenant and principal scope from authenticated identity, never request text.
2. Enforce row/document ACLs in the datastore query before vector, keyword, or graph traversal; fail closed when policy metadata is missing.
3. Use tenant-separated encryption, namespaces/partitions, cache keys, quotas, and telemetry. Test isolation with canary records.
4. Admit content through source allowlists, signature/hash verification, parser sandboxing, malware/injection scans, anomaly detection, and steward approval by risk tier.
5. Monitor source churn, embedding-neighborhood anomalies, unusual retrieval frequency, instruction-like content, and answer drift.
6. On detection: stop ingestion, quarantine source and descendants, revoke caches, identify lineage, restore a known-good snapshot, rebuild all affected indexes, replay verified deltas, and regression-test before release.

## Tradeoffs

Physical tenant separation costs more but reduces blast radius. Shared indexes are acceptable only with datastore-enforced predicates and proven isolation under failure.

## Anti-patterns

- Metadata filtering performed in application code after top-k retrieval.
- Deleting only the source document while poisoned embeddings or graph edges remain.
- Treating prompt-injection classification as a complete security boundary.

## Enterprise Considerations

Integrate alerts with incident response, preserve chain of custody, notify affected tenants under policy, and rotate credentials if poisoned content triggered actions.

## Checklist

- [ ] ACL predicates execute before all retrieval paths.
- [ ] Caches, logs, and observability are tenant-scoped.
- [ ] Ingestion provenance and quarantine gates are enforced.
- [ ] Poisoning lineage and known-good snapshots are available.
- [ ] Cross-tenant and poisoning-recovery exercises pass.

## References

- [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html)
- [OWASP LLM08: Vector and Embedding Weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/)
- [NIST SP 800-53 Rev. 5](https://doi.org/10.6028/NIST.SP.800-53r5)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
