import { motion, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin, Search, Star } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Drape Digital | Websites for Emergency Trades — Locksmiths, Towing, HVAC, Garage Doors</title>
        <meta name="description" content="We build and rank websites for emergency call-out trades. Locksmiths, towing, garage doors, HVAC. See your site live before you pay anything." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background glow */}
        <div className="absolute -top-48 -right-48 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-agency-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 lg:w-[400px] lg:h-[400px] bg-agency-accent-dark/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center"
          style={{ y: yParallax, opacity: opacityParallax }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8 max-w-5xl">
              Websites for locksmiths who need the{" "}
              <span className="text-agency-accent">phone to ring</span>
            </h1>

            <p className="text-lg md:text-xl text-agency-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              We build the site first. You see it live, on a real URL, before you pay anything.
              If it's not better than what you've got, walk away and keep the pages.
            </p>

            <Link
              to="/free-homepage"
              id="hero-cta"
              className="inline-flex items-center gap-2 px-8 py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all duration-300 group"
            >
              Get a free homepage
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="trust-strip mt-10">
              <span>Built for emergency trades</span>
              <span>Demo-first — see it before you pay</span>
              <span>Based in Morocco, working UK/US/Canada hours</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-24 md:py-32 section-divider" id="the-problem">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-10">The problem</h2>
            <div className="section-prose space-y-6">
              <p>
                Your customer is standing outside their own front door. It's raining.
                They've got one hand on a phone and four tabs open.
              </p>
              <p>
                They're not reading your About page. They're looking for two things:
                can you actually get in, and what will it cost. Whichever site answers
                first gets the call.
              </p>
              <p className="text-agency-white/50">
                Most trade sites answer neither. Big photo of a door. "Quality service
                since 2009." Phone number in the footer, in grey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT WE BUILD INSTEAD ─── */}
      <section className="py-24 md:py-32 section-divider" id="what-we-build">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-14 max-w-3xl">What we build instead</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: <span className="text-2xl font-bold text-agency-accent">£</span>,
                title: "Price on the screen",
                desc: "Not \"competitive rates\" — the actual call-out fee. Your customer wants a number. Give them one.",
              },
              {
                icon: <MapPin size={24} className="text-agency-accent" />,
                title: "Arrival window on the screen",
                desc: "Real one, from your dispatch log. \"25 minutes in central, 40 minutes outer suburbs.\" Specifics beat promises.",
              },
              {
                icon: <Phone size={24} className="text-agency-accent" />,
                title: "A call button that never leaves",
                desc: "Fixed to the bottom of the viewport. Follows the thumb down the page. One tap to call, on every screen.",
              },
              {
                icon: <Search size={24} className="text-agency-accent" />,
                title: "Pages for the jobs people actually search",
                desc: "Broken key extraction. Transponder programming. Panic bar repair. Someone typing \"push pull paddle repair\" is ready to pay today.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-agency-gray p-8 md:p-10 rounded-2xl border border-agency-white/5 hover:border-agency-white/10 transition-colors"
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-agency-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-agency-white/50 max-w-2xl text-lg"
          >
            Separate pages for the areas you cover, with real detail about the buildings there.
            Not 200 spun copies of the same paragraph. Google's been catching that for two years.
          </motion.p>
        </div>
      </section>

      {/* ─── HOW THE FREE HOMEPAGE WORKS ─── */}
      <section className="py-24 md:py-32 section-divider" id="how-it-works">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-14 max-w-3xl">How the free homepage works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                text: "Fifteen minutes on the phone. We ask about your prices, your patch, the jobs you turn down.",
              },
              {
                step: "02",
                text: "We build a homepage. Three working days.",
              },
              {
                step: "03",
                text: "You look at it, live, on a real link. No login, no deck.",
              },
              {
                step: "04",
                text: "Like it, we finish the site. Don't, keep the files and we'll leave you alone.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <span className="text-6xl md:text-7xl font-black text-agency-white/[0.03] absolute -top-4 -left-2 select-none">
                  {item.step}
                </span>
                <div className="relative pt-8">
                  <span className="font-mono text-sm text-agency-accent mb-4 block">{item.step}</span>
                  <p className="text-agency-white/70 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRADES WE BUILD FOR ─── */}
      <section className="py-24 md:py-32 section-divider" id="trades">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
              One site architecture. Every emergency trade.
            </h2>
            <p className="text-agency-white/50 text-lg max-w-2xl">
              A lead is worth £150–£800. The customer decides in under 90 seconds. 100% of the buying happens on a phone. That's locksmiths, towing, garage doors, HVAC — same machine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Locksmith Websites", href: "/locksmith-websites", primary: true },
              { name: "Towing Websites", href: "/towing-websites" },
              { name: "Garage Door Websites", href: "/garage-door-websites" },
              { name: "HVAC Websites", href: "/hvac-websites" },
            ].map((trade, i) => (
              <motion.div
                key={trade.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={trade.href}
                  className={`block p-8 rounded-2xl border transition-all duration-300 group ${
                    trade.primary
                      ? "border-agency-accent/30 bg-agency-accent/5 hover:bg-agency-accent/10 hover:border-agency-accent/50"
                      : "border-agency-white/5 bg-agency-gray hover:border-agency-white/15 hover:bg-agency-gray-light"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-agency-accent transition-colors">
                    {trade.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-agency-white/40 group-hover:text-agency-white/60 transition-colors">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DON'T DO ─── */}
      <section className="py-24 md:py-32 section-divider" id="what-we-dont-do">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-10">What we don't do</h2>
            <div className="section-prose space-y-6">
              <p>
                We don't do logos, brand books, or social media management. We don't do e-commerce.
                We don't do SEO for national brands.
              </p>
              <p className="text-agency-white/50 italic">
                If you need a site that wins a design award, we're the wrong shop.
                Ours are built for a wet thumb on a cracked screen at 11pm.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-28 md:py-40 relative z-10 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-agency-black via-agency-accent/[0.03] to-agency-black pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6">
            Get a free homepage
          </h2>
          <p className="text-lg text-agency-white/50 mb-10 max-w-xl mx-auto">
            No card. No contract. We'll tell you on the call if we don't think we can help.
          </p>
          <Link
            to="/free-homepage"
            id="bottom-cta"
            className="inline-flex items-center gap-2 px-10 py-5 accent-gradient rounded-full font-bold tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all duration-300 text-lg group"
          >
            Request yours
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
