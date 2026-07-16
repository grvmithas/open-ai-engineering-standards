# OAIES Standards Crosswalks

**Version:** 1.0.1  
**Date:** 2026-07-16  
**Status:** Informative

## Purpose

These crosswalks show where OAIES machine-readable artifacts can support evidence collection for external AI, security, software supply-chain, protocol, and observability standards. They give engineering and assurance teams one traceable implementation index without reproducing copyrighted standards.

## Why

Control mappings are useful only when they distinguish evidence reuse from control equivalence. OAIES records technical facts and decisions; external frameworks may additionally require an organization-wide management system, legal interpretation, independent assessment, stakeholder consultation, or outcomes that a JSON artifact cannot prove.

## Mapping method

Each mapping is based on the normative or authoritative source linked in the document and uses one relationship:

| Relationship | Meaning | Permitted conclusion |
|---|---|---|
| `evidence-supports` | The OAIES artifact may supply evidence relevant to part of the referenced requirement | An assessor may consider the evidence after scope, design, operation, and authenticity checks |
| `partial` | The artifact addresses only a limited evidence element | Additional controls, procedures, outcomes, and evidence are mandatory |
| `no-mapping` | OAIES does not address the requirement | Implement an external control |

The unit of mapping is an OAIES artifact and its required fields, not a claim that an entire external requirement is satisfied.

## OAIES control families

| Family | Scope | Primary contracts |
|---|---|---|
| `GOV` | Policy, accountability, applicability, exceptions | AI System Manifest, Control Catalog, Statement of Applicability, Exception |
| `RSK` | Risk and impact management | Risk Register, AI System Manifest |
| `SYS` | System inventory and lifecycle | AI System Manifest |
| `PRM` | Prompt lifecycle | Prompt Release |
| `MOD` | Model governance | Model Record |
| `TOL` | Tool behavior and authority | Tool Contract, MCP Server Record |
| `AGT` | Agent autonomy and coordination | Agent Definition |
| `CTX` | Context provenance and trust | Context Manifest |
| `EVAL` | Measurement and release gates | Evaluation Result |
| `SUP` | Software and AI supply chain | Model Record, Evidence Bundle |
| `OPS` | Runtime operation and telemetry | Incident, Evidence Bundle |
| `IR` | Incident response and improvement | Incident, Risk Register |
| `EVD` | Evidence integrity and retention | Evidence Bundle |

## Crosswalk index

| Document | External sources covered |
|---|---|
| [ISO AI management, risk, and impact](./iso-ai-management-risk-impact.md) | ISO/IEC 42001, ISO/IEC 23894, ISO/IEC 42005 |
| [NIST AI risk](./nist-ai-risk.md) | NIST AI RMF 1.0, NIST AI 600-1 |
| [OWASP AI security](./owasp-ai-security.md) | OWASP Top 10 for LLM Applications, OWASP Top 10 for Agentic Applications |
| [Secure software and supply chain](./secure-software-supply-chain.md) | NIST SSDF SP 800-218, NIST SP 800-53 Rev. 5, SLSA, OpenSSF |
| [Protocols and observability](./protocols-and-observability.md) | MCP authorization, A2A, OpenTelemetry GenAI semantic conventions |

## How to use

1. Freeze the exact external publication/version and OAIES schema version in the assessment scope.
2. Determine applicability using the external source, counsel, and the organization’s risk method.
3. Select mappings marked `evidence-supports` or `partial`; never infer control satisfaction from similar words.
4. Validate each referenced artifact, digest, time period, system boundary, and approval.
5. Record uncovered requirements in the Statement of Applicability and Risk Register.
6. Have a qualified assessor decide sufficiency against the licensed or authoritative source.

## Equivalence and certification limits

These crosswalks are not legal advice, an accreditation instrument, a conformity assessment, or a certification claim. OAIES is not certified, endorsed, or approved by ISO, IEC, NIST, OWASP, OpenSSF, the MCP project, the A2A project, or OpenTelemetry. A mapping does not establish one-to-one equivalence; it indicates potential evidence alignment only. Certification to ISO/IEC 42001 requires an auditable AI management system and, when certification is claimed, assessment by an appropriately accredited certification body.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Reuses engineering evidence across assurance programs | Requires version-specific assessor review |
| Makes evidence gaps explicit | Does not replace licensed standards text |
| Connects runtime artifacts to governance | Artifact validity cannot prove operational effectiveness |

## Anti-patterns

- **Control laundering:** treating an `evidence-supports` mapping as proof of control satisfaction.
- **Version drift:** mapping against a web page that changed after the assessment scope was frozen.
- **Citation without evidence:** naming a framework while omitting artifact URI, digest, period, and owner.
- **Self-certification language:** using “ISO certified,” “NIST compliant,” or equivalent without a valid basis.

## Enterprise considerations

The control owner must approve mappings, Legal must determine regulatory implications, and Internal Audit must preserve independence. Store licensed standards outside this repository under license controls. Evidence bundles must enforce retention, legal hold, tenant isolation, and access logging.

## Checklist

- [ ] Exact external source version and access date recorded
- [ ] System and organizational boundaries match the referenced evidence
- [ ] Relationship type and rationale reviewed by the control owner
- [ ] Partial and missing coverage has an accountable remediation record
- [ ] Evidence authenticity, period, and retention are verified
- [ ] No equivalence, endorsement, or certification claim is implied

## Changelog

### 1.0.1 — 2026-07-16

- Replaced broad relationship labels with conservative evidence-support mappings.

### 1.0.0 — 2026-07-16

- Added the initial OAIES crosswalk method, limits, and index.
