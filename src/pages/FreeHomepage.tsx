import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const tradeOptions = [
  "Locksmith",
  "Towing",
  "Garage Door",
  "HVAC",
  "Electrician",
  "Plumber",
  "Water Damage / Restoration",
  "Glazier",
  "Roofer",
  "Other emergency trade",
];

export default function FreeHomepage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    trade: "",
    currentSite: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName || !formData.trade) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/free-homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Get a Free Homepage | Drape Digital</title>
        <meta name="description" content="We'll rebuild your homepage for free. Live on a real URL. You see it before you pay anything. For locksmiths, towing, garage doors, HVAC, and emergency trades." />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ─── LEFT: Pitch ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
                We'll rebuild your homepage.{" "}
                <span className="text-agency-accent">Free.</span>
              </h1>
              <p className="text-lg text-agency-white/60 mb-8 leading-relaxed">
                You'll see it live on a real URL before we ask for anything.
                If it's not better than what you've got, keep the files and we'll leave you alone.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "15-minute phone call to learn your prices and your patch",
                  "Working homepage in three days, live on a real link",
                  "No login, no deck, no PDF — a working page",
                  "Your name, your number, your actual prices on it",
                  "Don't like it? Keep the files. No follow-up.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-agency-white/70">
                    <CheckCircle2 size={18} className="text-agency-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-agency-white/30">
                This is not a PDF audit. It's a working page with your business on it.
                It costs us about an hour. It costs you nothing.
              </p>
            </motion.div>

            {/* ─── RIGHT: Form ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-agency-gray rounded-2xl border border-agency-white/5 p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-agency-green/10 text-agency-green rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Request received</h3>
                    <p className="text-agency-white/50">
                      We'll be in touch within 24 hours to schedule the 15-minute call.
                      Check your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="fh-name" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Your name *
                      </label>
                      <input
                        type="text"
                        id="fh-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm placeholder-agency-white/20 focus:border-agency-accent/50 focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label htmlFor="fh-email" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="fh-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm placeholder-agency-white/20 focus:border-agency-accent/50 focus:outline-none transition-colors"
                        placeholder="john@business.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="fh-phone" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="fh-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm placeholder-agency-white/20 focus:border-agency-accent/50 focus:outline-none transition-colors"
                        placeholder="+44 7700 900000"
                      />
                    </div>

                    <div>
                      <label htmlFor="fh-business" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Business name *
                      </label>
                      <input
                        type="text"
                        id="fh-business"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm placeholder-agency-white/20 focus:border-agency-accent/50 focus:outline-none transition-colors"
                        placeholder="Dave's Locks Ltd"
                      />
                    </div>

                    <div>
                      <label htmlFor="fh-trade" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Trade *
                      </label>
                      <select
                        id="fh-trade"
                        name="trade"
                        required
                        value={formData.trade}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm text-agency-white/80 focus:border-agency-accent/50 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" disabled>Select your trade</option>
                        {tradeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="fh-site" className="text-sm font-medium text-agency-white/70 mb-1.5 block">
                        Current website (if any)
                      </label>
                      <input
                        type="url"
                        id="fh-site"
                        name="currentSite"
                        value={formData.currentSite}
                        onChange={handleChange}
                        className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm placeholder-agency-white/20 focus:border-agency-accent/50 focus:outline-none transition-colors"
                        placeholder="https://mysite.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-lg shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all flex items-center justify-center gap-2 group"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending...</>
                      ) : (
                        <>
                          Request free homepage
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center">
                        Something went wrong. Try again or email contact@drape.digital.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
