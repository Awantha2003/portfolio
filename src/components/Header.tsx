import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-react';
interface HeaderProps {
  scrollY: number;
}
const Header: React.FC<HeaderProps> = ({
  scrollY
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const navItems = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Projects',
    href: '#projects'
  }, {
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Contact',
    href: '#contact'
  }, {
    name: 'Resume',
    href: '#resume'
  }];
  return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/60 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <span className="text-2xl font-bold tracking-tighter">
            AWANTHA<span className="text-orange-500">.</span>
          </span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => <a key={item.name} href={item.href} className="relative text-sm font-medium tracking-wide hover:text-orange-500 transition-colors duration-300 group">
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>)}
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} onMouseEnter={() => setToggleHover(true)} onMouseLeave={() => setToggleHover(false)} className="relative p-2 rounded-full bg-black transition-all duration-300 group overflow-hidden" style={{
          boxShadow: toggleHover ? '0 0 15px 2px rgba(255,107,0,0.5)' : 'none'
        }} aria-label="Toggle dark mode">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {darkMode ? <SunIcon size={18} className="text-orange-500 group-hover:scale-110 transition-transform" /> : <MoonIcon size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />}
            </div>
            <span className="absolute inset-0 rounded-full border border-orange-500/30 group-hover:border-orange-500/60 transition-colors"></span>
            {toggleHover && <span className="absolute inset-0 rounded-full animate-ping border border-orange-500/30 opacity-75" style={{
            animationDuration: '1.5s'
          }}></span>}
          </button>
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <XIcon size={18} className="text-orange-500" /> : <MenuIcon size={18} className="text-orange-500" />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {menuOpen && <div className="md:hidden bg-black/90 backdrop-blur-md absolute top-full left-0 w-full">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map(item => <a key={item.name} href={item.href} className="text-sm font-medium py-2 border-b border-gray-800 hover:text-orange-500 transition-colors" onClick={() => setMenuOpen(false)}>
                {item.name}
              </a>)}
          </nav>
        </div>}
    </header>;
};
export default Header;