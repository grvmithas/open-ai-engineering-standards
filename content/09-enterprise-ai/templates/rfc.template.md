# Request for Comments Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Obtain time-bounded, evidence-based review of a material technical proposal.

## Why
An RFC creates a time-bounded technical decision process rather than an indefinite discussion.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete decision requested, constraints, diagram, alternatives, security/privacy/operations, comments, resolutions.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

## Decision authority
The RFC owner resolves comments; unresolved blocking objections are escalated to the named decision authority.

## Summary and decision requested
{{SUMMARY_DECISION_DEADLINE_OWNER}}

## Context, constraints, and evidence
{{CONTEXT_CONSTRAINTS_EVIDENCE}}

## Proposed design
```mermaid
flowchart LR
  A["SOURCE SYSTEM"] --> B["PROPOSED COMPONENT"] --> C["TARGET OUTCOME"]
```

## Alternatives and tradeoffs
| Alternative | Why not selected | Revisit trigger |
|---|---|---|
| {{ALTERNATIVE}} | {{RATIONALE}} | {{TRIGGER}} |

## Security, privacy, operations, migration, and rollback
{{CONTROL_AND_EXECUTION_PLAN}}

## Comments and resolution
{{COMMENT_OWNER_RESOLUTION}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete RFC record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed RFC.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] Decision requested, constraints, diagram, alternatives, security/privacy/operations, comments, resolutions are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RFC record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
