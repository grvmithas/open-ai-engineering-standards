# Multi-Agent Threat Controls

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Control loop, collusion, confused-deputy, prompt-injection, and privilege-propagation risks unique to delegated agent execution.

## Why

Agent messages and retrieved artifacts are untrusted input. Repetition can amplify an error into actions across multiple identities, while apparent consensus may be correlated or malicious.

## How

| Risk | Prevent | Detect | Recover |
|---|---|---|---|
| Loop | DAG/depth constraints, iteration budget, idempotency | repeated state/action digest, no-progress counter | cancel branch, restore checkpoint, escalate |
| Collusion/correlated error | independent evidence, role separation, deterministic gates | source-overlap and anomalous agreement checks | quarantine agents and re-evaluate from trusted evidence |
| Confused deputy | re-authorize original intent at every tool call | requested action/resource differs from grant | deny, revoke delegation, investigate trace |
| Privilege propagation | capability attenuation and audience-bound tokens | downstream grant exceeds parent | reject chain and revoke descendants |
| Indirect injection | treat messages/documents as data; isolate privileged executor | instruction-like content, intent drift | quarantine source, rotate affected state, replay safely |

Use an external policy enforcement point for tools and state writes. High-impact actions require deterministic validation and independent approval; an LLM critique is not an authorization control.

## Tradeoffs

Isolation and independent approval reduce autonomy and throughput. They are mandatory where a compromise can create irreversible, cross-tenant, financial, security, or safety impact.

## Anti-patterns

- Majority voting among replicas of the same model as proof.
- Letting workers modify system prompts, policy, identity, budgets, or termination rules.
- Passing raw peer messages directly into a privileged agent's instruction channel.

## Enterprise Considerations

Threat-model trust boundaries and supply chains, map alerts to incident response, and preserve the full delegation/provenance graph. Run adversarial exercises across tenants and compromised-agent scenarios.

## Checklist

- [ ] No-progress, repeat-action, depth, and cycle detectors terminate execution.
- [ ] Privilege cannot increase down a delegation chain.
- [ ] Original user intent is available to every policy decision.
- [ ] Peer content is untrusted and instruction/data boundaries are enforced.
- [ ] Compromised-agent containment and replay are exercised.

## References

- [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [OWASP Top 10 for LLM Applications 2025](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST SP 800-207, Zero Trust Architecture](https://doi.org/10.6028/NIST.SP.800-207)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
