# AWS Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable AWS change or diagnosis for a account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for AWS can change. Do not activate for a name-only documentation edit.

## Why

Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit. The skill terminates only on AWS evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture template/CDK source, synthesized CloudFormation, change set, stack events, and drift status and caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies.
2. **Select the boundary.** Name the changed account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover policy-chain AccessDenied; CloudFormation create/update/rollback failure; Lambda timeout, cold start, or concurrency exhaustion; service throttling or quota exhaustion; VPC route, security, endpoint-policy, or DNS failure.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs; CloudTrail, CloudWatch metrics/logs, X-Ray traces, service quota, and AWS Health events.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `aws sts get-caller-identity` and `aws configure list`
2. `aws cloudformation validate-template --template-body file://template.yaml`
3. `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`
4. `aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`
5. `aws cloudformation detect-stack-drift --stack-name <stack>`

7. **Apply review gates.**

- [ ] IAM statements constrain action, resource, condition, and principal without wildcard shortcuts.
- [ ] account, region, partition, and environment are explicit stack inputs.
- [ ] stateful resources define retention, backup, encryption, and replacement behavior.
- [ ] VPC ingress/egress and endpoint policies permit only intended paths.
- [ ] Lambda/compute timeout is below caller budget and concurrency is bounded.
- [ ] SDK retries honor idempotency, jitter, service semantics, and total deadline.
- [ ] CloudTrail, service logs, metrics, X-Ray, alarms, and ownership tags are configured.
- [ ] CloudFormation change/replacement behavior is reviewed from synthesized output.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better AWS telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the AWS boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

This skill spends time fingerprinting AWS and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
