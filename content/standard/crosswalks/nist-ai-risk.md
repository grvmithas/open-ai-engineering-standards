# NIST AI Risk Crosswalk

**Version:** 1.0.1  
**Date:** 2026-07-16  
**Status:** Informative

## Purpose

Map OAIES artifacts to NIST AI Risk Management Framework 1.0 functions and the NIST AI 600-1 Generative AI Profile.

## Why

The AI RMF organizes risk work as GOVERN, MAP, MEASURE, and MANAGE. NIST AI 600-1 applies that structure to generative-AI risks; it does not create a certification program or prescribe one implementation.

## AI RMF crosswalk

| NIST AI RMF function/category | OAIES evidence | Relationship | Evidence gap to close |
|---|---|---|---|
| GOVERN 1–2: policies, accountability, roles | Control Catalog; AI System Manifest owner and executive; Statement of Applicability | `partial` | Workforce culture, training, and organization-wide policy effectiveness |
| GOVERN 3: workforce diversity, culture, incentives | No direct machine contract | `no-mapping` | HR, competence, participation, and incentive records |
| GOVERN 4: organizational risk culture | Risk Register; Exception; Incident | `partial` | Enterprise risk appetite operation and escalation behavior |
| GOVERN 5: engagement with relevant AI actors | Manifest affected parties; Model Record; MCP Server Record | `partial` | Consultation and communication outcomes |
| GOVERN 6: third-party and supply-chain risk | Model Record source/license/data governance; MCP Server Record; Evidence Bundle | `partial` | Contracts, supplier monitoring, and exit plans |
| MAP 1: context and risk framing | Manifest purpose, uses, affected parties, P/A/I classifications, jurisdictions | `evidence-supports` | Broader social context may require external research |
| MAP 2: system categorization and boundaries | Manifest components, lifecycle, boundary, human oversight | `evidence-supports` | Validate deployed configuration against the manifest |
| MAP 3: benefits and costs | Manifest purpose; Risk Register | `partial` | Quantified benefit and opportunity-cost analysis |
| MAP 4: risks and impacts | Risk Register scenarios, affected parties/assets, inherent/residual ratings | `evidence-supports` | Stakeholder impact evidence and uncertainty analysis |
| MAP 5: impact characterization | Risk Register; Evaluation Result | `partial` | Aggregate, long-term, and systemic impact methods |
| MEASURE 1: measurement approaches | Evaluation Result suite, dataset, metric, threshold, confidence interval | `evidence-supports` | Method validity and independent review |
| MEASURE 2: trustworthy characteristics | Evaluation Result; Context Manifest; Prompt/Model records | `partial` | Coverage must be risk-appropriate and system-level |
| MEASURE 3: tracking and feedback | Evaluation Result; Incident; Evidence Bundle | `partial` | Production feedback channels and affected-party access |
| MEASURE 4: expert review and contextualization | Evaluation executor/evidence; approvals | `partial` | Reviewer qualifications and independence |
| MANAGE 1: prioritize risks | Risk Register level, disposition, owner | `evidence-supports` | Alignment with enterprise appetite requires separate proof |
| MANAGE 2: plan and implement treatment | Risk treatment actions/control refs; Statement of Applicability | `partial` | Operational-effectiveness evidence remains required |
| MANAGE 3: manage third-party risk | Model/MCP records; Evidence Bundle | `partial` | Contractual remedies and continuous supplier assurance |
| MANAGE 4: monitor, respond, recover, communicate | Evaluation Result; Incident; Exception | `partial` | Exercised response plans and communications evidence |

## NIST AI 600-1 Generative AI Profile crosswalk

NIST AI 600-1 identifies generative-AI risks and recommended actions. The profile’s risk names should be preserved in the Risk Register rather than replaced with OAIES labels.

| GAI risk area | Required OAIES implementation evidence | Relationship |
|---|---|---|
| CBRN information or capabilities | Prohibited uses, authority boundaries, domain red-team evaluations, incident playbook | `partial` |
| Confabulation | Groundedness/factuality evaluations, user disclosure, human verification gates | `evidence-supports` |
| Dangerous, violent, or hateful content | Safety evaluations, prompt release security review, monitoring and incident evidence | `evidence-supports` |
| Data privacy | Context source classification/authorization, model data governance, retention and redaction evidence | `partial` |
| Environmental impacts | Supplier/model energy and resource evidence attached to Model Record | `partial` |
| Harmful bias and homogenization | Stakeholder-specific evaluation slices, impact risks, treatment decisions | `evidence-supports` |
| Human-AI configuration | Human oversight mode, intervention point, authority limits, UX evaluation | `evidence-supports` |
| Information integrity | Provenance, content integrity, misinformation evaluations, incident response | `partial` |
| Information security | Tool/MCP authorization, context isolation, adversarial evaluation, incident handling | `partial` |
| Intellectual property | Model source/license, dataset rights evidence, output-use controls | `partial` |
| Obscene, degrading, or abusive content | Safety evaluations, prohibited uses, reporting and response | `evidence-supports` |
| Value-chain and component integration | Versioned component records, digests, supplier evidence, dependency inventory | `partial` |

## How

1. Use every AI RMF function; do not start at MEASURE.
2. Register applicable NIST AI 600-1 risks using the source risk name and local scenario.
3. Bind each risk to system components, affected stakeholders, metrics, treatments, evidence, and owner.
4. Define pre-deployment gates and production indicators separately.
5. Record uncertainty, test limitations, and residual-risk decisions.
6. Re-run MAP and MEASURE when use, model, data, tool, autonomy, or deployment context changes.

## Equivalence limits

The NIST AI RMF and NIST AI 600-1 are voluntary risk-management resources unless another authority makes them mandatory. NIST does not certify implementations against them. OAIES mappings indicate evidence alignment, not NIST compliance, conformity, endorsement, or complete implementation.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Risk outcomes remain traceable to engineering releases | Framework tailoring requires documented judgment |
| Common GAI risk vocabulary improves reporting | Profile actions do not cover every domain-specific risk |
| Metrics become reproducible artifacts | Measurement can create false confidence without MAP context |

## Anti-patterns

- **MEASURE-only adoption:** running benchmarks without governance, context mapping, or treatment.
- **Universal threshold:** applying one quality or safety threshold across stakeholder groups and use cases.
- **Risk-name substitution:** renaming source risks until traceability is lost.
- **NIST-certified claim:** NIST AI RMF has no NIST certification mechanism.

## Enterprise considerations

Integrate AI risks into enterprise risk taxonomy, board reporting, procurement, privacy, security, and business continuity. Preserve dissent and uncertainty in acceptance decisions. High-impact systems require independent evaluation and affected-stakeholder participation.

## Authoritative sources

- [NIST AI Risk Management Framework 1.0](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/)
- [NIST AI 600-1: Generative Artificial Intelligence Profile](https://doi.org/10.6028/NIST.AI.600-1)
- [NIST AI Resource Center](https://airc.nist.gov/)

Sources accessed 2026-07-16.

## Checklist

- [ ] GOVERN, MAP, MEASURE, and MANAGE all have accountable evidence
- [ ] Applicable AI 600-1 risks retain source terminology
- [ ] Metrics include dataset/version, threshold, sample size, and limitations
- [ ] Third-party and post-deployment risks are included
- [ ] Residual risk is accepted by the correct authority
- [ ] No NIST certification or endorsement claim is made

## Changelog

### 1.0.1 — 2026-07-16

- Made relationship claims evidence-specific and aligned mappings with P/A/I classifications.

### 1.0.0 — 2026-07-16

- Added AI RMF 1.0 function/category and AI 600-1 GAI risk mappings.
