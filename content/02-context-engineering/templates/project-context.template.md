# Project Context Template

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Provide a versioned, minimal project context artifact for model-assisted work.

## Why

Stable project facts should be maintained once, sourced, and selected into tasks—not repeatedly inferred from conversation.

## How

Replace every `{{VARIABLE}}`, remove non-applicable sections, and validate links.

```yaml
project:
  name: "{{PROJECT_NAME}}"
  purpose: "{{PROJECT_PURPOSE}}"
  repository_revision: "{{COMMIT_SHA}}"
  owner: "{{OWNER}}"
architecture:
  summary: "{{ARCHITECTURE_SUMMARY}}"
  decision_records: ["{{ADR_PATH}}"]
standards:
  language: "{{LANGUAGE_STANDARD}}"
  tests: "{{TEST_COMMAND}}"
  lint: "{{LINT_COMMAND}}"
boundaries:
  in_scope: ["{{IN_SCOPE_PATH}}"]
  excluded: ["{{EXCLUDED_PATH}}"]
security:
  data_classification: "{{CLASSIFICATION}}"
  prohibited_data: ["{{PROHIBITED_DATA_CLASS}}"]
freshness:
  verified_at: "{{ISO_8601_TIMESTAMP}}"
  verifier: "{{VERIFIER}}"
```

## When

Create per repository and update when architecture, controls, ownership, or commands change.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Reusable authoritative facts | Freshness ownership |
| Smaller task briefs | Indirection |
| Auditable context | Metadata maintenance |

## Anti-Patterns

- Embedding secrets or credentials.
- Copying the entire repository guide into every request.
- Leaving unresolved variables in an instantiated document.
- Treating this artifact as authorization.

## Enterprise Considerations

Classify the artifact, restrict sensitive architecture details, require owner review, and preserve revision history.

## Checklist

- [ ] All variables are resolved
- [ ] Scope and exclusions are explicit
- [ ] Commands and references are valid
- [ ] No secrets are present
- [ ] Owner and freshness are recorded

## Changelog

- 1.0.0 (2026-07-16): Initial project context template.
