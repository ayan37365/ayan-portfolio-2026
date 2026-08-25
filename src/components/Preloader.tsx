"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    
    // Simulate loading
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(currentProgress);
      
      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Outro animation
        const tl = gsap.timeline();
        
        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        });
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div 
        ref={textRef}
        className="font-mono text-6xl font-bold tracking-tighter text-cyber-cyan"
      >
        {progress}%
      </div>
      
      <div className="absolute bottom-10 right-10 font-mono text-xs text-white/40">
        INITIALIZING SEQUENCE // {progress.toString().padStart(3, '0')}
      </div>
    </div>
  );
}
