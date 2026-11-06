# ISO AI Management, Risk, and Impact Crosswalk

**Version:** 1.1.0  
**Date:** 2026-11-06  
**Status:** Informative

## Purpose

Map AIES evidence artifacts to the AI concerns in five ISO/IEC standards:

- **42001:** the organizational AI management system;
- **23894:** AI risk-management guidance;
- **42005:** AI system impact assessment;
- **27090:** AI security threats;
- **42006:** the rules certification bodies follow when they audit an AI management system.

## Why

These standards operate at different layers, so a single technical control cannot substitute for all of them:

- ISO/IEC 42001 specifies the management system.
- ISO/IEC 23894 guides risk management.
- ISO/IEC 42005 addresses impact assessment.
- ISO/IEC 27090:2026 (published 2026-10-14) catalogs AI-specific security threats and mitigations, such as prompt injection, data and model poisoning, and model theft.
- ISO/IEC 42006:2025 governs the auditor, not the organization. It determines what a 42001 certification audit will sample.

## Crosswalk

| External reference | Requirement theme | AIES evidence | Relationship | Limit |
|---|---|---|---|---|
| ISO/IEC 42001 Clauses 4–5 | Context, interested parties, scope, leadership, policy, roles | AI System Manifest: `purpose`, `systemOwner`, `accountableExecutive`, `affectedParties`; Control Catalog | `partial` | Does not prove organization-wide policy, leadership commitment, or management-system scope |
| ISO/IEC 42001 Clause 6 | Risks, opportunities, objectives, change planning | Risk Register; Statement of Applicability; Exception | `partial` | Objectives, resources, and organization-level planning require separate records |
| ISO/IEC 42001 Clause 7 | Resources, competence, awareness, communication, documented information | Evidence Bundle; accountable owners in all contracts | `partial` | Training, competence assessment, and communications are outside these schemas |
| ISO/IEC 42001 Clause 8 | Operational planning, AI risk assessment/treatment, impact assessment | Risk Register; AI System Manifest; Evaluation Result; Incident | `partial` | Effectiveness and required stakeholder participation must be independently verified |
| ISO/IEC 42001 Clauses 9–10 | Monitoring, audit, management review, nonconformity, improvement | Evaluation Result; Incident; Evidence Bundle | `partial` | Internal audit independence and management review are not established |
| ISO/IEC 42001 Annex A.2–A.4 | Policies, internal organization, resources | Control Catalog; Statement of Applicability; AI System Manifest | `partial` | Organization-wide implementation is not proven |
| ISO/IEC 42001 Annex A.5–A.6 | Impact assessment and AI lifecycle | Risk Register; AI System Manifest; Prompt Release; Model Record; Evaluation Result | `evidence-supports` | Evidence remains insufficient unless lifecycle controls operate across the full deployed system |
| ISO/IEC 42001 Annex A.7–A.10 | Data, transparency, responsible use, third parties | Context Manifest; Model Record; Tool Contract; MCP Server Record; Evidence Bundle | `partial` | Notices, contracts, and supplier governance require external evidence |
| ISO/IEC 23894 risk process | Communication/consultation, scope/context, assessment, treatment, monitoring, recording | AI System Manifest; Risk Register; Evaluation Result; Incident; Evidence Bundle | `partial` | ISO/IEC 23894 is guidance; AIES records do not establish the complete process |
| ISO/IEC 42005 impact-assessment lifecycle | Plan, scope, analyze impacts, evaluate significance, treat, document, review | AI System Manifest; Risk Register; Evaluation Result; Evidence Bundle | `partial` | Rights, societal, and environmental impacts require methods and stakeholder evidence beyond these artifacts |
| ISO/IEC 27090:2026 — prompt injection (direct and indirect) | Identify injection paths; constrain what injected instructions can cause | [Agent security controls](../../09-enterprise-ai/security/agent-security-controls.md) AC-01–AC-06; Tool Contract; kit guard denial log; [OWASP crosswalk](./owasp-ai-security.md) LLM01 rows | `partial` | AIES controls bound agent and tool authority; application-specific input screening, output handling, and red-team results are per-system evidence |
| ISO/IEC 27090:2026 — data and model poisoning | Provenance and integrity of training, fine-tuning, and retrieval data; detection | Context Manifest; Model Record; Evaluation Result (regression and canary sets); retrieval index releases | `partial` | Does not cover supplier training-data provenance for hosted models; requires supplier attestations |
| ISO/IEC 27090:2026 — model theft and extraction | Protect weights and endpoints; detect extraction-style querying | Model Record (hosting, access); [open-weight serving](../../07-llmops/open-weight-serving.md) security controls; gateway rate limits | `partial` | Weight encryption, key management, and endpoint abuse monitoring are infrastructure controls outside AIES records |
| ISO/IEC 27090:2026 — agent and tool misuse | Least privilege, human approval for consequential actions, self-configuration integrity | Agent security controls AC-01–AC-06; Tool Contract; MCP Server Record; [durable execution](../../05-multi-agent-systems/standards/durable-execution.md) approval records | `evidence-supports` | Evidence must cover the deployed runtime configuration, not only repository templates |

## Related standards (not evidence mappings)

| Standard | Status (2026-11-06) | Use it to |
|---|---|---|
| ISO/IEC 42006:2025 — requirements for bodies auditing and certifying AI management systems | Published 2025-07-07 | Choose a certification body (require 42006 conformity in the RFP), and anticipate what the audit will sample: Clause 4–10 records, Annex A applicability, and evidence of operation over time. AIES Evidence Bundles are what the auditor samples; they are not a substitute for the audit. |
| EN ISO/IEC 42001:2026 | Identical EU/UK adoption of 42001:2023 | Cite it in EU procurement and AI Act quality-management mapping; no content change from 42001:2023 |
| ISO/IEC 27091 — AI privacy protection | FDIS ballot opened 2026-11-02 | Track. Map privacy evidence (data classification, retention, telemetry content capture) on publication |
| ISO/IEC 24970 — AI system logging | At FDIS | Track. Map [tracing](../../07-llmops/observability/tracing.md) and durable-workflow history evidence on publication; relevant to EU AI Act record-keeping |
| ISO/IEC 42105 — human oversight of AI systems | At FDIS | Track. Map approval records and human-in-the-loop controls on publication |
| ISO/IEC TS 42119-7 — AI red teaming | In development | Track. Align adversarial evaluation evidence on publication |

Draft and FDIS texts can change. Do not map AIES evidence to clause numbers before publication.

## How

1. Define the AI management-system and AI system boundaries before selecting artifacts.
2. Use the AI System Manifest to establish intended use, prohibited use, stakeholders, components, ownership, and lifecycle status.
3. Perform impact assessment before risk acceptance; register each material impact as a risk with inherent and residual ratings.
4. Generate a Statement of Applicability against the approved Control Catalog.
5. Attach validated evaluation, approval, incident, and treatment evidence through digest-addressed Evidence Bundles.
6. Run internal audit and management review outside the product team; record findings and corrective actions.

## Evidence minimum

| Decision | Minimum AIES evidence |
|---|---|
| System enters validation | Approved manifest, initial impact assessment, risk register, model and supplier records |
| System enters production | Approved applicability statement, passing evaluations, prompt/agent/tool releases, evidence bundle |
| Residual risk accepted | Named risk authority, rationale, expiry/review date, compensating controls |
| Material change approved | Updated impact assessment, risk register, evaluations, and immutable release records |

## Equivalence limits

AIES artifacts are implementation evidence, not ISO requirements text and not a complete AI management system. Crosswalk rows are not statements of equivalence. Use the licensed editions and applicable amendments for assessment. Nothing here authorizes an ISO/IEC 42001 certification claim.

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
- **27090 as a certificate:** ISO/IEC 27090 is guidance. "27090-compliant" is not an attestable claim; cite the threats you assessed and the evidence for each.
- **Mapping drafts:** citing clause numbers from FDIS texts (27091, 24970, 42105) that may be renumbered before publication.

## Enterprise considerations

Align risk acceptance authority with enterprise risk appetite. Preserve assessor independence, worker and affected-party consultation, supplier obligations, legal privilege where applicable, and evidence retention. Reassess after material model, data, prompt, tool, autonomy, use-case, or jurisdiction changes.

## Authoritative sources

- [ISO/IEC 42001:2023 — AI management systems](https://www.iso.org/standard/81230.html)
- [ISO/IEC 23894:2023 — Guidance on risk management](https://www.iso.org/standard/77304.html)
- [ISO/IEC 42005:2025 — AI system impact assessment](https://www.iso.org/standard/44545.html)
- [ISO/IEC 27090:2026 — AI security threats and mitigations](https://www.iso.org/standard/27090)
- [ISO/IEC 42006:2025 — Requirements for bodies auditing and certifying AI management systems](https://www.iso.org/standard/42006)
- [ISO/IEC 27091 — AI privacy protection (under development)](https://www.iso.org/standard/56582.html)
- [ISO/IEC JTC 1/SC 42 standards catalogue](https://www.iso.org/committee/6794475/x/catalogue/)

Sources accessed 2026-07-16; the 27090, 42006, 27091, 24970, 42105, and 42119-7 entries were accessed 2026-11-06. ISO standards pages identify editions and scope; the licensed standards remain normative.

## Checklist

- [ ] Management-system and system boundaries are explicit
- [ ] Impact assessment precedes risk treatment and deployment
- [ ] Applicability decisions include rationale and accountable approval
- [ ] Internal audit and management review evidence exists outside engineering self-attestation
- [ ] Material changes trigger reassessment
- [ ] No equivalence or certification claim is made
- [ ] Each ISO/IEC 27090 threat class in scope has an assessment and linked evidence, or a recorded non-applicability rationale
- [ ] The certification body (if any) is selected with ISO/IEC 42006 conformity as a requirement
- [ ] Tracked drafts (27091, 24970, 42105, TS 42119-7) are reviewed when published

## Changelog

### 1.1.0 — 2026-11-06

- Added ISO/IEC 27090:2026 threat-class mappings, an ISO/IEC 42006:2025 auditor-selection note, EN ISO/IEC 42001:2026, and tracking for 27091, 24970, 42105, and TS 42119-7.

### 1.0.1 — 2026-07-16

- Made relationship claims evidence-specific and aligned artifact field names with the normative kernel.

### 1.0.0 — 2026-07-16

- Added ISO/IEC 42001, 23894, and 42005 evidence mappings and limits.
