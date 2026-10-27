import { useRef } from 'react';
import { useContent } from '../content/ContentProvider';
import { gsap, useIsoLayoutEffect } from '../hooks/useReveal';

export function BrandStrip() {
  const { techStack } = useContent();
  const track = useRef<HTMLUListElement>(null);

  useIsoLayoutEffect(() => {
    if (!track.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = track.current;
    const tween = gsap.to(el, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 });
    const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.3 });
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.3 });
    el.addEventListener('mouseenter', slow);
    el.addEventListener('mouseleave', resume);
    return () => {
      tween.kill();
      el.removeEventListener('mouseenter', slow);
      el.removeEventListener('mouseleave', resume);
    };
  }, []);

  const items = [...techStack, ...techStack];

  return (
    <div className="marquee-mask w-full overflow-hidden bg-white py-14" aria-label="Technologies I use">
      <ul ref={track} className="flex w-max items-center">
        {items.map((b, i) =>
        <li
          key={`${b.name}-${i}`}
          aria-hidden={i >= techStack.length}
          className={`w-[270px] shrink-0 select-none text-center text-3xl md:text-4xl ${b.className}`}>
          
            {b.name}
          </li>
        )}
      </ul>
    </div>);

}