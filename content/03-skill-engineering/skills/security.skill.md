# Security Review Skill

> **Skill ID:** `security`
> **Version:** 1.0
> **Install:** `.claude/skills/security.skill.md`

---

## Trigger Conditions

Activate this skill when:
- Security review is explicitly requested
- A PR touches authentication, authorization, or data access
- New API endpoints are being added
- External data is being processed
- Cryptography, tokens, or secrets are involved
- User data (PII, financial, health) is being handled

---

## Purpose

Perform a comprehensive security review against OWASP Top 10 and AI-specific attack vectors. Produce a prioritized finding report with actionable remediation.

---

## Prerequisites

- [ ] Access to the code under review
- [ ] Understanding of the application's trust boundaries
- [ ] Knowledge of data sensitivity levels (public, internal, confidential, restricted)

---

## Procedure

### Step 1: Map the Attack Surface
Identify:
- All entry points (API endpoints, webhooks, file uploads, CLI inputs)
- All data stores (databases, caches, file systems, external APIs)
- All trust boundaries (public internet, internal network, third-party integrations)
- All privilege levels (anonymous, authenticated, admin, system)

### Step 2: OWASP Top 10 Audit

#### A01: Broken Access Control
- [ ] Authorization checked on every protected route/resource
- [ ] Horizontal privilege escalation tested (can user A access user B's data?)
- [ ] Vertical privilege escalation tested (can regular user access admin functions?)
- [ ] IDOR (Insecure Direct Object Reference) — are database IDs exposed in URLs?

#### A02: Cryptographic Failures
- [ ] Passwords hashed with bcrypt/Argon2 (NOT MD5, SHA1, or SHA256 alone)
- [ ] Sensitive data encrypted at rest and in transit
- [ ] TLS enforced on all endpoints (no HTTP fallback)
- [ ] No hardcoded secrets in source code
- [ ] Secrets loaded from environment variables / secret manager

#### A03: Injection
- [ ] SQL injection: All queries use parameterized statements or ORM
- [ ] NoSQL injection: Input validated before MongoDB/Redis operations
- [ ] Command injection: Shell commands avoid user input; use subprocess arrays
- [ ] XSS: All user content sanitized/escaped before rendering
- [ ] Path traversal: File paths validated against allowlist

#### A04: Insecure Design
- [ ] Threat model documented for sensitive features
- [ ] Rate limiting on authentication endpoints
- [ ] Account lockout after failed attempts
- [ ] Sensitive operations require re-authentication

#### A05: Security Misconfiguration
- [ ] Default credentials changed
- [ ] Error messages do not expose stack traces or internal structure
- [ ] Debug modes disabled in production
- [ ] CORS properly configured (not `*` in production)
- [ ] Security headers present (CSP, HSTS, X-Frame-Options)

#### A06: Vulnerable Components
- [ ] No known CVEs in direct dependencies (run `npm audit`, `pip-audit`, etc.)
- [ ] Dependencies up to date or with documented exceptions

#### A07: Authentication Failures
- [ ] Session tokens cryptographically random (128+ bits)
- [ ] Session invalidated on logout
- [ ] Password reset tokens time-limited and single-use
- [ ] MFA available for sensitive operations

#### A08: Software Integrity Failures
- [ ] Dependency integrity verified (lock files committed)
- [ ] No untrusted code executed at runtime

#### A09: Security Logging
- [ ] Authentication events logged (success and failure)
- [ ] Authorization failures logged
- [ ] Sensitive data access logged
- [ ] Logs do not contain sensitive data (passwords, tokens, PII)

#### A10: SSRF
- [ ] Outbound HTTP requests validate destination against allowlist
- [ ] Internal network addresses blocked from user-controlled URLs
- [ ] Redirects followed with validation

### Step 3: AI-Specific Security (If Applicable)
- [ ] Prompt injection: User input separated from system instructions via XML tags
- [ ] Tool execution: Principle of least privilege — tools cannot exceed user's permissions
- [ ] Context isolation: Multi-tenant systems filter context by tenant at database level
- [ ] Output validation: Model output validated before acting on it
- [ ] Audit trail: All AI actions logged with user, model, tokens, action taken

### Step 4: Prioritize Findings
Assign severity using CVSS-inspired framework:
- **Critical:** Remote code execution, authentication bypass, mass data exposure
- **High:** Privilege escalation, SQL injection, SSRF
- **Medium:** XSS, CSRF, information disclosure
- **Low:** Missing security headers, verbose errors, minor information leaks
- **Informational:** Defense-in-depth improvements, hardening recommendations

---

## Output Format

```markdown
## Security Review Report

**Scope:** [Files/systems reviewed]
**Date:** [YYYY-MM-DD]
**Reviewer:** Security Review Skill v1.0

### Attack Surface Map
[Brief description of entry points, data stores, trust boundaries]

### Findings

#### CRITICAL
| ID | Finding | Location | Remediation |
|----|---------|----------|-------------|
| S-001 | [Finding] | [File:Line] | [Fix] |

#### HIGH
[Same table format]

#### MEDIUM
[Same table format]

#### LOW / INFORMATIONAL
[Same table format]

### Not Reviewed
[Items explicitly out of scope and why]

### Recommended Next Steps
1. [Immediate action — within 24 hours]
2. [Short-term — within 1 sprint]
3. [Medium-term — within 1 quarter]
```

---

## Verification

Security review succeeded when:
- [ ] All OWASP Top 10 categories addressed
- [ ] All Critical and High findings have remediation steps
- [ ] Report shared with team before merge
- [ ] At least one finding has a test case to prevent regression

---

## Do Not Use This Skill When

- Reviewing infrastructure or network security (use a dedicated network security tool)
- Conducting a full penetration test (this skill is a code review, not a pentest)
- The code is clearly not security-sensitive (pure UI components with no data access)
