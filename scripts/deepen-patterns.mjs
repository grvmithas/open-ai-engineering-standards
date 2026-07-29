#!/usr/bin/env node
/**
 * Deepen all 12 patterns: skills.md with hard links, mcps.md recommendations,
 * and append Tradeoffs/Anti-patterns to README if missing.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const patternsRoot = path.join(root, 'content/patterns');

const PATTERNS = {
  'planner-pattern': {
    title: 'Planner',
    skills: [
      ['Architecture', 'architecture.skill.md', 'Topology options, quality attributes, ADR-quality decisions'],
      ['Planning', 'planning.skill.md', 'Ordered increments, dependencies, verification, rollback'],
      ['Context', 'context.skill.md', 'Minimal high-signal packages before planning'],
    ],
    agents: [
      ['Planner agent', './agent.md'],
      ['Architect agent', '../../04-agent-engineering/agents/architect.agent.md'],
    ],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Issues/PRs for plan evidence'],
      ['Filesystem', 'mcps/infrastructure-data/filesystem.mcp.md', 'Read scoped roots for context packs'],
      ['Linear / Jira', 'mcps/project-management/linear.mcp.md', 'Optional — ticket linkage (enable after allowlist)'],
    ],
    activation:
      'Run Architecture while topology or quality attributes are open. Run Planning only after acceptance criteria are locked and the change spans more than one ownership boundary. Run Context when the working pack exceeds budget or lacks trust labels.',
    verification: [
      'Every plan row names files, owner, verification command, and rollback',
      'Coding agents were not started before the plan gate',
      'Open architecture questions produced ADR-quality options, not a task dump',
    ],
    mcpWhen:
      'Turn on GitHub/Filesystem only when ticket history or scoped tree reads are required to finish the plan. Ticket MCPs stay off until allowlisted.',
    mcpRule1: 'Keep planning MCPs read-only until the human approval footer is signed',
    mcpRule4: 'Disable ticket write tools before any coder agent starts',
    mcpAntipatterns: [
      'Using MCP issue text as a substitute for locked acceptance criteria',
      'Leaving Linear/Jira write scopes enabled after the plan gate',
      'Pulling confidential ticket attachments into the planner context without data-class review',
    ],
    tradeoffs: 'A decision-complete plan slows start of coding but prevents thrash on multi-file work. Over-planning a one-file fix wastes calendar time.',
    antipatterns: 'Task dumps without files/verification; planning without locked AC; smuggling ADRs into the plan; coding mid-plan.',
  },
  'reviewer-pattern': {
    title: 'Reviewer',
    skills: [
      ['Code review', 'code-review.skill.md', 'Severity-calibrated findings humans can own'],
      ['Security', 'security.skill.md', 'AuthZ, injection, secrets, tool allowlists'],
      ['Debug', 'debug.skill.md', 'When findings need repro before Block'],
    ],
    agents: [
      ['Reviewer agent', './agent.md'],
      ['Security agent', '../../04-agent-engineering/agents/security.agent.md'],
    ],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Diff/PR context'],
      ['Filesystem', 'mcps/infrastructure-data/filesystem.mcp.md', 'Read files cited in findings'],
    ],
    activation:
      'Run Code review on every AI-touched PR. Escalate to Security when AuthZ, secrets, injection, or tool allowlists change. Escalate to Debug only when a finding needs a failing repro before severity can be set.',
    verification: [
      'Each finding cites path:line a human can open',
      'Critical/High security findings block merge until owned',
      'Approve is never issued solely because CI is green',
    ],
    mcpWhen:
      'Enable GitHub for the PR diff under review. Enable Filesystem only to open paths cited in findings — not to browse the whole monorepo.',
    mcpRule1: 'Reviewer MCPs stay read-only; never merge or comment via tool without HITL',
    mcpRule4: 'Revoke filesystem roots that are outside the PR file list',
    mcpAntipatterns: [
      'Approving because an MCP “summary” looked clean',
      'Letting the reviewer agent post merge comments autonomously',
      'Expanding filesystem roots beyond the changed paths',
    ],
    tradeoffs: 'Five-pass review is slower than vibe checks; merge throughput drops, undetected AuthZ defects drop more.',
    antipatterns: 'Approve because tests pass; invent path:line; AI as merge authority; rubber-stamp with open Critical/High.',
  },
  'context-pattern': {
    title: 'Context',
    skills: [
      ['Context', 'context.skill.md', 'Trust labels, budgets, pruning'],
      ['Security', 'security.skill.md', 'Injection boundaries for retrieved content'],
      ['Documentation', 'documentation.skill.md', 'When packing docs as evidence'],
    ],
    agents: [['Context engineer', '../../04-agent-engineering/agents/context-engineer.agent.md']],
    mcps: [
      ['Filesystem', 'mcps/infrastructure-data/filesystem.mcp.md', 'Scoped reads only'],
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Optional — prior PR context'],
    ],
    activation:
      'Run Context whenever retrieval or packing precedes generation. Run Security when untrusted text enters the pack. Run Documentation only when packing published specs or ADRs as evidence, not chat residue.',
    verification: [
      'Every pack segment has a trust label and size budget',
      'Untrusted retrieval never sits in the system-instruction channel',
      'Pruned items are listed so humans can restore signal deliberately',
    ],
    mcpWhen:
      'Filesystem MCP is the default for scoped reads. GitHub is optional only when prior PR discussion is part of the evidence package.',
    mcpRule1: 'Bound filesystem roots to the pack budget before the first read',
    mcpRule4: 'Drop remote MCP content that lacks a trust label before packing',
    mcpAntipatterns: [
      'Dumping MCP search hits into the system channel',
      'Treating issue comments as trusted architecture truth',
      'Expanding context via MCP to hide an unclear task',
    ],
    tradeoffs: 'Curated packs cost retrieval engineering; dumping the repo is cheaper until stale/untrusted text poisons answers.',
    antipatterns: 'Unranked search hits; mixing system instructions with untrusted retrieval; expanding context to hide unclear tasks.',
  },
  'debug-pattern': {
    title: 'Debug',
    skills: [
      ['Debug', 'debug.skill.md', 'Hypothesis-driven isolation'],
      ['Testing', 'testing.skill.md', 'Regression tests that prove the fix'],
      ['Observability', 'observability.skill.md', 'Metrics/traces for prod repro'],
    ],
    agents: [['Coder agent (debug mode)', '../../04-agent-engineering/agents/coder.agent.md']],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Issue/repro links'],
      ['Sentry', 'mcps/observability/sentry.mcp.md', 'Error fingerprints (read-only first)'],
      ['Datadog', 'mcps/observability/datadog.mcp.md', 'Optional — latency/error signals'],
    ],
    activation:
      'Run Debug before any patch when the failure is unexplained. Run Observability when the only reliable repro is production-shaped. Run Testing as soon as a hypothesis is confirmed so the fix cannot regress silently.',
    verification: [
      'At least two ranked hypotheses existed before the first patch',
      'Fix is verified in the failing environment, not only locally',
      'A regression test or monitor would fail on the pre-fix behavior',
    ],
    mcpWhen:
      'Sentry/Datadog stay read-only until hypotheses are ranked. GitHub links the issue/repro; do not patch via MCP.',
    mcpRule1: 'Observability MCPs are evidence sources, not auto-remediation',
    mcpRule4: 'Disable any write/restart tool until containment is an explicit IC decision',
    mcpAntipatterns: [
      'Restarting pods through MCP to “clear” an intermittent bug',
      'Pasting full PII-bearing stack traces into the model without redaction',
      'Declaring fixed because the error fingerprint volume dipped once',
    ],
    tradeoffs: 'Hypothesis sets cost wall-clock before the first patch; shotgun fixes mask intermittent failures.',
    antipatterns: 'Patch first cause; catch-and-swallow; declare fixed without failing-env verification; no regression test.',
  },
  'migration-pattern': {
    title: 'Migration',
    skills: [
      ['Planning', 'planning.skill.md', 'Phased cutover with rollback'],
      ['DevOps', 'devops.skill.md', 'Promotion, digests, canaries'],
      ['Testing', 'testing.skill.md', 'Parity and data integrity checks'],
      ['Security', 'security.skill.md', 'Data class and access during move'],
    ],
    agents: [
      ['Migration agent', '../../04-agent-engineering/agents/migration.agent.md'],
      ['Planner pattern agent', '../planner-pattern/agent.md'],
    ],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'PR/plan evidence'],
      ['PostgreSQL', 'mcps/infrastructure-data/postgresql.mcp.md', 'Schema/data checks (read-only first)'],
      ['Docker', 'mcps/infrastructure-data/docker.mcp.md', 'Optional — local migrate jobs'],
      ['Kubernetes', 'mcps/infrastructure-data/kubernetes.mcp.md', 'Optional — cutover workloads'],
    ],
    activation:
      'Run Planning to freeze phases and return paths. Run DevOps for digest-pinned promotion and canaries. Run Testing for parity/integrity windows. Run Security whenever data class or access paths change mid-move.',
    verification: [
      'Each phase has an explicit rollback owner and command',
      'Dual-write or verify window evidence exists before irreversible drops',
      'Secrets never appear in migration scripts committed to git',
    ],
    mcpWhen:
      'PostgreSQL/Docker/Kubernetes MCPs are for read-only parity checks and rollout status — never for irreversible drops without a signed phase gate.',
    mcpRule1: 'Database MCP starts SELECT-only; DDL requires an approved phase ticket',
    mcpRule4: 'Revoke cluster write tools before the verify window ends',
    mcpAntipatterns: [
      'Running DROP via MCP because the dual-write “looked fine”',
      'Embedding connection strings in MCP config committed to git',
      'Skipping digest pins because the local migrate job succeeded',
    ],
    tradeoffs: 'Safe migrations with return paths are slower than big-bang cuts; big-bang wins until rollback is impossible.',
    antipatterns: 'No dual-write/verify window; secrets in migration scripts; irreversible drop without approval.',
  },
  'legacy-modernization-pattern': {
    title: 'Legacy Modernization',
    skills: [
      ['Architecture', 'architecture.skill.md', 'Strangler seams and boundaries'],
      ['Planning', 'planning.skill.md', 'Incremental slices with behavior preservation'],
      ['Testing', 'testing.skill.md', 'Characterization and golden tests'],
      ['Context', 'context.skill.md', 'Legacy doc packs without noise'],
    ],
    agents: [
      ['Architect agent', '../../04-agent-engineering/agents/architect.agent.md'],
      ['Migration agent', '../../04-agent-engineering/agents/migration.agent.md'],
    ],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'History and PR evidence'],
      ['Filesystem', 'mcps/infrastructure-data/filesystem.mcp.md', 'Legacy tree reads'],
    ],
    activation:
      'Run Architecture to own the strangler boundary before slicing. Run Characterization Testing before behavior-preserving moves. Run Planning for incremental ownership cuts. Run Context to pack legacy docs without drowning the model.',
    verification: [
      'Characterization or golden tests cover the seam before rewrite slices',
      'Each slice names the strangler boundary owner',
      'Rewrite work never starts without a behavior-preservation gate',
    ],
    mcpWhen:
      'Filesystem reads the legacy tree; GitHub supplies history. No deploy MCP until a strangler slice has characterization coverage.',
    mcpRule1: 'Legacy modernization MCPs stay read-only during discovery',
    mcpRule4: 'Do not enable write MCP across both legacy and modern trees in one session',
    mcpAntipatterns: [
      'Rewriting modules discovered only via unranked MCP search',
      'Deleting legacy paths through tools without golden-test proof',
      'Mixing modernization and migration cutover tools in one agent turn',
    ],
    tradeoffs: 'Strangler seams cost dual-running complexity; rewrites look faster until parity debt explodes.',
    antipatterns: 'Big-bang rewrite without characterization tests; modernizing without owning the strangler boundary.',
  },
  'architecture-pattern': {
    title: 'Architecture',
    skills: [
      ['Architecture', 'architecture.skill.md', 'Scenario-governed design'],
      ['Security', 'security.skill.md', 'Trust boundaries and threat notes'],
      ['Planning', 'planning.skill.md', 'When design must become an executable plan'],
    ],
    agents: [['Architect agent', '../../04-agent-engineering/agents/architect.agent.md']],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'ADR PRs'],
      ['Filesystem', 'mcps/infrastructure-data/filesystem.mcp.md', 'Read existing topology docs'],
    ],
    activation:
      'Run Architecture when topology or quality-attribute scenarios are undecided. Run Security when trust boundaries or threat notes are missing. Hand off to Planning only after the ADR rejects alternatives explicitly.',
    verification: [
      'ADR records at least one rejected alternative with rationale',
      'Quality-attribute scenarios are named, not implied',
      'Trust boundaries appear before implementation planning',
    ],
    mcpWhen:
      'Filesystem loads existing ADRs/topology docs; GitHub opens the ADR PR. Architecture work does not need cluster write tools.',
    mcpRule1: 'Architecture MCP is documentation and history — not infrastructure mutation',
    mcpRule4: 'Close filesystem roots once the ADR draft cites its sources',
    mcpAntipatterns: [
      'Inventing topology because MCP could not find the current diagram',
      'Merging ADRs via tool without the architecture review gate',
      'Skipping rejected alternatives because search returned one popular blog',
    ],
    tradeoffs: 'Scenario-governed ADRs slow start; undocumented topology choices create irreversible cost later.',
    antipatterns: 'Architecture-by-chat; skipping rejected alternatives; no quality-attribute scenarios.',
  },
  'optimization-pattern': {
    title: 'Optimization',
    skills: [
      ['Performance', 'performance.skill.md', 'Profile-guided changes'],
      ['Testing', 'testing.skill.md', 'Correctness oracle while optimizing'],
      ['Observability', 'observability.skill.md', 'Baselines and guardrail metrics'],
      ['Evaluation', 'evaluation.skill.md', 'When the optimized path is model-facing'],
    ],
    agents: [['Observability agent', '../../04-agent-engineering/agents/observability.agent.md']],
    mcps: [
      ['Datadog', 'mcps/observability/datadog.mcp.md', 'Latency/error baselines'],
      ['Grafana', 'mcps/observability/grafana.mcp.md', 'Optional dashboards'],
      ['Sentry', 'mcps/observability/sentry.mcp.md', 'Error regression watch'],
    ],
    activation:
      'Run Performance only after a measured baseline exists. Keep Testing as the correctness oracle while changing hot paths. Use Observability for guardrail metrics. Use Evaluation when the optimized path is model-facing or prompt/tool related.',
    verification: [
      'Baseline metric and method are recorded before the first change',
      'Correctness oracle still passes after the optimization',
      'p99 or cost guardrails were reviewed if contractual',
    ],
    mcpWhen:
      'Datadog/Grafana/Sentry provide baselines and regression watch. Enable them before changing hot paths; keep write/deploy tools off.',
    mcpRule1: 'Optimization MCPs are measurement planes — never auto-tune production',
    mcpRule4: 'Freeze dashboard queries that define the baseline so they cannot silently change mid-run',
    mcpAntipatterns: [
      'Optimizing against a dashboard that was edited during the experiment',
      'Shipping a hot-path change because p50 improved while p99 was ignored',
      'Using MCP to mutate feature flags without a correctness oracle',
    ],
    tradeoffs: 'Measure-first optimization is slower than intuition tweaks; intuition wins until you ship a silent correctness break.',
    antipatterns: 'Optimize without baseline; change many variables; raise p99 without contractual review.',
  },
  'enterprise-pattern': {
    title: 'Enterprise',
    skills: [
      ['Security', 'security.skill.md', 'Least privilege, injection, tool PEP'],
      ['Evaluation', 'evaluation.skill.md', 'Org-wide quality gates'],
      ['DevOps', 'devops.skill.md', 'Promotion controls and evidence'],
      ['Context', 'context.skill.md', 'Tenant isolation in retrieval'],
    ],
    agents: [
      ['Security agent', '../../04-agent-engineering/agents/security.agent.md'],
      ['Release agent', '../../04-agent-engineering/agents/release.agent.md'],
    ],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Change evidence'],
      ['Slack / Teams', 'mcps/communication/slack.mcp.md', 'Optional — incident/comms (allowlist)'],
      ['Jira / Linear', 'mcps/project-management/jira.mcp.md', 'Optional — control tickets'],
      ['OpenTelemetry', 'mcps/observability/opentelemetry.mcp.md', 'Optional — tenant-aware traces'],
    ],
    activation:
      'Run Security before enabling org-wide tools or write MCP. Run Evaluation for release-blocking quality gates. Run DevOps for promotion evidence. Run Context whenever retrieval can cross tenants.',
    verification: [
      'SoA / MODEL_POLICY records tool allowlists and data class',
      'Write MCP tools are off by default until HITL approval',
      'Tenant isolation is tested, not assumed, for retrieval paths',
    ],
    mcpWhen:
      'Enable org MCPs only after SoA rows exist. Slack/Jira stay optional; OpenTelemetry is for tenant-aware traces, not chat ops.',
    mcpRule1: 'Enterprise MCP defaults to deny; each server needs an allowlist owner',
    mcpRule4: 'Strip write tools from any server that can touch confidential tenants',
    mcpAntipatterns: [
      'Org-wide MCP enablement without a Statement of Applicability row',
      'Claiming ISO/NIST progress because a logo MCP connector exists',
      'Cross-tenant retrieval through a shared filesystem MCP root',
    ],
    tradeoffs: 'Governed multi-tenant AI is slower to enable; ungated copilots look faster until audit/incident costs arrive.',
    antipatterns: 'Org-wide tool rollout without SoA; write MCP by default; claiming ISO/NIST compliance from logos.',
  },
  'release-pattern': {
    title: 'Release',
    skills: [
      ['DevOps', 'devops.skill.md', 'Progressive delivery and abort'],
      ['Evaluation', 'evaluation.skill.md', 'Release-blocking eval gates'],
      ['Observability', 'observability.skill.md', 'Canary signals'],
      ['Security', 'security.skill.md', 'Pre-prod threat pass when AI-touched'],
    ],
    agents: [['Release agent', '../../04-agent-engineering/agents/release.agent.md']],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Release PRs / tags'],
      ['Kubernetes', 'mcps/infrastructure-data/kubernetes.mcp.md', 'Optional — rollout status'],
      ['Docker', 'mcps/infrastructure-data/docker.mcp.md', 'Optional — image digests'],
      ['Sentry', 'mcps/observability/sentry.mcp.md', 'Post-release error watch'],
    ],
    activation:
      'Run Evaluation as a release-blocking gate for AI-touched paths. Run DevOps for progressive delivery and abort criteria. Run Observability for canary signals. Run Security for a pre-prod threat pass when prompts, tools, or AuthZ changed.',
    verification: [
      'Abort owner and criteria are named before promote',
      'Image/prompt digests are pinned in the release record',
      'Eval gate failure blocks candidate promotion',
    ],
    mcpWhen:
      'GitHub/Docker for digests and tags; Kubernetes for rollout status; Sentry for post-release watch. Promote remains a human decision.',
    mcpRule1: 'Release MCPs report status — they do not own the abort call',
    mcpRule4: 'Disable cluster mutate tools after canary starts unless abort is invoked',
    mcpAntipatterns: [
      'Promoting because MCP said the rollout “succeeded” without eval evidence',
      'Unpinning digests to “just get it out”',
      'Skipping abort-owner assignment when using Kubernetes MCP',
    ],
    tradeoffs: 'Canaries and abort criteria slow promote; big-bang ships until rollback windows disappear.',
    antipatterns: 'Promote without eval gate; no abort owner; digests unpinned.',
  },
  'hotfix-pattern': {
    title: 'Hotfix',
    skills: [
      ['Debug', 'debug.skill.md', 'Fast characterization under pressure'],
      ['DevOps', 'devops.skill.md', 'Rollback / LKG / flags'],
      ['Security', 'security.skill.md', 'When incident is security-class'],
      ['Observability', 'observability.skill.md', 'Blast-radius signals'],
    ],
    agents: [['Incident response agent', '../../04-agent-engineering/agents/incident-response.agent.md']],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Hotfix PR with allowed paths'],
      ['Sentry', 'mcps/observability/sentry.mcp.md', 'Error fingerprint / volume'],
      ['Slack', 'mcps/communication/slack.mcp.md', 'Optional — IC channel (read/write carefully)'],
      ['Kubernetes', 'mcps/infrastructure-data/kubernetes.mcp.md', 'Optional — restart/rollout'],
    ],
    activation:
      'Name an IC first. Run Debug for fast characterization without destroying evidence. Prefer DevOps rollback/LKG/flags before speculative patches. Escalate Security when the SEV is security-class. Watch Observability for blast-radius expansion.',
    verification: [
      'IC and allowed paths are recorded before the hotfix PR',
      'Containment or rollback was evaluated before net-new code',
      'Evidence needed for RCA was preserved (not wiped by restarts)',
    ],
    mcpWhen:
      'Sentry/Slack/Kubernetes support the IC. Prefer rollback tools over speculative restarts that destroy evidence.',
    mcpRule1: 'Hotfix MCP write tools require a named IC in the session header',
    mcpRule4: 'Narrow GitHub path filters to the approved hotfix paths only',
    mcpAntipatterns: [
      'Mass pod restarts via MCP before capturing logs/fingerprints',
      'Editing out-of-path files because the agent “saw related code”',
      'Posting customer data into Slack MCP channels during the SEV',
    ],
    tradeoffs: 'Containment-first slows feature work during SEV; coding first expands blast radius.',
    antipatterns: 'Hotfix without IC; speculative restarts destroying evidence; out-of-path file edits.',
  },
  'root-cause-pattern': {
    title: 'Root Cause',
    skills: [
      ['Debug', 'debug.skill.md', 'Evidence-bound causal chain'],
      ['Documentation', 'documentation.skill.md', 'RCA retention'],
      ['Testing', 'testing.skill.md', 'Regression that would have caught it'],
      ['Observability', 'observability.skill.md', 'Signal → cause linkage'],
    ],
    agents: [['Knowledge agent', '../../04-agent-engineering/agents/knowledge.agent.md']],
    mcps: [
      ['GitHub', 'mcps/version-control/github.mcp.md', 'Timeline commits/PRs'],
      ['Sentry', 'mcps/observability/sentry.mcp.md', 'Error chronology'],
      ['Datadog', 'mcps/observability/datadog.mcp.md', 'Optional — metric inflection'],
    ],
    activation:
      'Run after containment. Use Debug to bind cause to evidence. Use Observability to connect signals to that cause. Use Testing for the regression that would have caught it. Use Documentation so the RCA survives the next on-call rotation.',
    verification: [
      'Causal chain cites timeline evidence, not blame',
      'Follow-up owners and due dates exist before RCA close',
      'A regression test or detector would fail on the pre-fix defect',
    ],
    mcpWhen:
      'GitHub/Sentry/Datadog reconstruct the timeline after containment. RCA MCPs stay read-only; documentation is a human-owned artifact.',
    mcpRule1: 'Root-cause MCP is chronology — not automatic ticket closure',
    mcpRule4: 'Do not enable write tools that can alter historical incident records',
    mcpAntipatterns: [
      'Closing the RCA because MCP “summarized” the outage',
      'Editing production monitors mid-RCA and losing the pre-fix signal',
      'Skipping follow-up owners because the fingerprint volume returned to baseline',
    ],
    tradeoffs: 'Evidence-bound RCA costs calendar time after containment; skipping it guarantees recurrence.',
    antipatterns: 'Blame without timeline; “fixed” without regression test; closing RCA without follow-up owners.',
  },
};

function skillsMd(meta) {
  const rows = meta.skills
    .map(
      ([name, file, why]) =>
        `| [${name}](../../03-skill-engineering/skills/${file}) | [\`skills/${file}\`](../../03-skill-engineering/skills/${file}) | ${why} |`,
    )
    .join('\n');
  const agents = meta.agents.map(([n, p]) => `- [${n}](${p})`).join('\n');
  const verification = meta.verification.map(line => `- ${line}`).join('\n');
  return `# ${meta.title} Pattern — Skills

> **Pattern:** ${meta.title}  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
${rows}

## Related agents

${agents}

## Skill activation triggers

${meta.activation}

## Verification that skills worked

${verification}

## Changelog

- **1.3 (2026-07-29):** ${meta.title} skill activation and verification rewritten for this envelope.
`;
}

function mcpsMd(meta) {
  const rows = meta.mcps
    .map(([name, file, why]) => {
      const href = file.startsWith('../../') ? file : `../../${file}`;
      return `| [${name}](${href}) | ${why} |`;
    })
    .join('\n');
  return `# ${meta.title} Pattern — MCP recommendations

> **Pattern:** ${meta.title}  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **${meta.title}** pattern. Keep \`mcpServers: {}\` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
${rows}

## When to enable for ${meta.title}

${meta.mcpWhen}

## Enable rules (this pattern)

1. ${meta.mcpRule1}
2. Never commit tokens; map secrets outside git  
3. ${meta.title} allowlists must name data class before any write tool  
4. ${meta.mcpRule4}

## Anti-patterns

${meta.mcpAntipatterns.map(line => `- ${line}`).join('\n')}

## Checklist

- [ ] ${meta.title} MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the ${meta.title.toLowerCase()} gate  
- [ ] Injection / tool PEP reviewed if tools can act
`;
}

function ensureReadmeSections(readmePath, meta) {
  let text = fs.readFileSync(readmePath, 'utf8');
  if (!text.includes('## Tradeoffs')) {
    const block = `
## Tradeoffs

${meta.tradeoffs}

## Anti-patterns

${meta.antipatterns}

## Artifact index

| Artifact | Path |
|----------|------|
| Prompt | [prompt.md](./prompt.md) |
| Agent | [agent.md](./agent.md) |
| Skills | [skills.md](./skills.md) |
| MCPs | [mcps.md](./mcps.md) |
| Hooks | [hooks.md](./hooks.md) |
| Checklist | [checklist.md](./checklist.md) |
| Example | [examples/example.md](./examples/example.md) |
`;
    // Insert before Changelog if present, else append
    if (text.includes('## Changelog')) {
      text = text.replace('## Changelog', `${block}\n## Changelog`);
    } else {
      text = `${text.trimEnd()}\n${block}\n`;
    }
  }
  if (!text.includes('./mcps.md') && text.includes('## Artifact index')) {
    // already added
  }
  // bump version line if present
  text = text.replace(/\*\*Updated:\*\* 2026-07-16/, '**Updated:** 2026-07-29');
  text = text.replace(/\*\*Version:\*\* 1\.2/, '**Version:** 1.3');
  fs.writeFileSync(readmePath, text);
}

for (const [dir, meta] of Object.entries(PATTERNS)) {
  const folder = path.join(patternsRoot, dir);
  fs.writeFileSync(path.join(folder, 'skills.md'), skillsMd(meta));
  fs.writeFileSync(path.join(folder, 'mcps.md'), mcpsMd(meta));
  ensureReadmeSections(path.join(folder, 'README.md'), meta);
  console.log(`Updated ${dir}`);
}

console.log('Done — 12 patterns deepened.');
