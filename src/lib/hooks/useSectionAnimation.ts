import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

/**
 * Reveals a section on first intersection using the compositor only
 * (opacity + transform). No animation library: the element carries the
 * transition, this hook just flips the end state once.
 */
export function useSectionAnimation<T extends Element = Element>(options = {}) {
  const { ref, isVisible } = useIntersectionObserver<T>(options);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current as unknown as HTMLElement | null;
    if (!isVisible || animatedRef.current || !el) return;

    animatedRef.current = true;
    el.classList.add('is-revealed');
  }, [isVisible, ref]);

  return ref;
}
