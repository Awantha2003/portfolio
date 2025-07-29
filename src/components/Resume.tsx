import React, { useRef, useEffect, useState } from 'react';
import { DownloadIcon, ExternalLinkIcon, FileTextIcon, AwardIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import Button from './ui/Button';

const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const education = [
    {
      degree: "Bachelor's Degree in Software Engineering",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      period: "2021 - Present",
      status: "Undergraduate",
      icon: <GraduationCapIcon size={24} className="text-orange-500" />
    }
  ];

  const experience = [
    {
      position: "Full Stack Developer",
      company: "Mobile App Development",
      period: "2025 - Present",
      description: "Leading development of enterprise web applications with React and MERN stack",
      icon: <BriefcaseIcon size={24} className="text-orange-500" />
    },
    {
      position: "UI/UX Engineer",
      company: "Figma and Adobe XD",
      period: "2025",
      description: "Designed and implemented user interfaces for mobile and web applications",
      icon: <BriefcaseIcon size={24} className="text-orange-500" />
    },
    {
      position: "Frontend Developer",
      company: "React and React Native",
      period: "2025",
      description: "Developed responsive web applications using React and modern JavaScript",
      icon: <BriefcaseIcon size={24} className="text-orange-500" />
    }
  ];

  const certifications = [
    {
      name: "Machine Learning Operations (MLOps) for Generative AI",
      issuer: "Google Cloud Skills Boost",
      year: "2024",
      url: "https://www.cloudskillsboost.google/public_profiles/0781d0ff-b1f8-469c-9590-caa6429ca24f/badges/13505552?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      icon: <AwardIcon size={20} className="text-orange-500" />
    },
    {
      name: "Introduction to Generative AI",
      issuer: "Google Cloud Skills Boost",
      year: "2024",
      icon: <AwardIcon size={20} className="text-orange-500" />
    },
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      year: "2024",
      url: "https://learn.microsoft.com/en-gb/users/awanthaimesh-3164/achievements/uxs9zf63?ref=https%3A%2F%2Fwww.linkedin.com%2F",
      icon: <AwardIcon size={20} className="text-orange-500" />
    },
    {
      name: "Full Stack Web Development",
      issuer: "React, Node.js, MongoDB",
      year: "2024",
      icon: <AwardIcon size={20} className="text-orange-500" />
    },
    {
      name: "UI/UX Design",
      issuer: "Figma, Adobe XD",
      year: "2024",
      icon: <AwardIcon size={20} className="text-orange-500" />
    },
    {
      name: "Mobile App Development",
      issuer: "React Native, Kotlin",
      year: "2024",
      icon: <AwardIcon size={20} className="text-orange-500" />
    }
  ];

  return (
    <section id="resume" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05),transparent_70%)]"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-orange-500/20 text-4xl font-mono hidden lg:block">{`{ }`}</div>
      <div className="absolute bottom-20 right-10 text-orange-500/20 text-4xl font-mono hidden lg:block">{`</>`}</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-orange-500">Resume</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Professional journey and achievements
          </p>
          
          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="https://drive.google.com/uc?export=download&id=1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/30"
              icon={<DownloadIcon size={16} className="group-hover:translate-y-1 transition-transform" />}
            >
              Download CV (PDF)
            </Button>
            <Button 
              variant="secondary"
              href="https://drive.google.com/file/d/1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg/view?usp=sharing"
              className="group"
              icon={<ExternalLinkIcon size={16} className="group-hover:translate-x-1 transition-transform" />}
            >
              View Online
            </Button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Education & Experience */}
          <div 
            className="space-y-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            {/* Education */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-orange-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GraduationCapIcon size={28} className="text-orange-500 mr-3" />
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-orange-500/30 pl-6 relative">
                  <div className="absolute -left-3 top-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <h4 className="text-lg font-medium text-orange-500">{edu.degree}</h4>
                  <p className="text-gray-300 font-medium">{edu.institution}</p>
                  <p className="text-gray-400 text-sm">{edu.period} • {edu.status}</p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-orange-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <BriefcaseIcon size={28} className="text-orange-500 mr-3" />
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-orange-500/30 pl-6 relative">
                    <div className="absolute -left-3 top-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <h4 className="text-lg font-medium text-orange-500">{exp.position}</h4>
                    <p className="text-gray-300 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Certifications */}
          <div 
            className="space-y-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
            }}
          >
            {/* Key Skills */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-orange-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <FileTextIcon size={28} className="text-orange-500 mr-3" />
                Key Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['React', 'Node.js', 'Java', 'Spring Boot', 'MongoDB', 'MySQL', 'TailwindCSS', 'Figma', 'Git', 'Docker', 'TypeScript', 'React Native'].map((skill, index) => (
                  <div 
                    key={skill} 
                    className="flex items-center p-2 bg-gray-800/50 rounded hover:bg-orange-500/20 transition-colors duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-300 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-orange-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <AwardIcon size={28} className="text-orange-500 mr-3" />
                Certifications & Expertise
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                    <div className="mr-3 mt-1">{cert.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-200">{cert.name}</h4>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-orange-500 text-xs">{cert.year}</p>
                        {(cert as any).url && (
                          <a 
                            href={(cert as any).url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-orange-500 hover:text-orange-400 transition-colors flex items-center"
                          >
                            <ExternalLinkIcon size={12} className="mr-1" />
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-orange-500/40 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">📧 awanthaimesh65@gmail.com</p>
                <p className="text-gray-300">📍 Colombo, Sri Lanka</p>
                <p className="text-gray-300">🔗 <a href="https://www.linkedin.com/in/awanthaimesh/" className="text-orange-500 hover:underline">LinkedIn Profile</a></p>
                <p className="text-gray-300">💻 <a href="https://github.com/Awantha2003" className="text-orange-500 hover:underline">GitHub Profile</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-orange-500/30">
          <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-gray-300 mb-6">Let's discuss how I can contribute to your next project</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact" className="group">
              Get In Touch
            </Button>
            <Button 
              variant="secondary"
              href="https://drive.google.com/uc?export=download&id=1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg"
              icon={<DownloadIcon size={16} />}
            >
              Download Full CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
