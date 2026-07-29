# AIES Kernel and Applicability

> **Version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Normative

## Purpose

Define the boundary, language, identifiers, classifications, and applicability rules used by every AIES conformance claim.

## Why

An assessor cannot test controls consistently when system boundaries, requirement words, or risk classifications are implicit. A fixed classification method prevents teams from reducing obligations by renaming a workload or excluding risky dependencies.

## How

### 1. Scope

The kernel applies to an AI system used in production or to make decisions that affect real people, assets, rights, safety, security, or business operations. The assessed system includes models, prompts, retrieval sources, memory, tools, orchestrators, deterministic safeguards, user interfaces, operators, deployment infrastructure, telemetry, and third-party services that can affect output or action.

Research prototypes are outside scope only while isolated from production data, users, decisions, and side effects. A prototype becomes in scope when any of those conditions ceases to hold.

### 2. Terminology

| Term | Normative meaning |
|---|---|
| AI system | Sociotechnical system that uses an AI model to produce predictions, content, recommendations, decisions, or actions. |
| System boundary | Components, people, data, interfaces, dependencies, environments, and processes included in a claim. |
| Control | Uniquely identified, testable normative requirement. |
| Objective evidence | Verifiable record demonstrating design, implementation, or operation for a stated period and scope. |
| Workload profile | Functional pattern that determines profile-specific controls. |
| Autonomy level | Maximum authority to select or execute consequential actions without synchronous human approval. |
| Impact level | Severity of reasonably foreseeable harm from intended use, misuse, or failure. |
| High-impact system | System classified I3 under this standard or designated high-risk/high-impact by applicable law or policy. |
| System owner | Named person accountable for lifecycle risk and the conformance claim. |
| Control owner | Named person accountable for operating a control and maintaining evidence. |
| SoA | Statement of Applicability: authoritative control inventory and disposition for one assessed system. |
| Exception | Time-bound approval to leave an applicable control partly or wholly unsatisfied. |
| Compensating control | Alternative safeguard that reduces the same risk to an accepted residual level. |
| Assessment period | Time interval for which operating effectiveness is evaluated. |
| Material change | Change capable of altering profile, autonomy, impact, control design, or residual risk. |

These terms align with the system-oriented risk vocabulary of [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) and the management-system approach of [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html).

### 3. Requirement Language

The uppercase requirement vocabulary is interpreted exactly as described by [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174).

| Keyword | AIES interpretation |
|---|---|
| MUST / MUST NOT | Absolute requirement or prohibition. Non-implementation is a nonconformity unless an allowed exception is active. |
| SHOULD / SHOULD NOT | Strong recommendation. Departure requires recorded rationale in the SoA but is not itself a nonconformity. |
| MAY | Permitted option that creates no conformance obligation unless selected by another control. |

Only statements with a control ID create AIES requirements. Normative tables pair each uppercase requirement with objective evidence.

### 4. Control Identifiers

Control IDs are immutable and use the pattern `AIES-DOMAIN-NNN`, where `DOMAIN` is a registered three-letter code and `NNN` is a zero-padded sequence.

| Domain | Code | Subject |
|---|---|---|
| Governance | GOV | ownership, boundary, classification, applicability |
| Risk | RSK | risk analysis, acceptance, high-impact oversight |
| Data | DAT | data, retrieval, provenance, privacy |
| Model | MOD | model selection, evaluation, change |
| Agent | AGT | tools, autonomy, actions, memory |
| Security | SEC | abuse, access, isolation, supply chain |
| Operations | OPS | release, observability, incident response |
| Assurance | ASR | evidence, assessment, conformance |

An identifier is never reused. Retired IDs remain reserved. Subrequirements append a lowercase letter only when independently testable, such as `AIES-AGT-004a`.

### 5. Workload Profiles

Select every profile describing production behavior; profiles are cumulative.

| Code | Profile | Inclusion test | Primary added risk |
|---|---|---|---|
| P1 | Assistant | Generates content or advice without executing external side effects | misleading, unsafe, or sensitive output |
| P2 | RAG | Uses retrieved sources at inference time | poisoned, unauthorized, stale, or ungrounded context |
| P3 | Coding agent | Reads, writes, reviews, or executes software artifacts | vulnerable code, secret exposure, destructive execution |
| P4 | Transactional agent | Initiates or changes external records, payments, messages, permissions, or physical state | unauthorized or irreversible action |
| P5 | Multi-agent | Delegates among two or more model-driven agents | authority propagation, coordination failure, opaque provenance |
| P6 | High-impact | Meets I3 or a legal/policy high-impact designation | harm to rights, safety, essential access, or livelihood |

### 6. Autonomy and Impact

Classify the maximum deployed capability, not intended average behavior.

| Level | Autonomy definition | Required governance posture |
|---|---|---|
| A0 | No action; output is not used for a consequential decision | standard review |
| A1 | Recommends; a human independently decides and executes | meaningful human review |
| A2 | Executes reversible, bounded actions with pre-authorization | least privilege, action logs, tested rollback |
| A3 | Executes consequential or externally visible actions without per-action approval | independent assurance, runtime policy enforcement, emergency stop |
| A4 | Pursues open-ended goals or can alter its own authority, tools, or safeguards | prohibited unless an approved high-impact governance program explicitly authorizes a bounded deployment |

| Level | Impact definition | Examples |
|---|---|---|
| I0 | Negligible; no credible harm beyond inconvenience | internal drafting with no sensitive data |
| I1 | Limited, recoverable harm | low-value support error, reversible workflow delay |
| I2 | Material financial, security, privacy, operational, or reputational harm | production code change, customer transaction, sensitive-data disclosure |
| I3 | Severe or systemic harm to safety, rights, livelihood, essential services, or many affected persons | employment, credit, healthcare, critical infrastructure, biometric categorization |

If evidence supports multiple levels, select the highest. Legal designation overrides a lower internal classification. The [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) is authoritative for EU prohibited and high-risk classifications; AIES does not replace legal analysis.

### 7. Applicability Algorithm

1. Establish intended use, reasonably foreseeable misuse, affected parties, data, environments, dependencies, and side effects.
2. Select all workload profiles.
3. Assign autonomy and impact levels using maximum credible deployed capability.
4. Apply universal controls, all selected profile controls, and all autonomy/impact overlays.
5. Add legal, contractual, and organization-specific controls.
6. Record each control as applicable, not applicable, or applicable with exception in the SoA.
7. Obtain approvals and reassess on every material change.

### 8. Kernel Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| AIES-GOV-001 | The organization **MUST** maintain an approved system boundary covering every component and dependency capable of affecting outputs or actions. | Universal | Versioned boundary record, architecture/data-flow diagram, dependency inventory, owner approval |
| AIES-GOV-002 | The organization **MUST** name one system owner and a control owner for every applicable control. | Universal | Signed ownership register and SoA owner fields |
| AIES-GOV-003 | The system owner **MUST** classify all applicable workload profiles, autonomy level, and impact level before production use and after material change. | Universal | Dated classification record with rationale, approver, and change history |
| AIES-GOV-004 | The SoA **MUST** include every control in the claimed AIES version and record its applicability disposition and rationale. | Universal | Complete version-controlled SoA; automated or manual completeness reconciliation |
| AIES-GOV-005 | A not-applicable disposition **MUST NOT** be used solely because implementation is costly, difficult, outsourced, or incomplete. | Universal | SoA rationales tied to boundary facts; assessor challenge log |
| AIES-GOV-006 | Third-party components **MUST** remain inside the system boundary wherever their behavior can affect conformance. | Universal | Supplier inventory, contracts/assurance reports, boundary diagram, shared-responsibility matrix |
| AIES-RSK-001 | A4 deployment **MUST NOT** enter production without documented executive authorization, independent risk assessment, bounded authority, and tested containment. | A4 | Signed authorization, independent assessment report, authority policy, containment test results |

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Cumulative profiles | Prevents under-scoping hybrid systems | More controls apply |
| Highest-capability classification | Covers rare but severe behavior | Can overstate routine operating risk |
| Immutable IDs | Stable evidence and mappings | Corrections require new IDs or revisions |
| Third parties in boundary | Preserves accountability | Supplier evidence may be difficult to obtain |

## Anti-patterns

- **Profile shopping:** selecting only the least demanding profile for a hybrid workload.
- **Boundary laundering:** excluding a model provider, vector store, plugin, or human operation because it is outsourced.
- **Average-case autonomy:** labeling an agent A1 because humans usually review, although production permissions permit autonomous execution.
- **Control-ID recycling:** assigning retired identifiers to unrelated requirements and invalidating historical mappings.

## Enterprise Considerations

Use a central system inventory as the source of truth for owners, classifications, SoAs, exceptions, and claims. Integrate material-change triggers with architecture review, procurement, model registry, data governance, identity governance, and release management. Record jurisdiction-specific classifications separately; do not collapse legal status into AIES impact alone.

## Checklist

- [ ] Boundary includes models, data, tools, people, infrastructure, and suppliers.
- [ ] All six workload inclusion tests were evaluated.
- [ ] Autonomy reflects maximum production authority.
- [ ] Impact reflects foreseeable misuse and failure.
- [ ] All controls in the claimed version appear in the SoA.
- [ ] Owners and approvals are current.
- [ ] Material-change triggers are integrated into release governance.

## Authoritative References

- [RFC 2119 — Key words for use in RFCs](https://www.rfc-editor.org/rfc/rfc2119)
- [RFC 8174 — Ambiguity of uppercase and lowercase key words](https://www.rfc-editor.org/rfc/rfc8174)
- [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [NIST AI 600-1 — Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html)
- [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Defined scope, vocabulary, requirement language, IDs, profiles, risk levels, and applicability. |
