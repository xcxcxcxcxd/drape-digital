import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Drape Digital Agency</title>
        <meta name="description" content="We are Drape Digital, an agency fundamentally changing how businesses buy custom websites." />
      </Helmet>

      <section className="pt-40 pb-20 px-6 container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">The Agency Model<br/><span className="text-outline">is Broken.</span></h1>
        </motion.div>
      </section>

      <section className="py-20 border-t border-agency-white/10 text-lg md:text-2xl font-light leading-relaxed text-agency-white/80">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <p>
            You pay a retainer, you wait 3 months, and you hope the end result looks somewhat like the initial wireframes. If it doesn't? You're already locked into a contract.
          </p>
          <p>
            <strong className="font-medium text-agency-white">We hated that. So we reversed it.</strong>
          </p>
          <p>
            Drape Digital is a web design and development agency headquartered in Tetouan, Morocco. We specialize in custom websites, SEO, and AI search optimization. Our business model is radically different: we build first, and you pay only if you're satisfied. We research your market, design an incredible digital experience, and build it out fully.
          </p>
          <p>
            Then, we send you a link to a live, functional demo hosted on a private subdomain. You browse it on your phone, you click the buttons, you feel the animations.
          </p>
          <p>
            If you don't like it, you walk away. If you love it, you pay the invoice, and we transfer the domain. It's the ultimate show-don't-tell model.
          </p>
        </div>
      </section>

      <section className="py-32 bg-agency-gray border-y border-agency-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div>
             <h3 className="text-4xl font-display font-medium mb-4">Risk-Free.</h3>
             <p className="text-agency-white/60">Zero upfront cost for the initial demo build. You only commit if you are impressed with what you see.</p>
           </div>
           <div>
             <h3 className="text-4xl font-display font-medium mb-4">High-End.</h3>
             <p className="text-agency-white/60">We refuse to churn out templates. Every site is custom-engineered to command attention and respect.</p>
           </div>
           <div>
             <h3 className="text-4xl font-display font-medium mb-4">Performant.</h3>
             <p className="text-agency-white/60">Built on modern JS frameworks, achieving perfect lighthouse scores and buttery smooth 60fps animations.</p>
           </div>
        </div>
      </section>
      
      <section className="py-32 text-center px-6">
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-10">We're looking for ambitious partners.</h2>
         <Link to="/contact" className="px-10 py-5 accent-gradient text-agency-white font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-all shadow-xl shadow-agency-accent/20 text-sm inline-block">
            Get in touch
          </Link>
      </section>
    </>
  );
}
