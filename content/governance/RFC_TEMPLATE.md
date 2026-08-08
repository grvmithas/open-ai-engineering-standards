# RFC-XXXX: [Feature / Standard Title]

- **Start Date**: YYYY-MM-DD
- **Author(s)**: [Name / GitHub Handle]
- **Status**: Draft | Under Review | Approved | Rejected
- **Target Area**: Prompt Engineering | MCP Contracts | Evaluation Gates | AIDLC Stage Gates | LLMOps

---

## Summary

Brief 2–3 sentence explanation of the proposed change or specification.

---

## Motivation

Why are we doing this? What problem does it solve in production AI delivery? What are the failure modes or security gaps if this standard is omitted?

---

## Detailed Specification

Provide the exact technical specification:
- **Schema Definitions**: JSON Schema, TypeScript types, or YAML specifications.
- **Harness Rules**: Specific rules for `AIES.md`, `AGENTS.md`, or `.cursor/rules`.
- **Runtime Expectations**: Expected behavior, input/output validation, and error handling.

---

## Evidence & Verification

How will this standard be verified in CI/CD?
- Automated test scripts or `aies audit` linter checks.
- Artifacts required to evidence compliance.

---

## Alignment with Evolving Standards

Which external specifications does this align with?
- [ ] NIST AI RMF 1.0 (e.g., MANAGE 1.2, MEASURE 2.1)
- [ ] ISO/IEC 42001 (AIMS Controls)
- [ ] OWASP Top 10 for LLM Applications (e.g., LLM01 Prompt Injection, LLM07 Insecure Plugin Design)
- [ ] Model Context Protocol (MCP)

---

## Drawbacks & Backward Compatibility

- Are there breaking changes?
- What is the migration path for existing AIES adopters?
