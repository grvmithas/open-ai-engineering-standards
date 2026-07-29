# AIES External Validation Pilot Runbook

> **Version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Executable runbook; synthetic fixtures only; external pilots pending

## Purpose

Execute one lawful, blind, reproducible AIES external-validation pilot from authorization through closeout.

## Why

A written methodology fails operationally when ownership, stop conditions, handoffs, commands, and evidence records are implicit. This runbook makes every gate observable and prevents a synthetic dry run from being represented as external validation.

## When

Use for each selected real system after design-partner eligibility. Use the fixtures only to verify tooling and train personnel; fixture results are not pilot evidence.

## How

### Roles and Communications

| Role | Channel and duty |
|---|---|
| Program owner | Gate decisions, schedule, participant escalation |
| Participant owner | Authority, system access, factual coordination |
| Legal/privacy/security owners | Pre-access approvals, incident and publication decisions |
| Methodology custodian | Freeze package, sampling, blind aliases, metric execution |
| Assessors A/B | Separate workspaces; questions only through coordinator |
| Adjudication chair | Panel independence and disposition record |
| Quality reviewer | Reperformance and package completeness |
| Release authority | Final claim decision |

Use one participant-approved case-management channel for administrative messages and separate assessor workspaces. The coordinator republishes substantive clarifications to both assessors simultaneously.

### Phase 0 — Authorize

Entry: candidate selected under the [design-partner protocol](../content/validation/design-partner-program.md).

1. Assign pilot ID and roles.
2. Complete contract, lawful-basis, data inventory, tool/subprocessor, transfer, security, retention, incident, withdrawal, and publication records.
3. Confirm the participant can receive findings safely and that no active event makes the pilot harmful.
4. Record `GO` only when all applicable pre-access gates pass.

Stop: no evidence access if authority, lawful handling, assessor feasibility, or safe withdrawal is unresolved.

Exit evidence: approved gate checklist, signed agreements/register references, role roster, communication plan.

### Phase 1 — Freeze

Entry: Phase 0 `GO`.

1. Pin AIES and protocol versions.
2. Record system boundary, profiles, impact/autonomy, period, legal overlays, and authoritative evidence sources.
3. Export and hash the sampling frame; select certainty units and strata.
4. Publish the sampling seed after frame lock; execute deterministic selection.
5. Freeze rubric, rating vocabulary, critical-disagreement rule, thresholds, clarification procedure, and output schema.
6. Build the evidence manifest and grant equivalent least-privilege access.
7. Hash/sign the pilot-package manifest.

Stop: restart Phase 1 under a new package version if scope, evidence, rubric, or frame changes materially.

Exit evidence: signed package manifest, frame hash, selection output, seed timestamp, access matrix.

### Phase 2 — Qualify and Assign

1. Verify competence, recency, calibration, and collective domain coverage.
2. Obtain conflict declarations; exclude prohibited relationships.
3. Randomly assign aliases A/B.
4. Provide protocol training that does not use measured items.
5. Test separate workspace access and logging.

Stop: no assessment if either assessor fails qualification, calibration, or independence.

Exit evidence: qualification decisions, calibration records, declarations, assignment record.

### Phase 3 — Blind Assess

1. Start both access windows at the recorded time.
2. Assessors evaluate the identical sample independently.
3. Coordinator logs questions and sends shared bulletins.
4. Assessors emit UTF-8 CSV with header:

```csv
item_id,control_id,rating,confidence,evidence_refs,rationale,stratum
```

Allowed ratings are `CONFORMANT`, `MINOR`, `MAJOR`, `NOT_APPLICABLE`, and `INSUFFICIENT_EVIDENCE`. `confidence` is `LOW`, `MEDIUM`, or `HIGH`; it is diagnostic and does not weight agreement.

5. Validate unique `(item_id, control_id)` keys and allowed ratings.
6. Assessors sign and lock outputs; custodian records SHA-256 and timestamps.

Stop and invalidate the primary run on conclusion leakage, unequal evidence, post-hoc rubric change, or output alteration. Administrative metadata leakage is documented and evaluated.

Exit evidence: two locked outputs, signatures/hashes, access/clarification logs, deviations.

### Phase 4 — Analyze

Copy locked CSV files into an approved analysis workspace. Run:

```bash
node pilots/tools/agreement.mjs \
  --a pilots/fixtures/assessor-a.csv \
  --b pilots/fixtures/assessor-b.csv \
  --out pilots/fixtures/actual-report.json \
  --seed oaies-synthetic-v1 \
  --replicates 10000
```

For a real pilot, replace all fixture paths and seed with package-controlled paths/values. Never mix fixture and real outputs.

Verify software behavior:

```bash
node --test pilots/tests/agreement.test.mjs
```

The custodian records runtime version, command, input hashes, calculator hash/version, seed, replicate count, stdout/stderr, and output hash. A second operator reproduces the report in a clean workspace.

Stop: do not manually edit the JSON report. Fix software/input defects through a versioned rerun that retains prior artifacts.

Exit evidence: primary report, reproduction record, software/input/output hashes.

### Phase 5 — Adjudicate and Learn

1. Lock the primary metric report.
2. Create the disagreement register.
3. Collect independent assessor rationales.
4. Convene the independent panel and classify causes.
5. Preserve originals; issue separate adjudication dispositions and optional corrected-secondary metric.
6. Open one specification issue per distinct ambiguity/root cause, with acceptance test and version impact.
7. Track participant corrective actions separately from AIES specification defects.

Stop: no forced consensus and no change to primary results.

Exit evidence: register, panel record, dispositions, specification issues, corrective actions.

### Phase 6 — Quality and Release

1. Assemble the required [evidence package](../content/validation/evidence-and-release-gates.md).
2. Independent reviewer reperforms the analysis and tests gates G0–G9.
3. Participant performs factual review; factual review cannot negotiate criteria or ratings.
4. Complete re-identification review and final publication approvals.
5. Release authority signs `ACCEPT`, `CONDITIONAL_ACCEPT`, `REJECT_REMEDIATE`, or `REJECT_TERMINATE`.
6. Publish only after `ACCEPT`, using the approved case-study artifact and bounded claim.

Exit evidence: quality review, signed gate matrix, decision, approved publication or rejection record.

### Phase 7 — Close

1. Revoke access and rotate any temporary credentials.
2. Return/delete evidence according to schedule; preserve legal holds and minimum audit index.
3. Obtain deletion attestations where applicable.
4. Record open actions, claim expiry, and revalidation triggers.
5. Conduct a process retrospective that cannot rewrite pilot outputs.

Exit evidence: access revocation, disposition records, closeout decision, surveillance/revalidation schedule.

## Synthetic Fixture

| Artifact | Purpose | Explicit limitation |
|---|---|---|
| [`fixtures/assessor-a.csv`](./fixtures/assessor-a.csv) | Deterministic input A | Fictitious controls/items and ratings |
| [`fixtures/assessor-b.csv`](./fixtures/assessor-b.csv) | Deterministic input B | Fictitious controls/items and ratings |
| [`fixtures/expected-report.json`](./fixtures/expected-report.json) | Regression oracle | Tests calculator output only |
| [`tools/agreement.mjs`](./tools/agreement.mjs) | Dependency-free calculator | Does not qualify sampling or assessors |
| [`tests/agreement.test.mjs`](./tests/agreement.test.mjs) | Automated regression and error tests | Does not establish external validity |

Fixture IDs use `SYNTH-*`; they do not identify organizations, systems, people, incidents, or production evidence.

## Failure Recovery

| Failure | Recovery |
|---|---|
| Legal approval expires | Suspend access; reapprove before continuation |
| Evidence set changes | Freeze a new package version; provide identically |
| Assessor withdraws before lock | Replace and restart both assessments |
| Assessor withdraws after lock | Preserve output; quality reviewer decides analyzability and limitation |
| Leakage before both locks | Invalidate and restart with new assessors/items where feasible |
| Calculator defect | Preserve report; fix/version/test; rerun and disclose impact |
| Privacy/security incident | Stop, contain, notify under approved plan; release authority decides termination |
| Threshold fails | Open issues and run a new future cohort; do not lower threshold |

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Hard phase exits | Clear auditability | Less scheduling flexibility |
| Clean-room reproduction | Detects environment/manual errors | Requires a second operator |
| Restart after leakage | Protects measurement validity | Expensive duplicate work |

## Anti-patterns

- Beginning evidence review while contracts are “in progress.”
- Using the synthetic expected report as a claimed benchmark.
- Substituting another assessor after seeing one locked output without restarting the pair.
- Sending assessor questions directly to participant engineers.
- Publishing before signed release and participant approval.

## Enterprise Considerations

Integrate the runbook with enterprise GRC, identity, records, incident, legal-hold, vulnerability, and change-management systems. References may be opaque IDs rather than copied sensitive records. Apply local regulator, works council, union, export-control, and sector requirements before this runbook.

## Checklist

- [ ] Phase 0 authority and data gates passed before access.
- [ ] Package, frame, seed, rubric, and thresholds froze before review.
- [ ] Qualified independent assessors used isolated workspaces.
- [ ] Both outputs locked before analysis.
- [ ] Report reproduced from hashed inputs.
- [ ] Adjudication preserved primary outputs.
- [ ] Quality and release gates completed independently.
- [ ] Publication is bounded, approved, and time-limited.
- [ ] Access and data were dispositioned at closeout.

## Authoritative References

- [AIES External Validation Program](../content/validation/README.md).
- [AIES Blind Inter-Assessor Methodology](../content/validation/inter-assessor-methodology.md).
- [AIES Lifecycle and Assessor Methodology](../content/standard/04-lifecycle-and-assessment.md).
- ISO, [ISO 19011:2018](https://www.iso.org/standard/70017.html).
- NIST, [SP 800-53A Rev. 5](https://doi.org/10.6028/NIST.SP.800-53Ar5).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established phase-gated execution, stop conditions, tooling, recovery, and closeout. |
