# Maintainer Policy

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This policy defines maintainer eligibility, responsibilities, access, inactivity, and removal.

## Why

Repository permissions create supply-chain and governance risk. Maintainer authority must be earned through sustained review quality, scoped to operational need, and removable when no longer active.

## How

### Current maintainers

| Maintainer | GitHub | Scope |
|---|---|---|
| Gaurav Mithas | `@grvmithas` | Project lead, releases, security, repository administration |

### Appointment

A candidate must demonstrate at least three months of sustained contribution, sound technical judgment, respectful review behavior, and familiarity with governance and security policy. Two active maintainers nominate and approve a candidate. While the project has one maintainer, the project lead may appoint a second maintainer through a public pull request.

### Responsibilities

- Review within declared scope and disclose conflicts.
- Enforce protected-branch checks; never bypass them for convenience.
- Use phishing-resistant multi-factor authentication.
- Apply least privilege to repository and deployment access.
- Participate in security response and release verification when assigned.
- Preserve contributor attribution and decision records.

### Inactivity and removal

A maintainer is inactive after 90 days without review, issue, release, or governance activity unless leave is recorded. Administrative access is removed after 180 days of inactivity. Removal for security risk or misconduct may be immediate under `SECURITY.md` or `CODE_OF_CONDUCT.md`.

Departing maintainers must transfer open responsibilities and revoke local credentials.

## Tradeoffs

- Activity thresholds can remove experienced but unavailable maintainers.
- Public appointments increase scrutiny but reduce opaque access grants.
- Two-person approval is unavailable during the single-maintainer bootstrap period.

## Anti-patterns

- **Permanent access by history:** prior contribution does not justify dormant privilege.
- **Shared accounts:** every action must be attributable.
- **Self-approval:** authors do not satisfy required independent review.
- **Honorary maintainers:** the role carries operational duties.

## Enterprise considerations

Repository administration, package publishing, DNS, and deployment must use separate least-privilege roles where platforms allow. Quarterly access reviews must reconcile this file with actual permissions.

## Checklist

- [ ] Maintainer roster matches platform access.
- [ ] MFA and recovery methods are current.
- [ ] Scope and conflicts are explicit.
- [ ] Inactivity is reviewed quarterly.
- [ ] Departures include credential revocation.
- [ ] No protected-branch bypass is undocumented.

## Changelog

### 1.0.0 — 2026-07-16

- Established roster, appointment, responsibility, inactivity, and removal policy.
