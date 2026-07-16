# AWS Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release from repository and runtime evidence.

## Why

Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit. The generate decision is accepted only when template/CDK source, synthesized CloudFormation, change set, stack events, and drift status supports it; generic generate advice cannot establish that AWS state.

## How

Resolve every XML variable with sanitized AWS evidence for the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release. Apply the invariant "Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal AWS engineer for a account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with AWS invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.</step>
  <step index="2">Preserve this AWS invariant: Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit.</step>
  <step index="3">Design against these failure classes: policy-chain AccessDenied; CloudFormation create/update/rollback failure; Lambda timeout, cold start, or concurrency exhaustion; service throttling or quota exhaustion; VPC route, security, endpoint-policy, or DNS failure.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: IAM statements constrain action, resource, condition, and principal without wildcard shortcuts; account, region, partition, and environment are explicit stack inputs; stateful resources define retention, backup, encryption, and replacement behavior; VPC ingress/egress and endpoint policies permit only intended paths; Lambda/compute timeout is below caller budget and concurrency is bounded; SDK retries honor idempotency, jitter, service semantics, and total deadline; CloudTrail, service logs, metrics, X-Ray, alarms, and ownership tags are configured; CloudFormation change/replacement behavior is reviewed from synthesized output.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: `aws sts get-caller-identity` and `aws configure list`; `aws cloudformation validate-template --template-body file://template.yaml`; `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`; `aws iam simulate-principal-policy --policy-source-arn &lt;role&gt; --action-names &lt;action&gt;`; `aws cloudformation detect-stack-drift --stack-name &lt;stack&gt;`.</step>
  <step index="6">Define rollout and rollback exactly: Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress AWS validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

Generation waits for template/CDK source, synthesized CloudFormation, change set, stack events, and drift status and caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies. That extra AWS discovery is justified because the output must prove "IAM statements constrain action, resource, condition, and principal without wildcard shortcuts" and survive policy-chain AccessDenied rather than merely compile.

## Anti-patterns

- A single shared production account and VPC turns IAM, quota, network, and deployment failures into organization-wide incidents.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

AWS governance enforces organization policies, centralized CloudTrail/configuration evidence, break-glass role controls, region restrictions, data classification, and cost allocation.

## Official sources

- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [CloudFormation change sets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html)

## Checklist

- [ ] AWS version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a AWS-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
