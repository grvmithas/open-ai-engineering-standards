# EU AI Act Engineering Map

**Version:** 1.1.0  
**Date:** 2026-11-06  
**Status:** Informative — **not** a conformity assessment

---

## Purpose

Give engineering teams an **honest, evidence-oriented** map from EU AI Act concepts to AIES artifacts — without claiming CE marking, notified-body approval, or legal classification.

## Why

Product orgs ask “are we AI Act ready?” Engineering can prepare **technical evidence**; counsel and conformity assessment decide legal status. Mixing those roles produces theater.

## Relationship language

| Relationship | Meaning |
|---|---|
| `evidence-supports` | AIES artifact may supply technical evidence for part of a duty |
| `partial` | Only a slice; legal/process controls remain outside AIES |
| `no-mapping` | Outside engineering standard scope |

## Indicative map (engineering evidence only)

| AI Act theme (indicative) | AIES evidence | Relationship | Notes |
|---|---|---|---|
| Risk management / lifecycle | Risk Register, AI System Manifest, evaluation gates | `partial` | Needs org risk method + counsel |
| Data governance / quality | Context Manifest, Model Record digests, poisoning controls | `partial` | Training-data legal bases are counsel |
| Transparency / logging | Tracing, Evidence Bundle, Prompt Release | `evidence-supports` | User-facing notices are product/legal |
| Article 50 transparency (disclosure, marking, detection) | Output contract, release gate EA-08, provenance (C2PA) and watermark regression tests | `partial` | Applies since 2026-08-02; legacy systems by 2026-12-02; marking needs a detection means |
| Quality management (Art. 17) | Definition of Done, release gates, evidence bundles, change control | `partial` | EN 18286:2026 is the harmonised route; map clauses before claiming presumption |
| Human oversight | HITL handbook, agent approval gates, hooks | `evidence-supports` | Oversight design must match risk class |
| Accuracy / robustness | EVAL family, continuous-eval, release pattern | `evidence-supports` | Metrics must match declared intended purpose |
| Cybersecurity | OWASP LLM/Agentic crosswalk, security skill, MCP allowlists | `evidence-supports` | Not a substitute for NIS2/org SecOps |
| High-risk classification | Responsible AI applicability note | `no-mapping` | **Counsel decides** applicability |
| Conformity assessment / CE | — | `no-mapping` | Outside AIES |

## Key dates (as amended by Regulation (EU) 2026/1744)

| Date | What applies |
|---|---|
| 2026-08-02 | Article 50 transparency; Commission GPAI enforcement powers |
| 2026-12-02 | Article 50 for systems on the market before 2026-08-02; new intimate-content/CSAM generation prohibition |
| 2027-12-02 | High-risk obligations, Annex III systems |
| 2028-08-02 | High-risk obligations, Annex I systems (AI in regulated products) |

Full timeline and caveats: [EU AI Act Engineering Control Map](../../09-enterprise-ai/governance/eu-ai-act.md).

## How to use

1. Freeze intended purpose and deployment context with product + counsel.  
2. Do **not** self-declare high-risk from this table alone.  
3. Collect AIES evidence rows for the themes counsel marks applicable.  
4. Record gaps in Statement of Applicability / exception register.  
5. Keep marketing language as **working / candidate standard** until roadmap S1.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Evidence-only mapping (no legal classification) | Engineering stays honest about its role; counsel decides | Product teams wait on counsel before they know the target |
| Reusing AIES artifacts as Act evidence | One evidence system for quality, security, and regulation | Artifacts must carry Act-relevant fields (intended purpose, release id, retention) |
| Planning to the Omnibus dates | Realistic lead time for high-risk evidence | Article 50 work cannot wait for those dates — it applies now |

## Anti-patterns

- “AI Act compliant” badges on engineering docs  
- Treating prompt templates as transparency notices  
- Enabling write MCP tools on EU personal data without DPIA/counsel  
- Planning to the superseded 2026-08-02 high-risk date, or skipping Article 50 because the system is "not high-risk"

## Enterprise considerations

- Keep one applicability record per system and release, owned by the compliance owner, with counsel sign-off and a next-review date.
- Route Article 50 work through the product release train now; high-risk evidence (risk management, logging, data governance) can follow the 2027/2028 dates but has long lead times.
- Map AIES evidence to EN 18286 clauses once, centrally, rather than per product.
- Treat ISO/IEC 42001 certification and ISO/IEC 27090 alignment as supporting evidence, never as AI Act conformity.

## Checklist

- [ ] Intended purpose and deployment context frozen with product and counsel
- [ ] Every row marked applicable by counsel has an owner and linked AIES evidence
- [ ] Article 50 disclosure, marking, and detection shipped for generative paths (legacy by 2026-12-02)
- [ ] Gaps recorded in the exception register with expiry dates
- [ ] No document or badge claims AI Act compliance or conformity

## Related

- [Responsible AI](../../09-enterprise-ai/governance/responsible-ai.md)  
- [Crosswalk index](./README.md)  
- [External standards map (handbook)](../../handbook/external-standards-map.md)  
- [NIST AI RMF](./nist-ai-risk.md) · [ISO 42001 family](./iso-ai-management-risk-impact.md)

## Changelog

- **1.1.0 (2026-11-06):** Dates re-based on enacted Regulation (EU) 2026/1744; Article 50 and Art. 17 / EN 18286 rows; added Tradeoffs, Enterprise considerations, Checklist.
- **1.0.0 (2026-07-29):** Initial informative EU AI Act engineering map — explicit non-conformity.
