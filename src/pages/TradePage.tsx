import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { getTradeBySlug } from "../data/tradeData";
import React, { useState } from "react";
import NotFound from "./NotFound";

import { useTranslation } from "react-i18next";
import { TradeConfig } from "../data/tradeData";

export default function TradePage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const trade = slug ? t(`tradesData.${slug}`, { returnObjects: true, defaultValue: null }) as TradeConfig | null : null;
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
          slug: slug,
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

  if (!trade) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{trade.seoTitle}</title>
        <meta name="description" content={trade.seoDesc} />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-6">
              <span className="w-6 h-[1px] bg-agency-accent-dark" />
              <span>{trade.tradePlural}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-8">
              {trade.heroH1}
            </h1>
            <p className="text-lg md:text-xl text-agency-white/70 max-w-2xl font-light leading-relaxed mb-10">
              {trade.heroSub}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all group"
            >
              Get a free homepage
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── THE ECONOMICS ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why {trade.tradeNoun} need a different kind of site
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: t("tradePage.leadValue"), value: trade.leadValue },
              { label: t("tradePage.decisionTime"), value: trade.decisionTime },
              { label: t("tradePage.buyingChannel"), value: trade.buyingChannel },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-agency-gray p-8 rounded-2xl border border-agency-white/5"
              >
                <span className="text-sm text-agency-white/40 uppercase tracking-widest">{stat.label}</span>
                <p className="text-2xl font-bold mt-2 text-agency-accent">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">{t("tradePage.problemTitle")}</h2>
            <div className="section-prose space-y-6">
              <p>{trade.problemSection.scenario}</p>
              <p>{trade.problemSection.searchBehavior}</p>
              <p className="text-agency-white/50">{trade.problemSection.whatsBroken}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── JOB-SPECIFIC PAGES ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tradePage.pagesTitle")}</h2>
            <p className="text-agency-white/50 text-lg">{t("tradePage.pagesDesc")}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trade.exampleJobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 bg-agency-gray rounded-xl border border-agency-white/5"
              >
                <CheckCircle2 size={16} className="text-agency-accent shrink-0" />
                <span className="text-sm text-agency-white/70">{job}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THREE TIERS BRIEF ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tradePage.tiersTitle")}</h2>
            <p className="text-agency-white/50 text-lg">{t("tradePage.tiersDesc")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "The Call Machine",
                price: "$997",
                monthly: "$299/mo",
                desc: "A site built to do one thing: convert a panicking phone user into a call.",
                includes: ["8–12 pages", "Click-to-call", "GBP setup", "Call tracking"],
              },
              {
                name: "Coverage",
                price: "$1,497",
                monthly: "$599/mo",
                desc: "Everything above plus local ranking. Location pages, reviews, monthly report.",
                includes: ["Everything in Tier 1", "Location pages", "GBP posting", "Review SMS", "Call report"],
                featured: true,
              },
              {
                name: "Full Book",
                price: "$1,997",
                monthly: "$997/mo + ads",
                desc: "Coverage plus Google Ads and Local Services Ads. For the guy with two vans who wants four.",
                includes: ["Everything in Tier 2", "Google Ads", "LSA management", "Click-fraud monitoring"],
              },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={tier.featured ? "pricing-card-featured" : "pricing-card"}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-8 bg-agency-accent text-agency-black text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-agency-accent">{tier.price}</span>
                  <span className="text-sm text-agency-white/40">setup</span>
                </div>
                <span className="text-sm text-agency-white/50 mb-4 block">{tier.monthly}</span>
                <p className="text-agency-white/60 text-sm mb-6 leading-relaxed">{tier.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-agency-white/70">
                      <CheckCircle2 size={14} className="text-agency-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 w-full">
                  <button
                    onClick={(e) => handleCheckout(e, tier.name, tier.price)}
                    disabled={loadingTier === tier.name}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm tracking-tight transition-all ${
                      tier.featured
                        ? "accent-gradient shadow-lg shadow-agency-accent/20 hover:shadow-agency-accent/40 text-agency-black"
                        : "bg-agency-accent text-agency-black hover:bg-agency-accent-dark"
                    }`}
                  >
                    {loadingTier === tier.name ? (
                      <><Loader2 size={16} className="animate-spin" /> {t("tradePage.redirecting")}</>
                    ) : (
                      <>{t("tradePage.paySetup").replace("{{price}}", tier.price)}</>
                    )}
                  </button>
                  <Link
                    to="/contact"
                    className="w-full text-center py-4 rounded-full font-bold text-sm tracking-tight transition-all bg-agency-white/5 border border-agency-white/10 hover:bg-agency-white/10 text-agency-white"
                  >
                    {t("tradePage.bookCall")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/pricing" className="text-sm text-agency-white/40 hover:text-agency-white transition-colors border-b border-agency-white/20 pb-1">
              {t("tradePage.seePricing")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 md:py-20 section-divider">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">{t("tradePage.faqTitle")}</h2>
          </motion.div>

          <div className="space-y-2">
            {trade.faq.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("tradePage.ctaTitle")}
          </h2>
          <p className="text-lg text-agency-white/50 mb-10 max-w-xl mx-auto">
            {t("tradePage.ctaDesc")}
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

// ─── FAQ Accordion Item ───
function FaqItem({ q, a, index }: { key?: React.Key; q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-agency-white/5 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-agency-white/[0.02] transition-colors"
      >
        <span className="text-agency-white/80 font-medium pr-4">{q}</span>
        {isOpen ? (
          <ChevronUp size={18} className="text-agency-white/30 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-agency-white/30 shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-agency-white/50 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
