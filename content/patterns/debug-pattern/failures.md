# Debug Pattern — Failures

> **Pattern:** Debug  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the Debug pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Single hypothesis | First patch fails | Write ≥2 ranked hypotheses before next patch |
| Local-only verify | Prod still broken | Require failing-env confirmation |
| Catch-and-swallow | Errors hidden | Remove swallow; add regression test |
| Restart as fix | Fingerprint returns | Preserve evidence; treat restart as containment only |

## Escalation from Debug failures

- Security-class impact during Debug → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing Debug → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after Debug containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the Debug human gate “just this once” after a failure  
- Delete Debug evidence to hide a bad run  
- Replace Debug with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** Debug failure recovery table and escalation paths expanded.
