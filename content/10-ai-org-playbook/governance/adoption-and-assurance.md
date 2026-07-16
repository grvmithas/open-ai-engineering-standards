# AI Adoption and Assurance

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Scale AI use through measured enablement and risk-based assurance rather than seat counts.

## Why
Usage can grow while quality, security, and outcomes degrade.

## When
Use for quarterly operating reviews.

## How
1. Measure outcome lead time, accepted-change rate, escaped defects, evaluation coverage, severe incidents, override rate, unit cost, and skill attainment.
2. Baseline before interventions and use matched comparisons where possible.
3. Review by use case and risk, not individual surveillance.
4. Fund remediation for recurring control failures.
5. Stop or retire use cases that cannot meet minimum controls.

## Measurement model
Define the unit of analysis before collecting data: use case, team workflow, release, or user outcome. Do not mix units.

| Metric | Definition | Required segmentation | Decision use |
|---|---|---|---|
| Outcome attainment | Eligible cases meeting the predeclared user/business outcome ÷ eligible cases | Use case, risk, cohort, time | Expand only when lower confidence bound clears target |
| Accepted-change rate | AI-assisted proposed changes accepted after review ÷ reviewed proposals | Change type and risk; never individual ranking | Detect workflow fit and review waste |
| Escaped-defect rate | Qualifying post-release defects ÷ releases or changed units | Severity, AI-assisted/non-assisted matched cohort | Compare quality with baseline |
| Evaluation coverage | Production decision paths represented by current qualified cases ÷ inventoried paths | Risk tier and release | Fund missing coverage; not a quality score |
| Severe-incident rate | Severe incidents ÷ exposed requests/users/decisions | Use case, provider/model release | Stop expansion or trigger retirement review |
| Human override rate | Human reversals of AI proposal ÷ reviewed AI proposals | Reason code and consequence | Detect calibration or workflow drift |
| Unit outcome cost | Total lifecycle cost ÷ successful outcomes | Model, human review, platform, evaluation, incident cost | Route/fund based on full cost, not token price |
| Exception exposure | Requests/users/side effects under active exception × days | Control and risk | Escalate aging or high-exposure exceptions |
| Time to safe recovery | Incident declaration to validated containment/restoration | Severity and failure type | Test operational readiness |
| Competence coverage | Qualified role assignments ÷ required assignments | Role and risk, not employee productivity | Fund training/hiring and constrain unsupported systems |

Report numerator, denominator, exclusions, missingness, collection version, uncertainty, and owner. Small or sensitive cohorts are suppressed according to privacy policy.

## Causal evaluation
- Establish at least four weeks of baseline where seasonality permits.
- Prefer randomized rollout by stable team/work unit when ethical and operationally feasible.
- Otherwise use matched workflows, interrupted time series, or difference-in-differences with declared assumptions.
- Track concurrent staffing, process, model, and workload changes; do not attribute the entire delta to AI.
- Pre-register primary outcome, guardrails, minimum detectable effect, horizon, exclusions, and stopping rule.
- Treat self-reported productivity as diagnostic context, not sole investment evidence.

## Assurance plan
Independent assurance uses risk-weighted sampling:

| Tier | Pre-launch | Operating sample | Triggered review |
|---|---|---|---|
| Low | Confirm inventory, owner, approved tooling, baseline tests | Annual sample or 5% of active uses, whichever is greater | Material incident or repeated exception |
| Medium | Verify evaluation, security, data, human workflow, rollback and provider evidence | Quarterly evidence sample plus one control replay | Provider/model change, severe complaint, drift |
| High | Independent end-to-end evidence review, witnessed failure/rollback exercise, affected-person process | Continuous key-risk indicators and quarterly control replay | Any severe outcome, oversight failure, legal/control change |

Sampling percentages are starting policy values, not statistical guarantees. Assurance records the population, selection method, independence, exceptions, test steps, result, confidence limitations, and finding severity.

## Finding and closure workflow
1. Assurance issues a finding with exact evidence, affected population/release, severity, control expectation, owner, and due date.
2. The use-case owner accepts remediation ownership; disagreement is recorded and escalated, not silently reworded.
3. Product/platform teams implement corrective action and attach new evidence.
4. Assurance independently re-performs the failed test. Ticket closure or management assertion is insufficient.
5. Recurring findings trigger root-cause review, control redesign, and portfolio-level funding.

Severity clocks are policy-defined. An overdue critical finding restricts or suspends the capability; it is not converted into an indefinite exception.

## Portfolio decision rules
- **Expand:** primary outcome lower confidence bound exceeds target; all safety/security guardrails pass; controls and human capacity scale.
- **Continue bounded:** outcome uncertain but no risk threshold breached; collect the predeclared additional sample.
- **Remediate:** outcome valuable but control failure is correctable within approved time and exposure.
- **Hold:** severe incident, failed high-risk control, unqualified provider change, or expired exception.
- **Retire:** repeated failure, negative full-lifecycle value, unavailable competence/oversight, or no credible path within risk appetite.

## Evidence contract
The decision record is the **adoption and assurance review pack**. It records outcome baseline; quality; incidents; override; cost; control coverage; workforce impact; remediation; retirement. The business use-case owner owns completeness; the evidence is invalid when activity measures are used as outcome or individual-performance proxies. Organization evidence records mandate, authority, competence, funding, conflicts, decisions, exceptions, metrics, and review cadence.

## Failure response and recovery
**Trigger:** benefit is unproven or residual risk breaches appetite.

**Immediate response:** stop expansion, fund remediation, or retire the use case through portfolio review. Preserve the adoption and assurance review pack, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai adoption and assurance.

## Decision authority
The **business use-case owner** accepts the operational decision. The **independent assurance lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Committees may decide only within delegated authority; executives retain risk appetite and funding accountability while independent assurance retains challenge.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Outcome metrics | Meaningful accountability | Harder attribution |

## Anti-patterns
- Counting prompts or generated lines.
- Ranking individuals by AI telemetry.

## Enterprise considerations
- Consult workforce and privacy stakeholders.
- Use aggregated, purpose-limited telemetry.

## Framework relationship
The **AI Adoption and Assurance** document is an operating aid; effectiveness requires observed decisions, funded controls, and independent evidence rather than the existence of this process.

| Source | Relationship for AI Adoption and Assurance | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 4 and 6 | Use NIST governance outcomes to test decision rights and accountability in practice. |
| ISO/IEC 42001 | 42001 clauses 9.1–9.3 | A documented process supports—but does not itself demonstrate—effective management-system operation. |
| Domain threat/control source | Security findings are outcome guardrails | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Each metric has unit, numerator, denominator, missingness, uncertainty, owner, and decision rule.
- [ ] Outcome and guardrail metrics are predeclared before rollout.
- [ ] Causal claims identify design and assumptions.
- [ ] Telemetry is purpose-limited and cannot rank individuals.
- [ ] Assurance population, sample, independence, test steps, and confidence limits are recorded.
- [ ] Finding closure requires independent re-performance.
- [ ] Critical overdue findings and expired exceptions restrict exposure.
- [ ] Expand, bound, remediate, hold, and retire decisions are used in portfolio review.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added metric definitions, causal measurement, risk-weighted assurance sampling, finding closure, and portfolio expand/hold/retire rules. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
