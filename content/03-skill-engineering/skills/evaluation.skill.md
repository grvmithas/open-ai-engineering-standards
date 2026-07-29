# Evaluation Skill

> **Skill ID:** `evaluation`  
> **Version:** 2.1  
> **Updated:** 2026-07-29

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
Frozen goldens and held-out sets cost curation and delay shipping; LLM-as-judge scales cheaper but drifts without calibration and inter-rater checks. Aggregate win rates are fast to report and hide slice regressions—shipping on mean improvement without per-slice and safety gates is cheaper until a high-value or adversarial cohort fails in production.

## Anti-Patterns
- Using hand-picked demos or the model grading itself as a release evaluation.
- Tuning against the held-out set until it “passes,” then claiming generalization.
- Switching judges, rubrics, seeds, or retry policy between baseline and candidate mid-comparison.
- Declaring parity or improvement on underpowered slices without uncertainty estimates.
- Ignoring cost, latency, and safety non-regression when quality inches up on the aggregate.

## Enterprise Considerations
Eval datasets may contain customer or regulated content—classify them, restrict access, and record provenance before any provider upload. Ship/no-ship needs a named owner and thresholds declared before the run, not after seeing the scoreboard. Retain baseline/candidate traces, grader versions, and slice reports for contested release decisions and model-change audits.

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
- **2.1 (2026-07-29):** De-boilerplated Tradeoffs, Anti-Patterns, and Enterprise Considerations with evaluation-domain content (goldens vs judges, held-out leakage, slice gates).
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
