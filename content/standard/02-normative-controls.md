# OAIES Normative Controls

> **Version:** 1.0.1  
> **Published:** 2026-07-16  
> **Status:** Normative

## Purpose

Define the minimum control baseline for OAIES-conformant AI systems. Each requirement is testable and names the objective evidence expected by an assessor.

## Why

AI assurance fails when controls describe aspirations instead of observable safeguards. This catalog binds each obligation to applicability and evidence so design adequacy and operating effectiveness can be assessed separately.

## How

Apply universal controls first, then every selected workload, autonomy, and impact overlay. Evidence examples are minimum evidence classes, not exhaustive implementation prescriptions. Equivalent evidence is acceptable when it is authentic, scoped, attributable, timely, and reproducible.

### Universal Governance and Risk Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-RSK-002 | The system owner **MUST** maintain a risk register covering intended use, foreseeable misuse, affected parties, failure modes, likelihood, impact, safeguards, residual risk, and treatment owner. | Universal | Approved risk register linked to system version and review history |
| OAIES-RSK-003 | Residual risks above the organization’s approved tolerance **MUST NOT** be accepted by the system owner alone. | Universal | Risk policy, approval matrix, signed acceptance by authorized risk owner |
| OAIES-MOD-001 | The organization **MUST** define measurable acceptance criteria and evaluate the complete system against representative and adversarial cases before release. | Universal | Versioned evaluation plan, dataset lineage, executable results, threshold decision |
| OAIES-MOD-002 | Production model, prompt, policy, tool, and configuration versions **MUST** be uniquely identifiable and reproducible. | Universal | Immutable release manifest, hashes/versions, configuration snapshot, rebuild or replay result |
| OAIES-MOD-003 | Material model or prompt changes **MUST NOT** bypass regression, safety, and security gates. | Universal | Change diff, CI/release gate logs, evaluation comparison, approval record |
| OAIES-DAT-001 | Data used for training, tuning, retrieval, evaluation, or inference **MUST** have documented provenance, permitted purpose, sensitivity, retention, and responsible owner. | Universal | Data inventory, lineage records, legal basis/license, classification and retention policy |
| OAIES-DAT-002 | Sensitive data **MUST** be minimized and protected in prompts, logs, memory, evaluation sets, and outputs according to its classification. | Where sensitive data is processed | Data-flow map, minimization decision, access controls, encryption settings, DLP test results |
| OAIES-SEC-001 | Identity and access controls **MUST** enforce least privilege for models, tools, data stores, administrative interfaces, and service accounts. | Universal | Access matrix, policy configuration, entitlement review, denied-access tests |
| OAIES-SEC-002 | Untrusted input and model output **MUST** be treated as data rather than executable authority across trust boundaries. | Universal | Threat model, parser/validator policy, sandbox configuration, injection test results |
| OAIES-SEC-003 | Secrets **MUST NOT** be embedded in prompts, source artifacts, model context, logs, or generated output. | Universal | Secret-scanning results, vault references, redacted telemetry sample, incident review |
| OAIES-OPS-001 | Production releases **MUST** use an approved, attributable, reversible change process with separation appropriate to impact. | Universal | Release ticket, approver identity, deployment log, rollback plan and exercise |
| OAIES-OPS-002 | The organization **MUST** monitor safety, security, quality, availability, cost, and policy-relevant events at frequencies justified by risk. | Universal | Monitoring specification, dashboards/alerts, sampled events, alert test and response records |
| OAIES-OPS-003 | AI incidents **MUST** enter a documented response process that preserves evidence, limits harm, notifies accountable parties, and records corrective action. | Universal | Incident plan, exercise or incident record, preserved logs, notifications, corrective-action closure |
| OAIES-OPS-004 | Users **MUST** receive accurate notice when they interact with AI or when AI materially influences an outcome, except where lawfully exempted and documented. | User-facing or decision-influencing systems | Interface capture, notice text/version, exemption analysis, usability test |
| OAIES-ASR-001 | Applicable controls **MUST** be supported by evidence meeting the quality rules in [03](./03-evidence-exceptions-conformance.md). | Universal | Evidence index linked bidirectionally to SoA and immutable evidence objects |

### P1 — Assistant Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-MOD-010 | Assistant output **MUST** be constrained or reviewed where an unsupported claim could cause material harm. | P1, I2–I3 | Output policy, enforcement configuration, test corpus and results, review records |
| OAIES-MOD-011 | The system **MUST** communicate material capability limits and uncertainty at the point where a user relies on output. | P1 | Approved UX copy, rendered interface evidence, user-comprehension test |
| OAIES-MOD-012 | Safety and refusal behavior **MUST** be tested against domain-relevant harmful, ambiguous, multilingual, and adversarial requests. | P1 | Threat-informed test set, run metadata, results, defect remediation |

### P2 — RAG Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-DAT-010 | Retrieval authorization **MUST** be enforced at query time using the requesting principal and source permissions. | P2 with restricted content | Authorization design, index ACL mapping, positive/negative access tests, query audit logs |
| OAIES-DAT-011 | Retrieved content **MUST** retain source identity, version or retrieval time, and trust metadata through generation. | P2 | Indexed metadata schema, response trace, citation/provenance tests |
| OAIES-DAT-012 | The system **MUST** evaluate retrieval relevance, coverage, grounding, and resistance to content-based instruction injection before release. | P2 | Curated evaluation set, metric definitions, thresholds, run results, poisoning/injection tests |
| OAIES-DAT-013 | Stale, revoked, or deleted source content **MUST** be removed from serving indexes within a documented risk-based service level. | P2 | Freshness SLA, deletion propagation logs, reconciliation report, stale-content alert test |

### P3 — Coding Agent Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-AGT-010 | Code execution **MUST** occur in an isolated environment with bounded network, filesystem, identity, compute, and time permissions. | P3 with execution | Sandbox policy/configuration, escape and egress tests, resource-limit logs |
| OAIES-AGT-011 | Generated code **MUST** pass deterministic tests, static analysis, dependency, license, and secret checks appropriate to the repository before merge or deployment. | P3 producing code | Required-check configuration, CI logs, branch protection, blocked-failure example |
| OAIES-AGT-012 | Security-sensitive or production-impacting code changes **MUST** receive independent human approval from an authorized reviewer. | P3, I2–I3 | CODEOWNERS/approval policy, pull-request approvals, reviewer authorization record |
| OAIES-SEC-010 | Agent-selected dependencies **MUST** be resolved through approved registries and verified against integrity and vulnerability policy. | P3 adding dependencies | Registry policy, lockfile/signature or hash verification, SCA report, exception record |

### P4 — Transactional Agent Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-AGT-020 | Every external action **MUST** pass deterministic authorization, schema validation, policy, and idempotency controls outside the model. | P4 | Policy-as-code/configuration, action schema, replay/idempotency tests, allow/deny logs |
| OAIES-AGT-021 | Consequential or irreversible actions **MUST** require informed human approval bound to the exact action payload before execution. | P4, I2–I3 | Approval UX capture, signed payload/hash, approver identity, execution correlation ID |
| OAIES-AGT-022 | Reversible actions **MUST** have a tested compensation or rollback path before autonomous production execution. | P4, A2–A3 | Rollback procedure, test results, recovery objectives, exercise record |
| OAIES-AGT-023 | Action limits **MUST** bound value, rate, scope, destination, and cumulative exposure independently of model instructions. | P4, A2–A3 | Runtime limit configuration, boundary tests, limit alerts, blocked-action logs |

### P5 — Multi-Agent Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-AGT-030 | Delegation **MUST NOT** increase permissions, data access, or action authority beyond the initiating principal and approved workflow. | P5 | Delegation protocol, capability tokens/policies, privilege-escalation tests, trace sample |
| OAIES-AGT-031 | Every inter-agent message and action **MUST** be attributable to agent identity, version, parent task, and initiating principal. | P5 | Trace schema, immutable end-to-end trace, correlation tests |
| OAIES-AGT-032 | Orchestration **MUST** enforce termination conditions for cycles, fan-out, cost, time, and repeated failure. | P5 | Orchestrator limits, loop/fan-out tests, cutoff telemetry, incident procedure |
| OAIES-AGT-033 | Conflicting agent outputs **MUST** be resolved by an explicit deterministic or human-governed policy before consequential action. | P5 producing consequential action | Conflict policy, scenario tests, decision records and trace |

### P6 / I3 — High-Impact Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-RSK-010 | A high-impact system **MUST** complete an impact assessment covering affected groups, rights, safety, accessibility, discrimination, contestability, and cumulative effects before production use. | P6 or I3 | Approved impact assessment, stakeholder input, mitigation tracking |
| OAIES-RSK-011 | High-impact deployment **MUST** have independent pre-release assurance and an organization-approved reassessment interval derived from impact, change rate, incident history, applicable obligations, and claim period; that interval must be shorter than the approved interval for otherwise comparable lower-impact systems. | P6 or I3 | Assessor independence declaration, assessment report, approved cadence decision with risk rationale and legal mapping, claim-period record, reassessment schedule |
| OAIES-RSK-012 | Affected persons **MUST** have an accessible path to explanation, correction, contest, and human review of material adverse outcomes. | P6 or I3 affecting persons | Procedure, interface evidence, service metrics, sampled cases and resolutions |
| OAIES-MOD-020 | High-impact performance **MUST** be evaluated for relevant subgroups, operating conditions, and foreseeable distribution shifts using domain-approved thresholds. | P6 or I3 | Evaluation protocol, subgroup results, threshold approvals, drift tests |
| OAIES-OPS-010 | The operator **MUST** maintain and test an immediate safe-stop, fallback, or service-withdrawal mechanism. | P6 or I3; A3–A4 | Mechanism design, access authorization, exercise results, recovery record |
| OAIES-ASR-010 | High-impact evidence **MUST** be retained under an approved records schedule that accounts for applicable jurisdictional, regulatory, contractual, claim-period, appeal, incident, investigation, and litigation-hold needs and receives independent legal or records-management approval before disposal. | P6 or I3 | Approved records schedule and legal mapping, claim and appeal periods, hold register, disposition approval, integrity and retrieval tests |

### A2–A4 Autonomy Overlay

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| OAIES-AGT-040 | Tool access **MUST** use explicit allowlists, least-privilege credentials, argument constraints, and default-deny behavior. | A2–A4 | Tool registry, IAM/policy configuration, denied-tool and invalid-argument tests |
| OAIES-AGT-041 | Memory that can influence future actions **MUST** have provenance, access control, retention, integrity protection, and a deletion mechanism. | A2–A4 with persistent memory | Memory schema, ACLs, integrity test, retention/deletion logs |
| OAIES-AGT-042 | Operators **MUST** be able to suspend autonomous execution without model cooperation. | A2–A4 | Out-of-band control design, authorized operator list, kill-switch exercise |
| OAIES-AGT-043 | Autonomous decisions and actions **MUST** produce tamper-evident traces sufficient to reconstruct inputs, policy decisions, tool calls, approvals, outputs, and outcomes. | A2–A4 | Trace specification, integrity controls, sampled reconstruction test |

## Guidance

Use policy-as-code for deterministic gates, append-only telemetry for action reconstruction, and automated evidence collection from source systems. Calibrate evaluation thresholds against domain harm, not generic benchmark performance. Guidance does not reduce or add controls.

## Tradeoffs

| Control posture | Benefit | Cost |
|---|---|---|
| Deterministic action gates | Prevents model output from becoming authority | Reduces flexibility and increases schema maintenance |
| Cumulative profile controls | Covers compound workload risk | Larger control set |
| Independent high-impact assurance | Stronger challenge and credibility | Cost, schedule, specialist availability |
| Tamper-evident traces | Reconstructable accountability | Storage, privacy, and redaction complexity |

## Anti-patterns

- **Model-only authorization:** asking the model whether an action is allowed.
- **Benchmark compliance:** treating one aggregate quality score as proof of safety.
- **Human-in-the-loop theater:** approval without the exact payload, context, authority, or time to review.
- **Log dumping:** collecting unstructured telemetry that cannot reconstruct a decision.
- **Supplier delegation:** assuming a provider’s certification proves the integrated system conforms.

## Enterprise Considerations

Implement controls through enterprise sources of truth: CMDB/system inventory, IAM, data catalog, model registry, CI/CD, GRC, SIEM, and records management. Preserve segregation between system ownership, risk acceptance, and independent assessment for I3 systems. Contract suppliers to provide incident notice, change notice, provenance, security assurance, audit access, and deletion evidence.

## Checklist

- [ ] Universal controls are mapped to owners and evidence.
- [ ] Controls for every selected profile are applied cumulatively.
- [ ] Autonomy and high-impact overlays are included.
- [ ] Deterministic safeguards operate outside the model.
- [ ] Evaluation thresholds are approved and release-blocking.
- [ ] Action and decision traces are reconstructable.
- [ ] High-impact controls have independent assurance.

## Authoritative References

- [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [NIST AI 600-1 — Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)
- [NIST SP 800-53 Rev. 5 — Security and Privacy Controls](https://doi.org/10.6028/NIST.SP.800-53r5)
- [NIST SP 800-218 — Secure Software Development Framework](https://doi.org/10.6028/NIST.SP.800-218)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/)
- [MITRE ATLAS](https://atlas.mitre.org/)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html)
- [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.1 | 2026-07-16 | Replaced fixed high-impact retention and reassessment periods with approved risk-, jurisdiction-, records-, and claim-based decisions. |
| 1.0.0 | 2026-07-16 | Established universal, profile, autonomy, and high-impact control baselines. |
