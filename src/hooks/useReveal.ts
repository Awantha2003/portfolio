import { RefObject, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** useLayoutEffect in the browser, useEffect during pre-rendering (where neither runs). */
export const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Scroll-triggered reveals for any [data-reveal] element and
 * staggered children of any [data-stagger] container inside `ref`.
 */
export function useReveal(ref: RefObject<HTMLElement>) {
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 85%', once: true }
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-highlight]').forEach((el) => {
        gsap.to(el, {
          backgroundSize: '100% 100%',
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true }
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-big]').forEach((el) => {
        gsap.from(el, {
          yPercent: 40,
          opacity: 0,
          scale: 0.96,
          duration: 0.3,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };