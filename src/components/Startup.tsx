import { useState } from 'react';
import { useContent } from '../content/ContentProvider';
import { CutButton } from './CutButton';

export function Startup() {
  const { startup, startupProjects } = useContent();
  const groups = ['All', ...new Set(startupProjects.map((p) => p.group))];
  const [group, setGroup] = useState('All');
  const shown = group === 'All' ? startupProjects : startupProjects.filter((p) => p.group === group);

  return (
    <section id="startup" className="stripes w-full py-16 text-white md:py-32">
      <div data-big className="px-6 text-center">
        <h2 className="font-display text-6xl uppercase leading-none md:text-[7rem]">What I’m building</h2>
        <p className="mt-6 text-xl font-bold uppercase tracking-[-0.01em] text-brand md:text-[2.3rem]">
          A real company with real clients, not a side idea.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1660px] items-center gap-12 px-6 md:px-[8%] lg:grid-cols-[1fr_0.7fr_1fr] lg:pr-[14%]">
        <div data-reveal>
          <h3 className="font-display text-6xl uppercase leading-[0.95] md:text-[5.4rem]">{startup.name}</h3>
          <p className="mt-3 text-lg font-semibold uppercase tracking-tight text-white/55 md:text-2xl">{startup.category}</p>
          <p className="mt-8 text-lg leading-[1.7] text-white/80 md:text-[1.3rem]">{startup.description}</p>
          <p className="mt-6 border-l-4 border-lime pl-5 text-lg italic leading-snug text-lime md:text-xl">{startup.mission}</p>
          <div className="mt-12">
            <CutButton href={startup.url}>Visit {startup.name}</CutButton>
          </div>
        </div>

        <div data-reveal className="flex justify-center">
          <img src={startup.logo} alt={`${startup.name} logo`} className="h-56 w-56 rounded-[28px] object-cover shadow-[0_30px_80px_-30px_rgba(255,0,0,0.6)] md:h-64 md:w-64" />
        </div>

        <div data-reveal className="border-white/10 lg:border-l lg:pl-12">
          <p className="font-display text-3xl uppercase tracking-[0.15em] text-white/55">Company vitals</p>
          <dl className="mt-8">
            {startup.vitals.map(({ label: k, value: v }) =>
            <div key={k} className="flex items-center justify-between gap-6 border-b border-dashed border-white/15 py-6 last:border-b-0">
                <dt className="text-base font-semibold uppercase text-white/55 md:text-lg">{k}</dt>
                <dd className="text-right text-lg font-bold uppercase tracking-tight md:text-[1.3rem]">{v}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1660px] px-6 md:px-[8%] lg:pr-[14%]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 data-reveal className="font-display text-4xl uppercase md:text-6xl">
            Built at <span className="text-brand">{startup.name}</span>
          </h3>
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {groups.map((g) =>
            <button
              key={g}
              role="tab"
              aria-selected={group === g}
              onClick={() => setGroup(g)}
              className={`cut px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-150 active:scale-[0.97] ${
              group === g ? 'bg-brand text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`
              }>

                {g}
              </button>
            )}
          </div>
        </div>

        <ul data-stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {shown.map((p) =>
          <li key={p.title} className="group overflow-hidden rounded-2xl bg-white/5 sm:rounded-[28px] ring-1 ring-white/10 transition-transform duration-200 ease-out hover:-translate-y-1.5">
              <div className="overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
              </div>
              <div className="flex flex-col items-start gap-2 p-3 sm:flex-row sm:justify-between sm:gap-4 sm:p-6">
                <div>
                  <p className="text-base font-bold leading-tight tracking-[-0.03em] sm:text-2xl">{p.title}</p>
                  <p className="mt-1 text-xs text-white/55 sm:text-base">{p.tag}</p>
                </div>
                {p.client &&
              <span className="shrink-0 rounded-md bg-lime px-2 py-0.5 text-[11px] font-bold text-ink sm:rounded-lg sm:px-3 sm:py-1 sm:text-sm">{p.client}</span>
              }
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
