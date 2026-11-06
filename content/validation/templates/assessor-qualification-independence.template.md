# AIES Assessor Qualification and Independence Record Template

> **Template version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Controlled record template  
> **Updated:** 2026-07-29

## Purpose

Create an evidence-backed decision that an assessor is competent and independent for a specific AIES pilot.

## Why

A résumé or general conflict statement does not prove competence for the assigned scope or expose threats from control implementation, reporting lines, financial incentives, and prior access.

## How

Complete before assignment and re-attest before output lock. Store sensitive personal details in restricted records and reference them by controlled ID.

### Record Control

| Field | Value |
|---|---|
| Record ID/version | `{RECORD_ID_VERSION}` |
| Pilot/cohort ID | `{PILOT_COHORT_ID}` |
| Assessor alias/restricted identity ID | `{ALIAS_IDENTITY_REFERENCE}` |
| Proposed role | `{LEAD_TECHNICAL_DOMAIN_QUALITY}` |
| Scope/control families | `{SCOPE}` |
| Initial decision/date | `{QUALIFIED_CONDITIONAL_REJECTED_DATE}` |
| Re-attestation decision/date | `{PASS_FAIL_DATE}` |
| Decision owner | `{INDEPENDENT_COORDINATOR}` |

### Competence Evidence

| Requirement | Evidence ID and verified fact | Current for scope? | Decision/rationale |
|---|---|---|---|
| Assessment experience | `{COMPLETED_ENGAGEMENTS_ROLES_DATES}` | `{YES_NO}` | `{RATIONALE}` |
| AIES knowledge test | `{VERSION_SCORE_DATE}` | `{YES_NO}` | `{RATIONALE}` |
| Calibration | `{CASE_SET_RESULT_CRITICAL_MISSES_RETEST}` | `{YES_NO}` | `{RATIONALE}` |
| AI engineering | `{YEARS_RECENT_WORK_SCOPE}` | `{YES_NO}` | `{RATIONALE}` |
| Security/privacy/risk | `{EVIDENCE_OR_TEAM_COVERAGE}` | `{YES_NO}` | `{RATIONALE}` |
| Domain/legal overlay | `{SPECIALIST_EVIDENCE}` | `{YES_NO}` | `{RATIONALE}` |
| Recency | `{MOST_RECENT_RELEVANT_DATE}` | `{YES_NO}` | `{RATIONALE}` |

### Independence Disclosure

Report relationships during the prior 24 months and expected engagement.

| Threat | Disclosure/evidence ID | Severity | Safeguard | Disposition |
|---|---|---|---|---|
| Employment/reporting line | `{DETAIL_OR_NONE}` | `{NONE_LOW_MATERIAL}` | `{SAFEGUARD}` | `{ACCEPT_EXCLUDE}` |
| Ownership/investment/financial dependence | `{DETAIL_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Outcome-contingent compensation/sales target | `{DETAIL_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Design/implementation/operation/approval | `{CONTROL_ROLE_DATES_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Prior consulting/advice | `{DETAIL_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Personal/legal interest | `{RESTRICTED_REFERENCE_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Prior result/hypothesis access | `{DETAIL_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |
| Gifts/sponsorship/other influence | `{DETAIL_OR_NONE}` | `{LEVEL}` | `{SAFEGUARD}` | `{DISPOSITION}` |

### Attestations

Assessor statement:

`I have disclosed all known competence limitations and independence threats, will report changes immediately, will not communicate conclusions outside the approved blind channel, and understand that omission can invalidate the pilot.`

| Signatory | Decision/attestation | Date/time UTC | Signature record |
|---|---|---|---|
| Assessor | `{ATTEST_DECLINE}` | `{TIMESTAMP}` | `{SIGNATURE_ID}` |
| Methodology coordinator | `{QUALIFY_CONDITIONAL_REJECT}` | `{TIMESTAMP}` | `{SIGNATURE_ID}` |
| Ethics/independence reviewer, when needed | `{ACCEPT_EXCLUDE}` | `{TIMESTAMP}` | `{SIGNATURE_ID}` |
| Assessor at output lock | `{NO_CHANGE_CHANGE_DISCLOSED}` | `{TIMESTAMP}` | `{SIGNATURE_ID}` |

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Scope-specific qualification | Competence matches assignment | Repeated review per pilot |
| Restricted identity records | Protects personnel data | Public verification is limited |
| Final re-attestation | Detects engagement-period changes | Additional lock step |

## Anti-patterns

- Treating certification or job title as sufficient competence.
- Accepting “no conflict” without enumerated threat categories.
- Mitigating direct control ownership with disclosure alone.
- Storing unnecessary personal details in a public evidence package.

## Enterprise Considerations

Apply employment/privacy law, works-council requirements, data minimization, access restrictions, retention, and appeal processes. Statutory assessor or accreditation requirements override this minimum.

## Checklist

- [ ] Every competence requirement cites verified evidence.
- [ ] Scope-specific gaps have effective team coverage.
- [ ] Every threat category is completed.
- [ ] Mandatory exclusions are applied.
- [ ] Initial and lock-time attestations are signed.
- [ ] Restricted personal information is separated from publishable evidence.

## Authoritative References

- [AIES Blind Inter-Assessor Methodology](../inter-assessor-methodology.md).
- ISO, [ISO 19011:2018](https://www.iso.org/standard/70017.html).
- ISO, [ISO/IEC 17029:2019](https://www.iso.org/standard/29352.html).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established scope-specific competence and independence record. |
