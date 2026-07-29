# EU AI Act Engineering Map

**Version:** 1.0.0  
**Date:** 2026-07-29  
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
| Human oversight | HITL handbook, agent approval gates, hooks | `evidence-supports` | Oversight design must match risk class |
| Accuracy / robustness | EVAL family, continuous-eval, release pattern | `evidence-supports` | Metrics must match declared intended purpose |
| Cybersecurity | OWASP LLM/Agentic crosswalk, security skill, MCP allowlists | `evidence-supports` | Not a substitute for NIS2/org SecOps |
| High-risk classification | Responsible AI applicability note | `no-mapping` | **Counsel decides** applicability |
| Conformity assessment / CE | — | `no-mapping` | Outside AIES |

## How to use

1. Freeze intended purpose and deployment context with product + counsel.  
2. Do **not** self-declare high-risk from this table alone.  
3. Collect AIES evidence rows for the themes counsel marks applicable.  
4. Record gaps in Statement of Applicability / exception register.  
5. Keep marketing language as **working / candidate standard** until roadmap S1.

## Anti-patterns

- “AI Act compliant” badges on engineering docs  
- Treating prompt templates as transparency notices  
- Enabling write MCP tools on EU personal data without DPIA/counsel  

## Related

- [Responsible AI](../../09-enterprise-ai/governance/responsible-ai.md)  
- [Crosswalk index](./README.md)  
- [External standards map (handbook)](../../handbook/external-standards-map.md)  
- [NIST AI RMF](./nist-ai-risk.md) · [ISO 42001 family](./iso-ai-management-risk-impact.md)

## Changelog

- **1.0.0 (2026-07-29):** Initial informative EU AI Act engineering map — explicit non-conformity.
