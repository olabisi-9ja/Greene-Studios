import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useSectionAnimation<T extends Element = Element>(options = {}) {
  const { ref, isVisible } = useIntersectionObserver<T>(options);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !animatedRef.current && ref.current) {
      const prefersReducedMotion = typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        (ref.current as unknown as HTMLElement).style.opacity = '1';
        (ref.current as unknown as HTMLElement).style.transform = 'translateY(0)';
        animatedRef.current = true;
        return;
      }

      animate(ref.current, {
        translateY: [24, 0],
        opacity: [0, 1],
        duration: 500,
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
      animatedRef.current = true;
    }
  }, [isVisible, ref]);

  return ref;
}
