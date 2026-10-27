import React from 'react';
import { PlusIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';

export function Faq() {
  const { faq } = useContent();
  return (
    <section id="faq" className="w-full border-t border-black/10 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:pr-56">
        <h2 data-big className="font-display text-6xl uppercase leading-none text-ink md:text-[5.5rem]">
          Quick <span className="text-brand">facts</span>
        </h2>
        <div data-stagger className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {faq.map((item) =>
          <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-brand md:text-[1.7rem] [&::-webkit-details-marker]:hidden">
                <h3>{item.q}</h3>
                <PlusIcon className="h-7 w-7 shrink-0 text-brand transition-transform duration-200 ease-out group-open:rotate-45" />
              </summary>
              <p className="pb-7 pr-12 text-lg leading-relaxed text-black/70 md:text-xl">{item.a}</p>
            </details>
          )}
        </div>
      </div>
    </section>);

}
