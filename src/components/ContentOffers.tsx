import React from 'react';
import { useContent } from '../content/ContentProvider';
import { CutButton } from './CutButton';

export function ContentOffers() {
  const { images, services } = useContent();
  return (
    <section id="services" className="w-full bg-white pt-24 md:pt-32">
      <h2 data-big className="px-6 text-center font-display text-6xl uppercase leading-none text-ink md:text-[7rem]">
        What I <span className="text-brand">can build for you</span>
      </h2>

      <ol data-stagger className="mx-auto mt-20 max-w-[1560px] px-6">
        {services.map((o, i) =>
        <li key={o.title} className="group border-b border-black/10 last:border-b-0">
            <div className="mx-auto flex max-w-[900px] items-center gap-8 py-8 md:gap-14">
              <span className="num-stroke w-24 shrink-0 font-display text-7xl leading-none text-brand transition-transform duration-200 ease-out group-hover:-translate-y-1 md:w-36 md:text-[7rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-display text-3xl uppercase tracking-[0.03em] text-ink md:text-[3.2rem] md:leading-tight">{o.title}</p>
                <p className="mt-1 text-xl text-slate-600 md:text-[2rem]">{o.desc}</p>
              </div>
            </div>
          </li>
        )}
      </ol>

      <div data-reveal className="mx-auto mt-24 max-w-[1560px] px-6">
        <img src={images.devices} alt="Responsive design shown across desktop, laptop, tablet and phone" className="w-full" />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-16 border-t border-black/10 px-6 py-24 text-center md:grid-cols-2">
        {[
        { title: 'For clients & startups', text: 'Looking to build a product that actually works?', cta: 'Let’s connect' },
        { title: 'Want to hire for real?', text: 'Got a real role or a real idea? I’m in.', cta: 'Let’s talk' }].
        map((c) =>
        <div key={c.title} data-reveal>
            <h3 className="font-display text-4xl uppercase text-ink md:text-5xl">{c.title}</h3>
            <p className="mt-4 text-xl text-black/60 md:text-2xl">{c.text}</p>
            <div className="mt-8">
              <CutButton href="#contact">{c.cta}</CutButton>
            </div>
          </div>
        )}
      </div>
    </section>);

}