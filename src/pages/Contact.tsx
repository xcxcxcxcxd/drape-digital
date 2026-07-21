import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "captcha_error">("idle");
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: "" });

  useEffect(() => {
    setCaptcha(prev => ({ ...prev, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus("idle");
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      setStatus("captcha_error");
      return;
    }

    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Drape Digital Agency</title>
        <meta name="description" content="Request your risk-free website demo from Drape Digital today." />
      </Helmet>

      <section className="pt-40 pb-20 px-6 container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">Let's Talk.</h1>
          <p className="text-xl md:text-2xl text-agency-muted max-w-2xl font-light">
            Ready to see your new website? Fill out the form, and we'll be in touch within 24 hours to discuss the demo build.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 container mx-auto flex flex-col lg:flex-row gap-16">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 space-y-12">
          <div>
            <h3 className="text-sm font-mono tracking-widest text-agency-white/40 uppercase mb-4">Email Us</h3>
            <a href="mailto:contact@drape.digital" className="text-2xl md:text-3xl font-display flex items-center gap-4 hover:text-agency-accent transition-colors">
              <Mail size={24} /> contact@drape.digital
            </a>
          </div>
          <div>
            <h3 className="text-sm font-mono tracking-widest text-agency-white/40 uppercase mb-4">Location</h3>
            <a href="https://maps.app.goo.gl/6EGu55UFqZwsJVoY6" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl flex items-center gap-4 font-light text-agency-white/80 hover:text-agency-accent transition-colors mb-8">
               <MapPin size={24} className="shrink-0" />
               Tetouan, Morocco
            </a>
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-agency-white/5 opacity-80 hover:opacity-100 transition-opacity">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62485972.486432076!2d-79.54172259999999!3d46.423669000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x679266b4da9afccf%3A0x40fb291be9405321!2sdrape.digital!5e1!3m2!1sen!2ses!4v1784632720929!5m2!1sen!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3 bg-agency-gray p-8 md:p-12 rounded-2xl border border-agency-white/5 relative overflow-hidden">
           <AnimatePresence mode="wait">
             {status === "success" ? (
               <motion.div
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-0 bg-agency-gray flex flex-col items-center justify-center text-center p-12 z-20"
               >
                 <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                   <Mail size={32} />
                 </div>
                 <h2 className="text-4xl font-display font-medium mb-4">Message Sent</h2>
                 <p className="text-agency-white/60 text-lg">We've received your inquiry and will be in touch shortly.</p>
               </motion.div>
             ) : (
               <motion.form
                 key="form"
                 initial={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onSubmit={handleSubmit}
                 className="space-y-8 relative z-10"
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label htmlFor="name" className="text-sm font-medium text-agency-white/80">Full Name *</label>
                       <input 
                         type="text" 
                         id="name"
                         name="name"
                         required
                         value={formData.name}
                         onChange={handleChange}
                         className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 placeholder-agency-white/20 focus:border-agency-white/50 focus:outline-none transition-colors"
                         placeholder="John Doe"
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-sm font-medium text-agency-white/80">Email Address *</label>
                       <input 
                         type="email" 
                         id="email"
                         name="email"
                         required
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 placeholder-agency-white/20 focus:border-agency-white/50 focus:outline-none transition-colors"
                         placeholder="john@example.com"
                       />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label htmlFor="company" className="text-sm font-medium text-agency-white/80">Company / Website URL</label>
                     <input 
                       type="text" 
                       id="company"
                       name="company"
                       value={formData.company}
                       onChange={handleChange}
                       className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 placeholder-agency-white/20 focus:border-agency-white/50 focus:outline-none transition-colors"
                       placeholder="yourcompany.com"
                     />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="message" className="text-sm font-medium text-agency-white/80">Project Details *</label>
                     <textarea 
                       id="message"
                       name="message"
                       required
                       rows={5}
                       value={formData.message}
                       onChange={handleChange}
                       className="w-full bg-agency-black/50 border border-agency-white/10 rounded-lg px-4 py-3 placeholder-agency-white/20 focus:border-agency-white/50 focus:outline-none transition-colors resize-none"
                       placeholder="Tell us about your business and what you're looking for..."
                     ></textarea>
                  </div>

                  {/* Math Captcha */}
                  <div className="space-y-2">
                     <label htmlFor="captcha" className="text-sm font-medium text-agency-white/80">
                        Human Verification: What is {captcha.num1} + {captcha.num2}? *
                     </label>
                     <input 
                       type="text" 
                       id="captcha"
                       name="captcha"
                       required
                       value={captcha.answer}
                       onChange={(e) => { setStatus("idle"); setCaptcha(prev => ({ ...prev, answer: e.target.value })); }}
                       className={`w-full bg-agency-black/50 border ${status === "captcha_error" ? "border-red-500" : "border-agency-white/10"} rounded-lg px-4 py-3 placeholder-agency-white/20 focus:border-agency-white/50 focus:outline-none transition-colors`}
                       placeholder="Enter the sum"
                     />
                     {status === "captcha_error" && <p className="text-red-500 text-sm mt-1 font-semibold">Incorrect math answer. Please try again.</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full md:w-auto px-10 py-4 accent-gradient text-agency-white font-bold text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group shadow-xl shadow-agency-accent/20"
                  >
                    {status === "loading" ? "Sending..." : "Request Demo"}
                    {status !== "loading" && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                  
                  {status === "error" && <p className="text-red-500 mt-4">Failed to send message. Please try again later.</p>}
               </motion.form>
             )}
           </AnimatePresence>
        </div>
      </section>
    </>
  );
}
