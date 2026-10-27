import { CheckIcon, XIcon } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { safeUrl } from '../lib/safeUrl';

export function Audience() {
  const { whatIBuild, workWithMe } = useContent();
  return (
    <section className="w-full border-b border-black/5 bg-white">
      <div className="grid md:grid-cols-2">
        <div data-reveal className="flex justify-center px-6 py-20 md:justify-start md:py-32 md:pl-[6.5vw]">
          <div>
            <h2 className="flex items-center gap-5 font-display text-4xl uppercase text-ink md:text-5xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                <CheckIcon className="h-6 w-6" strokeWidth={3} />
              </span>
              Who I work with
            </h2>
            <ul className="mt-12 list-disc space-y-6 pl-9 text-2xl font-medium tracking-tight text-ink md:text-[2.2rem]">
              {whatIBuild.map((item) =>
              <li key={item}>{item}</li>
              )}
            </ul>
          </div>
        </div>
        <div data-reveal className="hatch flex justify-center px-6 py-20 md:justify-start md:py-32 md:pl-[6.5vw]">
          <div>
            <h2 className="flex items-center gap-5 font-display text-4xl uppercase text-ink md:text-5xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-white">
                <XIcon className="h-6 w-6" strokeWidth={3} />
              </span>
              Not for everyone
            </h2>
            <ul className="mt-12 list-disc space-y-8 pl-9 text-2xl font-medium tracking-tight text-ink md:text-[2.2rem]">
              {workWithMe.map((item) =>
              <li key={item.text} className="leading-snug">
                  {item.text}
                  <br />
                  <a
                  href={safeUrl(item.href)}
                  className={`underline underline-offset-4 transition-opacity duration-150 hover:opacity-70 ${item.tone === 'brand' ? 'text-brand' : 'font-bold text-ink'}`}>
                  
                    {item.link}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}