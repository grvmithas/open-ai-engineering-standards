# OAIES Conformance CLI

**Version:** 2.0.0  
**Last updated:** 2026-07-16

## Purpose

The conformance CLI evaluates canonical OAIES system, catalog, SoA, evidence, and exception records against the normative controls in `content/standard`. It emits the exact OAIES claim status without converting an exception into an unqualified pass.

## Why

Conformance cannot be established from a locally invented manifest or an exception containing only an approver and expiry. The assessed records must use the repository’s versioned schemas, reconcile every normative control, carry admissible evidence, and prove that any exception is scoped, authorized, compensated, time-bound, and still valid.

## How

Run an assessment from the repository root:

```bash
node tools/conformance/cli.mjs assess \
  --manifest records/ai-system.json \
  --soa records/statement-of-applicability.json \
  --catalog records/control-catalog.json \
  --evidence records/evidence-bundle.json \
  --exception records/exception-DAT-010.json \
  --as-of 2026-07-16T00:00:00.000Z \
  --format json
```

Repeat `--exception` for each exception referenced by the SoA. `--schema-dir` defaults to `schemas`, and `--standard-dir` defaults to `content/standard`.

Run the complete offline assurance suite:

```bash
node --test \
  tools/conformance/test/conformance.test.mjs \
  reference/test/harness.test.mjs \
  eval/test/evaluation.test.mjs
```

### Canonical contracts

| Input | Canonical contract |
|---|---|
| AI system | `schemas/ai-system-manifest.v1.schema.json` |
| Statement of Applicability | `schemas/statement-of-applicability.v1.schema.json` |
| Control catalog | `schemas/control-catalog.v1.schema.json` |
| Evidence | `schemas/evidence-bundle.v1.schema.json` |
| Exception | `schemas/exception.v1.schema.json` |
| Normative control inventory | Control tables in `content/standard/01` through `04` |

The removed `tools/conformance/schemas` contracts are not supported. The CLI loads canonical schemas at runtime and uses a dependency-free Draft 2020-12 subset validator covering every keyword currently used by these five contracts. A release pipeline should additionally run an independently maintained full JSON Schema Draft 2020-12 validator before invoking semantic conformance. This prerequisite detects future schema keywords until the local validator explicitly supports them.

### Evaluation rules

The CLI rejects the input set when schema validation or catalog/SoA reconciliation fails. It then computes catalog applicability from workload, autonomy, and impact selectors and evaluates evidence and exceptions for each SoA decision.

Evidence must:

1. Resolve from each SoA reference to a canonical bundle item.
2. Map to the exact control, system, and assessed environment.
3. Supply every evidence class required by the canonical catalog.
4. Be collected no later than the assessment instant and remain within retention.
5. Cover the full assessment period for operation and outcome evidence.
6. Remain within the control’s review interval.

An exception qualifies only when all of these conditions hold:

1. Status is `approved` or `active`, and the assessment instant falls within its effective and expiry interval.
2. System reference, system version, SoA ID, control ID, and control version exactly match.
3. Every compensating control passed before the exception became effective and its evidence maps to the affected control.
4. Residual risk is within tolerance or explicitly authorized.
5. Required approvals are present and attributable to canonical approval evidence:
   - I0–I1: system owner and control owner.
   - I2: independent risk owner and business owner.
   - I3: accountable executive, legal/compliance, and independent risk owner.
6. Detection, creation, approval, effective date, expiry, remediation horizon, claim period, and maximum-duration policy are chronologically consistent.
7. The exception does not waive a legal obligation, prohibited AI practice, evidence falsification, unbounded A4 authority, or unaccepted imminent I3 harm.
8. No material system change occurred after approval.

### Output and exit behavior

Per-control output uses normative SoA dispositions:

| Disposition | Meaning |
|---|---|
| `applicable-conforming` | Applicable and supported by current admissible evidence |
| `applicable-exception` | Applicable gap covered by a currently valid exception |
| `applicable-nonconforming` | Applicable control failed, lacks evidence, or has an invalid exception |
| `not-applicable` | Canonical applicability is absent and the SoA records the exclusion |

| Exit | Claim status | Gate behavior |
|---:|---|---|
| 0 | `conformant` | Unqualified positive conclusion |
| 1 | `nonconformant` | Block the claim |
| 2 | No conclusion | Invalid invocation, schema, or reconciliation |
| 3 | `conformant_with_exceptions` | Qualified conclusion; a generic success gate must not treat this as exit 0 |

## Tradeoffs

- Dependency-free validation avoids package ownership conflicts but requires explicit updates when canonical schemas add unsupported JSON Schema keywords.
- Conservative evidence checks can reject records that need assessor judgment; the tool reports facts and does not replace qualified assessment.
- Exit code 3 prevents accidental unqualified success but requires CI to define whether qualified claims are acceptable.
- Text-based prohibited-condition detection provides a deterministic floor; enterprise legal and policy engines must enforce organization-specific prohibitions.

## Anti-patterns

- Do not copy canonical schemas into this tool.
- Do not mark an applicable control not applicable because implementation is incomplete.
- Do not treat an exception reference, approver name, or future expiry as sufficient risk acceptance.
- Do not let missing, stale, wrong-audience, or cherry-picked evidence support a positive conclusion.
- Do not collapse `conformant_with_exceptions` into `pass`.
- Do not renew an exception by editing dates; issue a newly assessed and approved record.

## Enterprise considerations

- Validate canonical schemas with a full Draft 2020-12 implementation and pin that validator in the owning build package.
- Verify evidence bytes against bundle digests and validate digital signatures through organization trust stores.
- Connect material-change detection to release, architecture, model registry, data governance, supplier, incident, and policy systems.
- Replace deterministic prohibited-text screening with approved legal, regulatory, contract, and risk-policy rules.
- Retain the canonical inputs, content/standard revision, schema digests, CLI revision, assessment clock, and report as one evidence package.

## Checklist

- [ ] All five canonical contracts pass full Draft 2020-12 validation.
- [ ] Catalog IDs exactly match the normative controls in `content/standard`.
- [ ] SoA decisions and reconciliation counts exactly match the catalog.
- [ ] Manifest, SoA, evidence, and exceptions identify the same system and version.
- [ ] Evidence classes, scope, period, retention, integrity metadata, and control mappings are valid.
- [ ] Compensating controls passed before exception approval.
- [ ] Risk-tier approvals are complete and attributable.
- [ ] Exception duration is bounded by policy, remediation, and claim period.
- [ ] Prohibited and material-change-invalidated exceptions are rejected.
- [ ] Exit code 3 is handled as a qualified outcome.
- [ ] Positive and negative offline tests pass.

## Changelog

### 2.0.0 — 2026-07-16

- Replaced divergent local contracts with canonical OAIES schemas and normative control reconciliation.
- Added full exception semantics, canonical evidence-class checks, qualified claim status, and distinct exit code 3.
- Added negative coverage for forgery, expiry, audience mismatch, failed compensation, approvals, I3, stale evidence, and incomplete reconciliation.

### 1.0.0 — 2026-07-16

- Added the initial deterministic applicability and evidence prototype.
