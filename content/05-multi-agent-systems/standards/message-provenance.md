# Message Provenance and Non-Repudiation

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Make agent messages attributable, integrity-protected, replay-resistant, and auditable.

## Why

Transport encryption does not prove which workload created a stored message. Operational non-repudiation requires signed content plus protected keys and tamper-evident retention; signatures alone cannot establish truth.

## How

Use a canonical, versioned envelope:

```json
{
  "schema": "oaies.agent-message.v1",
  "message_id": "uuid",
  "task_id": "uuid",
  "parent_id": "uuid-or-null",
  "sender": "spiffe://example/agent/planner",
  "recipient": "spiffe://example/agent/reviewer",
  "issued_at": "RFC3339",
  "expires_at": "RFC3339",
  "nonce": "base64url",
  "delegation_hash": "sha256:...",
  "content_digest": "sha256:...",
  "policy_version": "2026-07-16"
}
```

1. Canonicalize and hash the body and artifact manifest; sign protected routing fields and digest using an approved algorithm and key ID.
2. Verify identity, audience, signature, time window, nonce, schema, delegation chain, and content digest before processing.
3. Persist accepted/rejected verification outcomes in an append-only, hash-chained log with trusted timestamps.
4. Keep original bytes and transformation records; derived summaries never replace source evidence.
5. Define key rotation, compromise, algorithm migration, and evidentiary export procedures.

## Tradeoffs

Signing and immutable retention add storage, key-management, and privacy obligations. Redact before signing or preserve authorized encrypted originals; post-signature editing invalidates evidence.

## Anti-patterns

- Signing only the body while leaving sender, recipient, task, or expiry mutable.
- Calling a database audit row “non-repudiation” without protected signing keys and tamper evidence.
- Assuming a valid signature means content is correct or authorized.

## Enterprise Considerations

Align retention and legal admissibility with counsel. Restrict audit access, encrypt sensitive payloads, and preserve verification software, trust roots, and policy versions for the retention period.

## Checklist

- [ ] Canonical envelope and artifact digests are versioned.
- [ ] Signatures cover routing, time, delegation, and content.
- [ ] Replay and clock-skew tests pass.
- [ ] Audit records are append-only and tamper-evident.
- [ ] Key compromise and evidentiary export drills pass.

## References

- [RFC 9421, HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html)
- [RFC 8785, JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785.html)
- [NIST SP 800-57 Part 1 Rev. 5](https://doi.org/10.6028/NIST.SP.800-57pt1r5)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
