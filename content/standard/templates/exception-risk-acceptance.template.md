# OAIES Exception and Risk-Acceptance Template

> **Template version:** 1.0.1  
> **Published:** 2026-07-16  
> **Applies to:** OAIES 1.x

## Purpose

Record a time-bound, accountable decision to tolerate incomplete implementation of one applicable OAIES control.

## Why

An exception must expose the exact control gap, affected parties, residual risk, compensation, remediation, and expiry. Vague waivers conceal risk and become permanent by inertia.

## How

Replace every `{VARIABLE_FIELD}`. Create one record per control gap; cross-reference related exceptions instead of combining unrelated requirements. `None` is acceptable only with a reason.

### Record Control

| Field | Value |
|---|---|
| Exception ID | `{EXCEPTION_ID}` |
| Status | `{DRAFT_APPROVED_REJECTED_EXPIRED_CLOSED}` |
| Created | `{YYYY-MM-DD}` |
| Effective | `{YYYY-MM-DD}` |
| Expires | `{YYYY-MM-DD}` |
| Remaining claim period | `{CLAIM_END_DATE_AND_DURATION}` |
| Approved duration policy/tier | `{POLICY_URI_VERSION_AND_IMPACT_TIER}` |
| Maximum permitted duration | `{MAXIMUM_AND_UNIT}` |
| Duration selected and rationale | `{DURATION_AND_RISK_JURISDICTION_CLAIM_REMEDIATION_RATIONALE}` |
| Related SoA/version | `{SOA_ID_VERSION_URI}` |
| System/version | `{SYSTEM_NAME_VERSION}` |
| Environment(s) | `{ENVIRONMENTS}` |
| Control ID/version | `{CONTROL_ID_VERSION}` |

### Gap and Cause

| Field | Value |
|---|---|
| Exact unmet requirement | `{CONTROL_TEXT}` |
| Current implementation | `{IMPLEMENTED_PORTION}` |
| Missing implementation | `{CONTROL_GAP}` |
| Root cause | `{ROOT_CAUSE}` |
| Why remediation cannot precede exposure | `{TIME_BOUND_JUSTIFICATION}` |
| Detection date/source | `{YYYY-MM-DD_AND_SOURCE}` |

### Exposure and Risk

| Field | Value |
|---|---|
| Intended use affected | `{AFFECTED_USE}` |
| Foreseeable misuse/failure | `{SCENARIOS}` |
| Affected people/assets/data | `{AFFECTED_ENTITIES}` |
| Exposure window and volume | `{DURATION_AND_POPULATION}` |
| Inherent likelihood | `{SCALE_VALUE_AND_RATIONALE}` |
| Inherent impact | `{I0_I1_I2_I3_AND_RATIONALE}` |
| Legal/contractual constraints | `{ANALYSIS_URI_OR_NONE_WITH_REASON}` |
| Applicable records/claim constraints | `{RECORDS_SCHEDULE_AND_CLAIM_PERIOD_URIS}` |

### Compensating Controls and Residual Risk

| Compensating control | Owner | Same-risk rationale | Test procedure | Result/evidence | Operating frequency |
|---|---|---|---|---|---|
| `{CONTROL_DESCRIPTION}` | `{NAME_ROLE_ID}` | `{RISK_REDUCTION_RATIONALE}` | `{TEST}` | `{RESULT_AND_EVIDENCE_URI}` | `{FREQUENCY}` |

| Field | Value |
|---|---|
| Residual likelihood | `{SCALE_VALUE_AND_RATIONALE}` |
| Residual impact | `{I0_I1_I2_I3_AND_RATIONALE}` |
| Residual risk relative to tolerance | `{WITHIN_ABOVE_TOLERANCE_AND_POLICY_URI}` |
| Monitoring and alert thresholds | `{METRICS_THRESHOLDS_ALERTS}` |
| Immediate suspension conditions | `{CONDITIONS}` |

### Remediation

| Action | Owner | Due date | Completion evidence | Validation owner/method |
|---|---|---|---|---|
| `{REMEDIATION_ACTION}` | `{NAME_ROLE_ID}` | `{YYYY-MM-DD}` | `{EXPECTED_EVIDENCE}` | `{INDEPENDENT_VALIDATOR_AND_METHOD}` |

### Approval

| Required role | Identity | Decision | Rationale | Date | Signature/record |
|---|---|---|---|---|---|
| Control owner | `{IDENTITY}` | `{APPROVE_REJECT}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| System owner | `{IDENTITY}` | `{APPROVE_REJECT}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Business owner | `{IDENTITY_IF_REQUIRED}` | `{APPROVE_REJECT_NA}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Independent risk owner | `{IDENTITY_IF_REQUIRED}` | `{APPROVE_REJECT_NA}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Legal/compliance | `{IDENTITY_IF_REQUIRED}` | `{APPROVE_REJECT_NA}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Accountable executive | `{IDENTITY_IF_REQUIRED}` | `{APPROVE_REJECT_NA}` | `{RATIONALE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |

### Closure or Expiry

| Field | Value |
|---|---|
| Final status | `{CLOSED_EXPIRED_REJECTED}` |
| Closure date | `{YYYY-MM-DD}` |
| Remediation evidence | `{EVIDENCE_URIS}` |
| Independent validation | `{VALIDATOR_RESULT_URI}` |
| SoA disposition updated | `{SOA_VERSION_URI}` |
| Related incident/corrective action | `{RECORD_URIS_OR_NONE}` |

## Tradeoffs

| Benefit | Cost |
|---|---|
| Transparent residual risk | Approval and monitoring burden |
| Time-bounded exposure | May force suspension at expiry |
| Tested compensation | Additional engineering work |

## Anti-patterns

- Approving a gap because a control is expensive.
- Describing residual risk as “low” without scale, rationale, and affected population.
- Listing planned remediation as a compensating control.
- Renewing by changing only the expiry date.
- Accepting a legal prohibition or imminent severe harm.

## Enterprise Considerations

Implement workflow-enforced approval tiers, maximum duration, expiry alerts, SoA status changes, and claim suspension. Link exceptions to risk, incident, change, supplier, and corrective-action registers.

## Checklist

- [ ] One exact control gap is identified.
- [ ] Root cause and exposure are measurable.
- [ ] Affected persons and assets are identified.
- [ ] Compensating controls reduce the same risk and have test evidence.
- [ ] Residual risk is compared with approved tolerance.
- [ ] Duration is within the approved impact-tier maximum and remaining claim period.
- [ ] I3 duration is shorter than the approved I2 maximum and has no routine renewal.
- [ ] Remediation has owner, deadline, and independent validation.
- [ ] Required approvers match residual impact.
- [ ] Expiry automatically changes SoA and claim status.

## Authoritative References

- [OAIES Evidence, Exceptions, and Conformance](../03-evidence-exceptions-conformance.md)
- [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.1 | 2026-07-16 | Added evidence for risk-tier duration maxima, claim-period bounds, and high-impact escalation. |
| 1.0.0 | 2026-07-16 | Established the normative exception and risk-acceptance record. |
