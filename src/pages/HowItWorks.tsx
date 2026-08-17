import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "01",
    title: "15-minute call",
    desc: "We ask about your prices, your patch, the jobs you turn down. That's it. No pitch, no deck. We're writing down the facts that go on your site.",
    time: "15 minutes",
  },
  {
    step: "02",
    title: "We build your homepage",
    desc: "Three working days. A real page, live on a real URL, with your name, your number, and your actual prices on it. Not a mockup — a working site.",
    time: "3 working days",
  },
  {
    step: "03",
    title: "You see it live",
    desc: "We send you a link. You open it on your phone, your laptop, whatever. No login. No PDF. Click the buttons. Show it to someone you trust.",
    time: "Take your time",
  },
  {
    step: "04",
    title: "Your call",
    desc: "Like it? We finish the site — the rest of the pages, the SEO, the GBP setup. Don't like it? Keep the files and we'll leave you alone. No follow-up emails.",
    time: "No pressure",
  },
];

import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];
  return (
    <>
      <Helmet>
        <title>How It Works | Drape Digital — Demo-First Websites for Trades</title>
        <meta name="description" content="We build your site first. You see it live before you pay. 4-step process: call, build, review, decide. No contract, no deposit." />
      </Helmet>

      <section className="pt-28 md:pt-36 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
              {t("howItWorks.header.title")}<br />{t("howItWorks.header.titleBr")}
            </h1>
            <p className="text-lg text-agency-white/60 max-w-xl">
              {t("howItWorks.header.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-0">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-8 py-12 border-b border-agency-white/5 last:border-b-0"
              >
                <div className="shrink-0 hidden md:block">
                  <span className="text-5xl font-black text-agency-accent/20">{item.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="md:hidden font-mono text-sm text-agency-accent">{item.step}</span>
                    <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
                  </div>
                  <p className="text-agency-white/60 leading-relaxed mb-3 max-w-lg">{item.desc}</p>
                  <span className="inline-block text-xs font-mono text-agency-accent/60 bg-agency-accent/5 px-3 py-1 rounded-full">
                    {item.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("howItWorks.cta.title")}</h2>
          <p className="text-lg text-agency-white/50 mb-10">
            {t("howItWorks.cta.subtitle")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 accent-gradient rounded-full font-bold tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all text-lg group"
          >
            {t("howItWorks.cta.btn")}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
