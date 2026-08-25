"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Split text animation on load (simulated split by lines/words)
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 40, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.05, ease: "power4.out", delay: 0.2 }
    );

    // Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 20; // max rotation 20deg
      const yPos = (clientY / innerHeight - 0.5) * -20;
      
      gsap.to(containerRef.current, {
        rotateX: yPos,
        rotateY: xPos,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const headline = "DESIGNED TO SCALE";

  return (
    <div ref={containerRef} className="flex flex-col items-center group relative perspective-1000 w-full max-w-4xl mx-auto mb-2 z-20 mix-blend-difference">
      <h1 
        ref={textRef} 
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70 drop-shadow-[0_0_15px_rgba(0,242,254,0.3)] flex justify-center text-center cursor-crosshair relative z-10 whitespace-nowrap"
      >
        {headline.split('').map((char, i) => (
          <span 
            key={i} 
            className="char inline-block relative hover:text-cyber-cyan hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            style={{ 
              textShadow: "0 0 20px rgba(121,40,202,0.4), 0 0 10px rgba(0,242,254,0.4)" 
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}
