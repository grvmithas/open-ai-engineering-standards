#!/usr/bin/env node
/**
 * Embed AIES corpus for offline kit generation.
 * Run: node packages/kit-core/scripts/embed-corpus.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MCP_SPECS } from '../lib/mcp-catalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');

const COOKBOOK_STACKS = ['react', 'nextjs', 'node', 'python', 'react-native', 'java', 'dotnet'];

const CORE_FILES = {
  'aidlc/story-kickoff.prompt.md': 'content/08-ai-sdlc/prompts/story-kickoff.prompt.md',
  'aidlc/implementation-plan.prompt.md': 'content/08-ai-sdlc/prompts/implementation-plan.prompt.md',
  'aidlc/coding.prompt.md': 'content/08-ai-sdlc/prompts/coding.prompt.md',
  'aidlc/security-review.prompt.md': 'content/08-ai-sdlc/prompts/security-review.prompt.md',
  'aidlc/enhance-repo.prompt.md': 'content/08-ai-sdlc/prompts/enhance-repo.prompt.md',
  'aidlc/create-prompt.prompt.md': 'content/08-ai-sdlc/prompts/create-prompt.prompt.md',
  'aidlc/create-skill.prompt.md': 'content/08-ai-sdlc/prompts/create-skill.prompt.md',
  'aidlc/create-agent.prompt.md': 'content/08-ai-sdlc/prompts/create-agent.prompt.md',
  'skills/planning.skill.md': 'content/03-skill-engineering/skills/planning.skill.md',
  'skills/debug.skill.md': 'content/03-skill-engineering/skills/debug.skill.md',
  'skills/devops.skill.md': 'content/03-skill-engineering/skills/devops.skill.md',
  'skills/code-review.skill.md': 'content/03-skill-engineering/skills/code-review.skill.md',
  'skills/evaluation.skill.md': 'content/03-skill-engineering/skills/evaluation.skill.md',
  'skills/security.skill.md': 'content/03-skill-engineering/skills/security.skill.md',
  'skills/testing.skill.md': 'content/03-skill-engineering/skills/testing.skill.md',
  'skills/architecture.skill.md': 'content/03-skill-engineering/skills/architecture.skill.md',
  'skills/context.skill.md': 'content/03-skill-engineering/skills/context.skill.md',
  'skills/prompt.skill.md': 'content/03-skill-engineering/skills/prompt.skill.md',
  'skills/documentation.skill.md': 'content/03-skill-engineering/skills/documentation.skill.md',
  'agents/planner.agent.md': 'content/04-agent-engineering/agents/planner.agent.md',
  'agents/coder.agent.md': 'content/04-agent-engineering/agents/coder.agent.md',
  'agents/reviewer.agent.md': 'content/04-agent-engineering/agents/reviewer.agent.md',
  'agents/prompt-engineer.agent.md': 'content/04-agent-engineering/agents/prompt-engineer.agent.md',
  'agents/security.agent.md': 'content/04-agent-engineering/agents/security.agent.md',
  'agents/testing.agent.md': 'content/04-agent-engineering/agents/testing.agent.md',
  'agents/parallel-implementer.agent.md': 'content/04-agent-engineering/agents/parallel-implementer.agent.md',
  'templates/system-prompt.template.md': 'content/01-prompt-engineering/templates/system-prompt.template.md',
  'handbook/human-in-the-loop.md': 'content/handbook/human-in-the-loop.md',
  'handbook/evals-as-quality-gates.md': 'content/handbook/evals-as-quality-gates.md',
  'handbook/mcp-when-and-how.md': 'content/handbook/mcp-when-and-how.md',
  'handbook/skills-vs-prompts-vs-agents.md': 'content/handbook/skills-vs-prompts-vs-agents.md',
  'handbook/how-to-set-up-planning.md': 'content/handbook/how-to-set-up-planning.md',
  'handbook/parallel-agents-and-worktrees.md': 'content/handbook/parallel-agents-and-worktrees.md',
  'handbook/native-agent-hooks.md': 'content/handbook/native-agent-hooks.md',
  'handbook/agent-skills-standard.md': 'content/handbook/agent-skills-standard.md',
  'handbook/ide-native-subagents.md': 'content/handbook/ide-native-subagents.md',
  'mcps/README.md': 'content/mcps/README.md',
  'hooks/CONTRACT.md': 'content/04-agent-engineering/hooks/README.md',
  'kit/plans-README.md': 'packages/kit-core/templates/plans-README.md',
  'kit/plan-TEMPLATE.md': 'packages/kit-core/templates/plan-TEMPLATE.md',
  'kit/reviews-README.md': 'packages/kit-core/templates/reviews-README.md',
  'kit/review-TEMPLATE.md': 'packages/kit-core/templates/review-TEMPLATE.md',
  'kit/hooks-README.md': 'packages/kit-core/templates/hooks-README.md',
  'kit/aies-guard.mjs': 'packages/kit-core/templates/aies-guard.mjs',
  'kit/aies-worktree.mjs': 'packages/kit-core/templates/aies-worktree.mjs',
  'kit/task-contract-TEMPLATE.md': 'packages/kit-core/templates/task-contract-TEMPLATE.md',
};

const HOOK_SCRIPTS = [
  'pre-planning.hook.sh',
  'pre-code.hook.sh',
  'post-code.hook.sh',
  'pre-commit.hook.sh',
  'pre-review.hook.sh',
  'deployment.hook.sh',
  'knowledge-capture.hook.sh',
  'pre-tool-call.hook.sh',
  'post-tool-call.hook.sh',
  'pre-delegation.hook.sh',
  'post-deployment.hook.sh',
  'budget-guard.hook.sh',
];

const readText = abs => fs.readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');

function walkMarkdown(absDir, keyPrefix, out) {
  if (!fs.existsSync(absDir)) return;
  // readdir order is filesystem-specific (NTFS sorts, ext4 does not); sort so CI reproduces the committed file.
  const entries = fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const entry of entries) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdown(abs, `${keyPrefix}/${entry.name}`, out);
      continue;
    }
    if (!entry.name.endsWith('.md')) continue;
    out[`${keyPrefix}/${entry.name}`] = readText(abs);
  }
}

const out = {};
const missing = [];

for (const [key, rel] of Object.entries(CORE_FILES)) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    missing.push(rel);
    continue;
  }
  out[key] = readText(abs);
}

for (const stack of COOKBOOK_STACKS) {
  const abs = path.join(root, 'content/cookbook', stack);
  if (!fs.existsSync(abs)) {
    missing.push(`content/cookbook/${stack}/`);
    continue;
  }
  walkMarkdown(abs, `cookbook/${stack}`, out);
}

for (const spec of MCP_SPECS) {
  const rel = `content/mcps/${spec.file}`;
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    missing.push(rel);
    continue;
  }
  out[`mcps/${spec.file}`] = readText(abs);
}

for (const name of HOOK_SCRIPTS) {
  const rel = `content/04-agent-engineering/hooks/${name}`;
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    missing.push(rel);
    continue;
  }
  out[`hooks/${name}`] = readText(abs);
}

if (missing.length) {
  console.error('Missing corpus files:\n' + missing.join('\n'));
  process.exit(1);
}

const dest = path.join(__dirname, '../lib/embedded-corpus.js');
fs.writeFileSync(
  dest,
  `// Auto-generated by packages/kit-core/scripts/embed-corpus.mjs — do not edit\n` +
    `export const EMBEDDED_CORPUS = ${JSON.stringify(out, null, 2)};\n`,
);
console.log(`Embedded ${Object.keys(out).length} files → ${dest}`);
