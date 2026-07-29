# AIES Evidence, Exceptions, and Conformance

> **Version:** 1.0.1  
> **Published:** 2026-07-16  
> **Status:** Normative

## Purpose

Define admissible evidence, the Statement of Applicability, exception and risk-acceptance governance, and the exact semantics of an AIES conformance claim.

## Why

A control cannot be assured by assertion. Evidence must prove both that a safeguard is designed for the assessed risk and that it operated throughout the claim period. Exceptions must expose—not erase—residual risk.

## How

### 1. Evidence Requirements

Evidence is admissible when it satisfies all applicable quality attributes.

| Attribute | Acceptance test |
|---|---|
| Authentic | Source identity and integrity can be verified. |
| Attributable | Responsible person, service, or process is identifiable. |
| Scoped | System, environment, component, control, and period are explicit. |
| Timely | Evidence falls within the assessment period or proves current design. |
| Complete | Relevant failures, exclusions, and populations are included. |
| Reproducible | A competent reviewer can repeat the test or trace the result. |
| Protected | Access, integrity, retention, and lawful handling are enforced. |

Evidence types are cumulative where relevant:

| Type | Proves | Examples |
|---|---|---|
| Design | Safeguard is specified and appropriate | approved policy, threat model, architecture, test plan |
| Implementation | Safeguard exists as configured | policy-as-code, IAM export, deployment manifest |
| Operation | Safeguard worked during the period | logs, tickets, CI runs, alerts, sampled transactions |
| Outcome | Risk-relevant result stayed within criteria | evaluation trend, incident rate, appeal outcome |

Screenshots without source metadata, editable self-authored attestations, and cherry-picked success records are insufficient as sole evidence of operation.

### 2. Statement of Applicability

The SoA is the authoritative index for the assessed system. Use the [normative SoA template](./templates/statement-of-applicability.template.md). One row is required for every control in the claimed AIES version.

Allowed dispositions:

| Disposition | Meaning | Claim effect |
|---|---|---|
| Applicable — conforming | Requirement implemented and evidenced | Pass |
| Applicable — exception | Requirement not fully satisfied; active exception meets this document | Conditional pass; disclosed in claim |
| Applicable — nonconforming | Requirement not satisfied and no valid exception exists | Fail |
| Not applicable | Applicability condition is factually absent | Excluded with rationale; assessor validates |

### 3. Exception and Risk Acceptance

Use the [exception and risk-acceptance template](./templates/exception-risk-acceptance.template.md). An exception is not permanent, cannot waive law, and cannot convert an applicable control to not applicable.

Exception authority and duration are based on residual impact. The organization defines approved maximum durations for each impact tier from its risk tolerance, applicable jurisdictional and contractual constraints, control criticality, remediation horizon, and the remaining claim period. The approved maximum for I3 is shorter than the I2 maximum, and the I2 maximum is no longer than the I0–I1 maximum.

| Residual impact | Minimum approver | Duration basis | Renewal posture |
|---|---|---|---|
| I0–I1 | System owner and control owner | Shortest applicable organization-approved maximum, remediation horizon, remaining claim period, or external obligation | Reassessment and new approval under the current risk facts |
| I2 | Independent risk owner and business owner | Organization-approved I2 maximum, no longer than the I0–I1 maximum, further bounded by remediation, claim, and external periods | Independent risk reassessment and new approval |
| I3 | Accountable executive, legal/compliance, and independent risk authority | Organization-approved I3 maximum, shorter than the I2 maximum, further bounded by remediation, claim, and external periods | No routine or automatic renewal; a new exception requires fresh independent assessment and executive approval |

### 4. Conformance Semantics

A conformance claim applies only to the named system boundary, environments, AIES version, assessment period, and claim expiry. AIES defines conformance criteria but does not operate an accreditation or certification scheme, authorize certification marks, or imply regulatory approval, vendor endorsement, organization-wide assurance, or coverage of future releases.

| Claim status | Conditions |
|---|---|
| Conformant | Every applicable control passes; no active exceptions |
| Conformant with exceptions | Every applicable control passes or has a valid exception; no prohibited exception or major nonconformity |
| Nonconformant | At least one applicable control fails without a valid exception, evidence is materially unreliable, or a prohibited claim condition exists |

Exceptions are prohibited for legal obligations, prohibited AI practices, deliberate evidence falsification, unbounded A4 authority, and controls whose absence creates unaccepted imminent I3 harm.

Nonconformities:

| Severity | Definition | Claim effect |
|---|---|---|
| Major | Systemic absence/failure of a required control, unreliable evidence, or condition capable of I3 harm | Blocks claim |
| Minor | Isolated lapse that does not indicate systemic failure or unacceptable residual risk | Corrective action required; claim may continue until deadline |
| Observation | No requirement breach; credible future weakness | No claim effect |

### 5. Normative Assurance Controls

| Control ID | Normative requirement | Applicability | Objective evidence |
|---|---|---|---|
| AIES-ASR-002 | Each evidence item **MUST** identify source, custodian, collection time, covered period, system scope, control mapping, integrity mechanism, and retention date. | Universal | Evidence index and sampled evidence metadata |
| AIES-ASR-003 | Operating-effectiveness evidence **MUST** represent the full assessment period and include failures and exceptions in the sampled population. | Controls expected to operate over time | Population extract, sampling frame, failure records, sample rationale |
| AIES-ASR-004 | Evidence **MUST NOT** rely solely on a control owner’s uncorroborated assertion. | Universal | Independent system records, configuration export, reperformed test, or corroborating source |
| AIES-ASR-005 | The organization **MUST** protect evidence against unauthorized alteration and verify retrievability throughout retention. | Universal | Immutable/WORM or signed storage settings, access log, integrity and restore tests |
| AIES-GOV-010 | The SoA **MUST** identify system/version, boundary, profiles, autonomy, impact, AIES version, every control disposition, rationale, owner, evidence, exception, approval, and review date. | Universal | Completed approved SoA and schema/completeness validation |
| AIES-GOV-011 | Each not-applicable decision **MUST** cite a factual boundary or applicability condition and receive system-owner approval. | Universal | SoA rationale, boundary reference, dated approval |
| AIES-RSK-020 | Each exception **MUST** identify the unmet requirement, cause, exposure, affected assets/people, likelihood, impact, compensating controls, residual risk, remediation owner, due date, expiry, applicable maximum-duration policy, duration rationale, and approvers. | Any exception | Completed exception record, linked risk-register entry, approved duration policy, claim-period and jurisdictional/contractual mapping |
| AIES-RSK-021 | An exception **MUST NOT** remain valid beyond its expiry or after a material change without reassessment and new approval. | Any exception | Expiry automation, reassessment, approval history, blocked-release or alert record |
| AIES-RSK-022 | Compensating controls **MUST** be tested for the stated risk before exception approval. | Exception using compensation | Test plan/results, risk comparison, approver review |
| AIES-RSK-023 | Expired or rejected exceptions **MUST** cause the affected control to become nonconforming until remediated. | Any expired/rejected exception | SoA status transition, GRC workflow, claim update or suspension |
| AIES-RSK-024 | The organization **MUST** approve exception-duration maxima by residual-impact tier, make higher-impact maxima progressively shorter, and review the maxima when risk tolerance, applicable obligations, or claim periods change. | Organization permitting exceptions | Approved exception-duration policy, tier rationale, legal/contractual mapping, risk-committee approval and review history |
| AIES-ASR-006 | A conformance claim **MUST** state system boundary, environments, AIES version, assessor, assessment period, status, active exceptions, issue date, expiry date, and material-change limitation. | Any public or internal claim | Signed claim or assessment report containing all fields |
| AIES-ASR-007 | An AIES claim **MUST NOT** be described as certification, accreditation, regulatory approval, endorsement, or organization-wide assurance; any separately issued external certification must be clearly distinguished from the AIES claim and attributed to its actual scheme and issuing body. | Any claim | Approved claim language, communications review, and separate external certificate/scheme record where referenced |
| AIES-ASR-008 | The organization **MUST** suspend or correct a claim when a major nonconformity, expired exception, material scope change, or unreliable evidence invalidates its basis. | Active claim | Claim register, trigger alert, withdrawal/correction notice, reassessment record |

## Guidance

Automate evidence collection from authoritative systems and store references rather than duplicating sensitive payloads. Hash evidence bundles, preserve query definitions, and retain the population from which samples were drawn. These practices are guidance unless selected as a compensating control.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Period-wide evidence | Detects intermittent failures | Larger evidence volume |
| Expiring exceptions | Forces remediation | Operational follow-up burden |
| Qualified claim language | Prevents overstatement | Less marketable than broad assurance claims |
| Integrity-protected evidence | Defensible audit trail | Storage and key-management complexity |

## Anti-patterns

- **Exception as applicability:** marking an unimplemented control not applicable.
- **Evidence by screenshot:** using an undated UI image with no source, query, or population.
- **Perpetual renewal:** extending exceptions without new risk analysis.
- **Scope ambiguity:** claiming an entire platform conforms after assessing one deployment.
- **Certification implication:** describing AIES conformance as certification, accreditation, regulatory approval, or third-party endorsement.

## Enterprise Considerations

Integrate the SoA with enterprise GRC and link—not copy—authoritative IAM, CI/CD, SIEM, model-registry, data-catalog, and ticket records. Apply legal holds and jurisdictional retention rules. Restrict assessors from raw personal or secret data when metadata, redacted extracts, secure review rooms, or reperformance provide sufficient assurance.

## Checklist

- [ ] Evidence meets all applicable quality attributes.
- [ ] Design, implementation, operation, and outcome evidence are distinguished.
- [ ] The SoA contains every control and required field.
- [ ] Exceptions have authorized owners, tested compensation, deadlines, and expiry.
- [ ] Claim wording is bounded and accurate.
- [ ] Invalidating events suspend or correct the claim.
- [ ] Evidence integrity and retrieval are tested.

## Authoritative References

- [ISO/IEC 17000:2020 — Conformity assessment vocabulary and principles](https://www.iso.org/standard/73029.html)
- [ISO/IEC 17021-1:2015 — Requirements for bodies providing audit and certification](https://www.iso.org/standard/61651.html)
- [ISO 19011:2018 — Guidelines for auditing management systems](https://www.iso.org/standard/70017.html)
- [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [NIST SP 800-53A Rev. 5 — Assessing Security and Privacy Controls](https://doi.org/10.6028/NIST.SP.800-53Ar5)
- [NIST SP 800-92 — Guide to Computer Security Log Management](https://doi.org/10.6028/NIST.SP.800-92)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.1 | 2026-07-16 | Replaced universal exception-day limits with approved risk- and claim-based maxima and prohibited certification-like AIES claims. |
| 1.0.0 | 2026-07-16 | Defined evidence quality, SoA, exceptions, risk acceptance, nonconformities, and claims. |
