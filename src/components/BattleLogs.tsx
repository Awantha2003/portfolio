import React, { useRef } from 'react';
import { AwardIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { CutButton } from './CutButton';

export function BattleLogs() {
  const { certifications, profile } = useContent();
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 410, behavior: 'smooth' });

  return (
    <section id="certifications" className="w-full bg-white py-24 md:py-36">
      <p data-reveal className="text-center text-xl font-bold uppercase tracking-[0.2em] text-brand">Proof of learning</p>
      <h2 data-big className="mt-4 text-center font-display text-6xl uppercase text-ink md:text-[7rem] md:leading-none">My certifications</h2>

      <div className="relative mx-auto mt-16 max-w-[1720px] px-6 md:px-[7%]">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous certifications"
          className="absolute left-2 top-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] transition-transform duration-150 ease-out hover:scale-105 active:scale-95 md:flex md:left-[3%]">

          <ChevronLeftIcon className="h-7 w-7" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next certifications"
          className="absolute right-2 top-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] transition-transform duration-150 ease-out hover:scale-105 active:scale-95 md:flex md:right-[3%]">

          <ChevronRightIcon className="h-7 w-7" strokeWidth={2.5} />
        </button>

        <div ref={track} data-stagger className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-4">
          {certifications.map((c) =>
          <article
            key={c.name}
            className="flex w-[320px] shrink-0 snap-start flex-col rounded-[28px] bg-[#F7F7F9] ring-1 ring-black/10 transition-transform duration-200 ease-out hover:-translate-y-1.5 md:w-[386px]">

              <div className="flex flex-1 flex-col p-8 md:p-9">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                  <AwardIcon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold leading-tight tracking-[-0.04em] text-ink md:text-[1.9rem]">{c.name}</h3>
                <p className="mt-5 text-lg leading-snug text-black/55 md:text-xl">{c.issuer}</p>
              </div>
              <div className="flex items-center gap-6 border-t border-black/10 px-8 py-6 text-lg text-black/55 md:px-9">
                {c.url &&
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-brand transition-opacity duration-150 hover:opacity-70">
                    <ExternalLinkIcon className="h-5 w-5" />View
                  </a>
              }
                <span className="ml-auto text-sm font-semibold uppercase tracking-[0.1em]">{c.year}</span>
              </div>
            </article>
          )}
        </div>
      </div>

      <div data-reveal className="mt-14 text-center">
        <CutButton href={profile.resumeUrl} size="lg">View my resume</CutButton>
      </div>
    </section>);

}
