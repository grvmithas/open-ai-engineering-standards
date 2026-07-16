# OAIES Statement of Applicability Template

> **Template version:** 1.0.1  
> **Published:** 2026-07-16  
> **Applies to:** OAIES 1.x

## Purpose

Create the authoritative, auditable record of control applicability and implementation for one bounded AI system.

## Why

The SoA prevents omitted controls, undocumented exclusions, and evidence scattered across disconnected systems. It binds scope, risk classification, ownership, evidence, exceptions, and approval in one versioned record.

## How

Replace every `{VARIABLE_FIELD}`. Do not delete catalog rows. Use `Not applicable` only for a factually absent applicability condition. Record `None` with rationale where a variable field does not apply.

### Document Control

| Field | Value |
|---|---|
| SoA ID | `{SOA_ID}` |
| SoA version | `{SOA_VERSION}` |
| Status | `{DRAFT_APPROVED_SUPERSEDED}` |
| OAIES version | `{OAIES_VERSION}` |
| Created | `{YYYY-MM-DD}` |
| Approved | `{YYYY-MM-DD}` |
| Next review | `{YYYY-MM-DD}` |
| Repository/record URI | `{AUTHORITATIVE_URI}` |
| Previous version | `{PREVIOUS_SOA_URI_OR_NONE}` |

### System and Claim Scope

| Field | Value |
|---|---|
| System name and version | `{SYSTEM_NAME_AND_VERSION}` |
| System owner | `{NAME_ROLE_ID}` |
| Business owner | `{NAME_ROLE_ID}` |
| Environments | `{ENVIRONMENTS}` |
| Assessment period | `{START_DATE_TO_END_DATE}` |
| Boundary record | `{BOUNDARY_RECORD_URI_AND_VERSION}` |
| Included components and suppliers | `{COMPONENT_AND_SUPPLIER_INVENTORY_URI}` |
| Excluded components and rationale | `{EXCLUSIONS_WITH_BOUNDARY_RATIONALE_OR_NONE}` |
| Intended use | `{INTENDED_USE}` |
| Foreseeable misuse | `{FORESEEABLE_MISUSE}` |
| Affected persons/groups | `{AFFECTED_PERSONS_AND_GROUPS}` |
| Jurisdictions | `{JURISDICTIONS}` |

### Classification

| Dimension | Selection | Rationale and approval evidence |
|---|---|---|
| Workload profiles | `{P1_P2_P3_P4_P5_P6_ALL_THAT_APPLY}` | `{RATIONALE_AND_APPROVAL_URI}` |
| Autonomy | `{A0_A1_A2_A3_A4}` | `{MAXIMUM_CAPABILITY_RATIONALE_AND_APPROVAL_URI}` |
| Impact | `{I0_I1_I2_I3}` | `{HARM_RATIONALE_AND_APPROVAL_URI}` |
| Legal/policy designations | `{DESIGNATIONS_OR_NONE}` | `{LEGAL_OR_POLICY_ANALYSIS_URI}` |
| Material-change triggers | `{TRIGGERS}` | `{CHANGE_POLICY_URI}` |
| Evidence records schedule | `{RETENTION_POLICY_AND_JURISDICTION_MAPPING}` | `{LEGAL_RECORDS_APPROVAL_URI}` |
| Exception-duration tiers | `{APPROVED_MAXIMA_BY_IMPACT}` | `{RISK_RATIONALE_AND_APPROVAL_URI}` |
| Reassessment/surveillance cadence | `{APPROVED_CADENCE_BY_IMPACT}` | `{RISK_CLAIM_OBLIGATION_RATIONALE_URI}` |

### Control Applicability Register

Copy one row for every control in the claimed OAIES version.

| Control ID | Control version | Disposition | Applicability rationale | Implementation summary | Control owner | Evidence IDs/URIs | Exception ID/expiry | Last tested | Next review |
|---|---|---|---|---|---|---|---|---|---|
| `{OAIES_DOMAIN_NNN}` | `{CONTROL_VERSION}` | `{APPLICABLE_CONFORMING_APPLICABLE_EXCEPTION_APPLICABLE_NONCONFORMING_NOT_APPLICABLE}` | `{FACTUAL_RATIONALE}` | `{IMPLEMENTATION}` | `{NAME_ROLE_ID}` | `{EVIDENCE_REFERENCES}` | `{EXCEPTION_OR_NONE}` | `{YYYY-MM-DD}` | `{YYYY-MM-DD}` |

### Reconciliation

| Check | Result | Evidence |
|---|---|---|
| Catalog control count | `{COUNT}` | `{CATALOG_VERSION_URI}` |
| SoA distinct control count | `{COUNT}` | `{RECONCILIATION_OUTPUT_URI}` |
| Missing or duplicate IDs | `{NONE_OR_IDS}` | `{VALIDATION_OUTPUT_URI}` |
| Applicable without evidence/exception | `{NONE_OR_IDS}` | `{VALIDATION_OUTPUT_URI}` |
| Expired exceptions | `{NONE_OR_IDS}` | `{EXCEPTION_QUERY_URI}` |
| Unapproved exclusions | `{NONE_OR_IDS}` | `{APPROVAL_QUERY_URI}` |

### Approval

| Role | Name/identity | Decision | Date | Signature/record |
|---|---|---|---|---|
| System owner | `{IDENTITY}` | `{APPROVE_REJECT}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Independent risk owner | `{IDENTITY_OR_NOT_REQUIRED_WITH_REASON}` | `{APPROVE_REJECT_NA}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI_OR_NA}` |
| Assessor | `{IDENTITY}` | `{VALIDATED_NOT_VALIDATED}` | `{YYYY-MM-DD}` | `{ASSESSMENT_URI}` |

## Tradeoffs

| Benefit | Cost |
|---|---|
| Complete control inventory | Register maintenance |
| Traceable evidence | Integration with evidence sources |
| Explicit exclusions | Review and approval effort |

## Anti-patterns

- Deleting controls that appear not applicable.
- Using implementation difficulty as exclusion rationale.
- Linking to mutable dashboards without preserving query, period, and integrity metadata.
- Allowing an expired exception to remain a passing disposition.

## Enterprise Considerations

Store the approved SoA in a version-controlled GRC or records system. Enforce unique IDs, role-based approval, immutable history, exception-expiry alerts, and automated reconciliation against the official OAIES catalog.

## Checklist

- [ ] Every variable field is completed or explicitly marked `None` with rationale.
- [ ] Every catalog control appears exactly once.
- [ ] Classifications match the approved boundary and maximum capability.
- [ ] Every applicable control links to evidence or an active exception.
- [ ] Every exclusion cites a factual applicability condition.
- [ ] Reconciliation has no unresolved error.
- [ ] Required approvers signed the same SoA version.
- [ ] Retention, exception, and surveillance periods trace to approved risk and obligation decisions.

## Authoritative References

- [OAIES Kernel and Applicability](../01-kernel-and-applicability.md)
- [OAIES Evidence, Exceptions, and Conformance](../03-evidence-exceptions-conformance.md)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.1 | 2026-07-16 | Added policy evidence for retention, exception duration, and reassessment cadence decisions. |
| 1.0.0 | 2026-07-16 | Established the normative SoA record structure. |
