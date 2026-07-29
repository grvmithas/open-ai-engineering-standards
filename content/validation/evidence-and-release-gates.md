# AIES Validation Evidence Package and Release Gates

> **Version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Operational protocol; no external evidence package is asserted

## Purpose

Define the immutable evidence package, review controls, publication boundary, and release decision required before AIES may claim external validation.

## Why

Agreement numbers without provenance, independence evidence, failed cases, or a frozen method are not auditable. A release gate prevents selective reporting and keeps synthetic tests, internal pilots, and external evidence distinct.

## When

Create one package for every pilot and one cohort package for every proposed external-validation claim or specification release informed by pilots.

## How

### 1. Package Structure

Use immutable pilot ID `VAL-{YYYY}-{NNN}` and cohort ID `COHORT-{YYYY}-{NN}`.

```text
VAL-YYYY-NNN/
  00-governance/
    package-metadata.json
    approvals/
    decision-log/
  01-intake-selection/
    intake-record/
    eligibility/
    selection-score/
    conflicts/
  02-legal-data/
    agreement-register/
    data-inventory/
    approvals/
    retention-disposition/
  03-frozen-method/
    oaies-version/
    control-catalog/
    rubric/
    protocol/
    sampling-frame/
    seed/
  04-system-evidence/
    evidence-manifest.csv
    participant-controlled-references/
    integrity-records/
  05-assessor/
    competence/
    independence/
    calibration/
    access-logs/
  06-blind-outputs/
    assessor-a/
    assessor-b/
    lock-records/
  07-analysis/
    agreement-report.json
    calculator-version/
    analysis-log/
  08-adjudication/
    disagreement-register/
    panel-records/
    dispositions/
  09-findings-feedback/
    findings/
    specification-issues/
    corrective-actions/
  10-reporting/
    participant-report/
    case-study-draft/
    publication-approvals/
  11-closeout/
    release-decision/
    deletion-attestations/
    residual-limitations/
  manifest.sha256
```

Restricted content may remain in participant-controlled storage. The package then stores an opaque evidence ID, source owner, retrieval procedure, observed metadata, cryptographic hash where lawful, access date, and retention status—not a dead link presented as evidence.

### 2. Manifest Requirements

Every artifact record includes:

- stable artifact ID, pilot/cohort ID, path or controlled reference;
- type, schema/version, producer, approver, creation and lock timestamps in UTC;
- classification, personal-data flag, trade-secret flag, jurisdiction/residency;
- source system and authoritative query/version;
- SHA-256 digest when a stable byte representation exists;
- access roles, retention trigger/date, legal hold, and disposition status;
- predecessor/supersessor and reason for any correction.

Generate `manifest.sha256` over canonical relative paths and file bytes after package lock. Sign the manifest using the organization-approved signing service. A hash detects change; identity assurance depends on signature and key governance.

### 3. Quality Review

An independent quality reviewer who was not an original assessor verifies:

1. eligibility, legal/data approvals, assessor competence, and independence;
2. package equivalence, frame integrity, pre-registered seed, and output locks;
3. calculator input/output linkage and reproducibility;
4. all exclusions, missing ratings, critical disagreements, withdrawals, and limitations;
5. adjudication separation from primary metrics;
6. specification-issue traceability and version impact;
7. publication de-identification and participant/legal approval;
8. manifest completeness, retention, and signature.

Quality review records each procedure as pass, fail, or not applicable with rationale. An unresolved fail is a gate failure.

### 4. Release Gates

| Gate | Mandatory evidence | Pass condition | Non-waivable failure |
|---|---|---|---|
| G0 Authority | Approved charter, role assignments, funding/conflict disclosures | Decision rights independent of outcome incentives | Contingent favorable-result funding |
| G1 Partner/legal | Eligibility, executed authority, data and publication prerequisites | All applicable approvals predate access | Missing lawful authority or unsafe data handling |
| G2 Method freeze | Versioned protocol, catalog, rubric, frame hash, seed | Frozen before assessment | Retrospective method/threshold change |
| G3 Assessor | Competence, calibration, two independence declarations | Both assessors qualified and independent | Control ownership or outcome-contingent compensation |
| G4 Execution integrity | Equivalent access, logs, signed output hashes | Blind outputs locked before comparison | Cross-assessor conclusion leakage |
| G5 Reliability | Machine report and reproducibility record | All primary targets in methodology pass | Any critical disagreement or fabricated/altered output |
| G6 Learning integrity | Disagreement register, adjudication, issue links | Every disagreement disposed or explicitly open | Primary results overwritten by consensus |
| G7 Evidence quality | Complete manifest and independent quality review | No unresolved material limitation | Missing failed cases or unverifiable analysis |
| G8 Publication | De-identification assessment and specific approvals | Claims bounded to evidence and limitations | Partner identity/result disclosed without authority |
| G9 Release authority | Signed decision and conditions | Accept or conditional accept with no non-waivable failure | Certification/endorsement claim without authority |

### 5. Decision Protocol

The release authority issues exactly one result:

| Decision | Meaning | Permitted action |
|---|---|---|
| `ACCEPT` | G0–G9 pass | Publish the bounded claim and approved case study |
| `CONDITIONAL_ACCEPT` | Only remediable, non-metric documentation items remain; due dates precede publication | Hold publication until independent closure verification |
| `REJECT_REMEDIATE` | One or more gates fail but a new blinded run can resolve them | Fix cause and execute a new measurement; do not rewrite original run |
| `REJECT_TERMINATE` | Authority, integrity, safety, or feasibility failure cannot be remedied | Close and disposition data; publish no validation claim |

The signed decision states AIES and protocol versions, pilot/cohort IDs, achieved scope, every limitation, gate results, dissent, expiry, and revalidation triggers.

### 6. Claim Language

Only after `ACCEPT` may maintainers state that a specified AIES version was externally piloted. The claim must name:

- number of completed and withdrawn organizations without implying representativeness;
- system profiles, impact/autonomy ranges, sectors/geographies at a non-identifying level;
- assessor independence model;
- sample size, coverage, exact agreement and interval, kappa and interval, critical disagreements;
- protocol version, evidence period, limitations, and expiry.

Never state “industry validated,” “certified,” “accredited,” “endorsed,” “proven effective,” or “universally applicable” unless a separate, competent authority and evidence establish that exact claim.

### 7. Revalidation Triggers

Expire the evidence claim after 24 months or earlier upon:

- major AIES release or material rating/applicability change;
- discovered assessor conflict, evidence fabrication, calculator defect, or privacy breach;
- withdrawal of participant publication authority affecting the claim basis;
- cohort evidence no longer matching current system classes;
- legal decision that invalidates data use or transfer.

Suspend affected claims during integrity investigation.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Immutable package | Auditable provenance | Storage and signing overhead |
| Non-waivable integrity gates | Protects credibility and participants | Forces reruns after contamination |
| Expiring claims | Prevents stale validation | Recurring external-assessment cost |
| Specific claim language | Prevents overgeneralization | Less marketable messaging |

## Anti-patterns

- Keeping only final agreement percentages.
- Omitting withdrawn pilots from cohort accounting.
- Storing hashes without preserving canonicalization and source context.
- Treating legal approval as evidence of technical validity.
- “Conditionally accepting” a failed reliability threshold.
- Publishing a case study before participant approval.

## Enterprise Considerations

Use write-once or version-locked storage, organization-managed keys, role-based access, legal holds, tested deletion, and an evidence custodian independent of commercial teams. Package indexes may be retained longer than sensitive content when the schedule permits. Regulators or contracts may require stronger signatures, local storage, longer retention, or direct workpaper access.

## Checklist

- [ ] Package follows the required structure or records justified mappings.
- [ ] Every artifact is inventoried, classified, and integrity-linked.
- [ ] Independent quality review has no unresolved failure.
- [ ] Every G0–G9 result cites objective evidence.
- [ ] Original outputs and primary metrics are immutable.
- [ ] Claim text states cohort, metrics, limitations, protocol, and expiry.
- [ ] Synthetic and internal evidence are excluded from external claims.
- [ ] Release decision and revalidation triggers are signed.

## Authoritative References

- NIST, [SP 800-53A Rev. 5](https://doi.org/10.6028/NIST.SP.800-53Ar5).
- NIST, [SP 800-92 — Guide to Computer Security Log Management](https://doi.org/10.6028/NIST.SP.800-92).
- ISO, [ISO/IEC 17029:2019](https://www.iso.org/standard/29352.html).
- [AIES Evidence, Exceptions, and Conformance](../standard/03-evidence-exceptions-conformance.md).
- [AIES Blind Inter-Assessor Methodology](./inter-assessor-methodology.md).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established evidence package, quality review, release gates, claim boundaries, and revalidation. |
