import fs from 'node:fs';
import { EMBEDDED_CORPUS } from './embedded-corpus.js';
import {
  MCP_SPECS,
  buildRecommendedMcpConfig,
  detectRepoSignals,
  stackMcpIds,
} from './mcp-catalog.js';
import { describeInstallLayout, layoutFor } from './install-api.js';
import { SITE_URL, STACK_LABELS, STACKS } from './options.js';

export { buildInstallQuery, describeInstallLayout, getInstallCommands, layoutFor } from './install-api.js';

const CORE_SKILLS = [
  'planning',
  'debug',
  'devops',
  'code-review',
  'evaluation',
  'security',
  'testing',
  'architecture',
  'context',
  'prompt',
  'documentation',
];

const CORE_PROMPTS = [
  'story-kickoff',
  'implementation-plan',
  'coding',
  'security-review',
  'enhance-repo',
  'create-prompt',
  'create-skill',
  'create-agent',
];

const CORE_AGENTS = ['planner', 'coder', 'reviewer', 'prompt-engineer'];

function corpus(key) {
  const body = EMBEDDED_CORPUS[key];
  if (!body) {
    return `<!-- Missing embedded corpus: ${key}. Re-run: npm run kit:embed -->\n`;
  }
  return body;
}

function stackMeta(stack) {
  return STACKS.find(s => s.id === stack) ?? { id: stack, label: stack, skillKey: null, cookbook: null };
}

function stripFrontmatter(md) {
  if (!md.startsWith('---')) return md;
  const end = md.indexOf('\n---', 3);
  if (end === -1) return md;
  return md.slice(end + 4).replace(/^\s+/, '');
}

function skillDescription(name, body) {
  const purpose = body.match(/## Purpose\s*\n+([^\n]+)/);
  if (purpose) return purpose[1].trim().slice(0, 180);
  return `AIES ${name} skill — use when this procedure applies.`;
}

function writeSkill(files, L, name, body) {
  if (L.skillStyle === 'cursor-skill') {
    const cleaned = stripFrontmatter(body);
    const desc = skillDescription(name, body).replace(/"/g, "'").replace(/\r?\n/g, ' ');
    files[`${L.skillsDir}/${name}/SKILL.md`] = `---
name: ${name}
description: "${desc}"
---

${cleaned}
`;
  } else {
    files[`${L.skillsDir}/${name}.skill.md`] = body;
  }
}

function modelPolicy(profile) {
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  return `# Model & data policy (AIES)

Generated for: **${model}** · data class **${dataClass}**

## Provider posture

| Choice | Guidance |
|--------|----------|
| claude / gpt / gemini | Pin model IDs in CI and agent configs; record versions in PRs that change prompts |
| multi | Route via an org gateway; do not hard-code vendor SDKs in feature code without an abstraction |
| local | Keep offline evals; never assume cloud tool APIs exist |
| undecided | Default to least privilege; pick a primary model before production |

## Data class rules (${dataClass})

${
  dataClass === 'public'
    ? '- Public data may use cloud models with org-approved logging.\n- Still ban secrets in prompts.'
    : dataClass === 'confidential'
      ? '- Confidential/regulated: prefer private endpoints / VPC; disable training opt-in.\n- No production PII in prompts, traces, or MCP tool args.\n- MCP servers stay empty until security approves allowlist.\n- Require HITL for any tool that can write external systems.'
      : '- Internal data: use org-approved providers only.\n- Redact secrets and customer identifiers from prompts and logs.\n- MCP: enable only from \`_aiesRecommended\` after handbook review.'
}

## Non-negotiables

1. Human review is accountable — model output is advisory
2. Multi-file work uses approved \`plans/{STORY_ID}-plan.md\` (ephemeral)
3. Keep \`mcpServers: {}\` until a human enables approved stubs
4. Eval gates for AI-touched paths before production

Online: ${SITE_URL}/docs/handbook/mcp-when-and-how
`;
}

function maturityReadingPath(maturity) {
  if (maturity === 'beginner') {
    return `1. \`guides/skills-vs-prompts-vs-agents.md\` + \`guides/human-in-the-loop.md\`
2. Run enhance (CLI + agent chat invoke in §0)
3. Create \`plans/{STORY_ID}-plan.md\` from \`plans/_TEMPLATE.md\`
4. Cookbook generate → coding → \`reviews/{STORY_ID}-code-review.md\`
5. Online: ${SITE_URL}/docs/handbook/README`;
  }
  if (maturity === 'intermediate') {
    return `1. Enhance repo → ephemeral plan → cookbook generate/review
2. Wire \`guides/evals-as-quality-gates.md\` into CI
3. Use \`hooks/\` before commit; enable MCP only from recommended stubs
4. Online: ${SITE_URL}/workflows`;
  }
  if (maturity === 'advanced') {
    return `1. Enhance repo + MCP handbook + agent hooks
2. Compose agents (planner → coder → reviewer) with budgets
3. Security skill before write tools; story-scoped plans/reviews
4. Online: ${SITE_URL}/docs/04-agent-engineering/README`;
  }
  return `1. Enhance repo + SoA mapping (${SITE_URL}/portal)
2. Migration bible: ${SITE_URL}/docs/handbook/ai-migration-bible-path
3. Eval CI + MCP allowlists + hooks + segregation of duties
4. Attach \`plans/{STORY_ID}-plan.md\` + \`reviews/{STORY_ID}-code-review.md\` on PRs — then stop maintaining them`;
}

function roleNext(role) {
  const map = {
    'product-manager': 'idea',
    architect: 'architecture',
    frontend: 'ai-coding',
    backend: 'ai-coding',
    fullstack: 'implementation-planning',
    qa: 'testing',
    devops: 'devops',
    'engineering-manager': 'project-kickoff',
    'ai-engineer': 'implementation-planning',
  };
  return map[role] ?? 'implementation-planning';
}

function cookbookKeys(cookbookId) {
  const prefix = `cookbook/${cookbookId}/`;
  return Object.keys(EMBEDDED_CORPUS)
    .filter(k => k.startsWith(prefix))
    .sort();
}

function pathBasename(p) {
  const parts = p.split('/');
  return parts[parts.length - 1] ?? p;
}

function skillPath(L, name) {
  return L.skillStyle === 'cursor-skill' ? `${L.skillsDir}/${name}/SKILL.md` : `${L.skillsDir}/${name}.skill.md`;
}

function buildRootInstructions(profile, label, L) {
  const enhancePrompt = `${L.promptsDir}/enhance-repo.prompt.md`;
  const enhanceChat = invokeEnhanceChat(profile.ide, enhancePrompt);
  return `# AIES project instructions — ${label}

This repository uses the **AI Engineering Standard (AIES)** harness.

## Profile

- Stack: ${label}
- Role: ${profile.role}
- Maturity: ${profile.maturity} (docs reading path only)
- Primary IDE selection: ${profile.ide}
- Model: ${profile.model ?? 'undecided'}
- Data class: ${profile.dataClass ?? 'internal'}

## Non-negotiables

1. Read \`AIES.md\` before coding with AI
2. Multi-file work requires approved \`plans/{STORY_ID}-plan.md\` (ephemeral — not a forever root plan)
3. Prefer installed skills/prompts/cookbook over ad-hoc chat
4. Human owns merges — AI is advisory; write \`reviews/{STORY_ID}-code-review.md\` on AI-touched PRs
5. No secrets in prompts, logs, or MCP args
6. Keep MCP \`mcpServers\` empty until a human enables stubs from \`_aiesRecommended\`
7. Respect this repo’s lint, typecheck, format, and style-guide configs — never weaken them
8. Honor agent hooks under \`hooks/\` for plan/code/review gates

## Where to look

| Need | Path |
|------|------|
| Operator guide | \`AIES.md\` |
| Plan index | \`implementation_plan.md\` |
| Active plan | \`plans/{STORY_ID}-plan.md\` |
| Review report | \`reviews/{STORY_ID}-code-review.md\` |
| Agent hooks | \`hooks/\` · \`${L.hooksFile}\` |
| Skills | \`${L.skillsDir}/\` |
| Prompts | \`${L.promptsDir}/\` |
| Agents | \`${L.agentsDir}/\` |
| Stack cookbook | \`${L.cookbookDir}/\` (repo root) |
| MCP specs | \`${L.mcpsDir}/\` |
| MCP config | \`${L.mcpFile}\` |
| Guides | \`${L.guidesDir}/\` |
| Policy | \`${L.policyFile}\` |

**Layout rule:** IDE folders hold **prompts, skills, and agents** only. Cookbook/guides/mcps/templates stay at repo root.

## First commands after install

\`\`\`bash
npx @grvmithas/create-aies-kit enhance
\`\`\`

Then paste into agent chat:

\`\`\`text
${enhanceChat}
\`\`\`

## Workflow

Enhance → \`plans/{STORY_ID}-plan.md\` (approve) → coding with plan attached → verify (lint/test) → \`reviews/{STORY_ID}-code-review.md\` → PR
`;
}

function buildAiesReadme({ profile, label, L, stack, flags, now, recommendedIds }) {
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  const enhancePrompt = `${L.promptsDir}/enhance-repo.prompt.md`;

  return `# AIES — Operator guide (${label})

**Generated:** ${now}  
**Profile:** ${profile.role} · ${profile.ide} · ${profile.maturity} · ${label} · model **${model}** · data **${dataClass}**

This install is **always complete**. Maturity only changes the reading path — not which files were written.  
There is **no** \`.aies/\` folder.  
**IDE folders** hold prompts, skills, and agents. **Cookbook, guides, MCP specs, and templates** live at repo root (never under \`.github/cookbook\`).

---

## 0. Start from the word go (do this first)

1. **Read this file** (AIES.md).
2. **Refresh kit signals** (MCP recommendations from repo scan):

\`\`\`bash
npx @grvmithas/create-aies-kit enhance
\`\`\`

3. **Run the enhance prompt in your IDE agent chat** (copy-paste):

\`\`\`text
${invokeEnhanceChat(profile.ide, enhancePrompt)}
\`\`\`

Prompt path: \`${enhancePrompt}\`  
That scan rewrites harness files to match **this** repo’s lint, style guides, FE/BE layout, and guardrails.

4. Create an **ephemeral** plan: \`plans/{STORY_ID}-plan.md\` (see §1) — approve before multi-file coding.
5. Code with the plan attached → write \`reviews/{STORY_ID}-code-review.md\` → open PR with both attached.

**Re-install kit (force):**

\`\`\`bash
npx @grvmithas/create-aies-kit ${flags} --force
\`\`\`

---

## 1. Ephemeral plans & review reports (not forever-docs)

**Plans and review reports are temporary.** Scope ends when the story/PR completes. Keeping a single living \`implementation_plan.md\` forever is an anti-pattern.

| Artifact | Path | After merge |
|----------|------|-------------|
| Plan | \`plans/{STORY_ID}-plan.md\` | Attach to PR; archive or delete — **do not maintain** |
| Code review | \`reviews/{STORY_ID}-code-review.md\` | Attach to PR; freeze — file issues for leftovers |
| Index only | \`implementation_plan.md\` | Points here — not the active plan |

### Create / fill a plan

1. Copy \`plans/_TEMPLATE.md\` → \`plans/{STORY_ID}-plan.md\`
2. Attach \`${L.promptsDir}/implementation-plan.prompt.md\` (or planning skill)
3. Fill tasks with verification commands from **this** repo (see enhance output)
4. Human approval before multi-file coding

### Temporary memory

- Attach the plan file every agent turn for that story
- Optional sticky/context include by \`STORY_ID\`
- Never dump the full plan into forever rules (\`CLAUDE.md\` / \`AGENTS.md\`)

### Anti-patterns

- Forever-editing one root plan for every feature
- Coding multi-file work from chat with no \`plans/{STORY_ID}-plan.md\`
- Skipping \`reviews/{STORY_ID}-code-review.md\` on AI-touched PRs

---

## 2. How to use the right prompts

| Situation | Prompt |
|-----------|--------|
| New story / kickoff | \`${L.promptsDir}/story-kickoff.prompt.md\` |
| Build the plan | \`${L.promptsDir}/implementation-plan.prompt.md\` |
| Implement approved plan | \`${L.promptsDir}/coding.prompt.md\` |
| Security pass | \`${L.promptsDir}/security-review.prompt.md\` |
| Adapt harness to this repo | \`${enhancePrompt}\` — see §0 chat invoke |
| Author a new prompt | \`${L.promptsDir}/create-prompt.prompt.md\` |
| Author a new skill | \`${L.promptsDir}/create-skill.prompt.md\` |
| Author a new agent | \`${L.promptsDir}/create-agent.prompt.md\` |
| Stack generate / review / debug | \`${L.cookbookDir}/prompts/\` |

**Rule:** Prefer cookbook prompts for stack-idiomatic work; prefer AIDLC prompts for lifecycle gates.

---

## 3. How to use the right skills

| Situation | Skill |
|-----------|--------|
| Multi-step plan | \`${skillPath(L, 'planning')}\` |
| Bug / incident | \`${skillPath(L, 'debug')}\` |
| PR review | \`${skillPath(L, 'code-review')}\` |
| Tests | \`${skillPath(L, 'testing')}\` |
| Architecture / ADR | \`${skillPath(L, 'architecture')}\` |
| Context packing | \`${skillPath(L, 'context')}\` |
| CI/CD / release | \`${skillPath(L, 'devops')}\` |
| Eval gates | \`${skillPath(L, 'evaluation')}\` |
| Threat / AuthZ | \`${skillPath(L, 'security')}\` |
| Write better prompts | \`${skillPath(L, 'prompt')}\` |
| Docs | \`${skillPath(L, 'documentation')}\` |
| Stack-specific | skill under \`${L.skillsDir}/\` matching ${label} |

**Cursor:** skills are \`.cursor/skills/{name}/SKILL.md\` (auto-discoverable).  
**Copilot / VS Code:** open the \`.skill.md\` file and attach it.

---

## 4. Agents

| Agent | Path | Use when |
|-------|------|----------|
| Planner | \`${L.agentsDir}/planner.agent.md\` | Complex multi-file planning |
| Coder | \`${L.agentsDir}/coder.agent.md\` | Execution against an approved plan |
| Reviewer | \`${L.agentsDir}/reviewer.agent.md\` | Severity-calibrated review |
| Prompt engineer | \`${L.agentsDir}/prompt-engineer.agent.md\` | Designing new prompts/skills |

Compose agents; do not give them merge authority.

---

## 5. Agent hooks (evidence gates)

Scripts: \`hooks/*.hook.sh\` · Operator notes: \`hooks/README.md\` · Full contract: \`hooks/CONTRACT.md\`  
Registry: \`${L.hooksFile}\`

Use hooks so agents cannot skip plan approval, lint evidence, or high-effect tools. Wire evidence to **this repo’s** verify commands after enhance.

Typical loop: \`plans/{STORY_ID}-plan.md\` → pre-code hook → coding → lint/test evidence → \`reviews/{STORY_ID}-code-review.md\` → pre-review/pre-commit → PR.

---

## 6. MCP connections (relevant + safe)

Specs (all catalog entries shipped): \`${L.mcpsDir}/\`  
Config: \`${L.mcpFile}\`

- \`mcpServers\` starts **empty** (safe default).
- \`_aiesRecommended\` lists enable-ready stubs for this stack/profile: **${recommendedIds.join(', ')}**
- After \`enhance\`, recommendations update from repo signals (Docker, Playwright, Postgres, etc.).
- To enable: copy a stub from \`_aiesRecommended\` → \`mcpServers\`, set env secrets outside git, re-read \`${L.guidesDir}/mcp-when-and-how.md\`.

**Never** commit tokens. Prefer read-only scopes first.

---

## 7. Root instruction files (always present)

| File | Role |
|------|------|
| \`CLAUDE.md\` | Claude Code / multi-IDE contract at repo root |
| \`AGENTS.md\` | Agent-oriented project contract (Cursor/Codex-compatible) |
| \`copilot-instructions.md\` | Copilot-oriented instructions at repo root |
| \`.github/copilot-instructions.md\` | Same content for GitHub Copilot discovery |
| \`${L.rulesFile}\` | Primary IDE rules for **${profile.ide}** |

---

## 8. Layout (${profile.ide})

| Path | Purpose |
|------|---------|
| \`AIES.md\` | This operator guide |
| \`implementation_plan.md\` | Ephemeral-plan **index** (not the active plan) |
| \`plans/{STORY_ID}-plan.md\` | Active plan — temporary |
| \`reviews/{STORY_ID}-code-review.md\` | Review report — temporary |
| \`hooks/\` | Agent evidence-gate scripts |
| \`${L.hooksFile}\` | Hook registry (agentHooks) |
| \`${L.promptsDir}/\` | AIDLC + create/enhance prompts (**IDE**) |
| \`${L.skillsDir}/\` | Skills (**IDE**) |
| \`${L.agentsDir}/\` | Agent definitions (**IDE**) |
| \`${L.cookbookDir}/\` | Full stack cookbook (**repo root**) |
| \`${L.guidesDir}/\` | Handbook slices (**repo root**) |
| \`${L.mcpsDir}/\` | MCP integration specs (**repo root**) |
| \`${L.templatesDir}/\` | System prompt template (**repo root**) |
| \`${L.mcpFile}\` | MCP config (empty \`mcpServers\` by default) |
| \`${L.policyFile}\` | Model + data policy |

**Anti-pattern:** Do not nest cookbook/guides/mcps under \`.github\` — that folder is for Copilot discovery (instructions, prompts, skills, agents) and GitHub metadata only.

---

## 9. Reading path (${profile.maturity})

${maturityReadingPath(profile.maturity)}

## 10. Role next workflow

${SITE_URL}/workflows/${roleNext(profile.role)}

## 11. Online

- Quick start: ${SITE_URL}/quickstart
- Cookbook: ${SITE_URL}/docs/cookbook/${stack.cookbook ?? 'README'}/README
- MCP handbook: ${SITE_URL}/docs/handbook/mcp-when-and-how
- Workflows: ${SITE_URL}/workflows
`;
}

function invokeEnhanceChat(ide, enhancePrompt) {
  switch (ide) {
    case 'cursor':
      return `@${enhancePrompt} Scan this repo and enhance the AIES harness. Follow the XML instructions exactly.`;
    case 'copilot':
      return `#file:${enhancePrompt} Scan this repo and enhance the AIES harness. Follow the XML instructions exactly.`;
    case 'claude-code':
      return `Read ${enhancePrompt} and execute it against this repository.`;
    default:
      return `Open ${enhancePrompt} and execute it — scan first, then patch AIES artifacts only.`;
  }
}

function implementationPlanIndex(promptsDir) {
  return `# Implementation plans (ephemeral index)

> **Not a living document.** Plans exist only for the duration of one story/task.  
> Maintaining a forever-updated root plan is an **anti-pattern**.

## Create a plan for this story

1. Copy \`plans/_TEMPLATE.md\` → \`plans/{STORY_ID}-plan.md\`
2. Fill it with \`${promptsDir}/implementation-plan.prompt.md\` + the planning skill
3. Get human approval before multi-file coding
4. **Attach** \`plans/{STORY_ID}-plan.md\` in every agent chat for that story
5. Attach the plan to the PR; when the PR merges, **stop maintaining it** (archive or delete)

## Naming

| Artifact | Path |
|----------|------|
| Plan | \`plans/{STORY_ID}-plan.md\` |
| Code review report | \`reviews/{STORY_ID}-code-review.md\` |

Examples: \`plans/JIRA-1234-plan.md\`, \`reviews/JIRA-1234-code-review.md\`

## Temporary memory

- Prefer attaching the plan file each session (durable, reviewable)
- Optional: IDE sticky/context include keyed by story id
- Do **not** paste the full plan into \`CLAUDE.md\` / \`AGENTS.md\` / forever rules

See \`plans/README.md\` and \`reviews/README.md\`.
`;
}

function agentHooksRegistry(L) {
  return {
    version: '2',
    description: 'AIES agent hooks — evidence gates for AI-assisted development',
    hooksDir: 'hooks',
    artifacts: {
      plan: 'plans/{STORY_ID}-plan.md',
      review: 'reviews/{STORY_ID}-code-review.md',
    },
    hooks: [
      {
        id: 'pre-planning',
        phase: 'before-plan',
        script: 'hooks/pre-planning.hook.sh',
        requiredEvidence: ['requirements-path', 'risk-tier'],
      },
      {
        id: 'pre-code',
        phase: 'before-code',
        script: 'hooks/pre-code.hook.sh',
        requiredEvidence: ['approved-plan-path', 'human-approval'],
      },
      {
        id: 'post-code',
        phase: 'after-code',
        script: 'hooks/post-code.hook.sh',
        requiredEvidence: ['verify-evidence'],
      },
      {
        id: 'pre-review',
        phase: 'before-review',
        script: 'hooks/pre-review.hook.sh',
        requiredEvidence: ['format-evidence', 'lint-evidence'],
      },
      {
        id: 'pre-commit',
        phase: 'before-commit',
        script: 'hooks/pre-commit.hook.sh',
        requiredEvidence: ['test-evidence', 'secret-scan-evidence'],
      },
      {
        id: 'pre-tool-call',
        phase: 'before-tool',
        script: 'hooks/pre-tool-call.hook.sh',
        requiredEvidence: ['tool-effect', 'approval-if-high'],
      },
      {
        id: 'budget-guard',
        phase: 'budget',
        script: 'hooks/budget-guard.hook.sh',
        requiredEvidence: ['budget-profile', 'budget-remaining'],
      },
      {
        id: 'deployment',
        phase: 'before-deploy',
        script: 'hooks/deployment.hook.sh',
        requiredEvidence: ['release-manifest', 'approval', 'release-evidence'],
      },
    ],
    agentGuidance: {
      beforeMultiFileCoding: `Attach plans/{STORY_ID}-plan.md and confirm human approval`,
      beforePr: `Write reviews/{STORY_ID}-code-review.md; run repo lint/typecheck/test`,
      mcp: `Keep mcpServers empty until human copies from ${L.mcpFile} _aiesRecommended`,
    },
    _aies: {
      hooksGuide: `${SITE_URL}/docs/handbook/hooks-in-practice`,
      contract: 'hooks/CONTRACT.md',
    },
  };
}

/**
 * @param {object} profile
 * @param {{ recommendedMcpIds?: string[] }} [opts]
 */
export function generateStarterKit(profile, opts = {}) {
  const stack = stackMeta(profile.stack);
  const label = STACK_LABELS[profile.stack] ?? profile.stack;
  const now = new Date().toISOString();
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  const L = layoutFor(profile.ide, { cookbookId: stack.cookbook ?? null });
  const recommendedIds = opts.recommendedMcpIds ?? stackMcpIds(profile.stack);
  const recommended = buildRecommendedMcpConfig(recommendedIds);

  const flags = [
    `--stack ${profile.stack}`,
    `--ide ${profile.ide}`,
    `--role ${profile.role}`,
    `--maturity ${profile.maturity}`,
    `--goal ${profile.goal}`,
    `--model ${model}`,
    `--data-class ${dataClass}`,
    '--yes',
  ].join(' ');

  /** @type {Record<string, string>} */
  const files = {};

  for (const name of CORE_PROMPTS) {
    files[`${L.promptsDir}/${name}.prompt.md`] = corpus(`aidlc/${name}.prompt.md`);
  }

  for (const name of CORE_SKILLS) {
    writeSkill(files, L, name, corpus(`skills/${name}.skill.md`));
  }

  for (const name of CORE_AGENTS) {
    files[`${L.agentsDir}/${name}.agent.md`] = corpus(`agents/${name}.agent.md`);
  }

  files[`${L.templatesDir}/system-prompt.template.md`] = corpus('templates/system-prompt.template.md');

  files['plans/README.md'] = corpus('kit/plans-README.md');
  files['plans/_TEMPLATE.md'] = corpus('kit/plan-TEMPLATE.md');
  files['reviews/README.md'] = corpus('kit/reviews-README.md');
  files['reviews/_TEMPLATE.md'] = corpus('kit/review-TEMPLATE.md');

  files['hooks/README.md'] = corpus('kit/hooks-README.md');
  files['hooks/CONTRACT.md'] = corpus('hooks/CONTRACT.md');
  for (const key of Object.keys(EMBEDDED_CORPUS).filter(k => k.startsWith('hooks/') && k.endsWith('.hook.sh'))) {
    files[key] = corpus(key);
  }

  if (stack.cookbook) {
    const keys = cookbookKeys(stack.cookbook);
    for (const key of keys) {
      const rel = key.slice(`cookbook/${stack.cookbook}/`.length);
      files[`${L.cookbookDir}/${rel}`] = corpus(key);
    }
    const skillKey = keys.find(k => k.includes('/skills/') && k.endsWith('.skill.md'));
    if (skillKey) {
      const skillName = pathBasename(skillKey).replace(/\.skill\.md$/, '');
      writeSkill(files, L, skillName, corpus(skillKey));
    }
  }

  files[`${L.guidesDir}/human-in-the-loop.md`] = corpus('handbook/human-in-the-loop.md');
  files[`${L.guidesDir}/evals-as-quality-gates.md`] = corpus('handbook/evals-as-quality-gates.md');
  files[`${L.guidesDir}/mcp-when-and-how.md`] = corpus('handbook/mcp-when-and-how.md');
  files[`${L.guidesDir}/skills-vs-prompts-vs-agents.md`] = corpus('handbook/skills-vs-prompts-vs-agents.md');
  files[`${L.guidesDir}/how-to-set-up-planning.md`] = corpus('handbook/how-to-set-up-planning.md');

  files[`${L.mcpsDir}/README.md`] = corpus('mcps/README.md');
  for (const spec of MCP_SPECS) {
    files[`${L.mcpsDir}/${spec.file}`] = corpus(`mcps/${spec.file}`);
  }

  files[L.policyFile] = modelPolicy(profile);

  const mcpDoc = {
    mcpServers: {},
    _aiesRecommended: recommended,
    _aies: {
      note: 'mcpServers stays empty until a human copies stubs from _aiesRecommended and sets secrets.',
      guide: `${SITE_URL}/docs/handbook/mcp-when-and-how`,
      dataClass,
      recommendedIds,
      specsDir: L.mcpsDir,
    },
  };
  files[L.mcpFile] = JSON.stringify(mcpDoc, null, 2);

  files[L.hooksFile] = JSON.stringify(agentHooksRegistry(L), null, 2);

  const rootInstructions = buildRootInstructions(profile, label, L);
  files['CLAUDE.md'] = rootInstructions;
  files['AGENTS.md'] = rootInstructions;
  files['copilot-instructions.md'] = rootInstructions;
  files['.github/copilot-instructions.md'] = rootInstructions;

  if (profile.ide === 'cursor') {
    files[L.rulesFile] = `---
description: AIES project harness rules
globs:
alwaysApply: true
---

${rootInstructions}
`;
  } else if (profile.ide === 'claude-code') {
    // CLAUDE.md already written as rootInstructions
  } else if (profile.ide === 'copilot') {
    // .github/copilot-instructions.md already written — do not nest cookbook under .github
  } else if (profile.ide === 'continue') {
    files[L.rulesFile] = rootInstructions;
    files['.continue/config.snippet.json'] = JSON.stringify(
      {
        comment: 'Merge into Continue config — do not overwrite blindly',
        contextProviders: [
          { name: 'file', params: { path: 'implementation_plan.md' } },
          { name: 'file', params: { path: L.cookbookDir } },
          { name: 'file', params: { path: L.skillsDir } },
          { name: 'file', params: { path: L.promptsDir } },
        ],
      },
      null,
      2,
    );
  } else {
    files[L.rulesFile] = rootInstructions;
  }

  files['implementation_plan.md'] = implementationPlanIndex(L.promptsDir);

  files['AIES.md'] = buildAiesReadme({
    profile: { ...profile, model, dataClass },
    label,
    L,
    stack,
    flags,
    now,
    recommendedIds,
  });

  return {
    stack: profile.stack,
    generatedAt: now,
    profile: { ...profile, model, dataClass },
    layout: describeInstallLayout(profile.ide, { cookbookId: stack.cookbook ?? null }),
    files,
  };
}

/**
 * Enhance mode: rescan repo, refresh MCP recommendations + AIES.md section, keep corpus.
 * Requires an existing profile — recovered from AIES.md markers or passed flags.
 */
export function enhanceStarterKit(cwd, profile) {
  const { signals, recommendedMcpIds } = detectRepoSignals(cwd, fs);
  const mergedIds = [...new Set([...stackMcpIds(profile.stack), ...recommendedMcpIds])];
  const bundle = generateStarterKit(profile, { recommendedMcpIds: mergedIds });

  const scanReport = `# AIES repo scan

Generated: ${new Date().toISOString()}

## Signals detected

\`\`\`json
${JSON.stringify(signals, null, 2)}
\`\`\`

## Recommended MCP ids

${mergedIds.map(id => `- ${id}`).join('\n')}

## Next

1. Review \`${layoutFor(profile.ide, { cookbookId: stackMeta(profile.stack).cookbook }).mcpFile}\` → \`_aiesRecommended\`
2. Run \`${layoutFor(profile.ide, { cookbookId: stackMeta(profile.stack).cookbook }).promptsDir}/enhance-repo.prompt.md\` in your IDE agent
3. Fill \`implementation_plan.md\` before multi-file coding
`;

  bundle.files['AIES_REPO_SCAN.md'] = scanReport;
  bundle.scan = { signals, recommendedMcpIds: mergedIds };
  return bundle;
}

export function renderBashInstallScript(bundle) {
  const lines = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    'echo "AIES kit — scaffolding IDE-native harness into $(pwd)"',
    '',
  ];
  for (const [relPath, content] of Object.entries(bundle.files)) {
    const dir = relPath.includes('/') ? relPath.slice(0, relPath.lastIndexOf('/')) : '';
    if (dir) lines.push(`mkdir -p "${dir}"`);
    const delim = `AIES_EOF_${Buffer.from(relPath).toString('hex').slice(0, 12)}`;
    lines.push(`cat > "${relPath}" <<'${delim}'`);
    lines.push(content.replace(/\r\n/g, '\n'));
    lines.push(delim);
    lines.push('');
  }
  lines.push('echo "Done. Read AIES.md — then: npx @grvmithas/create-aies-kit enhance"');
  lines.push(`echo "Open: ${SITE_URL}/quickstart"`);
  return lines.join('\n');
}

export function renderPowerShellInstallScript(bundle) {
  const lines = [
    '$ErrorActionPreference = "Stop"',
    'Write-Host "AIES kit — scaffolding IDE-native harness into $(Get-Location)"',
    '',
  ];
  for (const [relPath, content] of Object.entries(bundle.files)) {
    const dir = relPath.includes('/') ? relPath.slice(0, relPath.lastIndexOf('/')) : '';
    const psPath = relPath.replace(/\//g, '\\');
    if (dir) {
      lines.push(`New-Item -ItemType Directory -Force -Path "${dir.replace(/\//g, '\\')}" | Out-Null`);
    }
    const b64 = Buffer.from(content, 'utf8').toString('base64');
    lines.push(
      `[System.IO.File]::WriteAllText((Join-Path (Get-Location) "${psPath}"), [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("${b64}")))`,
    );
  }
  lines.push('Write-Host "Done. Read AIES.md — then: npx @grvmithas/create-aies-kit enhance"');
  lines.push(`Write-Host "Open: ${SITE_URL}/quickstart"`);
  return lines.join('\n');
}
