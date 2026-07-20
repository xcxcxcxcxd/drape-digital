import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") || "your service";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Confirmed | Drape Digital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center px-6 py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-agency-accent/10 border border-agency-accent/30 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 size={48} className="text-agency-accent" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Payment<br />Confirmed.
          </h1>

          <p className="text-xl text-agency-muted mb-4">
            Thank you for choosing <strong className="text-agency-white">Drape Digital</strong>.
          </p>
          <p className="text-lg text-agency-muted/70 mb-12">
            Your payment for <span className="text-agency-accent font-semibold">{decodeURIComponent(service)}</span> has been received.
            Our team will be in touch within <strong className="text-agency-white">24 hours</strong> to kick off your project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="accent-gradient text-agency-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-tight flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Back to Home <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
              className="border border-agency-white/20 text-agency-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-agency-white/5 transition-colors"
            >
              View All Services
            </Link>
          </div>

          <p className="mt-12 text-sm text-agency-white/30">
            A confirmation email has been sent to your inbox. Check your spam folder if you don't see it.
          </p>
        </motion.div>
      </section>
    </>
  );
}
