# Context Skill

> **Skill ID:** `context`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when An agent is missing relevant evidence, overloaded by noise, or vulnerable to stale/untrusted context.

## Why
A context manifest, source provenance, trust labels, token budget allocation, retrieval policy, and freshness rules is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- An agent is missing relevant evidence, overloaded by noise, or vulnerable to stale/untrusted context.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A context manifest
- source provenance
- trust labels
- token budget allocation
- retrieval policy
- freshness rules.

## Procedure
1. List decisions the agent must make and the minimum evidence each decision requires.
2. Rank sources by authority, freshness, scope, and trust; label user, repository, retrieved, and generated content.
3. Chunk by semantic boundary, preserve identifiers and citations, deduplicate, and allocate tokens by decision value.
4. Define retrieval queries, filters, recency, tenant isolation, and conflict resolution; keep instructions separate from data.
5. Test context on representative tasks for answerability, injection resistance, citation accuracy, and token pressure.

## Verification
Measure retrieval recall for required facts, unsupported-claim rate, stale-source rate, citation correctness, and context utilization.

## Unhappy Paths and Recovery
When sources conflict, expose both with authority/freshness metadata. If the budget is exceeded, prune low-decision-value context rather than truncating arbitrary tails.

## Concrete Example
Build a code-migration context pack containing pinned framework docs, affected APIs, local conventions, exact errors, and excluded generated files.

## Do Not Use This Skill When
Do not use context expansion to compensate for an unclear task or missing authorization.

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
- [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
