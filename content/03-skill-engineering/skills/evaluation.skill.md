# Evaluation Skill

> **Skill ID:** `evaluation`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A model, prompt, retrieval, tool, or agent change needs an evidence-based release decision.

## Why
An eval specification, frozen dataset with provenance, rubric or executable graders, baseline/candidate runs, slice report, and release decision is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A model, prompt, retrieval, tool, or agent change needs an evidence-based release decision.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An eval specification
- frozen dataset with provenance
- rubric or executable graders
- baseline/candidate runs
- slice report
- release decision.

## Procedure
1. Define the decision, unit under test, intended population, failure taxonomy, quality/safety/cost/latency metrics, and thresholds before running.
2. Construct representative, boundary, adversarial, and historical-regression cases; split development and held-out sets and record provenance.
3. Use deterministic graders where possible; calibrate model or human graders with blinded examples and inter-rater checks.
4. Run baseline and candidate with fixed versions, seeds where supported, retry policy, and captured traces; estimate uncertainty and inspect slices.
5. Investigate regressions, perform error analysis, document limitations, and gate release on predeclared thresholds rather than aggregate improvement.

## Verification
Check dataset leakage, grader agreement, schema validity, per-slice pass rates, confidence intervals, safety non-regression, cost, and latency.

## Unhappy Paths and Recovery
If graders disagree, refine rubric and adjudicate before comparing models. If a slice is underpowered, do not claim equivalence. If the candidate overfits dev cases, refresh held-out data.

## Concrete Example
Evaluate a tool-using support agent on task completion, forbidden tool calls, citation accuracy, p95 latency, and cost across product and adversarial slices.

## Do Not Use This Skill When
Do not use a handful of hand-picked demos or model self-rating as a release evaluation.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [OpenAI Evals Guide](https://platform.openai.com/docs/guides/evals)
- [NIST AI RMF Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
