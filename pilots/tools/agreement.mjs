#!/usr/bin/env node

/**
 * AIES dependency-free inter-assessor agreement calculator.
 * Synthetic fixtures verify mechanics only; output is not external-validation evidence.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RATINGS = Object.freeze([
  'CONFORMANT',
  'MINOR',
  'MAJOR',
  'NOT_APPLICABLE',
  'INSUFFICIENT_EVIDENCE',
]);

function fail(message) {
  throw new Error(message);
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      if (field.length > 0) fail('Invalid quote inside an unquoted CSV field.');
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (character !== '\r') {
      field += character;
    }
  }

  if (quoted) fail('Unterminated quoted CSV field.');
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const nonEmptyRows = rows.filter(cells => cells.some(cell => cell.trim() !== ''));
  if (nonEmptyRows.length === 0) fail('CSV is empty.');
  if (nonEmptyRows.length === 1) fail('CSV contains a header but no assessment rows.');
  const headers = nonEmptyRows[0].map(header => header.trim().replace(/^\uFEFF/, ''));
  if (new Set(headers).size !== headers.length) fail('CSV contains duplicate headers.');

  return nonEmptyRows.slice(1).map((cells, rowIndex) => {
    if (cells.length !== headers.length) {
      fail(`CSV row ${rowIndex + 2} has ${cells.length} fields; expected ${headers.length}.`);
    }
    return Object.fromEntries(headers.map((header, index) => [header, cells[index].trim()]));
  });
}

function validateRows(rows, assessorName) {
  for (const required of ['item_id', 'control_id', 'rating']) {
    if (rows.length > 0 && !(required in rows[0])) fail(`${assessorName}: missing ${required} column.`);
  }

  const keyed = new Map();
  for (const [index, row] of rows.entries()) {
    if (!row.item_id || !row.control_id) fail(`${assessorName}: row ${index + 2} has an empty key.`);
    if (!RATINGS.includes(row.rating)) {
      fail(`${assessorName}: row ${index + 2} has invalid rating "${row.rating}".`);
    }
    const key = `${row.item_id}\u001f${row.control_id}`;
    if (keyed.has(key)) fail(`${assessorName}: duplicate key ${row.item_id}/${row.control_id}.`);
    keyed.set(key, row);
  }
  return keyed;
}

function round(value, places = 6) {
  if (value === null || !Number.isFinite(value)) return null;
  return Number(value.toFixed(places));
}

function agreement(pairs) {
  if (pairs.length === 0) return null;
  return pairs.filter(pair => pair.a.rating === pair.b.rating).length / pairs.length;
}

function kappa(pairs) {
  if (pairs.length === 0) return null;
  const observed = agreement(pairs);
  const marginalsA = Object.fromEntries(RATINGS.map(rating => [rating, 0]));
  const marginalsB = Object.fromEntries(RATINGS.map(rating => [rating, 0]));
  for (const pair of pairs) {
    marginalsA[pair.a.rating] += 1;
    marginalsB[pair.b.rating] += 1;
  }
  const expected = RATINGS.reduce(
    (sum, rating) => sum + (marginalsA[rating] / pairs.length) * (marginalsB[rating] / pairs.length),
    0,
  );
  return expected === 1 ? null : (observed - expected) / (1 - expected);
}

export function wilsonInterval(successes, total, z = 1.959963984540054) {
  if (total === 0) return [null, null];
  const proportion = successes / total;
  const denominator = 1 + (z * z) / total;
  const centre = (proportion + (z * z) / (2 * total)) / denominator;
  const margin =
    (z / denominator) *
    Math.sqrt((proportion * (1 - proportion)) / total + (z * z) / (4 * total * total));
  return [centre - margin, centre + margin];
}

function seedToUint32(seed) {
  let hash = 2166136261;
  for (const character of seed) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0 || 0x9e3779b9;
}

function randomGenerator(seed) {
  let state = seedToUint32(seed);
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function quantile(sortedValues, probability) {
  if (sortedValues.length === 0) return null;
  const position = (sortedValues.length - 1) * probability;
  const lower = Math.floor(position);
  const fraction = position - lower;
  return sortedValues[lower + 1] === undefined
    ? sortedValues[lower]
    : sortedValues[lower] + fraction * (sortedValues[lower + 1] - sortedValues[lower]);
}

export function bootstrapKappa(pairs, seed, replicates) {
  if (pairs.length === 0 || replicates === 0) return [null, null];
  const random = randomGenerator(seed);
  const values = [];
  for (let replicate = 0; replicate < replicates; replicate += 1) {
    const sample = Array.from(
      { length: pairs.length },
      () => pairs[Math.floor(random() * pairs.length)],
    );
    const estimate = kappa(sample);
    if (estimate !== null) values.push(estimate);
  }
  values.sort((left, right) => left - right);
  return [quantile(values, 0.025), quantile(values, 0.975)];
}

function distributions(rows) {
  const counts = Object.fromEntries(RATINGS.map(rating => [rating, 0]));
  for (const row of rows) counts[row.rating] += 1;
  return Object.fromEntries(
    RATINGS.map(rating => [
      rating,
      {
        count: counts[rating],
        proportion: rows.length === 0 ? null : round(counts[rating] / rows.length),
      },
    ]),
  );
}

function stratumMetrics(pairs) {
  const strata = new Map();
  for (const pair of pairs) {
    const stratum = pair.a.stratum || pair.b.stratum || 'UNSPECIFIED';
    if (!strata.has(stratum)) strata.set(stratum, []);
    strata.get(stratum).push(pair);
  }
  return Object.fromEntries(
    [...strata.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([name, rows]) => {
      const matches = rows.filter(pair => pair.a.rating === pair.b.rating).length;
      const critical = rows.filter(isCritical).length;
      const interval = rows.length >= 10 ? wilsonInterval(matches, rows.length).map(value => round(value)) : null;
      return [
        name,
        {
          paired: rows.length,
          matches,
          exactAgreement: round(matches / rows.length),
          wilson95: interval,
          criticalDisagreements: critical,
        },
      ];
    }),
  );
}

function isCritical(pair) {
  const ratings = new Set([pair.a.rating, pair.b.rating]);
  return ratings.has('MAJOR') && (ratings.has('CONFORMANT') || ratings.has('NOT_APPLICABLE'));
}

export function calculateAgreement(rowsA, rowsB, options = {}) {
  const seed = options.seed ?? 'oaies-default-seed';
  const replicates = options.replicates ?? 10000;
  if (!Number.isInteger(replicates) || replicates < 0) fail('replicates must be a non-negative integer.');

  const keyedA = validateRows(rowsA, 'Assessor A');
  const keyedB = validateRows(rowsB, 'Assessor B');
  const union = [...new Set([...keyedA.keys(), ...keyedB.keys()])].sort();
  const pairs = union
    .filter(key => keyedA.has(key) && keyedB.has(key))
    .map(key => ({ key, a: keyedA.get(key), b: keyedB.get(key) }));
  for (const pair of pairs) {
    if (pair.a.stratum && pair.b.stratum && pair.a.stratum !== pair.b.stratum) {
      const { item_id: itemId, control_id: controlId } = pair.a;
      fail(`Stratum mismatch for ${itemId}/${controlId}: "${pair.a.stratum}" versus "${pair.b.stratum}".`);
    }
  }
  const matches = pairs.filter(pair => pair.a.rating === pair.b.rating).length;
  const critical = pairs.filter(isCritical);
  const [agreementLow, agreementHigh] = wilsonInterval(matches, pairs.length);
  const [kappaLow, kappaHigh] = bootstrapKappa(pairs, seed, replicates);
  const kappaEstimate = kappa(pairs);

  const decode = key => {
    const [itemId, controlId] = key.split('\u001f');
    return { itemId, controlId };
  };

  return {
    schemaVersion: 1,
    labels: RATINGS,
    counts: {
      assessorA: rowsA.length,
      assessorB: rowsB.length,
      union: union.length,
      paired: pairs.length,
      matches,
      disagreements: pairs.length - matches,
    },
    coverage: {
      pairedRate: union.length === 0 ? null : round(pairs.length / union.length),
      missingFromA: union.filter(key => !keyedA.has(key)).map(decode),
      missingFromB: union.filter(key => !keyedB.has(key)).map(decode),
    },
    exactAgreement: {
      estimate: round(agreement(pairs)),
      wilson95: [round(agreementLow), round(agreementHigh)],
    },
    cohensKappa: {
      estimate: round(kappaEstimate),
      bootstrap95: [round(kappaLow), round(kappaHigh)],
      seed,
      requestedReplicates: replicates,
    },
    criticalDisagreements: critical.map(pair => ({
      ...decode(pair.key),
      ratingA: pair.a.rating,
      ratingB: pair.b.rating,
    })),
    ratingDistributions: {
      assessorA: distributions(rowsA),
      assessorB: distributions(rowsB),
    },
    strata: stratumMetrics(pairs),
    disagreements: pairs
      .filter(pair => pair.a.rating !== pair.b.rating)
      .map(pair => ({
        ...decode(pair.key),
        ratingA: pair.a.rating,
        ratingB: pair.b.rating,
        stratumA: pair.a.stratum || null,
        stratumB: pair.b.stratum || null,
      })),
  };
}

function parseArguments(arguments_) {
  const options = { replicates: 10000, seed: 'oaies-default-seed' };
  for (let index = 0; index < arguments_.length; index += 2) {
    const flag = arguments_[index];
    const value = arguments_[index + 1];
    if (!value || !['--a', '--b', '--out', '--seed', '--replicates'].includes(flag)) {
      fail('Usage: node agreement.mjs --a A.csv --b B.csv --out report.json [--seed value] [--replicates 10000]');
    }
    if (flag === '--a') options.a = value;
    if (flag === '--b') options.b = value;
    if (flag === '--out') options.out = value;
    if (flag === '--seed') options.seed = value;
    if (flag === '--replicates') options.replicates = Number(value);
  }
  if (!options.a || !options.b || !options.out) fail('--a, --b, and --out are required.');
  return options;
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const rowsA = parseCsv(fs.readFileSync(options.a, 'utf8'));
  const rowsB = parseCsv(fs.readFileSync(options.b, 'utf8'));
  const report = calculateAgreement(rowsA, rowsB, options);
  fs.mkdirSync(path.dirname(path.resolve(options.out)), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `Wrote ${options.out}: ${report.counts.paired} paired ratings, exact agreement ${report.exactAgreement.estimate}, kappa ${report.cohensKappa.estimate}.\n`,
  );
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`Agreement calculation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
