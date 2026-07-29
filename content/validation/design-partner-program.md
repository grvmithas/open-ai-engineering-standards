# AIES Design-Partner and System-Selection Protocol

> **Version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Operational protocol; no partners enrolled by this document

## Purpose

Select lawful, informative external pilots without misrepresenting prospects as partners or choosing only systems likely to produce favorable outcomes.

## Why

Convenience recruitment and success-biased system selection produce non-generalizable evidence. A recorded intake, selection rubric, and pre-access legal gate make inclusion decisions reviewable and protect participants and data subjects.

## When

Use before any non-maintainer organization provides system information, evidence, personnel time, or publication permission for an AIES pilot.

## How

### 1. Recruitment and Participation States

| State | Entry evidence | Allowed public description |
|---|---|---|
| Prospect | Internal contact record | None |
| Candidate | Completed intake and eligibility screen | None unless candidate approves |
| Enrolled participant | Executed participation agreement and all pre-access approvals | “Participating organization” only with written approval |
| Pilot complete | Locked assessment outputs and closeout acceptance | De-identified participation unless naming is separately approved |
| Withdrawn | Withdrawal/termination record and disposition plan | Included anonymously in attrition accounting |

No fee, donation, sponsorship, or roadmap influence may purchase selection, alter criteria, suppress findings, or buy endorsement.

### 2. Eligibility Gate

A candidate is eligible only when all answers are supported:

- a named executive system owner can authorize participation;
- the system boundary is stable enough to assess against a frozen version;
- the system has objective design or operating evidence;
- evidence can be lawfully accessed by the assessment team;
- the participant accepts possible nonconformity and publication of aggregate/approved de-identified lessons;
- assessors can be independent of implementation and commercial success;
- participation does not interfere with an active incident, investigation, litigation hold, or regulator direction.

Reject or defer systems whose only evidence is generated for the pilot, whose boundary cannot be stated, or whose legal authority is unresolved.

### 3. System-Selection Protocol

The methodology custodian assigns an immutable candidate ID and scores only after eligibility. Preserve raw answers and rationale.

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Workload coverage | Duplicates enrolled systems | Minor variation | New workload profile | New profile plus meaningful interaction |
| Impact/autonomy | I0/A0 only | I1 or A1 | I2 or A2 | I3 or A3 with lawful safeguards |
| Lifecycle maturity | No operational evidence | Design evidence only | 30–89 days operation | At least 90 days operation |
| Architecture diversity | Duplicate stack | One material variation | Different model/data pattern | Different deployment and governance model |
| Evidence readiness | Material gaps | Partial export possible | Most evidence accessible | Authoritative, integrity-verifiable sources |
| Assessor feasibility | Independence/skills doubtful | Material scheduling constraint | Qualified team available | Qualified team plus domain specialist |
| Learning value | Known coverage | Minor ambiguity tested | Multiple controls/ambiguities tested | Known specification-risk hypothesis tested |

Selection rules:

1. Score all eligible candidates within the same intake window.
2. Rank by portfolio gap first, then total score; do not rank by expected conformance.
3. Require a minimum total of 11/21 and no zero for evidence readiness or assessor feasibility.
4. Select the highest-ranked systems that fit capacity while preventing one vendor, sector, geography, model provider, or architecture from dominating more than 40% of a validation cohort.
5. Resolve ties using a recorded cryptographic draw: sort candidate IDs, publish a seed before selection, and rank `SHA-256(seed || candidate_id)`.
6. Record exclusions and withdrawals; never replace an unfavorable completed pilot in cohort metrics.

The 40% rule is a portfolio safeguard, not statistical representativeness. External-validity claims must state the achieved cohort composition and limitations.

### 4. Legal and Data-Handling Prerequisites

All applicable rows require accountable approval before evidence access.

| Gate | Required record | Blocking condition |
|---|---|---|
| Authority and contract | Participation/data-use agreement; signatory authority | No executed authority or criteria independence |
| Data roles and lawful basis | Controller/processor role analysis and jurisdiction-specific basis | Data role or lawful basis unresolved |
| Purpose limitation | Enumerated assessment uses and prohibited secondary uses | Open-ended model training, benchmarking, or marketing use |
| Data inventory/minimization | Field-level inventory, sensitivity, provenance, subject classes | Unnecessary direct identifiers or unrestricted production export |
| Confidentiality/IP | Ownership, permitted copies, trade-secret handling | AIES publication rights conflict with participant rights |
| Security | Approved transfer channel, encryption, MFA, least privilege, access logging | Shared accounts, unmanaged storage, or missing incident route |
| Residency/transfers | Storage/processing locations and transfer mechanism | Unapproved cross-border transfer |
| Retention/deletion | Per-artifact retention, legal hold, verified deletion | Indefinite retention or unverifiable deletion |
| Data-subject/regulatory duties | Rights handling, notice/consent where required, regulator restrictions | Pilot would impair rights or violate restriction |
| Subprocessors/tools | Approved tool list, terms, telemetry settings, no-training controls | Evidence may enter unapproved AI or SaaS service |
| Publication | De-identification method, re-identification review, approval workflow | Participant or legal approval absent |
| Incident and withdrawal | Notification clock, containment, return/deletion, surviving records | No safe exit or incident process |

Default handling is remote review in the participant-controlled environment. Export only the minimum evidence needed for reproducibility. Direct identifiers, secrets, raw prompts containing personal data, customer content, and production credentials are prohibited unless an approved test explicitly requires them and legal/security owners document compensating controls.

### 5. Intake Record

Record:

- candidate ID, intake window, date, source, and decision owner;
- organization type, sector, jurisdictions, and requested anonymity;
- system boundary, AIES profiles, autonomy, impact, lifecycle stage, and production period;
- model/provider, retrieval, tools, agents, data classes, deployment model, and suppliers;
- incidents, material changes, known exceptions, and regulator constraints;
- evidence sources, export constraints, participant personnel, assessor skill needs;
- rubric scores, portfolio-gap rationale, conflicts, decision, and dated approvals.

### 6. Termination

Terminate or pause on withdrawn authority, unresolved conflict, unsafe evidence handling, active incident interference, criterion tampering, evidence fabrication, or inability to protect data subjects. Preserve only legally required audit records and execute the disposition plan.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Portfolio-gap selection | Tests diverse applicability | Cohort is not a probability sample |
| Participant-controlled review | Minimizes data transfer | Reperformance can be slower |
| Pre-registered tie break | Prevents discretionary favoritism | Cannot optimize scheduling after the draw |
| Transparent attrition | Exposes selection effects | May make program outcomes look less favorable |

## Anti-patterns

- Selecting recognizable brands for credibility rather than learning value.
- Excluding a candidate because nonconformance is expected.
- Sending production evidence through personal email or consumer AI tools.
- Treating pseudonymized data as anonymous without re-identification analysis.
- Publishing a named case study from a general participation clause.

## Enterprise Considerations

Procurement must assess assessor and tool subprocessors, sanctions/export restrictions, insurance, indemnity, breach obligations, and audit rights. Sector rules may prohibit evidence removal or require supervised access. The stricter applicable requirement governs; this protocol is not legal advice.

## Checklist

- [ ] Recruitment state and permitted claim are correct.
- [ ] Eligibility is evidenced before scoring.
- [ ] Scores, portfolio gaps, tie-break seed, and exclusions are retained.
- [ ] Selection is independent of expected outcome and commercial influence.
- [ ] Every applicable legal/data gate has dated accountable approval.
- [ ] Evidence access uses participant-controlled or approved systems.
- [ ] Withdrawal and incident handling are executable.
- [ ] Publication permission is separate and specific.

## Authoritative References

- NIST, [Privacy Framework 1.0](https://www.nist.gov/privacy-framework), 2020.
- NIST, [SP 800-53 Rev. 5](https://doi.org/10.6028/NIST.SP.800-53r5), 2020.
- UK ICO, [Anonymisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/).
- European Union, [Regulation (EU) 2016/679 (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), especially Articles 5, 6, 28, 32, 44–49.
- ISO, [ISO/IEC 27001:2022](https://www.iso.org/standard/27001).
- [AIES Evidence, Exceptions, and Conformance](../standard/03-evidence-exceptions-conformance.md).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established design-partner intake, system selection, and legal/data prerequisites. |
