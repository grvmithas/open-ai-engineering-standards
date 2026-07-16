# ISO AI Management, Risk, and Impact Crosswalk

**Version:** 1.0.0  
**Date:** 2026-07-16  
**Status:** Informative

## Purpose

Map OAIES evidence artifacts to the management-system, AI risk-management, and AI system impact-assessment concerns in ISO/IEC 42001, ISO/IEC 23894, and ISO/IEC 42005.

## Why

These standards operate at different layers: ISO/IEC 42001 specifies an organizational AI management system, ISO/IEC 23894 provides AI risk-management guidance, and ISO/IEC 42005 addresses AI system impact assessment. A single technical control cannot substitute for all three.

## Crosswalk

| External reference | Requirement theme | OAIES evidence | Relationship | Limit |
|---|---|---|---|---|
| ISO/IEC 42001 Clauses 4–5 | Context, interested parties, scope, leadership, policy, roles | AI System Manifest: `purpose`, `systemOwner`, `accountableExecutive`, `affectedParties`; Control Catalog | `partial` | Does not prove organization-wide policy, leadership commitment, or management-system scope |
| ISO/IEC 42001 Clause 6 | Risks, opportunities, objectives, change planning | Risk Register; Statement of Applicability; Exception | `partial` | Objectives, resources, and organization-level planning require separate records |
| ISO/IEC 42001 Clause 7 | Resources, competence, awareness, communication, documented information | Evidence Bundle; accountable owners in all contracts | `partial` | Training, competence assessment, and communications are outside these schemas |
| ISO/IEC 42001 Clause 8 | Operational planning, AI risk assessment/treatment, impact assessment | Risk Register; AI System Manifest; Evaluation Result; Incident | `partial` | Effectiveness and required stakeholder participation must be independently verified |
| ISO/IEC 42001 Clauses 9–10 | Monitoring, audit, management review, nonconformity, improvement | Evaluation Result; Incident; Evidence Bundle | `partial` | Internal audit independence and management review are not established |
| ISO/IEC 42001 Annex A.2–A.4 | Policies, internal organization, resources | Control Catalog; Statement of Applicability; AI System Manifest | `partial` | Organization-wide implementation is not proven |
| ISO/IEC 42001 Annex A.5–A.6 | Impact assessment and AI lifecycle | Risk Register; AI System Manifest; Prompt Release; Model Record; Evaluation Result | `evidence-supports` | Evidence remains insufficient unless lifecycle controls operate across the full deployed system |
| ISO/IEC 42001 Annex A.7–A.10 | Data, transparency, responsible use, third parties | Context Manifest; Model Record; Tool Contract; MCP Server Record; Evidence Bundle | `partial` | Notices, contracts, and supplier governance require external evidence |
| ISO/IEC 23894 risk process | Communication/consultation, scope/context, assessment, treatment, monitoring, recording | AI System Manifest; Risk Register; Evaluation Result; Incident; Evidence Bundle | `partial` | ISO/IEC 23894 is guidance; OAIES records do not establish the complete process |
| ISO/IEC 42005 impact-assessment lifecycle | Plan, scope, analyze impacts, evaluate significance, treat, document, review | AI System Manifest; Risk Register; Evaluation Result; Evidence Bundle | `partial` | Rights, societal, and environmental impacts require methods and stakeholder evidence beyond these artifacts |

## How

1. Define the AI management-system and AI system boundaries before selecting artifacts.
2. Use the AI System Manifest to establish intended use, prohibited use, stakeholders, components, ownership, and lifecycle status.
3. Perform impact assessment before risk acceptance; register each material impact as a risk with inherent and residual ratings.
4. Generate a Statement of Applicability against the approved Control Catalog.
5. Attach validated evaluation, approval, incident, and treatment evidence through digest-addressed Evidence Bundles.
6. Run internal audit and management review outside the product team; record findings and corrective actions.

## Evidence minimum

| Decision | Minimum OAIES evidence |
|---|---|
| System enters validation | Approved manifest, initial impact assessment, risk register, model and supplier records |
| System enters production | Approved applicability statement, passing evaluations, prompt/agent/tool releases, evidence bundle |
| Residual risk accepted | Named risk authority, rationale, expiry/review date, compensating controls |
| Material change approved | Updated impact assessment, risk register, evaluations, and immutable release records |

## Equivalence limits

OAIES artifacts are implementation evidence, not ISO requirements text and not a complete AI management system. Crosswalk rows are not statements of equivalence. Use the licensed editions and applicable amendments for assessment. Nothing here authorizes an ISO/IEC 42001 certification claim.

## Tradeoffs

| Benefit | Cost |
|---|---|
| One evidence chain across lifecycle, risk, and impact work | Requires governance processes beyond engineering repositories |
| Strict records expose missing accountability | Impact assessment still requires qualitative stakeholder work |
| Versioned evidence improves repeatability | Published ISO text may require licensed access |

## Anti-patterns

- **Product-only scope:** excluding procurement, data providers, human operators, and downstream deployers.
- **Risk assessment as a release form:** assessing after design decisions are irreversible.
- **Impact equals model metric:** using accuracy or toxicity scores as a substitute for rights and stakeholder impact analysis.
- **Annex control checkboxing:** selecting Annex A controls without Clause 4–10 management-system processes.

## Enterprise considerations

Align risk acceptance authority with enterprise risk appetite. Preserve assessor independence, worker and affected-party consultation, supplier obligations, legal privilege where applicable, and evidence retention. Reassess after material model, data, prompt, tool, autonomy, use-case, or jurisdiction changes.

## Authoritative sources

- [ISO/IEC 42001:2023 — AI management systems](https://www.iso.org/standard/81230.html)
- [ISO/IEC 23894:2023 — Guidance on risk management](https://www.iso.org/standard/77304.html)
- [ISO/IEC 42005:2025 — AI system impact assessment](https://www.iso.org/standard/44545.html)
- [ISO/IEC JTC 1/SC 42 standards catalogue](https://www.iso.org/committee/6794475/x/catalogue/)

Sources accessed 2026-07-16. ISO standards pages identify editions and scope; the licensed standards remain normative.

## Checklist

- [ ] Management-system and system boundaries are explicit
- [ ] Impact assessment precedes risk treatment and deployment
- [ ] Applicability decisions include rationale and accountable approval
- [ ] Internal audit and management review evidence exists outside engineering self-attestation
- [ ] Material changes trigger reassessment
- [ ] No equivalence or certification claim is made

## Changelog

### 1.0.0 — 2026-07-16

- Added ISO/IEC 42001, 23894, and 42005 evidence mappings and limits.
