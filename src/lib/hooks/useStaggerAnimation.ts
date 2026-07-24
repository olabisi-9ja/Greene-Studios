import { useEffect, useRef } from 'react';
import { animate, stagger, set } from 'animejs';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useStaggerAnimation<T extends Element = Element>(options = {}, targetSelector = '.stagger-item') {
  const { ref, isVisible } = useIntersectionObserver<T>(options);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !animatedRef.current && ref.current) {
      const prefersReducedMotion = typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let targets: NodeListOf<Element> | HTMLCollection = ref.current.querySelectorAll(targetSelector);
      if (targets.length === 0) {
        targets = ref.current.children;
      }

      if (targets.length > 0) {
        if (prefersReducedMotion) {
          Array.from(targets).forEach((el) => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          });
          animatedRef.current = true;
          return;
        }

        set(targets, { opacity: 0, translateY: 20 });
        
        animate(targets, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 500,
          delay: stagger(60),
          ease: 'cubicBezier(0.16, 1, 0.3, 1)',
        });
        animatedRef.current = true;
      }
    }
  }, [isVisible, ref, targetSelector]);

  return ref;
}
