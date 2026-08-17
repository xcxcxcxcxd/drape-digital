import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Our Work | Drape Digital — Locksmith & Trade Websites</title>
        <meta name="description" content="See our recent emergency trade website builds. We build sites that rank locally and convert panic into phone calls." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
              Built to convert.
            </h1>
            <p className="text-lg text-agency-white/60 max-w-xl">
              We don't build brand experiences. We build machines that turn a wet thumb on a cracked screen at 11pm into a £200 call-out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CASE STUDIES ─── */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-32">
            {/* Project 1: Montreal Locksmith (Placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
            >
              {/* Phone Mockups (Placeholder visual) */}
              <div className="w-full lg:w-1/2 flex justify-center gap-6 relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-agency-accent/5 rounded-full blur-[100px]" />
                
                {/* Before */}
                <div className="phone-frame mt-12 opacity-50 grayscale scale-95 origin-bottom">
                  <div className="phone-frame-inner bg-agency-gray w-full aspect-[9/19] flex items-center justify-center p-6 text-center border border-agency-white/10">
                    <span className="text-sm font-bold text-agency-white/30">BEFORE<br />(Generic Template)</span>
                  </div>
                </div>
                {/* After */}
                <div className="phone-frame relative z-10">
                  <div className="phone-frame-inner bg-agency-gray-light w-full aspect-[9/19] flex items-center justify-center p-6 text-center border border-agency-accent/30 shadow-[0_0_30px_rgba(255,107,0,0.15)]">
                    <span className="text-sm font-bold text-agency-accent">AFTER<br />(High-Conversion)</span>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-4">
                  <span className="w-6 h-[1px] bg-agency-accent-dark" />
                  <span>Locksmith • Montreal, QC</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  From 3 calls a week to 14.
                </h2>
                <div className="text-xs font-mono text-agency-white/40 mb-6 bg-agency-white/5 inline-block px-3 py-1.5 rounded-full">
                  166 pages · broken link cleanup · schema rebuild · knowledge panel
                </div>
                <div className="section-prose space-y-4 mb-8">
                  <p>
                    The starting point: a 166-page locksmith site full of auto-generated location pages. "Proudly serving [Neighbourhood]." Google ranked exactly none of them.
                  </p>
                  <p>
                    We deleted 126 pages and kept 40 — one for each area the locksmith actually dispatches to. We rewrote every page with real content: housing stock types, specific lock types for those buildings, and real response times.
                  </p>
                  <p>
                    By month four, 18 pages hit the top 20 for their target neighbourhoods. Calls went from 3/week to 14/week. The client had to hire a second tech.
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-agency-white/70">
                    <CheckCircle2 size={16} className="text-agency-accent shrink-0" />
                    Deleted 126 low-value programmatic pages
                  </li>
                  <li className="flex items-center gap-2 text-sm text-agency-white/70">
                    <CheckCircle2 size={16} className="text-agency-accent shrink-0" />
                    Built 40 highly-specific local service pages
                  </li>
                  <li className="flex items-center gap-2 text-sm text-agency-white/70">
                    <CheckCircle2 size={16} className="text-agency-accent shrink-0" />
                    Implemented full LocalBusiness schema
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Project 2: Towing (Placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center"
            >
              <div className="w-full lg:w-1/2 flex justify-center gap-6 relative">
                <div className="absolute inset-0 bg-agency-accent/5 rounded-full blur-[100px]" />
                <div className="phone-frame mt-12 opacity-50 grayscale scale-95 origin-bottom">
                  <div className="phone-frame-inner bg-agency-gray w-full aspect-[9/19] flex items-center justify-center border border-agency-white/10">
                    <span className="text-sm font-bold text-agency-white/30 text-center px-4">BEFORE<br />(Stock Photos)</span>
                  </div>
                </div>
                <div className="phone-frame relative z-10">
                  <div className="phone-frame-inner bg-agency-gray-light w-full aspect-[9/19] flex items-center justify-center border border-agency-accent/30 shadow-[0_0_30px_rgba(255,107,0,0.15)]">
                    <span className="text-sm font-bold text-agency-accent text-center px-4">AFTER<br />(Dispatch Ready)</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-4">
                  <span className="w-6 h-[1px] bg-agency-accent-dark" />
                  <span>Towing • Birmingham, UK</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Killing the "stock photo" problem.
                </h2>
                <div className="text-xs font-mono text-agency-white/40 mb-6 bg-agency-white/5 inline-block px-3 py-1.5 rounded-full">
                  12 pages · click-to-call · GBP posting · review flow
                </div>
                <div className="section-prose space-y-4 mb-8">
                  <p>
                    Most towing sites look identical because they all use the same four stock photos of flatbeds. This client had a great fleet but a site that looked like a scam.
                  </p>
                  <p>
                    We stripped the generic copy and focused on ETA. "25 minutes in Central, 40 minutes M6 corridor." We added real photos of their actual trucks and a call button that follows the thumb.
                  </p>
                </div>
              </div>
            </motion.div>
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
            Want your site to look like the "After"?
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
