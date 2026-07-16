# Baseline RAG

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Define the minimum retrieval-generation baseline used before adding rewriting, fusion, graphs, or agents.

## Why

A simple, observable baseline exposes whether complexity produces real value and localizes retrieval versus generation failures.

## How

Authenticate the principal, derive tenant/ACL scope, retrieve from one evaluated index with predicates applied in the datastore, assemble bounded source-labelled context, require answer/abstain behavior, and emit citations to immutable source versions. Log query, policy, index, retriever, candidates, scores, prompt template, model, answer, and citation verification under privacy policy.

## Tradeoffs

The baseline is easy to test and operate but can miss mixed lexical/semantic or multi-hop queries. Keep it as the control even after advanced paths ship.

## Anti-patterns

- Calling post-retrieval filtering authorization.
- Returning an answer when authorized evidence is absent.
- Evaluating only end-answer quality.

## Enterprise Considerations

Apply tenant isolation, data minimization, retention, deletion, source licensing, and provider data-processing controls.

## Checklist

- [ ] ACL is enforced before retrieval.
- [ ] Every result and citation resolves to a source version.
- [ ] Retrieval and generation traces are reproducible.
- [ ] Unanswerable and cross-tenant tests pass.

## References

- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production baseline.
