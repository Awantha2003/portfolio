import React, { useEffect, useState } from 'react';
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const calculateScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const totalScrollableDistance = documentHeight - windowHeight;
    const currentScrollDistance = Math.min(scrollTop, totalScrollableDistance);
    const progress = currentScrollDistance / totalScrollableDistance * 100;
    setScrollProgress(progress);
  };
  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);
  return <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-[100]">
      <div className="h-full bg-orange-500" style={{
      width: `${scrollProgress}%`
    }} />
    </div>;
};
export default ScrollProgress;