# OAIES Conformance CLI

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

The conformance CLI turns an OAIES control manifest and immutable evidence inventory into a deterministic, machine-readable assessment. It makes applicability and missing assurance explicit instead of treating absent evidence as success.

## Why

Assurance claims must be reproducible without a vendor service or paid model. This implementation uses Node.js standard-library APIs, fixes the assessment clock to `--as-of` or `evidence.generatedAt`, sorts every reported identifier, and exposes JSON Schemas for interchange.

## How

Run an assessment:

```bash
node tools/conformance/cli.mjs assess \
  --manifest tools/conformance/fixtures/manifest.valid.json \
  --evidence tools/conformance/fixtures/evidence.valid.json \
  --format json
```

Run the conformance tests:

```bash
node --test tools/conformance/test/*.test.mjs
```

The evaluator applies this precedence to each control:

1. A false applicability expression produces `not_applicable`.
2. An active, approved, unexpired exception produces `exception`.
3. Any applicable requirement with valid failing evidence produces `fail`.
4. Any applicable requirement without valid evidence produces `not_assessed`.
5. Every applicable requirement passing produces `pass`.

Evidence is valid only when its type is accepted by the requirement, `observedAt` is not in the future, and `validUntil` has not passed. Orphan artifacts are diagnostics and never satisfy a control. A report passes only when no control is `fail` or `not_assessed`.

## Schemas

| Contract | Version | Location |
|---|---:|---|
| Conformance manifest | 1.0.0 | `schemas/manifest.schema.json` |
| Evidence inventory | 1.0.0 | `schemas/evidence.schema.json` |
| Assessment report | 1.0.0 | Emitted by `cli.mjs`; status vocabulary is fixed in `lib.mjs` |

The runtime validator intentionally rejects unknown properties. Update both the JSON Schema and runtime validator in the same change when evolving a contract.

## Tradeoffs

- The dependency-free validator implements the committed schema vocabulary rather than every JSON Schema keyword.
- Exceptions make a report pass but remain visible as a distinct status; consumers that prohibit exceptions must add a stricter downstream gate.
- Digest syntax is validated, but artifact bytes are not fetched. Evidence collection must verify bytes before inventory generation.

## Anti-patterns

- Do not use wall-clock time implicitly; the same evidence must produce the same report later.
- Do not convert missing evidence to `fail`; `not_assessed` preserves the distinction between a failed control and an unmeasured control.
- Do not let exceptions suppress applicability. Non-applicable controls need no risk acceptance.
- Do not accept free-form status strings or silently ignore unknown fields; both make aggregation unreliable.

## Enterprise considerations

- Sign manifests, reports, and evidence inventories in the delivery pipeline; this CLI validates content, not signer identity.
- Resolve artifact URIs through an access-controlled evidence store and verify each SHA-256 digest before attestation.
- Restrict `approvedBy` to governed risk-owner identities and enforce organization-specific exception duration outside this portable contract.
- Retain the manifest, evidence, CLI version, report, and invocation parameters as one audit record.

## Checklist

- [ ] Manifest and evidence use `schemaVersion: 1.0.0`.
- [ ] Assessment identifiers match.
- [ ] Every applicable requirement declares accepted evidence types.
- [ ] `--as-of` is pinned for release gates.
- [ ] No `fail` or `not_assessed` control remains.
- [ ] Exceptions have owner approval and a future expiration.
- [ ] Orphan evidence is investigated.
- [ ] Test and negative-fixture suites pass.

## Changelog

### 1.0.0 — 2026-07-16

- Added deterministic applicability, evidence validation, exception handling, and five-state reporting.
- Added versioned interchange schemas, fixtures, negative cases, and dependency-free tests.
