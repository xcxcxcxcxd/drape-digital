import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, Clock, Loader2, Lock } from "lucide-react";

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

// Simple helper to generate some future dates
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Skip weekends for simplicity
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(d);
    }
  }
  return dates.slice(0, 5); // Just show 5 available days
};

const availableTimes = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export default function Contact() {
  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    trade: "",
    currentSite: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    if (!formData.name || !formData.email || !formData.businessName || !formData.trade) {
      return;
    }

    setStatus("loading");
    try {
      // Use the existing Stripe checkout endpoint for the $10 deposit
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: "Strategy Call Deposit",
          packageName: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
          price: "10",
          currency: "USD",
          slug: "contact",
        }),
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Book a Call | Drape Digital</title>
        <meta name="description" content="Book a 15-minute strategy call. $10 refundable deposit to filter spam. We build websites for emergency call-out trades." />
      </Helmet>

      <section className="min-h-screen pt-28 md:pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* ─── LEFT: Copy ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
                Book a 15-minute call.
              </h1>
              <div className="section-prose space-y-6">
                <p>
                  No sales pitch. No deck. We just need to ask you about your prices, your service area, and the jobs you turn down.
                </p>
                <p>
                  Then we build your homepage and send you a live link in 3 days.
                </p>
              </div>

              <div className="mt-10 bg-agency-accent/5 border border-agency-accent/20 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3 text-agency-accent font-bold">
                  <Lock size={18} />
                  <span>The $10 Deposit</span>
                </div>
                <p className="text-sm text-agency-white/70 leading-relaxed">
                  We charge a $10 USD deposit to book a slot. This filters out automated spam and tyre-kickers. 
                  The $10 is fully credited toward your setup fee if you become a client, or immediately refunded if we determine we can't help you on the call.
                </p>
              </div>
            </motion.div>

            {/* ─── RIGHT: Scheduler ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-agency-gray rounded-2xl border border-agency-white/5 p-8"
            >
              <form onSubmit={handleBooking} className="space-y-8">
                
                {/* 1. Date & Time */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-agency-accent" />
                    1. Select Date & Time
                  </h3>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4 snap-x no-scrollbar">
                    {dates.map((date, i) => {
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                          className={`snap-start shrink-0 px-4 py-3 rounded-xl border text-left transition-all ${
                            isSelected 
                              ? "bg-agency-accent/10 border-agency-accent" 
                              : "bg-agency-white/5 border-agency-white/10 hover:border-agency-white/30"
                          }`}
                        >
                          <span className="block text-xs uppercase tracking-widest text-agency-white/50 mb-1">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </span>
                          <span className={`block text-lg font-bold ${isSelected ? "text-agency-accent" : "text-agency-white"}`}>
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-3 sm:grid-cols-5 gap-2"
                      >
                        {availableTimes.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-agency-accent text-agency-black border-agency-accent"
                                  : "bg-agency-white/5 border-agency-white/10 text-agency-white/70 hover:border-agency-white/30"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Details */}
                <div className={`transition-opacity duration-300 ${(!selectedDate || !selectedTime) ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-agency-accent" />
                    2. Your Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-agency-white/50 mb-1.5 block uppercase tracking-widest">Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm focus:border-agency-accent/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-agency-white/50 mb-1.5 block uppercase tracking-widest">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm focus:border-agency-accent/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-agency-white/50 mb-1.5 block uppercase tracking-widest">Business Name *</label>
                        <input
                          type="text"
                          name="businessName"
                          required
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm focus:border-agency-accent/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-agency-white/50 mb-1.5 block uppercase tracking-widest">Trade *</label>
                        <select
                          name="trade"
                          required
                          value={formData.trade}
                          onChange={handleChange}
                          className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 text-sm focus:border-agency-accent/50 focus:outline-none transition-colors appearance-none"
                        >
                          <option value="" disabled>Select trade</option>
                          {tradeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t border-agency-white/10 transition-opacity duration-300 ${(!selectedDate || !selectedTime) ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-lg shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all flex items-center justify-center gap-2 group"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={18} className="animate-spin" /> Redirecting to Stripe...</>
                    ) : (
                      <>
                        Pay $10 & Confirm Booking
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-3">
                      Payment initialization failed. Please try again.
                    </p>
                  )}
                </div>

              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
