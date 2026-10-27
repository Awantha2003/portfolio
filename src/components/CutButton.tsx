import React from 'react';

type CutButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: 'md' | 'lg';
};

export function CutButton({ href, children, size = 'md' }: CutButtonProps) {
  const sizing = size === 'lg' ? 'px-14 py-4 text-3xl md:text-4xl' : 'px-10 py-4 text-xl md:text-2xl';
  return (
    <a
      href={href}
      className={`cut inline-block bg-brand font-display uppercase tracking-[0.08em] text-white transition-[background-color,transform] duration-150 ease-out hover:bg-brand-dark active:scale-[0.97] ${sizing}`}>
      
      {children}
    </a>);

}