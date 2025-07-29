import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import ParticleBackground from './components/ui/ParticleBackground';
export function App() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div className="bg-black text-white min-h-screen w-full">
      <ParticleBackground />
      <ScrollProgress />
      <Header scrollY={scrollY} />
      <main>
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>;
}