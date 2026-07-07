"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import Link from 'next/link';

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  // Create particles
  const count = 3000;
  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread particles across the screen
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
      
      // Monochromatic colors (light grays to match #FAFAFA background)
      const shade = 0.5 + Math.random() * 0.3; // 0.5 to 0.8 (mid-to-light grays)
      cols[i * 3] = shade;
      cols[i * 3 + 1] = shade;
      cols[i * 3 + 2] = shade;
    }
    
    return [pos, origPos, cols];
  }, [viewport]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Magnetic attraction to mouse
    // Mouse coords are normalized (-1 to 1), convert to world coords
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];
      
      // Calculate distance to mouse
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Magnetic effect radius
      const radius = 5;
      
      if (dist < radius) {
        // Attract towards mouse but keep some distance
        const force = (radius - dist) / radius;
        positions[i3] += dx * force * 0.05;
        positions[i3 + 1] += dy * force * 0.05;
      } else {
        // Return to original position with some noise
        const noiseX = Math.sin(time * 0.5 + origY) * 0.5;
        const noiseY = Math.cos(time * 0.5 + origX) * 0.5;
        
        positions[i3] += (origX + noiseX - positions[i3]) * 0.02;
        positions[i3 + 1] += (origY + noiseY - positions[i3 + 1]) * 0.02;
      }
      
      // Subtle Z movement
      positions[i3 + 2] = origZ + Math.sin(time + origX * 0.1) * 2;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current, 
        { filter: "blur(20px)", opacity: 0, y: 30 },
        { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
          <ParticleSystem />
        </Canvas>
      </div>

      <div ref={revealRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center pb-24 lg:pb-0">
        
        <div className="max-w-4xl pt-10 md:pt-0">
          <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[1.05] tracking-tight text-[#101010] text-balance">
            Designing Digital Products That People Remember.
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-[#757575] max-w-2xl leading-relaxed text-balance">
            Greene Studios partners with startups and growing businesses to design, build and launch beautiful websites, SaaS products and digital experiences that drive measurable growth.
          </p>
        </div>
        
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/pricing"
            className="w-full sm:w-auto text-center bg-[#111111] hover:bg-[#BFA36A] text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(191,163,106,0.3)] hover:-translate-y-0.5"
          >
            Start a Project
          </Link>
          <Link 
            href="/work"
            className="w-full sm:w-auto text-center bg-white border border-[#E6E6E6] hover:border-[#101010] text-[#101010] px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-[#FAFAFA]"
          >
            View Work
          </Link>
        </div>
      </div>
    </section>
  );
};
