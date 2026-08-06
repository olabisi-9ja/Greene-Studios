import { useEffect, useRef } from 'react';
import { createTimeline, set, stagger } from 'animejs';

export function useHeroAnimation() {
 const sectionRef = useRef<HTMLElement>(null);
 const wordRef = useRef<HTMLHeadingElement>(null);
 const lineRef = useRef<HTMLDivElement>(null);
 const ctasRef = useRef<HTMLDivElement>(null);
 const badgesRef = useRef<HTMLDivElement>(null);
 const marqueeRef = useRef<HTMLDivElement>(null);
 const animatedRef = useRef(false);

 useEffect(() => {
 if (animatedRef.current) return;

 const prefersReducedMotion = typeof window !== 'undefined' &&
 window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 const chars = Array.from(
 document.querySelectorAll<HTMLElement>('.hero-char-inner')
 );

 if (prefersReducedMotion) {
 const targets = [lineRef.current, ctasRef.current, badgesRef.current, marqueeRef.current].filter(Boolean) as HTMLElement[];
 set(targets, { opacity: 1, translateY: 0, scale: 1 });
 set(chars, { opacity: 1, translateY: '0%', rotate: 0 });
 animatedRef.current = true;
 return;
 }

 const tl = createTimeline({
 defaults: { ease: 'cubicBezier(0.16, 1, 0.3, 1)' },
 });

 // Giant word, letters rise & straighten one by one
 set(chars, { opacity: 0, translateY: '115%', rotate: 8 });
 tl.add(chars, {
 opacity: [0, 1],
 translateY: ['115%', '0%'],
 rotate: [8, 0],
 duration: 1200,
 delay: stagger(70),
 ease: 'cubicBezier(0.16, 1, 0.3, 1)',
 }, 120);

 // Serif line under the word
 if (lineRef.current) {
 set(lineRef.current, { opacity: 0, translateY: 20 });
 tl.add(lineRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 620);
 }

 // CTA row
 if (ctasRef.current) {
 set(ctasRef.current, { opacity: 0, translateY: 22 });
 tl.add(ctasRef.current, { opacity: [0, 1], translateY: [22, 0], duration: 700 }, 820);
 }

 // Rotating badge, pops in with a bounce
 if (badgesRef.current) {
 set(badgesRef.current, { opacity: 0, scale: 0.5 });
 tl.add(badgesRef.current, {
 opacity: [0, 1],
 scale: [0.5, 1],
 duration: 800,
 ease: 'cubicBezier(0.34, 1.56, 0.64, 1)',
 }, 1000);
 }

 // Bottom marquee
 if (marqueeRef.current) {
 set(marqueeRef.current, { opacity: 0 });
 tl.add(marqueeRef.current, { opacity: [0, 1], duration: 700 }, 1150);
 }

 animatedRef.current = true;
 }, []);

 return { sectionRef, wordRef, lineRef, ctasRef, badgesRef, marqueeRef };
}
