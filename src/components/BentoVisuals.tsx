"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CodeBlockVisual() {
  return (
    <div className="absolute inset-0 pt-8 px-8 opacity-20 group-hover:opacity-40 transition-opacity flex flex-col gap-2 font-mono text-xs text-cyber-cyan pointer-events-none overflow-hidden mask-image:linear-gradient(to_bottom,white,transparent)">
      <p>import torch</p>
      <p>import torch.nn as nn</p>
      <br/>
      <p>class DualHeadNet(nn.Module):</p>
      <p className="pl-4">def __init__(self):</p>
      <p className="pl-8">super().__init__()</p>
      <p className="pl-8">self.shared = nn.Linear(512, 256)</p>
      <p className="pl-8">self.risk_head = nn.Linear(256, 1)</p>
      <p className="pl-8">self.feas_head = nn.Linear(256, 3)</p>
    </div>
  );
}

export function AudioWaveVisual() {
  const barsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.children;
    
    Array.from(bars).forEach((bar, i) => {
      gsap.to(bar, {
        height: "100%",
        duration: 0.2 + Math.random() * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.05
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 px-8 py-12 flex items-end justify-center gap-1 opacity-20 group-hover:opacity-50 transition-opacity pointer-events-none">
      <div ref={barsRef} className="flex items-end gap-2 h-24 w-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-full bg-cyber-amber h-4 rounded-t-sm" />
        ))}
      </div>
    </div>
  );
}

export function RadarVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none overflow-hidden">
      <div className="w-64 h-64 border border-cyber-emerald rounded-full absolute" />
      <div className="w-48 h-48 border border-cyber-emerald/50 rounded-full absolute" />
      <div className="w-32 h-32 border border-cyber-emerald/20 rounded-full absolute" />
      <div className="w-full h-[1px] bg-cyber-emerald/30 absolute" />
      <div className="h-full w-[1px] bg-cyber-emerald/30 absolute" />
      <div className="w-64 h-64 rounded-full absolute border-r border-cyber-emerald animate-spin" style={{ animationDuration: '3s' }} />
    </div>
  );
}

export function GridVisual() {
  return (
    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(var(--color-cyber-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyber-violet) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
    </div>
  );
}
