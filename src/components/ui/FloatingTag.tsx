import React, { useEffect, useRef } from 'react';
interface FloatingTagProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
const FloatingTag: React.FC<FloatingTagProps> = ({
  children,
  delay = 0,
  duration = 3,
  className = ''
}) => {
  const tagRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;
    let animationId: number;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / (duration * 1000);
      // Simple floating animation
      const yOffset = Math.sin(progress * Math.PI * 2) * 10;
      tag.style.transform = `translateY(${yOffset}px)`;
      animationId = requestAnimationFrame(animate);
    };
    // Add initial delay
    const timeoutId = setTimeout(() => {
      tag.style.opacity = '1';
      animationId = requestAnimationFrame(animate);
    }, delay);
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [delay, duration]);
  return <div ref={tagRef} className={`inline-flex items-center justify-center px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-500 text-xs font-medium transition-opacity duration-500 opacity-0 ${className}`}>
      {children}
    </div>;
};
export default FloatingTag;