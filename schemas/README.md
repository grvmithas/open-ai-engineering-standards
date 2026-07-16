# OAIES Machine-Readable Contracts

**Version:** 1.0.0  
**Date:** 2026-07-16

## Purpose

These JSON Schemas define the normative interchange contracts for OAIES governance, engineering, assurance, and operations records. Producers MUST validate artifacts against the exact schema version named by `schemaVersion` before exchange or archival.

## Why

Human-readable policies do not provide deterministic field presence, controlled vocabularies, or compatibility checks. Draft 2020-12 schemas make those controls testable without claiming that a syntactically valid artifact is operationally effective or compliant.

## How

1. Select the contract whose filename matches the artifact type.
2. Set `schemaVersion` to the schema major version, currently `1.0.0`.
3. Use stable, organization-scoped identifiers and UTC RFC 3339 timestamps.
4. Validate with a Draft 2020-12 implementation.
5. Run `node schemas/validate-schemas.mjs` before review.
6. Run `node schemas/validate-instances.mjs` to compile every schema and test its valid/invalid fixture pair with Ajv Draft 2020-12.
7. Store the schema `$id`, artifact digest, approver, and evidence references with each release.

`validate-instances.mjs` pins `ajv-cli@5.0.0` and obtains it through `npx --yes`; it does not modify `package.json` or install a repository dependency. Environments that prohibit network access MUST mirror that exact package in their approved npm registry or pre-populate the npm cache. The structural validator uses only the Node.js standard library but is not a substitute for Draft 2020-12 instance validation.

Fixtures are aggregated in `fixtures/valid.v1.json` and `fixtures/invalid.v1.json`, keyed by schema filename. Every contract has one accepted and one rejected instance.

| Contract | File | Primary system of record |
|---|---|---|
| AI system inventory | `ai-system-manifest.v1.schema.json` | AI inventory |
| Governance controls | `control-catalog.v1.schema.json` | Control library |
| Control applicability | `statement-of-applicability.v1.schema.json` | GRC system |
| Prompt release | `prompt-release.v1.schema.json` | Prompt registry |
| Model record | `model-record.v1.schema.json` | Model registry |
| Tool contract | `tool-contract.v1.schema.json` | Tool registry |
| MCP server record | `mcp-server-record.v1.schema.json` | Integration registry |
| Agent definition | `agent-definition.v1.schema.json` | Agent registry |
| Context manifest | `context-manifest.v1.schema.json` | Context registry |
| Evaluation result | `evaluation-result.v1.schema.json` | Evaluation store |
| Risk register | `risk-register.v1.schema.json` | Risk system |
| Exception | `exception.v1.schema.json` | GRC exception register |
| Incident | `incident.v1.schema.json` | Incident system |
| Evidence bundle | `evidence-bundle.v1.schema.json` | Evidence repository |

## Versioning

Filenames and `$id` values carry the major version. Additive optional fields require a minor release; new required fields, changed semantics, removed values, or narrowed constraints require a new major-version file. Published schemas are immutable.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Deterministic validation and automation | Producers must migrate when major versions change |
| Strict unknown-field rejection | Extensions require explicit schema evolution |
| Portable records across tools | Domain-specific systems may need adapters |

## Anti-patterns

- **Treating schema validity as control effectiveness:** validation proves structure, not that evidence is authentic or a control works.
- **Editing a published version in place:** this makes archived artifacts non-reproducible.
- **Embedding secrets or regulated payloads:** records should contain classified references and digests, not credentials or unnecessary sensitive content.
- **Using free text where an enum exists:** this defeats policy gates and reporting.

## Enterprise considerations

Protect artifacts according to their `dataClassification`; apply immutable retention, access logging, tenant isolation, and cryptographic integrity where required. Schema consumers must reject unknown major versions and must not silently drop unknown fields.

## Checklist

- [ ] Artifact validates against the declared schema and major version
- [ ] Unknown properties are rejected
- [ ] Referenced evidence is immutable, access-controlled, and digest-addressed
- [ ] Identifiers are stable across systems of record
- [ ] UTC timestamps and accountable owners are present
- [ ] No secret or unnecessary personal data is embedded

## Changelog

### 1.0.0 — 2026-07-16

- Added the initial Draft 2020-12 OAIES contract set and dependency-free structural validator.
