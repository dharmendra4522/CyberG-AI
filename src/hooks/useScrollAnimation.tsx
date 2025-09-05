import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
}

interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down';
  isVisible: boolean;
  hasEntered: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
    staggerDelay = 100
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [scrollState, setScrollState] = useState<ScrollProgress>({
    progress: 0,
    direction: 'down',
    isVisible: false,
    hasEntered: false
  });

  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = currentScrollY;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate progress based on element position
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const progress = Math.max(0, Math.min(1, 
      (windowHeight - elementTop) / (windowHeight + elementHeight)
    ));

    setScrollState(prev => ({
      ...prev,
      progress,
      direction,
    }));
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setScrollState(prev => ({
            ...prev,
            isVisible: entry.isIntersecting,
            hasEntered: prev.hasEntered || entry.isIntersecting
          }));
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Add scroll listener for progress tracking
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, rootMargin, handleScroll]);

  // Staggered animation helper
  const getStaggerDelay = (index: number) => index * staggerDelay;

  // Animation class generator
  const getAnimationClass = (baseClass: string, index?: number) => {
    const stagger = index !== undefined ? getStaggerDelay(index) : 0;
    const shouldAnimate = triggerOnce ? scrollState.hasEntered : scrollState.isVisible;
    
    return {
      className: `${baseClass} ${shouldAnimate ? 'animate' : ''}`,
      style: {
        animationDelay: `${stagger}ms`,
        '--scroll-progress': scrollState.progress,
        '--scroll-direction': scrollState.direction === 'down' ? 1 : -1,
      } as React.CSSProperties
    };
  };

  return {
    elementRef,
    scrollState,
    getAnimationClass,
    getStaggerDelay,
  };
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const newOffset = scrolled * speed;
      
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { elementRef, offset };
};

// Hook for mouse-following effects
export const useMouseFollow = (strength: number = 0.1) => {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return { elementRef, position };
};