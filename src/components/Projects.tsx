import React, { useEffect, useState, useRef } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  FigmaUrl?: string;
}
const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects: Project[] = [{
    id: 1,
    title: ' Medi Track ',
    description: 'A web-based pharmacy management app that automates inventory, orders, deliveries, and prescriptions. Features real-time stock tracking, geolocation, and AI-based chat. Built with MERN stack using Agile methods and CI/CD.',
    image: "/Medi.png",
    category: ['Web Apps', 'UI/UX'],
    stack: ['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Restful API'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-07-04_220832_xkmlk4&profile=cld-default',
    githubUrl: 'https://github.com/Hirunikathaluwage/MediTrack.git'
  }, {
    id: 2,
    title: 'Figma UI',
    description: 'Admin dashboard for managing products, orders, and customer data.',
    image: "/Fg1.png",
    category: [ 'UI/UX'],
    stack: ['Figma', 'photoType', 'Figma Plugin'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2024-08-03_004240_k4mocv&profile=cld-default',
    FigmaUrl: 'https://www.figma.com/proto/mMab43Wu8UJqqgErGqfT8C/Untitled?node-id=30-299&starting-point-node-id=19%3A9&t=anBob0sS6QKTo8DM-1'
  }, {
    id: 3,
    title: 'Finance Tracking App',
    description: 'A cross-platform mobile app for managing personal finances and budgets.',
    image: "/financeApp.png",
    category: ['Mobile'],
    stack: ['Kotlin', 'XML', 'Firebase'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-06-16_212651_n7qfga&profile=cld-default',
    githubUrl: '#'
  }, {
    id: 4,
    title: 'Sri Lanka Journey',
    description: 'An intelligent travel planner that auto-generates personalized Sri Lanka itineraries based on user-selected categories like beaches or cool climates. Uses AI and public APIs to suggest places, estimate costs, and plan daily routes. Future-ready with support for natural-language trip requests.',
    image: "/SL.jpeg",
    category: ['Web Apps'],
    stack: ['React', 'WebSockets', 'Node.js', 'MongoDB', 'TailwindCSS', '(MERN Stack)'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-06-08_014939_f3u8wm&profile=cld-default',
    githubUrl: 'https://github.com/Awantha2003/sri-lanka-journey.git',
  }, {
    id: 5,
    title: 'Fashion Design app',
    description: 'Comprehensive design system with reusable components and guidelines.',
    image: "/FashionFigma.png",
    category: ['Web Apps','UI/UX'],
    stack: ['React', 'TailwindCSS', 'UI/UX', 'UI principles','3D Design'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-06-15_020101_x87fhh&profile=cld-default',
    FigmaUrl: 'https://www.figma.com/proto/6ykhLKbYVjwnkuJx9EnC0s/fashion?node-id=2051-838&starting-point-node-id=2001%3A2&t=RebRedW1tcoiJYiv-1'
  },{
    id: 6,
    title: 'WOLFENOX Software Company',
    description: 'A comprehensive design system for a software company, including UI components, typography, and color schemes.',
    image: "/mycom2.png",
    category: ['UI/UX'],
    stack: ['React', '3D Design', 'Api', 'Real world project'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Recording_2025-07-29_140216_f5qcb4&profile=cld-default',
    
  },{
    id: 6,
    title: 'wordpreess',
    description: 'my wordpreess protfolio  ',
    image: "/wordprees.png",
    category: ['UI/UX'],
    stack: ['wordpreess', 'elementor', 'wordpreess Plugin', 'TailwindCSS'],
    liveUrl: 'http://cskawanthaimesh.iceiy.com',

  },{
    id: 7,
    title: 'UI Web',
    description: ' VR box design system with components, typography, and color schemes.',
    image: "/Uiweb1.png",
    category: ['UI/UX'],
    stack: ['Figma', 'photoTyping', 'Figma Plugin', 'TailwindCSS'],
    liveUrl: 'https://www.figma.com/proto/l9BCwK3JfdcbV8QmEi38QI/Untitled?node-id=7-38&starting-point-node-id=7%3A38&scaling=scale-down-width&content-scaling=fixed&t=xEKp9qwMxv0cuqm0-1',

  },

  {
    id: 8,
    title: 'Movie App',
    description: 'Mobile app for tracking movies, reviews, and ratings.',
    image: "/MovieApp.png",
    category: ['Mobile'],
    stack: ['React Native', 'SQLite', 'TailwindCSS', 'Api' ,'react'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-07-25_125303_zzbrhs&profile=cld-default',
    githubUrl: 'https://github.com/Awantha2003/Movie_App.git'
  },{
    id: 9,
    title: 'Air Ticket Booking (HTML & PHP)',
    description: 'A web-based air ticket booking system with user authentication, flight search, and booking management.',
    image: "/Ui2.png",
    category: ['Web Apps', 'UI/UX'],
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-02-01_102019_rpsz3a&profile=cld-default',
   
  },{
    id: 10,
    title: 'Property Management System',
    description: 'A property listing platform built with Java, JSP, and MySQL. Supports full CRUD for land records, user management, and admin workflows. Follows MVC with Servlets and DAO pattern. Mobile-friendly UI using Bootstrap, ideal for property ads and transactions.',
    image: "/land.png",
    category: ['Web Apps'],
    stack: ['Java', 'CSS', 'JavaScript', 'bootstrap', 'MySQL'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2024-10-11_024830_erchxq&profile=cld-default',
   
  }, {
    id: 11,
    title: 'Pizza app Figma UI',
    description: 'A pizza delivery app UI designed in Figma, showcasing a modern and user-friendly interface.',
    image: "/Fg2.png",
    category: [ 'UI/UX'],
    stack: ['Figma', 'photoType', 'Figma Plugin'],
    liveUrl: 'https://www.figma.com/design/gFdsqPnECxksLgfsfhq5mY/Piza-app?node-id=0-1&t=bRlMVsoE03KDSUAC-1',

  },{
    id: 12,
    title: 'Mojo Web 3D',
    description: 'A 3D web application for showcasing properties in a virtual environment.',
    image: "/mojito.png",
    category: ['Web Apps'],
    stack: [ 'React', 'Node.js', 'JavaScript', 'Gsap'],
    liveUrl: 'https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=Screen_Recording_2025-07-30_171354_vlqon7&profile=cld-default',
   
  },];


  const categories = ['All', 'Web Apps', 'UI/UX', 'Mobile'];
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
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-2" />
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