# Procedural Memory

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Govern reusable prompts, skills, policies, and workflows as executable production artifacts.

## Why

Procedures influence actions and privileges. Unreviewed self-modification turns model output or poisoned memory into executable policy.

## How

Store procedures in version control with owner, trigger, inputs/outputs, required capabilities, constraints, failure handling, tests, approval, expiry, and artifact signature. Execute only approved immutable versions. Propose changes through review and isolated evaluation; never let an agent overwrite its active procedure. Record the procedure digest in each run.

## Tradeoffs

Review slows adaptation but enables reproducibility, rollback, and separation of duties.

## Anti-patterns

- Automatically promoting “successful” traces into production skills.
- Embedding credentials or tenant data in procedures.
- Allowing runtime prompt edits to bypass release controls.

## Enterprise Considerations

Treat procedural memory as software supply chain material: signed releases, protected branches, dependency review, least privilege, and emergency revocation.

## Checklist

- [ ] Procedure owner, version, signature, and required capabilities are recorded.
- [ ] Tests cover success, failure, injection, and rollback.
- [ ] Runtime self-modification is prohibited.
- [ ] Every execution records the immutable digest.

## References

- [SLSA specification](https://slsa.dev/spec/v1.1/)
- [NIST SP 800-218, Secure Software Development Framework](https://doi.org/10.6028/NIST.SP.800-218)

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
