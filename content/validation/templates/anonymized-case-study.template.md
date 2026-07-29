# AIES Anonymized External-Pilot Case Study Template

> **Template version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Publication template; completion does not establish approval

## Purpose

Publish useful external-pilot evidence while bounding claims and reducing participant, personnel, customer, and system re-identification risk.

## Why

Removing an organization name is not sufficient anonymization. Architecture combinations, dates, incidents, sample sizes, and quotations can identify a participant or expose confidential operations.

## How

Replace every `{FIELD}`. Delete instructional text only after independent privacy/legal review. Use `Not disclosed — {REASON}` rather than inventing, estimating, or silently omitting information.

### Publication Control

| Field | Value |
|---|---|
| Case-study ID/version | `{CASE_STUDY_ID_VERSION}` |
| Pilot/cohort IDs | `{OPAQUE_IDS}` |
| AIES/protocol versions | `{VERSIONS}` |
| Evidence period | `{COARSE_PERIOD}` |
| Publication approval IDs/dates | `{PARTICIPANT_LEGAL_PROGRAM_APPROVALS}` |
| De-identification reviewer | `{INDEPENDENT_REVIEWER_ROLE}` |
| Re-identification risk decision | `{ACCEPT_REDACT_REJECT_AND_RATIONALE}` |
| Claim expiry | `{YYYY-MM-DD}` |

### Evidence Status

| Capability | Status | Evidence boundary |
|---|---|---|
| Validation infrastructure | `{IMPLEMENTED_VERSION}` | `{METHOD_AND_TOOLING}` |
| External organization participation | `{COMPLETE_WITHDRAWN_OR_NOT_ESTABLISHED}` | `{AUTHORIZED_NON_IDENTIFYING_DESCRIPTION}` |
| Independent assessment | `{COMPLETE_OR_NOT_ESTABLISHED}` | `{INDEPENDENCE_MODEL}` |
| Certification/accreditation/endorsement | `Not established` unless separately evidenced | `{SEPARATE_AUTHORITY_OR_NONE}` |

### Participant and System Context

Report only categories approved for publication.

| Dimension | Approved description |
|---|---|
| Organization type/size band | `{NON_IDENTIFYING_BAND}` |
| Sector/geography band | `{COARSE_CATEGORY}` |
| System purpose and users | `{PURPOSE_WITHOUT_IDENTIFIERS}` |
| AIES workload profiles | `{P1_TO_P6}` |
| Impact/autonomy bands | `{I_LEVEL_A_LEVEL}` |
| Lifecycle maturity | `{DESIGN_ONLY_OR_COARSE_OPERATING_PERIOD}` |
| Architecture | `{GENERALIZED_MODEL_RETRIEVAL_TOOL_AGENT_DEPLOYMENT_PATTERN}` |
| Evidence constraints | `{DATA_RESIDENCY_CONFIDENTIALITY_ACCESS_LIMITATIONS}` |

### Validation Question

`{PRE_REGISTERED_QUESTION_OR_SPECIFICATION_HYPOTHESIS}`

### Method

| Element | Description |
|---|---|
| Frozen criteria | `{OAIES_VERSION_CONTROL_FAMILIES}` |
| Assessor qualification | `{DE_IDENTIFIED_COMPETENCE_SUMMARY}` |
| Independence | `{MODEL_AND_ANY_LIMITATION}` |
| Blinding | `{OUTPUT_LOCK_AND_EQUIVALENT_ACCESS}` |
| Population/frame | `{NON_IDENTIFYING_DESCRIPTION_SIZE_HASH_REFERENCE}` |
| Sampling | `{CERTAINTY_STRATA_ALLOCATION_SEED_METHOD}` |
| Paired ratings | `{N}` |
| Missing/excluded ratings | `{N_AND_REASON}` |
| Calculator/version | `{TOOL_VERSION_COMMAND_OR_REPRODUCTION_REFERENCE}` |

### Results

Report unfavorable results and limitations with the same precision as favorable results.

| Metric | Estimate | 95% interval | Numerator/denominator or method |
|---|---:|---:|---|
| Paired coverage | `{VALUE}` | `Not applicable` | `{N_PAIRED}/{N_UNION}` |
| Exact agreement | `{VALUE}` | `{WILSON_LOW_HIGH}` | `{N_MATCH}/{N_PAIRED}` |
| Cohen's kappa | `{VALUE_OR_UNDEFINED}` | `{BOOTSTRAP_LOW_HIGH_OR_REASON}` | `{REPLICATES_SEED}` |
| Critical disagreements | `{VALUE}` | `Not applicable` | `{N_CRITICAL}/{N_PAIRED}` |

| Rating/stratum | Assessor A | Assessor B | Exact agreement | Limitation |
|---|---:|---:|---:|---|
| `{DE_IDENTIFIED_CATEGORY}` | `{N}` | `{N}` | `{N}/{N}` | `{LIMITATION_OR_NONE}` |

### Disagreements and Specification Learning

| Root-cause category | Count | De-identified lesson | Specification issue/status |
|---|---:|---|---|
| `{SPEC_AMBIGUITY_ETC}` | `{N}` | `{LESSON_WITHOUT_SYSTEM_DETAIL}` | `{OPAQUE_ISSUE_ID_STATUS}` |

State whether issues change normative meaning, guidance, tooling, or training. Original ratings and primary agreement remain unchanged after adjudication.

### Operational Outcomes

`{OBSERVED_PROCESS_OR_CONTROL_CHANGES_WITHOUT_CAUSAL_OVERCLAIM}`

Do not attribute safety, quality, compliance, cost, or performance improvement to AIES unless the pilot included a pre-registered causal design capable of supporting that conclusion.

### Limitations and Attrition

- `{SELECTION_AND_PORTFOLIO_LIMITATION}`
- `{SAMPLE_SIZE_AND_INTERVAL_LIMITATION}`
- `{EVIDENCE_ACCESS_OR_SCOPE_LIMITATION}`
- `{ASSESSOR_OR_BLINDING_LIMITATION}`
- `{WITHDRAWAL_OR_MISSINGNESS_ACCOUNTING}`
- `{GENERALIZABILITY_LIMITATION}`

### Bounded Conclusion

`{EXACT_CLAIM_APPROVED_BY_RELEASE_AUTHORITY}`

This case study does not by itself establish certification, accreditation, endorsement, universal applicability, legal compliance, or effectiveness on systems outside the stated scope.

### Reproduction and Access

| Artifact | Public/controlled status | Access route |
|---|---|---|
| Protocol and rubric | `{STATUS}` | `{URI_VERSION}` |
| Calculator | `{STATUS}` | `{URI_VERSION}` |
| De-identified outputs | `{STATUS}` | `{URI_OR_NON_RELEASE_REASON}` |
| Restricted evidence | `Not public` | `{CONTROLLED_REVIEW_PROCESS_OR_NONE}` |
| Package manifest/signature | `{STATUS}` | `{URI_OR_ASSURANCE_STATEMENT}` |

## De-identification Procedure

1. Inventory direct and indirect identifiers, including rare architecture combinations and dates.
2. Generalize or suppress fields using an explicit threat model and plausible external auxiliary data.
3. Remove secrets, customer content, personal data, exact vulnerabilities, quotations, metadata, and file paths unless specifically approved.
4. Verify tables, denominators, and cross-document combinations do not enable singling out.
5. Obtain independent privacy/legal review and participant approval for the final rendered artifact.
6. Hash and archive the approved version; every amendment repeats review.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Generalized context | Reduces re-identification | Limits technical detail |
| Full metric disclosure | Prevents cherry-picking | May expose cohort uniqueness |
| Controlled evidence access | Supports assurance under confidentiality | Public reproduction is incomplete |

## Anti-patterns

- Replacing a company name while retaining unique dates, products, quotations, or architecture.
- Reporting only adjudicated agreement.
- Claiming causal improvement from a descriptive pilot.
- Inferring missing values or suppressing failed gates.
- Treating participant publication approval as endorsement.

## Enterprise Considerations

Privacy, legal, security, communications, and the participant must approve the final rendered artifact—not only this blank template. Consider mosaic re-identification across other publications, retention duties, securities disclosure, vulnerability coordination, and regulator access.

## Checklist

- [ ] Every field is completed or explicitly withheld with reason.
- [ ] Metrics reproduce the locked primary report.
- [ ] Attrition, failures, and limitations are visible.
- [ ] Direct and indirect identifiers pass independent review.
- [ ] Claims do not imply certification, endorsement, or causality.
- [ ] Final participant, legal/privacy, and release approvals are recorded.
- [ ] Published artifact hash and expiry are retained.

## Authoritative References

- UK ICO, [Anonymisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/).
- NIST, [Privacy Framework 1.0](https://www.nist.gov/privacy-framework).
- [AIES Validation Evidence Package and Release Gates](../evidence-and-release-gates.md).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established the de-identified external-pilot publication template and claim boundary. |
