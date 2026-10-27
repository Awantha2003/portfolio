import { CheckIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { CutButton } from './CutButton';

export function ListPodcast() {
  const { keySkills, profile, skillGroups } = useContent();
  return (
    <section id="skills" className="w-full bg-white py-16 md:py-32">
      <div className="mx-auto grid max-w-[1500px] items-start gap-16 px-6 lg:grid-cols-2 lg:pr-56">
        <div data-reveal>
          <h2 className="font-display text-6xl uppercase leading-none text-ink md:text-[5.5rem]">My stack</h2>
          <div className="mt-4 h-1.5 w-24 bg-brand" />
          <p className="mt-8 text-xl leading-snug text-black/70 md:text-[1.7rem] md:leading-[1.4]">
            My toolkit for creating powerful digital experiences.
          </p>
          <dl className="mt-8 space-y-6">
            {skillGroups.map((g) =>
            <div key={g.category}>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{g.category}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {g.skills.map((s) =>
                <span key={s} className="rounded-lg bg-lime px-4 py-1.5 text-lg font-bold tracking-tight text-ink">{s}</span>
                )}
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div data-reveal className="rounded-[28px] border-2 border-ink p-10 md:p-12">
          <h3 className="font-display text-5xl uppercase leading-none text-ink md:text-6xl">Key skills</h3>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-xl font-medium text-ink md:text-2xl">
            {keySkills.map((s) =>
            <li key={s} className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 shrink-0 text-brand" strokeWidth={3} /> {s}
              </li>
            )}
          </ul>
          <div className="mt-10">
            <CutButton href={profile.resumeUrl}>Download full CV</CutButton>
          </div>
        </div>
      </div>
    </section>);

}
