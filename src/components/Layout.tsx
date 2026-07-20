import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const canonicalUrl = `https://drape.digital${location.pathname === "/" ? "" : location.pathname}`;

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-agency-black selection:bg-agency-accent selection:text-agency-black">
      <Helmet>
        <link rel="canonical" href={canonicalUrl || "https://drape.digital/"} />
      </Helmet>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-agency-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tighter z-50">
            drape<span className="text-agency-accent">.</span>digital
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-agency-muted hover:text-agency-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-6 py-3 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-agency-white hover:text-agency-black transition-all"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden z-50 p-2 text-agency-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-agency-black flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-4xl font-display font-medium text-agency-white hover:text-agency-accent transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                className="px-8 py-4 bg-agency-white text-agency-black text-lg font-medium rounded-full hover:bg-agency-accent transition-all duration-300"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full relative z-10">
        <Breadcrumb />
        {children}
      </main>

      <footer className="bg-agency-gray py-20 border-t border-agency-white/10 z-10 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-display font-bold tracking-tight mb-4 inline-block">
                drape<span className="text-agency-accent/50">.digital</span>
              </Link>
              <p className="text-agency-white/60 max-w-sm mt-4">
                We design, build, and rank custom websites for businesses worldwide.
                See a fully functional demo of your site before you ever sign a contract or pay.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">Navigate</h4>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-agency-white/60 hover:text-agency-white transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="text-agency-white/60 hover:text-agency-white transition-colors">Portfolio</Link></li>
                <li><Link to="/about" className="text-agency-white/60 hover:text-agency-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-agency-white/60 hover:text-agency-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">Web Services</h4>
              <ul className="space-y-3">
                <li><Link to="/services/web-design" className="text-agency-white/60 hover:text-agency-white transition-colors">Web Design</Link></li>
                <li><Link to="/services/development" className="text-agency-white/60 hover:text-agency-white transition-colors">Web Development</Link></li>
                <li><Link to="/services/ecommerce" className="text-agency-white/60 hover:text-agency-white transition-colors">E-Commerce</Link></li>
                <li><Link to="/services/seo" className="text-agency-white/60 hover:text-agency-white transition-colors">SEO & Performance</Link></li>
                <li><Link to="/services/email-automation" className="text-agency-white/60 hover:text-agency-white transition-colors">Email Automation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">SEO & Marketing</h4>
              <ul className="space-y-3">
                <li><Link to="/services/seo-backlinks" className="text-agency-white/60 hover:text-agency-white transition-colors">Off-Page SEO</Link></li>
                <li><Link to="/services/local-seo" className="text-agency-white/60 hover:text-agency-white transition-colors">Local SEO & GMB</Link></li>
                <li><Link to="/services/ai-seo" className="text-agency-white/60 hover:text-agency-white transition-colors">AI Search Visibility</Link></li>
                <li><Link to="/services/monthly-seo" className="text-agency-white/60 hover:text-agency-white transition-colors">Monthly SEO Retainer</Link></li>
                <li><Link to="/services/authority-backlinks" className="text-agency-white/60 hover:text-agency-white transition-colors">Authority Backlinks</Link></li>
                <li><Link to="/services/guest-posts" className="text-agency-white/60 hover:text-agency-white transition-colors">Guest Posts DA 90+</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-agency-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-agency-white/40">
              &copy; {new Date().getFullYear()} Drape Digital Agency. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">Refund Policy</Link>
              <Link to="/cookie-policy" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/drapedigital/" target="_blank" rel="noopener noreferrer" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">LinkedIn</a>
              <span className="flex items-center gap-1.5 text-xs text-agency-white/30 border border-agency-white/10 rounded-full px-3 py-1">
                <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60"><path d="M6.5 7C5.67 7 5 7.67 5 8.5v15c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5H6.5z" fill="#635BFF"/><path d="M13.5 19.5l-3-8h2l2 5.5 2-5.5h2l-3 8h-2z" fill="white"/></svg>
                Secure checkout by Stripe
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
