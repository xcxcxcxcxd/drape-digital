import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

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
    { name: t("nav.work"), href: "/work" },
    { name: t("nav.locksmith"), href: "/locksmith-websites" },
    { name: t("nav.pricing"), href: "/pricing" },
    { name: t("nav.about"), href: "/about" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-agency-black selection:bg-agency-accent selection:text-agency-black">
      <Helmet>
        <html lang={i18n.language} />
        <link rel="canonical" href={canonicalUrl || "https://drape.digital/"} />
      </Helmet>

      {/* ─── HEADER ─── */}
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  location.pathname === link.href
                    ? "text-agency-accent"
                    : "text-agency-muted hover:text-agency-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-6 py-3 accent-gradient rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              {t("nav.freeHomepage")}
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-agency-white/60 hover:text-agency-white transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden z-50 flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-agency-white/60 hover:text-agency-white transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            <button
              className="p-2 text-agency-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-agency-white hover:text-agency-accent transition-colors"
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-4 accent-gradient text-agency-white text-lg font-bold rounded-full"
              >
                {t("nav.freeHomepage")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN ─── */}
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-agency-gray py-16 md:py-20 border-t border-agency-white/10 z-10 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                drape<span className="text-agency-accent/50">.digital</span>
              </Link>
              <p className="text-agency-white/50 mt-4 text-sm leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Trades We Serve */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-agency-white/40 mb-6">{t("footer.trades")}</h4>
              <ul className="space-y-3">
                <li><Link to="/locksmith-websites" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.locksmith")}</Link></li>
                <li><Link to="/towing-websites" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.towing")}</Link></li>
                <li><Link to="/garage-door-websites" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.garage")}</Link></li>
                <li><Link to="/hvac-websites" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.hvac")}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-agency-white/40 mb-6">{t("footer.company")}</h4>
              <ul className="space-y-3">
                <li><Link to="/how-it-works" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.howItWorks")}</Link></li>
                <li><Link to="/pricing" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.pricing")}</Link></li>
                <li><Link to="/work" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.work")}</Link></li>
                <li><Link to="/blog" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.blog")}</Link></li>
                <li><Link to="/about" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.about")}</Link></li>
                <li><Link to="/contact" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.contact")}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-agency-white/40 mb-6">{t("footer.legal")}</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.privacy")}</Link></li>
                <li><Link to="/terms-of-service" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.terms")}</Link></li>
                <li><Link to="/refund-policy" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.refund")}</Link></li>
                <li><Link to="/cookie-policy" className="text-agency-white/60 hover:text-agency-white transition-colors text-sm">{t("footer.cookie")}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-agency-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-agency-white/40">
              &copy; {new Date().getFullYear()} {t("footer.rights")}
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/company/drapedigital/" target="_blank" rel="noopener noreferrer" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">LinkedIn</a>
              <a href="mailto:contact@drape.digital" className="text-xs text-agency-white/40 hover:text-agency-white transition-colors">contact@drape.digital</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
