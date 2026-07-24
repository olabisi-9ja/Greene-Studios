import { useEffect, useRef } from 'react';
import { createTimeline, stagger, set } from 'animejs';
import SplitType from 'split-type';

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (headlineRef.current) headlineRef.current.style.opacity = '1';
      if (backgroundRef.current) backgroundRef.current.style.transform = 'scale(1)';
      if (textRef.current) textRef.current.style.opacity = '1';
      if (buttonRef.current) buttonRef.current.style.opacity = '1';
      animatedRef.current = true;
      return;
    }

    let split: SplitType | null = null;
    const tl = createTimeline({
      defaults: {
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
      }
    });

    if (backgroundRef.current) {
      tl.add(backgroundRef.current, {
        scale: [1.05, 1],
        duration: 1200,
      }, 0);
    }

    if (headlineRef.current) {
      split = new SplitType(headlineRef.current, { types: 'lines,words' });
      if (split.lines) {
        set(split.lines, { opacity: 0, translateY: 24 });
        
        tl.add(split.lines, {
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(60),
        }, 100);
      }
    }

    if (textRef.current) {
      set(textRef.current, { opacity: 0, translateY: 16 });
      tl.add(textRef.current, {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 500,
      }, '-=400');
    }

    if (buttonRef.current) {
      set(buttonRef.current, { opacity: 0, translateY: 16 });
      tl.add(buttonRef.current, {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 500,
      }, '-=400');
    }

    animatedRef.current = true;

    return () => {
      if (split) {
        split.revert();
      }
    };
  }, []);

  return { containerRef, headlineRef, backgroundRef, textRef, buttonRef };
}
