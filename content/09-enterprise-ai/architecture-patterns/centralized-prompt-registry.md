# Centralized Enterprise Prompt Registry

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Govern prompt releases, ownership, lineage, promotion, and emergency rollback across teams.

## Why
Decentralized prompt copies cannot be audited or reliably revoked.

## When
Use at multi-team scale or for regulated workloads.

## How
1. Keep repository review as authoring source and registry as runtime distribution source.
2. Store immutable execution envelopes with signatures.
3. Enforce separation of author, reviewer, and promoter.
4. Distribute through cached, resilient clients.
5. Export and restore; requalify registry provider.

## Evidence contract
The decision record is the **enterprise prompt supply-chain record**. It records repository commit; review; build digest; signature; registry version; environment alias; cache; promotion; rollback. The PromptOps platform owner owns completeness; the evidence is invalid when runtime prompt differs from reviewed source. Architecture evidence binds diagrams and contracts to deployed adapters, policies, identities, data routes, resilience tests, and exit drills.

## Failure response and recovery
**Trigger:** signature, approval, or registry integrity verification fails.

**Immediate response:** serve the last verified cached artifact and disable promotion writes. Preserve the enterprise prompt supply-chain record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to centralized enterprise prompt registry.

## Decision authority
The **PromptOps platform owner** accepts the operational decision. The **change-management control owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Runtime policy may select only approved paths; architecture, service, data, and risk owners approve topology and failover boundaries.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Central registry | Consistency | Control-plane dependency |

## Anti-patterns
- Mutable production text.
- Fetching registry on every request without cache.

## Enterprise considerations
- Apply tenant and regional segregation.
- Keep vendor exit tooling.

## Framework relationship
**Centralized Enterprise Prompt Registry** is an informative architecture pattern. Teams may use an equivalent design that satisfies the same boundaries, and no portability or provider-neutrality certification is implied.

| Source | Relationship for Centralized Enterprise Prompt Registry | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.7; MANAGE 3.1 | Use NIST risk outcomes to evaluate the actual data and control plane. |
| ISO/IEC 42001 | 42001 clauses 7.5 and 8.1 | ISO-related evidence is informative unless incorporated into the organization’s formally scoped system. |
| Domain threat/control source | Supply-chain compromise and prompt leakage | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Signatures enforced.
- [ ] Cache survives outage.
- [ ] Emergency rollback practiced.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MANAGE 2–4 (accessed 2026-07-16).
- ISO, [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). This is a design input, not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the enterprise prompt supply-chain record, failure trigger, accountable decision, and scoped framework relationships for centralized enterprise prompt registry. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
