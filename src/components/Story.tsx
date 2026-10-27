import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlobeIcon, RocketIcon, StoreIcon, TrophyIcon, UsersIcon, BoxIcon } from "lucide-react";
import { useContent } from '../content/ContentProvider';
import { CutButton } from "./CutButton";
const iconMap: Record<string, BoxIcon> = {
  store: StoreIcon,
  trophy: TrophyIcon,
  globe: GlobeIcon,
  users: UsersIcon,
  rocket: RocketIcon
};
function JourneyCard() {
  const { education, experience, images, profile, startup } = useContent();
  const vital = (label: string) => startup.vitals.find((v) => v.label === label)?.value;
  const journey = [
  ...experience.filter((e) => e.highlights?.length).map((e) => ({
    label: 'Work experience',
    title: e.position,
    place: e.company,
    meta: [e.period, e.location].filter(Boolean).join(' · ')
  })),
  {
    label: 'My startup',
    title: vital('My role') ?? 'Founder',
    place: startup.name,
    meta: [vital('Started') && `Since ${vital('Started')}`, vital('Based in')].filter(Boolean).join(' · ')
  },
  ...education.map((e) => ({ label: 'Education', title: e.degree, place: e.institution, meta: `${e.period} · ${e.status}` }))];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = journey[index % journey.length];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % journey.length), 4000);
    return () => clearTimeout(t);
  }, [index, paused]);

  return <figure data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-16 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)] ring-1 ring-black/5 md:grid md:grid-cols-[0.8fr_1fr]">
      <img src={images.profile} alt={profile.name} className="aspect-[3/4] w-full object-cover" />
      <figcaption className="relative flex min-h-[320px] flex-col justify-center px-6 py-10 md:px-12" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>

            <span className="inline-block rounded-lg bg-lime px-3 py-1 text-sm font-bold uppercase tracking-[0.15em] text-ink">{slide.label}</span>
            <p className="mt-6 font-display text-2xl uppercase leading-tight tracking-wide text-ink md:text-4xl">{slide.title}</p>
            <p className="mt-4 font-display text-2xl uppercase leading-tight tracking-wide text-brand md:text-4xl">{slide.place}</p>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-black/55 md:text-2xl">{slide.meta}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex gap-2">
          {journey.map((s, i) =>
        <button
          key={s.title}
          onClick={() => setIndex(i)}
          aria-label={`Show ${s.title}`}
          aria-current={i === index ? 'true' : undefined}
          className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${i === index ? 'w-10 bg-brand' : 'w-2.5 bg-black/15 hover:bg-black/30'}`} />
        )}
        </div>
      </figcaption>
    </figure>;
}

const bodyText ='text-2xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-[2.5rem] md:leading-[1.2]';
export function Story() {
  const { profile, stats, story, thenCameTags } = useContent();
  return <section id="about" className="w-full bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1350px] px-6 lg:pr-56">
        <div data-reveal className="space-y-4">
          {story.kicker.map((line, i) =>
          <p key={i} className={`text-3xl font-bold uppercase tracking-[-0.03em] md:text-[2.6rem] ${i % 2 ? 'text-brand' : 'text-ink'}`}>{line}</p>
          )}
        </div>

        <p data-reveal className="mt-12">
          <mark data-highlight className="hl rounded-lg px-4 py-1 text-3xl font-bold tracking-[-0.03em] text-ink md:text-[2.6rem]">
            I’m {profile.firstName}.
          </mark>
        </p>

        <div data-stagger className={`mt-14 space-y-12 md:space-y-16 ${bodyText}`}>
          {story.lines.map((line, i) => <p key={i}>{line}</p>)}
        </div>

        <div data-reveal className="stripes mt-16 rounded-[28px] p-8 text-white md:p-12">
          <p className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-5xl">
            From a <span className="text-lime">{story.statsLead}</span> to:
          </p>
          <ul className="mt-10 space-y-6 text-xl font-medium md:text-3xl">
            {stats.map((m) => {
            const Icon = iconMap[m.icon];
            return <li key={m.text} className="flex items-center gap-5">
                  <Icon className="h-7 w-7 shrink-0 text-brand" />
                  <span className={m.highlight ? 'font-bold uppercase text-brand' : 'text-white'}>{m.text}</span>
                </li>;
          })}
          </ul>
        </div>

        <JourneyCard />

        <p data-reveal className={`mt-16 ${bodyText}`}>Then came:</p>
        <ul data-stagger className="mt-6 flex flex-wrap gap-3">
          {thenCameTags.map((t) => <li key={t} className="rounded-lg bg-lime px-5 py-2 text-lg font-bold tracking-tight text-ink md:text-2xl">{t}</li>)}
        </ul>

        <div data-stagger className={`mt-14 space-y-12 md:space-y-16 ${bodyText}`}>
          {story.today.map((line, i) => <p key={i}>{line}</p>)}
        </div>

        <div data-reveal className="mt-16 flex flex-wrap gap-4">
          <CutButton href="#projects" size="lg">See my work</CutButton>
          <CutButton href={profile.resumeUrl} size="lg">Download CV</CutButton>
        </div>
      </div>
    </section>;
}
