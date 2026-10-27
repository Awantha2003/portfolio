export const images = {
  heroBg: "https://res.cloudinary.com/dyy73d8ko/video/upload/so_4.6,f_auto,q_auto/v1793082198/portfolio/site/showreel-awantha.jpg",
  heroPortrait: "https://res.cloudinary.com/dyy73d8ko/video/upload/so_4.6,f_auto,q_auto/v1793082198/portfolio/site/showreel-awantha.jpg",
  profile: "https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078350/portfolio/site/my2.jpg",
  podcast: "https://res.cloudinary.com/dyy73d8ko/video/upload/so_10.5,f_auto,q_auto/v1793082198/portfolio/site/showreel-awantha.jpg",
  devices: "https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078013/portfolio/site/d422dfa3-be8b-4c5d-b083-fafcb9a50f47.jpg",
  showreel: "https://res.cloudinary.com/dyy73d8ko/video/upload/q_auto/v1793082198/portfolio/site/showreel-awantha.mp4"
};

export const profile = {
  name: 'Awantha Imesh',
  firstName: 'Awantha',
  role: 'Full Stack Developer & UI/UX Engineer',
  bio: 'I’m Awantha, a passionate developer who builds full-stack web apps and beautiful UI/UX experiences. From AI marketplaces to mobile apps, I love building systems that solve real-world problems.',
  email: 'awanthaimesh65@gmail.com',
  location: 'Colombo, Sri Lanka',
  github: 'https://github.com/Awantha2003',
  linkedin: 'https://www.linkedin.com/in/awanthaimesh/',
  resumeUrl: 'https://drive.google.com/file/d/1JDSuUqmps-n5u1sTRPNY3oY6utP3ovMX/view?usp=sharing'
};

export const navItems = [
{ id: 'home', label: 'Home' },
{ id: 'about', label: 'About' },
{ id: 'startup', label: 'Startup' },
{ id: 'projects', label: 'Projects' },
{ id: 'services', label: 'Services' },
{ id: 'experience', label: 'Experience' },
{ id: 'contact', label: 'Contact' }];


export const ghostWords = ['design it', 'build it', 'test it', 'ship it'];

export const hero = {
  lines: [
  { text: 'SKETCHED IN', accent: 'FIGMA' },
  { text: 'FORGED IN', accent: 'CODE' },
  { text: 'SHIPPED ACROSS', accent: 'BORDERS' }],

  subtitle: ['This is my build log.', 'You’re here for real code, real products, and real results.']
};

export const story = {
  kicker: ['No shortcuts.', 'Just code and deadlines.'],
  lines: ['IT student at SLIIT.', 'First client: Nature Pulse.', 'Interned at Sri Lanka Tourism.', 'Founded WOLFENOX.', 'Now coding for a US client.'],
  statsLead: 'WordPress portfolio',
  today: ['Today, I build for clients in 3 countries.', 'Not because I’m special.', 'Because I kept shipping.', 'Now, it’s all here.']
};

export const techStack = [
{ name: 'React', className: 'font-display text-sky-500 tracking-wide' },
{ name: 'SPRING BOOT', className: 'font-display text-green-600 leading-none' },
{ name: 'MongoDB', className: 'font-black italic tracking-tighter text-green-700' },
{ name: 'Node.js', className: 'font-extrabold text-lime-700' },
{ name: 'TypeScript', className: 'font-black tracking-tight text-blue-600' },
{ name: 'TAILWIND', className: 'font-display text-cyan-500' },
{ name: 'Figma', className: 'font-display italic text-brand -rotate-3' },
{ name: 'DOCKER', className: 'font-black italic tracking-tight text-blue-500' },
{ name: 'Java', className: 'font-display text-red-600' }];


export const whatIBuild = [
'Founders with a real idea.',
'Businesses that need a real product.',
'Teams that want clean code.',
'Anyone tired of templates that break.'];


export const workWithMe = [
{ text: 'Looking for a quick copy-paste site?', link: 'This isn’t for you.', tone: 'brand' as const, href: '#services' },
{ text: 'Want something that lasts?', link: 'Let’s build it.', tone: 'ink' as const, href: '#contact' }];


export const stats = [
{ icon: 'rocket', text: 'Founder of WOLFENOX', highlight: true as boolean | undefined },
{ icon: 'globe', text: 'Software Engineer for a US client' },
{ icon: 'trophy', text: 'Software Engineering Intern at SLTDA' },
{ icon: 'store', text: '20+ projects completed' },
{ icon: 'users', text: 'Clients in Sri Lanka, India & the USA' }];


export const thenCameTags = ['Client deadlines', 'Payment gateways', 'NGINX servers', 'SEO audits', 'University exams', 'Endless debugging'];

export const education = [
{
  degree: 'BSc (Hons) in Information Technology',
  institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
  period: '2023 - 2027',
  status: 'Undergraduate'
}];


type Experience = {
  position: string;
  company: string;
  period: string;
  description: string;
  initials: string;
  location?: string;
  highlights?: string[];
};

export const experience: Experience[] = [
{
  position: 'Software Engineer (Contract)',
  company: 'Preethi Fernando',
  location: 'Remote, USA',
  period: 'Oct 2026 – Present',
  description: 'Building and growing the company website and a new AI automation startup for small businesses with a US client.',
  initials: 'PF',
  highlights: [
  'Developed and maintained the company website, improving UI/UX',
  'Performed SEO audits and implemented on-page and technical SEO',
  'Built an SEO-focused Articles section with AI-assisted content',
  'Debugged and fixed issues to improve site reliability and UX',
  'Collaborated remotely with a US client on website growth plans',
  'Helped grow a new AI automation tech startup for small businesses']
},
{
  position: 'Software Engineering Intern',
  company: 'Sri Lanka Tourism Development Authority (SLTDA)',
  location: 'Colombo, Sri Lanka',
  period: 'Internship',
  description: 'Developed, maintained and deployed public-facing and internal software systems.',
  initials: 'SL',
  highlights: [
  'Maintained and redeveloped the Sri Lanka Travel website, improving usability, visual consistency and UI/UX',
  'Worked on internal systems such as the Tour Guide ID Card Management System',
  'Implemented the LGPS Payment Gateway for the Renewal ID Card System — secure online payments, transaction verification and payment status updates',
  'Performed QA testing, debugging and system improvements',
  'Handled deployment and hosting with WinSCP and NGINX, including server file management and web server configuration',
  'Developed a Tourist Guide Incident Management System so police can report illegal tourist guides directly to SLTDA']
},
{
  position: 'Full Stack Developer',
  company: 'Mobile App Development',
  period: '2025 - Present',
  description: 'Leading development of enterprise web applications with React and MERN stack.',
  initials: 'FS'
},
{
  position: 'UI/UX Engineer',
  company: 'Figma and Adobe XD',
  period: '2025',
  description: 'Designed and implemented user interfaces for mobile and web applications.',
  initials: 'UX'
},
{
  position: 'Frontend Developer',
  company: 'React and React Native',
  period: '2025',
  description: 'Developed responsive web applications using React and modern JavaScript.',
  initials: 'FE'
}];


export const certifications = [
{
  name: 'Machine Learning Operations (MLOps) for Generative AI',
  issuer: 'Google Cloud Skills Boost',
  year: '2024',
  url: 'https://www.cloudskillsboost.google/public_profiles/0781d0ff-b1f8-469c-9590-caa6429ca24f/badges/13505552'
},
{ name: 'Introduction to Generative AI', issuer: 'Google Cloud Skills Boost', year: '2024' },
{
  name: 'Microsoft Azure Fundamentals',
  issuer: 'Microsoft',
  year: '2024',
  url: 'https://learn.microsoft.com/en-gb/users/awanthaimesh-3164/achievements/uxs9zf63'
},
{ name: 'Full Stack Web Development', issuer: 'React, Node.js, MongoDB', year: '2024' },
{ name: 'UI/UX Design', issuer: 'Figma, Adobe XD', year: '2024' },
{ name: 'Mobile App Development', issuer: 'React Native, Kotlin', year: '2024' }];


export const keySkills = ['React', 'Node.js', 'Java', 'Spring Boot', 'MongoDB', 'MySQL', 'TailwindCSS', 'Figma', 'Git', 'Docker', 'TypeScript', 'React Native'];

export const skillGroups = [
{ category: 'Frontend', skills: ['React', 'TailwindCSS', 'TypeScript', 'Next.js'] },
{ category: 'Backend', skills: ['Java', 'Spring Boot', 'Node.js', 'Express'] },
{ category: 'Database', skills: ['MongoDB', 'MySQL', 'PostgreSQL'] },
{ category: 'Tools', skills: ['Git', 'Docker', 'VS Code', 'Figma'] }];


type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  media: string;
  stack: string[];
  year?: string;
  type: string;
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
};

const player = (id: string) => `https://player.cloudinary.com/embed/?cloud_name=dyogmyud6&public_id=${id}&profile=cld-default`;

export const projects: Project[] = [
{
  id: 'kcs',
  name: 'KCS Overseas',
  category: 'Shopify e-commerce / Client',
  description: 'A Shopify store built for an Indian client selling imported food and beverage products. I customized theme sections, designed responsive product and category layouts, configured Razorpay payments, improved product page SEO and optimized the store for mobile shopping.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078370/portfolio/projects/c6pyc0grn3qc6bsw7ggo.png',
  stack: ['Shopify', 'Liquid', 'JavaScript', 'Razorpay', 'SEO'],
  type: 'Client project',
  liveUrl: 'https://kcs-overseas.myshopify.com'
},
{
  id: 'nextgenclues',
  name: 'NextGenClues',
  category: 'Tech blog & CMS / Client',
  description: 'A technology publication with practical guides, software engineering notes, AI lessons and digital product stories for Sri Lankan and global readers. Includes a custom admin dashboard for writing posts, uploading cover images, generating SEO fields with a search preview, and pinning featured articles.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793077991/portfolio/site/clients/nextgenclues.webp',
  stack: ['React', 'Vite', 'REST API', 'Admin CMS', 'SEO'],
  type: 'Client project',
  liveUrl: 'https://nextgenclues.com/'
},
{
  id: 'kalawewa',
  name: 'Kala Wewa',
  category: 'Travel guide & blog / Client',
  description: 'A travel guide for Kala Wewa Reservoir in Sri Lanka, with history, destinations, photography spots and visitor tips. Built with a blogger dashboard backed by a Neon database for managing articles and contact messages, plus Cloudinary image uploads and SEO tools.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793077989/portfolio/site/clients/kala-wewa.webp',
  stack: ['React', 'Vite', 'Neon', 'Cloudinary', 'SEO'],
  type: 'Client project',
  liveUrl: 'https://kala-wewa.vercel.app/'
},
{
  id: 'operationjungle',
  name: 'Operation Jungle',
  category: '3D browser game / In development',
  description: 'A mission-based 3D action game playable in the browser, inspired by real historical locations and events from Sri Lanka. Features immersive jungle environments, military helicopter scenes, a story told through squad dialogue, a custom mission selection UI, and campaign progression with XP and achievements. It closes with a message of remembrance for everyone lost, on every side, and hope for lasting peace.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793082019/portfolio/projects/operation-jungle.png',
  stack: ['Three.js', 'WebGL', 'Cannon.js', 'GLTF', 'Game design'],
  type: 'Personal project',
  liveUrl: 'https://wanni-front.vercel.app/'
},
{
  id: 'flow',
  name: 'FLOW',
  category: 'Mobile app design / UI/UX',
  description: 'A productivity app designed to turn intentions into action. Includes smart task planning, a voice-powered assistant you can just talk to, habit and focus tracking, and a Mind Garden where a tree grows as you complete tasks and focus sessions.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793082018/portfolio/projects/flow-app.jpg',
  stack: ['Mobile UI', 'UI/UX', 'Voice assistant', 'Figma'],
  type: 'Personal project'
},
{
  id: 'macbook',
  name: 'MacBook Store',
  category: 'Web app / 3D product showcase',
  description: 'Apple-inspired product showcase with an interactive 3D MacBook built in Three.js, smooth GSAP scroll animations and elegant storytelling. Built with React and Tailwind CSS for a premium, responsive experience.',
  media: 'https://res.cloudinary.com/dyy73d8ko/video/upload/q_auto/v1793078348/portfolio/site/Mac.mp4',
  stack: ['React', 'Three.js', 'GSAP', 'TailwindCSS'],
  type: 'Personal project',
  liveUrl: player('Mac_Store_Demo')
},
{
  id: 'iphone',
  name: 'iPhone 15 Pro',
  category: 'Web app / 3D marketing site',
  description: 'High-end product marketing website with realistic 3D iPhone models built in React Three Fiber and Drei. Includes colour and size exploration, GSAP scroll animations, a video carousel and production-ready responsive design.',
  media: 'https://res.cloudinary.com/dyy73d8ko/video/upload/q_auto/v1793078237/portfolio/site/Iphon.mp4',
  stack: ['React', 'Three.js', 'R3F', 'GSAP', 'Drei'],
  type: 'Personal project',
  liveUrl: player('iPhone_Demo')
},
{
  id: 'smartcare',
  name: 'SmartCare',
  category: 'Hospital management / Client',
  description: 'A hospital management system built as an IT Master level client project. It covers patient management, appointments, medical records, billing, pharmacy management and admin control.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078371/portfolio/projects/mi7fbc5og7bplze9fb25.png',
  stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  type: 'Client project'
},
{
  id: 'naturepulse',
  name: 'Nature Pulse',
  category: 'Ayurvedic healthcare / Client',
  description: 'My first complete client project — a full stack Ayurvedic healthcare platform connecting patients, doctors and administrators, with appointment booking, health tracking, community reports, product shopping and role-based dashboards.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078372/portfolio/projects/plbitoyhn2fx3kjhdxsn.jpg',
  stack: ['MERN', 'JWT', 'Stripe'],
  type: 'Client project',
  githubUrl: 'https://github.com/Awantha2003/Nature_Pulse'
},
{
  id: 'rewear',
  name: 'ReWear',
  category: 'Item swap & logistics / Client',
  description: 'An item swapping and logistics platform built as a SLIIT client project. Users browse and add items, manage wishlists, send swap requests and track meetup or delivery logistics through Pending, Scheduled, In Transit and Completed stages.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078372/portfolio/projects/mors9hcnkwsdlzhvbg9i.png',
  stack: ['React', 'Vite', 'Node.js', 'Express'],
  type: 'Client project'
},
{
  id: 'jobfinder',
  name: 'JobFinder.lk',
  category: 'Job portal / Client',
  description: 'An online job portal that helps job seekers find work in Sri Lanka, with a clean interface for searching by keyword, job title, company and location.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078373/portfolio/projects/ly7se7fczkveweklhnlw.png',
  stack: ['React', 'Vite', 'TailwindCSS'],
  type: 'Client project'
},
{
  id: 'classms',
  name: 'Class Manager',
  category: 'Academic scheduling / Client',
  description: 'An academic scheduling platform where students manage classes, exams, events and enrolled subjects from one dashboard with timetable views.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078374/portfolio/projects/cgpwir9uwji3scw119ej.png',
  stack: ['React', 'Vite', 'TailwindCSS'],
  type: 'Client project'
},
{
  id: 'studentwell',
  name: 'StudentWell',
  category: 'Wellness & productivity',
  description: 'A student wellness and productivity platform for logging mood, tracking stress and energy levels, managing tasks and running focus timers for protected study sessions.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078375/portfolio/projects/pldcoyeypzrqzm0jbqr2.png',
  stack: ['React', 'Vite', 'TailwindCSS'],
  type: 'Personal project'
},
{
  id: 'meditrack',
  name: 'Medi Track',
  category: 'Pharmacy management',
  description: 'A pharmacy management app that automates inventory, orders, deliveries and prescriptions, with real-time stock tracking, geolocation and AI-based chat. Built with the MERN stack using Agile and CI/CD.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078376/portfolio/projects/pkczjoaxmkb6crpqypxv.png',
  stack: ['React', 'Node.js', 'MongoDB', 'REST API'],
  type: 'Team project',
  liveUrl: player('Screen_Recording_2025-07-04_220832_xkmlk4')
},
{
  id: 'srilanka',
  name: 'Sri Lanka Journey',
  category: 'AI travel planner',
  description: 'An intelligent travel planner that generates personalized Sri Lanka itineraries from categories like beaches or cool climates. Uses AI and public APIs to suggest places, estimate costs and plan daily routes.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078377/portfolio/projects/rpqfxp0ciupqo1nlsp1c.jpg',
  stack: ['MERN', 'WebSockets', 'TailwindCSS'],
  type: 'Personal project',
  liveUrl: player('Screen_Recording_2025-06-08_014939_f3u8wm'),
  githubUrl: 'https://github.com/Awantha2003/sri-lanka-journey'
},
{
  id: 'wolfenox',
  name: 'Wolfenox',
  category: 'Software company website',
  description: 'A real-world website and design system for a software company, including UI components, typography and colour schemes.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078378/portfolio/projects/dvotf9iznxufkzpcsnqo.png',
  stack: ['React', '3D Design', 'API'],
  type: 'Real-world project',
  liveUrl: 'https://wolfenox-pvt.vercel.app'
},
{
  id: 'mojito',
  name: 'Mojito 3D',
  category: 'Web app / 3D',
  description: 'A 3D web experience showcasing an animated mojito model.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078380/portfolio/projects/z9zrvjwgoavesaq65kfc.png',
  stack: ['React', 'Node.js', 'GSAP'],
  type: 'Personal project',
  liveUrl: player('Screen_Recording_2025-07-30_171354_vlqon7')
},
{
  id: 'movie',
  name: 'Movie App',
  category: 'Mobile app',
  description: 'A mobile app for tracking movies, reviews and ratings.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078381/portfolio/projects/nyq0rd6lvdpktcbmyslc.png',
  stack: ['React Native', 'SQLite', 'API'],
  type: 'Personal project',
  liveUrl: player('Screen_Recording_2025-07-25_125303_zzbrhs'),
  githubUrl: 'https://github.com/Awantha2003/Movie_App'
},
{
  id: 'finance',
  name: 'Finance Tracker',
  category: 'Mobile app',
  description: 'A mobile app for managing personal finances and budgets.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078382/portfolio/projects/kssn2d88afeno8qlzahi.png',
  stack: ['Kotlin', 'XML', 'Firebase'],
  type: 'Personal project',
  liveUrl: player('Screen_Recording_2025-06-16_212651_n7qfga')
},
{
  id: 'airticket',
  name: 'Air Ticket Booking',
  category: 'Web app',
  description: 'An air ticket booking system with user authentication, flight search and booking management.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078383/portfolio/projects/qpmriqat8jgkmydklggj.png',
  stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  type: 'Personal project',
  liveUrl: player('Screen_Recording_2025-02-01_102019_rpsz3a')
},
{
  id: 'fashion',
  name: 'Fashion App',
  category: 'UI/UX / Design system',
  description: 'A fashion app design system with reusable components and guidelines, prototyped in Figma and built in React.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078384/portfolio/projects/sovwqlygo0ea9cb6qjko.png',
  stack: ['React', 'TailwindCSS', 'Figma'],
  type: 'UI/UX project',
  liveUrl: player('Screen_Recording_2025-06-15_020101_x87fhh'),
  figmaUrl: 'https://www.figma.com/proto/6ykhLKbYVjwnkuJx9EnC0s/fashion?node-id=2051-838&starting-point-node-id=2001%3A2'
},
{
  id: 'pizza',
  name: 'Pizza App UI',
  category: 'UI/UX / Figma',
  description: 'A pizza delivery app UI designed in Figma with a modern, user-friendly interface.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078385/portfolio/projects/sfog8jlgdb89yybtgtxw.png',
  stack: ['Figma', 'Prototyping'],
  type: 'UI/UX project',
  figmaUrl: 'https://www.figma.com/design/gFdsqPnECxksLgfsfhq5mY/Piza-app?node-id=0-1'
},
{
  id: 'vrbox',
  name: 'VR Box UI',
  category: 'UI/UX / Figma',
  description: 'A VR box web design system with components, typography and colour.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078387/portfolio/projects/vudahchq6evfwgdncvag.png',
  stack: ['Figma', 'Prototyping'],
  type: 'UI/UX project',
  figmaUrl: 'https://www.figma.com/proto/l9BCwK3JfdcbV8QmEi38QI/Untitled?node-id=7-38&starting-point-node-id=7%3A38&scaling=scale-down-width&content-scaling=fixed'
},
{
  id: 'admin',
  name: 'Admin Dashboard',
  category: 'UI/UX / Figma',
  description: 'An admin dashboard design for managing products, orders and customers.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078388/portfolio/projects/lfgt9lafv927o8qree4p.png',
  stack: ['Figma', 'Prototyping'],
  type: 'UI/UX project',
  liveUrl: player('Screen_Recording_2024-08-03_004240_k4mocv'),
  figmaUrl: 'https://www.figma.com/proto/mMab43Wu8UJqqgErGqfT8C/Untitled?node-id=30-299&starting-point-node-id=19%3A9'
},
{
  id: 'wordpress',
  name: 'WordPress Portfolio',
  category: 'Web / WordPress',
  description: 'My first portfolio, built with WordPress and Elementor.',
  media: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078389/portfolio/projects/jyvi4jfuvgpy24zjby3m.png',
  stack: ['WordPress', 'Elementor'],
  year: '2023',
  type: 'Personal project',
  liveUrl: 'http://cskawanthaimesh.iceiy.com'
}];


export const startup = {
  name: 'WOLFENOX',
  category: 'Web, AI & digital marketing agency',
  logo: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078359/portfolio/site/wolfenox/logo.png',
  url: 'https://wolfenox.netlify.app/',
  description: 'The software company I founded. We build secure, scalable web platforms, AI solutions and digital marketing for businesses, institutions and students — combining strong technical skills with creative thinking to help clients grow.',
  mission: 'Creative, high-quality and cost-effective technology services that help businesses succeed and grow with confidence.',
  vitals: [
  { label: 'My role', value: 'Founder' },
  { label: 'Started', value: '2024' },
  { label: 'Incorporated', value: '2025' },
  { label: 'Based in', value: 'Malabe, Colombo' },
  { label: 'What it does', value: 'Web · AI · Marketing' }]
};

type StartupProject = {
  title: string;
  tag: string;
  image: string;
  group: string;
  client?: string;
};

export const startupProjects: StartupProject[] = [
{ title: 'Phones Direct', tag: 'E-commerce platform', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078353/portfolio/site/wolfenox/ecom.webp', group: 'Client work' },
{ title: 'Serenity Haven', tag: 'Luxury resort website', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078362/portfolio/site/wolfenox/serenityhaven.webp', group: 'Client work' },
{ title: 'KCS Overseas', tag: 'Shopify store · India', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078357/portfolio/site/wolfenox/indian1.webp', group: 'Client work' },
{ title: 'Horizon', tag: 'Travel experience platform', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078352/portfolio/site/wolfenox/creative-campaign.webp', group: 'Client work' },
{ title: 'Sri Lanka Railways', tag: 'National booking system', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078369/portfolio/site/wolfenox/webui1.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Nature Pulse', tag: 'AI healthcare platform', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078364/portfolio/site/wolfenox/sliit1.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Explore Dubai', tag: 'Travel booking platform', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078356/portfolio/site/wolfenox/hotelbook1.webp', group: 'University clients', client: 'NSBM' },
{ title: 'JobFinder.lk', tag: 'Career platform', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078358/portfolio/site/wolfenox/jobfinderlk.webp', group: 'University clients', client: 'NSBM' },
{ title: 'Sunrise', tag: 'Hotel booking website', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078361/portfolio/site/wolfenox/senrise_hotel.webp', group: 'University clients', client: 'IIT' },
{ title: 'Travel Stays', tag: 'Professional website design', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078355/portfolio/site/wolfenox/herilzan.webp', group: 'University clients', client: 'NIBM' },
{ title: 'Better Stays', tag: 'Business website', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078364/portfolio/site/wolfenox/traval.webp', group: 'University clients', client: 'ESOFT' },
{ title: 'Beauty Store', tag: 'UI/UX & web development', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078351/portfolio/site/wolfenox/beutyproducat.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Pick Your Doctor', tag: 'Healthcare website', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078354/portfolio/site/wolfenox/edoccahnle.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Tax Consultation', tag: 'Professional services website', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078360/portfolio/site/wolfenox/lowcollage.webp', group: 'University clients', client: 'NSBM' },
{ title: 'Vivienne Rose', tag: 'Fashion e-commerce app', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078366/portfolio/site/wolfenox/uniapp1.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Promptly', tag: 'Language learning app', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078367/portfolio/site/wolfenox/uniapp2.webp', group: 'University clients', client: 'SLIIT' },
{ title: 'Neobank', tag: 'Banking app UI/UX', image: 'https://res.cloudinary.com/dyy73d8ko/image/upload/f_auto,q_auto/v1793078368/portfolio/site/wolfenox/uniapp3.webp', group: 'University clients', client: 'SLIIT' }];


export const services = [
{ title: 'Start from an idea.', desc: 'From a sketch to a working product.' },
{ title: 'Design it right.', desc: 'UI/UX people actually enjoy using.' },
{ title: 'Build it full stack.', desc: 'React, Node.js, Spring Boot and MongoDB.' },
{ title: 'Take it mobile.', desc: 'React Native and Kotlin apps.' },
{ title: 'Make it smart.', desc: 'AI features that solve real problems.' }];


export type Profile = typeof profile;

const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');
const handle = (url: string) => `@${shortUrl(url).split('/').pop()}`;

export const contactPointsFor = (p: Profile) => [
{ icon: 'mail', text: p.email, href: `mailto:${p.email}` },
{ icon: 'pin', text: p.location },
{ icon: 'github', text: shortUrl(p.github), href: p.github },
{ icon: 'linkedin', text: shortUrl(p.linkedin), href: p.linkedin }];


export const socialsFor = (p: Profile) => [
{ platform: 'github', handle: handle(p.github), href: p.github },
{ platform: 'linkedin', handle: handle(p.linkedin), href: p.linkedin },
{ platform: 'mail', handle: p.email, href: `mailto:${p.email}` }];


/** Everything the admin panel can edit. These values are the fallback when the database has no saved copy. */
export const defaultContent = {
  profile,
  images,
  hero,
  ghostWords,
  story,
  stats,
  thenCameTags,
  whatIBuild,
  workWithMe: workWithMe as { text: string; link: string; tone: 'brand' | 'ink'; href: string; }[],
  education,
  experience,
  certifications: certifications as { name: string; issuer: string; year: string; url?: string; }[],
  startup,
  startupProjects,
  projects,
  services,
  keySkills,
  skillGroups,
  techStack
};

export type SiteContent = typeof defaultContent;
export type ContentKey = keyof SiteContent;
