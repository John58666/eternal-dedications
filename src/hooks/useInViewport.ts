import { useEffect, useRef, useState } from 'react';

/**
 * Reporta si el elemento referenciado está intersectando el viewport.
 * Patrón único para animaciones de entrada (bloom, focus del sneak peek),
 * reemplazando las copias locales de IntersectionObserver.
 */
export const useInViewport = <T extends HTMLElement>(threshold = 0.4) => {
  const elementRef = useRef<T | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref: elementRef, isInViewport } as const;
};
