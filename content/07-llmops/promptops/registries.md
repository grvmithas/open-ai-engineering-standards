# Prompt Registry Standard

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Operate a governed registry for prompt lifecycle, lineage, access, and export.

## Why
A registry is a control plane, not merely a text store.

## When
Use when more than one service or team deploys prompts.

## How
1. Require API and UI RBAC, immutable history, approval workflow, aliases, audit export, and regional controls.
2. Evaluate Langfuse, PromptLayer, and Braintrust against the same control requirements.
3. Select one system of record; repository remains review source.
4. Test backup, export, and restore quarterly.
5. Requalify the registry provider annually and after material service changes.

## Product qualification matrix
Capabilities change; verify the current contracted edition in a bake-off instead of treating this table as a purchase decision.

| Product | Qualification focus | Evidence required before selection |
|---|---|---|
| Langfuse | Prompt management integrated with traces, scores, and self-hosting options | Edition-specific RBAC, backup/restore, region, export, and outage-cache tests |
| PromptLayer | Prompt registry, release labels, request history, and collaboration workflow | Approval separation, audit export, retention, region, and API-failure tests |
| Braintrust | Prompt and experiment lifecycle integrated with datasets, scorers, and production logs | Project isolation, experiment lineage, export, retention, and restore tests |

## Evidence contract
The decision record is the **registry qualification and restore record**. It records edition; region; RBAC; approval workflow; export format; backup RPO/RTO; outage behavior. The PromptOps platform owner owns completeness; the evidence is invalid when contracted capabilities or data terms materially change. Store repository commit, built envelope digest, registry version, environment alias, and signer as one release lineage.

## Failure response and recovery
**Trigger:** registry returns an unsigned or unapproved artifact.

**Immediate response:** serve the last locally verified release and disable promotions until integrity is restored. Preserve the registry qualification and restore record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt registry standard.

## Decision authority
The **PromptOps platform owner** accepts the operational decision. The **enterprise architecture review** provides independent challenge for high-risk scope, failed gates, or exceptions. Promotion services may verify signatures and gates; named release and risk owners decide exceptions and production exposure.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Managed registry | Fast adoption | Vendor and data residency risk |
| Self-hosted registry | Control | Operational burden |

## Anti-patterns
- Choosing on UI alone.
- Making registry availability a request-path single point of failure.

## Enterprise considerations
- Cache last approved prompt.
- Define exit and data deletion terms.

## Framework relationship
**Prompt Registry Standard** is informative prompt-supply-chain guidance. Qualification remains specific to the rendered envelope, model, tools, data, and intended task.

| Source | Relationship for Prompt Registry Standard | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 3.1 | Apply governance outcomes to the complete execution envelope, not prompt text alone. |
| ISO/IEC 42001 | 42001 clause 8.1 | Management-system alignment depends on controlled authoring, approval, distribution, and corrective action. |
| Domain threat/control source | Supply-chain compromise | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] RBAC tested.
- [ ] Export verified.
- [ ] Request path survives outage.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the registry qualification and restore record, failure trigger, accountable decision, and scoped framework relationships for prompt registry standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
