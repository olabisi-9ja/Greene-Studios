import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

const STAGGER_MS = 60;

/**
 * Staggers children into view on first intersection. Each target gets a
 * transition-delay and the `is-revealed` class; the motion itself is CSS
 * (see `.reveal` in globals.css). Honours prefers-reduced-motion via the
 * global media query rather than branching here.
 */
export function useStaggerAnimation<T extends Element = Element>(
  options = {},
  targetSelector = '.stagger-item'
) {
  const { ref, isVisible } = useIntersectionObserver<T>(options);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || animatedRef.current || !ref.current) return;

    const found = ref.current.querySelectorAll(targetSelector);
    const targets = found.length > 0 ? Array.from(found) : Array.from(ref.current.children);
    if (targets.length === 0) return;

    animatedRef.current = true;
    targets.forEach((el, i) => {
      const node = el as HTMLElement;
      node.classList.add('reveal');
      node.style.transitionDelay = `${i * STAGGER_MS}ms`;
      // Next frame, so the browser has the start state before the class flips.
      requestAnimationFrame(() => node.classList.add('is-revealed'));
    });
  }, [isVisible, ref, targetSelector]);

  return ref;
}
