import React from 'react';
import { GithubIcon, LinkedinIcon, FileTextIcon, ArrowUpIcon } from 'lucide-react';
const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="py-12 bg-black border-t border-orange-500/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter">
              AWANTHA<span className="text-orange-500">.</span>
            </a>
            <p className="text-gray-400 mt-2">
              Full Stack Developer & UI/UX Engineer
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/Awantha2003" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/awanthaimesh/" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://drive.google.com/uc?export=download&id=1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Resume" download="Awantha_Imesh_CV.pdf">
              <FileTextIcon size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Awantha Imesh. All Rights Reserved.
          </p>
          <button onClick={scrollToTop} className="mt-4 md:mt-0 flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors" aria-label="Scroll to top">
            <span className="text-sm">Back to top</span>
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>;
};
export default Footer;