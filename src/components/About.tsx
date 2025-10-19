import React, { useEffect, useRef } from 'react';
import { GraduationCapIcon, BriefcaseIcon, TargetIcon, DownloadIcon } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';
import Button from './ui/Button';
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
    const childElements = sectionRef.current?.querySelectorAll('.reveal-element');
    childElements?.forEach((el, index) => {
      el.classList.add('opacity-0');
      // Add staggered delay
      const delay = 100 + index * 150;
      (el as HTMLElement).style.transitionDelay = `${delay}ms`;
      observer.observe(el);
    });
    return () => {
      childElements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  return <section id="about" ref={sectionRef} className="py-24 bg-black relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.1),transparent_70%)]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_bottom_left,rgba(255,107,0,0.1),transparent_70%)]"></div>
      {/* Animated background shapes */}
      <div className="absolute left-[10%] top-[20%] w-16 h-16 border border-orange-500/20 rotate-45 animate-spin" style={{
      animationDuration: '15s'
    }}></div>
      <div className="absolute right-[15%] bottom-[30%] w-20 h-20 border border-orange-500/10 rounded-full animate-spin" style={{
      animationDuration: '20s'
    }}></div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center reveal-element">
          About <span className="text-orange-500">Me</span>
        </h2>
        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 reveal-element">
          <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <AnimatedCounter end={3} suffix="+" className="text-4xl font-bold text-orange-500" />
            <p className="text-gray-300 mt-2">Learning Experience</p>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <AnimatedCounter end={20} suffix="+" className="text-4xl font-bold text-orange-500" />
            <p className="text-gray-300 mt-2">Projects Completed</p>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <AnimatedCounter end={15} className="text-4xl font-bold text-orange-500" />
            <p className="text-gray-300 mt-2">Happy Clients</p>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <AnimatedCounter end={99} suffix="%" className="text-4xl font-bold text-orange-500" />
            <p className="text-gray-300 mt-2">Client Satisfaction</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column: Text */}
          <div className="reveal-element" style={{
          transitionDelay: '200ms'
        }}>
            <p className="text-lg text-gray-300 mb-8">
              I'm Awantha, a passionate developer who builds full-stack web apps
              and beautiful UI/UX experiences. From AI marketplaces to mobile
              apps, I love building systems that solve real-world problems.
            </p>
            
            {/* Download CV Button */}
            <div className="mb-8 reveal-element">
              <Button 
                href="https://drive.google.com/uc?export=download&id=1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/30"
                icon={<DownloadIcon size={16} className="group-hover:translate-y-1 transition-transform" />}
              >
                Download My CV
              </Button>
            </div>
            <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/40 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mr-4 group">
                  <GraduationCapIcon size={24} className="text-orange-500 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Education</h3>
                  <p className="text-gray-400">Bachelor’s Degree in Software Engineering  (SLIIT) (UG)</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mr-4 group">
                  <BriefcaseIcon size={24} className="text-orange-500 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Experience</h3>
                  <p className="text-gray-400">
                    Worked on real-world full-stack projects
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mr-4 group">
                  <TargetIcon size={24} className="text-orange-500 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Values</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-orange-500/20 rounded text-sm hover:bg-orange-500/30 transition-colors">
                      Agile
                    </span>
                    <span className="px-2 py-1 bg-orange-500/20 rounded text-sm hover:bg-orange-500/30 transition-colors">
                      Clean Code
                    </span>
                    <span className="px-2 py-1 bg-orange-500/20 rounded text-sm hover:bg-orange-500/30 transition-colors">
                      AI Integration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right column: Timeline */}
          <div className="reveal-element" style={{
          transitionDelay: '400ms'
        }}>
            <div className="relative border-l-2 border-orange-500/30 pl-8">
              {/* Timeline items */}
              <div className="mb-12 relative timeline-item">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-orange-500"></div>
                <div className="absolute -left-[14px] w-7 h-7 rounded-full bg-orange-500/30 animate-ping"></div>
                <h3 className="text-xl font-semibold mb-1">
                   Full Stack Developer
                </h3>
                <p className="text-orange-500 mb-2">Mobile App Development</p>
                <p className="text-gray-300">
                  Leading development of enterprise web applications with React
                  and Mern stack
                </p>
                {/* Timeline connector with animation */}
                <div className="absolute left-[-9px] top-[30px] h-[calc(100%-10px)] w-1 bg-gradient-to-b from-orange-500/50 to-transparent timeline-connector"></div>
              </div>
              <div className="mb-12 relative timeline-item">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-orange-500/70"></div>
                <h3 className="text-xl font-semibold mb-1">UI/UX Engineer</h3>
                <p className="text-orange-500 mb-2">Figma and Adobe XD</p>
                <p className="text-gray-300">
                  Designed and implemented user interfaces for mobile and web
                  applications.
                </p>
                {/* Timeline connector with animation */}
                <div className="absolute left-[-9px] top-[30px] h-[calc(100%-10px)] w-1 bg-gradient-to-b from-orange-500/30 to-transparent timeline-connector"></div>
              </div>
              <div className="relative timeline-item">
                <div className="absolute -left-10 w-5 h-5 rounded-full bg-orange-500/50"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Frontend Developer
                </h3>
                <p className="text-orange-500 mb-2">React and react native</p>
                <p className="text-gray-300">
                  Developed responsive web applications using React and modern
                  JavaScript.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About