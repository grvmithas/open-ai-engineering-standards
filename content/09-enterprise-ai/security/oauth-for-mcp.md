# OAuth 2.1 for MCP Servers

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Secure MCP access with standards-based delegated authorization and resource-bound tokens.

## Why
MCP tools can expose high-impact enterprise capabilities.

## When
Use for remote MCP servers and user-delegated tools.

## How
1. Use authorization code with PKCE; do not use implicit flow.
2. Validate issuer, audience, signature, expiry, nonce/state, and redirect URI.
3. Publish RFC 9728 protected-resource metadata, discover authorization servers from that metadata, and use RFC 8707 Resource Indicators for the target MCP server.
4. Use short-lived tokens, refresh rotation, and secure storage.
5. Bind authorization at each tool invocation and log consent.

## Evidence contract
The decision record is the **MCP authorization conformance report**. It records resource metadata; issuer; client registration; PKCE; state; resource indicator; audience; scopes; token storage; revocation. The MCP service owner owns completeness; the evidence is invalid when authorization server, MCP endpoint, or client registration method changes. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** issuer/audience mismatch or token disclosure is detected.

**Immediate response:** reject tokens, revoke sessions, rotate client material, and disable the MCP route. Preserve the MCP authorization conformance report, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to oauth 2.1 for mcp servers.

## Decision authority
The **MCP service owner** accepts the operational decision. The **identity security architect** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Delegated OAuth | User-scoped access | Integration complexity |

## Anti-patterns
- Accepting bearer tokens for the wrong audience.
- Putting access tokens in model context.

## Enterprise considerations
- Follow current OAuth Security BCP and MCP authorization specification.
- Require administrative consent where policy demands.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for OAuth 2.1 for MCP Servers | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM06 and credential disclosure | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] PKCE enforced.
- [ ] Audience validated.
- [ ] Tokens never enter prompts.

## References
- OWASP, [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-07-16).
- NIST, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the MCP authorization conformance report, failure trigger, accountable decision, and scoped framework relationships for oauth 2.1 for mcp servers. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
