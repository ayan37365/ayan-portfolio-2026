"use client";

import { useState } from "react";
import { Terminal, Send, Copy, Calendar, CheckCircle2 } from "lucide-react";

export default function ContactTerminal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("ayan37365@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white">Start a Project</h2>
          <p className="font-mono text-sm text-cyber-cyan tracking-widest uppercase">Available for Q3-Q4 Freelance Contracts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions / Info */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col gap-4 bg-[#030305]/80 backdrop-blur-xl">
              <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest">Direct Contact</h3>
              <button 
                onClick={handleCopy}
                className="group w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-cyan rounded-xl transition-all"
              >
                <span className="font-mono text-sm text-white group-hover:text-cyber-cyan transition-colors">ayan37365@gmail.com</span>
                {copied ? <CheckCircle2 size={16} className="text-cyber-emerald" /> : <Copy size={16} className="text-white/50 group-hover:text-cyber-cyan" />}
              </button>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col gap-4 bg-[#030305]/80 backdrop-blur-xl h-full">
              <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest">Consultation</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">Book a 15-minute discovery call to discuss your architecture or bespoke UI needs.</p>
              <a 
                href="https://cal.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-full mt-auto flex items-center justify-center gap-2 p-4 bg-white text-black hover:bg-white/90 rounded-xl font-bold font-mono text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Calendar size={16} /> Schedule Call
              </a>
            </div>
          </div>

          {/* Terminal Form */}
          <div className="col-span-1 lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col bg-[#030305]/80 backdrop-blur-xl">
            <div className="w-full h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-4 font-mono text-[10px] text-white/40 flex items-center gap-2 uppercase tracking-widest">
                <Terminal size={14} /> Quote_Request.sh
              </span>
            </div>

            <form className="p-6 md:p-8 flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group">
                  <label className="font-mono text-xs text-cyber-cyan uppercase tracking-widest group-focus-within:text-white transition-colors">Name</label>
                  <input type="text" placeholder="John Doe" className="bg-transparent border-b border-white/20 px-0 py-2 text-white font-sans focus:outline-none focus:border-cyber-cyan transition-colors" />
                </div>
                <div className="flex flex-col gap-3 group">
                  <label className="font-mono text-xs text-cyber-cyan uppercase tracking-widest group-focus-within:text-white transition-colors">Email</label>
                  <input type="email" placeholder="john@company.com" className="bg-transparent border-b border-white/20 px-0 py-2 text-white font-sans focus:outline-none focus:border-cyber-cyan transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group">
                  <label className="font-mono text-xs text-cyber-cyan uppercase tracking-widest group-focus-within:text-white transition-colors">Project Category</label>
                  <select className="bg-transparent border-b border-white/20 px-0 py-2 text-white/70 font-sans focus:outline-none focus:border-cyber-cyan transition-colors appearance-none cursor-pointer">
                    <option className="bg-black">Hospitality Web</option>
                    <option className="bg-black">Web3 dApp</option>
                    <option className="bg-black">AI Integration</option>
                    <option className="bg-black">Custom Build</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 group">
                  <label className="font-mono text-xs text-cyber-cyan uppercase tracking-widest group-focus-within:text-white transition-colors">Budget Bracket</label>
                  <select className="bg-transparent border-b border-white/20 px-0 py-2 text-white/70 font-sans focus:outline-none focus:border-cyber-cyan transition-colors appearance-none cursor-pointer">
                    <option className="bg-black">$2k - $5k</option>
                    <option className="bg-black">$5k - $10k</option>
                    <option className="bg-black">$10k+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <label className="font-mono text-xs text-cyber-cyan uppercase tracking-widest group-focus-within:text-white transition-colors">Project Brief</label>
                <textarea rows={4} placeholder="Tell me about your vision..." className="bg-transparent border-b border-white/20 px-0 py-2 text-white font-sans focus:outline-none focus:border-cyber-cyan transition-colors resize-none"></textarea>
              </div>

              <button className="mt-2 group relative px-8 py-4 bg-transparent overflow-hidden rounded-xl border border-white/20 transition-all hover:border-cyber-cyan flex justify-center items-center">
                <div className="absolute inset-0 bg-cyber-cyan/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-white group-hover:text-cyber-cyan font-bold transition-colors">
                  Submit Request <Send size={16} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
