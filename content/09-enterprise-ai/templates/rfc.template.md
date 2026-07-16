# Request for Comments Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Obtain time-bounded, evidence-based review of a material technical proposal.

## Why
An RFC creates a time-bounded technical decision process rather than an indefinite discussion.

## How
1. Frame one decision, deadline, scope, and delegated authority.
2. Publish the proposal, architecture/data-flow diagram, alternatives, and open risks.
3. Collect attributable comments during the review window and resolve each.
4. Record the final decision, dissent, conditions, implementation, and re-review trigger.

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
- Keeping an RFC permanently open.
- Resolving objections in private without updating the record.
- Treating comment count as approval quality.

## Enterprise considerations
- Restrict security-sensitive appendices while keeping decision rationale discoverable.
- Legal/privacy/procurement comments bind only within their delegated authority.
- Material architecture changes update or supersede the RFC.

## Checklist
- [ ] Decision and deadline are singular.
- [ ] Alternatives use the same drivers.
- [ ] All blocking comments have dispositions.
- [ ] Final authority and follow-up conditions are recorded.

## References
- IETF, [RFC 2026 — The Internet Standards Process](https://www.rfc-editor.org/rfc/rfc2026) (accessed 2026-07-16), used as process inspiration rather than a claim that internal RFCs are IETF standards.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RFC record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
