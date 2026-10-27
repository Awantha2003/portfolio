import { useEffect, useState } from 'react';
import { navItems } from '../data/content';

export function SideNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex xl:right-14">
      {navItems.map((n) => {
        const isActive = active === n.id;
        return (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={isActive ? 'true' : undefined}
            className={`cut px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] transition-[background-color,color,transform] duration-200 ease-out hover:-translate-x-1 ${
            isActive ? 'bg-brand text-white' : 'bg-ink-soft text-white/90 hover:bg-ink'}`
            }>
            
            {n.label}
          </a>);

      })}
    </nav>);

}