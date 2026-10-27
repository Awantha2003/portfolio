import React, { useEffect, useRef, useState } from 'react';
import { CutButton } from './CutButton';
import { gsap, useIsoLayoutEffect } from '../hooks/useReveal';
import { useContent } from '../content/ContentProvider';

export function Hero() {
  const { ghostWords, images, hero, profile } = useContent();
  const root = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useIsoLayoutEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-bg', { scale: 1.12, duration: 1.4, ease: 'power2.out' }, 0).
      from('.hero-line', { yPercent: 110, duration: 0.3, stagger: 0.09 }, 0.15).
      from('.hero-sub', { y: 24, opacity: 0, duration: 0.3 }, '-=0.05').
      from('.hero-form', { y: 24, opacity: 0, duration: 0.3 }, '-=0.2').
      from('.hero-card', { y: 140, opacity: 0, duration: 0.3 }, '-=0.1');

      gsap.fromTo(
        '.hero-card',
        { scale: 0.92 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '.hero-card', start: 'top bottom', end: 'top 20%', scrub: true } }
      );
      gsap.to('.hero-content', {
        yPercent: 18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '40% top', scrub: true }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setInterval(() => {
      if (reduce || !ghost.current) {
        setWordIndex((i) => (i + 1) % ghostWords.length);
        return;
      }
      gsap.to(ghost.current, {
        yPercent: -60,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setWordIndex((i) => (i + 1) % ghostWords.length);
          gsap.fromTo(ghost.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power3.out' });
        }
      });
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" ref={root} className="relative w-full overflow-hidden bg-white">
      <div
        className="relative overflow-hidden bg-black pb-[22vw] pt-32 md:pt-44"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 94% 94%, 6% 96%, 0 90%)' }}>
        
        <video
          className="hero-bg absolute inset-0 h-full w-full object-cover opacity-40"
          src={images.showreel}
          poster={images.heroBg}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true" />
        
        <div className="absolute inset-0 bg-black/55" />

        <div className="hero-content relative mx-auto max-w-[1500px] px-6 text-center">
          <h1 className="hero-sub mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/70 md:mb-8 md:text-lg">
            {profile.name} <span className="text-brand">·</span> {profile.role}
          </h1>
          <p className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-white text-[clamp(2.9rem,7.6vw,8.8rem)]">
            {hero.lines.map((l) =>
            <span key={l.accent} className="block overflow-hidden">
                <span className="hero-line block">
                  {l.text} <span className="text-brand">{l.accent}</span>
                  <span className="text-white">.</span>{' '}
                </span>
              </span>
            )}
          </p>
          <p className="hero-sub mx-auto mt-10 max-w-[960px] text-xl font-light leading-snug text-white/90 md:text-[2.6rem] md:leading-[1.25]">
            {hero.subtitle.map((line, i) =>
            <React.Fragment key={i}>
                {i > 0 && <br className="hidden md:block" />}
                {i > 0 && ' '}{line}
              </React.Fragment>
            )}
          </p>
          <div className="hero-form mt-12 flex flex-wrap justify-center gap-4 md:mt-14">
            <CutButton href="#projects">See my work</CutButton>
            <CutButton href="#contact">Contact me</CutButton>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[3vw] left-0 right-0 overflow-hidden text-center font-sans font-black lowercase leading-none tracking-tighter text-white/25 text-[clamp(4rem,9vw,10rem)]">
          
          <span ref={ghost} className="inline-block">{ghostWords[wordIndex]}</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto -mt-[14vw] max-w-[1680px] px-4 pb-10 md:px-[6%]">
        <div className="hero-card overflow-hidden rounded-[28px] bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
          <video
            src={images.showreel}
            poster={images.heroPortrait}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[16/9] w-full object-cover"
            aria-label="Showreel" />
          
        </div>
      </div>
    </section>);

}