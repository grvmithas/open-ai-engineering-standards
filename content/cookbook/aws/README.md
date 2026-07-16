# AWS Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release using AWS's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit. Generic software advice cannot verify that invariant because the decisive evidence lives in template/CDK source, synthesized CloudFormation, change set, stack events, and drift status; caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies; VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- template/CDK source, synthesized CloudFormation, change set, stack events, and drift status
- caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies
- VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs
- CloudTrail, CloudWatch metrics/logs, X-Ray traces, service quota, and AWS Health events

## Native verification

- `aws sts get-caller-identity` and `aws configure list`
- `aws cloudformation validate-template --template-body file://template.yaml`
- `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`
- `aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`
- `aws cloudformation detect-stack-drift --stack-name <stack>`

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

This cookbook requires deeper AWS evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
