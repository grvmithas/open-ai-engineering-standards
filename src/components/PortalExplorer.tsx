'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import portalManifest from '@/generated/portal-manifest.json';

const familyNames: Record<string, string> = {
  GOV: 'Governance',
  RSK: 'Risk',
  DAT: 'Data',
  MOD: 'Model',
  AGT: 'Agent',
  SEC: 'Security',
  OPS: 'Operations',
  ASR: 'Assurance',
};

function SourceLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link href={`/docs/${slug}`} className="text-violet-300 underline decoration-violet-700 underline-offset-4 hover:text-violet-200">
      {children}
    </Link>
  );
}

function SectionHeading({
  id,
  title,
  kind = 'informative',
  children,
}: {
  id: string;
  title: string;
  kind?: 'normative' | 'informative' | 'tooling';
  children: React.ReactNode;
}) {
  const styles = {
    normative: 'border-amber-700/40 bg-amber-950/20 text-amber-200',
    informative: 'border-cyan-800/40 bg-cyan-950/20 text-cyan-200',
    tooling: 'border-emerald-800/40 bg-emerald-950/20 text-emerald-200',
  };
  return (
    <div className="mb-6">
      <div className={`mb-3 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${styles[kind]}`}>
        {kind}
      </div>
      <h2 id={id} className="scroll-mt-24 text-2xl font-extrabold tracking-tight text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-slate-300">
      {label}
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
      >
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export default function PortalExplorer() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [profile, setProfile] = useState('all');
  const [autonomy, setAutonomy] = useState('all');
  const [impact, setImpact] = useState('all');
  const [includeUniversal, setIncludeUniversal] = useState(true);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedAutonomy, setSelectedAutonomy] = useState('A0');
  const [selectedImpact, setSelectedImpact] = useState('I0');
  const [crosswalkQuery, setCrosswalkQuery] = useState('');

  const families = useMemo(
    () => [...new Set(portalManifest.controls.map(control => control.family))].sort(),
    [],
  );

  const filteredControls = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return portalManifest.controls.filter(control => {
      if (family !== 'all' && control.family !== family) return false;
      if (
        profile !== 'all' &&
        !control.profiles.includes(profile as never) &&
        !(includeUniversal && control.universal)
      ) return false;
      if (
        autonomy !== 'all' &&
        !control.autonomyLevels.includes(autonomy as never) &&
        !(includeUniversal && control.universal)
      ) return false;
      if (
        impact !== 'all' &&
        !control.impactLevels.includes(impact as never) &&
        !(includeUniversal && control.universal)
      ) return false;
      return !normalizedQuery || [
        control.id,
        control.requirement,
        control.applicability,
        control.evidence,
      ].some(value => value.toLowerCase().includes(normalizedQuery));
    });
  }, [autonomy, family, impact, includeUniversal, profile, query]);

  const candidateControls = useMemo(() => portalManifest.controls.filter(control =>
    control.universal ||
    control.profiles.some(value => selectedProfiles.includes(value)) ||
    control.autonomyLevels.includes(selectedAutonomy as never) ||
    control.impactLevels.includes(selectedImpact as never),
  ), [selectedAutonomy, selectedImpact, selectedProfiles]);

  const crosswalks = useMemo(() => {
    const normalized = crosswalkQuery.trim().toLowerCase();
    if (!normalized) return portalManifest.crosswalks;
    return portalManifest.crosswalks.filter(crosswalk =>
      [crosswalk.title, crosswalk.description, ...crosswalk.frameworks]
        .some(value => value.toLowerCase().includes(normalized)),
    );
  }, [crosswalkQuery]);

  const filterOptions = {
    profiles: [{ value: 'all', label: 'All profiles' }, ...portalManifest.classification.profiles.map(item => ({ value: item.code, label: `${item.code} — ${item.name}` }))],
    autonomy: [{ value: 'all', label: 'All autonomy levels' }, ...portalManifest.classification.autonomyLevels.map(item => ({ value: item.code, label: item.code }))],
    impact: [{ value: 'all', label: 'All impact levels' }, ...portalManifest.classification.impactLevels.map(item => ({ value: item.code, label: item.code }))],
  };

  return (
    <div className="space-y-20">
      <nav aria-label="Portal sections" className="sticky top-[60px] z-20 -mx-4 flex gap-2 overflow-x-auto border-b border-slate-800 bg-[#050509]/95 px-4 py-3 text-xs backdrop-blur">
        {[
          ['controls', 'Controls'],
          ['classify', 'Classify'],
          ['evidence', 'Evidence & SoA'],
          ['crosswalks', 'Crosswalks'],
          ['schemas', 'Schemas & CLI'],
          ['versions', 'Versions'],
          ['governance', 'Governance'],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full border border-slate-800 px-3 py-1.5 text-slate-300 hover:border-violet-700 hover:text-white">
            {label}
          </a>
        ))}
      </nav>

      <section aria-labelledby="controls">
        <SectionHeading id="controls" title="Normative control catalog" kind="normative">
          Every result below is parsed from the normative kernel and control documents. Requirement language and objective evidence are authoritative; portal filters do not decide applicability.
        </SectionHeading>

        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 md:grid-cols-2 xl:grid-cols-5">
          <label className="grid gap-1.5 text-xs font-semibold text-slate-300 xl:col-span-2">
            Search controls
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Control ID, requirement, evidence…"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
            />
          </label>
          <Select label="Family" value={family} onChange={setFamily} options={[
            { value: 'all', label: 'All families' },
            ...families.map(value => ({ value, label: `${value} — ${familyNames[value] ?? value}` })),
          ]} />
          <Select label="Workload profile" value={profile} onChange={setProfile} options={filterOptions.profiles} />
          <Select label="Autonomy" value={autonomy} onChange={setAutonomy} options={filterOptions.autonomy} />
          <Select label="Impact" value={impact} onChange={setImpact} options={filterOptions.impact} />
          <label className="flex items-center gap-2 text-xs text-slate-300 md:col-span-2">
            <input type="checkbox" checked={includeUniversal} onChange={event => setIncludeUniversal(event.target.checked)} className="size-4 accent-violet-500" />
            Include universal baseline when filtering overlays
          </label>
          <div aria-live="polite" className="self-end text-xs font-semibold text-slate-400 xl:col-span-2 xl:text-right">
            Showing {filteredControls.length} of {portalManifest.counts.controls} controls
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredControls.map(control => (
            <article key={control.id} className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-300">{control.id}</span>
                <span className="rounded-full bg-amber-950 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-200">Normative · active</span>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-400">{familyNames[control.family] ?? control.family}</span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-100">{control.requirement}</p>
              <dl className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                <div><dt className="font-bold uppercase tracking-wider text-slate-500">Applicability</dt><dd className="mt-1 text-slate-300">{control.applicability}</dd></div>
                <div><dt className="font-bold uppercase tracking-wider text-slate-500">Objective evidence</dt><dd className="mt-1 text-slate-300">{control.evidence}</dd></div>
              </dl>
              <div className="mt-3 text-xs"><SourceLink slug={control.sourceSlug}>Open normative source</SourceLink></div>
            </article>
          ))}
          {filteredControls.length === 0 && <p className="rounded-xl border border-slate-800 p-6 text-center text-sm text-slate-400">No controls match these filters.</p>}
        </div>
      </section>

      <section aria-labelledby="classify">
        <SectionHeading id="classify" title="Workload and risk classification worksheet">
          This informative worksheet identifies a candidate control set for SoA review. It does not classify a system, prove applicability, or produce a conformance result.
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <fieldset className="rounded-xl border border-cyan-900/30 bg-cyan-950/10 p-5">
            <legend className="px-2 text-sm font-bold text-cyan-200">1. Select every production behavior</legend>
            <div className="mt-2 grid gap-3">
              {portalManifest.classification.profiles.map(item => (
                <label key={item.code} className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <input
                    type="checkbox"
                    checked={selectedProfiles.includes(item.code)}
                    onChange={event => setSelectedProfiles(current =>
                      event.target.checked ? [...current, item.code] : current.filter(value => value !== item.code),
                    )}
                    className="mt-1 size-4 shrink-0 accent-cyan-500"
                  />
                  <span>
                    <span className="block text-sm font-bold text-white">{item.code} — {item.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.inclusionTest}</span>
                    <span className="mt-1 block text-xs text-cyan-300">Primary risk: {item.primaryRisk}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-5">
            <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5 sm:grid-cols-2">
              <Select label="2. Maximum deployed autonomy" value={selectedAutonomy} onChange={setSelectedAutonomy} options={portalManifest.classification.autonomyLevels.map(item => ({ value: item.code, label: `${item.code} — ${item.definition}` }))} />
              <Select label="3. Highest foreseeable impact" value={selectedImpact} onChange={setSelectedImpact} options={portalManifest.classification.impactLevels.map(item => ({ value: item.code, label: `${item.code} — ${item.definition}` }))} />
              <div className="text-xs leading-5 text-slate-400 sm:col-span-2">
                <strong className="text-slate-200">Governance posture:</strong> {portalManifest.classification.autonomyLevels.find(item => item.code === selectedAutonomy)?.governancePosture}
              </div>
            </div>
            <div className="rounded-xl border border-violet-900/30 bg-violet-950/10 p-5">
              <h3 className="font-bold text-white">Candidate SoA review set</h3>
              <p className="mt-2 text-sm text-slate-300">
                {candidateControls.length} controls match the universal baseline or selected overlays. Conditional controls and legal or organization-specific requirements still require explicit review.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(candidateControls.reduce<Record<string, number>>((counts, control) => {
                  counts[control.family] = (counts[control.family] ?? 0) + 1;
                  return counts;
                }, {})).map(([key, count]) => (
                  <span key={key} className="rounded-full border border-violet-800/40 px-2.5 py-1 text-xs text-violet-200">{key}: {count}</span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-amber-200">
                Do not describe this candidate set as an assessment or claim. Complete boundary analysis, applicability rationales, approvals, evidence, and catalog reconciliation in the SoA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="evidence">
        <SectionHeading id="evidence" title="Evidence requirements and SoA workflow" kind="normative">
          The evidence quality attributes, evidence classes, and SoA dispositions below come directly from the normative assurance source.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-5">
            <h3 className="font-bold text-white">Admissibility checks</h3>
            <dl className="mt-4 grid gap-3">
              {portalManifest.assurance.evidenceAttributes.map(item => (
                <div key={item.attribute}><dt className="text-xs font-bold text-amber-300">{item.attribute}</dt><dd className="mt-0.5 text-xs leading-5 text-slate-300">{item.acceptanceTest}</dd></div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-5">
            <h3 className="font-bold text-white">Evidence classes</h3>
            <dl className="mt-4 grid gap-3">
              {portalManifest.assurance.evidenceClasses.map(item => (
                <div key={item.name}><dt className="text-xs font-bold text-amber-300">{item.name} — {item.proves}</dt><dd className="mt-0.5 text-xs leading-5 text-slate-300">{item.examples}</dd></div>
              ))}
            </dl>
          </div>
        </div>
        <ol className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['1', 'Freeze scope', 'Record system/version, boundary, profiles, autonomy, impact, environments, period, and catalog version.'],
            ['2', 'Reconcile catalog', `Create one decision for every one of the ${portalManifest.counts.controls} controls in this generated catalog.`],
            ['3', 'Link evidence', 'Map attributable, scoped, timely, complete, reproducible, and protected evidence references.'],
            ['4', 'Approve and review', 'Record owners, exceptions, approvals, validation evidence, material-change triggers, and next review.'],
          ].map(([step, heading, copy]) => (
            <li key={step} className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <span className="text-xs font-bold text-violet-300">STEP {step}</span>
              <h3 className="mt-2 text-sm font-bold text-white">{heading}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-400">{copy}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[700px] text-left text-xs">
            <caption className="sr-only">Normative Statement of Applicability dispositions</caption>
            <thead className="bg-slate-900 text-slate-300"><tr><th className="p-3">Disposition</th><th className="p-3">Meaning</th><th className="p-3">Claim effect</th></tr></thead>
            <tbody>{portalManifest.assurance.soaDispositions.map(item => (
              <tr key={item.disposition} className="border-t border-slate-800"><th className="p-3 font-semibold text-amber-300">{item.disposition}</th><td className="p-3 text-slate-300">{item.meaning}</td><td className="p-3 text-slate-400">{item.claimEffect}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-4 text-xs"><SourceLink slug="standard/03-evidence-exceptions-conformance">Open normative evidence and conformance source</SourceLink></p>
      </section>

      <section aria-labelledby="crosswalks">
        <SectionHeading id="crosswalks" title="Standards crosswalk discovery">
          Crosswalks are informative evidence-discovery aids. They do not establish equivalence, compliance, endorsement, certification, or external validation.
        </SectionHeading>
        <label className="grid max-w-xl gap-1.5 text-xs font-semibold text-slate-300">
          Search frameworks
          <input type="search" value={crosswalkQuery} onChange={event => setCrosswalkQuery(event.target.value)} placeholder="NIST, OWASP, ISO, OpenTelemetry…" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30" />
        </label>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {crosswalks.map(crosswalk => (
            <article key={crosswalk.sourcePath} className="rounded-xl border border-cyan-900/30 bg-cyan-950/10 p-5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">{crosswalk.status}</div>
              <h3 className="mt-2 font-bold text-white">{crosswalk.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{crosswalk.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{crosswalk.frameworks.map(framework => <span key={framework} className="rounded-full border border-cyan-900/50 px-2 py-1 text-[10px] text-cyan-200">{framework}</span>)}</div>
              <div className="mt-4 text-xs"><SourceLink slug={crosswalk.sourceSlug}>Inspect mapping and limits</SourceLink></div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="schemas">
        <SectionHeading id="schemas" title="Schema and conformance CLI onboarding" kind="tooling">
          These contracts and commands are implementation tooling. Running them can validate supplied artifacts; it does not create external evidence or a certification.
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[620px] text-left text-xs">
              <caption className="sr-only">Available OAIES JSON schemas</caption>
              <thead className="bg-slate-900 text-slate-300"><tr><th className="p-3">Contract</th><th className="p-3">Version</th><th className="p-3">Required fields</th><th className="p-3">Source</th></tr></thead>
              <tbody>{portalManifest.schemas.map(schema => (
                <tr key={schema.sourcePath} className="border-t border-slate-800"><th className="p-3 font-semibold text-white">{schema.name}</th><td className="p-3 text-slate-300">{schema.schemaVersion ?? 'Declared in schema'}</td><td className="p-3 text-slate-300">{schema.requiredFieldCount}</td><td className="p-3 font-mono text-[10px] text-emerald-300">{schema.sourcePath}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <div className="space-y-4">
            {portalManifest.conformanceCli.commands.map((command, index) => (
              <div key={command} className="rounded-xl border border-emerald-900/30 bg-emerald-950/10 p-4">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-300">{index === 0 ? 'Assessment command' : 'Verification command'}</div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-5 text-slate-200"><code>{command}</code></pre>
              </div>
            ))}
            <p className="rounded-lg border border-amber-900/30 bg-amber-950/10 p-3 text-xs leading-5 text-amber-200">{portalManifest.conformanceCli.warning}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="versions">
        <SectionHeading id="versions" title="Versions and deprecations" kind="normative">
          Normative document versions and lifecycle vocabulary are derived from the published standard sources. No controls are presented as deprecated without a canonical source record.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {portalManifest.lifecycle.documents.map(document => (
            <article key={document.sourcePath} className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4">
              <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">{document.status}</span><span className="font-mono text-xs text-slate-400">v{document.version}</span></div>
              <h3 className="mt-2 font-bold text-white">{document.title}</h3>
              <div className="mt-3 text-xs"><SourceLink slug={document.sourceSlug}>Open versioned source</SourceLink></div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {portalManifest.lifecycle.stages.map(stage => (
            <div key={stage.stage} className="rounded-xl border border-slate-800 p-4"><h3 className="text-sm font-bold text-white">{stage.stage}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{stage.meaning}</p><p className="mt-2 text-xs text-slate-300">{stage.handling}</p></div>
          ))}
        </div>
      </section>

      <section aria-labelledby="governance">
        <SectionHeading id="governance" title="RFC and governance status">
          Governance status is derived from repository policy files and the canonical RFC directory. Absence of an RFC record is reported as absence, not approval or rejection.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {portalManifest.governance.documents.map(document => (
            <article key={document.sourcePath} className="rounded-xl border border-cyan-900/30 bg-cyan-950/10 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Policy v{document.version}</div>
              <h3 className="mt-2 font-bold text-white">{document.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{document.description}</p>
              <div className="mt-3 font-mono text-[10px] text-slate-500">{document.sourcePath}</div>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
          <h3 className="font-bold text-white">RFC registry</h3>
          <p className="mt-2 text-sm text-slate-300">{portalManifest.governance.rfcRegistryStatus}</p>
          <p className="mt-2 text-xs text-slate-500">Canonical RFC records discovered: {portalManifest.counts.rfcs}</p>
        </div>
      </section>
    </div>
  );
}
