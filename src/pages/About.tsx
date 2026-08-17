import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Drape Digital</title>
        <meta name="description" content="Based in Spain, working UK/US/Canada hours. We build websites for emergency call-out trades." />
      </Helmet>

      <section className="pt-28 md:pt-36 pb-24 px-6 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-8">
              We build sites for trades who need the phone to ring.
            </h1>
            
            <div className="section-prose space-y-6 text-agency-white/80 text-lg md:text-xl">
              <p>
                Drape Digital is a specialized web agency. We don't do "digital solutions for businesses." We don't do e-commerce. We don't do logos or brand books.
              </p>
              <p>
                We build and rank websites for emergency call-out trades. Locksmiths, towing, garage doors, HVAC, plumbers.
              </p>
              <p>
                Why just them? Because their businesses share one economic reality: a lead is worth £150–£800, the customer decides in under 90 seconds, and 100% of the buying happens on a phone in a panic.
              </p>
              <p>
                That requires a very specific, ruthless type of website architecture. A wet thumb on a cracked screen at 11pm doesn't care about a "Quality Service Since 2009" paragraph. They care about two things: can you get here, and what will it cost.
              </p>
              <p>
                We're based in Spain, but we work UK, US, and Canada hours. We run a demo-first model because it kills the biggest objection in this market: "the last web guy took my £2k and disappeared." 
              </p>
              <p>
                We build the homepage first, and you see it live on a real URL before you pay anything. If it's not better than what you've got, you walk away and keep the pages.
              </p>
            </div>

            <div className="mt-16 pt-16 border-t border-agency-white/10">
              <h2 className="text-2xl font-bold mb-6">Ready to see your new site?</h2>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all group"
              >
                Get a free homepage
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
