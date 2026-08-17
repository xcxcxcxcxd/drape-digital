import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentFailed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Failed | Drape Digital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center px-6 py-24 md:py-40">
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
            className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-8"
          >
            <XCircle size={48} className="text-red-500" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight text-red-500">
            Payment<br />Failed.
          </h1>

          <p className="text-xl text-agency-muted mb-4">
            We couldn't process your payment.
          </p>
          <p className="text-lg text-agency-muted/70 mb-12">
            Your card was declined or the checkout session was cancelled. No charges have been made.
            Please try again with a different payment method.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="bg-agency-white text-agency-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-tight flex items-center justify-center gap-2 hover:bg-agency-white/90 transition-colors"
            >
              <ArrowLeft size={16} /> Return to Pricing
            </Link>
            <Link
              to="/contact"
              className="border border-agency-white/20 text-agency-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-agency-white/5 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
