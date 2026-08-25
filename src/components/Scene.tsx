"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function Particles({ count = 3000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      // Increased inner radius (from 2.5 to 3.5) to keep center hollow for text legibility
      const r = 3.5 + (Math.random() * 0.8);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 15;
      pointsRef.current.rotation.y -= delta / 20;
    }
  });

  return (
    <Points 
      ref={pointsRef} 
      positions={positions} 
      stride={3} 
      frustumCulled={false}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={hovered ? 0.04 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function CameraRig() {
  useFrame((state) => {
    // Zoom out based on scroll
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;
    
    // Lerp camera position based on scroll
    // Start at z=8, move to z=-20 in the tunnel
    const targetZ = 8 - (scrollProgress * 30);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Rotate camera slightly based on scroll
    state.camera.rotation.z = scrollProgress * Math.PI * 2;
  });
  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }} gl={{ antialias: true, alpha: true }}>
        <CameraRig />
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
