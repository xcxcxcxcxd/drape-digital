import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Phone, CheckCircle2, Shield, Clock, MapPin, Star } from "lucide-react";

export default function LocksmithDemo() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-orange-500/30">
      <Helmet>
        <title>24/7 Locksmith Montreal | 20 Min Response</title>
      </Helmet>

      {/* ─── STICKY HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <Shield size={18} className="text-zinc-950" />
            </div>
            Apex<span className="text-white/50">Locks</span>
          </div>
          <a href="tel:5550123456" className="font-bold text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm md:text-base">
            <Phone size={16} />
            (555) 012-3456
          </a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available in Montreal right now
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1] mb-6">
              Locked out?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                We're 20 mins away.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Doors opened. Locks changed. Keys extracted. We get you back inside without breaking the bank or the door.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:5550123456" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                <Phone size={20} />
                Call (555) 012-3456
              </a>
              <div className="text-sm text-zinc-500 font-mono">
                From $85 • No hidden fees
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Clock, label: "20 Min ETA" },
              { icon: Shield, label: "Licensed & Insured" },
              { icon: MapPin, label: "Local to Montreal" },
              { icon: Star, label: "4.9/5 on Google" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-3 text-zinc-400"
              >
                <item.icon size={20} className="text-orange-500" />
                <span className="font-medium text-sm md:text-base">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What do you need done?</h2>
            <p className="text-zinc-500">Fixed prices. No surprises when we show up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Emergency Lockout", price: "$85", desc: "House or apartment. Non-destructive entry." },
              { title: "Lock Replacement", price: "$120", desc: "New cylinders. 3 keys included. High security options." },
              { title: "Broken Key Repair", price: "$95", desc: "Key snapped in the lock? We extract and cut a new one." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 border border-white/10 p-8 rounded-2xl hover:border-orange-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <span className="text-orange-500 font-mono font-bold">from {service.price}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-6">{service.desc}</p>
                <a href="tel:5550123456" className="text-sm font-bold flex items-center gap-2 hover:text-orange-500 transition-colors">
                  Request service <div className="w-4 h-[1px] bg-current" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">People in Montreal trust us.</h2>
            <div className="flex justify-center gap-1 text-orange-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Sarah M.", area: "Plateau-Mont-Royal", text: "Locked out at 2am. They answered immediately, arrived in 15 minutes, and had the door open in 5. Literal lifesavers." },
              { name: "David T.", area: "Downtown", text: "Clear pricing on the phone, no upselling at the door. Changed my locks after a break-in and made me feel secure again." }
            ].map((review, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-2xl border border-white/5">
                <p className="text-zinc-300 italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-500">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{review.name}</div>
                    <div className="text-xs text-zinc-500">{review.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA (Fixed on Mobile) ─── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10">
        <a href="tel:5550123456" className="w-full flex items-center justify-center gap-3 bg-orange-500 text-zinc-950 px-6 py-4 rounded-xl font-bold shadow-2xl">
          <Phone size={20} />
          Call Now (555) 012-3456
        </a>
      </div>

      <footer className="py-12 text-center text-zinc-600 text-sm pb-32 md:pb-12">
        <p>ApexLocks Montreal • Licensed Locksmith Service</p>
        <p className="mt-2">This is a fictional demo site built by Drape Digital.</p>
      </footer>
    </div>
  );
}
