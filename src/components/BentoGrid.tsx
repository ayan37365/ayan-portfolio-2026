"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "./TextScramble";
import Lenis from "lenis";
import { CodeBlockVisual, AudioWaveVisual, RadarVisual, GridVisual } from "./BentoVisuals";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  { id: 1, title: "ML & Computer Vision Engine", tags: ["PyTorch", "YOLOv8", "MediaPipe", "RAG", "FastAPI"], colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-1 md:row-span-2", color: "border-cyber-cyan/50", Visual: CodeBlockVisual },
  { id: 2, title: "Algorithmic Core", tags: ["C++", "400+ CP Solved"], colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-1", color: "border-cyber-amber/50", Visual: AudioWaveVisual },
  { id: 3, title: "Web3 & Smart Contracts", tags: ["Solidity", "EVM", "Polygon", "Hardhat", "Slither"], colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-1", color: "border-cyber-emerald/50", Visual: RadarVisual },
  { id: 4, title: "Creative Web & Full-Stack", tags: ["Next.js", "WebGL/R3F", "GSAP", "Spring Boot"], colSpan: "col-span-12 md:col-span-12", rowSpan: "row-span-1", color: "border-cyber-violet/50", Visual: GridVisual },
];

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Entrance Animation
    const cards = gridRef.current.querySelectorAll(".bento-card");
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );

    // Velocity Skewing via Lenis and GSAP
    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(cards, "skewY", "deg");
    let clamp = gsap.utils.clamp(-15, 15);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const amount = clamp(velocity / -100);
        
        if (Math.abs(amount) > 0.1) {
          proxy.skew = amount;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });
    
    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="relative w-full bg-cyber-bg z-20 px-6 md:px-12 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-cyber-emerald tracking-widest uppercase mb-4">// System Capabilities</h2>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Tech <span className="text-white/50">Radar</span></h3>
        </div>

        <div ref={gridRef} className="grid grid-cols-12 auto-rows-[200px] gap-4 md:gap-6">
          {bentoItems.map((item) => (
            <div 
              key={item.id}
              className={`bento-card glass-card relative rounded-3xl p-8 flex flex-col justify-end group hover:bg-white/5 transition-colors duration-500 overflow-hidden border ${item.color} ${item.colSpan} ${item.rowSpan}`}
            >
              {/* Dynamic spotlight effect via CSS */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] mix-blend-screen pointer-events-none z-20"></div>
              
              <item.Visual />

              <div className="z-10 flex flex-col w-full gap-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70 hover:bg-white/10 transition-colors cursor-crosshair">
                      <TextScramble text={tag} />
                    </span>
                  ))}
                </div>
                
                {item.id === 2 && (
                  <div className="flex flex-col gap-2 mt-2 font-mono text-[10px] uppercase">
                    <a href="https://github.com/ayan37365" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyber-cyan transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span> GitHub (ayan37365)
                    </a>
                    <a href="https://codeforces.com/profile/Ayan_z" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyber-cyan transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span> Codeforces (400+ Solved)
                    </a>
                    <a href="https://codechef.com/users/fave_ripple_16" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyber-cyan transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span> CodeChef
                    </a>
                  </div>
                )}
                
                <div className="flex justify-between items-end w-full">
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">{item.title}</h4>
                  <span className="font-mono text-xs text-white/30 group-hover:text-cyber-cyan transition-colors">0{item.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
