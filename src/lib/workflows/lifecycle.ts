import type { WorkflowStage } from './types';

function p(title: string, file: string, why?: string) {
  return { title, slug: `08-ai-sdlc/prompts/${file}`, why };
}

function s(title: string, file: string, why?: string) {
  return { title, slug: `03-skill-engineering/skills/${file}`, why };
}

function doc(title: string, slug: string, why?: string) {
  return { title, slug, why };
}

export const LIFECYCLE_WORKFLOWS: WorkflowStage[] = [
  {
    id: 'idea',
    title: 'Idea',
    slug: 'idea',
    goal: 'Turn a raw product or engineering idea into a bounded initiative with explicit non-goals, success metrics, and an initial risk tier before any repo work starts.',
    whenToUse: [
      'A stakeholder wants "AI for X" without a measurable outcome',
      'You need a one-page brief before allocating engineers or model budget',
      'Risk tier is unknown and must gate how much AI autonomy is allowed',
      'Multiple ideas compete and you need kill criteria, not a backlog dump',
    ],
    steps: [
      'Write the problem in one sentence; reject ideas that only describe a model or a UI.',
      'List users, jobs-to-be-done, and hard constraints (data class, latency, compliance, cost ceiling).',
      'Define 2–4 success metrics that a human can verify in production within 30 days.',
      'Write non-goals in the same document — what you will not build this cycle.',
      'Assign an initial risk tier (internal tool / customer-facing / regulated data) using handbook/aidlc-roles-and-evolving-delivery.',
      'Run story-kickoff.prompt to produce a structured brief; human edits until scope is stable.',
      'Get sponsor sign-off before creating epics or opening a kickoff repo checklist.',
    ],
    decisions: [
      'Build vs buy vs prompt-only prototype for the first slice',
      'Risk tier and whether AI agents may touch production data paths',
      'Which metric is the go/no-go for continuing past kickoff',
      'Owner accountable for scope changes (PM, not the coding agent)',
    ],
    evidence: [
      'One-page brief with problem, users, metrics, non-goals',
      'Named sponsor and accountable AIDLC roles',
      'Initial risk tier recorded in the initiative change log',
      'Kill criteria if metrics are not met by a dated review',
    ],
    roleNext: [
      { role: 'PM', action: 'Own the brief, metrics, and non-goals; block coding until sponsor signs.' },
      { role: 'Architect', action: 'Flag data-class and integration risks that change the risk tier.' },
      { role: 'Engineer', action: 'Challenge vagueness; demand testable acceptance language before estimating.' },
      { role: 'Engineering Manager', action: 'Confirm capacity and whether the initiative competes with committed work.' },
    ],
    inputs: [
      'Problem statement or stakeholder ask',
      'Known constraints (budget, timeline, data residency, model policy)',
      'Risk appetite and compliance context',
    ],
    outputs: [
      'Approved one-page brief',
      'Success metrics and kill criteria',
      'Initial risk tier and owner map',
    ],
    prompts: [
      p('Story kickoff', 'story-kickoff.prompt', 'Forces problem, users, metrics, and non-goals into a reviewable brief.'),
    ],
    skills: [
      s('Planning', 'planning.skill', 'Structures initiative scope before any implementation plan exists.'),
    ],
    mcps: [],
    tooling: [
      doc('AIDLC roles & evolving delivery', 'handbook/aidlc-roles-and-evolving-delivery', 'Maps who owns scope, risk tier, and sign-off.'),
      doc('Skills vs prompts vs agents', 'handbook/skills-vs-prompts-vs-agents', 'Stops teams from spinning agents when a prompt or skill is enough.'),
      doc('Definition of Ready', '08-ai-sdlc/quality-standards/definition-of-ready', 'Exit bar for leaving Idea into Kickoff.'),
    ],
    agents: [
      doc('Planner pattern', 'patterns/planner-pattern/README', 'Use only to structure the brief — not to invent product scope.'),
      doc('Research agent', '04-agent-engineering/agents/research.agent', 'Optional competitive or domain research with human synthesis.'),
    ],
    hitlGates: [
      'Sponsor signs scope, metrics, and non-goals',
      'Risk tier assigned before any AI coding or MCP enablement',
    ],
    automation: [
      'Generate brief scaffold via story-kickoff.prompt',
      'Link related cookbook examples once stack is known',
      'Create initiative change-log entry from the approved brief',
    ],
    enterprise: [
      'Map initiative to workload classification before model spend',
      'Record decision in an auditable change log, not chat',
      'If regulated data is in scope, involve security before kickoff',
    ],
    mistakes: [
      'Skipping non-goals and letting the agent expand scope',
      'Confusing a model demo with a product initiative',
      'Assigning risk tier after code already exists',
    ],
    nextStage: 'project-kickoff',
  },

  {
    id: 'project-kickoff',
    title: 'Project Kickoff',
    slug: 'project-kickoff',
    goal: 'Align repo, context package, hooks, and model/tool policy so the team has a Definition of Ready before architecture deepens.',
    whenToUse: [
      'Brief is approved and a repo (or monorepo path) will host the work',
      'Team IDE/model policy is unset or inconsistent across contributors',
      'No CLAUDE.md / project rules / secrets boundaries exist yet',
      'You need hooks and context before the first architecture ADR',
    ],
    steps: [
      'Confirm repo access, branch protection, and secret scanning are on.',
      'Install AIES kit baseline (rules, CLAUDE.md template, stack skill pointer) for the chosen IDE.',
      'Build a context package: system map, data classes, allowed MCPs, forbidden paths.',
      'Wire pre-planning.hook.sh; do not enable broad tool access yet.',
      'Document model providers allowed for this initiative and data that must never enter prompts.',
      'Assign AIDLC roles (PM, Architect, Engineer, Reviewer) with named humans.',
      'Pass Definition of Ready before scheduling architecture workshops.',
    ],
    decisions: [
      'Which IDEs and models are approved for this repo',
      'Which MCPs are allowlisted vs deferred',
      'Where the context package lives and who updates it',
      'Hook policy: which gates are blocking vs advisory',
    ],
    evidence: [
      'Context package committed and linked from README',
      'Hook baseline installed (at least pre-planning)',
      'Named owners for context, secrets, and model policy',
      'Definition of Ready checklist marked complete',
    ],
    roleNext: [
      { role: 'PM', action: 'Confirm DoR; keep backlog frozen until architecture owns boundaries.' },
      { role: 'Architect', action: 'Draft the initial system map and data-class inventory in the context package.' },
      { role: 'Engineer', action: 'Install IDE rules/hooks and verify the harness runs locally.' },
      { role: 'DevOps', action: 'Enable secret scanning, branch protection, and CI skeleton.' },
    ],
    inputs: [
      'Approved brief and risk tier',
      'Repo access and team roster',
      'IDE + model policy constraints',
    ],
    outputs: [
      'Kickoff checklist complete',
      'Committed context package',
      'Hook and secrets baseline',
    ],
    prompts: [
      p('Implementation plan', 'implementation-plan.prompt', 'Optional early scaffold only — full plan comes after architecture.'),
      p('Documentation', 'documentation.prompt', 'Bootstrap README / CLAUDE.md / onboarding docs from the context package.'),
    ],
    skills: [
      s('Context', 'context.skill', 'Builds the minimal high-signal package agents must respect.'),
      s('Documentation', 'documentation.skill', 'Keeps kickoff artifacts living in-repo, not in slides.'),
    ],
    mcps: [
      doc('Filesystem MCP', 'mcps/infrastructure-data/filesystem.mcp', 'Controlled local file access once allowlisted — not a substitute for context packages.'),
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Repo metadata and PR scaffolding after branch protection exists.'),
      doc('Jira MCP', 'mcps/project-management/jira.mcp', 'Optional: sync epics only after DoR — never invent scope from tickets alone.'),
    ],
    tooling: [
      doc('How to give context', 'handbook/how-to-give-context', 'Practical context packaging for agents.'),
      doc('Hooks overview', '04-agent-engineering/hooks/README', 'Install and configure the hook set.'),
      doc('pre-planning hook', '04-agent-engineering/hooks/README', 'Blocks coding agents from skipping plan gates.'),
      doc('CLAUDE.md template', '02-context-engineering/templates/CLAUDE.md.template', 'Repo harness baseline for Claude Code / compatible setups.'),
      doc('Definition of Ready', '08-ai-sdlc/quality-standards/definition-of-ready', 'Exit criteria for kickoff.'),
      doc('MCP when and how', 'handbook/mcp-when-and-how', 'Allowlist discipline before enabling tools.'),
    ],
    agents: [
      doc('Context pattern', 'patterns/context-pattern/README', 'Primary pattern for kickoff context packages.'),
      doc('Context engineer agent', '04-agent-engineering/agents/context-engineer.agent', 'Assists packaging; human owns accuracy.'),
      doc('Planner agent', '04-agent-engineering/agents/planner.agent', 'May draft kickoff task lists — not product decisions.'),
    ],
    hitlGates: [
      'Tech lead approves context package and tool/MCP allowlist',
      'Security (or delegate) confirms secrets and PII boundaries',
    ],
    automation: [
      'Generate CLAUDE.md / project rules from templates',
      'Wire pre-planning.hook.sh in CI and local agent runners',
      'Seed issue labels for risk tier and AIDLC role',
    ],
    enterprise: [
      'Inventory models and data classes touched before first PR',
      'Assign accountable owner per AIDLC role with backup',
      'Record MCP allowlist in the same place auditors can find ADRs',
    ],
    mistakes: [
      'Starting coding without Definition of Ready',
      'Omitting secrets and PII boundaries from the context package',
      'Enabling every MCP "just in case"',
    ],
    nextStage: 'architecture',
  },

  {
    id: 'architecture',
    title: 'Architecture',
    slug: 'architecture',
    goal: 'Produce ADRs, interface contracts, and threat-model sketches that bound what AI agents may invent during implementation.',
    whenToUse: [
      'Kickoff context package exists and DoR is met',
      'New services, data stores, or external integrations are in play',
      'NFRs (security, scale, cost, latency) will constrain design choices',
      'You need agent-enforceable boundaries before planning tickets',
    ],
    steps: [
      'Restate constraints from the brief and context package; reject silent scope growth.',
      'Enumerate candidate architectures; pick one primary with explicit tradeoffs.',
      'Write ADRs for contested decisions (auth, data ownership, sync vs async, model placement).',
      'Define interface contracts and ownership of each boundary.',
      'Sketch a threat model covering prompt injection, tool abuse, and data exfiltration paths.',
      'Run architecture-review.prompt against the ADR set; architect resolves findings.',
      'Freeze boundaries that coding agents must not cross without a new ADR.',
    ],
    decisions: [
      'Where inference runs (edge, service, batch) and who owns model failures',
      'Source of truth for each data domain',
      'Sync vs async boundaries and failure semantics',
      'Which third-party MCPs/APIs are in the trust boundary',
    ],
    evidence: [
      'ADR set linked from the context package',
      'Interface contracts (OpenAPI/events/schemas) for new boundaries',
      'Threat model sketch with owners for high risks',
      'Architect approval recorded before implementation planning',
    ],
    roleNext: [
      { role: 'PM', action: 'Confirm architecture still delivers the brief metrics; cut scope if NFRs explode cost.' },
      { role: 'Architect', action: 'Own ADRs, contracts, and agent boundary freeze.' },
      { role: 'Engineer', action: 'Validate feasibility against stack skills; surface hidden coupling early.' },
      { role: 'Security', action: 'Challenge data flows and tool allowlists in the threat model.' },
    ],
    inputs: [
      'Approved brief and context package',
      'Existing system map',
      'NFRs: security, scale, cost, latency',
    ],
    outputs: [
      'ADR set',
      'Interface contracts',
      'Threat model sketch and boundary freeze',
    ],
    prompts: [
      p('Architecture review', 'architecture-review.prompt', 'Stress-tests ADRs for missing failure modes and agent-unsafe inventiveness.'),
      p('Security review', 'security-review.prompt', 'Early pass on trust boundaries before coding plans lock in.'),
    ],
    skills: [
      s('Architecture', 'architecture.skill', 'Scenario-governed design choices and ADR discipline.'),
      s('Security', 'security.skill', 'Threat modeling for AI tool and retrieval surfaces.'),
    ],
    mcps: [],
    tooling: [
      doc('Architecture pattern workflow', 'patterns/architecture-pattern/workflow', 'Stepwise architecture workflow tied to ADRs.'),
      doc('Enterprise AI overview', '09-enterprise-ai/README', 'Governance constraints that change architecture choices.'),
      doc('Standards portal', 'standard/README', 'Normative controls to reference in ADRs when applicable.'),
    ],
    agents: [
      doc('Architecture pattern', 'patterns/architecture-pattern/README', 'Primary pattern for this stage.'),
      doc('Architect agent', '04-agent-engineering/agents/architect.agent', 'Drafts options; human architect decides.'),
      doc('Security agent', '04-agent-engineering/agents/security.agent', 'Assists threat model — does not approve production risk.'),
    ],
    hitlGates: [
      'Architect approval of ADR set before implementation planning',
      'Security review of external data and tool boundaries for elevated risk tiers',
    ],
    automation: [
      'ADR scaffold from architecture-review.prompt',
      'Link patterns and cookbooks to affected services in the context package',
      'CI check that new integrations reference an ADR ID',
    ],
    enterprise: [
      'Identify SoA-relevant controls early and cite control IDs in ADRs',
      'Cross-team review for shared platforms and multi-tenant surfaces',
      'Prohibit agents from inventing integrations not listed in the allowlist',
    ],
    mistakes: [
      'Letting agents invent integrations without ADRs',
      'Architecture drift without updating ADRs and context packages',
      'Skipping threat model because "it is just a prototype"',
    ],
    nextStage: 'implementation-planning',
  },

  {
    id: 'implementation-planning',
    title: 'Implementation Planning',
    slug: 'implementation-planning',
    goal: 'Break approved architecture into verifiable slices with tests, rollback, and evidence hooks — before any feature coding begins.',
    whenToUse: [
      'ADRs and boundary freeze exist',
      'Work must be sliced for parallel humans/agents without scope thrash',
      'You need a plan file that pre-code hooks can enforce',
      'Test strategy and rollback must be explicit before coding',
    ],
    steps: [
      'Derive slices from ADRs and contracts — each slice shippable with evidence.',
      'For each slice: files touched, tests, evals, rollback, and Definition of Done.',
      'Order the task graph by dependency and risk; put spike slices first when unknowns remain.',
      'Call out technical debt you will deliberately take and debt you refuse.',
      'Run implementation-plan.prompt; produce a plan file in-repo (not a chat transcript).',
      'Attach test strategy outline and eval gates for AI-touched paths.',
      'Stop at plan completion — do not code until human-review approves the plan.',
    ],
    decisions: [
      'Slice size: hours vs days — prefer slices that fit one PR',
      'What is spike vs committed delivery',
      'Which debt is accepted with an expiry date',
      'Which slices require pair programming vs solo AI-assisted work',
    ],
    evidence: [
      'Committed implementation plan file with task graph',
      'Test/eval strategy linked per high-risk slice',
      'Rollback steps for each production-touching slice',
      'pre-planning.hook.sh pass on the plan artifact',
    ],
    roleNext: [
      { role: 'PM', action: 'Validate slices still map to brief metrics; cut or reorder ruthlessly.' },
      { role: 'Architect', action: 'Reject slices that violate ADR boundaries or invent new integrations.' },
      { role: 'Engineer', action: 'Estimate and challenge missing tests, migrations, and observability work.' },
      { role: 'QA', action: 'Own test strategy outline and risk-based coverage targets.' },
    ],
    inputs: [
      'Approved ADRs and contracts',
      'Backlog / capacity',
      'Risk tier and DoR',
    ],
    outputs: [
      'Implementation plan file',
      'Task graph with owners',
      'Test and eval strategy outline',
    ],
    prompts: [
      p('Implementation plan', 'implementation-plan.prompt', 'Produces the enforceable plan artifact coding agents must follow.'),
      p('Technical debt', 'technical-debt.prompt', 'Makes accepted debt explicit with expiry and owners.'),
      p('Test generation', 'test-generation.prompt', 'Seeds the test strategy for high-risk slices.'),
    ],
    skills: [
      s('Planning', 'planning.skill', 'Primary skill — decision-complete execution contracts.'),
      s('Testing', 'testing.skill', 'Ensures each slice has verifiable proof.'),
    ],
    mcps: [
      doc('Jira MCP', 'mcps/project-management/jira.mcp', 'Optional: sync plan slices to tickets after plan approval.'),
      doc('Linear MCP', 'mcps/project-management/linear.mcp', 'Optional alternative PM sync — never invents scope.'),
    ],
    tooling: [
      doc('How to set up planning', 'handbook/how-to-set-up-planning', 'Harness for plan files and gates.'),
      doc('pre-planning hook', '04-agent-engineering/hooks/README', 'Validates plan artifacts before coding.'),
      doc('pre-code hook', '04-agent-engineering/hooks/README', 'Will block coding until plan approval exists.'),
      doc('Planner pattern workflow', 'patterns/planner-pattern/workflow', 'Operationalizes plan → approve → execute.'),
      doc('Definition of Done', '08-ai-sdlc/quality-standards/definition-of-done', 'Per-slice exit bar.'),
    ],
    agents: [
      doc('Planner pattern', 'patterns/planner-pattern/README', 'Primary agent pattern for this stage.'),
      doc('Planner agent', '04-agent-engineering/agents/planner.agent', 'Drafts the plan file; humans own sequencing and risk.'),
    ],
    hitlGates: [
      'Plan file exists in-repo and passes pre-planning checks',
      'No coding until the human-review (plan approval) stage completes',
    ],
    automation: [
      'pre-planning.hook.sh on plan PRs',
      'Ticket creation from approved slices only',
      'Link each slice to ADR IDs in the plan file',
    ],
    enterprise: [
      'Plans reference control IDs where regulated workloads apply',
      'Capacity and dependency risks explicit — no hidden platform work',
      'Retain plan versions for audit when AI executes slices',
    ],
    mistakes: [
      'Monolithic plans that cannot be reviewed or rolled back',
      'Missing rollback and observability steps',
      'Coding from a chat plan that never landed in git',
    ],
    nextStage: 'human-review',
  },

  {
    id: 'human-review',
    title: 'Human Review',
    slug: 'human-review',
    goal: 'Approve the implementation plan (and risk posture) before any AI coding — a plan-approval HITL gate, not a pull-request review.',
    whenToUse: [
      'Implementation plan file is ready and claims DoR for coding',
      'Risk tier requires accountable human sign-off before agents write code',
      'Architecture boundaries or debt acceptance need explicit human yes/no',
      'You must record who approved what before pre-code hooks unlock',
    ],
    steps: [
      'Review the plan against the brief metrics — reject work that does not move them.',
      'Check every slice for ADR alignment, tests, rollback, and owners.',
      'Challenge AI-generated optimism: missing migrations, permissions, and on-call impact.',
      'Confirm MCP/tool allowlist for the upcoming coding stage is still correct.',
      'Record approval (or change requests) in the plan PR / change log — not in chat.',
      'Optionally capture decisions with knowledge-capture.prompt for later retros.',
      'Unlock coding only after approval; leave pre-code.hook.sh blocking until then.',
    ],
    decisions: [
      'Approve as-is vs request plan revisions',
      'Which slices may use higher AI autonomy vs pair-required',
      'Whether elevated risk needs security co-approval before coding',
      'Waiver (time-boxed) vs hard block for incomplete evidence',
    ],
    evidence: [
      'Signed plan approval with named approver and timestamp',
      'Resolved change requests or explicit waivers with expiry',
      'pre-code gate configuration reflecting approval state',
      'Updated risk notes if plan changed architecture assumptions',
    ],
    roleNext: [
      { role: 'PM', action: 'Sign that slices still deliver the brief; cut scope rather than rubber-stamp.' },
      { role: 'Architect', action: 'Veto slices that violate ADR boundaries or invent integrations.' },
      { role: 'Engineer', action: 'Confirm the plan is executable; refuse vague "AI will figure it out" steps.' },
      { role: 'Engineering Manager', action: 'Ensure segregation of duties: planner ≠ sole approver on high-risk work.' },
    ],
    inputs: [
      'Implementation plan file and task graph',
      'Risk tier and ADR set',
      'Reviewer roster / approvers',
    ],
    outputs: [
      'Recorded plan approval (or rejected with required changes)',
      'Autonomy level per slice',
      'Unlocked pre-code gate for approved slices only',
    ],
    prompts: [
      p('Implementation plan', 'implementation-plan.prompt', 'Re-run or diff against the living plan under review — this stage approves plans, not PRs.'),
      p('Knowledge capture', 'knowledge-capture.prompt', 'Optional: capture why the plan was approved or cut for later improvement.'),
    ],
    skills: [
      s('Planning', 'planning.skill', 'Primary skill — evaluate plan completeness, not PR diffs.'),
    ],
    mcps: [],
    tooling: [
      doc('Human in the loop', 'handbook/human-in-the-loop', 'Defines plan-approval HITL gates and accountability.'),
      doc('How to set up planning', 'handbook/how-to-set-up-planning', 'Plan artifact and gate mechanics reviewers check.'),
      doc('pre-code hook', '04-agent-engineering/hooks/README', 'Must stay blocking until plan approval is recorded.'),
      doc('AIDLC roles & evolving delivery', 'handbook/aidlc-roles-and-evolving-delivery', 'Who may approve vs who may execute.'),
    ],
    agents: [
      doc('Planner pattern', 'patterns/planner-pattern/README', 'Primary pattern — plan quality and decision completeness.'),
      doc('Planner agent', '04-agent-engineering/agents/planner.agent', 'May summarize plan risks; humans approve.'),
    ],
    hitlGates: [
      'Named human approves the implementation plan before coding',
      'High-risk tiers require architect (and security when data/tools expand) co-sign',
      'No production-impacting AI coding without this gate',
    ],
    automation: [
      'Plan PR template requiring ADR links, tests, rollback',
      'pre-code.hook.sh reads approval status from plan metadata',
      'Notify approvers via existing PM tooling after plan PR opens',
    ],
    enterprise: [
      'Segregation of duties on high-risk plans',
      'Retain approval evidence for audits',
      'Time-box waivers; expired waivers re-block coding',
    ],
    mistakes: [
      'Treating this stage as PR/code review (that is the code-review stage)',
      'Rubber-stamping AI-written plans without checking rollback and tests',
      'Using reviewer-pattern / code-review.skill as the primary gate here',
    ],
    nextStage: 'ai-coding',
  },

  {
    id: 'ai-coding',
    title: 'AI Coding',
    slug: 'ai-coding',
    goal: 'Implement only approved plan slices inside hooks, stack skills, and architecture boundaries — with tests and docs landing in the same change.',
    whenToUse: [
      'Plan approval HITL has passed for the slice',
      'Context package and stack skill are available to the agent',
      'pre-code.hook.sh is green for the target slice',
      'You are executing, not exploring new architecture',
    ],
    steps: [
      'Load the approved plan slice, ADR IDs, and context package — refuse out-of-plan work.',
      'Select the stack skill (react/node/python/…) and coding.prompt for generation.',
      'Implement the smallest vertical change that satisfies the slice DoD.',
      'Add or update tests with the slice; do not defer "tests later".',
      'Run debug.skill on failures; do not randomly regenerate large diffs.',
      'Update docs/runbooks touched by the change; run post-code hooks.',
      'Open a PR scoped to one slice; link plan item and ADR IDs.',
    ],
    decisions: [
      'Stop and replan vs push through when reality contradicts the plan',
      'Refactor in-slice vs separate debt ticket',
      'When to pair-program instead of solo agent execution',
      'Whether a spike invalidated assumptions enough to return to human-review',
    ],
    evidence: [
      'Feature branch with slice-scoped commits',
      'Tests and hook results attached to the PR',
      'Plan item ID referenced in PR description',
      'No new integrations beyond ADR allowlist',
    ],
    roleNext: [
      { role: 'PM', action: 'Watch for scope creep in PRs; bounce work that is not on the approved plan.' },
      { role: 'Architect', action: 'Spot-check boundary violations in early PRs of a new area.' },
      { role: 'Engineer', action: 'Drive the agent; own correctness, tests, and hook compliance.' },
      { role: 'QA', action: 'Validate test deltas cover the slice acceptance criteria.' },
    ],
    inputs: [
      'Approved plan slice',
      'Context package and stack skill',
      'Hook baseline (pre-code / post-code)',
    ],
    outputs: [
      'Feature branch / PR',
      'Tests and updated docs',
      'Hook evidence for the change',
    ],
    prompts: [
      p('Coding', 'coding.prompt', 'Primary generation prompt constrained by plan and context.'),
      p('Refactoring', 'refactoring.prompt', 'Use only for in-slice refactors with tests — not drive-by rewrites.'),
    ],
    skills: [
      s('Debug', 'debug.skill', 'Hypothesis-driven failure isolation when generation breaks.'),
      s('Testing', 'testing.skill', 'Keep proof co-located with the change.'),
      s('Documentation', 'documentation.skill', 'Update operator-facing docs in the same PR when behavior changes.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Open/update PRs and read review threads without leaving the harness.'),
      doc('Filesystem MCP', 'mcps/infrastructure-data/filesystem.mcp', 'Scoped file ops when the agent runner requires MCP file access.'),
    ],
    tooling: [
      doc('Hooks in practice', 'handbook/hooks-in-practice', 'Operational guide for pre/post-code gates.'),
      doc('post-code hook', '04-agent-engineering/hooks/README', 'Post-generation checks before PR.'),
      doc('pre-commit hook', '04-agent-engineering/hooks/README', 'Local secret/lint gates.'),
      doc('Code quality standard', '08-ai-sdlc/quality-standards/code-quality-standard', 'Bar for AI-authored code.'),
      doc('Coder agent', '04-agent-engineering/agents/coder.agent', 'Default coding agent definition.'),
    ],
    agents: [
      doc('Debug pattern', 'patterns/debug-pattern/README', 'When generation fails — isolate before regenerating.'),
      doc('Coder agent', '04-agent-engineering/agents/coder.agent', 'Primary execution agent under plan constraints.'),
      doc('Frontend / Backend agents', '04-agent-engineering/agents/frontend.agent', 'Use stack-specific agents when the slice is UI or API heavy.'),
    ],
    hitlGates: [
      'No merge without passing hooks',
      'Out-of-plan changes require returning to implementation-planning / human-review',
    ],
    automation: [
      'post-code and pre-commit hooks in local + CI',
      'Stack cookbook generate prompts for idiomatic code',
      'Budget guards on token spend for long agent sessions',
    ],
    enterprise: [
      'Budget-guard.hook.sh for token spend on large slices',
      'No secrets in prompts, logs, or agent memory',
      'Attribute AI-assisted commits for audit where policy requires',
    ],
    mistakes: [
      'Coding without an approved plan file',
      'Disabling hooks to "move faster"',
      'Accepting huge unrelated refactors from the agent in a feature PR',
    ],
    nextStage: 'code-review',
  },

  {
    id: 'code-review',
    title: 'Code Review',
    slug: 'code-review',
    goal: 'Human-accountable PR review of AI-assisted changes for correctness, security, and maintainability — AI assists; it does not approve.',
    whenToUse: [
      'A PR exists for an approved plan slice',
      'Hooks and CI are green or failures are explained',
      'You need severity-calibrated findings before merge',
      'Security-sensitive paths changed and need an explicit pass',
    ],
    steps: [
      'Read the plan item and ADR links before the diff — reject unplanned scope.',
      'Run code-review.skill / reviewer pattern over the PR; triage severity.',
      'Use security-review.prompt as a supporting pass on auth, data, and tool surfaces.',
      'Verify tests prove the behavior claimed; demand gaps be fixed in-slice.',
      'Check for prompt-injection and secret leakage in new agent/tool code.',
      'Approve, request changes, or escalate — human reviewer is accountable.',
      'Capture durable learnings (patterns, anti-patterns) when review finds systemic issues.',
    ],
    decisions: [
      'Approve vs request changes vs hard block for security',
      'Whether findings are slice bugs vs new architecture debt tickets',
      'When to require a second reviewer (privileged paths)',
      'Waiver with expiry vs fix-forward before merge',
    ],
    evidence: [
      'Review comments with severity and resolution',
      'Human approval (not bot-only) on the PR',
      'Security review notes when risk tier requires them',
      'CI + hook status at approval time',
    ],
    roleNext: [
      { role: 'PM', action: 'Ensure merged work still maps to the plan item customers care about.' },
      { role: 'Architect', action: 'Review boundary and contract changes personally on platform PRs.' },
      { role: 'Engineer', action: 'Respond to findings with fixes or justified pushback — no silent dismissals.' },
      { role: 'Security', action: 'Own review on privileged, data-exfil, or tool-allowlist changes.' },
    ],
    inputs: [
      'Pull request and diff',
      'Plan item + ADR references',
      'Test and hook results',
    ],
    outputs: [
      'Review findings and dispositions',
      'Approval or change request',
      'Optional knowledge-capture notes',
    ],
    prompts: [
      p('Security review', 'security-review.prompt', 'Supporting pass — AI-specific and classic vuln surfaces on the diff.'),
      p('Knowledge capture', 'knowledge-capture.prompt', 'Optional: promote recurring review findings into skills/docs.'),
    ],
    skills: [
      s('Code review', 'code-review.skill', 'Primary skill for PR review quality and severity calibration.'),
      s('Security', 'security.skill', 'Deepens security-sensitive PR review.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Fetch PR diffs, comments, and check status in review workflows.'),
    ],
    tooling: [
      doc('PR review with AI', 'handbook/pr-review-with-ai', 'How humans use AI assistance without ceding accountability.'),
      doc('pre-review hook', '04-agent-engineering/hooks/README', 'Prep checklist before human review.'),
      doc('Reviewer pattern workflow', 'patterns/reviewer-pattern/workflow', 'Operational reviewer workflow.'),
      doc('Code quality standard', '08-ai-sdlc/quality-standards/code-quality-standard', 'Merge bar.'),
      doc('Quality checklists', 'checklists/README', 'Review checklists by domain.'),
    ],
    agents: [
      doc('Reviewer pattern', 'patterns/reviewer-pattern/README', 'Primary pattern for this stage.'),
      doc('Reviewer agent', '04-agent-engineering/agents/reviewer.agent', 'Drafts findings; human approves merge.'),
      doc('Security agent', '04-agent-engineering/agents/security.agent', 'Supporting security pass on sensitive PRs.'),
    ],
    hitlGates: [
      'Human reviewer is accountable — AI review is assistive only',
      'Four-eyes on privileged paths and production config',
    ],
    automation: [
      'CI static analysis and secret scanning required green',
      'Cookbook/stack review prompts for idiomatic issues',
      'Block merge when plan item ID is missing from PR template',
    ],
    enterprise: [
      'Document waivers with owner and expiry',
      'Retain review evidence for regulated changes',
      'Separate author and approver on high-risk PRs',
    ],
    mistakes: [
      'Trusting AI review as the sole gate',
      'Reviewing only the diff, not behavior and tests',
      'Confusing this stage with plan approval (human-review)',
    ],
    nextStage: 'testing',
  },

  {
    id: 'testing',
    title: 'Testing',
    slug: 'testing',
    goal: 'Prove behavior with automated tests and eval gates before promoting a release candidate — especially for AI-touched paths.',
    whenToUse: [
      'Implementation PRs are merging or batched for an RC',
      'Risk tier demands eval gates, not only unit tests',
      'Flaky or snapshot-only coverage is blocking trust',
      'You need req → test traceability before security sign-off',
    ],
    steps: [
      'Map acceptance criteria and plan slices to test cases; close gaps explicitly.',
      'Generate missing tests with test-generation.prompt; humans edit for realism.',
      'Add evals for LLM/agent paths; wire them as CI gates, not dashboards-only.',
      'Run regression suites; quarantine flakes with owners — do not ignore.',
      'For UI/flows, use Playwright (or equivalent) against critical journeys.',
      'Record coverage notes and known residual risk for the RC.',
      'Fail the stage if eval gates or critical path tests are red.',
    ],
    decisions: [
      'What is blocking vs advisory coverage for this risk tier',
      'Golden-set size and ownership for LLM evals',
      'When to add contract tests vs end-to-end only',
      'Ship with known residual risk vs hold the RC',
    ],
    evidence: [
      'Test suite delta linked to plan items',
      'Eval results with gate status',
      'Flake list with owners or zero open flakes on critical paths',
      'Traceability notes: requirement → test/eval',
    ],
    roleNext: [
      { role: 'PM', action: 'Confirm critical user journeys are covered, not just code paths.' },
      { role: 'Architect', action: 'Require contract tests on new boundaries before RC.' },
      { role: 'Engineer', action: 'Own unit/integration tests co-located with code.' },
      { role: 'QA', action: 'Own risk-based suite, eval gates, and flake policy.' },
    ],
    inputs: [
      'Requirements / plan acceptance criteria',
      'Merged implementation',
      'Risk tier and prior eval baselines',
    ],
    outputs: [
      'Test suite delta',
      'Eval gate results',
      'Coverage and residual-risk notes',
    ],
    prompts: [
      p('Test generation', 'test-generation.prompt', 'Produces candidate tests from acceptance criteria and code.'),
    ],
    skills: [
      s('Testing', 'testing.skill', 'Primary testing discipline and anti-patterns.'),
      s('Evaluation', 'evaluation.skill', 'Eval design and gate wiring for AI features.'),
    ],
    mcps: [
      doc('Playwright MCP', 'mcps/browser-testing/playwright.mcp', 'Browser journey automation for critical UI paths.'),
      doc('Chrome DevTools MCP', 'mcps/browser-testing/chrome-devtools.mcp', 'Optional deep debugging of client-side failures.'),
    ],
    tooling: [
      doc('Evals as quality gates', 'handbook/evals-as-quality-gates', 'Make evals blocking in CI.'),
      doc('Evaluation frameworks', '07-llmops/evaluation/framework-selection', 'Pick an eval approach that fits the workload.'),
      doc('LLM-as-Judge', '07-llmops/evaluation/llm-as-judge', 'Use carefully with human baselines.'),
      doc('Definition of Done', '08-ai-sdlc/quality-standards/definition-of-done', 'Includes test/eval evidence.'),
      doc('Testing agent', '04-agent-engineering/agents/testing.agent', 'Assists suite expansion under QA ownership.'),
    ],
    agents: [
      doc('Testing agent', '04-agent-engineering/agents/testing.agent', 'Primary agent assist for this stage.'),
      doc('Definition of Done', '08-ai-sdlc/quality-standards/definition-of-done', 'Quality bar agents and humans share.'),
    ],
    hitlGates: [
      'Eval gate failure blocks release candidate promotion',
      'QA sign-off on residual risk for elevated tiers',
    ],
    automation: [
      'CI workflows for unit, integration, and eval suites',
      'Playwright critical-path smoke on PR and nightly',
      'Regression suites for prompts and agent tools',
    ],
    enterprise: [
      'Golden sets for high-risk flows with change control',
      'Traceability from requirement → test/eval for audits',
      'Separate eval data from production PII',
    ],
    mistakes: [
      'Snapshot-only tests for LLM features',
      'Skipping flake investigation',
      'Treating green unit tests as sufficient for agent tool changes',
    ],
    nextStage: 'security',
  },

  {
    id: 'security',
    title: 'Security',
    slug: 'security',
    goal: 'Validate threat model, dependencies, secrets, and AI-specific attack surfaces before performance tuning or release plumbing.',
    whenToUse: [
      'RC includes new tools, MCPs, retrieval, or auth boundaries',
      'Dependency or secret posture changed',
      'Risk tier requires security sign-off before prod',
      'Prompt-injection / tool-abuse tests are not yet evidenced',
    ],
    steps: [
      'Revisit the architecture threat model against the actual RC diff.',
      'Run security-review.prompt on agent, MCP, and data-flow changes.',
      'Verify secret scanning, dependency scanning, and allowlist enforcement.',
      'Test prompt injection and tool-abuse cases on AI entry points.',
      'Confirm logging/redaction so prompts and tools cannot leak PII.',
      'File remediations with severity; block ship on unresolved highs.',
      'Record security sign-off or time-boxed waivers with owners.',
    ],
    decisions: [
      'Block vs waive (expiry + compensating control)',
      'Whether new MCPs stay disabled in prod',
      'Data classes allowed in prompts and traces',
      'Need for pen-test or red-team before GA',
    ],
    evidence: [
      'Security review notes linked to RC',
      'Remediation tasks with severity and status',
      'Scanner results (secrets, deps, allowlist)',
      'Sign-off or waiver record',
    ],
    roleNext: [
      { role: 'PM', action: 'Accept schedule impact of blocking findings; do not pressure silent waivers.' },
      { role: 'Architect', action: 'Fix boundary flaws at design level when reviews find systemic issues.' },
      { role: 'Engineer', action: 'Remediate findings in code; add regression tests for abuse cases.' },
      { role: 'Security', action: 'Own sign-off criteria and residual risk language.' },
    ],
    inputs: [
      'Threat model and ADR trust boundaries',
      'Dependency graph and MCP allowlist',
      'Data-flow / prompt-path inventory',
    ],
    outputs: [
      'Security review notes',
      'Remediation backlog',
      'Sign-off or waiver with expiry',
    ],
    prompts: [
      p('Security review', 'security-review.prompt', 'Primary structured security review for AI and classic surfaces.'),
    ],
    skills: [
      s('Security', 'security.skill', 'Primary security engineering skill for this stage.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Pull advisory/PR context during review workflows.'),
    ],
    tooling: [
      doc('Security smoke / standards', 'standard/README', 'Normative controls and assurance entry — not an MCP.'),
      doc('Evidence & conformance', 'standard/03-evidence-exceptions-conformance', 'How to record exceptions and evidence.'),
      doc('Enterprise pattern', 'patterns/enterprise-pattern/README', 'Governed AI controls at org scale.'),
      doc('Quality checklists', 'checklists/README', 'Security-oriented review checklists.'),
      doc('pre-tool-call hook', '04-agent-engineering/hooks/README', 'Runtime allowlist enforcement for tools.'),
    ],
    agents: [
      doc('Security agent', '04-agent-engineering/agents/security.agent', 'Assists review; humans sign.'),
      doc('Enterprise pattern', 'patterns/enterprise-pattern/README', 'Pattern for governed multi-tenant / regulated AI.'),
    ],
    hitlGates: [
      'Security approval for external data, new tools, and elevated risk tiers',
      'No prod enablement of MCPs outside the signed allowlist',
    ],
    automation: [
      'Secret and dependency scanning in CI',
      'MCP allowlist checks in pre-tool-call hooks',
      'Automated high-severity finding tickets',
    ],
    enterprise: [
      'Map findings to SoA controls where applicable',
      'Link incident playbooks for AI abuse scenarios',
      'Retain review evidence and waiver history',
    ],
    mistakes: [
      'Ignoring prompt injection because "the model is internal"',
      'Over-trusting retrieved context without provenance checks',
      'Putting SoA README under MCPs instead of tooling/controls',
    ],
    nextStage: 'performance',
  },

  {
    id: 'performance',
    title: 'Performance',
    slug: 'performance',
    goal: 'Meet latency, cost, and throughput budgets for application and AI paths with profile-guided changes — not speculative rewrites.',
    whenToUse: [
      'SLOs or cost budgets exist and RC may violate them',
      'Token spend or context size is unbounded in agent paths',
      'Load profile for launch is known enough to measure',
      'You need budget guards before devops wiring',
    ],
    steps: [
      'Define or confirm SLOs and cost budgets per critical path.',
      'Measure baselines (p95 latency, error rate, $/request, tokens/request).',
      'Run performance-review.prompt on hot paths; prefer evidence over intuition.',
      'Optimize with optimization-pattern: cache, batch, smaller context, cheaper models where quality allows.',
      'Install budget-guard.hook.sh for agent sessions that can runaway.',
      'Re-measure; refuse "feels faster" without numbers.',
      'File an optimization backlog for non-blocking work; waive SLO misses only explicitly.',
    ],
    decisions: [
      'Fix now vs backlog with SLO waiver',
      'Model downgrade vs prompt/context reduction vs infra scale',
      'Cache invalidation strategy for AI responses',
      'Load-test fidelity required before prod',
    ],
    evidence: [
      'Perf report with before/after metrics',
      'Budget guard config committed',
      'Optimization backlog with owners',
      'SLO waiver record if shipping under budget miss',
    ],
    roleNext: [
      { role: 'PM', action: 'Trade feature scope for SLO attainment when budgets are real.' },
      { role: 'Architect', action: 'Decide caching and model-placement changes that alter ADRs.' },
      { role: 'Engineer', action: 'Profile, patch, and re-measure; avoid speculative rewrites.' },
      { role: 'DevOps', action: 'Provide load-test harness and capacity headroom data.' },
    ],
    inputs: [
      'SLOs and cost budgets',
      'Load profile / traffic assumptions',
      'Baseline traces and token metrics',
    ],
    outputs: [
      'Performance report',
      'Optimization backlog',
      'Budget guard configuration',
    ],
    prompts: [
      p('Performance review', 'performance-review.prompt', 'Structured review of latency, cost, and throughput regressions.'),
    ],
    skills: [
      s('Performance', 'performance.skill', 'Profile-guided performance work.'),
      s('Observability', 'observability.skill', 'Instrumentation required to measure AI and app paths.'),
    ],
    mcps: [
      doc('OpenTelemetry MCP', 'mcps/observability/opentelemetry.mcp', 'Pull traces/metrics while diagnosing hot paths.'),
      doc('Grafana MCP', 'mcps/observability/grafana.mcp', 'Optional dashboard interrogation during perf work.'),
    ],
    tooling: [
      doc('Containing token waste', 'handbook/containing-token-waste', 'Cost control for context and tool loops.'),
      doc('budget-guard hook', '04-agent-engineering/hooks/README', 'Hard stop on runaway agent spend.'),
      doc('Optimization pattern', 'patterns/optimization-pattern/README', 'Profile-guided improvement pattern.'),
      doc('Tracing', '07-llmops/observability/tracing', 'Trace agent tool calls end-to-end.'),
    ],
    agents: [
      doc('Optimization pattern', 'patterns/optimization-pattern/README', 'Primary pattern for this stage.'),
      doc('Observability agent', '04-agent-engineering/agents/observability.agent', 'Helps interpret traces and metrics.'),
    ],
    hitlGates: [
      'SLO regression requires explicit waiver with owner and expiry',
      'Unbounded agent loops blocked by budget guards before prod',
    ],
    automation: [
      'budget-guard.hook.sh in agent runners',
      'Canary metrics compared to baseline SLOs',
      'CI perf smoke on critical paths where feasible',
    ],
    enterprise: [
      'Chargeback or showback for model spend',
      'Capacity planning for launch peaks',
      'Cost anomalies page on-call like latency pages',
    ],
    mistakes: [
      'Optimizing before measuring',
      'Unbounded context windows and tool loops',
      'Shipping without a cost budget because "AI is strategic"',
    ],
    nextStage: 'devops',
  },

  {
    id: 'devops',
    title: 'DevOps',
    slug: 'devops',
    goal: 'Automate build, deploy, and environment promotion with immutable artifacts, secrets hygiene, and safe progressive delivery defaults.',
    whenToUse: [
      'RC is functionally ready and needs promotion plumbing',
      'Environments, pipelines, or IaC are missing or manual',
      'You must enforce gates (tests, evals, security) in CI/CD',
      'Release pattern (canary/flag) must be wired before production',
    ],
    steps: [
      'Define environment matrix (dev/stage/prod) and promotion rules.',
      'Build immutable artifacts; ban "ssh and edit prod".',
      'Wire CI gates: tests, evals, scanners, and hooks as blocking checks.',
      'Codify infra with reviewable IaC; validate in pipeline.',
      'Implement progressive delivery (canary, flags) per release-pattern.',
      'Write runbooks for deploy, rollback, and secret rotation.',
      'Run a dry-run deploy to stage; fix pipeline debt before prod go/no-go.',
    ],
    decisions: [
      'Blue/green vs canary vs flag-first for this RC',
      'Who can approve prod deploys (CAB vs on-call lead)',
      'Secret storage and rotation ownership',
      'Rollback trigger metrics and abort authority',
    ],
    evidence: [
      'Pipeline config in git',
      'Environment matrix and promotion policy',
      'Successful stage deploy of the RC artifact',
      'Runbooks linked from the service README',
    ],
    roleNext: [
      { role: 'PM', action: 'Align release window with customer commitments and change freezes.' },
      { role: 'Architect', action: 'Approve infra changes that alter trust or data boundaries.' },
      { role: 'Engineer', action: 'Keep app deployable; fix build/breakages immediately.' },
      { role: 'DevOps', action: 'Own pipelines, IaC, and promotion safety.' },
    ],
    inputs: [
      'Release candidate artifacts',
      'Infra definitions and secrets backend',
      'Release plan and SLO abort criteria',
    ],
    outputs: [
      'Pipeline and IaC configs',
      'Environment matrix',
      'Deploy/rollback runbooks',
    ],
    prompts: [
      p('Release', 'release.prompt', 'Structures release notes, gates, and rollback criteria.'),
    ],
    skills: [
      s('DevOps', 'devops.skill', 'Primary delivery and platform skill.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Pipeline and release PR operations.'),
      doc('Docker MCP', 'mcps/infrastructure-data/docker.mcp', 'Image/build introspection when containerized.'),
      doc('Kubernetes MCP', 'mcps/infrastructure-data/kubernetes.mcp', 'Cluster inspection for k8s deployments.'),
    ],
    tooling: [
      doc('Release pattern workflow', 'patterns/release-pattern/workflow', 'Progressive exposure with abort.'),
      doc('deployment hook', '04-agent-engineering/hooks/README', 'Pre-deploy checks.'),
      doc('post-deployment hook', '04-agent-engineering/hooks/README', 'Post-deploy verification.'),
      doc('Release agent', '04-agent-engineering/agents/release.agent', 'Assists release checklists.'),
    ],
    agents: [
      doc('Release pattern', 'patterns/release-pattern/README', 'Primary pattern for this stage.'),
      doc('DevOps agent', '04-agent-engineering/agents/devops.agent', 'Assists pipeline/IaC changes under human ownership.'),
      doc('Release agent', '04-agent-engineering/agents/release.agent', 'Release checklist co-pilot.'),
    ],
    hitlGates: [
      'Production deploy approval per policy',
      'No manual prod mutation outside emergency hotfix path',
    ],
    automation: [
      'GitHub Actions / CI gates from test+security evidence',
      'IaC plan/apply with review',
      'Automated rollback triggers on canary abort metrics',
    ],
    enterprise: [
      'Change windows and CAB where required',
      'Immutable artifacts with provenance',
      'Separate prod credentials from developer laptops',
    ],
    mistakes: [
      'Manual prod edits',
      'Secrets in CI logs',
      'Pipelines that skip eval/security gates "temporarily"',
    ],
    nextStage: 'monitoring',
  },

  {
    id: 'monitoring',
    title: 'Monitoring',
    slug: 'monitoring',
    goal: 'Observe production behavior, model quality drift, and incident signals with actionable alerts — not vanity dashboards.',
    whenToUse: [
      'Service is in stage/prod and needs SLOs on the glass',
      'Agent/tool paths lack tracing',
      'You need alert routes and on-call runbooks before GA traffic',
      'Eval drift or cost anomalies must page someone',
    ],
    steps: [
      'Confirm golden signals and AI-specific metrics (latency, errors, tokens, tool failure rate).',
      'Instrument tracing across agent tool calls and model providers.',
      'Build dashboards that map to SLOs and abort criteria — delete unused charts.',
      'Define alert policies with runbooks; eliminate pages without owners.',
      'Wire Sentry/OTel (or equivalent) for errors and traces.',
      'Rehearse an incident with incident.prompt; fix gaps in paging.',
      'Schedule drift monitors for evals and prompt versions.',
    ],
    decisions: [
      'What pages vs tickets vs dashboards-only',
      'Retention and PII redaction in logs/traces',
      'SEV definitions for AI quality regressions',
      'Who owns model-provider outage response',
    ],
    evidence: [
      'Dashboards linked from runbooks',
      'Alert policies with owners',
      'Tracing enabled on agent/tool paths',
      'On-call runbooks for top failure modes',
    ],
    roleNext: [
      { role: 'PM', action: 'Define customer-impact language for SEVs and comms triggers.' },
      { role: 'Architect', action: 'Ensure telemetry covers new boundaries and third-party deps.' },
      { role: 'Engineer', action: 'Add instrumentation with features; fix noisy logs.' },
      { role: 'DevOps', action: 'Own alert routing, retention, and on-call integrations.' },
    ],
    inputs: [
      'SLOs and abort criteria',
      'Existing dashboards and log pipelines',
      'On-call roster and escalation paths',
    ],
    outputs: [
      'Production dashboards',
      'Alert policies and runbooks',
      'Drift monitors for evals/prompts',
    ],
    prompts: [
      p('Incident', 'incident.prompt', 'Structures live incident response.'),
      p('Root cause analysis', 'root-cause-analysis.prompt', 'Evidence-bound post-incident analysis.'),
    ],
    skills: [
      s('Observability', 'observability.skill', 'Primary skill for telemetry and alerting quality.'),
    ],
    mcps: [
      doc('OpenTelemetry MCP', 'mcps/observability/opentelemetry.mcp', 'Query traces and metrics during diagnosis.'),
      doc('Sentry MCP', 'mcps/observability/sentry.mcp', 'Error and issue triage.'),
      doc('Datadog MCP', 'mcps/observability/datadog.mcp', 'Optional if Datadog is the org standard.'),
      doc('Grafana MCP', 'mcps/observability/grafana.mcp', 'Optional dashboard operations.'),
    ],
    tooling: [
      doc('Tracing', '07-llmops/observability/tracing', 'Agent/tool tracing standards.'),
      doc('Root cause pattern', 'patterns/root-cause-pattern/README', 'Evidence-bound incident learning.'),
      doc('Observability agent', '04-agent-engineering/agents/observability.agent', 'Assists dashboard/alert drafting.'),
      doc('Incident response agent', '04-agent-engineering/agents/incident-response.agent', 'Live incident assist under IC authority.'),
    ],
    agents: [
      doc('Root cause pattern', 'patterns/root-cause-pattern/README', 'Primary pattern after incidents.'),
      doc('Observability agent', '04-agent-engineering/agents/observability.agent', 'Telemetry co-pilot.'),
      doc('Incident response agent', '04-agent-engineering/agents/incident-response.agent', 'SEV response assist.'),
    ],
    hitlGates: [
      'Incident commander required for SEV-1/2',
      'Alert changes that mute pages require dual review',
    ],
    automation: [
      'Tracing for agent tool calls by default',
      'Eval drift monitors on prompt/version changes',
      'Auto-open incidents from SLO burn alerts',
    ],
    enterprise: [
      'Retention and PII controls on prompts/logs',
      'Mandatory post-incident reviews with actions',
      'Vendor outage playbooks for model providers',
    ],
    mistakes: [
      'Alert fatigue from unowned pages',
      'No tracing on agent/tool paths',
      'Dashboards without SLO linkage',
    ],
    nextStage: 'production',
  },

  {
    id: 'production',
    title: 'Production',
    slug: 'production',
    goal: 'Operate the live release with go/no-go discipline, progressive exposure, verified rollback, and customer communication readiness.',
    whenToUse: [
      'Stage validation and monitoring are ready',
      'You are executing a production deploy or GA ramp',
      'Hotfix path may be needed under incident pressure',
      'Compliance needs a release evidence bundle',
    ],
    steps: [
      'Run go/no-go against checklist: tests, security, perf, monitoring, rollback drill.',
      'Deploy via the release pattern (canary/flags); watch abort metrics.',
      'Keep hotfix-pattern ready for containment without large rewrites.',
      'Publish release notes and customer/internal comms as planned.',
      'Capture evidence bundle (what shipped, gates, approvers).',
      'If abort criteria hit, roll back immediately — do not "push through".',
      'Hand off to continuous-improvement with open actions from the release.',
    ],
    decisions: [
      'Go / no-go / abort',
      'Ramp percentage and hold duration',
      'Hotfix vs rollback vs forward fix',
      'Customer notification timing and channel',
    ],
    evidence: [
      'Deployed release with artifact digest',
      'Go/no-go record and approvers',
      'Release notes and comms sent',
      'Evidence bundle for compliance/audit',
    ],
    roleNext: [
      { role: 'PM', action: 'Own customer comms and go/no-go business call.' },
      { role: 'Architect', action: 'Advise abort when boundary or data risk appears mid-ramp.' },
      { role: 'Engineer', action: 'Execute deploy steps; stay on hotline through ramp.' },
      { role: 'DevOps', action: 'Drive pipeline, canary, and rollback mechanics.' },
    ],
    inputs: [
      'Release candidate and pipeline',
      'Runbooks and abort metrics',
      'Comms plan and on-call coverage',
    ],
    outputs: [
      'Production release',
      'Release notes',
      'Evidence bundle and open follow-ups',
    ],
    prompts: [
      p('Release', 'release.prompt', 'Go/no-go structure, notes, and rollback criteria.'),
      p('Documentation', 'documentation.prompt', 'Finalize operator and customer-facing docs for what shipped.'),
      p('Incident', 'incident.prompt', 'If the release degrades — structured response.'),
    ],
    skills: [
      s('DevOps', 'devops.skill', 'Production delivery and rollback discipline.'),
      s('Documentation', 'documentation.skill', 'Accurate release and operator docs.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Release tags, deploy PRs, and status checks.'),
      doc('Kubernetes MCP', 'mcps/infrastructure-data/kubernetes.mcp', 'Live cluster inspection during ramp when applicable.'),
      doc('Sentry MCP', 'mcps/observability/sentry.mcp', 'Watch error burn during canary.'),
      doc('Slack MCP', 'mcps/communication/slack.mcp', 'Optional incident/release channel coordination.'),
    ],
    tooling: [
      doc('Hotfix pattern', 'patterns/hotfix-pattern/README', 'Smallest reversible containment under pressure.'),
      doc('Release pattern workflow', 'patterns/release-pattern/workflow', 'Progressive exposure with abort.'),
      doc('deployment hook', '04-agent-engineering/hooks/README', 'Final pre-prod checks.'),
      doc('post-deployment hook', '04-agent-engineering/hooks/README', 'Verify health after deploy.'),
    ],
    agents: [
      doc('Release pattern', 'patterns/release-pattern/README', 'Primary release pattern.'),
      doc('Hotfix pattern', 'patterns/hotfix-pattern/README', 'Emergency containment pattern.'),
      doc('Release agent', '04-agent-engineering/agents/release.agent', 'Release checklist assist.'),
    ],
    hitlGates: [
      'Go/no-go with rollback verified before ramp',
      'Abort authority named and exercised if metrics trip',
    ],
    automation: [
      'Canary deploy automation with metric abort',
      'Feature flags for progressive exposure',
      'Evidence bundle generation from CI + approval records',
    ],
    enterprise: [
      'Evidence retained for compliance audits',
      'Customer comms templates approved by legal/support where required',
      'Change records linked to SoA when applicable',
    ],
    mistakes: [
      'Big-bang deploys without canary or flags',
      'Skipping rollback drill',
      'Pushing through abort criteria to "make the date"',
    ],
    nextStage: 'continuous-improvement',
  },

  {
    id: 'continuous-improvement',
    title: 'Continuous Improvement',
    slug: 'continuous-improvement',
    goal: 'Convert incidents, retros, and metrics into updated prompts, skills, evals, and debt paydown — then feed the next idea cycle.',
    whenToUse: [
      'A release or incident produced learnings that must not stay in chat',
      'Eval golden sets or prompts drifted from production reality',
      'Technical debt from AI velocity needs scheduled paydown',
      'You are preparing the next initiative with better harness defaults',
    ],
    steps: [
      'Collect inputs: incident actions, retro notes, cost/quality metrics, review themes.',
      'Run knowledge-capture.prompt; land updates in skills/prompts/docs — not wikis alone.',
      'Prioritize technical-debt.prompt items with expiry; schedule paydown slices.',
      'Improve evals that missed real failures; version prompts with regression suites.',
      'For legacy drag, apply legacy-modernization or migration patterns deliberately.',
      'Propose standard/harness changes via PR; pilot before org-wide rollout.',
      'Close the loop by feeding the next Idea brief with constraints learned.',
    ],
    decisions: [
      'What becomes a standard vs a team-local convention',
      'Debt paydown vs new feature capacity split',
      'Prompt/skill version bump policy',
      'Whether a migration initiative is warranted',
    ],
    evidence: [
      'Merged updates to skills/prompts/evals',
      'Debt backlog with owners and dates',
      'Eval regression results on prompt changes',
      'Retro actions closed or explicitly deferred',
    ],
    roleNext: [
      { role: 'PM', action: 'Reserve capacity for debt and harness improvements — not only features.' },
      { role: 'Architect', action: 'Promote cross-cutting learnings into ADRs and platform defaults.' },
      { role: 'Engineer', action: 'Land skill/prompt/eval PRs; refuse tribal knowledge.' },
      { role: 'Engineering Manager', action: 'Run the pilot → adopt cycle for new patterns.' },
    ],
    inputs: [
      'Incidents and PIR actions',
      'Retro notes and review themes',
      'Production quality/cost metrics',
    ],
    outputs: [
      'Updated skills, prompts, and docs',
      'Debt and eval improvement backlog',
      'Candidate standard changes for pilot',
    ],
    prompts: [
      p('Technical debt', 'technical-debt.prompt', 'Structures debt with cost, risk, and expiry.'),
      p('Knowledge capture', 'knowledge-capture.prompt', 'Turns incidents/retros into durable artifacts.'),
      p('Migration', 'migration.prompt', 'When improvement requires a deliberate migration program.'),
    ],
    skills: [
      s('Documentation', 'documentation.skill', 'Keeps learnings in-repo and reviewable.'),
      s('Evaluation', 'evaluation.skill', 'Evolves golden sets and gates from production misses.'),
    ],
    mcps: [
      doc('GitHub MCP', 'mcps/version-control/github.mcp', 'Land improvement PRs and track harness changes.'),
      doc('Jira MCP', 'mcps/project-management/jira.mcp', 'Optional: track debt paydown work.'),
    ],
    tooling: [
      doc('Legacy modernization pattern', 'patterns/legacy-modernization-pattern/README', 'Incremental strangler for inherited systems.'),
      doc('Migration pattern', 'patterns/migration-pattern/README', 'Safe data/service transitions.'),
      doc('knowledge-capture hook', '04-agent-engineering/hooks/README', 'Remind/enforce capture after incidents.'),
      doc('Org playbook', '10-ai-org-playbook/README', 'Org-level adoption of improvements.'),
    ],
    agents: [
      doc('Migration pattern', 'patterns/migration-pattern/README', 'When improvement is a migration.'),
      doc('Legacy modernization pattern', 'patterns/legacy-modernization-pattern/README', 'When improvement is strangling legacy.'),
      doc('Knowledge agent', '04-agent-engineering/agents/knowledge.agent', 'Assists capture into the corpus.'),
      doc('Migration agent', '04-agent-engineering/agents/migration.agent', 'Assists migration planning under architect ownership.'),
    ],
    hitlGates: [
      'Standard/harness changes reviewed before org-wide rollout',
      'Eval/prompt changes require regression green before merge',
    ],
    automation: [
      'Prompt version bumps tracked in git',
      'Eval regression on prompt/skill changes',
      'knowledge-capture.hook.sh after SEV close',
    ],
    enterprise: [
      'Pilot → adopt cycle for new patterns',
      'Contribute proven improvements back to AIES / internal standards',
      'Measure harness ROI (defect escape, token cost, lead time)',
    ],
    mistakes: [
      'Tribal knowledge only in chat',
      'Never updating golden evals after production misses',
      'Declaring "process improvements" without merged artifacts',
    ],
  },
];

export function getWorkflowBySlug(slug: string): WorkflowStage | undefined {
  return LIFECYCLE_WORKFLOWS.find(w => w.slug === slug);
}

export function getWorkflowIndex(slug: string): number {
  return LIFECYCLE_WORKFLOWS.findIndex(w => w.slug === slug);
}
