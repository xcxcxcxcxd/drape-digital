import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
// Added i18n import handled below
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Phone, Loader2 } from "lucide-react";

// Tiers are now loaded via i18n
type Tier = {
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  monthlySuffix: string;
  soldTo: string;
  timeline: string;
  includes: string[];
  doesNot: string[];
  featured?: boolean;
};

import { useTranslation, Trans } from "react-i18next";

export default function Pricing() {
  const { t } = useTranslation();
  const tiers = t("pricing.tiers", { returnObjects: true }) as Tier[];
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
        <title>{t("pricing.seoTitle")}</title>
        <meta name="description" content={t("pricing.seoDesc")} />
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
              {t("pricing.header.title")}<br />
              <span className="text-agency-white/30">{t("pricing.header.subtitle")}</span>
            </h1>
            <p className="text-lg text-agency-white/60 max-w-xl">
              {t("pricing.header.desc")}
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
                    <span className="text-sm text-agency-white/40">{t("pricing.card.setupLabel")}</span>
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
                  <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">{t("pricing.card.timelineLabel")}</span>
                  <span className="text-sm font-medium text-agency-white/70">{tier.timeline}</span>
                </div>

                <div className="mb-6 flex-1">
                  <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">{t("pricing.card.includesLabel")}</span>
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
                    <span className="text-xs uppercase tracking-widest text-agency-white/30 mb-3 block">{t("pricing.card.doesNotLabel")}</span>
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
                      <>{t("pricing.card.paySetup").replace("{{setup}}", tier.setup)}</>
                    )}
                  </button>
                  <Link
                    to="/contact"
                    className="w-full text-center py-4 rounded-full font-bold text-sm tracking-tight transition-all bg-agency-white/5 border border-agency-white/10 hover:bg-agency-white/10 text-agency-white"
                  >
                    {t("pricing.card.bookCall")}
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
                <h3 className="text-2xl font-bold">{t("pricing.addon.title")}</h3>
                <span className="text-xl font-bold text-agency-accent">{t("pricing.addon.price")}</span>
                <span className="text-sm text-agency-white/40">{t("pricing.addon.desc")}</span>
              </div>
              <p className="text-agency-white/60 mb-6 max-w-2xl leading-relaxed">
                {t("pricing.addon.p")}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                { (t("pricing.addon.items", { returnObjects: true }) as string[]).map((item, i) => (
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
            <h3 className="text-xl font-bold mb-4">{t("pricing.note.title")}</h3>
            <p className="text-agency-white/50 leading-relaxed">
              {t("pricing.note.p")}
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("pricing.cta.title")}</h2>
          <p className="text-lg text-agency-white/50 mb-10">
            {t("pricing.cta.subtitle")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 accent-gradient rounded-full font-bold tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all text-lg group"
          >
            {t("pricing.cta.btn")}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
