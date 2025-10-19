import React, { useEffect, useState, useRef } from 'react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  level: number; // 1-10
}
const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
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
  const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#61DAFB">
        <path d="M12 12.765c.976 0 1.765-.789 1.765-1.765s-.789-1.765-1.765-1.765-1.765.789-1.765 1.765.789 1.765 1.765 1.765z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6.5c-3.033 0-5.5 2.467-5.5 5.5s2.467 5.5 5.5 5.5 5.5-2.467 5.5-5.5-2.467-5.5-5.5-5.5zm0 9c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
        <path d="M12 4.5c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5zm0 13c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5z"/>
      </svg>
    ),
    category: 'Frontend',
    description: 'Building interactive UIs with React and React hooks',
    level: 9
  },   {
    name: 'TailwindCSS',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#06B6D4">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
    category: 'Frontend',
    description: 'Creating responsive designs with utility-first CSS',
    level: 8
  },   {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3178C6">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    category: 'Frontend',
    description: 'Type-safe JavaScript development',
    level: 8
  },   {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a6.03 6.03 0 0 0-.633.12c-.3.082-.559.22-.75.405a1.466 1.466 0 0 0-.375.6c-.05.18-.07.346-.07.548v20.84c0 .202.02.368.07.548.05.18.15.346.375.6.191.185.45.323.75.405.18.05.38.08.633.12.048.006.182.007.358.007s.31-.001.358-.007a6.03 6.03 0 0 0 .633-.12c.3-.082.559-.22.75-.405.225-.254.325-.42.375-.6.05-.18.07-.346.07-.548V1.58c0-.202-.02-.368-.07-.548a1.466 1.466 0 0 0-.375-.6A1.62 1.62 0 0 0 12.563.12a6.03 6.03 0 0 0-.633-.12A2.274 2.274 0 0 0 11.572 0zm5.568 3.127c.202 0 .368.02.548.07.18.05.346.15.6.375.185.191.323.45.405.75.05.18.08.38.12.633.006.048.007.182.007.358s-.001.31-.007.358a6.03 6.03 0 0 1-.12.633c-.082.3-.22.559-.405.75a1.466 1.466 0 0 1-.6.375c-.18.05-.38.08-.633.12-.048.006-.182.007-.358.007s-.31-.001-.358-.007a6.03 6.03 0 0 1-.633-.12c-.3-.082-.559-.22-.75-.405a1.466 1.466 0 0 1-.375-.6c-.05-.18-.08-.38-.12-.633-.006-.048-.007-.182-.007-.358s.001-.31.007-.358c.04-.253.07-.453.12-.633.082-.3.22-.559.405-.75.254-.225.42-.325.6-.375.18-.05.38-.08.633-.12.048-.006.182-.007.358-.007z"/>
      </svg>
    ),
    category: 'Frontend',
    description: 'Server-side rendering and static site generation',
    level: 7
  },
  // Backend
  {
    name: 'Java',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#ED8B00">
        <path d="M8.851 18.56c-.428 0-.805-.244-1.02-.608-.216-.363-.216-.808 0-1.171.215-.363.592-.608 1.02-.608s.805.245 1.02.608c.216.363.216.808 0 1.171-.215.364-.592.608-1.02.608zm6.176-.186c-.216.363-.593.608-1.02.608s-.805-.245-1.02-.608c-.216-.363-.216-.808 0-1.171.215-.363.592-.608 1.02-.608s.805.245 1.02.608c.216.363.216.808 0 1.171zm-5.354 1.108c-.428 0-.805-.245-1.02-.608-.216-.363-.216-.808 0-1.171.215-.363.592-.608 1.02-.608s.805.245 1.02.608c.216.363.216.808 0 1.171-.215.363-.592.608-1.02.608zm6.176-.186c-.216.363-.593.608-1.02.608s-.805-.245-1.02-.608c-.216-.363-.216-.808 0-1.171.215-.363.592-.608 1.02-.608s.805.245 1.02.608c.216.363.216.808 0 1.171z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
      </svg>
    ),
    category: 'Backend',
    description: 'Enterprise application development',
    level: 9
  },   {
    name: 'Spring Boot',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#6DB33F">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
        <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/>
      </svg>
    ),
    category: 'Backend',
    description: 'Building robust and scalable APIs',
    level: 8
  },   {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.728c-0.438-0.245-0.224-0.332-0.080-0.383 c0.585-0.203,0.703-0.250,1.328-0.564c0.065-0.033,0.151-0.033,0.216,0l2.256,1.303c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.045,0.134-0.135,0.134-0.232V6.921c0-0.097-0.053-0.187-0.134-0.232l-8.795-5.076c-0.082-0.045-0.197-0.045-0.272,0 L3.134,6.689C3.053,6.735,3,6.825,3,6.921v10.15c0,0.097,0.053,0.187,0.134,0.232l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89 V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.142,0,0.256,0.111,0.256,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745 c-0.508,0-0.909,0-2.026-0.551L2.28,17.961c-0.561-0.315-0.902-0.901-0.902-1.549V6.921c0-0.648,0.342-1.234,0.902-1.549 l8.795-5.076c0.561-0.315,1.287-0.315,1.848,0l8.795,5.076c0.561,0.315,0.902,0.901,0.902,1.549v10.15c0,0.648-0.342,1.234-0.902,1.549 l-8.795,5.076C12.639,23.916,12.319,24,11.998,24z"/>
        <path d="M17.146,8.272c-0.186,0-0.369,0.017-0.546,0.049c-0.177,0.033-0.343,0.081-0.498,0.144 c-0.155,0.063-0.299,0.141-0.432,0.234c-0.133,0.093-0.253,0.201-0.36,0.324c-0.107,0.123-0.201,0.261-0.282,0.414 c-0.081,0.153-0.149,0.321-0.204,0.504c-0.055,0.183-0.096,0.381-0.123,0.594c-0.027,0.213-0.041,0.441-0.041,0.684 s0.014,0.471,0.041,0.684c0.027,0.213,0.068,0.411,0.123,0.594c0.055,0.183,0.123,0.351,0.204,0.504 c0.081,0.153,0.175,0.291,0.282,0.414c0.107,0.123,0.227,0.231,0.36,0.324c0.133,0.093,0.277,0.171,0.432,0.234 c0.155,0.063,0.321,0.111,0.498,0.144c0.177,0.033,0.36,0.049,0.546,0.049c0.186,0,0.369-0.017,0.546-0.049 c0.177-0.033,0.343-0.081,0.498-0.144c0.155-0.063,0.299-0.141,0.432-0.234c0.133-0.093,0.253-0.201,0.36-0.324 c0.107-0.123,0.201-0.261,0.282-0.414c0.081-0.153,0.149-0.321,0.204-0.504c0.055-0.183,0.096-0.381,0.123-0.594 c0.027-0.213,0.041-0.441,0.041-0.684s-0.014-0.471-0.041-0.684c-0.027-0.213-0.068-0.411-0.123-0.594 c-0.055-0.183-0.123-0.351-0.204-0.504c-0.081-0.153-0.175-0.291-0.282-0.414c-0.107-0.123-0.227-0.231-0.36-0.324 c-0.133-0.093-0.277-0.171-0.432-0.234c-0.155-0.063-0.321-0.111-0.498-0.144C17.515,8.289,17.332,8.272,17.146,8.272z M17.146,10.891c-0.134,0-0.262,0.012-0.384,0.036c-0.122,0.024-0.237,0.058-0.345,0.102c-0.108,0.044-0.208,0.098-0.3,0.162 c-0.092,0.064-0.176,0.138-0.252,0.222c-0.076,0.084-0.144,0.177-0.204,0.279c-0.06,0.102-0.111,0.213-0.153,0.333 c-0.042,0.12-0.075,0.249-0.099,0.387c-0.024,0.138-0.036,0.285-0.036,0.441s0.012,0.303,0.036,0.441 c0.024,0.138,0.057,0.267,0.099,0.387c0.042,0.12,0.093,0.231,0.153,0.333c0.06,0.102,0.128,0.195,0.204,0.279 c0.076,0.084,0.16,0.158,0.252,0.222c0.092,0.064,0.192,0.118,0.3,0.162c0.108,0.044,0.223,0.078,0.345,0.102 c0.122,0.024,0.25,0.036,0.384,0.036s0.262-0.012,0.384-0.036c0.122-0.024,0.237-0.058,0.345-0.102 c0.108-0.044,0.208-0.098,0.3-0.162c0.092-0.064,0.176-0.138,0.252-0.222c0.076-0.084,0.144-0.177,0.204-0.279 c0.06-0.102,0.111-0.213,0.153-0.333c0.042-0.12,0.075-0.249,0.099-0.387c0.024-0.138,0.036-0.285,0.036-0.441 s-0.012-0.303-0.036-0.441c-0.024-0.138-0.057-0.267-0.099-0.387c-0.042-0.12-0.093-0.231-0.153-0.333 c-0.06-0.102-0.128-0.195-0.204-0.279c-0.076-0.084-0.16-0.158-0.252-0.222c-0.092-0.064-0.192-0.118-0.3-0.162 c-0.108-0.044-0.223-0.078-0.345-0.102C17.408,10.903,17.28,10.891,17.146,10.891z"/>
      </svg>
    ),
    category: 'Backend',
    description: 'JavaScript runtime for server-side applications',
    level: 7
  },   {
    name: 'Express',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957A6.272 6.272 0 01.002 11.576z"/>
      </svg>
    ),
    category: 'Backend',
    description: 'Fast, unopinionated web framework for Node.js',
    level: 7
  },
  // Database
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#47A248">
        <path d="M17.193 9.555c-1.491-1.324-2.205-2.384-2.205-4.29 0-1.553.524-2.8 1.491-3.66.968-.86 2.205-1.324 3.66-1.324 1.456 0 2.692.464 3.66 1.324.968.86 1.491 2.107 1.491 3.66 0 1.906-.714 2.966-2.205 4.29l-1.491 1.324-1.491-1.324z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
      </svg>
    ),
    category: 'Database',
    description: 'NoSQL database for modern applications',
    level: 8
  },   {
    name: 'MySQL',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#4479A1">
        <path d="M16.405 5.501c-.115 0-.219.014-.313.034v-.032h.014c.1.021.2.035.299.035.115 0 .219-.014.313-.034V5.47h-.014c-.1-.021-.2-.035-.299-.035zm-.313.034c.094.02.188.034.313.034.125 0 .219-.014.313-.034-.094-.02-.188-.034-.313-.034-.125 0-.219.014-.313.034zM6.735 5.501c-.115 0-.219.014-.313.034v-.032h.014c.1.021.2.035.299.035.115 0 .219-.014.313-.034V5.47h-.014c-.1-.021-.2-.035-.299-.035zm-.313.034c.094.02.188.034.313.034.125 0 .219-.014.313-.034-.094-.02-.188-.034-.313-.034-.125 0-.219.014-.313.034z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
      </svg>
    ),
    category: 'Database',
    description: 'Relational database management system',
    level: 9
  },   {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#336791">
        <path d="M23.111 4.5c-.3-.3-.7-.4-1.1-.4-.4 0-.8.1-1.1.4L12 13.5 3 4.5c-.3-.3-.7-.4-1.1-.4-.4 0-.8.1-1.1.4-.3.3-.4.7-.4 1.1s.1.8.4 1.1l10 10c.3.3.7.4 1.1.4.4 0 .8-.1 1.1-.4l10-10c.3-.3.4-.7.4-1.1s-.1-.8-.4-1.1z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
      </svg>
    ),
    category: 'Database',
    description: 'Advanced open source relational database',
    level: 7
  },
  // Tools
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F05032">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.218-.091-.423-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
      </svg>
    ),
    category: 'Tools',
    description: 'Version control and collaboration',
    level: 9
  },   {
    name: 'Docker',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM9.853 11.078h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H9.853a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM5.722 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.722a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM13.983 7.13h2.119a.186.186 0 00.186-.186V5.057a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM9.853 7.13h2.118a.186.186 0 00.186-.186V5.057a.186.186 0 00-.186-.186H9.853a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM5.722 7.13h2.119a.186.186 0 00.186-.186V5.057a.186.186 0 00-.186-.186H5.722a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM1.591 7.13h2.119a.186.186 0 00.186-.186V5.057a.186.186 0 00-.186-.186H1.591a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM9.853 3.182h2.118a.186.186 0 00.186-.185V1.11a.186.186 0 00-.186-.186H9.853a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM5.722 3.182h2.119a.186.186 0 00.186-.185V1.11a.186.186 0 00-.186-.186H5.722a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM1.591 3.182h2.119a.186.186 0 00.186-.185V1.11a.186.186 0 00-.186-.186H1.591a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185z"/>
        <path d="M23.763 8.703c-.065-.051-.152-.078-.24-.078h-2.388v1.887c0 .102-.084.185-.186.185h-2.119a.186.186 0 01-.186-.185V8.625h-2.388c-.088 0-.175.027-.24.078-.065.051-.102.12-.102.194v1.887c0 .102.084.185.186.185h2.118v1.887c0 .102.084.185.186.185h2.119c.102 0 .186-.083.186-.185v-1.887h2.118c.102 0 .186-.083.186-.185V8.897c0-.074-.037-.143-.102-.194z"/>
      </svg>
    ),
    category: 'Tools',
    description: 'Containerization for consistent deployments',
    level: 8
  },   {
    name: 'VS Code',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#007ACC">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.63.13l-9.71 7.89-3.97-2.8a1.324 1.324 0 0 0-1.17-.18.326.326 0 0 0-.2.33v13.97a.325.325 0 0 0 .2.33c.08.03.17.05.26.05.08 0 .16-.01.24-.04l3.97-2.8 9.71 7.89a1.492 1.492 0 0 0 .94.32c.08 0 .16-.01.24-.04.18-.07.3-.22.35-.4l4.94-20.27c.04-.18-.01-.38-.14-.52a.75.75 0 0 0-.58-.23zM14.56 15.53l-2.83-2.83 2.83-2.83a.75.75 0 0 0-1.06-1.06l-3.54 3.54a.75.75 0 0 0 0 1.06l3.54 3.54a.75.75 0 0 0 1.06-1.06z"/>
      </svg>
    ),
    category: 'Tools',
    description: 'Powerful code editor with extensions',
    level: 9
  },   {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F24E1E">
        <path d="M12 12c0-3.314-2.686-6-6-6S0 8.686 0 12s2.686 6 6 6 6-2.686 6-6zM6 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
        <path d="M18 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
        <path d="M18 12c0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6 6-2.686 6-6z"/>
      </svg>
    ),
    category: 'Tools',
    description: 'UI/UX design and prototyping',
    level: 8
  }];
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
  const filteredSkills = activeCategory === 'All' ? skills : skills.filter(skill => skill.category === activeCategory);
  const renderSkillCard = (skill: Skill, index: number) => {
    const delay = index * 100;
    const levelPercentage = `${skill.level * 10}%`;
    return <div key={skill.name} className="relative group" onMouseEnter={() => setHoveredSkill(skill.name)} onMouseLeave={() => setHoveredSkill(null)} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`
    }}>
        <div className="bg-gray-900/50 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
          <div className="flex items-center p-4">
            <div className="mr-3 flex items-center justify-center">
              {skill.icon}
            </div>
            <span className="font-medium">{skill.name}</span>
          </div>
          {/* Skill level visualization */}
          <div className="px-4 pb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Proficiency</span>
              <span>{skill.level}/10</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" style={{
              width: isVisible ? levelPercentage : '0%',
              transition: `width 1s ease-out ${delay + 200}ms`
            }}></div>
            </div>
          </div>
        </div>
        {/* Tooltip */}
        {hoveredSkill === skill.name && <div className="absolute bottom-full left-0 mb-2 w-full p-3 bg-gray-800 rounded-md shadow-lg text-sm z-10">
            <p>{skill.description}</p>
            <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-gray-800 transform rotate-45"></div>
          </div>}
      </div>;
  };
  return <section id="skills" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05),transparent_70%)]"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      {/* Floating code elements - decorative */}
      <div className="absolute top-20 left-10 text-orange-500/20 text-4xl font-mono hidden lg:block">{`{...}`}</div>
      <div className="absolute bottom-20 right-10 text-orange-500/20 text-4xl font-mono hidden lg:block">{`</>`}</div>
      <div className="absolute top-1/2 left-1/4 text-orange-500/10 text-6xl font-mono hidden lg:block rotate-12">{`()`}</div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech <span className="text-orange-500">Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My toolkit for creating powerful digital experiences
          </p>
        </div>
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              {category}
            </button>)}
        </div>
        {/* Hexagon pattern background - decorative */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {Array.from({
          length: 20
        }).map((_, i) => <div key={i} className="absolute w-16 h-16 border border-orange-500" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: 'rotate(45deg)',
          opacity: Math.random() * 0.5
        }}></div>)}
        </div>
        {/* Skills visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => renderSkillCard(skill, index))}
        </div>
        {/* Experience summary */}
        <div className="mt-16 bg-gray-900/30 border border-gray-800 rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Experience Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.filter(cat => cat !== 'All').map(category => {
            const categorySkills = skills.filter(skill => skill.category === category);
            const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
            return <div key={category} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        {/* Background circle */}
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2A2A2A" strokeWidth="2" />
                        {/* Progress circle */}
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray={`${avgLevel * 10}, 100`} className="transition-all duration-1000" style={{
                    strokeDasharray: isVisible ? `${avgLevel * 10}, 100` : '0, 100'
                  }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-semibold">
                          {Math.round(avgLevel * 10)}%
                        </span>
                      </div>
                    </div>
                    <h4 className="font-medium text-orange-500">{category}</h4>
                    <p className="text-sm text-gray-400">
                      {categorySkills.length} technologies
                    </p>
                  </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
};
export default Skills;