# OAIES Validation-to-Specification Issue Template

> **Template version:** 1.0.0  
> **Published:** 2026-07-16  
> **Status:** Controlled issue template

## Purpose

Convert an independently observed pilot disagreement or limitation into a traceable, testable OAIES specification decision.

## Why

Unstructured pilot feedback encourages anecdotal edits and retrospective score optimization. A source-linked issue with an acceptance test and version-impact analysis protects normative stability.

## How

Create one issue per distinct root cause after the primary agreement report locks. Do not include participant-identifying or restricted evidence in the public issue.

### Issue Control

| Field | Value |
|---|---|
| Issue ID/version | `{ISSUE_ID_VERSION}` |
| Status | `{TRIAGE_ACCEPTED_REJECTED_DEFERRED_IMPLEMENTED_VALIDATED_CLOSED}` |
| Source pilot/cohort | `{OPAQUE_IDS}` |
| Source disagreement/finding IDs | `{IDS}` |
| OAIES/control versions | `{VERSIONS_AND_CONTROL_IDS}` |
| Classification | `{SPEC_AMBIGUITY_EVIDENCE_AMBIGUITY_RUBRIC_GAP_SCOPE_ERROR_DATA_ERROR_ASSESSOR_ERROR_REASONABLE_JUDGMENT}` |
| Severity | `{CRITICAL_HIGH_MEDIUM_LOW}` |
| Owner/due date | `{OWNER_YYYY-MM-DD}` |
| Confidentiality | `{PUBLIC_REDACTED_RESTRICTED}` |

### Problem Statement

| Field | Required content |
|---|---|
| Observed ambiguity/failure | `{FACTUAL_DESCRIPTION_WITHOUT_REWRITING_ORIGINAL_RATINGS}` |
| Competing interpretations | `{INTERPRETATION_A_AND_B}` |
| De-identified evidence references | `{PACKAGE_ARTIFACT_IDS}` |
| Affected profiles/impacts | `{SCOPE}` |
| Safety/compliance/assurance effect | `{CONSEQUENCE}` |
| Frequency | `{COUNT_DENOMINATOR_COHORT_LIMITATION}` |

### Proposed Resolution

| Field | Value |
|---|---|
| Change class | `{NORMATIVE_GUIDANCE_TOOLING_TRAINING_NO_CHANGE}` |
| Proposed text/behavior | `{EXACT_CHANGE}` |
| Why this resolution | `{RATIONALE}` |
| Alternatives rejected | `{ALTERNATIVE_AND_REASON}` |
| Backward compatibility | `{PATCH_MINOR_MAJOR_AND_CLAIM_EFFECT}` |
| Migration/deprecation | `{REQUIRED_ACTION_OR_NONE}` |
| Cross-control/crosswalk impact | `{AFFECTED_IDS_DOCUMENTS}` |

### Acceptance and Validation

```gherkin
Feature: {SPECIFICATION_BEHAVIOR}
  Scenario: {INDEPENDENT_REGRESSION_CASE}
    Given {BOUNDARY_AND_EVIDENCE_CONDITIONS}
    When {QUALIFIED_ASSESSOR_APPLIES_CRITERIA}
    Then {ONE_OBSERVABLE_INTERPRETATION_OR_EXPLICIT_JUDGMENT_BOUNDARY}
```

| Gate | Evidence |
|---|---|
| Independent technical/editorial review | `{REVIEW_IDS}` |
| Legal/privacy/security review when affected | `{REVIEW_IDS_OR_NOT_APPLICABLE_REASON}` |
| Regression fixtures excluding measured pilot as sole confirmation | `{FIXTURE_IDS}` |
| Public review and dissent | `{COMMENTS_DECISIONS}` |
| Version/release approval | `{DECISION_ID}` |
| Future external-cohort validation | `{COHORT_ID_RESULT_OR_PENDING}` |

### Decision

`{ACCEPT_REJECT_DEFER}` because `{EVIDENCE_BASED_RATIONALE}`.

State explicitly whether external validation remains pending. Closing an editorial issue is not proof that real independent assessors now agree.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| One root cause per issue | Clear ownership and regression | More issue records |
| Exact proposed text | Reviewable semantic impact | Requires specification-author effort |
| Future-cohort validation | Tests generalization | Delays evidence of resolution |

## Anti-patterns

- Editing normative text directly from one disputed case.
- Marking an issue validated because internal authors agree.
- Hiding rejected interpretations or dissent.
- Using the measured item as the only regression test.
- Closing a normative issue without version and claim-impact analysis.

## Enterprise Considerations

Public issue trackers must not contain restricted workpapers, vulnerability details, personal data, or participant identity. Preserve a controlled trace from redacted issue to source evidence for authorized reviewers.

## Checklist

- [ ] Primary metrics locked before issue creation.
- [ ] Root cause and affected controls are explicit.
- [ ] Evidence references are de-identified but traceable.
- [ ] Proposed resolution and rejected alternatives are recorded.
- [ ] Acceptance test is observable.
- [ ] Version, migration, and active-claim effects are approved.
- [ ] Future external validation is complete or clearly pending.

## Authoritative References

- [OAIES Blind Inter-Assessor Methodology](../inter-assessor-methodology.md).
- [OAIES Lifecycle and Assessor Methodology](../../standard/04-lifecycle-and-assessment.md).
- [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Established traceable pilot-to-specification issue and validation fields. |
