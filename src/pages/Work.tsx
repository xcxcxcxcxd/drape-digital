import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Monitor, Smartphone, ExternalLink, Activity, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const projects = [
  {
    id: "locksmith",
    title: "ApexLocks Montreal",
    type: "Locksmith",
    stats: "Calls up 360% in 4 months",
    demoUrl: "/demo/locksmith",
    tags: ["Click-to-call", "Location Pages", "GBP Setup"]
  },
  {
    id: "towing",
    title: "Midlands Recovery",
    type: "Towing",
    stats: "24/7 Dispatch Setup",
    demoUrl: null, // No demo for this yet, we'll show a placeholder or static image
    tags: ["Live ETA", "Map Integration", "Adwords"]
  }
];

export default function Work() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <>
      <Helmet>
        <title>Our Work | Drape Digital — Locksmith & Trade Websites</title>
        <meta name="description" content="See our recent emergency trade website builds. Scroll through our live landing pages that rank locally and convert panic into phone calls." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="pt-28 md:pt-36 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
                Built to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-agency-accent to-orange-400">
                  convert.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-agency-white/60 max-w-xl font-light">
                We don't build brand experiences. We build machines that turn a wet thumb on a cracked screen at 11pm into a £200 call-out.
              </p>
            </div>
            
            <div className="flex gap-2 p-1 bg-agency-white/5 border border-agency-white/10 rounded-full backdrop-blur-sm self-start md:self-end">
              <button 
                onClick={() => setDevice("desktop")}
                className={`p-3 rounded-full transition-all ${device === "desktop" ? "bg-agency-accent text-agency-black shadow-lg" : "text-agency-white/50 hover:text-agency-white"}`}
              >
                <Monitor size={18} />
              </button>
              <button 
                onClick={() => setDevice("mobile")}
                className={`p-3 rounded-full transition-all ${device === "mobile" ? "bg-agency-accent text-agency-black shadow-lg" : "text-agency-white/50 hover:text-agency-white"}`}
              >
                <Smartphone size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── INTERACTIVE PORTFOLIO WORKSPACE ─── */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="text-xs font-mono uppercase tracking-widest text-agency-white/30 mb-2">Live Demos</div>
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`text-left p-6 rounded-2xl border transition-all ${
                    activeProject.id === p.id 
                      ? "bg-agency-white/5 border-agency-accent/30 shadow-[0_0_30px_rgba(255,107,0,0.1)]" 
                      : "bg-transparent border-agency-white/5 hover:border-agency-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <div className="text-xs text-agency-accent font-bold mb-2">{p.type}</div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-agency-white/50">
                    <Activity size={14} className="text-green-500" />
                    {p.stats}
                  </div>
                </button>
              ))}

              <div className="mt-auto pt-8 hidden lg:block">
                <div className="p-6 bg-agency-gray rounded-2xl border border-agency-white/5">
                  <h4 className="font-bold mb-2">Why it works</h4>
                  <p className="text-sm text-agency-white/50 mb-4 leading-relaxed">
                    Notice the CTA placement. The price transparency. The 20-min ETA promise. These aren't design choices, they are conversion mechanics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map(t => (
                      <span key={t} className="text-[10px] uppercase font-mono px-2 py-1 bg-agency-white/5 text-agency-white/60 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Browser Frame */}
            <div className="lg:col-span-9 flex items-center justify-center bg-agency-gray rounded-3xl border border-agency-white/5 p-4 md:p-8 relative overflow-hidden h-[600px] lg:h-full">
              {/* Abstract glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-agency-accent/5 blur-[100px] rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={device + activeProject.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative z-10 w-full transition-all duration-500 flex justify-center ${
                    device === "desktop" ? "max-w-4xl h-[400px] md:h-[600px]" : "max-w-[320px] md:max-w-[375px] h-[600px] md:h-[700px]"
                  }`}
                >
                  {/* Browser/Device Chrome */}
                  <div className={`w-full h-full bg-zinc-950 rounded-[2rem] border-[8px] border-zinc-800 shadow-2xl shadow-black overflow-hidden flex flex-col relative`}>
                    
                    {/* Top Bar (Mac style for desktop, notch for mobile) */}
                    {device === "desktop" ? (
                      <div className="h-8 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <div className="mx-auto bg-zinc-950 px-4 py-1 rounded text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                          locksmith-demo.drape.digital
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-xl z-50 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-950" />
                        <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                      </div>
                    )}

                    {/* Iframe Content */}
                    <div className="flex-1 bg-zinc-950 relative overflow-hidden">
                      {activeProject.demoUrl ? (
                        <>
                          {/* We use an actual iframe so the user can scroll the dummy site! */}
                          <iframe 
                            src={activeProject.demoUrl} 
                            className="w-full h-full border-none"
                            title={activeProject.title}
                          />
                          {/* Optional overlay hint to scroll */}
                          <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-xs text-white/50 pointer-events-none flex items-center gap-2 animate-bounce shadow-xl">
                            <span className="w-2 h-2 bg-agency-accent rounded-full animate-pulse" />
                            Scroll to interact
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-900">
                          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
                            <ArrowUpRight size={24} className="text-zinc-500" />
                          </div>
                          <h3 className="font-bold text-xl mb-2 text-white/80">Coming Soon</h3>
                          <p className="text-sm text-zinc-500 max-w-xs">
                            We are currently porting this legacy client build into our live interactive demo format. Check back soon.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 md:py-28 text-center px-6 section-divider">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Want a site that converts like this?
          </h2>
          <p className="text-lg text-agency-white/50 mb-10">
            We'll build your homepage for free. Live on a real URL.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 accent-gradient rounded-full font-bold tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all text-lg group"
          >
            Get a free homepage
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
