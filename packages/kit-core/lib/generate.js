import fs from 'node:fs';
import { EMBEDDED_CORPUS } from './embedded-corpus.js';
import {
  MCP_SPECS,
  buildRecommendedMcpConfig,
  detectRepoSignals,
  renderCodexMcpToml,
  renderMcpServers,
  stackMcpIds,
} from './mcp-catalog.js';
import { describeInstallLayout, layoutFor } from './install-api.js';
import { KIT_VERSION, SITE_URL, STACK_LABELS, STACKS, normalizeIde } from './options.js';
import { detectVerifyCommands } from './repo-scan.js';
import { renderEvalFiles, renderGatesWorkflow } from './evals.js';

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

const CORE_AGENTS = ['planner', 'coder', 'reviewer', 'security', 'testing', 'prompt-engineer', 'parallel-implementer'];

/** Skills preloaded into Claude Code subagents via the `skills` frontmatter field. */
const AGENT_SKILLS = {
  planner: ['planning', 'architecture'],
  coder: ['testing'],
  reviewer: ['code-review'],
  security: ['security'],
  testing: ['testing'],
  'prompt-engineer': ['prompt'],
  'parallel-implementer': ['testing'],
};

const GUIDES = [
  'human-in-the-loop',
  'evals-as-quality-gates',
  'mcp-when-and-how',
  'skills-vs-prompts-vs-agents',
  'how-to-set-up-planning',
  'parallel-agents-and-worktrees',
  'native-agent-hooks',
  'agent-skills-standard',
  'ide-native-subagents',
];

const GUARD_CMD = 'node hooks/aies-guard.mjs';

const CLAUDE_MATCHERS = ['Bash', 'Edit|Write|MultiEdit|NotebookEdit', 'Read'];

const OPENCODE_GUARD_PLUGIN = `// AIES guard adapter for opencode — runs hooks/aies-guard.mjs before every tool call.
// A non-zero exit (deny) or a failure to run the guard blocks the tool: the adapter fails closed.
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

export const AiesGuard = async ({ directory }) => ({
  'tool.execute.before': async (input, output) => {
    const payload = JSON.stringify({ tool_name: input.tool, tool_input: output.args, cwd: directory });
    const result = spawnSync(process.execPath, [join(directory, 'hooks', 'aies-guard.mjs'), '--target', 'opencode'], {
      input: payload,
      encoding: 'utf8',
      timeout: 15000,
    });
    if (result.status !== 0) {
      throw new Error(result.stderr?.trim() || 'AIES guard could not run; the action is blocked (fail closed).');
    }
  },
});
`;

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

/** Minimal frontmatter parser for the flat `key: value` blocks the AIES corpus uses. */
export function parseFrontmatter(md) {
  const text = md.replace(/^\uFEFF/, '');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: text };
  /** @type {Record<string, string>} */
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1);
      }
    }
    data[kv[1]] = value;
  }
  return { data, body: text.slice(match[0].length).replace(/^\s+/, '') };
}

function yamlScalar(value) {
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  const s = String(value);
  return /^[\w./@-][\w ./@,()-]*$/.test(s) && !/^(true|false|null|yes|no)$/i.test(s) ? s : JSON.stringify(s);
}

/** Render a YAML frontmatter block. Arrays → block lists, plain objects → one nested level. */
function frontmatter(obj) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${yamlScalar(item)}`);
    } else if (typeof value === 'object') {
      lines.push(`${key}:`);
      for (const [k, v] of Object.entries(value)) lines.push(`  ${k}: ${yamlScalar(v)}`);
    } else {
      lines.push(`${key}: ${yamlScalar(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function tomlString(value) {
  return JSON.stringify(String(value));
}

/** TOML literal multi-line string: no escape processing, so regexes and backslashes survive. */
function tomlLiteralBlock(text) {
  return `'''\n${text.replace(/'''/g, "'\u2019'")}\n'''`;
}

function firstSentence(text, max = 300) {
  const t = text.replace(/\s+/g, ' ').trim();
  const cut = t.match(/^(.{20,}?[.!?])(\s|$)/)?.[1] ?? t;
  return cut.slice(0, max);
}

function promptDescription(src, name) {
  const purpose = src.match(/\*\*Purpose:\*\*\s*(.+)/)?.[1] ?? src.match(/## Purpose\s*\n+([^\n]+)/)?.[1];
  return firstSentence(purpose ?? `AIES ${name.replace(/-/g, ' ')} prompt`, 200);
}

function skillMarkdown(name, src) {
  const { data, body } = parseFrontmatter(src);
  const description = data.description
    ?? firstSentence(src.match(/## Purpose\s*\n+([^\n]+)/)?.[1] ?? `AIES ${name} procedure.`, 1000);
  return `${frontmatter({ name, description: description.slice(0, 1024) })}\n${body}`;
}

function isReadOnly(data) {
  return data.privilege === 'read-only' || !/\b(Edit|Write)\b/.test(data.tools ?? '');
}

/**
 * Render one agent definition into the native format of a target.
 * @returns {{ path: string, content: string } | null}
 */
export function renderAgent(L, name, src) {
  if (!L.agentFormat) return null;
  const { data, body } = parseFrontmatter(src);
  const agentName = data.name ?? name;
  const description = data.description ?? firstSentence(body, 300);
  const readonly = isReadOnly(data);
  const dir = L.agentsDir;

  switch (L.agentFormat) {
    case 'claude':
      return {
        path: `${dir}/${agentName}.md`,
        content: `${frontmatter({
          name: agentName,
          description,
          tools: data.tools,
          model: data.model ?? 'inherit',
          skills: AGENT_SKILLS[agentName],
          isolation: data.isolation,
        })}\n${body}`,
      };
    case 'cursor':
      return {
        path: `${dir}/${agentName}.md`,
        content: `${frontmatter({ name: agentName, description, model: 'inherit', readonly })}\n${body}`,
      };
    case 'copilot':
      return {
        path: `${dir}/${agentName}.agent.md`,
        content: `${frontmatter({
          name: agentName,
          description,
          tools: readonly ? ['read', 'search'] : ['read', 'search', 'edit', 'execute'],
        })}\n${body}`,
      };
    case 'gemini':
      return {
        path: `${dir}/${agentName}.md`,
        content: `${frontmatter({
          name: agentName,
          description,
          kind: 'local',
          tools: readonly ? ['read_file', 'grep_search'] : undefined,
          max_turns: 30,
        })}\n${body}`,
      };
    case 'opencode':
      return {
        path: `${dir}/${agentName}.md`,
        content: `${frontmatter({
          description,
          mode: 'subagent',
          permission: { edit: readonly ? 'deny' : 'allow', bash: 'ask' },
        })}\n${body}`,
      };
    case 'codex':
      return {
        path: `${dir}/${agentName}.toml`,
        content: [
          `name = ${tomlString(agentName)}`,
          `description = ${tomlString(description)}`,
          `developer_instructions = ${tomlLiteralBlock(
            readonly
              ? `READ-ONLY ROLE: never edit files or run state-changing commands; report findings to the parent.\n\n${body.trim()}`
              : body.trim(),
          )}`,
          '',
        ].join('\n'),
      };
    default:
      return null;
  }
}

/**
 * Render one AIDLC prompt as a native slash command / prompt file.
 * @returns {{ path: string, content: string }}
 */
export function renderCommand(L, name, src) {
  const body = parseFrontmatter(src).body;
  const description = promptDescription(src, name);
  const dir = L.commandsDir;
  switch (L.commandFormat) {
    case 'described-md':
      return { path: `${dir}/${name}.md`, content: `${frontmatter({ description })}\n${body}` };
    case 'copilot-prompt':
      return { path: `${dir}/${name}.prompt.md`, content: `${frontmatter({ description, agent: 'agent' })}\n${body}` };
    case 'gemini-toml':
      return {
        path: `${dir}/${name}.toml`,
        content: `description = ${tomlString(description)}\nprompt = ${tomlLiteralBlock(body.trim())}\n`,
      };
    case 'kiro-steering':
      return { path: `${dir}/aies-${name}.md`, content: `${frontmatter({ inclusion: 'manual' })}${body}` };
    case 'skill':
      return {
        path: `${dir}/${name}/SKILL.md`,
        content: `${frontmatter({ name, description: `${description} Run when the user invokes /${name}.`.slice(0, 1024) })}\n${body}`,
      };
    case 'continue-prompt':
      return { path: `${dir}/${name}.prompt`, content: `${frontmatter({ name, description, invokable: true })}\n${body}` };
    case 'plain-md':
    default:
      return { path: `${dir}/${name}.md`, content: body };
  }
}

/** Native hook wiring for the guard script. Returns null when the target has no project hooks. */
export function renderHookConfig(L) {
  switch (L.hookFormat) {
    case 'claude':
      return {
        $schema: 'https://json.schemastore.org/claude-code-settings.json',
        permissions: {
          deny: ['Read(./.env)', 'Read(./.env.local)', 'Read(./.env.production)', 'Read(./**/*.pem)', 'Read(./**/id_rsa)'],
        },
        hooks: {
          PreToolUse: CLAUDE_MATCHERS.map(matcher => ({
            matcher,
            hooks: [
              {
                type: 'command',
                command: 'node "$CLAUDE_PROJECT_DIR/hooks/aies-guard.mjs" --target claude',
                timeout: 15,
                onFailure: 'block',
              },
            ],
          })),
        },
      };
    case 'cursor':
      return {
        version: 1,
        hooks: {
          beforeShellExecution: [{ command: `${GUARD_CMD} --target cursor`, timeout: 15, failClosed: true }],
          beforeReadFile: [{ command: `${GUARD_CMD} --target cursor --event read`, timeout: 15, failClosed: true }],
          preToolUse: [{ command: `${GUARD_CMD} --target cursor`, timeout: 15, failClosed: true }],
        },
      };
    case 'codex':
      return {
        hooks: {
          PreToolUse: [
            { matcher: 'Bash', hooks: [{ type: 'command', command: `${GUARD_CMD} --target codex --event shell`, timeout: 15 }] },
            { matcher: 'Edit|Write', hooks: [{ type: 'command', command: `${GUARD_CMD} --target codex --event write`, timeout: 15 }] },
          ],
        },
      };
    case 'gemini':
      return {
        hooks: {
          BeforeTool: [
            { matcher: 'run_shell_command', hooks: [{ type: 'command', command: `${GUARD_CMD} --target gemini --event shell`, timeout: 15000 }] },
            { matcher: 'write_file|replace', hooks: [{ type: 'command', command: `${GUARD_CMD} --target gemini --event write`, timeout: 15000 }] },
            { matcher: 'read_file|read_many_files', hooks: [{ type: 'command', command: `${GUARD_CMD} --target gemini --event read`, timeout: 15000 }] },
          ],
        },
      };
    case 'devin':
      return {
        PreToolUse: [{ hooks: [{ type: 'command', command: `${GUARD_CMD} --target devin`, timeout: 15 }] }],
      };
    case 'opencode':
      return OPENCODE_GUARD_PLUGIN;
    case 'copilot':
      return {
        version: 1,
        hooks: {
          preToolUse: [
            {
              type: 'command',
              bash: `${GUARD_CMD} --target copilot`,
              powershell: `${GUARD_CMD} --target copilot`,
              timeoutSec: 15,
            },
          ],
        },
      };
    case 'kiro':
      return {
        version: 'v1',
        hooks: [
          ...['shell', 'write', 'read'].map(category => ({
            name: `aies-guard-${category}`,
            description: `AIES deterministic ${category} policy (see hooks/README.md)`,
            trigger: 'PreToolUse',
            matcher: category,
            action: { type: 'command', command: `${GUARD_CMD} --target kiro --event ${category}` },
          })),
        ],
      };
    default:
      return null;
  }
}

/** Empty, valid MCP config for the target — servers are enabled by a human from mcps/recommended.json. */
export function renderMcpConfig(L, recommendedIds) {
  switch (L.mcpFormat) {
    case 'portable':
    case 'cursor':
      return JSON.stringify({ mcpServers: {} }, null, 2);
    case 'gemini':
      return JSON.stringify({ context: { fileName: ['AGENTS.md', 'GEMINI.md'] }, mcpServers: {} }, null, 2);
    case 'opencode':
      return JSON.stringify({ $schema: 'https://opencode.ai/config.json', mcp: {} }, null, 2);
    case 'codex':
      return [
        '# AIES — Codex project config. MCP servers stay commented until a human approves them.',
        '# Guide: mcps/README.md · recommendations: mcps/recommended.json',
        '# Subagents in .codex/agents/ inherit these; agent TOML files cannot override them.',
        'sandbox_mode = "workspace-write"',
        'approval_policy = "on-request"',
        '',
        renderCodexMcpToml(recommendedIds),
      ].join('\n');
    default:
      return null;
  }
}

function setupSteps(stack) {
  const node = ['react', 'nextjs', 'react-native', 'nodejs', 'nestjs'].includes(stack);
  const python = ['python', 'fastapi'].includes(stack);
  const steps = ['      - uses: actions/checkout@v4'];
  if (node) {
    steps.push('      - uses: actions/setup-node@v4', '        with:', '          node-version: 22', '          cache: npm', '      - run: npm ci');
  } else if (python) {
    steps.push('      - uses: actions/setup-python@v5', '        with:', "          python-version: '3.12'", '      - run: pip install -r requirements.txt || pip install -e .');
  } else if (stack === 'java') {
    steps.push('      - uses: actions/setup-java@v4', '        with:', '          distribution: temurin', '          java-version: 21', '      - run: ./mvnw -B -q dependency:go-offline || ./gradlew --no-daemon dependencies');
  } else if (stack === 'dotnet') {
    steps.push('      - uses: actions/setup-dotnet@v4', '        with:', '          dotnet-version: 9.0.x', '      - run: dotnet restore');
  }
  return steps.join('\n');
}

function copilotSetupSteps(stack) {
  return `# Prepares the GitHub Copilot cloud agent environment. The job name must stay "copilot-setup-steps".
name: Copilot Setup Steps

on:
  workflow_dispatch:
  push:
    paths: [.github/workflows/copilot-setup-steps.yml]
  pull_request:
    paths: [.github/workflows/copilot-setup-steps.yml]

jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    permissions:
      contents: read
    steps:
${setupSteps(stack)}
`;
}

function installCommand(stack) {
  if (['react', 'nextjs', 'react-native', 'nodejs', 'nestjs'].includes(stack)) return 'npm ci';
  if (['python', 'fastapi'].includes(stack)) return 'pip install -r requirements.txt';
  if (stack === 'java') return './mvnw -B -q dependency:go-offline';
  if (stack === 'dotnet') return 'dotnet restore';
  return '';
}

function modelPolicy(profile) {
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  return `# Model & data policy (AIES)

Generated for: **${model}** · data class **${dataClass}**

## Route by task class, not by vendor loyalty

| Task class | Model tier | Reasoning effort | Why |
|------------|-----------|------------------|-----|
| Planning, architecture, root-cause analysis | Frontier | high | Errors here multiply across every downstream task |
| Implementation against an approved plan | Frontier or strong mid-tier | medium | Plan carries the hard reasoning; cost scales with volume |
| Review / security pass | Frontier, **different family than the author** when available | high | Correlated blind spots defeat same-model review |
| Exploration, search, summarization subagents | Fast / small tier | low | Read-heavy, high-volume, low blast radius |
| Bulk mechanical edits (renames, codemods) | Fast tier + deterministic tooling | low | Prefer codemods; model only for the long tail |

Subagent definitions default to \`model: inherit\`. Override per agent only with a measured reason (eval delta or cost), and record it in the PR.

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
      ? '- Confidential/regulated: prefer private endpoints / VPC; disable training opt-in.\n- No production PII in prompts, traces, or MCP tool args.\n- MCP servers stay empty until security approves an allowlist.\n- Cloud/background agents only on approved runners; no production credentials in agent environments.\n- Require HITL for any tool that can write external systems.'
      : '- Internal data: use org-approved providers only.\n- Redact secrets and customer identifiers from prompts and logs.\n- MCP: enable only servers from `mcps/recommended.json` after handbook review.'
}

## Non-negotiables

1. Human review is accountable — model output is advisory
2. Multi-file work uses approved \`plans/{STORY_ID}-plan.md\` (ephemeral)
3. Parallel agents: one task contract per worktree (\`plans/_TASK_CONTRACT.md\`), at most 4 at once
4. MCP config stays empty until a human enables reviewed servers
5. Eval gates for AI-touched paths before production

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
3. Read \`guides/native-agent-hooks.md\`; keep the guard on; enable MCP only from \`mcps/recommended.json\`
4. Online: ${SITE_URL}/workflows`;
  }
  if (maturity === 'advanced') {
    return `1. Enhance repo + \`guides/ide-native-subagents.md\` + \`guides/native-agent-hooks.md\`
2. Run 2–4 agents in parallel with \`guides/parallel-agents-and-worktrees.md\` and \`scripts/aies-worktree.mjs\`
3. Security skill before write tools; story-scoped plans/reviews
4. Online: ${SITE_URL}/docs/04-agent-engineering/README`;
  }
  return `1. Enhance repo + SoA mapping (${SITE_URL}/portal)
2. Migration bible: ${SITE_URL}/docs/handbook/ai-migration-bible-path
3. Eval CI + MCP allowlists + guard hooks + segregation of duties; cloud agents PR-only
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

function commandRef(L, name) {
  return renderCommand(L, name, '').path;
}

function invokeEnhanceChat(ide, L) {
  const path = commandRef(L, 'enhance-repo');
  switch (ide) {
    case 'cursor':
      return '/enhance-repo Scan this repo and enhance the AIES harness. Follow the XML instructions exactly.';
    case 'claude-code':
      return '/enhance-repo';
    case 'copilot':
      return '/enhance-repo  (or: #file:.github/prompts/enhance-repo.prompt.md Scan this repo and enhance the AIES harness.)';
    case 'gemini-cli':
      return '/aies:enhance-repo';
    case 'opencode':
      return '/enhance-repo';
    case 'windsurf':
      return '/enhance-repo';
    case 'kiro':
      return '#aies-enhance-repo Scan this repo and enhance the AIES harness.';
    default:
      return `Read ${path} and execute it against this repository — scan first, then patch AIES artifacts only.`;
  }
}

export const VERIFY_PLACEHOLDER = '(fill in)';

function verifyBlock(verify) {
  const commands = verify?.commands ?? {};
  const required = ['lint', 'typecheck', 'test'];
  const keys = [...required, ...(commands.build ? ['build'] : [])];
  const width = Math.max(...keys.map(k => (commands[k] ?? '').length), 0);
  const lines = keys.map(k => (commands[k] ? `${commands[k].padEnd(width)}  # ${k}` : `# ${k.padEnd(9)} → ${VERIFY_PLACEHOLDER}`));
  const missing = required.filter(k => !commands[k]);
  const lead = verify?.sources?.length
    ? `Detected from ${verify.sources.join(', ')}. Confirm these match CI.`
    : 'No verification commands detected.';
  const tail = missing.length
    ? ` Replace each \`${VERIFY_PLACEHOLDER}\` line with this repo's exact command, or \`none\` with a reason; \`audit\` fails until you do.`
    : '';
  return `Run every command below and report each result before claiming done. ${lead}${tail}

\`\`\`bash
${lines.join('\n')}
\`\`\``;
}

function buildAgentsMd(profile, label, L, verify) {
  return `# AGENTS.md — ${label}

> Canonical agent instructions (AGENTS.md standard, Agentic AI Foundation). Read natively by Codex, Cursor,
> GitHub Copilot, Gemini CLI (via \`.gemini/settings.json\`), Kiro, Devin Desktop, opencode, Zed, and Junie.
> Tool-specific files (\`CLAUDE.md\`, \`.cursor/rules/\`, \`.github/copilot-instructions.md\`, …) add deltas only.
> Generated by AIES kit ${KIT_VERSION}. Run \`npx @grvmithas/create-aies-kit@latest enhance\` to refresh.

## Profile

- Stack: ${label}
- Role: ${profile.role}
- Primary agent runtime: ${profile.ide}
- Model: ${profile.model ?? 'undecided'} (see \`MODEL_POLICY.md\` for routing by task class)
- Data class: ${profile.dataClass ?? 'internal'}

## Non-negotiables

1. Multi-file work requires an approved \`plans/{STORY_ID}-plan.md\` (ephemeral; attach it every session).
2. Parallel work: one task per worktree with a filled \`plans/{TASK_ID}-contract.md\`; never edit outside its Allowed paths.
3. Never push to protected branches, force-push, \`reset --hard\`, or bypass hooks (\`--no-verify\`). The guard hook enforces this; do not route around a denial — stop and ask.
4. External effects (publish, deploy, apply, destructive SQL) are human-run after approval.
5. No secrets in prompts, logs, commits, or MCP args. Never print \`.env\` files.
6. Respect this repo's lint, typecheck, format, and test configs — never weaken them to pass.
7. Write \`reviews/{STORY_ID}-code-review.md\` on AI-touched PRs. A human owns every merge.

## Verify before claiming done

${verifyBlock(verify)}

## Where things live

| Need | Path |
|------|------|
| Operator guide | \`AIES.md\` |
| Skills (Agent Skills standard) | \`.agents/skills/<name>/SKILL.md\` |
| Slash commands / prompts | \`${L.commandsDir}/\` |
| Subagents | \`${L.agentsDir ?? 'n/a for this runtime — use the roles below'}\` |
| Plans · task contracts · reviews | \`plans/\` · \`plans/_TASK_CONTRACT.md\` · \`reviews/\` |
| Guard hook · CI gates | \`hooks/aies-guard.mjs\` · \`templates/ci/aies-gates.yml\` |
| Evals (golden set + gate) | \`evals/\` |
| Parallel worktrees | \`node scripts/aies-worktree.mjs\` |
| Stack cookbook | \`${L.cookbookDir}/\` |
| MCP specs (recommended only) · config | \`mcps/\` · \`mcps/recommended.json\` |
| Model & data policy | \`MODEL_POLICY.md\` |

## Roles

| Role | Authority | Use when |
|------|-----------|----------|
| planner | read-only | Decompose an approved story into a dependency-ordered plan |
| coder | workspace-write | Implement an approved plan, nothing more |
| parallel-implementer | workspace-write, own worktree | Execute one task contract in isolation |
| reviewer | read-only | Severity-calibrated review with file:line evidence |
| security | read-only | AuthN/AuthZ, data access, secrets, supply chain |
| testing | workspace-write | Tests and coverage for changed behavior |

## Workflow

Enhance → plan (approve) → [split into task contracts + worktrees if parallel] → code → verify → review report → PR → human merge in dependency order.
`;
}

function buildToolDelta(profile, L) {
  const pointer = 'Follow `AGENTS.md` (canonical). This file adds runtime-specific notes only.';
  switch (L.ide) {
    case 'claude-code':
      return `@AGENTS.md

# Claude Code notes

${pointer}

- Subagents: \`.claude/agents/\` — delegate review to \`reviewer\` and security to \`security\`; they are read-only.
- Slash commands: \`.claude/commands/\` (\`/story-kickoff\`, \`/implementation-plan\`, \`/coding\`, \`/enhance-repo\`, …).
- Skills: \`.claude/skills/\` mirrors \`.agents/skills/\` (regenerate with \`enhance\`; edit the \`.agents\` copy).
- Hooks + permission denies: \`.claude/settings.json\` runs \`hooks/aies-guard.mjs\` (with \`onFailure: "block"\`) before every Bash, Edit/Write, and Read call.
- \`CLAUDE.local.md\` replaces the \`@AGENTS.md\` import for that user — keep personal notes elsewhere or re-import \`@AGENTS.md\`.
- Parallel work: \`parallel-implementer\` runs with \`isolation: worktree\`; for long tasks prefer \`node scripts/aies-worktree.mjs new <task>\` and a separate session per worktree.
`;
    case 'cursor':
      return `${frontmatter({ description: 'AIES harness — Cursor-specific deltas to AGENTS.md', alwaysApply: true })}
${pointer}

- Subagents: \`.cursor/agents/\` (reviewer/security/planner are \`readonly\`).
- Commands: \`.cursor/commands/\` — type \`/\` in Agent chat.
- Skills: discovered from \`.agents/skills/\`.
- Hooks: \`.cursor/hooks.json\` runs \`hooks/aies-guard.mjs\` (\`failClosed: true\`) before shell commands, tool calls, and file reads; a denial is final — ask the human.
- Parallel work: one Cloud Agent or local worktree per task contract; never two agents on one branch.
`;
    case 'copilot':
      return `# Copilot instructions

${pointer}

- Custom agents: \`.github/agents/*.agent.md\`. Prompt files: \`.github/prompts/*.prompt.md\` (type \`/\` in chat).
- Skills: discovered from \`.agents/skills/\`.
- Hooks: \`.github/hooks/aies-guard.json\` (CLI, VS Code, cloud agent).
- Cloud agent environment: \`.github/workflows/copilot-setup-steps.yml\`. Cloud agent PRs are drafts a human reviews.
`;
    case 'kiro':
      return `${frontmatter({ inclusion: 'always' })}# AIES — Kiro steering

${pointer}

- Prompts are manual steering files: reference \`#aies-coding\`, \`#aies-implementation-plan\`, … in chat.
- Skills: \`.kiro/skills/\` mirrors \`.agents/skills/\` (Kiro does not read \`.agents/\`).
- Hooks: \`.kiro/hooks/aies-guard.json\` runs \`hooks/aies-guard.mjs\` before shell, write, and read tools.
`;
    case 'windsurf':
      return `${frontmatter({ trigger: 'always_on', description: 'AIES harness deltas' })}
${pointer}

- Commands are skills (workflows are deprecated): \`.devin/skills/<name>/SKILL.md\` — invoke with \`/story-kickoff\`, \`/coding\`, …
- Skills: discovered from \`.agents/skills/\`.
- Hooks: \`.devin/hooks.v1.json\` runs \`hooks/aies-guard.mjs\` before every tool call. Hooks are off in Restricted Mode — keep branch protection on.
- MCP: \`.devin/mcp_config.json\` (empty until a human approves servers).
`;
    case 'continue':
      return `${frontmatter({ name: 'AIES harness', alwaysApply: true })}
${pointer}

- Prompts: \`.continue/prompts/\` (invokable as slash commands).
- Skills: open the relevant \`.agents/skills/<name>/SKILL.md\` and attach it.
`;
    default:
      return null;
  }
}

function buildAiesReadme({ profile, label, L, stack, flags, recommendedIds }) {
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  const cmd = name => `\`${commandRef(L, name)}\``;

  return `# AIES — Operator guide (${label})

**Kit:** ${KIT_VERSION} · upgrade with \`npx @grvmithas/create-aies-kit@latest enhance\` (your edits are kept; see §12)  
**Profile:** ${profile.role} · ${profile.ide} · ${profile.maturity} · ${label} · model **${model}** · data **${dataClass}**

This install is **always complete** for the selected runtime. Every file is written to a path that runtime loads natively.
\`AGENTS.md\` and \`.agents/skills/\` are the cross-tool canon; teammates on other tools get the same rules and skills.

---

## 0. Start here

1. **Read this file**, then \`AGENTS.md\`.
2. **Refresh kit signals** (MCP recommendations from a repo scan):

\`\`\`bash
npx @grvmithas/create-aies-kit@latest enhance
\`\`\`

3. **Run the enhance command in your agent** (copy-paste):

\`\`\`text
${invokeEnhanceChat(L.ide, L)}
\`\`\`

Prompt path: ${cmd('enhance-repo')}  
That scan fills \`AGENTS.md\` with this repo's real lint/test commands, layout, and guardrails.

4. Create an **ephemeral** plan: \`plans/{STORY_ID}-plan.md\` — approve before multi-file coding.
5. Code with the plan attached → write \`reviews/{STORY_ID}-code-review.md\` → open PR with both attached.

**Re-install (force):** \`npx @grvmithas/create-aies-kit@latest ${flags} --force\`

---

## 1. Ephemeral plans, task contracts & review reports

| Artifact | Path | After merge |
|----------|------|-------------|
| Plan | \`plans/{STORY_ID}-plan.md\` | Attach to PR; archive or delete — **do not maintain** |
| Task contract (parallel work) | \`plans/{TASK_ID}-contract.md\` | Lives in the task's worktree; dies with the branch |
| Code review | \`reviews/{STORY_ID}-code-review.md\` | Attach to PR; freeze — file issues for leftovers |
| Index only | \`implementation_plan.md\` | Points here — not the active plan |

---

## 2. Parallel agents & worktrees

One task · one branch · one worktree · one base commit. At most **4** agents at once.

\`\`\`bash
node scripts/aies-worktree.mjs new JIRA-123-api      # branch agent/JIRA-123-api, ports + DB schema isolated
#   → fill plans/JIRA-123-api-contract.md (Allowed paths, Acceptance, Stop conditions), start an agent in that folder
node scripts/aies-worktree.mjs check JIRA-123-api    # fails if the agent touched files outside the contract
node scripts/aies-worktree.mjs overlap               # shared files between branches → decides merge order
node scripts/aies-worktree.mjs remove JIRA-123-api   # after the PR merges
\`\`\`

Merge serially in dependency order and re-run verification after **each** merge. Guide: \`guides/parallel-agents-and-worktrees.md\`.

---

## 3. Commands (prompts)

| Situation | Command |
|-----------|---------|
| New story / kickoff | ${cmd('story-kickoff')} |
| Build the plan | ${cmd('implementation-plan')} |
| Implement approved plan | ${cmd('coding')} |
| Security pass | ${cmd('security-review')} |
| Adapt harness to this repo | ${cmd('enhance-repo')} |
| Author a prompt / skill / agent | ${cmd('create-prompt')} · ${cmd('create-skill')} · ${cmd('create-agent')} |
| Stack generate / review / debug | \`${L.cookbookDir}/prompts/\` |

---

## 4. Skills (Agent Skills standard)

Canonical: \`.agents/skills/<name>/SKILL.md\` — \`name\` matches the folder, \`description\` says what + when, body < 500 lines.
${L.skillMirrorDir ? `Mirrored to \`${L.skillMirrorDir}/\` because ${L.ide} reads skills there. Edit the \`.agents\` copy; \`enhance\` re-syncs.\n` : ''}
Core: planning · debug · code-review · testing · architecture · context · devops · evaluation · security · prompt · documentation, plus the ${label} stack skill.
Agents load skills on demand from their descriptions; you can also invoke one explicitly by name.

---

## 5. Subagents

${L.agentsDir ? `Native definitions in \`${L.agentsDir}/\`:

| Agent | Authority | Use when |
|-------|-----------|----------|
| planner | read-only | Complex multi-file planning |
| coder | workspace-write | Execution against an approved plan |
| parallel-implementer | workspace-write in its own worktree | One task contract, isolated |
| reviewer | read-only | Severity-calibrated review |
| security | read-only | Threat / AuthZ / secrets pass |
| testing | workspace-write | Tests for changed behavior |
| prompt-engineer | workspace-write | Designing prompts/skills |

Read-only agents cannot edit files. No agent has merge authority.` : `${profile.ide} has no project-level subagent files; the roles in \`AGENTS.md\` apply to the main agent.`}

---

## 6. Hooks

${L.hooksFile ? `\`${L.hooksFile}\` wires \`hooks/aies-guard.mjs\` into the runtime: destructive git, force pushes, pushes to protected branches, pipe-to-shell, destructive SQL, deploy/publish, \`sudo\`, and printing secrets are **denied before execution**. Edits to the agent's own guardrails (hook, permission, MCP, and CI config) and reads of secret files are denied too, and a guard crash denies the action.${L.ide === 'codex' ? ' Codex skips new or changed hooks until you trust them: run `/hooks` once after install.' : ''}` : `${profile.ide} has no project-level hook config. \`hooks/aies-guard.mjs\` still works from CI or git hooks; rely on branch protection for enforcement.`}
CI gates: copy \`templates/ci/aies-gates.yml\` to \`.github/workflows/\` — it runs \`node hooks/aies-guard.mjs --self-test\`, the harness audit, this repo's verify commands, and the evals in \`evals/\`. See \`hooks/README.md\`.

---

## 7. MCP

Specs: \`mcps/\` · Config: ${L.mcpFile ? `\`${L.mcpFile}\` (empty by default)` : 'user-level only for this runtime — see `mcps/README.md`'} · Ready-to-paste: \`mcps/recommended.json\`

Recommended for this repo: **${recommendedIds.join(', ')}**. Prefer vendor-hosted Streamable HTTP servers with OAuth (no tokens in the repo) and read-only endpoints first.
\`mcps/\` holds specs for the recommended servers only; the full catalog is at ${SITE_URL}/docs/mcps/README. \`enhance\` adds specs when the repo scan recommends new servers.

---

## 8. Cloud & background agents

${L.ide === 'copilot' ? '- `.github/workflows/copilot-setup-steps.yml` prepares the Copilot cloud agent environment.\n' : ''}${L.ide === 'cursor' ? '- `.cursor/environment.json` gives Cursor Cloud Agents the install step.\n' : ''}- Cloud agents work on their own branch and open **draft** PRs; the same guard, contracts, and review rules apply.
- Never give cloud agents production credentials. Template workflows for headless review live in \`templates/ci/\`.

---

## 9. Layout (${profile.ide})

${describeLayoutTable(L)}

## 10. Reading path (${profile.maturity})

${maturityReadingPath(profile.maturity)}

## 11. Next

- Role workflow: ${SITE_URL}/workflows/${roleNext(profile.role)}
- Quick start: ${SITE_URL}/quickstart
- Cookbook: ${SITE_URL}/docs/cookbook/${stack.cookbook ?? 'README'}/README

## 12. Upgrades and your edits

Edit any generated file freely. \`.aies-kit.json\` records what the kit wrote, so \`enhance\` (or re-running install):

| Your file is… | The kit… |
|---------------|----------|
| Untouched since the kit wrote it | Updates it in place |
| Edited by you | Leaves it alone and writes the new version to \`<file>.aies-new\` for you to merge, then delete |
| No longer part of the kit, untouched | Deletes it |
| No longer part of the kit, edited | Leaves it in place |

\`--force\` replaces edited files with the kit version. Commit \`.aies-kit.json\`; add \`*.aies-new\` and \`hooks/logs/\` to \`.gitignore\`.
`;
}

function describeLayoutTable(L) {
  const rows = [
    ['`AGENTS.md`', 'Canonical instructions (cross-tool)'],
    ['`AIES.md`', 'This operator guide'],
    ['`.agents/skills/`', 'Skills (Agent Skills standard)'],
    [`\`${L.commandsDir}/\``, 'Commands / prompts (native)'],
    ...(L.agentsDir ? [[`\`${L.agentsDir}/\``, 'Subagents (native)']] : []),
    ...(L.skillMirrorDir ? [[`\`${L.skillMirrorDir}/\``, 'Skill mirror for this runtime']] : []),
    ...(L.rulesFile ? [[`\`${L.rulesFile}\``, 'Runtime-specific deltas']] : []),
    ...(L.hooksFile ? [[`\`${L.hooksFile}\``, 'Native hook wiring']] : []),
    ...(L.mcpFile ? [[`\`${L.mcpFile}\``, 'MCP config (empty)']] : []),
    ['`hooks/`', 'Guard script (native hook enforcement)'],
    ['`evals/`', 'Harness evals + product eval cases (promptfoo)'],
    ['`.aies-kit.json`', 'Hashes of kit-written files — lets upgrades keep your edits'],
    ['`plans/` · `reviews/`', 'Ephemeral plans, task contracts, review reports'],
    ['`scripts/aies-worktree.mjs`', 'Parallel-agent worktree helper'],
    [`\`${L.cookbookDir}/\` · \`guides/\` · \`mcps/\` · \`templates/\``, 'Shared reference (repo root)'],
    ['`MODEL_POLICY.md`', 'Model routing + data policy'],
  ];
  return ['| Path | Purpose |', '|------|---------|', ...rows.map(([a, b]) => `| ${a} | ${b} |`)].join('\n');
}

function implementationPlanIndex() {
  return `# Implementation plans (ephemeral index)

> **Not a living document.** Plans exist only for the duration of one story/task.  
> Maintaining a forever-updated root plan is an **anti-pattern**.

## Create a plan for this story

1. Copy \`plans/_TEMPLATE.md\` → \`plans/{STORY_ID}-plan.md\`
2. Fill it with the implementation-plan command + the planning skill
3. Get human approval before multi-file coding
4. **Attach** \`plans/{STORY_ID}-plan.md\` in every agent session for that story
5. Splitting across parallel agents? One \`plans/{TASK_ID}-contract.md\` per task via \`node scripts/aies-worktree.mjs new {TASK_ID}\`
6. Attach the plan to the PR; when the PR merges, **stop maintaining it** (archive or delete)

## Naming

| Artifact | Path |
|----------|------|
| Plan | \`plans/{STORY_ID}-plan.md\` |
| Task contract | \`plans/{TASK_ID}-contract.md\` |
| Code review report | \`reviews/{STORY_ID}-code-review.md\` |

Examples: \`plans/JIRA-1234-plan.md\`, \`plans/JIRA-1234-api-contract.md\`, \`reviews/JIRA-1234-code-review.md\`

See \`plans/README.md\` and \`reviews/README.md\`.
`;
}

function claudeCiTemplate() {
  return `# Template — copy to .github/workflows/ only after adding the ANTHROPIC_API_KEY secret.
# Headless Claude Code review on PRs: read-only, comments only, never pushes.
name: AI PR review (Claude Code)

on:
  pull_request:
    types: [opened, synchronize, ready_for_review]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    if: github.event.pull_request.draft == false
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR using .agents/skills/code-review/SKILL.md and AGENTS.md.
            Post findings as review comments with file:line evidence. Do not modify files.
`;
}

/**
 * Files earlier kit versions installed that this version no longer generates, with the content the
 * kit wrote. An upgrade deletes them only when the copy on disk is byte-identical (untouched).
 */
function retiredFiles(files) {
  const retired = {};
  for (const key of Object.keys(EMBEDDED_CORPUS)) {
    if ((key.startsWith('hooks/') && key.endsWith('.hook.sh')) || key === 'hooks/CONTRACT.md') retired[key] = EMBEDDED_CORPUS[key];
  }
  for (const spec of MCP_SPECS) {
    const rel = `mcps/${spec.file}`;
    if (!(rel in files) && EMBEDDED_CORPUS[rel]) retired[rel] = EMBEDDED_CORPUS[rel];
  }
  return retired;
}

/**
 * @param {object} profile
 * @param {{ recommendedMcpIds?: string[], verify?: { commands: Record<string, string>, sources: string[] } }} [opts]
 */
export function generateStarterKit(profile, opts = {}) {
  const ide = normalizeIde(profile.ide);
  const stack = stackMeta(profile.stack);
  const label = STACK_LABELS[profile.stack] ?? profile.stack;
  const now = new Date().toISOString();
  const model = profile.model ?? 'undecided';
  const dataClass = profile.dataClass ?? 'internal';
  const L = layoutFor(ide, { cookbookId: stack.cookbook ?? null });
  const recommendedIds = opts.recommendedMcpIds ?? stackMcpIds(profile.stack);
  const normalized = { ...profile, ide: L.ide, model, dataClass };

  const flags = [
    `--stack ${profile.stack}`,
    `--ide ${L.ide}`,
    `--role ${profile.role}`,
    `--maturity ${profile.maturity}`,
    `--goal ${profile.goal}`,
    `--model ${model}`,
    `--data-class ${dataClass}`,
    '--yes',
  ].join(' ');

  /** @type {Record<string, string>} */
  const files = {};

  // Cross-tool canon
  const skills = CORE_SKILLS.map(name => [name, corpus(`skills/${name}.skill.md`)]);
  if (stack.cookbook) {
    const skillKey = cookbookKeys(stack.cookbook).find(k => k.includes('/skills/') && k.endsWith('.skill.md'));
    if (skillKey) skills.push([pathBasename(skillKey).replace(/\.skill\.md$/, ''), corpus(skillKey)]);
  }
  for (const [name, src] of skills) {
    const md = skillMarkdown(name, src);
    files[`${L.skillsDir}/${name}/SKILL.md`] = md;
    if (L.skillMirrorDir) files[`${L.skillMirrorDir}/${name}/SKILL.md`] = md;
  }

  // Native commands + agents
  for (const name of CORE_PROMPTS) {
    const rendered = renderCommand(L, name, corpus(`aidlc/${name}.prompt.md`));
    files[rendered.path] = rendered.content;
  }
  for (const name of CORE_AGENTS) {
    const rendered = renderAgent(L, name, corpus(`agents/${name}.agent.md`));
    if (rendered) files[rendered.path] = rendered.content;
  }

  // Hooks
  files['hooks/aies-guard.mjs'] = corpus('kit/aies-guard.mjs');
  files['hooks/README.md'] = corpus('kit/hooks-README.md');
  const hookConfig = renderHookConfig(L);
  if (hookConfig) files[L.hooksFile] = typeof hookConfig === 'string' ? hookConfig : JSON.stringify(hookConfig, null, 2);

  // Plans, contracts, reviews, worktrees
  files['plans/README.md'] = corpus('kit/plans-README.md');
  files['plans/_TEMPLATE.md'] = corpus('kit/plan-TEMPLATE.md');
  files['plans/_TASK_CONTRACT.md'] = corpus('kit/task-contract-TEMPLATE.md');
  files['reviews/README.md'] = corpus('kit/reviews-README.md');
  files['reviews/_TEMPLATE.md'] = corpus('kit/review-TEMPLATE.md');
  files['scripts/aies-worktree.mjs'] = corpus('kit/aies-worktree.mjs');

  // Shared reference
  files[`${L.templatesDir}/system-prompt.template.md`] = corpus('templates/system-prompt.template.md');
  files[`${L.templatesDir}/ci/claude-pr-review.yml`] = claudeCiTemplate();
  files[`${L.templatesDir}/ci/aies-gates.yml`] = renderGatesWorkflow(normalized, setupSteps(profile.stack), opts.verify);
  Object.assign(files, renderEvalFiles(normalized));
  if (stack.cookbook) {
    for (const key of cookbookKeys(stack.cookbook)) {
      files[`${L.cookbookDir}/${key.slice(`cookbook/${stack.cookbook}/`.length)}`] = corpus(key);
    }
  }
  for (const guide of GUIDES) {
    files[`${L.guidesDir}/${guide}.md`] = corpus(`handbook/${guide}.md`);
  }
  files[`${L.mcpsDir}/README.md`] = corpus('mcps/README.md');
  for (const spec of MCP_SPECS.filter(s => recommendedIds.includes(s.id))) {
    files[`${L.mcpsDir}/${spec.file}`] = corpus(`mcps/${spec.file}`);
  }
  files[`${L.mcpsDir}/recommended.json`] = JSON.stringify(
    {
      $comment: `Reviewed candidates for ${L.mcpFile ?? 'your user-level MCP config'}. Copy one entry at a time after security review. Remote servers authenticate with OAuth on first use — no tokens in this repo.`,
      format: L.mcpFormat ?? 'portable',
      servers: L.mcpFormat === 'codex' ? renderMcpServers('portable', recommendedIds) : renderMcpServers(L.mcpFormat ?? 'portable', recommendedIds),
      catalog: buildRecommendedMcpConfig(recommendedIds),
    },
    null,
    2,
  );
  const mcpConfig = renderMcpConfig(L, recommendedIds);
  if (mcpConfig && L.mcpFile && L.mcpFile === L.hooksFile && hookConfig) {
    files[L.mcpFile] = JSON.stringify({ ...JSON.parse(mcpConfig), ...hookConfig }, null, 2);
  } else if (mcpConfig && L.mcpFile) {
    files[L.mcpFile] = mcpConfig;
  }

  files[L.policyFile] = modelPolicy(normalized);

  // Instructions: AGENTS.md canonical + runtime delta
  files['AGENTS.md'] = buildAgentsMd(normalized, label, L, opts.verify);
  const delta = buildToolDelta(normalized, L);
  if (delta && L.rulesFile) files[L.rulesFile] = delta;

  // Cloud agent environments
  if (L.ide === 'copilot') files['.github/workflows/copilot-setup-steps.yml'] = copilotSetupSteps(profile.stack);
  if (L.ide === 'cursor' && installCommand(profile.stack)) {
    files['.cursor/environment.json'] = JSON.stringify({ install: installCommand(profile.stack) }, null, 2);
  }

  files['implementation_plan.md'] = implementationPlanIndex();
  files['AIES.md'] = buildAiesReadme({ profile: normalized, label, L, stack, flags, recommendedIds });

  return {
    stack: profile.stack,
    generatedAt: now,
    kitVersion: KIT_VERSION,
    profile: normalized,
    layout: describeInstallLayout(L.ide, { cookbookId: stack.cookbook ?? null }),
    files,
    retired: retiredFiles(files),
  };
}

/**
 * Claude Code plugin bundle for org-wide distribution (marketplace-installable).
 * Same agents, skills, commands, and guard as the repo kit, rooted at ${CLAUDE_PLUGIN_ROOT}.
 */
export function generatePluginBundle(profile, { name = 'aies' } = {}) {
  const L = layoutFor('claude-code');
  const files = {};
  const pluginRoot = { ...L, agentsDir: 'agents', commandsDir: 'commands' };
  files['.claude-plugin/plugin.json'] = JSON.stringify(
    {
      name,
      version: KIT_VERSION,
      description: 'AI Engineering Standard harness: planner/coder/reviewer/security subagents, AIDLC commands, skills, and the AIES guard hook.',
      homepage: SITE_URL,
      license: 'MIT',
    },
    null,
    2,
  );
  files['.claude-plugin/marketplace.json'] = JSON.stringify(
    {
      name: `${name}-marketplace`,
      owner: { name: 'Your platform team' },
      plugins: [{ name, source: './', description: 'AIES harness' }],
    },
    null,
    2,
  );
  for (const n of CORE_AGENTS) {
    const r = renderAgent(pluginRoot, n, corpus(`agents/${n}.agent.md`));
    if (r) files[r.path] = r.content;
  }
  for (const n of CORE_PROMPTS) {
    const r = renderCommand(pluginRoot, n, corpus(`aidlc/${n}.prompt.md`));
    files[r.path] = r.content;
  }
  for (const n of CORE_SKILLS) files[`skills/${n}/SKILL.md`] = skillMarkdown(n, corpus(`skills/${n}.skill.md`));
  files['hooks/aies-guard.mjs'] = corpus('kit/aies-guard.mjs');
  files['hooks/hooks.json'] = JSON.stringify(
    {
      hooks: {
        PreToolUse: [
          {
            matcher: CLAUDE_MATCHERS.join('|'),
            hooks: [
              {
                type: 'command',
                command: 'node "${CLAUDE_PLUGIN_ROOT}/hooks/aies-guard.mjs" --target claude',
                timeout: 15,
                onFailure: 'block',
              },
            ],
          },
        ],
      },
    },
    null,
    2,
  );
  files['README.md'] = `# ${name} — Claude Code plugin

Install from a git-hosted marketplace:

\`\`\`text
/plugin marketplace add <org>/<repo>
/plugin install ${name}@${name}-marketplace
\`\`\`

Contains ${CORE_AGENTS.length} subagents, ${CORE_PROMPTS.length} commands, ${CORE_SKILLS.length} skills, and the AIES guard (PreToolUse/Bash).
Version ${KIT_VERSION}. Regenerate with \`npx @grvmithas/create-aies-kit@latest plugin\`.
`;
  return { kitVersion: KIT_VERSION, profile, files };
}

/**
 * Enhance mode: rescan repo, refresh MCP recommendations + AIES.md section, keep corpus.
 * Requires an existing profile — recovered from AIES.md markers or passed flags.
 */
export function enhanceStarterKit(cwd, profile) {
  const { signals, recommendedMcpIds } = detectRepoSignals(cwd, fs);
  const verify = detectVerifyCommands(cwd, fs);
  const mergedIds = [...new Set([...stackMcpIds(profile.stack), ...recommendedMcpIds])];
  const bundle = generateStarterKit(profile, { recommendedMcpIds: mergedIds, verify });
  const L = layoutFor(profile.ide, { cookbookId: stackMeta(profile.stack).cookbook });
  const verifyRows = ['lint', 'typecheck', 'test', 'build'].map(k => `| ${k} | ${verify.commands[k] ? `\`${verify.commands[k]}\`` : 'not detected'} |`);

  bundle.files['AIES_REPO_SCAN.md'] = `# AIES repo scan

## Verification commands

Sources: ${verify.sources.length ? verify.sources.join(', ') : 'none detected'}

| Check | Command |
|-------|---------|
${verifyRows.join('\n')}

## Signals detected

\`\`\`json
${JSON.stringify(signals, null, 2)}
\`\`\`

## Recommended MCP ids

${mergedIds.map(id => `- ${id}`).join('\n')}

## Next

1. Confirm the verification commands in \`AGENTS.md\` match CI; fill any \`${VERIFY_PLACEHOLDER}\` line
2. Review \`mcps/recommended.json\` and enable approved servers in \`${L.mcpFile ?? 'your user-level MCP config'}\`
3. Run \`${commandRef(L, 'enhance-repo')}\` in your agent for conventions the scan cannot infer
4. Create \`plans/{STORY_ID}-plan.md\` before multi-file coding
`;
  bundle.scan = { signals, recommendedMcpIds: mergedIds, verify };
  return bundle;
}

export function renderBashInstallScript(bundle) {
  const lines = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    `echo "AIES kit ${KIT_VERSION} — scaffolding IDE-native harness into $(pwd)"`,
    '',
    '# Never overwrite an existing file: a differing copy is written to <file>.aies-new for review.',
    'aies_write() {',
    '  tmp="$(mktemp)"; cat > "$tmp"',
    '  if [ ! -e "$1" ]; then mv "$tmp" "$1"',
    '  elif cmp -s "$tmp" "$1"; then rm -f "$tmp"',
    '  else mv "$tmp" "$1.aies-new"; echo "kept your $1 — new version in $1.aies-new"; fi',
    '}',
    '',
  ];
  for (const [relPath, content] of Object.entries(bundle.files)) {
    const dir = relPath.includes('/') ? relPath.slice(0, relPath.lastIndexOf('/')) : '';
    if (dir) lines.push(`mkdir -p "${dir}"`);
    const delim = `AIES_EOF_${Buffer.from(relPath).toString('hex').slice(0, 12)}`;
    lines.push(`aies_write "${relPath}" <<'${delim}'`);
    lines.push(content.replace(/\r\n/g, '\n'));
    lines.push(delim);
    lines.push('');
  }
  lines.push('echo "Done. Read AIES.md — then: npx @grvmithas/create-aies-kit@latest enhance"');
  lines.push(`echo "Open: ${SITE_URL}/quickstart"`);
  return lines.join('\n');
}

export function renderPowerShellInstallScript(bundle) {
  const lines = [
    '$ErrorActionPreference = "Stop"',
    `Write-Host "AIES kit ${KIT_VERSION} - scaffolding IDE-native harness into $(Get-Location)"`,
    '',
    '# Never overwrite an existing file: a differing copy is written to <file>.aies-new for review.',
    'function Write-AiesFile([string]$Rel, [string]$B64) {',
    '  $path = Join-Path (Get-Location) $Rel',
    '  $text = [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($B64))',
    '  if (-not (Test-Path -LiteralPath $path)) { [System.IO.File]::WriteAllText($path, $text); return }',
    '  if (([System.IO.File]::ReadAllText($path) -replace "`r`n", "`n") -eq ($text -replace "`r`n", "`n")) { return }',
    '  [System.IO.File]::WriteAllText("$path.aies-new", $text)',
    '  Write-Host "kept your $Rel - new version in $Rel.aies-new"',
    '}',
    '',
  ];
  for (const [relPath, content] of Object.entries(bundle.files)) {
    const dir = relPath.includes('/') ? relPath.slice(0, relPath.lastIndexOf('/')) : '';
    const psPath = relPath.replace(/\//g, '\\');
    if (dir) {
      lines.push(`New-Item -ItemType Directory -Force -Path "${dir.replace(/\//g, '\\')}" | Out-Null`);
    }
    const b64 = Buffer.from(content, 'utf8').toString('base64');
    lines.push(`Write-AiesFile "${psPath}" "${b64}"`);
  }
  lines.push('Write-Host "Done. Read AIES.md - then: npx @grvmithas/create-aies-kit@latest enhance"');
  lines.push(`Write-Host "Open: ${SITE_URL}/quickstart"`);
  return lines.join('\n');
}
