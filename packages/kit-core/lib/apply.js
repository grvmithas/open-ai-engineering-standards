/**
 * Write a generated bundle without ever destroying user edits.
 *
 * `.aies-kit.json` records the SHA-256 of every file the kit last wrote. On re-run:
 *   - missing file                         → created
 *   - identical to the new version         → unchanged
 *   - matches the recorded hash (untouched) → updated in place
 *   - edited, and the kit version is unchanged → left alone (customized)
 *   - edited, and the kit version changed  → left alone; new version written to `<file>.aies-new`
 * Files the kit no longer generates are deleted only if untouched; edited ones are left in place.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const MANIFEST_FILE = '.aies-kit.json';
export const CONFLICT_SUFFIX = '.aies-new';

export function hashContent(text) {
  return createHash('sha256').update(String(text).replace(/\r\n/g, '\n')).digest('hex');
}

export function readManifest(cwd) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(cwd, MANIFEST_FILE), 'utf8'));
    return { kitVersion: raw.kitVersion ?? null, profile: raw.profile ?? null, files: raw.files ?? {} };
  } catch {
    return { kitVersion: null, profile: null, files: {} };
  }
}

function readText(abs) {
  try {
    return fs.readFileSync(abs, 'utf8');
  } catch {
    return null;
  }
}

function removeEmptyParents(cwd, abs) {
  let dir = path.dirname(abs);
  const root = path.resolve(cwd);
  while (dir.startsWith(root) && dir !== root) {
    try {
      if (fs.readdirSync(dir).length) return;
      fs.rmdirSync(dir);
    } catch {
      return;
    }
    dir = path.dirname(dir);
  }
}

/**
 * @param {string} cwd
 * @param {Record<string, string>} files
 * @param {{ force?: boolean, dryRun?: boolean, retired?: Record<string, string>, kitVersion?: string, profile?: object }} [opts]
 */
export function applyBundle(cwd, files, opts = {}) {
  const { force = false, dryRun = false, retired = {}, kitVersion = null, profile = null } = opts;
  const previous = readManifest(cwd);
  const next = {};
  const result = { created: [], updated: [], unchanged: [], customized: [], conflicts: [], removed: [], kept: [] };

  const write = (rel, content) => {
    if (dryRun) return;
    const abs = path.join(cwd, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf8');
  };
  const clearConflict = rel => {
    if (dryRun) return;
    fs.rmSync(path.join(cwd, `${rel}${CONFLICT_SUFFIX}`), { force: true });
  };

  for (const [rel, content] of Object.entries(files)) {
    const newHash = hashContent(content);
    const disk = readText(path.join(cwd, rel));
    if (disk === null) {
      write(rel, content);
      next[rel] = newHash;
      result.created.push(rel);
      continue;
    }
    const diskHash = hashContent(disk);
    if (diskHash === newHash) {
      next[rel] = newHash;
      clearConflict(rel);
      result.unchanged.push(rel);
    } else if (force || previous.files[rel] === diskHash) {
      write(rel, content);
      next[rel] = newHash;
      clearConflict(rel);
      result.updated.push(rel);
    } else if (previous.files[rel] === newHash) {
      next[rel] = newHash;
      clearConflict(rel);
      result.customized.push(rel);
    } else {
      write(`${rel}${CONFLICT_SUFFIX}`, content);
      if (previous.files[rel]) next[rel] = previous.files[rel];
      result.conflicts.push(rel);
    }
  }

  const candidates = new Set([...Object.keys(previous.files), ...Object.keys(retired)]);
  for (const rel of candidates) {
    if (rel in files) continue;
    const abs = path.join(cwd, rel);
    const disk = readText(abs);
    if (disk === null) continue;
    const diskHash = hashContent(disk);
    const untouched = previous.files[rel] === diskHash || (rel in retired && hashContent(retired[rel]) === diskHash);
    if (untouched) {
      if (!dryRun) {
        fs.rmSync(abs, { force: true });
        removeEmptyParents(cwd, abs);
      }
      result.removed.push(rel);
    } else {
      result.kept.push(rel);
    }
  }

  if (!dryRun) {
    const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(
      path.join(cwd, MANIFEST_FILE),
      `${JSON.stringify(
        {
          $comment: 'Written by create-aies-kit. Hashes of kit-generated files so upgrades never overwrite your edits. Commit this file.',
          kitVersion,
          profile,
          files: sorted,
        },
        null,
        2,
      )}\n`,
      'utf8',
    );
  }
  return result;
}
