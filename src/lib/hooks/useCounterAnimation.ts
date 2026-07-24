import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useCounterAnimation(targetValue: number, duration = 1000) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();
  const [value, setValue] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !animatedRef.current) {
      const prefersReducedMotion = typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setValue(targetValue);
        animatedRef.current = true;
        return;
      }

      const obj = { val: 0 };
      animate(obj, {
        val: targetValue,
        duration: duration,
        ease: 'outExpo',
        onUpdate: () => {
          setValue(Math.floor(obj.val));
        }
      });
      animatedRef.current = true;
    }
  }, [isVisible, targetValue, duration]);

  return { ref, value };
}
