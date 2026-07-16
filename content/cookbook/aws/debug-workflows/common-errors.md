# AWS Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent AWS failure classes without erasing the platform state needed to prove root cause.

## Why

Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `AccessDenied` | Identity policy, resource policy, boundary, SCP, or explicit deny blocks the action. | policy-chain AccessDenied |
| 2 | `CloudFormation UPDATE_ROLLBACK_FAILED` | Rollback could not restore a dependent resource. | CloudFormation create/update/rollback failure |
| 3 | `Lambda task timed out` | Work exceeds timeout due to dependency latency, cold start, or unbounded processing. | Lambda timeout, cold start, or concurrency exhaustion |
| 4 | `ThrottlingException` | Concurrency or API rate exceeds a service quota. | service throttling or quota exhaustion |
| 5 | `VPC endpoint/DNS connectivity failure` | Routes, security groups, NACLs, endpoint policy, or DNS are inconsistent. | VPC route, security, endpoint-policy, or DNS failure |

### 1. `AccessDenied`

**Failure class:** policy-chain AccessDenied.

**Preserve first:** template/CDK source, synthesized CloudFormation, change set, stack events, and drift status.

**Discriminate:** CloudTrail and policy simulator. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For policy-chain AccessDenied, correlate that observation to the exact AWS target, revision, request/job, and UTC interval; compare template/CDK source, synthesized CloudFormation, change set, stack events, and drift status with one healthy peer or baseline.

**Native action:** `aws sts get-caller-identity` and `aws configure list`. Start in the safest AWS read-only or dry-run mode available. Before changing the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, name which of policy-chain AccessDenied and CloudFormation create/update/rollback failure the action distinguishes.

**Root-cause direction:** Identity policy, resource policy, boundary, SCP, or explicit deny blocks the action.

**Correction:** Evaluate the full policy chain and narrow the required action/resource.

**Recovery proof:** Re-run `AccessDenied` reproduction, verify the policy-chain AccessDenied signal cleared in CloudTrail and policy simulator. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Evaluate the full policy chain and narrow the required action/resource. restored the intended AWS behavior through one complete workload or rollout window.

**Rollback boundary:** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

### 2. `CloudFormation UPDATE_ROLLBACK_FAILED`

**Failure class:** CloudFormation create/update/rollback failure.

**Preserve first:** caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies.

**Discriminate:** stack events. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For CloudFormation create/update/rollback failure, correlate that observation to the exact AWS target, revision, request/job, and UTC interval; compare caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies with one healthy peer or baseline.

**Native action:** `aws cloudformation validate-template --template-body file://template.yaml`. Start in the safest AWS read-only or dry-run mode available. Before changing the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, name which of CloudFormation create/update/rollback failure and Lambda timeout, cold start, or concurrency exhaustion the action distinguishes.

**Root-cause direction:** Rollback could not restore a dependent resource.

**Correction:** Correct the resource cause, continue rollback, then redeploy a reviewed change set.

**Recovery proof:** Re-run `CloudFormation UPDATE_ROLLBACK_FAILED` reproduction, verify the CloudFormation create/update/rollback failure signal cleared in stack events. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Correct the resource cause, continue rollback, then redeploy a reviewed change set. restored the intended AWS behavior through one complete workload or rollout window.

**Rollback boundary:** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

### 3. `Lambda task timed out`

**Failure class:** Lambda timeout, cold start, or concurrency exhaustion.

**Preserve first:** VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs.

**Discriminate:** X-Ray and CloudWatch Logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Lambda timeout, cold start, or concurrency exhaustion, correlate that observation to the exact AWS target, revision, request/job, and UTC interval; compare VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs with one healthy peer or baseline.

**Native action:** `aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`. Start in the safest AWS read-only or dry-run mode available. Before changing the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, name which of Lambda timeout, cold start, or concurrency exhaustion and service throttling or quota exhaustion the action distinguishes.

**Root-cause direction:** Work exceeds timeout due to dependency latency, cold start, or unbounded processing.

**Correction:** Trace dependencies, bound work, and set timeout below caller budget.

**Recovery proof:** Re-run `Lambda task timed out` reproduction, verify the Lambda timeout, cold start, or concurrency exhaustion signal cleared in X-Ray and CloudWatch Logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Trace dependencies, bound work, and set timeout below caller budget. restored the intended AWS behavior through one complete workload or rollout window.

**Rollback boundary:** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

### 4. `ThrottlingException`

**Failure class:** service throttling or quota exhaustion.

**Preserve first:** CloudTrail, CloudWatch metrics/logs, X-Ray traces, service quota, and AWS Health events.

**Discriminate:** CloudWatch metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For service throttling or quota exhaustion, correlate that observation to the exact AWS target, revision, request/job, and UTC interval; compare CloudTrail, CloudWatch metrics/logs, X-Ray traces, service quota, and AWS Health events with one healthy peer or baseline.

**Native action:** `aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`. Start in the safest AWS read-only or dry-run mode available. Before changing the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, name which of service throttling or quota exhaustion and VPC route, security, endpoint-policy, or DNS failure the action distinguishes.

**Root-cause direction:** Concurrency or API rate exceeds a service quota.

**Correction:** Honor backoff, add jitter, cap concurrency, and assess quota evidence.

**Recovery proof:** Re-run `ThrottlingException` reproduction, verify the service throttling or quota exhaustion signal cleared in CloudWatch metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Honor backoff, add jitter, cap concurrency, and assess quota evidence. restored the intended AWS behavior through one complete workload or rollout window.

**Rollback boundary:** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

### 5. `VPC endpoint/DNS connectivity failure`

**Failure class:** VPC route, security, endpoint-policy, or DNS failure.

**Preserve first:** template/CDK source, synthesized CloudFormation, change set, stack events, and drift status.

**Discriminate:** VPC Flow Logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For VPC route, security, endpoint-policy, or DNS failure, correlate that observation to the exact AWS target, revision, request/job, and UTC interval; compare template/CDK source, synthesized CloudFormation, change set, stack events, and drift status with one healthy peer or baseline.

**Native action:** `aws cloudformation detect-stack-drift --stack-name <stack>`. Start in the safest AWS read-only or dry-run mode available. Before changing the account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release, name which of VPC route, security, endpoint-policy, or DNS failure and policy-chain AccessDenied the action distinguishes.

**Root-cause direction:** Routes, security groups, NACLs, endpoint policy, or DNS are inconsistent.

**Correction:** Trace the exact source-destination path and policy layers.

**Recovery proof:** Re-run `VPC endpoint/DNS connectivity failure` reproduction, verify the VPC route, security, endpoint-policy, or DNS failure signal cleared in VPC Flow Logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Trace the exact source-destination path and policy layers. restored the intended AWS behavior through one complete workload or rollout window.

**Rollback boundary:** Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.

## Version-aware caution

Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes policy-chain AccessDenied, CloudFormation create/update/rollback failure, Lambda timeout, cold start, or concurrency exhaustion, service throttling or quota exhaustion, VPC route, security, endpoint-policy, or DNS failure and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
