import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CutButton } from "./CutButton";
import { socialsFor } from "../data/content";
import { useContent } from '../content/ContentProvider';
import { safeUrl } from '../lib/safeUrl';
const iconMap: Record<string, LucideIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon
};
export function Footer() {
  const { profile } = useContent();
  return <footer id="join" className="w-full bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1100px] px-6 pb-28 pt-32 text-center md:pt-36">
        <h2 data-big className="font-display text-7xl uppercase leading-none tracking-[-0.01em] md:text-[9rem]">
          Let’s build<span className="text-brand">.</span>
        </h2>
        <p data-reveal className="mx-auto mt-12 max-w-[960px] text-xl font-light leading-snug text-white/85 md:text-[2.6rem] md:leading-[1.25]">
          Projects, freelance work or a full-time role — let’s build what’s next.
        </p>
        <div data-reveal className="mt-12 flex flex-wrap justify-center gap-4">
          <CutButton href={`mailto:${profile.email}`}>Email me</CutButton>
          <CutButton href={profile.resumeUrl}>Download CV</CutButton>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-11 gap-y-4">
          {socialsFor(profile).map((s) => {
          const Icon = iconMap[s.platform];
          return <li key={s.platform}>
                <a href={safeUrl(s.href)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl text-white/75 transition-colors duration-150 hover:text-white md:text-2xl">
                  <Icon className="h-7 w-7" /> {s.handle}
                </a>
              </li>;
        })}
        </ul>
        <p className="mx-auto mt-20 max-w-[880px] text-base leading-relaxed text-white/45 md:text-lg">
          {profile.name} is the founder of WOLFENOX, a software engineer, UI/UX engineer and Information Technology undergraduate at SLIIT. With 20+ projects and clients in
          Sri Lanka, India and the USA, {profile.firstName} turns ideas into working products, designs clean interfaces people enjoy and ships code that lasts.
        </p>
      </div>
      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1820px] flex-col items-center justify-between gap-3 px-6 py-7 text-sm uppercase tracking-[0.08em] text-white/55 md:flex-row md:px-12 md:text-lg">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p>
            Designed &amp; built by <span className="text-brand">{profile.firstName}</span>
          </p>
        </div>
      </div>
    </footer>;
}
