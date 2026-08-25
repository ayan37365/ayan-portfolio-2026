"use client";

import { ExternalLink } from "lucide-react";

const domains = [
  {
    title: "High-End Restaurant & Hospitality",
    project: "The Corner House",
    link: "https://the-corner-house.vercel.app/",
    description: "Immersive food storytelling, luxury editorial typography, dynamic reservation workflows, responsive menu exploration."
  },
  {
    title: "Web3 & DeFi Platforms",
    project: "Decentralized Exchanges",
    link: "#",
    description: "Interactive dApp frontends, token swap interfaces, wallet-connect flows, gas tracker widgets, and real-time on-chain analytics."
  },
  {
    title: "AI & SaaS Web Applications",
    project: "Enterprise Dashboards",
    link: "#",
    description: "High-conversion landing pages, real-time analytics dashboards, AI model playground interfaces, and live streaming WebRTC pipelines."
  },
  {
    title: "Booking & E-Commerce Microservices",
    project: "BOOKZY Architecture",
    link: "#",
    description: "Dynamic scheduling flows, flight/travel aggregation patterns, and Cal.com embedded booking panels."
  }
];

export default function ClientShowcase() {
  return (
    <section className="relative w-full bg-cyber-bg z-20 px-6 md:px-12 py-32 overflow-hidden border-t border-cyber-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-cyber-amber tracking-widest uppercase mb-4">// Specialized Domains</h2>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-amber to-cyber-violet">Demos</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domains.map((domain, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-cyber-border hover:border-cyber-amber/50 transition-colors group cursor-pointer">
              <h4 className="font-mono text-xs tracking-widest text-cyber-cyan mb-4 uppercase">{domain.title}</h4>
              <div className="flex justify-between items-start mb-6">
                <h5 className="text-3xl font-bold tracking-tight text-white group-hover:text-cyber-amber transition-colors">{domain.project}</h5>
                <a href={domain.link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-amber group-hover:text-black transition-colors">
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
