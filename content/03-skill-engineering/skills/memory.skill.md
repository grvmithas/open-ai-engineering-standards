# Memory Skill

> **Skill ID:** `memory`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when An agent must retain state across turns, sessions, users, or tasks.

## Why
A memory data model, consent and provenance rules, read/write policy, retention/deletion lifecycle, retrieval tests, and privacy threat model is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An agent must retain state across turns, sessions, users, or tasks.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A memory data model
- consent and provenance rules
- read/write policy
- retention/deletion lifecycle
- retrieval tests
- privacy threat model.

## Procedure
1. Classify candidate memory as working, episodic, semantic, or user preference and justify persistence.
2. Define subject, tenant, purpose, provenance, confidence, sensitivity, TTL, and write authority for each record.
3. Require explicit extraction and validation; separate observed facts from model inference and prevent instruction storage.
4. Design retrieval relevance, conflict resolution, correction, export, deletion, and legal-hold behavior.
5. Test cross-tenant isolation, stale/conflicting facts, prompt injection, deletion propagation, and bounded context insertion.

## Verification
Verify subject access/deletion, tenant isolation, TTL expiry, provenance display, conflict handling, retrieval precision, and no secret persistence.

## Unhappy Paths and Recovery
If identity is uncertain, do not read or write persistent memory. If facts conflict, retain provenance and ask rather than silently overwrite. Purge injected instructions.

## Concrete Example
Store a user's approved timezone preference with provenance and deletion support while refusing to persist a retrieved page's instruction.

## Do Not Use This Skill When
Do not persist transient task details, secrets, inferred sensitive traits, or data without a lawful purpose.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [OWASP LLM Prompt Injection Prevention](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
