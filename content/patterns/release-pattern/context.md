# Release Pattern — Context

> **Pattern:** Release  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Artifact identified by **digest** (not mutable tag alone)
- [ ] Provenance / attestation available for the digest
- [ ] Required gates green for **this** digest (tests, security, SBOM policy)
- [ ] Change ticket / release notes identify risk tier and window
- [ ] Feature flag or traffic splitter configured for progressive exposure
- [ ] Abort criteria written with metric, threshold, window, and owner
- [ ] Rollback command rehearsed in staging (or last drill date recorded)
- [ ] Named go/no-go human for medium/high risk

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Production or customer-facing environment will run new bits
- Schema/data migration accompanies the release
- Model/prompt/tool bundle changes in an AI path
- SLO-sensitive service or payments/identity/data plane
- Organizational policy requires progressive delivery

## Do not apply when

- No runtime artifact changes
- Hotfix under incident commander using emergency path ([hotfix-pattern](../hotfix-pattern/README.md))
- Artifact is unsigned/unattested and policy forbids it — **fix attestation**, do not “release anyway”
- Canary infrastructure is down — fix delivery platform first or explicitly accept big-bang with executive risk acceptance (recorded)

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Artifact digest | CI / registry | Immutable digest |
| Gate results | CI / security | Linked to digest |
| SBOM / deps policy | Supply chain job | Policy pass/fail |
| Runbook | Ops | Rollback steps |
| SLO baseline | APM | Pre-canary window |
| Flag / split key | Flag service | Killable in <5m |

## Authority boundary

The release agent **drafts the go/no-go package**. Humans decide Go/No-Go. Canary Controller may auto-abort on pre-declared criteria; it may not silently raise thresholds.
