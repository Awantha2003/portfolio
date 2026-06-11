import React, { useEffect, useState, useRef } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { ADMIN_PROJECTS_EVENT, getAdminProjects } from '../utils/adminProjects';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [adminProjects, setAdminProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const syncAdminProjects = () => {
      setAdminProjects(getAdminProjects());
    };

    syncAdminProjects();
    window.addEventListener(ADMIN_PROJECTS_EVENT, syncAdminProjects);
    window.addEventListener('storage', syncAdminProjects);

    return () => {
      window.removeEventListener(ADMIN_PROJECTS_EVENT, syncAdminProjects);
      window.removeEventListener('storage', syncAdminProjects);
    };
  }, []);

  const defaultProjects: Project[] = [{
    id: 13,
    title: 'MacBook Online Store',
    description: 'Apple-inspired product showcase featuring interactive 3D MacBook visualization with Three.js, smooth scroll animations with GSAP, and elegant storytelling. Built with React and Tailwind CSS for a premium, responsive experience.',
    image: "/Mac.mp4",
    category: ['Web Apps'],
    stack: ['React', 'Three.js', 'GSAP', 'TailwindCSS', '3D Design'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Mac_Store_Demo&profile=cld-default',
    githubUrl: '#'
  },{
    id: 15,
    title: 'Apple iPhone 15 Pro Website',
    description: 'High-end product marketing website featuring realistic 3D iPhone models with React Three Fiber and Drei. Includes multi-color/size exploration, GSAP scroll animations, video carousel, and production-ready responsive design.',
    image: "/Iphon.mp4",
    category: ['Web Apps'],
    stack: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'Drei'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=iPhone_Demo&profile=cld-default',
    githubUrl: '#'
  },];

  const projects = [...adminProjects, ...defaultProjects];

  const categories = ['All', 'Web Apps', 'UI/UX', 'Mobile', 'Clients'];
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(project => project.category.includes(activeCategory));
  return <section id="projects" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.05),transparent_70%)]"></div>
      {/* Animated background elements */}
      <div className="absolute w-64 h-64 -top-32 -left-32 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{
      animationDuration: '10s'
    }}></div>
      <div className="absolute w-64 h-64 -bottom-32 -right-32 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{
      animationDuration: '15s',
      animationDelay: '2s'
    }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            My <span className="text-orange-500">Work</span>
          </h2>
          <p className="text-xl text-gray-300 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            Real Projects. Real Impact.
          </p>
        </div>
        {/* Category filter with animation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}>
          {categories.map((category, index) => <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${activeCategory === category ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/30 border-2 border-orange-500' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-transparent hover:border-gray-600'}`} style={{
          transitionDelay: `${index * 100}ms`
        }}>
              {category}
            </button>)}
        </div>
        
        {/* Show active filter count */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {activeCategory !== 'All' && <span className="text-orange-500"> in {activeCategory}</span>}
          </p>
        </div>
        {/* Projects grid with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 min-h-[400px]">
          {filteredProjects.map((project, index) => <div key={`${project.id}-${activeCategory}`} className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-500 project-card animate-fade-in-up" style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(10deg)',
          transition: `opacity 0.6s ease-out ${index * 150}ms, transform 0.6s ease-out ${index * 150}ms`,
          transformStyle: 'preserve-3d',
          animationDelay: `${index * 100}ms`
        }}>
              {/* Project image with parallax effect */}
              <div className="h-64 overflow-hidden">
                {project.image.endsWith('.mp4') ? (
                  <video 
                    src={project.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-2"
                  />
                ) : (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-2" />
                )}
                {/* Hover overlay with animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Project info */}
              <div className="p-6 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                {/* Tech stack with staggered animation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech, techIndex) => <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded transform transition-all duration-300 hover:scale-110 hover:bg-gray-700" style={{
                transitionDelay: `${techIndex * 50}ms`,
                transform: 'translateZ(10px)'
              }}>
                      {tech}
                    </span>)}
                </div>
                {/* Links with hover effects */}
                <div className="flex gap-4">
                  {project.liveUrl && <a href={project.liveUrl} className="flex items-center text-sm text-orange-500 hover:text-orange-400 transition-colors group">
                      <ExternalLinkIcon size={16} className="mr-1 group-hover:rotate-12 transition-transform" />
                      Live Demo
                    </a>}
                  {project.githubUrl && <a href={project.githubUrl} className="flex items-center text-sm text-gray-300 hover:text-white transition-colors group">
                      <GithubIcon size={16} className="mr-1 group-hover:rotate-12 transition-transform" />
                      GitHub
                    </a>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Projects;
