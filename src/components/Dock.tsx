"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Monitor, Volume2, VolumeX, Mail, Code, Globe, Box, Network } from "lucide-react";

function DockItem({ href, icon: Icon, tooltip, onClick }: any) {
  return (
    <div className="relative group">
      {href ? (
        <a href={href} className="dock-item p-3 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white flex items-center justify-center relative">
          <Icon size={20} />
          {/* Active glow indicator could be driven by intersection observer, omitting for brevity */}
          <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </a>
      ) : (
        <button onClick={onClick} className="dock-item p-3 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white flex items-center justify-center relative">
          <Icon size={20} />
          <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      )}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {tooltip}
      </div>
    </div>
  );
}

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!dockRef.current) return;
    
    const items = dockRef.current.querySelectorAll(".dock-item");
    
    items.forEach((item) => {
      const htmlItem = item as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = htmlItem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(htmlItem, {
          x: x * 0.3,
          y: y * 0.3,
          scale: 1.15,
          duration: 0.4,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(htmlItem, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      };
      
      htmlItem.addEventListener("mousemove", handleMouseMove);
      htmlItem.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        htmlItem.removeEventListener("mousemove", handleMouseMove);
        htmlItem.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]">
      <div 
        ref={dockRef}
        className="glass-card rounded-full px-4 py-3 flex items-center gap-2 md:gap-4 border border-white/10 shadow-2xl backdrop-blur-xl bg-[#030305]/80"
      >
        <DockItem href="#home" icon={Box} tooltip="Overview" />
        <DockItem href="#radar" icon={Network} tooltip="Tech Stack" />
        
        <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
        
        <DockItem href="#projects" icon={Monitor} tooltip="Featured Flagships" />
        <DockItem 
          onClick={() => window.dispatchEvent(new CustomEvent('open-archive'))} 
          icon={Code} 
          tooltip="Project Archive" 
        />
        
        <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
        
        <DockItem href="https://the-corner-house.vercel.app/" icon={Globe} tooltip="Live Demo" />
        <DockItem href="#contact" icon={Mail} tooltip="Direct Booking" />
        
        <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
        
        <DockItem 
          onClick={() => {
            setMuted(!muted);
            const video = document.querySelector('video, audio');
            if(video) (video as any).muted = !muted;
          }} 
          icon={muted ? VolumeX : Volume2} 
          tooltip="Toggle Audio" 
        />
      </div>
    </div>
  );
}
