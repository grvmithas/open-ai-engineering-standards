# Architecture Pattern — Enterprise Notes

> **Pattern:** Architecture  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Audit trail

Store accepted ADRs in version control with immutable IDs. Link from change tickets and implementation plans. Record SSO identity of High-risk approvers.

## Separation of duties

| Risk | Author may draft | Who accepts |
|------|------------------|-------------|
| Low | Yes | Peer |
| Medium | Yes | Independent eng reviewer |
| High | Yes | Independent architect + security/privacy as needed |

## Mapping to boards

Where CAB / architecture review boards already exist, the ADR is the input packet — not a replacement for those boards.

## Anti-claim

An accepted ADR is **not** a security certification, legal opinion, or proof of regulatory compliance. It is an internal engineering decision record with oversight evidence.
