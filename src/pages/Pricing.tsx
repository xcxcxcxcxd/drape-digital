import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Phone, Loader2 } from "lucide-react";

const tiers = [
  {
    name: "The Call Machine",
    tagline: "Get the phone ringing",
    setup: "$997",
    monthly: "$299",
    monthlySuffix: "/mo",
    soldTo: "The guy with no site or a 2014 site.",
    timeline: "2 weeks",
    includes: [
      "8–12 page website",
      "Click-to-call fixed to viewport",
      "LocalBusiness schema markup",
      "Google Business Profile setup",
      "Call tracking number",
      "Mobile-first design",
      "Basic on-page SEO",
    ],
    doesNot: [
      "Location pages",
      "Ongoing SEO",
      "Google Ads",
    ],
  },
  {
    name: "Coverage",
    tagline: "Rank locally, month by month",
    setup: "$1,497",
    monthly: "$599",
    monthlySuffix: "/mo",
    soldTo: "The guy who has a site and can't work out why the phone doesn't ring.",
    timeline: "Ongoing after 2-week build",
    featured: true,
    includes: [
      "Everything in The Call Machine",
      "Location pages (1–2 per month)",
      "Monthly job-photo posting to GBP",
      "Review collection SMS flow",
      "Monthly one-page call report",
      "NAP citation cleanup",
      "Quarterly site health audit",
    ],
    doesNot: [
      "Google Ads management",
      "Local Services Ads",
    ],
  },
  {
    name: "Full Book",
    tagline: "Ads + organic. Fill the schedule.",
    setup: "$1,997",
    monthly: "$997",
    monthlySuffix: "/mo + ad spend",
    soldTo: "The guy with two vans who wants four.",
    timeline: "Ongoing",
    includes: [
      "Everything in Coverage",
      "Google Ads setup & management",
      "Local Services Ads management",
      "Bid optimisation",
      "Click-fraud monitoring",
      "Monthly ROI report (calls, cost per lead)",
      "Ad creative A/B testing",
    ],
    doesNot: [],
  },
];

export default function Pricing() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (e: React.MouseEvent, tierName: string, priceString: string) => {
    e.preventDefault();
    setLoadingTier(tierName);
    try {
      const numericPrice = priceString.replace(/\D/g, "");
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: "Website Build",
          packageName: tierName,
          price: numericPrice,
          currency: "USD",
          slug: "pricing",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed.");
        setLoadingTier(null);
      }
    } catch {
      alert("Payment initialization failed.");
      setLoadingTier(null);
    }
  };
  return (
    <>
      <Helmet>
        <title>Pricing | Drape Digital — Websites for Emergency Trades</title>
        <meta name="description" content="Three tiers. Real numbers. Setup from $997, monthly from $299. No custom quotes, no hourly billing. Websites for locksmiths, towing, garage doors, HVAC." />
      </Helmet>

      {/* ─── HEADER ─── */}
      <section className="pt-28 md:pt-36 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
              Real prices.<br />
              <span className="text-agency-white/30">No custom quotes.</span>
            </h1>
            <p className="text-lg text-agency-white/60 max-w-xl">
              Pick a tier. If none of them fit, we'll tell you on the call. We'd rather lose
              a sale than build something that doesn't work for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING CARDS ─── */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`${tier.featured ? "pricing-card-featured" : "pricing-card"} flex flex-col`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-8 bg-agency-accent text-agency-black text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">{tier.name}</h2>
                  <p className="text-sm text-agency-white/40">{tier.tagline}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-agency-accent">{tier.setup}</span>
                    <span className="text-sm text-agency-white/40">setup</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-agency-white/70">{tier.monthly}</span>
                    <span className="text-sm text-agency-white/40">{tier.monthlySuffix}</span>
                  </div>
                </div>

                <p className="text-sm text-agency-white/50 italic mb-6 pb-6 border-b border-agency-white/5">
                  {tier.soldTo}
                </p>

                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">Timeline</span>
                  <span className="text-sm font-medium text-agency-white/70">{tier.timeline}</span>
                </div>

                <div className="mb-6 flex-1">
                  <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">Includes</span>
                  <ul className="space-y-2.5">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-agency-white/70">
                        <CheckCircle2 size={15} className="text-agency-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.doesNot.length > 0 && (
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">Does not include</span>
                    <ul className="space-y-1.5">
                      {tier.doesNot.map((item, j) => (
                        <li key={j} className="text-sm text-agency-white/30">&times; {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-3 w-full">
                  <button
                    onClick={(e) => handleCheckout(e, tier.name, tier.setup)}
                    disabled={loadingTier === tier.name}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm tracking-tight transition-all ${
                      tier.featured
                        ? "accent-gradient shadow-lg shadow-agency-accent/20 hover:shadow-agency-accent/40 text-agency-black"
                        : "bg-agency-accent text-agency-black hover:bg-agency-accent-dark"
                    }`}
                  >
                    {loadingTier === tier.name ? (
                      <><Loader2 size={16} className="animate-spin" /> Redirecting...</>
                    ) : (
                      <>Pay {tier.setup} Setup Fee</>
                    )}
                  </button>
                  <Link
                    to="/contact"
                    className="w-full text-center py-4 rounded-full font-bold text-sm tracking-tight transition-all bg-agency-white/5 border border-agency-white/10 hover:bg-agency-white/10 text-agency-white"
                  >
                    Book strategy call ($10)
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALL ROUTING ADD-ON ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bg-agency-gray rounded-2xl border border-agency-white/5 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="w-14 h-14 bg-agency-accent/10 rounded-2xl flex items-center justify-center shrink-0">
              <Phone size={24} className="text-agency-accent" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-4 mb-4">
                <h3 className="text-2xl font-bold">Call routing add-on</h3>
                <span className="text-xl font-bold text-agency-accent">$79/mo</span>
                <span className="text-sm text-agency-white/40">bolt onto any tier</span>
              </div>
              <p className="text-agency-white/60 mb-6 max-w-2xl leading-relaxed">
                Missed calls after 6pm are your biggest leak. We set up a tracked number with
                out-of-hours routing and missed-call auto-text-back. The customer gets
                "Got your call. A locksmith will ring you back in 15 minutes." instead of
                voicemail. That one text recovers calls that would otherwise go to your competitor.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Tracked phone number",
                  "Out-of-hours call routing",
                  "Missed-call auto-text-back",
                  "Monthly call log with source attribution",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-agency-white/70">
                    <CheckCircle2 size={14} className="text-agency-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── AD SPEND NOTE ─── */}
      <section className="py-16 section-divider">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-4">A note on ad spend</h3>
            <p className="text-agency-white/50 leading-relaxed">
              Full Book's $997/mo is the management fee. Ad spend is separate and goes directly
              to Google — we recommend starting at $500–$1,500/mo. We'll tell you on the call
              whether your market and budget make ads viable before we take your money.
              If they don't, we'll say so.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 md:py-28 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start with a free homepage</h2>
          <p className="text-lg text-agency-white/50 mb-10">
            We'll build it, you'll see it live. Then pick a tier or walk away. No pressure.
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
