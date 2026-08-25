import Scene from "@/components/Scene";
import BentoGrid from "@/components/BentoGrid";
import HorizontalGallery from "@/components/HorizontalGallery";
import Marquee from "@/components/Marquee";
import ContactTerminal from "@/components/ContactTerminal";
import Dock from "@/components/Dock";
import { ArrowDown } from "lucide-react";

import ClientShowcase from "@/components/ClientShowcase";

import HeroHeadline from "@/components/HeroHeadline";
import ProjectArchiveModal from "@/components/ProjectArchiveModal";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden" id="home">
      {/* Top Navbar Label */}
      <div className="absolute top-8 left-8 z-50 mix-blend-difference pointer-events-auto flex items-center justify-between w-[calc(100%-4rem)]">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">
          Ayan Saha <span className="text-cyber-cyan mx-2">//</span> <span className="text-white">Portfolio 2026</span>
        </span>
        
        <div className="flex items-center gap-2 bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(5,255,161,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
          AVAILABLE FOR FREELANCE BUILDS (Q3-Q4)
        </div>
      </div>

      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Scene />
        <div className="z-10 flex flex-col items-center justify-center mix-blend-difference pointer-events-auto px-6 text-center max-w-2xl mx-auto pb-24 mt-20">
          
          <HeroHeadline />
          
          <div className="font-mono text-xs sm:text-sm text-zinc-400 tracking-widest uppercase mt-4 mb-8 py-3 px-6 rounded-full bg-black/40 border border-white/5 backdrop-blur-md shadow-2xl">
            // [ FULL-STACK • CREATIVE CODE • SMART CONTRACTS ]
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-4 my-8">
            <a href="#projects" className="group relative px-8 py-4 bg-[#030305] overflow-hidden rounded-full border border-cyber-cyan/30 hover:border-cyber-cyan transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 transition-colors duration-500 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
                EXPLORE WORK
              </span>
            </a>
            
            <a href="#contact" className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:bg-white/90">
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0),rgba(255,255,255,0.5),rgba(0,0,0,0))] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm tracking-widest uppercase font-bold">
                START A PROJECT
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/30 z-10 font-mono text-xs pointer-events-none">
          <span>SCROLL TO INITIALIZE</span>
          <ArrowDown size={16} />
        </div>
      </section>

      <div id="radar"><BentoGrid /></div>
      <div id="projects"><HorizontalGallery /></div>
      <Marquee />
      
      {/* Spacer for 3D Camera Warp Tunnel transition */}
      <section className="h-[50vh] w-full bg-transparent flex items-center justify-center relative z-10 pointer-events-none">
        <div className="text-center">
          <span className="font-mono text-cyber-cyan tracking-widest text-sm uppercase block mb-4">Entering the Lab</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase text-white/10">Experimental</h2>
        </div>
      </section>

      <ClientShowcase />
      <div id="contact"><ContactTerminal /></div>
      
      <Dock />
      <ProjectArchiveModal />
    </main>
  );
}
