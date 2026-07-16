# Task Context Brief Template

> Version: 1.0.0  
> Last updated: 2026-07-16

## Purpose

Define the minimum complete, authorized context for one unit of model-assisted work.

## Why

A task brief converts conversational intent into scope, evidence, acceptance criteria, and verification. It prevents assumptions from becoming hidden requirements.

## How

```xml
<task_brief id="{{TASK_ID}}" version="{{VERSION}}">
  <objective>{{OBJECTIVE}}</objective>
  <scope>
    <include>{{IN_SCOPE}}</include>
    <exclude>{{OUT_OF_SCOPE}}</exclude>
  </scope>
  <inputs>
    <source id="{{SOURCE_ID}}" revision="{{REVISION}}" trust="{{TRUST_CLASS}}">
      {{AUTHORIZED_INPUT}}
    </source>
  </inputs>
  <acceptance_criteria>
    <criterion id="{{CRITERION_ID}}">{{MEASURABLE_CRITERION}}</criterion>
  </acceptance_criteria>
  <constraints>{{TASK_CONSTRAINTS}}</constraints>
  <verification>{{VERIFICATION_COMMANDS_OR_REVIEW}}</verification>
  <risk_and_approval>{{RISK_TIER_AND_APPROVER}}</risk_and_approval>
</task_brief>
```

Resolve ambiguities before high-impact execution. Do not request private chain-of-thought; request plans, evidence, and verification results as visible artifacts.

## When

Use for implementation, review, research, data changes, and any handoff requiring reproducibility.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Clear completion contract | Authoring time |
| Bounded context | May require follow-up retrieval |
| Reproducible handoff | Brief can become stale |

## Anti-Patterns

- “Do what we discussed” without source references.
- Unmeasurable acceptance criteria.
- Including unauthorized data.
- Approval requirements without a named authority.

## Enterprise Considerations

Link briefs to change records, classify inputs, record approvers, and retain evidence according to the task's control domain.

## Checklist

- [ ] All variables are resolved
- [ ] Scope and exclusions are explicit
- [ ] Inputs are authorized and revision-pinned
- [ ] Acceptance criteria are measurable
- [ ] Verification and approval are defined

## Changelog

- 1.0.0 (2026-07-16): Initial task context brief template.
