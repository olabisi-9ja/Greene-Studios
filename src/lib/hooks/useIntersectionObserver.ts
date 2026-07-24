import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, root = null, rootMargin = '0%', freezeOnceVisible = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return { ref, isVisible };
}
