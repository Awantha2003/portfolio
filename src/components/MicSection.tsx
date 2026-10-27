import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contactPointsFor } from "../data/content";
import { useContent } from '../content/ContentProvider';
import { CutButton } from "./CutButton";
import { safeUrl } from "../lib/safeUrl";
const iconMap: Record<string, LucideIcon> = {
  mail: MailIcon,
  pin: MapPinIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon
};
export function MicSection() {
  const { images, profile } = useContent();
  return <section id="contact" className="grid-bg w-full border-b border-black/10 py-16 md:py-36">
      <div className="mx-auto grid max-w-[1860px] items-center gap-16 px-6 md:px-[3%] lg:grid-cols-2 lg:pr-[14%]">
        <div data-reveal className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
          <img src={images.profile} alt={profile.name} className="aspect-[4/5] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-black/65 px-8 py-6 md:px-11">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85 md:text-xl">{profile.role}</p>
            <p className="mt-1 font-display text-3xl uppercase tracking-wide text-lime md:text-5xl">{profile.name}</p>
          </div>
        </div>

        <div data-reveal>
          <h2 className="font-display text-6xl uppercase leading-[0.95] text-ink md:text-[7rem]">Got a project?</h2>
          <p className="font-display text-5xl uppercase leading-[1.05] text-brand md:text-[5.5rem]">Let’s talk.</p>
          <p className="mt-10 text-xl font-light leading-snug text-ink md:text-[1.9rem] md:leading-[1.45]">
            Bring me your idea
            <br /> and I’ll turn it into a real product.
          </p>
          <ul className="mt-10">
            {contactPointsFor(profile).map((p) => {
            const Icon = iconMap[p.icon];
            const body = <>
                  <Icon className="h-8 w-8 shrink-0 text-brand" />
                  {p.text}
                </>;
            return <li key={p.text} className="border-b border-black/10 py-6 text-lg text-ink last:border-b-0 md:text-[1.6rem]">
                  {p.href ?
              <a href={safeUrl(p.href)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 break-all transition-colors duration-150 hover:text-brand">{body}</a> :
              <span className="flex items-center gap-6">{body}</span>}
                </li>;
          })}
          </ul>
          <div className="mt-10">
            <CutButton href={`mailto:${profile.email}`} size="lg">Get in touch</CutButton>
          </div>
        </div>
      </div>
    </section>;
}
