# AWS Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a AWS account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release.

## Why

A syntactically valid AWS artifact can still fail because of policy-chain AccessDenied, CloudFormation create/update/rollback failure, Lambda timeout, cold start, or concurrency exhaustion, service throttling or quota exhaustion, VPC route, security, endpoint-policy, or DNS failure. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `aws sts get-caller-identity` and `aws configure list`; `aws cloudformation validate-template --template-body file://template.yaml`; `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`; `aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`; `aws cloudformation detect-stack-drift --stack-name <stack>`. Stop promotion on any failed item.

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

The AWS deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] caller identity and target account/region are printed before any mutation.
- [ ] template validation, lint/tests, synthesized diff, and change set show no unapproved replacement.
- [ ] service quotas, reserved concurrency, IP capacity, and regional dependencies are preflighted.
- [ ] IAM Access Analyzer/simulation covers the deployment and workload roles.
- [ ] alarms and dashboards exist before traffic enters the new cell or function version.
- [ ] weighted alias, target-group, or cell routing stops on user-impact alarms.
- [ ] CloudFormation rollback triggers and stack events are monitored to completion.
- [ ] rollback preserves event/schema compatibility and stateful resource retention.
- [ ] Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native AWS evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
