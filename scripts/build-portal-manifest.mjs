import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_ROOT,
  ROOT,
  cleanInlineMarkdown,
  stableJson,
  stripFencedCode,
  toPosix,
} from './content-utils.mjs';

const OUTPUT_PATH = path.join(ROOT, 'src', 'generated', 'portal-manifest.json');
const checkOnly = process.argv.includes('--check');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function metadata(markdown) {
  const version = markdown.match(/(?:\*\*|>\s*\*\*)Version:\*\*\s*([^\s]+)/i)?.[1] ?? 'unversioned';
  const status = markdown.match(/(?:\*\*|>\s*\*\*)Status:\*\*\s*([^\r\n]+)/i)?.[1]?.trim() ?? 'Informative';
  const published = markdown.match(/(?:Published|Date|Last updated):\*\*\s*([0-9-]+)/i)?.[1] ?? null;
  return { version, status, published };
}

function markdownRows(markdown) {
  return stripFencedCode(markdown)
    .split(/\r?\n/)
    .filter(line => /^\|.+\|$/.test(line.trim()) && !/^\|(?:\s*:?-+:?\s*\|)+$/.test(line.trim()))
    .map(line => line.trim().slice(1, -1).split('|').map(cell => cleanInlineMarkdown(cell)));
}

function title(markdown, fallback) {
  return cleanInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? fallback);
}

function description(markdown) {
  const purpose = markdown.match(/## Purpose\s+([\s\S]*?)(?=\n## |\n### |$)/i)?.[1] ?? '';
  return cleanInlineMarkdown(purpose);
}

function classificationCodes(value) {
  const codes = new Set(value.match(/\b[PAI]\d\b/g) ?? []);
  for (const match of value.matchAll(/\b([PAI])(\d)\s*[–-]\s*\1?(\d)\b/g)) {
    for (let level = Number(match[2]); level <= Number(match[3]); level += 1) {
      codes.add(`${match[1]}${level}`);
    }
  }
  return [...codes].sort();
}

const normativeSources = [
  'content/standard/01-kernel-and-applicability.md',
  'content/standard/02-normative-controls.md',
  'content/standard/03-evidence-exceptions-conformance.md',
  'content/standard/04-lifecycle-and-assessment.md',
];

const controls = normativeSources.flatMap(sourcePath => {
  const markdown = read(sourcePath);
  return markdownRows(markdown)
    .filter(row => /^AIES-(GOV|RSK|DAT|MOD|AGT|SEC|OPS|ASR)-\d{3}[a-z]?$/.test(row[0]))
    .map(([id, requirement, applicability, evidence]) => {
      const codes = classificationCodes(applicability);
      return {
        id,
        family: id.split('-')[1],
        requirement,
        applicability,
        evidence,
        universal: /\bUniversal\b/i.test(applicability),
        profiles: codes.filter(code => code.startsWith('P')),
        autonomyLevels: codes.filter(code => code.startsWith('A')),
        impactLevels: codes.filter(code => code.startsWith('I')),
        lifecycle: 'active',
        sourcePath,
        sourceSlug: sourcePath.slice('content/'.length, -3),
      };
    });
});

const kernel = read('content/standard/01-kernel-and-applicability.md');
const kernelRows = markdownRows(kernel);
const profiles = kernelRows
  .filter(row => /^P[1-6]$/.test(row[0]))
  .map(([code, name, inclusionTest, primaryRisk]) => ({ code, name, inclusionTest, primaryRisk }));
const autonomyLevels = kernelRows
  .filter(row => /^A[0-4]$/.test(row[0]))
  .map(([code, definition, governancePosture]) => ({ code, definition, governancePosture }));
const impactLevels = kernelRows
  .filter(row => /^I[0-3]$/.test(row[0]))
  .map(([code, definition, examples]) => ({ code, definition, examples }));

const assurance = read('content/standard/03-evidence-exceptions-conformance.md');
const assuranceRows = markdownRows(assurance);
const evidenceAttributes = assuranceRows
  .filter(row => ['Authentic', 'Attributable', 'Scoped', 'Timely', 'Complete', 'Reproducible', 'Protected'].includes(row[0]))
  .map(([attribute, acceptanceTest]) => ({ attribute, acceptanceTest }));
const evidenceClasses = assuranceRows
  .filter(row => ['Design', 'Implementation', 'Operation', 'Outcome'].includes(row[0]))
  .map(([name, proves, examples]) => ({ name, proves, examples }));
const soaDispositions = assuranceRows
  .filter(row => ['Applicable — conforming', 'Applicable — exception', 'Applicable — nonconforming', 'Not applicable'].includes(row[0]))
  .map(([disposition, meaning, claimEffect]) => ({ disposition, meaning, claimEffect }));

const crosswalkDirectory = path.join(CONTENT_ROOT, 'standard', 'crosswalks');
const crosswalkIndex = read('content/standard/crosswalks/README.md');
const crosswalkFrameworks = new Map(
  [...crosswalkIndex.matchAll(/^\|\s*\[[^\]]+]\(\.\/([^)]+)\)\s*\|\s*([^|]+)\|$/gm)]
    .map(match => [
      match[1],
      match[2].split(/,\s+/).map(value => cleanInlineMarkdown(value)).filter(Boolean),
    ]),
);
const crosswalks = fs.readdirSync(crosswalkDirectory, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
  .sort((left, right) => left.name.localeCompare(right.name))
  .map(entry => {
    const sourcePath = toPosix(path.relative(ROOT, path.join(crosswalkDirectory, entry.name)));
    const markdown = read(sourcePath);
    return {
      title: title(markdown, entry.name),
      description: description(markdown),
      ...metadata(markdown),
      frameworks: crosswalkFrameworks.get(entry.name) ?? [],
      sourcePath,
      sourceSlug: sourcePath.slice('content/'.length, -3),
    };
  });

const schemaDirectory = path.join(ROOT, 'schemas');
const schemas = fs.readdirSync(schemaDirectory, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith('.schema.json'))
  .sort((left, right) => left.name.localeCompare(right.name))
  .map(entry => {
    const sourcePath = toPosix(path.relative(ROOT, path.join(schemaDirectory, entry.name)));
    const schema = JSON.parse(read(sourcePath));
    return {
      name: schema.title ?? entry.name,
      description: schema.description ?? '',
      schemaId: schema.$id ?? null,
      schemaVersion: schema.properties?.schemaVersion?.const ?? null,
      requiredFieldCount: Array.isArray(schema.required) ? schema.required.length : 0,
      sourcePath,
    };
  });

const cliReadme = read('tools/conformance/README.md');
const cliCommands = [...cliReadme.matchAll(/```bash\r?\n([\s\S]*?)```/g)]
  .map(match => match[1].trim())
  .filter(Boolean);

const lifecycle = read('content/standard/04-lifecycle-and-assessment.md');
const lifecycleRows = markdownRows(lifecycle);
const lifecycleStages = lifecycleRows
  .filter(row => ['Active', 'Deprecated', 'Retired', 'Withdrawn'].includes(row[0]))
  .map(([stage, meaning, handling]) => ({ stage, meaning, handling }));
const normativeDocuments = normativeSources.map(sourcePath => {
  const markdown = read(sourcePath);
  return {
    title: title(markdown, sourcePath),
    ...metadata(markdown),
    sourcePath,
    sourceSlug: sourcePath.slice('content/'.length, -3),
  };
});

const governanceFiles = ['GOVERNANCE.md', 'MAINTAINERS.md', 'RFC_PROCESS.md', 'COMPATIBILITY.md'];
const governance = governanceFiles.map(sourcePath => {
  const markdown = read(sourcePath);
  return {
    title: title(markdown, sourcePath),
    description: description(markdown),
    ...metadata(markdown),
    sourcePath,
  };
});

const rfcDirectory = path.join(ROOT, 'rfcs');
const rfcs = fs.existsSync(rfcDirectory)
  ? fs.readdirSync(rfcDirectory, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map(entry => {
      const sourcePath = toPosix(path.relative(ROOT, path.join(rfcDirectory, entry.name)));
      const markdown = read(sourcePath);
      return {
        title: title(markdown, entry.name),
        status: markdown.match(/(?:Status:|\*\*Status:\*\*)\s*([^\r\n]+)/i)?.[1]?.trim() ?? 'Unspecified',
        sourcePath,
      };
    })
  : [];

const manifest = {
  schemaVersion: 1,
  generatedFrom: {
    normativeSources,
    schemaDirectory: 'schemas',
    crosswalkDirectory: 'content/standard/crosswalks',
    conformanceTool: 'tools/conformance',
  },
  counts: {
    controls: controls.length,
    controlFamilies: new Set(controls.map(control => control.family)).size,
    profiles: profiles.length,
    schemas: schemas.length,
    crosswalks: crosswalks.length,
    normativeDocuments: normativeDocuments.length,
    rfcs: rfcs.length,
  },
  controls,
  classification: { profiles, autonomyLevels, impactLevels },
  assurance: { evidenceAttributes, evidenceClasses, soaDispositions },
  crosswalks,
  schemas,
  conformanceCli: {
    status: 'tooling-available',
    sourcePath: 'tools/conformance/README.md',
    commands: cliCommands,
    warning: 'CLI output is a deterministic assessment of supplied artifacts, not external certification or regulatory approval.',
  },
  lifecycle: {
    documents: normativeDocuments,
    stages: lifecycleStages,
    compatibilityPolicy: 'COMPATIBILITY.md',
  },
  governance: {
    documents: governance,
    rfcs,
    rfcRegistryStatus: rfcs.length === 0 ? 'No RFC records are present in the canonical rfcs/ directory.' : 'RFC records discovered from rfcs/.',
  },
};

const expected = stableJson(manifest);
if (checkOnly) {
  if (!fs.existsSync(OUTPUT_PATH) || fs.readFileSync(OUTPUT_PATH, 'utf8') !== expected) {
    console.error('src/generated/portal-manifest.json is stale. Run npm run portal:generate.');
    process.exitCode = 1;
  } else {
    console.log(`Verified portal manifest for ${controls.length} controls.`);
  }
} else {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, expected, 'utf8');
  console.log(`Generated portal manifest for ${controls.length} controls.`);
}
