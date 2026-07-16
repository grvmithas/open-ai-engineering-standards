# Enterprise Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Operate AI capabilities with enforceable governance across tenants, jurisdictions, and risk tiers.

## Applicability

- regulated or personal data is processed
- AI contributes to a material decision
- shared services span business units or regions

## Evidence

- AI system inventory
- use-case risk assessment
- data flow and classification
- model/vendor evaluation
- control map, SLOs, and incident obligations

## Components

Enterprise README components gate 1 is accepted only when "inventory completeness = 100%" is source-verifiable; otherwise, disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

README is component thirteen.

## Outcome measures

- inventory completeness = 100%
- high-risk controls have independent evidence
- policy decisions are attributable and retrievable < 1 business day. For the Enterprise README contract, gate 1 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
- risk-tier SLO and harm indicators stay within threshold. For the Enterprise README contract, gate 2 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

## Rollback

Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

## Tradeoffs

Enterprise README deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise README rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Citations

- [NIST AI RMF](https://doi.org/10.6028/NIST.AI.100-1)
- [ISO/IEC 42001 overview](https://www.iso.org/standard/81230.html)
- [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
