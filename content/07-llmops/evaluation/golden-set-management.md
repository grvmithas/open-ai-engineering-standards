# Golden Set Management

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Build representative, versioned evaluation datasets that support release decisions.

## Why
A stale or contaminated test set turns evaluation into false confidence.

## When
Use before the first release and continuously after incidents and sampled production review.

## How
1. Define task taxonomy, risk strata, languages, edge cases, abuse cases, and prohibited outcomes.
2. Source examples with provenance and lawful-use metadata; remove secrets and direct identifiers.
3. Create independent author, reviewer, and approver roles; adjudicate disagreements.
4. Split development and locked holdout sets; detect benchmark contamination.
5. Version changes, record label rationale, and add every confirmed production failure before closing its incident.

## Case schema
```yaml
case:
  id: refund-policy/en-US/edge/0042
  schema_version: 2
  task: grounded-answer
  risk_tier: medium
  locale: en-US
  source:
    type: adjudicated-production-failure
    record_id: restricted-reference
    collected_at: 2026-07-10
    lawful_use_record: PRIV-218
  input_ref: encrypted-object-version
  context_refs:
    - document_id: returns-policy
      version: sha256:...
      required_spans: ["section-3.2"]
  expected:
    claims:
      - text: "Returns are accepted within 30 days."
        support: "returns-policy#section-3.2"
    prohibited: ["invented exception", "unapproved account action"]
    acceptable_abstention: false
  slices: [policy-exception, long-context]
  severity_if_failed: high
  labels:
    authors: [qualified-role-a, qualified-role-b]
    adjudicator: qualified-domain-role
    rationale_ref: annotation-record
  split: locked-holdout
  content_hash: sha256:...
```

Store restricted payload separately from the manifest. Repository-visible records contain references, hashes, classification, and label lineage, not personal or confidential production content.

## Sampling and maintenance
- Allocate minimum cases by task × risk × locale × failure mode before random sampling; otherwise majority traffic hides rare severe paths.
- Maintain development, release-regression, locked holdout, adversarial, and incident-sentinel partitions with separate access policy.
- Report coverage as represented cells over required taxonomy cells and cases per cell. A large total count does not close an empty high-risk slice.
- Add production failures through privacy review and adjudication; do not copy raw traces directly.
- Detect near-duplicate contamination using normalized exact hashes plus embedding or locality-sensitive search reviewed by a human.
- Rotate a portion of the holdout after confirmed exposure; preserve historical versions for reproducibility.

## Dataset release gate
Reject a dataset release when provenance or lawful-use metadata is missing, severe labels lack independent adjudication, required taxonomy cells are empty, payload/manifest hashes disagree, holdout readers exceed the approved group, or contamination exceeds the declared tolerance. Sign the accepted manifest and record the previous compatible evaluator baseline.

## Evidence contract
The decision record is the **dataset card and signed manifest**. It records case ID; source provenance; consent basis; risk slice; label; adjudication; split; content hash. The evaluation data steward owns completeness; the evidence is invalid when provenance is missing or holdout contamination is detected. Dataset, annotation, rubric, scorer, and run identifiers are content-addressed so a disputed result can be replayed.

## Failure response and recovery
**Trigger:** a case leaks, is mislabeled, or appears in optimization data.

**Immediate response:** quarantine the dataset version, revoke holdout access, and rebuild affected baselines. Preserve the dataset card and signed manifest, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to golden set management.

## Decision authority
The **evaluation data steward** accepts the operational decision. The **domain adjudication lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Evaluation automation enforces the approved statistical rule; the evaluation and domain owners decide ambiguity, severe-case disposition, and residual uncertainty.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Locked holdout | Strong regression signal | Slower iteration |
| Production-derived cases | High relevance | Privacy and sampling bias |

## Anti-patterns
- Training prompts against the holdout.
- Deleting difficult cases because scores fall.

## Enterprise considerations
- Apply retention and deletion requirements.
- Require domain experts for regulated labels.

## Framework relationship
For **Golden Set Management**, this informative profile governs measurement evidence for the stated decision only; it neither makes an evaluator authoritative nor transfers fitness decisions to a framework.

| Source | Relationship for Golden Set Management | Boundary |
|---|---|---|
| NIST AI RMF | MAP 3; MEASURE 2.5 | Interpret outcomes against the documented use case, sampling frame, and uncertainty. |
| ISO/IEC 42001 | 42001 clauses 7.5 and 8.4 | Use management-system evidence only within the organization’s declared scope and independent assessment process. |
| Domain threat/control source | Data poisoning and sensitive-information disclosure | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every item has provenance.
- [ ] Coverage gaps have owners.
- [ ] Contamination checks pass.
- [ ] Incident cases enter regression.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the dataset card and signed manifest, failure trigger, accountable decision, and scoped framework relationships for golden set management. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
