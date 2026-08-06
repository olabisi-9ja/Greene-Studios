import { useEffect, useRef } from 'react';
import { createTimeline, set, stagger } from 'animejs';

export function useHeroAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lines = Array.from(
      document.querySelectorAll<HTMLElement>('.hero-line-inner')
    );

    if (prefersReducedMotion) {
      const targets = [kickerRef.current, descRef.current, ctasRef.current, metaRef.current, visualRef.current, clientsRef.current, marqueeRef.current].filter(Boolean) as HTMLElement[];
      set(targets, { opacity: 1, translateY: 0, scale: 1 });
      set(lines, { opacity: 1, translateY: '0%' });
      animatedRef.current = true;
      return;
    }

    const tl = createTimeline({
      defaults: { ease: 'cubicBezier(0.16, 1, 0.3, 1)' },
    });

    // Headline lines rise out of their masks, one after another
    set(lines, { opacity: 0, translateY: '110%' });
    tl.add(lines, {
      opacity: [0, 1],
      translateY: ['110%', '0%'],
      duration: 900,
      delay: stagger(120),
      ease: 'cubicBezier(0.16, 1, 0.3, 1)',
    }, 80);

    // Kicker
    if (kickerRef.current) {
      set(kickerRef.current, { opacity: 0, translateX: -14 });
      tl.add(kickerRef.current, { opacity: [0, 1], translateX: [-14, 0], duration: 550 }, 40);
    }

    // Description
    if (descRef.current) {
      set(descRef.current, { opacity: 0, translateY: 18 });
      tl.add(descRef.current, { opacity: [0, 1], translateY: [18, 0], duration: 600 }, 480);
    }

    // CTAs
    if (ctasRef.current) {
      set(ctasRef.current, { opacity: 0, translateY: 20 });
      tl.add(ctasRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 600 }, 620);
    }

    // Meta row
    if (metaRef.current) {
      set(metaRef.current, { opacity: 0, translateY: 16 });
      tl.add(metaRef.current, { opacity: [0, 1], translateY: [16, 0], duration: 550 }, 760);
    }

    // Right visual — pops in with a soft scale
    if (visualRef.current) {
      set(visualRef.current, { opacity: 0, scale: 0.94, translateY: 24 });
      tl.add(visualRef.current, {
        opacity: [0, 1],
        scale: [0.94, 1],
        translateY: [24, 0],
        duration: 900,
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
      }, 320);
    }

    // Clients strip
    if (clientsRef.current) {
      set(clientsRef.current, { opacity: 0 });
      tl.add(clientsRef.current, { opacity: [0, 1], duration: 600 }, 900);
    }

    // Bottom marquee
    if (marqueeRef.current) {
      set(marqueeRef.current, { opacity: 0 });
      tl.add(marqueeRef.current, { opacity: [0, 1], duration: 700 }, 1000);
    }

    animatedRef.current = true;
  }, []);

  return { sectionRef, headlineRef, kickerRef, descRef, ctasRef, metaRef, visualRef, clientsRef, marqueeRef };
}
