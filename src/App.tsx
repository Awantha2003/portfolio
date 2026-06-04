import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import AdminSection from './components/AdminSection';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import ParticleBackground from './components/ui/ParticleBackground';
import WhatsAppButton from './components/WhatsAppButton';
export function App() {
  const [scrollY, setScrollY] = useState(0);
  const isAdminPage = window.location.pathname === '/admin';

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
      <WhatsAppButton />
      <Header scrollY={scrollY} />
      {isAdminPage ? <main className="pt-20">
          <AdminSection />
        </main> : <main>
          <Hero />
          <About />
          <Resume />
          <Projects />
          <Skills />
          <Contact />
        </main>}
      <Footer />
    </div>;
}
