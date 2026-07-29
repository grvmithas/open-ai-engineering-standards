#!/usr/bin/env node
/**
 * Deepen thin pattern envelope pages (problem, context, failures) with
 * pattern-specific substance — avoids duplicate-line validator failures.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const patternsRoot = path.join(root, 'content/patterns');

const DATA = {
  'planner-pattern': {
    title: 'Planner',
    statement:
      'Multi-file or cross-boundary work handed straight to a coder agent yields token-local correctness and system-level failure: missed dependencies, invented contracts, and 2–3× rework.',
    symptoms: [
      ['Second architectural pass', 'More than ~30% of AI multi-file PRs need a redesign mid-flight'],
      ['Surprise paths', 'PR touches files never listed in an approved plan'],
      ['Interface invention', 'New API shapes or schema columns appear without human review'],
      ['No revert story', 'Deployable change ships without a named rollback'],
    ],
    rootCause:
      'Next-token models optimize local coherence inside a context window. Ordering, blast radius, and contract stability are not enforced unless externalized as a reviewed plan.',
    nonGoals: [
      'Not a product requirements substitute',
      'Not a dumping ground for implementation code',
      'Not required for single-file typos, pure config toggles, or docs-only edits',
    ],
    whenMissing: [
      'Coder asks architectural questions mid-implementation',
      'Reviewer finds AuthZ or schema changes that were never planned',
      'Hotfix expands because the original change had no return path',
    ],
    contextMust: [
      'Locked acceptance criteria (testable)',
      'Context pack with trust labels and size budget',
      'Existing topology / ADR pointers for touched services',
      'Hard constraints: perf, security, compliance, data class',
      'Named human who can approve or reject the plan',
    ],
    contextRefuse: [
      'AC still negotiable or contradictory',
      'Empty or untrusted context pack',
      'No owner for irreversible steps (schema, cutover, public API)',
    ],
    failures: [
      ['Plan too vague', 'Coder re-asks topology mid-PR', 'Return to planner; force file/owner/verify/rollback rows'],
      ['Plan too code-like', 'Plan contains full function bodies', 'Strip to interfaces and sequences; re-approve'],
      ['Rubber-stamp approval', 'Approver cannot restate the plan', 'Invalidate approval; require teach-back'],
      ['Scope creep', 'Diff exceeds planned paths', 'Freeze PR; replan delta; re-approve'],
    ],
  },
  'reviewer-pattern': {
    title: 'Reviewer',
    statement:
      'AI-touched changes merge on “tests green” or vibe checks, shipping AuthZ holes, invented path:line findings, or rubber-stamp approvals that no human can defend.',
    symptoms: [
      ['Green CI, bad AuthZ', 'Critical access-control defects found after merge'],
      ['Unverifiable findings', 'Comments cite files/lines that do not exist'],
      ['AI as merge boss', 'Bot approve without a named human owner'],
      ['Severity theater', 'Everything is Medium; nothing blocks'],
    ],
    rootCause:
      'Review without a severity model and evidence bar collapses to either noise or false confidence. Models invent plausible citations unless forced to open the diff.',
    nonGoals: [
      'Not a replacement for human merge authority',
      'Not a full pentest',
      'Not required for pure markdown typos with no behavior change',
    ],
    whenMissing: [
      'Security incidents trace to unreviewed AI diffs',
      'Review threads argue tone instead of path:line evidence',
      'Release trains slow because every finding is renegotiated',
    ],
    contextMust: [
      'PR diff + planned path list (or explicit delta)',
      'Data class and AuthZ surfaces touched',
      'Test/eval results relevant to the change',
      'Prior review comments still open',
    ],
    contextRefuse: [
      'No diff available',
      'Findings requested without repository access',
      'Merge already performed and review is post-hoc theater',
    ],
    failures: [
      ['Invented citations', 'path:line does not open', 'Re-run with filesystem/GitHub read; drop unverified items'],
      ['Approve on CI only', 'No severity pass', 'Block merge; run five-pass review'],
      ['Severity inflation', 'All findings Critical', 'Recalibrate against checklist; keep Block list short'],
      ['Scope blindness', 'Missed AuthZ file outside “main” hunk', 'Require planned-path coverage check'],
    ],
  },
  'context-pattern': {
    title: 'Context',
    statement:
      'Agents receive unranked dumps, stale docs, or untrusted retrieval in the system channel — then “confidently” implement against poisoned or oversized packs.',
    symptoms: [
      ['Token blowups', 'Packs routinely exceed budget with low signal'],
      ['Instruction smuggling', 'Retrieved text alters tool policy'],
      ['Stale truth', 'Answers cite deleted APIs or old ADRs'],
      ['Hidden task', 'More context added instead of clarifying AC'],
    ],
    rootCause:
      'Retrieval without trust labels and budgets treats all tokens as equal. System-channel contamination turns data into unintended instructions.',
    nonGoals: [
      'Not a substitute for clear acceptance criteria',
      'Not infinite memory',
      'Not a license to paste production secrets',
    ],
    whenMissing: [
      'Planner/coder thrash on contradictory sources',
      'Security review finds tool allowlist changed by retrieved text',
      'Cost spikes with no quality gain',
    ],
    contextMust: [
      'Explicit task and AC',
      'Ranked sources with trust labels',
      'Size budget and prune list',
      'Separation of system instructions vs retrieved data',
    ],
    contextRefuse: [
      'Task is unclear and pack is used to compensate',
      'Untrusted web/issue text requested in system role',
      'Secrets or credentials present in candidate sources',
    ],
    failures: [
      ['Unranked dump', 'Model cites noise', 'Rebuild pack with ranking + budget'],
      ['Trust mix', 'Retrieval in system channel', 'Move to data channel; add trust labels'],
      ['Stale ADR', 'Implementation follows retired topology', 'Pin ADR versions; drop superseded docs'],
      ['Budget denial', 'Truncation deletes the only relevant file', 'Re-prioritize; split packs by phase'],
    ],
  },
  'debug-pattern': {
    title: 'Debug',
    statement:
      'Failures get shotgun patches: first plausible cause wins, intermittent bugs “clear” after restarts, and no regression proof exists for the pre-fix behavior.',
    symptoms: [
      ['Patch-first thrash', 'Multiple speculative fixes before a hypothesis list'],
      ['Works on my machine', 'Fix never verified in the failing environment'],
      ['Evidence destroyed', 'Restarts wipe logs needed for RCA'],
      ['No regression net', 'Same defect returns within a sprint'],
    ],
    rootCause:
      'Debugging under pressure rewards action over isolation. Without ranked hypotheses and a failing-env gate, teams optimize for looking busy.',
    nonGoals: [
      'Not a feature delivery track',
      'Not an excuse to skip tests “until later”',
      'Not automatic production mutation via MCP',
    ],
    whenMissing: [
      'SEVs recur with the same fingerprint',
      'Hotfixes expand blast radius',
      'Observability exists but is never consulted before coding',
    ],
    contextMust: [
      'Repro notes or production-shaped signal',
      'Relevant logs/traces/metrics (redacted)',
      'Recent changes timeline',
      'Owner who can verify in the failing environment',
    ],
    contextRefuse: [
      'No symptom definition (“it feels slow”)',
      'Write access requested before hypotheses ranked',
      'PII-bearing dumps without redaction plan',
    ],
    failures: [
      ['Single hypothesis', 'First patch fails', 'Write ≥2 ranked hypotheses before next patch'],
      ['Local-only verify', 'Prod still broken', 'Require failing-env confirmation'],
      ['Catch-and-swallow', 'Errors hidden', 'Remove swallow; add regression test'],
      ['Restart as fix', 'Fingerprint returns', 'Preserve evidence; treat restart as containment only'],
    ],
  },
  'migration-pattern': {
    title: 'Migration',
    statement:
      'Data or service moves ship as big-bang cuts: no dual-write/verify window, secrets in scripts, and irreversible drops without a rollback owner.',
    symptoms: [
      ['No return path', 'Rollback is “restore from backup someday”'],
      ['Integrity surprises', 'Parity checks appear after cutover'],
      ['Secret leakage', 'Connection strings in migration PRs'],
      ['Digest drift', 'Unpinned images/jobs run “latest”'],
    ],
    rootCause:
      'Migrations look like engineering chores until they are irreversible. Speed bias deletes verify windows that are the only safe abort.',
    nonGoals: [
      'Not a rewrite of product behavior (use Legacy Modernization)',
      'Not a license to skip security on “temporary” scripts',
      'Not MCP-driven DROP without a phase gate',
    ],
    whenMissing: [
      'Cutover war rooms become default',
      'Data class incidents during move',
      'Follow-up migrations to undo the last migration',
    ],
    contextMust: [
      'Phased plan with rollback owners',
      'Data class and access paths',
      'Parity/integrity checks defined',
      'Digest-pinned jobs and environments',
    ],
    contextRefuse: [
      'Irreversible drop scheduled without verify evidence',
      'No dual-write or shadow-read window when required by data class',
      'Write DB MCP enabled without SELECT-only start',
    ],
    failures: [
      ['Big-bang', 'Cutover fails; restore unclear', 'Insert verify window; assign rollback owner'],
      ['Secret in git', 'Credential scanned', 'Rotate; move to secret store; rewrite history policy'],
      ['Skipped parity', 'Silent data loss', 'Halt; run integrity checks; do not proceed'],
      ['Unpinned job', 'Wrong migrator version', 'Pin digests; re-run from known good'],
    ],
  },
  'legacy-modernization-pattern': {
    title: 'Legacy Modernization',
    statement:
      'Teams announce a rewrite without characterization tests or a strangler boundary, then discover parity debt after the old system is already half-deleted.',
    symptoms: [
      ['Rewrite thrash', 'Behavior diffs found late by users'],
      ['No seam owner', 'Traffic straddles old/new with no boundary map'],
      ['Doc archaeology', 'Agents drown in unranked legacy manuals'],
      ['Big-bang cut', 'Flag day replaces incremental slices'],
    ],
    rootCause:
      'Modernization is sold as greenfield speed. Without golden tests and a owned strangler seam, every slice invents behavior.',
    nonGoals: [
      'Not a pure data-center migration (use Migration)',
      'Not drive-by cleanup unrelated to the seam',
      'Not deleting legacy paths without characterization proof',
    ],
    whenMissing: [
      'Parity incidents after each release',
      'Rewrite estimates explode mid-program',
      'Two systems diverge without an owner',
    ],
    contextMust: [
      'Strangler boundary diagram and owner',
      'Characterization/golden test baseline',
      'Slice plan with behavior-preservation gates',
      'Legacy pack with trust labels (not a dump)',
    ],
    contextRefuse: [
      'Rewrite start with zero characterization coverage',
      'No named seam owner',
      'Write tools spanning legacy and modern trees in one session',
    ],
    failures: [
      ['No golden tests', 'Parity bugs in prod', 'Stop rewrite; build characterization first'],
      ['Orphan seam', 'Dual-run confusion', 'Assign boundary owner; redraw map'],
      ['Dump context', 'Agent reimplements myths', 'Rebuild legacy pack with ranking'],
      ['Flag day', 'Rollback impossible', 'Reintroduce incremental slices'],
    ],
  },
  'architecture-pattern': {
    title: 'Architecture',
    statement:
      'Topology and quality-attribute choices happen in chat, ADRs skip rejected alternatives, and trust boundaries appear only after implementation is expensive to unwind.',
    symptoms: [
      ['Architecture-by-chat', 'No durable ADR for consequential topology'],
      ['One option only', 'No rejected alternative recorded'],
      ['QA silence', 'Latency/availability/security scenarios unnamed'],
      ['Late trust map', 'AuthZ boundaries discovered in review'],
    ],
    rootCause:
      'Design work feels slower than coding. Undocumented choices create irreversible cost that looks like “just implementation debt.”',
    nonGoals: [
      'Not an implementation plan (hand off to Planner)',
      'Not a vendor bake-off slide deck',
      'Not optional for multi-service or AuthZ-changing work',
    ],
    whenMissing: [
      'Rework when non-functionals were never stated',
      'Security finds missing trust boundaries late',
      'Teams re-litigate the same topology quarterly',
    ],
    contextMust: [
      'Quality-attribute scenarios',
      'Current topology / ADR set',
      'Constraints and data class',
      'Decision deadline and approver',
    ],
    contextRefuse: [
      'Request for “best architecture” with no scenarios',
      'Implementation coding requested inside the ADR step',
      'No human who can accept rejected alternatives',
    ],
    failures: [
      ['No ADR', 'Tribal topology', 'Write ADR before more coding'],
      ['No rejects', 'Decision looks arbitrary', 'Add rejected alternatives with rationale'],
      ['Skipped threats', 'Trust holes', 'Run security skill on boundaries'],
      ['ADR as diary', 'No scenarios', 'Rewrite with QA scenarios'],
    ],
  },
  'optimization-pattern': {
    title: 'Optimization',
    statement:
      'Performance work ships on intuition: no baseline, many variables changed at once, p50 celebrated while p99 or correctness quietly regresses.',
    symptoms: [
      ['No baseline', 'Cannot prove improvement'],
      ['Multi-knob PRs', 'Cannot attribute the win/loss'],
      ['Correctness break', 'Faster path fails oracle'],
      ['Contract blind', 'p99/cost SLO ignored'],
    ],
    rootCause:
      'Optimization prestige rewards visible activity. Measurement and oracles feel like bureaucracy until a silent break hits production.',
    nonGoals: [
      'Not premature micro-opts without a measured hotspot',
      'Not a substitute for algorithmic redesign when complexity dominates',
      'Not auto-tune via MCP in production',
    ],
    whenMissing: [
      'Perf “wins” roll back after incidents',
      'Eval/quality gates fail after hot-path edits',
      'Arguments replace dashboards',
    ],
    contextMust: [
      'Baseline metric, method, and window',
      'Correctness oracle (tests/evals)',
      'Hotspot evidence (profile/trace)',
      'Guardrails (p99, error rate, cost)',
    ],
    contextRefuse: [
      'Optimize request with no baseline',
      'Production mutate tools before measurement freeze',
      'Model-facing path change without evaluation skill',
    ],
    failures: [
      ['Intuition patch', 'No before/after', 'Revert; capture baseline; retry'],
      ['Oracle skipped', 'Silent wrong answers', 'Restore tests/evals; block ship'],
      ['Moving dashboard', 'Baseline edited mid-run', 'Freeze queries; re-baseline'],
      ['p50 theater', 'p99 regresses', 'Hold to contractual guardrail'],
    ],
  },
  'enterprise-pattern': {
    title: 'Enterprise',
    statement:
      'Org-wide copilots and write MCP land without SoA, tenant isolation, or eval gates — then audits and incidents arrive together.',
    symptoms: [
      ['Tool sprawl', 'Write MCP on by default'],
      ['Tenant bleed', 'Retrieval crosses customers'],
      ['Logo compliance', 'ISO/NIST claimed from slideware'],
      ['No SoA row', 'Allowlists undocumented'],
    ],
    rootCause:
      'Enterprise AI is sold as enablement velocity. Governance artifacts feel optional until they are the only defense in an audit.',
    nonGoals: [
      'Not a conformity certificate',
      'Not a substitute for counsel on legal classification',
      'Not permission to skip HITL on irreversible effects',
    ],
    whenMissing: [
      'Security blocks org rollout late',
      'Cross-tenant data incidents',
      'Assurance teams reject “we use AIES” claims',
    ],
    contextMust: [
      'Data class and tenant model',
      'MODEL_POLICY / SoA draft rows',
      'Eval gates for user-visible behavior',
      'Named owners for allowlists',
    ],
    contextRefuse: [
      'Org-wide write tools without SoA',
      'Shared filesystem roots across tenants',
      'Compliance claims requested as marketing copy',
    ],
    failures: [
      ['Deny-by-default skipped', 'Incident via tool', 'Disable writes; write SoA; re-enable narrowly'],
      ['Tenant assumption', 'Cross-talk in retrieval', 'Add isolation tests; fix pack roots'],
      ['Eval optional', 'Regressions in prod answers', 'Make eval release-blocking'],
      ['Paper NIST', 'Auditor pushback', 'Map evidence IDs; drop logo claims'],
    ],
  },
  'release-pattern': {
    title: 'Release',
    statement:
      'Promotions skip eval gates, digests, and abort owners — big-bang ships until the rollback window is already gone.',
    symptoms: [
      ['No abort owner', 'Canary fails; nobody decides'],
      ['Unpinned artifacts', '“Latest” prompt/image drifts'],
      ['Eval bypass', 'Model-facing change ships on vibe'],
      ['Monitor lag', 'Errors noticed by users first'],
    ],
    rootCause:
      'Release pressure rewards green buttons. Progressive delivery and eval gates look slow until a bad promote is irreversible.',
    nonGoals: [
      'Not a substitute for DoD',
      'Not automatic promote via MCP status text',
      'Not optional for AI-touched user-visible paths',
    ],
    whenMissing: [
      'Hotfix follows every release',
      'Cannot answer “what digest is live?”',
      'Eval failures ignored as flaky',
    ],
    contextMust: [
      'Pinned digests (image/prompt/config)',
      'Abort criteria and owner',
      'Eval gate results',
      'Canary/monitor plan',
    ],
    contextRefuse: [
      'Promote with failing eval on AI paths',
      'No abort owner',
      'Unpinned artifacts in the release record',
    ],
    failures: [
      ['Big-bang', 'All traffic bad', 'Restore progressive canary; name abort owner'],
      ['Digest mystery', 'Cannot reproduce', 'Pin and record digests before next promote'],
      ['Eval skipped', 'Quality regression', 'Block candidates on gate failure'],
      ['Status MCP as truth', 'False “success”', 'Require human promote decision'],
    ],
  },
  'hotfix-pattern': {
    title: 'Hotfix',
    statement:
      'SEVs invite speculative coding and mass restarts: no IC, out-of-path edits, and evidence destroyed before RCA can start.',
    symptoms: [
      ['No IC', 'Multiple people mutate prod'],
      ['Path explosion', 'Hotfix PR touches unrelated modules'],
      ['Evidence wipe', 'Restarts before log capture'],
      ['Customer data in chat', 'PII pasted into incident channels'],
    ],
    rootCause:
      'Incident adrenaline rewards visible action. Containment and evidence look passive even when they are the correct first moves.',
    nonGoals: [
      'Not a feature delivery shortcut',
      'Not a full RCA (that follows containment)',
      'Not unscoped refactors during SEV',
    ],
    whenMissing: [
      'Blast radius expands during “fix”',
      'RCA impossible after the fact',
      'Repeat SEVs from the same hole',
    ],
    contextMust: [
      'Named IC',
      'Symptom + blast-radius signals',
      'Allowed path list for the hotfix',
      'Containment options (rollback/LKG/flag) evaluated',
    ],
    contextRefuse: [
      'Write tools without IC',
      'Out-of-path edits “while we are here”',
      'Unredacted customer payloads into model/MCP',
    ],
    failures: [
      ['Coding first', 'Blast radius grows', 'Stop; evaluate rollback/flag; restart with IC'],
      ['Restart storm', 'Evidence gone', 'Preserve signals; treat restart as last containment'],
      ['Scope creep PR', 'Review impossible', 'Revert out-of-path; new PR with allowlist'],
      ['No follow-up', 'Same SEV returns', 'Hand to Root Cause pattern'],
    ],
  },
  'root-cause-pattern': {
    title: 'Root Cause',
    statement:
      'After containment, teams skip evidence-bound RCA: blame replaces timeline, “fixed” means volume dipped, and no regression detector is added.',
    symptoms: [
      ['Blame RCA', 'Names without causal chain'],
      ['Volume ≠ fixed', 'Fingerprint quiet; defect remains'],
      ['No follow-ups', 'RCA closed with zero owners'],
      ['Lost chronology', 'Monitors edited mid-RCA'],
    ],
    rootCause:
      'Learning work competes with the next feature. Without a forced evidence bar, RCA becomes narrative therapy.',
    nonGoals: [
      'Not punishment',
      'Not optional documentation fluff',
      'Not automatic ticket closure via MCP summary',
    ],
    whenMissing: [
      'Repeat incidents with identical causes',
      'Auditors find no learning trail',
      'Fixes that never get a detector',
    ],
    contextMust: [
      'Containment complete (or explicitly parallel)',
      'Timeline evidence (commits, alerts, traces)',
      'Pre-fix signal definition',
      'Authority to assign follow-ups',
    ],
    contextRefuse: [
      'RCA requested as blame memo',
      'Write tools that alter historical incident records',
      'Close without regression test/detector plan',
    ],
    failures: [
      ['Narrative only', 'No citations', 'Rebuild timeline from GitHub/Sentry/Datadog'],
      ['Closed cold', 'No owners', 'Reopen; assign due dates'],
      ['Detector missing', 'Defect returns', 'Add failing test or alert before close'],
      ['Mid-RCA monitor edit', 'Baseline lost', 'Restore pre-fix queries; continue'],
    ],
  },
};

function problemMd(meta) {
  const rows = meta.symptoms.map(([s, d]) => `| ${s} | ${d} |`).join('\n');
  const nonGoals = meta.nonGoals.map(x => `- ${x}`).join('\n');
  const missing = meta.whenMissing.map(x => `- ${x}`).join('\n');
  return `# ${meta.title} Pattern — Problem

> **Pattern:** ${meta.title}  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

${meta.statement}

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
${rows}

## Root cause

${meta.rootCause}

## What breaks when this pattern is skipped

${missing}

## Non-goals of this pattern

${nonGoals}

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** ${meta.title} problem page expanded with skip-impact and operator symptoms.
`;
}

function contextMd(meta) {
  const must = meta.contextMust.map(x => `- [ ] ${x}`).join('\n');
  const refuse = meta.contextRefuse.map(x => `- ${x}`).join('\n');
  return `# ${meta.title} Pattern — Context

> **Pattern:** ${meta.title}  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the ${meta.title} pattern may start — and when to refuse to start.

## Required before activation

${must}

## Refuse to start when

${refuse}

## Trust and data class

- Label segments as trusted, internal, or untrusted for **${meta.title}** packs.  
- Keep untrusted retrieval out of the ${meta.title} system channel.  
- ${meta.title} MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for ${meta.title}

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the ${meta.title} budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible ${meta.title} steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** ${meta.title} context gates (required/refuse) rewritten for this envelope.
`;
}

function failuresMd(meta) {
  const rows = meta.failures.map(([f, d, r]) => `| ${f} | ${d} | ${r} |`).join('\n');
  return `# ${meta.title} Pattern — Failures

> **Pattern:** ${meta.title}  
> **Component:** failures.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Recover when the ${meta.title} pattern is misapplied — without abandoning the gate.

## Failure → detection → recovery

| Failure | Detection | Recovery |
|---------|-----------|----------|
${rows}

## Escalation from ${meta.title} failures

- Security-class impact during ${meta.title} → [Security skill](../../03-skill-engineering/skills/security.skill.md) + human security owner  
- Production SEV while misusing ${meta.title} → [Hotfix](../hotfix-pattern/README.md) containment first  
- Learning after ${meta.title} containment → [Root Cause](../root-cause-pattern/README.md)

## Do not

- Skip the ${meta.title} human gate “just this once” after a failure  
- Delete ${meta.title} evidence to hide a bad run  
- Replace ${meta.title} with unstructured chat under pressure  

## Related

- [Checklist](./checklist.md)  
- [Enterprise notes](./enterprise-notes.md)  
- [Example](./examples/example.md)  

## Changelog

- **1.2 (2026-07-29):** ${meta.title} failure recovery table and escalation paths expanded.
`;
}

for (const [dir, meta] of Object.entries(DATA)) {
  const folder = path.join(patternsRoot, dir);
  fs.writeFileSync(path.join(folder, 'problem.md'), problemMd(meta));
  fs.writeFileSync(path.join(folder, 'context.md'), contextMd(meta));
  fs.writeFileSync(path.join(folder, 'failures.md'), failuresMd(meta));
  console.log(`Deepened pages: ${dir}`);
}

console.log('Done — problem/context/failures deepened for 12 patterns.');
