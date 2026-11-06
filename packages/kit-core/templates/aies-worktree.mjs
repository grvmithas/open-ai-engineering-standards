#!/usr/bin/env node
/**
 * AIES worktree helper — one task, one branch, one worktree, one base commit.
 *
 *   node scripts/aies-worktree.mjs new <task-id> [--base <ref>]   create agent/<task-id> worktree + task contract + port slot
 *   node scripts/aies-worktree.mjs list                            list agent worktrees with ahead/behind and dirty state
 *   node scripts/aies-worktree.mjs check <task-id>                 verify changed files stay inside the contract's allowed paths
 *   node scripts/aies-worktree.mjs overlap                         pairwise file overlap between agent branches (merge-order input)
 *   node scripts/aies-worktree.mjs remove <task-id> [--force]      remove the worktree (branch is kept for the PR)
 *
 * Worktrees live beside the repo in ../<repo>.worktrees/<task-id> so IDE indexers,
 * test runners, and file watchers in the main checkout never see them.
 */
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const BRANCH_PREFIX = 'agent/';
const PORT_BASE = 4100;
const PORT_STRIDE = 10;
const MAX_PARALLEL = 4;

function git(args, cwd = process.cwd()) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function fail(message) {
  console.error(`aies-worktree: ${message}`);
  process.exit(1);
}

function repoRoot() {
  try {
    return git(['rev-parse', '--show-toplevel']);
  } catch {
    return fail('run inside a git repository');
  }
}

function worktrees(root) {
  const out = git(['worktree', 'list', '--porcelain'], root);
  return out.split(/\n\n/).map(block => {
    const path = block.match(/^worktree (.+)$/m)?.[1];
    const branch = block.match(/^branch refs\/heads\/(.+)$/m)?.[1] ?? '';
    return { path, branch };
  }).filter(w => w.branch.startsWith(BRANCH_PREFIX));
}

function validTaskId(id) {
  if (!id || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id)) fail('task id must be 1-64 chars of letters, digits, . _ -');
  return id;
}

function ignoreLocally(root, pattern) {
  const common = resolve(root, git(['rev-parse', '--git-common-dir'], root));
  const exclude = join(common, 'info', 'exclude');
  mkdirSync(dirname(exclude), { recursive: true });
  const current = existsSync(exclude) ? readFileSync(exclude, 'utf8') : '';
  if (!current.split(/\r?\n/).includes(pattern)) appendFileSync(exclude, `${current.endsWith('\n') || !current ? '' : '\n'}${pattern}\n`);
}

function globToRegExp(glob) {
  const escaped = glob.trim().replace(/[.+^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped.replace(/\*\*\/?/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*')}$`);
}

function contractPaths(contractFile, heading) {
  if (!existsSync(contractFile)) return [];
  const text = readFileSync(contractFile, 'utf8');
  const section = text.split(new RegExp(`^##\\s+${heading}\\s*$`, 'mi'))[1]?.split(/^##\s/m)[0] ?? '';
  return section.split(/\r?\n/)
    .map(line => line.match(/^\s*[-*]\s+`?([^`\s]+)`?/)?.[1])
    .filter(Boolean)
    .filter(p => !p.startsWith('{'));
}

function changedFiles(cwd, base) {
  const committed = git(['diff', '--name-only', `${base}...HEAD`], cwd).split('\n');
  const working = git(['status', '--porcelain'], cwd).split('\n').map(l => l.slice(3).replace(/^.* -> /, ''));
  return [...new Set([...committed, ...working].map(f => f.trim()).filter(Boolean))];
}

function cmdNew(root, taskId, base) {
  const existing = worktrees(root);
  if (existing.length >= MAX_PARALLEL) {
    fail(`${existing.length} agent worktrees already active (limit ${MAX_PARALLEL}); merge or remove one first`);
  }
  const branch = `${BRANCH_PREFIX}${taskId}`;
  const dir = resolve(root, '..', `${basename(root)}.worktrees`, taskId);
  if (existsSync(dir)) fail(`${dir} already exists`);
  const baseRef = base ?? git(['rev-parse', '--abbrev-ref', 'HEAD'], root);
  const baseSha = git(['rev-parse', baseRef], root);

  git(['worktree', 'add', '-b', branch, dir, baseSha], root);

  const usedSlots = new Set(existing.map(w => {
    const env = join(w.path, '.env.worktree');
    return existsSync(env) ? Number(readFileSync(env, 'utf8').match(/AIES_SLOT=(\d+)/)?.[1]) : -1;
  }));
  let slot = 1;
  while (usedSlots.has(slot)) slot += 1;
  const port = PORT_BASE + slot * PORT_STRIDE;
  writeFileSync(join(dir, '.env.worktree'), [
    `AIES_TASK_ID=${taskId}`,
    `AIES_SLOT=${slot}`,
    `AIES_BASE_SHA=${baseSha}`,
    `PORT=${port}`,
    `AIES_PORT_RANGE=${port}-${port + PORT_STRIDE - 1}`,
    `DATABASE_SCHEMA=agent_${taskId.replace(/[^A-Za-z0-9]/g, '_').toLowerCase()}`,
    '',
  ].join('\n'));
  ignoreLocally(root, '.env.worktree');

  const template = join(root, 'plans', '_TASK_CONTRACT.md');
  const contract = join(dir, 'plans', `${taskId}-contract.md`);
  if (existsSync(template) && !existsSync(contract)) {
    mkdirSync(dirname(contract), { recursive: true });
    writeFileSync(contract, readFileSync(template, 'utf8').replaceAll('{TASK_ID}', taskId));
  }

  console.log(`Created ${branch} at ${dir}`);
  console.log(`  base     ${baseRef} @ ${baseSha.slice(0, 12)}`);
  console.log(`  ports    ${port}-${port + PORT_STRIDE - 1} (see .env.worktree)`);
  console.log(`  contract plans/${taskId}-contract.md — fill Allowed paths + Acceptance before starting the agent`);
  console.log('Next: open the worktree in your IDE (or `cd` there and start your CLI agent), attach the contract, run.');
}

function cmdList(root) {
  const list = worktrees(root);
  if (!list.length) return console.log('No agent worktrees.');
  for (const w of list) {
    const dirty = git(['status', '--porcelain'], w.path) ? 'dirty' : 'clean';
    const env = join(w.path, '.env.worktree');
    const base = existsSync(env) ? readFileSync(env, 'utf8').match(/AIES_BASE_SHA=(\w+)/)?.[1] : undefined;
    const ahead = base ? git(['rev-list', '--count', `${base}..HEAD`], w.path) : '?';
    console.log(`${w.branch.padEnd(32)} ${dirty.padEnd(6)} +${ahead} commits  ${w.path}`);
  }
}

function cmdCheck(root, taskId) {
  const w = worktrees(root).find(x => x.branch === `${BRANCH_PREFIX}${taskId}`);
  if (!w) fail(`no worktree for ${taskId}`);
  const env = readFileSync(join(w.path, '.env.worktree'), 'utf8');
  const base = env.match(/AIES_BASE_SHA=(\w+)/)?.[1];
  const contract = join(w.path, 'plans', `${taskId}-contract.md`);
  const allowed = contractPaths(contract, 'Allowed paths').map(globToRegExp);
  const prohibited = contractPaths(contract, 'Prohibited paths').map(globToRegExp);
  if (!allowed.length) fail(`plans/${taskId}-contract.md has no "## Allowed paths" entries`);

  const exempt = [`plans/${taskId}-contract.md`, `plans/${taskId}-plan.md`, `reviews/${taskId}-code-review.md`];
  const violations = changedFiles(w.path, base)
    .filter(f => !exempt.includes(f))
    .filter(f => prohibited.some(re => re.test(f)) || !allowed.some(re => re.test(f)));
  if (violations.length) {
    console.error(`Contract violations for ${taskId}:\n${violations.map(v => `  ${v}`).join('\n')}`);
    process.exit(1);
  }
  console.log(`${taskId}: all changed files are inside the contract.`);
}

function cmdOverlap(root) {
  const list = worktrees(root).map(w => {
    const env = join(w.path, '.env.worktree');
    const base = existsSync(env) ? readFileSync(env, 'utf8').match(/AIES_BASE_SHA=(\w+)/)?.[1] : 'HEAD';
    return { ...w, files: new Set(changedFiles(w.path, base)) };
  });
  let conflicts = 0;
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      const shared = [...list[i].files].filter(f => list[j].files.has(f));
      if (shared.length) {
        conflicts += 1;
        console.log(`${list[i].branch} <-> ${list[j].branch}: ${shared.join(', ')}`);
      }
    }
  }
  if (!conflicts) console.log('No overlapping files — branches can merge in any order (still re-verify after each merge).');
  else console.log('Merge the branch others depend on first; rebase the rest and re-run verification after every merge.');
}

function cmdRemove(root, taskId, force) {
  const w = worktrees(root).find(x => x.branch === `${BRANCH_PREFIX}${taskId}`);
  if (!w) fail(`no worktree for ${taskId}`);
  if (!force && git(['status', '--porcelain'], w.path)) fail(`${taskId} has uncommitted changes; commit them or pass --force`);
  git(['worktree', 'remove', ...(force ? ['--force'] : []), w.path], root);
  console.log(`Removed worktree ${w.path}; branch ${w.branch} kept for its PR.`);
}

const [command, arg, ...rest] = process.argv.slice(2);
const root = repoRoot();
const flag = name => rest.includes(name) || arg === name;
const flagValue = name => {
  const all = [arg, ...rest];
  const i = all.indexOf(name);
  return i > -1 ? all[i + 1] : undefined;
};

switch (command) {
  case 'new': cmdNew(root, validTaskId(arg), flagValue('--base')); break;
  case 'list': cmdList(root); break;
  case 'check': cmdCheck(root, validTaskId(arg)); break;
  case 'overlap': cmdOverlap(root); break;
  case 'remove': cmdRemove(root, validTaskId(arg), flag('--force')); break;
  default:
    console.log('Usage: node scripts/aies-worktree.mjs <new|list|check|overlap|remove> [task-id] [--base ref] [--force]');
    process.exitCode = command ? 1 : 0;
}
