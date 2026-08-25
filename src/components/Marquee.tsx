"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "Awwwards", "FWA", "CSSDA", "Vercel", "WebGL", "Three.js", "GSAP", "Creative Coding"
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    // Continuous infinite marquee
    const m1 = gsap.to(text1Ref.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
    
    const m2 = gsap.to(text2Ref.current, {
      xPercent: 50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    // Velocity acceleration
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const speedModifier = 1 + Math.abs(velocity / 100);
        
        gsap.to([m1, m2], {
          timeScale: speedModifier,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to([m1, m2], { timeScale: 1, duration: 1 });
          }
        });
      }
    });
    
    return () => {
      m1.kill();
      m2.kill();
      st.kill();
    };
  }, []);

  // Double the list for seamless loop
  const list = [...clients, ...clients, ...clients, ...clients];

  return (
    <section ref={containerRef} className="py-20 w-full overflow-hidden bg-cyber-bg border-y border-cyber-border/30 relative flex flex-col gap-6">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="w-[200vw] sm:w-[150vw] flex" ref={text1Ref}>
        {list.map((client, i) => (
          <div key={`m1-${i}`} className="flex-shrink-0 px-8 flex items-center gap-8">
            <span className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-transparent stroke-text" 
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              {client}
            </span>
            <span className="text-cyber-cyan font-mono">*</span>
          </div>
        ))}
      </div>

      <div className="w-[200vw] sm:w-[150vw] flex -translate-x-[50%]" ref={text2Ref}>
        {list.reverse().map((client, i) => (
          <div key={`m2-${i}`} className="flex-shrink-0 px-8 flex items-center gap-8">
            <span className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-transparent stroke-text"
                  style={{ WebkitTextStroke: '1px rgba(5,255,161,0.2)' }}>
              {client}
            </span>
            <span className="text-cyber-violet font-mono">*</span>
          </div>
        ))}
      </div>
    </section>
  );
}
