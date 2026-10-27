import React, { useRef } from 'react';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { BrandStrip } from './components/BrandStrip';
import { Audience } from './components/Audience';
import { Story } from './components/Story';
import { Startup } from './components/Startup';
import { BattleLogs } from './components/BattleLogs';
import { Building } from './components/Building';
import { ContentOffers } from './components/ContentOffers';
import { HowItsDone } from './components/HowItsDone';
import { MicSection } from './components/MicSection';
import { ListPodcast } from './components/ListPodcast';
import { Footer } from './components/Footer';
import { useReveal } from './hooks/useReveal';

export function App() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root} className="w-full min-h-screen overflow-x-hidden bg-white">
      <SideNav />
      <main>
        <Hero />
        <BrandStrip />
        <Audience />
        <Story />
        <Startup />
        <BattleLogs />
        <Building />
        <ContentOffers />
        <HowItsDone />
        <MicSection />
        <ListPodcast />
      </main>
      <Footer />
    </div>);

}