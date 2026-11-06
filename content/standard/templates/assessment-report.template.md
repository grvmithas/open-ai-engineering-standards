# AIES Conformance Assessment Report Template

> **Template version:** 1.0.1  
> **Published:** 2026-07-16  
> **Applies to:** AIES 1.x  
> **Updated:** 2026-07-29

## Purpose

Produce a bounded, evidence-based, independently reviewable AIES conformance conclusion.

## Why

A report must let an informed reader understand exactly what was assessed, against which criteria, by whom, over what period, using which samples, and why the conclusion follows.

## How

Replace every `{VARIABLE_FIELD}`. Preserve failed tests, contradictory evidence, scope limitations, and management responses. Use `None` only with a reason.

### Report Control

| Field | Value |
|---|---|
| Report ID/version | `{REPORT_ID_VERSION}` |
| Status | `{DRAFT_FINAL_SUPERSEDED}` |
| Issue date | `{YYYY-MM-DD}` |
| AIES version | `{AIES_VERSION}` |
| Assessment type | `{READINESS_INITIAL_SURVEILLANCE_RENEWAL_TRIGGERED}` |
| Assessment period | `{START_DATE_TO_END_DATE}` |
| Claim expiry | `{YYYY-MM-DD_OR_NO_CLAIM_WITH_REASON}` |
| Assessment-period rationale | `{CONTROL_FREQUENCY_OPERATING_CYCLES_FAILURE_OPPORTUNITIES_AND_RISK}` |
| Claim-expiry basis | `{RISK_OBLIGATION_RECORDS_AND_APPROVED_POLICY_URIS}` |
| Intended report users | `{USERS}` |
| Distribution/classification | `{DISTRIBUTION_AND_CLASSIFICATION}` |

### Executive Conclusion

| Field | Value |
|---|---|
| System/version | `{SYSTEM_NAME_VERSION}` |
| Environments | `{ENVIRONMENTS}` |
| Conclusion | `{CONFORMANT_CONFORMANT_WITH_EXCEPTIONS_NONCONFORMANT_NO_CLAIM}` |
| Basis | `{CONCISE_EVIDENCE_BASED_BASIS}` |
| Major nonconformities | `{COUNT_AND_IDS}` |
| Minor nonconformities | `{COUNT_AND_IDS}` |
| Active exceptions | `{COUNT_AND_IDS}` |
| Scope limitations | `{COUNT_AND_IDS}` |
| Material-change limitation | `{EVENTS_REQUIRING_REASSESSMENT}` |

### Scope and Criteria

| Field | Value |
|---|---|
| Boundary record/version | `{BOUNDARY_URI_VERSION}` |
| Included components/suppliers | `{INVENTORY_URI}` |
| Exclusions and rationale | `{EXCLUSIONS_OR_NONE}` |
| Workload profiles | `{P1_TO_P6}` |
| Autonomy/impact | `{A_LEVEL_AND_I_LEVEL}` |
| SoA ID/version | `{SOA_URI_VERSION}` |
| Applicable legal/policy overlays | `{OVERLAYS}` |
| Locations/regions | `{LOCATIONS}` |

### Team Competence and Independence

| Assessor | Role | Relevant competence | Independence/conflict declaration |
|---|---|---|---|
| `{IDENTITY}` | `{LEAD_TECHNICAL_DOMAIN_QUALITY}` | `{QUALIFICATIONS_AND_EXPERIENCE}` | `{DECLARATION_URI_AND_RESULT}` |

### Methods

| Method | Scope | Procedure/workpaper | Date | Assessor |
|---|---|---|---|---|
| `{INSPECTION_INTERVIEW_OBSERVATION_REPERFORMANCE_ANALYTICS}` | `{CONTROLS_SYSTEMS_PERIOD}` | `{WORKPAPER_URI}` | `{YYYY-MM-DD}` | `{IDENTITY}` |

### Sampling

| Population | Source/query and integrity | Size | Risk strata | Assurance/tolerable-deviation basis | Census decision or selection method/seed | Sample size | Exceptions found |
|---|---|---:|---|---|---|---:|---:|
| `{POPULATION}` | `{SOURCE_QUERY_HASH_URI}` | `{N}` | `{STRATA}` | `{APPROVED_CRITERIA_AND_RATIONALE}` | `{CENSUS_RATIONALE_OR_METHOD_AND_SEED}` | `{N}` | `{N}` |

### Control Results

Copy one row for every applicable control.

| Control ID | Design result | Operating result | Evidence/workpapers | Test exceptions | Finding ID | Assessor conclusion |
|---|---|---|---|---|---|---|
| `{CONTROL_ID}` | `{PASS_FAIL_NOT_TESTED}` | `{PASS_FAIL_DESIGN_ONLY_NOT_TESTED}` | `{EVIDENCE_AND_WORKPAPER_URIS}` | `{EXCEPTIONS_OR_NONE}` | `{FINDING_ID_OR_NONE}` | `{CONCLUSION}` |

### Findings

| Finding ID | Severity | Control(s) | Condition and evidence | Criteria | Cause | Risk/effect | Management response | Due date | Closure evidence |
|---|---|---|---|---|---|---|---|---|---|
| `{FINDING_ID}` | `{MAJOR_MINOR_OBSERVATION}` | `{CONTROL_IDS}` | `{FACTS_AND_EVIDENCE}` | `{REQUIREMENT_TEXT}` | `{ROOT_CAUSE}` | `{RISK}` | `{RESPONSE}` | `{YYYY-MM-DD}` | `{EVIDENCE_OR_OPEN}` |

### Exceptions and Scope Limitations

| ID | Type | Description | Affected controls | Conclusion effect | Required action |
|---|---|---|---|---|---|
| `{ID}` | `{ACTIVE_EXCEPTION_SCOPE_LIMITATION}` | `{DESCRIPTION}` | `{CONTROL_IDS}` | `{EFFECT}` | `{ACTION}` |

### Reassessment and Surveillance

| Field | Value |
|---|---|
| Next surveillance | `{YYYY-MM-DD}` |
| Surveillance interval and basis | `{INTERVAL_WITH_IMPACT_CHANGE_CONTROL_FREQUENCY_INCIDENT_OBLIGATION_AND_CLAIM_RATIONALE}` |
| I3 escalation comparison | `{SHORTER_INTERVAL_AND_STRONGER_SAMPLING_COMPARISON_OR_NA}` |
| Renewal due | `{YYYY-MM-DD}` |
| Triggered-review events | `{TRIGGERS}` |
| Open corrective-action monitoring | `{OWNER_AND_FREQUENCY}` |
| Claim-register URI | `{URI}` |

### Review and Signature

| Role | Identity | Decision | Date | Signature/record |
|---|---|---|---|---|
| Lead assessor | `{IDENTITY}` | `{ISSUE_DO_NOT_ISSUE}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Independent quality reviewer | `{IDENTITY}` | `{APPROVE_RETURN}` | `{YYYY-MM-DD}` | `{SIGNATURE_URI}` |
| Management factual reviewer | `{IDENTITY}` | `{FACTS_ACCEPTED_DISPUTED_WITH_DETAILS}` | `{YYYY-MM-DD}` | `{RESPONSE_URI}` |

## Tradeoffs

| Benefit | Cost |
|---|---|
| Reproducible conclusion | Detailed workpapers and evidence indexing |
| Transparent limitations | May prevent a positive claim |
| Explicit sampling | Requires population access and technical analysis |

## Anti-patterns

- Reporting only an aggregate score.
- Omitting failed samples or management disagreements.
- Calling a readiness review a conformance assessment.
- Treating management approval as assessor independence.
- Issuing a positive conclusion when critical evidence is unavailable.

## Enterprise Considerations

Classify and protect reports because they can contain security, privacy, supplier, and legal-sensitive findings. Preserve signed final reports, workpapers, evidence hashes, factual-review comments, and quality-review records under the applicable retention schedule.

## Checklist

- [ ] Scope, criteria, period, and intended users are explicit.
- [ ] Competence and independence are documented.
- [ ] Methods and samples are reproducible.
- [ ] Numeric periods and sample sizes trace to approved risk and assurance decisions.
- [ ] Every applicable control has a test conclusion.
- [ ] Findings distinguish condition, criteria, cause, and effect.
- [ ] Exceptions and scope limitations affect the conclusion correctly.
- [ ] Factual and independent quality reviews are complete.
- [ ] Claim expiry and reassessment triggers are stated.

## Authoritative References

- [AIES Lifecycle and Assessor Methodology](../04-lifecycle-and-assessment.md)
- [ISO 19011:2018](https://www.iso.org/standard/70017.html)
- [NIST SP 800-53A Rev. 5](https://doi.org/10.6028/NIST.SP.800-53Ar5)

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.1 | 2026-07-16 | Added evidence fields for assessment periods, claim expiry, sampling criteria, and risk-based surveillance cadence. |
| 1.0.0 | 2026-07-16 | Established the normative assessment report structure. |
