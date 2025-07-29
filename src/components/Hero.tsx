import React, { useEffect, useState, useRef } from 'react';
import Button from './ui/Button';
import TypewriterText from './ui/TypewriterText';
import FloatingTag from './ui/FloatingTag';
import { ArrowRightIcon, MailIcon, ChevronDownIcon } from 'lucide-react';
const Hero: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      // Subtle parallax effect
      blobRef.current.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
      // 3D tilt effect for profile image
      if (imageContainerRef.current) {
        const rotateX = (y - 0.5) * 10; // -5 to 5 degrees
        const rotateY = (0.5 - x) * 10; // -5 to 5 degrees
        imageContainerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // Function to scroll to About section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="relative min-h-screen w-full flex items-center justify-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1),transparent_70%)]"></div>
      <div ref={blobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[80px] opacity-70 transition-transform duration-300"></div>
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
            Hi, I'm{' '}
            <TypewriterText text="AWANTHA IMESH" className="text-orange-500" />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 animate-fade-in">
            Full Stack Developer & UI/UX Engineer
          </p>
          {/* Floating tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FloatingTag delay={200}>React</FloatingTag>
            <FloatingTag delay={400}>Spring Boot</FloatingTag>
            <FloatingTag delay={600}>MongoDB</FloatingTag>
            <FloatingTag delay={800}>TailwindCSS</FloatingTag>
          </div>
          {/* Profile image with 3D effect */}
          <div className="relative mb-12 group" ref={imageContainerRef} style={{
          transition: 'transform 0.3s ease-out'
        }}>
            {/* Animated glow rings */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-orange-500/10" style={{
            animationDuration: '3s'
          }}></div>
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-orange-500/10" style={{
            animationDuration: '4s',
            animationDelay: '1s'
          }}></div>
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-orange-500/50 p-1">
              <img src="/my2.jpg" alt="Awantha Imesh" className="w-full h-full object-cover rounded-full" />
            </div>
            {/* Orbital circles */}
            <div className="absolute inset-[-20px] rounded-full border border-orange-500/20 animate-spin" style={{
            animationDuration: '15s'
          }}></div>
            <div className="absolute inset-[-40px] rounded-full border border-orange-500/10 animate-spin" style={{
            animationDuration: '20s',
            animationDirection: 'reverse'
          }}></div>
          </div>
          {/* CTA buttons with hover effects */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#projects" icon={<ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />} className="group overflow-hidden relative before:absolute before:inset-0 before:bg-orange-500/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500">
              See My Work
            </Button>
            <Button variant="secondary" href="#contact" icon={<MailIcon size={16} className="group-hover:scale-110 transition-transform" />} className="group">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      {/* Enhanced Scroll Button - dark mode only */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button onClick={scrollToAbout} className="flex flex-col items-center group cursor-pointer transition-all duration-500 p-3 rounded-2xl bg-black/30 hover:bg-black/50" aria-label="Scroll to About section">
          <span className="text-sm font-medium mb-1 transition-colors text-gray-300 group-hover:text-orange-500">
            Discover More
          </span>
          <div className="relative w-10 h-16 rounded-full flex justify-center items-start p-1 transition-all duration-500 bg-black/30 border-2 border-orange-500/50 group-hover:border-orange-500">
            <div className="w-3 h-3 rounded-full animate-bounce mt-2 bg-orange-500"></div>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <ChevronDownIcon className="animate-bounce text-orange-500" size={20} />
            <ChevronDownIcon className="animate-bounce animation-delay-500 text-orange-400 opacity-60" size={16} style={{
            animationDelay: '0.2s'
          }} />
          </div>
          {/* Animated pulse effect */}
          <div className="absolute inset-0 rounded-2xl bg-orange-500/20 animate-ping opacity-30" style={{
          animationDuration: '3s'
        }}></div>
        </button>
      </div>
    </section>;
};
export default Hero;