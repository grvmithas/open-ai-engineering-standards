import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  calculateAgreement,
  parseCsv,
  wilsonInterval,
} from '../tools/agreement.mjs';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.resolve(testDirectory, '..', 'fixtures');

function readRows(fileName) {
  return parseCsv(fs.readFileSync(path.join(fixtures, fileName), 'utf8'));
}

test('synthetic fixture reproduces the committed report', () => {
  const actual = calculateAgreement(readRows('assessor-a.csv'), readRows('assessor-b.csv'), {
    seed: 'oaies-synthetic-v1',
    replicates: 10000,
  });
  const expected = JSON.parse(fs.readFileSync(path.join(fixtures, 'expected-report.json'), 'utf8'));
  assert.deepEqual(actual, expected);
  assert.equal(actual.counts.paired, 20);
  assert.equal(actual.criticalDisagreements.length, 1);
});

test('CSV parser handles quoted commas, quotes, CRLF, and BOM', () => {
  const rows = parseCsv(
    '\uFEFFitem_id,control_id,rating,rationale\r\n' +
      'SYNTH-X,AIES-SYN-X,CONFORMANT,"Evidence says ""yes"", reproducibly"\r\n',
  );
  assert.equal(rows[0].rationale, 'Evidence says "yes", reproducibly');
});

test('coverage reports keys missing from either assessor', () => {
  const rowsA = parseCsv(
    'item_id,control_id,rating\nA,C1,CONFORMANT\nB,C2,MINOR\n',
  );
  const rowsB = parseCsv(
    'item_id,control_id,rating\nA,C1,CONFORMANT\nC,C3,MAJOR\n',
  );
  const report = calculateAgreement(rowsA, rowsB, { seed: 'coverage', replicates: 100 });
  assert.equal(report.counts.union, 3);
  assert.equal(report.counts.paired, 1);
  assert.equal(report.coverage.pairedRate, 0.333333);
  assert.deepEqual(report.coverage.missingFromA, [{ itemId: 'C', controlId: 'C3' }]);
  assert.deepEqual(report.coverage.missingFromB, [{ itemId: 'B', controlId: 'C2' }]);
});

test('kappa is null when both marginals contain one identical category', () => {
  const rows = parseCsv('item_id,control_id,rating\nA,C1,CONFORMANT\nB,C2,CONFORMANT\n');
  const report = calculateAgreement(rows, rows, { seed: 'constant', replicates: 100 });
  assert.equal(report.exactAgreement.estimate, 1);
  assert.equal(report.cohensKappa.estimate, null);
  assert.deepEqual(report.cohensKappa.bootstrap95, [null, null]);
});

test('invalid ratings and duplicate keys fail closed', () => {
  const valid = parseCsv('item_id,control_id,rating\nA,C1,CONFORMANT\n');
  const invalid = parseCsv('item_id,control_id,rating\nA,C1,UNKNOWN\n');
  assert.throws(
    () => calculateAgreement(valid, invalid),
    /invalid rating "UNKNOWN"/,
  );

  const duplicate = parseCsv(
    'item_id,control_id,rating\nA,C1,CONFORMANT\nA,C1,CONFORMANT\n',
  );
  assert.throws(
    () => calculateAgreement(duplicate, valid),
    /duplicate key A\/C1/,
  );
});

test('empty inputs and inconsistent strata fail closed', () => {
  assert.throws(
    () => parseCsv('item_id,control_id,rating\n'),
    /no assessment rows/,
  );

  const rowsA = parseCsv(
    'item_id,control_id,rating,stratum\nA,C1,CONFORMANT,governance\n',
  );
  const rowsB = parseCsv(
    'item_id,control_id,rating,stratum\nA,C1,CONFORMANT,security\n',
  );
  assert.throws(
    () => calculateAgreement(rowsA, rowsB),
    /Stratum mismatch for A\/C1/,
  );
});

test('Wilson interval is bounded and contains observed proportion', () => {
  const [low, high] = wilsonInterval(16, 20);
  assert.ok(low >= 0 && high <= 1);
  assert.ok(low < 0.8 && high > 0.8);
});
