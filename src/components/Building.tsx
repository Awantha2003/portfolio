import { useRef, useState } from 'react';
import { FigmaIcon, GithubIcon, GlobeIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { gsap, useIsoLayoutEffect } from '../hooks/useReveal';
import { CutButton } from './CutButton';
import { safeUrl } from '../lib/safeUrl';

export function Building() {
  const { projects } = useContent();
  const [index, setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const active = projects[Math.min(index, projects.length - 1)];

  useIsoLayoutEffect(() => {
    if (!panel.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.biz-anim', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' });
    }, panel);
    return () => ctx.revert();
  }, [index]);

  const vitals: [string, string][] = [
  ['Type', active.type],
  ['Built with', active.stack.join(' · ')],
  ...(active.year ? [['Year', active.year] as [string, string]] : [])];

  const links = [
  { href: active.liveUrl, label: 'Live demo', Icon: GlobeIcon },
  { href: active.githubUrl, label: 'GitHub', Icon: GithubIcon },
  { href: active.figmaUrl, label: 'Figma', Icon: FigmaIcon }].
  filter((l) => l.href);
  const primary = links[0];

  return (
    <section id="projects" className="grid-bg w-full pt-16 md:pt-32">
      <div data-big className="px-6 text-center">
        <h2 className="font-display text-6xl uppercase leading-none text-ink md:text-[7rem]">What I’ve built</h2>
        <p className="mt-6 text-xl font-bold uppercase tracking-[-0.01em] text-brand md:text-[2.3rem]">
          These are real projects, not just ideas.
        </p>
      </div>

      <div ref={panel} className="mx-auto mt-20 grid max-w-[1660px] items-center gap-12 px-6 md:px-[8%] lg:grid-cols-[1fr_1fr_0.9fr] lg:pr-[14%]">
        <div>
          <h3 className="biz-anim font-display text-6xl uppercase leading-[0.95] text-ink md:text-[5rem]">
            {active.name.split(' ').map((w, i) =>
            <span key={`${w}-${i}`} className="block">{w}</span>
            )}
          </h3>
          <p className="biz-anim mt-3 text-lg font-semibold uppercase tracking-tight text-black/55 md:text-2xl">{active.category}</p>
          <p className="biz-anim mt-8 text-lg leading-[1.7] text-black/80 md:text-[1.25rem]">{active.description}</p>
          {primary &&
          <div className="biz-anim mt-12">
              <CutButton href={primary.href!}>{primary.label}</CutButton>
            </div>
          }
        </div>

        <div className="biz-anim overflow-hidden rounded-[28px] bg-black shadow-[0_30px_80px_-35px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
          {active.media.endsWith('.mp4') ?
          <video key={active.media} src={active.media} autoPlay loop muted playsInline className="aspect-[4/3] w-full object-cover" /> :

          <img src={active.media} alt={active.name} className="aspect-[4/3] w-full object-cover" />
          }
        </div>

        <div className="border-black/10 lg:border-l lg:pl-12">
          <p className="biz-anim font-display text-3xl uppercase tracking-[0.15em] text-black/55">Project vitals</p>
          <dl className="mt-8">
            {vitals.map(([k, v]) =>
            <div key={k} className="biz-anim flex items-center justify-between gap-6 border-b border-dashed border-black/15 py-7">
                <dt className="shrink-0 text-base font-semibold uppercase text-black/55 md:text-lg">{k}</dt>
                <dd className="text-right text-lg font-bold uppercase tracking-tight text-ink md:text-[1.2rem]">{v}</dd>
              </div>
            )}
            {links.length > 0 &&
            <div className="biz-anim flex items-center justify-between py-7">
                <dt className="text-base font-semibold uppercase text-black/55 md:text-lg">Links</dt>
                <dd className="flex gap-5 text-ink">
                  {links.map(({ href, label, Icon }) =>
                <a key={label} href={safeUrl(href)} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-colors duration-150 hover:text-brand">
                      <Icon className="h-8 w-8" />
                    </a>
                )}
                </dd>
              </div>
            }
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1760px] border-t border-black/10 px-6">
        <div role="tablist" aria-label="Choose a project" className="no-scrollbar flex gap-10 overflow-x-auto py-12">
          {projects.map((p, i) =>
          <button
            key={p.id}
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={`shrink-0 px-4 font-display text-3xl uppercase text-ink transition-[opacity,transform,color] duration-200 ease-out hover:opacity-100 active:scale-95 md:text-4xl ${
            i === index ? 'scale-110 text-brand opacity-100' : 'opacity-35'}`
            }>

              {p.name}
            </button>
          )}
        </div>
      </div>
    </section>);

}
