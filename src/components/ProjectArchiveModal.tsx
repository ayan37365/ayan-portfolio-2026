"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import gsap from "gsap";

const archiveProjects = [
  { title: "The Corner House", category: "Freelance / Hospitality", tech: "Next.js, Tailwind", link: "https://the-corner-house.vercel.app/" },
  { title: "Decentralized Exchange", category: "Web3 & DeFi", tech: "Solidity, React", link: "#" },
  { title: "Enterprise Dashboard", category: "AI & SaaS", tech: "Vue, Python", link: "#" },
  { title: "BOOKZY Architecture", category: "E-Commerce", tech: "Spring Boot, Next.js", link: "#" },
  { title: "ML Risk Engine API", category: "Machine Learning", tech: "FastAPI, PyTorch", link: "#" },
];

export default function ProjectArchiveModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-archive", handleOpen);
    return () => window.removeEventListener("open-archive", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".archive-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(".archive-drawer", { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const close = () => {
    gsap.to(".archive-overlay", { opacity: 0, duration: 0.3 });
    gsap.to(".archive-drawer", { x: "100%", duration: 0.4, ease: "power3.in", onComplete: () => setIsOpen(false) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="archive-overlay absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={close} />
      
      <div className="archive-drawer relative w-full md:w-[600px] h-full bg-[#030305] border-l border-white/10 p-8 md:p-12 overflow-y-auto">
        <button onClick={close} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">Project Archive</h2>
        <p className="font-mono text-xs text-cyber-cyan mb-12 uppercase tracking-widest">Complete Index</p>

        <div className="flex flex-col gap-6">
          {archiveProjects.map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noreferrer" className="group block p-6 border border-white/5 rounded-2xl hover:border-cyber-cyan/50 hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold group-hover:text-cyber-cyan transition-colors">{p.title}</h3>
                <ExternalLink size={16} className="text-white/30 group-hover:text-cyber-cyan" />
              </div>
              <p className="font-mono text-xs text-white/50 mb-4">{p.category}</p>
              <div className="flex gap-2">
                {p.tech.split(", ").map(t => (
                  <span key={t} className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
