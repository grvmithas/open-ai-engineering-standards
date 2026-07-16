# Security Policy

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This policy defines supported versions and the private process for reporting vulnerabilities in OAIES code, workflows, and published guidance.

## Why

Public disclosure before a fix is available can expose downstream forks. A bounded private process gives maintainers time to validate, remediate, and coordinate disclosure without hiding risk indefinitely.

## How

### Supported versions

| Version | Security support |
|---|---|
| Latest `main` and current release | Supported |
| Older releases and forks | Unsupported; upgrade or backport independently |

### Report a vulnerability

Use GitHub Private Vulnerability Reporting on the repository Security tab. If that feature is unavailable, email `grvmithas@gmail.com` with subject `OAIES SECURITY`. Do not open a public issue.

Include the affected path and revision, prerequisites, reproduction steps, impact, and a proposed mitigation if known. Remove secrets and personal data from evidence.

### Response targets

| Milestone | Target |
|---|---|
| Acknowledgement | 3 business days |
| Triage and severity decision | 7 business days |
| Remediation plan | 14 business days |
| Coordinated disclosure | After a fix, or within 90 days unless active exploitation requires earlier notice |

Maintainers use CVSS as input, then adjust priority for exploitability, affected consumers, and AI-specific consequences such as prompt injection or unsafe tool execution.

## Tradeoffs

- Coordinated disclosure temporarily limits transparency.
- Supporting only the current release reduces backport cost but requires consumers to upgrade.
- Response targets are service objectives, not guarantees for volunteer maintainers.

## Anti-patterns

- **Public proof-of-concept first:** exposes consumers before triage.
- **Secrets in reports:** creates a second incident.
- **Security by prompt instruction:** prompts are not authorization or sanitization controls.
- **Silent dependency suppression:** accepted vulnerabilities require a documented owner, expiry, and compensating control.

## Enterprise considerations

Enterprise adopters must run their own software composition analysis, pin reviewed revisions, protect deployment credentials, and assess content recommendations against their threat model. Repository guidance does not replace a product security review.

## Checklist

- [ ] Report uses a private channel.
- [ ] Reproduction identifies an exact revision.
- [ ] Severity and affected versions are recorded.
- [ ] Fix includes regression verification.
- [ ] Disclosure credits the reporter unless anonymity is requested.
- [ ] Temporary exceptions have an owner and expiry.

## Changelog

### 1.0.0 — 2026-07-16

- Established support, reporting, response, and disclosure policy.
