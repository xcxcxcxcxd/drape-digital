import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const webServices = [
  {
    id: "web-design",
    name: "Web Design",
    desc: "Bespoke, high-end visual design that establishes trust and authority in your market.",
    price: "From $2,500",
    rating: 5.0,
    reviews: "346",
    category: "Web",
  },
  {
    id: "development",
    name: "Web Development",
    desc: "Robust, scalable React and modern frontend architectures for blazing fast performance.",
    price: "From $3,500",
    rating: 4.9,
    reviews: "2k+",
    category: "Web",
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    desc: "Custom Shopify and modular commerce setups designed to maximize conversion rates.",
    price: "From $4,500",
    rating: 4.9,
    reviews: "4k+",
    category: "Web",
  },
  {
    id: "seo",
    name: "SEO & Performance",
    desc: "Technical SEO, Core Web Vitals optimization, and semantic structuring for organic growth.",
    price: "From $699",
    rating: 5.0,
    reviews: "1.2k+",
    category: "Web",
  },
  {
    id: "email-automation",
    name: "Email Automation",
    desc: "Lead magnets, drip sequences, and CRM integrations to capture and convert site visitors.",
    price: "From $1,200",
    rating: 4.9,
    reviews: "850+",
    category: "Web",
  },
];

const seoServices = [
  {
    id: "seo-backlinks",
    name: "Off-Page SEO & Link Building",
    desc: "High-authority white hat backlink campaigns that build domain power and push your rankings to page one.",
    price: "From $499",
    rating: 5.0,
    reviews: "346",
    category: "SEO",
  },
  {
    id: "dofollow-backlinks",
    name: "High DA Dofollow Backlinks",
    desc: "Contextual dofollow placements on DR 60–90 domains. Clean, indexable, and built to compound over time.",
    price: "From $599",
    rating: 4.9,
    reviews: "2k+",
    category: "SEO",
  },
  {
    id: "local-seo",
    name: "Local SEO & Google My Business",
    desc: "Dominate your local market with GMB optimization, citation building, and geo-targeted content strategies.",
    price: "From $399",
    rating: 4.9,
    reviews: "4k+",
    category: "SEO",
  },
  {
    id: "ai-seo",
    name: "GEO / AEO / AI Search Visibility",
    desc: "Get cited by ChatGPT, Gemini, and Perplexity. We build AI-era authority through structured data and AEO signals.",
    price: "From $499",
    rating: 5.0,
    reviews: "500+",
    category: "SEO",
  },
  {
    id: "monthly-seo",
    name: "Monthly SEO Retainer",
    desc: "A fully managed, ongoing SEO operation — on-page, off-page, technical, content, and reporting every month.",
    price: "From $999/mo",
    rating: 4.9,
    reviews: "800+",
    category: "SEO",
  },
  {
    id: "seo-content",
    name: "SEO Copywriting & Blog Writing",
    desc: "Expert-written, keyword-optimized articles and landing page copy engineered to rank and convert.",
    price: "From $599",
    rating: 5.0,
    reviews: "1.5k+",
    category: "SEO",
  },
  {
    id: "google-maps-citations",
    name: "Google Maps Citations",
    desc: "Thousands of NAP-consistent citations across authoritative directories to lock in your local map pack position.",
    price: "From $299",
    rating: 4.9,
    reviews: "2.3k+",
    category: "SEO",
  },
  {
    id: "technical-seo",
    name: "Technical SEO & On-Page Optimization",
    desc: "Full technical audit + fix: Core Web Vitals, schema markup, crawlability, canonicals, and internal linking.",
    price: "From $699",
    rating: 4.9,
    reviews: "950+",
    category: "SEO",
  },
  {
    id: "authority-backlinks",
    name: "White Hat Authority Backlinks",
    desc: "Premium manual link placements on DR 70–80+ domains. Contextual, dofollow, and incredibly powerful.",
    price: "From $799",
    rating: 5.0,
    reviews: "450+",
    category: "SEO",
  },
  {
    id: "guest-posts",
    name: "Guest Posts on DA 90+ Sites",
    desc: "Editorial-quality guest posts published on DA 90+ websites in your niche. High-impact SEO value.",
    price: "From $499",
    rating: 4.9,
    reviews: "1.1k+",
    category: "SEO",
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Web Design, SEO & Link Building | Drape Digital</title>
        <meta
          name="description"
          content="Premium web design, development, SEO, off-page link building, local SEO, AI search visibility, and email automation services. Drape Digital — your full-stack digital agency."
        />
        <link rel="canonical" href="https://drape.digital/services" />
      </Helmet>

      <section className="pt-40 pb-20 px-6 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
            Our Expertise.
          </h1>
          <p className="text-xl md:text-2xl text-agency-muted max-w-3xl font-light">
            We don't just build websites. We engineer high-performance digital environments and execute the SEO strategies that drive sustained organic growth.
          </p>
        </motion.div>
      </section>

      {/* Web Services */}
      <section className="border-t border-agency-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-2">
            <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            <span>Web & Digital</span>
          </div>
        </div>
        {webServices.map((service, index) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="block border-b border-agency-white/10 group"
          >
            <div className="container mx-auto px-6 py-14 md:py-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-agency-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="flex gap-12 items-baseline relative z-10 w-full md:w-auto">
                <span className="font-mono text-xl text-agency-accent hidden md:inline-block">
                  0{index + 1}
                </span>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight group-hover:pl-4 transition-all duration-300">
                  {service.name}
                </h2>
              </div>
              <div className="relative z-10 w-full md:w-1/3 flex flex-col md:items-end gap-4 text-left md:text-right">
                <p className="text-lg text-agency-white/60">{service.desc}</p>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="flex gap-1 text-agency-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(service.rating) ? "fill-current" : "fill-agency-white/20 text-agency-white/20"} />
                    ))}
                  </div>
                  <span className="font-mono text-sm text-agency-accent font-bold mt-1">{service.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* SEO & Marketing Services */}
      <section className="border-t-2 border-agency-accent/30 mt-2">
        <div className="container mx-auto px-6 py-12">
          <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-2">
            <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            <span>SEO & Marketing</span>
          </div>
        </div>
        {seoServices.map((service, index) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="block border-b border-agency-white/10 group"
          >
            <div className="container mx-auto px-6 py-14 md:py-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-agency-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="flex gap-12 items-baseline relative z-10 w-full md:w-auto">
                <span className="font-mono text-xl text-agency-accent hidden md:inline-block">
                  {String(webServices.length + index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight group-hover:pl-4 transition-all duration-300">
                  {service.name}
                </h2>
              </div>
              <div className="relative z-10 w-full md:w-1/3 flex flex-col md:items-end gap-4 text-left md:text-right">
                <p className="text-lg text-agency-white/60">{service.desc}</p>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="flex gap-1 text-agency-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(service.rating) ? "fill-current" : "fill-agency-white/20 text-agency-white/20"} />
                    ))}
                  </div>
                  <span className="font-mono text-sm text-agency-accent font-bold mt-1">{service.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
