#!/usr/bin/env node
/**
 * AIES definition-of-done gate — refuses "done" while the repository's checks fail.
 *
 * Wired to the runtime's completion event; the decision is returned in that runtime's shape:
 *   claude   → .claude/settings.json   Stop        (exit 2 = keep working, stderr is the reason)
 *   codex    → .codex/hooks.json       Stop        (exit 2)
 *   gemini   → .gemini/settings.json   AfterAgent  (exit 2 = retry)
 *   devin    → .devin/hooks.v1.json    Stop        (exit 2)
 *   cursor   → .cursor/hooks.json      stop        (followup_message = keep working)
 *   cli      → manual / CI:  node hooks/aies-done.mjs --target cli
 * Copilot, Kiro, and opencode have no blocking completion event with a documented contract;
 * there the aies-gates CI "verify" job is the gate.
 *
 * Commands come from hooks/aies-done.json (written by the kit from the detected verify commands):
 *   { "commands": ["npm run lint", "npm test"], "timeoutSeconds": 900, "maxConsecutiveBlocks": 3 }
 *
 * Checks run only when the agent changed something: a dirty working tree, or a HEAD that moved
 * since the last run. A fingerprint of the last green state is cached in hooks/logs/, so a
 * second "done" on unchanged code is instant. After maxConsecutiveBlocks refusals in a row the
 * gate lets the agent stop so it can report the failure to a human instead of looping forever.
 *
 * Unlike the guard, this gate fails open on internal errors: a crashed gate must not trap the
 * agent. The security boundary is the guard and the sandbox; this is a quality gate.
 */
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOOK_DIR = dirname(fileURLToPath(import.meta.url));
const TAIL_LINES = 40;

const flag = name => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const target = flag('target') ?? 'cli';

function readStdin() {
  if (process.stdin.isTTY) return '';
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function parseJson(text) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

/** Repo installs keep config next to this script; plugin installs read it from the project. */
function locate(input) {
  if (existsSync(join(HOOK_DIR, 'aies-done.json'))) return resolve(HOOK_DIR, '..');
  return resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || input.workspace_roots?.[0] || process.cwd());
}

function loadConfig(root) {
  const file = join(root, 'hooks', 'aies-done.json');
  if (!existsSync(file)) return { commands: [] };
  const cfg = JSON.parse(readFileSync(file, 'utf8'));
  return {
    commands: (cfg.commands ?? []).filter(c => typeof c === 'string' && c.trim()),
    timeoutSeconds: Number(cfg.timeoutSeconds) || 900,
    maxConsecutiveBlocks: Number(cfg.maxConsecutiveBlocks) || 3,
  };
}

function git(root, args) {
  const r = spawnSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return r.status === 0 ? r.stdout : null;
}

function snapshot(root, commands) {
  const outsideLogs = ['--', '.', ':(exclude)hooks/logs'];
  const head = git(root, ['rev-parse', 'HEAD']);
  const status = git(root, ['status', '--porcelain', '--untracked-files=all', ...outsideLogs]);
  if (head === null || status === null) return null;
  const diff = git(root, ['diff', 'HEAD', ...outsideLogs]) ?? '';
  const fingerprint = createHash('sha256').update([head, status, diff, commands.join('\n')].join('\0')).digest('hex');
  return { head: head.trim(), dirty: status.trim().length > 0, fingerprint };
}

function stateFile(root) {
  return join(root, 'hooks', 'logs', 'aies-done-state.json');
}

function loadState(root) {
  try {
    return JSON.parse(readFileSync(stateFile(root), 'utf8'));
  } catch {
    return {};
  }
}

function saveState(root, state) {
  try {
    mkdirSync(dirname(stateFile(root)), { recursive: true });
    writeFileSync(stateFile(root), `${JSON.stringify(state, null, 2)}\n`);
  } catch {
    // State is a cache; losing it only costs a re-run.
  }
}

function runChecks(root, commands, timeoutSeconds) {
  for (const command of commands) {
    const r = spawnSync(command, { cwd: root, shell: true, encoding: 'utf8', timeout: timeoutSeconds * 1000, maxBuffer: 64 * 1024 * 1024 });
    if (r.status !== 0) {
      const output = `${r.stdout ?? ''}\n${r.stderr ?? ''}`.trim().split('\n').slice(-TAIL_LINES).join('\n');
      const why = r.error?.code === 'ETIMEDOUT' ? `timed out after ${timeoutSeconds}s` : `exit ${r.status ?? r.signal}`;
      return { command, why, output };
    }
  }
  return null;
}

function respond(reason) {
  if (target === 'cursor') {
    process.stdout.write(JSON.stringify(reason ? { followup_message: reason } : {}));
    return 0;
  }
  if (!reason) return 0;
  process.stderr.write(`${reason}\n`);
  return 2;
}

function decide() {
  const input = parseJson(readStdin());
  const root = locate(input);
  const cfg = loadConfig(root);
  if (!cfg.commands.length || process.env.AIES_DONE_SKIP === '1') return null;

  const state = loadState(root);
  const snap = snapshot(root, cfg.commands);
  if (snap) {
    const moved = state.lastHead && state.lastHead !== snap.head;
    if (snap.fingerprint === state.lastGreen || (!snap.dirty && !moved)) {
      saveState(root, { ...state, lastHead: snap.head, blocks: 0 });
      return null;
    }
  }

  const failure = runChecks(root, cfg.commands, cfg.timeoutSeconds);
  if (!failure) {
    saveState(root, { ...state, lastHead: snap?.head, lastGreen: snap?.fingerprint, blocks: 0 });
    return null;
  }

  const blocks = (state.blocks ?? 0) + 1;
  if (blocks > cfg.maxConsecutiveBlocks) {
    saveState(root, { ...state, lastHead: snap?.head, blocks: 0 });
    process.stderr.write(`AIES definition of done: \`${failure.command}\` still fails after ${cfg.maxConsecutiveBlocks} attempts; stopping so a human can decide.\n`);
    return null;
  }
  saveState(root, { ...state, lastHead: snap?.head, blocks });
  return [
    `AIES definition of done: \`${failure.command}\` failed (${failure.why}). Attempt ${blocks} of ${cfg.maxConsecutiveBlocks}.`,
    'Fix the cause and re-run the command before finishing. Do not weaken, skip, or delete tests to pass this gate.',
    'If the failure predates your change, say so explicitly in your final message.',
    '--- last output ---',
    failure.output,
  ].join('\n');
}

try {
  process.exitCode = respond(decide());
} catch (error) {
  process.stderr.write(`AIES definition of done: gate error (${error?.message ?? error}); allowing completion.\n`);
  process.exitCode = target === 'cursor' ? (process.stdout.write('{}'), 0) : 0;
}
