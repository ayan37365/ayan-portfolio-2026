"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, MoveLeft, ChevronRight, ChevronLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: "The Corner House", 
    category: "Luxury Hospitality Platform", 
    detail: "High-conversion bespoke hospitality platform featuring interactive menu curation and reservation workflows.", 
    tags: ["Next.js", "Bespoke UI/UX", "Client Work", "Production Live"],
    color: "bg-cyber-violet/10", 
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop",
    link: "https://the-corner-house.vercel.app/" 
  },
  { 
    id: 2, 
    title: "VeriStream", 
    category: "AI Presence & Verification Engine", 
    detail: "Real-time MediaPipe facial liveness challenges, Typing DNA dynamics tracking, and SHA-256 state proofs anchored directly to Polygon Testnet via MetaMask.", 
    tags: ["MediaPipe", "WebRTC", "Polygon", "FastAPI"],
    color: "bg-cyber-cyan/10", 
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop",
    link: "https://github.com/ayan37365",
    linkText: "GitHub & Case Study"
  },
  { 
    id: 3, 
    title: "Project Risk Engine", 
    category: "Deep Learning & Predictive AI", 
    detail: "Custom dual-head PyTorch neural net for risk regression and feasibility scoring, integrated with a RAG vector retrieval pipeline and FastAPI endpoints.", 
    tags: ["PyTorch", "RAG Pipeline", "FastAPI"],
    color: "bg-cyber-amber/10", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    link: "https://github.com/ayan37365",
    linkText: "View on GitHub"
  },
  { 
    id: 4, 
    title: "Trust Ledger", 
    category: "Governance Protocol", 
    detail: "Gas-optimized Solidity governance suite (25%+ gas reduction), Slither-audited access control, and React/Ethers.js integration.", 
    tags: ["Solidity", "Foundry", "EVM Gas Optimization", "Ethers.js"],
    color: "bg-cyber-emerald/10", 
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2000&auto=format&fit=crop",
    link: "https://github.com/ayan37365",
    linkText: "View Repository"
  },
  { 
    id: 5, 
    title: "Vector Visionary & BOOKZY", 
    category: "Computer Vision & Microservices", 
    detail: "YOLOv8 visual indexing engine linking frontend microservices with FastAPI for personalized learning trees, alongside Spring Boot booking architecture.", 
    tags: ["YOLOv8", "Spring Boot", "Full-Stack Architecture"],
    color: "bg-cyber-cyan/10", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    link: "https://github.com/ayan37365",
    linkText: "View on GitHub"
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = projects.length + 1; // including the archive slide

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    if (!container || !wrapper) return;

    const sections = gsap.utils.toArray(".gallery-item");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
        fastScrollEnd: true,
        preventOverlaps: true,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.15, max: 0.35 },
          delay: 0.05,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const slide = Math.min(
            totalSlides,
            Math.max(1, Math.ceil(progress * totalSlides))
          );
          setCurrentSlide(slide);
        }
      }
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, [totalSlides]);

  const scrollToSlide = (dir: "prev" | "next") => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;
    
    const targetSlide = dir === "prev" ? currentSlide - 1 : currentSlide + 1;
    if (targetSlide < 1 || targetSlide > totalSlides) return;
    
    const progress = (targetSlide - 1) / (totalSlides - 1);
    
    // We get the ScrollTrigger instance to find the start and end values
    const st = ScrollTrigger.getAll().find(st => st.trigger === container);
    if (st) {
      const scrollPos = st.start + (st.end - st.start) * progress;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-cyber-bg overflow-hidden flex flex-col justify-center border-t border-cyber-border">
      <div className="absolute top-20 left-10 z-50 flex items-center gap-4 text-cyber-cyan font-mono text-sm tracking-widest uppercase">
        <span>Flagship Projects</span>
        <MoveRight size={16} />
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-10 left-10 z-50 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToSlide("prev")}
            disabled={currentSlide === 1}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-cyber-cyan transition-all duration-300 active:scale-90 active:bg-white/20 disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent backdrop-blur-md"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => scrollToSlide("next")}
            disabled={currentSlide === totalSlides}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-cyber-cyan transition-all duration-300 active:scale-90 active:bg-white/20 disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent backdrop-blur-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="font-mono text-sm tracking-widest text-white/50">
          <span className="text-white">0{currentSlide}</span> / 0{totalSlides}
        </div>
      </div>
      
      <div ref={wrapperRef} className="flex h-[60vh] w-[600vw] sm:w-[500vw] lg:w-[450vw]">
        {projects.map((p, i) => (
          <div 
            key={p.id} 
            className="gallery-item relative h-full w-screen px-10 md:px-20 py-10 flex flex-col justify-end"
          >
            <div className={`relative h-full w-full rounded-2xl border border-cyber-border ${p.color} overflow-hidden group glass-card transition-all duration-700 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]`}>
              {/* Background Image with hover zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-60"
                style={{ backgroundImage: `url(${p.image})` }}
              ></div>
              
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute top-8 right-8 z-20">
                <a href={p.link} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                  {p.linkText || "Live Action"}
                </a>
              </div>

              <div className="absolute bottom-10 left-10 right-10 z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-xs tracking-widest text-cyber-cyan uppercase">{p.category}</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:text-white transition-colors duration-500 mb-4 drop-shadow-lg">{p.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/70 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-white/80 font-sans max-w-2xl text-sm md:text-base leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 drop-shadow-md">{p.detail}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="gallery-item relative h-full w-screen px-10 md:px-20 py-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 text-white/50">End of Featured Work</h2>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-archive'))} className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-cyber-cyan transition-all">
            <div className="absolute inset-0 bg-cyber-cyan/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-white group-hover:text-cyber-cyan transition-colors">
              EXPLORE FULL ARCHIVE
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
