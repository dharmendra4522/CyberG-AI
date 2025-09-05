import { useEffect, useState } from 'react';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-1 bg-primary/20 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className="h-full bg-gradient-to-r from-primary via-accent to-primary-glow shadow-glow transition-all duration-100 ease-out"
        style={{ 
          width: `${scrollProgress * 100}%`,
          boxShadow: `0 0 20px hsl(var(--primary) / ${scrollProgress * 0.8})`,
        }}
      />
      
      {/* Animated particles along the progress bar */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-2 h-2 bg-accent rounded-full animate-pulse-glow"
            style={{
              left: `${(scrollProgress * 100) - 10 + (i * 3)}%`,
              animationDelay: `${i * 200}ms`,
              transform: 'translateY(-50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;