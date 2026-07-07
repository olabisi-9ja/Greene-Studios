"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { motion } from "framer-motion";

const STUDIO_PALETTE = [
  "#E65A1A", // Coral / Orange
  "#D6245F", // Pink / Rose
  "#BDE61A", // Lime / Yellow-Green
  "#E6AE1A"  // Gold / Yellow
];

function Particles() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const count = 350;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 300;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // Set colors once on mount
  useEffect(() => {
    if (!mesh.current) return;
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const randomColor = STUDIO_PALETTE[Math.floor(Math.random() * STUDIO_PALETTE.length)];
      color.set(randomColor);
      mesh.current.setColorAt(i, color);
    }
    mesh.current.instanceColor!.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 1.2;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial roughness={0.05} metalness={0.1} />
    </instancedMesh>
  );
}

export default function StudioBackground() {
  const { mode } = useAtmosphere();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (mode !== "studio") return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      {/* Fallback CSS gradient for mobile devices to save battery */}
      {isMobile ? (
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #E65A1A33 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, #D6245F33 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, #BDE61A22 0%, transparent 35%),
              radial-gradient(circle at 20% 80%, #E6AE1A22 0%, transparent 35%),
              #0D0D0D
            `
          }}
        />
      ) : (
        <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#E65A1A" />
          <pointLight position={[-15, -15, -15]} intensity={1.5} color="#D6245F" />
          <Particles />
        </Canvas>
      )}
    </motion.div>
  );
}
