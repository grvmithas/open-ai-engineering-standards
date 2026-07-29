# Project Governance

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This document defines how AIES decisions are proposed, reviewed, approved, and reversed.

## Why

The standard affects downstream engineering policy. Decisions therefore require named accountability, reviewable evidence, and a durable record rather than informal consensus or repository access alone.

## How

### Decision authority

| Decision | Required process | Approval |
|---|---|---|
| Typo, link, or non-normative clarification | Pull request | One maintainer |
| Normative content change | Pull request with evidence and compatibility assessment | Two maintainers |
| New domain, breaking policy, or governance change | RFC under `RFC_PROCESS.md` | Two-thirds of active, non-conflicted maintainers |
| Security response | Private security process | Security response lead plus one maintainer |
| Release | Passing protected-branch gates | Release maintainer |

The maintainer roster and activity rules are defined in `MAINTAINERS.md`. The compatibility policy is defined in `COMPATIBILITY.md`.

### Decision process

1. Open the required pull request or RFC.
2. State the problem, evidence, decision, tradeoffs, migration, and rejected alternatives.
3. Resolve material objections or record why they do not block.
4. Obtain the required approvals from non-conflicted maintainers.
5. Merge only after required automated checks pass.
6. Record breaking changes in release notes and the applicable changelog.

Maintainers may make an emergency security or legal change without the normal review window. They must document the decision within seven days.

## Tradeoffs

- Multiple approvals slow changes but reduce unilateral policy drift.
- Public decision records add maintenance cost but make authority auditable.
- Emergency authority reduces response time but requires retrospective review.

## Anti-patterns

- **Commit-bit governance:** write access does not grant unilateral policy authority.
- **Consensus without closure:** the designated threshold decides after evidence is considered.
- **Invisible veto:** blocking reviews must name a requirement or concrete risk.
- **Governance by private chat:** material decisions must be recorded in the repository.

## Enterprise considerations

Organizations may fork AIES and define stricter approval controls. Forks must identify deviations and owners; they must not present local policy as upstream AIES.

## Checklist

- [ ] Decision class and approval threshold are identified.
- [ ] Conflicts of interest are disclosed.
- [ ] Evidence and compatibility impact are documented.
- [ ] Required checks and approvals pass.
- [ ] Breaking changes include migration guidance.
- [ ] Emergency decisions receive retrospective review.

## Changelog

### 1.0.0 — 2026-07-16

- Established decision classes, authority, thresholds, and emergency handling.
