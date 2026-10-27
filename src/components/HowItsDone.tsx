import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, XIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { gsap, useIsoLayoutEffect } from '../hooks/useReveal';

export function HowItsDone() {
  const { experience, images } = useContent();
  const [open, setOpen] = useState(false);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!section.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-frame',
        { clipPath: 'inset(12% 18% 12% 18% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: '.video-frame', start: 'top 85%', end: 'top 15%', scrub: true }
        }
      );
      gsap.fromTo('.video-el', { scale: 1.25 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.video-frame', start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.from('.video-title span', {
        yPercent: 110,
        duration: 0.3,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.video-frame', start: 'top 40%', once: true }
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  return (
    <section id="experience" ref={section} className="relative w-full overflow-hidden bg-black text-white">
      <div className="video-frame relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <video
          className="video-el absolute inset-0 h-full w-full object-cover"
          src={images.showreel}
          poster={images.podcast}
          autoPlay
          muted
          loop
          playsInline />
        
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 className="video-title font-display text-6xl uppercase leading-none md:text-[8rem]">
            <span className="block overflow-hidden"><span className="block">how it’s built.</span></span>
          </h2>
          <button
            onClick={() => setOpen(true)}
            aria-label="Play full video"
            className="group relative mt-10 flex h-24 w-24 items-center justify-center md:h-28 md:w-28">
            
            <span className="absolute inset-0 animate-ping rounded-full bg-lime/30" />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-lime text-ink transition-transform duration-150 ease-out group-hover:scale-105 group-active:scale-95">
              <PlayIcon className="ml-1 h-10 w-10 fill-current" />
            </span>
          </button>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Watch the showreel</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <p data-reveal className="text-center font-display text-4xl uppercase tracking-wide md:text-6xl">Experience</p>
        <div className="relative mt-12">
          <button onClick={() => scroll(-1)} aria-label="Previous roles" className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors duration-150 hover:bg-brand md:block">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next roles" className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors duration-150 hover:bg-brand md:block">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <div ref={track} data-stagger className="no-scrollbar flex snap-x gap-10 overflow-x-auto px-2 md:px-14">
            {experience.map((r) =>
            <article key={r.position} className={`shrink-0 snap-start ${r.highlights?.length ? 'w-[320px] md:w-[440px]' : 'w-[340px]'}`}>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-ink">{r.initials}</span>
                  <div>
                    <p className="text-lg font-bold">{r.position}</p>
                    <p className="text-sm font-semibold text-lime">{r.company}</p>
                  </div>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-white/75 md:text-xl">{r.description}</p>
                {!!r.highlights?.length &&
              <ul className="mt-4 space-y-2 text-base leading-snug text-white/65">
                    {r.highlights.map((h) =>
                <li key={h} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {h}
                      </li>
                )}
                  </ul>
              }
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                  {r.period}{r.location && ` · ${r.location}`}
                </p>
              </article>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={() => setOpen(false)}>
          
            <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}>
            
              <button onClick={() => setOpen(false)} aria-label="Close video" className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition-colors duration-150 hover:bg-brand">
                <XIcon className="h-5 w-5" />
              </button>
              <video src={images.showreel} controls autoPlay playsInline className="aspect-video w-full rounded-2xl bg-black" />
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}