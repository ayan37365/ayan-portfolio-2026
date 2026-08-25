"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const phrases = [
  "// [ HIGH-CONVERTING CLIENT PLATFORMS ]",
  "// [ SCALABLE ML & AI ENGINES ]",
  "// [ GAS-OPTIMIZED SMART PROTOCOLS ]"
];

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function KineticCycler() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let frameRequest: number;
    
    const cycle = () => {
      const nextIndex = (index + 1) % phrases.length;
      const targetPhrase = phrases[nextIndex];
      const oldPhrase = phrases[index];
      
      let frame = 0;
      const length = Math.max(oldPhrase.length, targetPhrase.length);
      
      const update = () => {
        let newText = "";
        const progress = frame / 20; // 20 frames for transition
        
        for (let i = 0; i < length; i++) {
          if (i < progress * length) {
            newText += targetPhrase[i] || "";
          } else if (i < oldPhrase.length) {
            newText += Math.random() < 0.3 ? CHARS[Math.floor(Math.random() * CHARS.length)] : oldPhrase[i];
          }
        }
        
        setDisplayText(newText);
        
        if (frame < 20) {
          frame++;
          frameRequest = requestAnimationFrame(update);
        } else {
          setDisplayText(targetPhrase);
          setIndex(nextIndex);
          // Glitch scale effect
          if (containerRef.current) {
            gsap.fromTo(containerRef.current, 
              { scale: 1.05, opacity: 0.8 }, 
              { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
          }
        }
      };
      
      update();
    };

    timeout = setTimeout(cycle, 3000);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRequest);
    };
  }, [index]);

  return (
    <div 
      ref={containerRef} 
      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-violet min-h-[1.5em] mt-2 group relative cursor-crosshair transition-transform"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 mix-blend-screen transition-opacity duration-300 blur-[2px] text-cyber-cyan">
        {displayText}
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 mix-blend-screen transition-opacity duration-300 translate-x-[2px] blur-[1px] text-cyber-violet">
        {displayText}
      </div>
      <span className="relative z-10">{displayText}</span>
    </div>
  );
}
