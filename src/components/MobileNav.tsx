import { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { navItems } from '../data/content';
import { useContent } from '../content/ContentProvider';
import { CutButton } from './CutButton';

/** Top bar + full-screen menu for phones and tablets (the side nav is desktop-only). */
export function MobileNav() {
  const { profile } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <header className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-3 transition-colors duration-200 ${scrolled ? 'bg-black/85 backdrop-blur' : 'bg-transparent'}`}>
        <a href="#home" className="font-display text-2xl uppercase tracking-wide text-white">
          {profile.firstName}<span className="text-brand">.</span>
        </a>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="cut flex h-11 w-11 items-center justify-center bg-brand text-white transition-transform duration-150 active:scale-95">

          <MenuIcon className="h-6 w-6" />
        </button>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`stripes fixed inset-0 z-50 flex flex-col px-6 pb-8 pt-5 text-white transition-[opacity,visibility] duration-200 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>

        <div className="flex items-center justify-between">
          <span className="font-display text-2xl uppercase tracking-wide">{profile.firstName}<span className="text-brand">.</span></span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-150 active:bg-white/20">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Sections" className="mt-10 flex-1 overflow-y-auto">
          <ul>
            {navItems.map((n, i) =>
            <li key={n.id} className="border-b border-white/10">
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4 font-display text-4xl uppercase tracking-wide transition-colors duration-150 active:text-brand">
                  <span className="w-8 text-base text-brand">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="mt-6 flex flex-wrap gap-3">
          <CutButton href={`mailto:${profile.email}`}>Email me</CutButton>
          <CutButton href={profile.resumeUrl}>CV</CutButton>
        </div>
      </div>
    </div>);

}
