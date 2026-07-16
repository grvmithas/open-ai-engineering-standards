# AWS Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a AWS account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release.

## Why

AWS correctness depends on source plus template/CDK source, synthesized CloudFormation, change set, stack events, and drift status; caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies; VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `aws sts get-caller-identity` and `aws configure list`; `aws cloudformation validate-template --template-body file://template.yaml`; `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`; `aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`; `aws cloudformation detect-stack-drift --stack-name <stack>`. Findings must identify the violated AWS invariant.

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

The AWS review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] IAM statements constrain action, resource, condition, and principal without wildcard shortcuts.
- [ ] account, region, partition, and environment are explicit stack inputs.
- [ ] stateful resources define retention, backup, encryption, and replacement behavior.
- [ ] VPC ingress/egress and endpoint policies permit only intended paths.
- [ ] Lambda/compute timeout is below caller budget and concurrency is bounded.
- [ ] SDK retries honor idempotency, jitter, service semantics, and total deadline.
- [ ] CloudTrail, service logs, metrics, X-Ray, alarms, and ownership tags are configured.
- [ ] CloudFormation change/replacement behavior is reviewed from synthesized output.
- [ ] Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native AWS evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
