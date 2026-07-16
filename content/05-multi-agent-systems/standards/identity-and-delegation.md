# Agent Identity and Authenticated Delegation

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Bind every agent action to a verifiable workload identity and a constrained delegation chain.

## Why

Agent names in prompts are labels, not identities. Without cryptographic authentication and least-privilege delegation, a peer can impersonate a supervisor or amplify the caller's authority.

## How

1. Issue short-lived workload credentials from the platform identity provider; prohibit shared secrets and static agent API keys.
2. Bind each identity to code/config digest, environment, tenant, owner, and allowed tools.
3. Exchange the caller credential for an audience-restricted delegation token containing `iss`, `sub`, `aud`, `exp`, `jti`, task ID, permitted actions, resource scope, and parent delegation hash.
4. Re-authorize at every hop against the original user intent and current policy. Never infer authority from message text.
5. Reject token forwarding, audience mismatch, expired/replayed IDs, excessive delegation depth, or capabilities broader than the parent grant.
6. Revoke active sessions and rotate keys when an identity, prompt, tool, or runtime is compromised.

## Tradeoffs

Per-hop token exchange adds latency and identity infrastructure. It sharply limits confused-deputy and privilege-propagation blast radius.

## Anti-patterns

- Reusing the user's bearer token across workers.
- Treating an agent ID, role prompt, or mTLS connection alone as authorization.
- Allowing a delegate to create grants it does not possess.

## Enterprise Considerations

Use hardware-backed keys where risk warrants it, centralize policy decisions, record policy version and reason, and separate production identities from development. Human users remain accountable for approved high-impact delegation.

## Checklist

- [ ] Workload identity is cryptographically verified.
- [ ] Tokens are short-lived, audience-bound, replay-resistant, and task-scoped.
- [ ] Every hop attenuates or preserves—not expands—privilege.
- [ ] Delegation depth and emergency revocation are enforced.
- [ ] Authorization is tested independently of natural-language instructions.

## References

- [NIST SP 800-207, Zero Trust Architecture](https://doi.org/10.6028/NIST.SP.800-207)
- [RFC 8693, OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)
- [SPIFFE specification](https://spiffe.io/docs/latest/spiffe-about/overview/)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
