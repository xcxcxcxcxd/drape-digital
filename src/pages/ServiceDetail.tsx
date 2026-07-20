import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, Lock, Star, ChevronDown, ChevronUp } from "lucide-react";

interface Package {
  name: string;
  price: string;
  deliverables: string[];
  highlight?: boolean;
}

interface ServiceEntry {
  title: string;
  desc: string;
  details: string[];
  seoTitle: string;
  seoDesc: string;
  magnetTitle: string;
  startingPrice: string;
  schemaPrice: string;
  packages: Package[];
}

const serviceData: Record<string, ServiceEntry> = {
  "web-design": {
    title: "Web Design",
    desc: "We craft visually stunning, brand-aligned interfaces that don't just look expensive—they feel expensive. Our design process relies heavily on typography, whitespace, and interaction design.",
    details: ["Brand Identity Translation", "UI/UX Architecture", "Interactive Prototypes", "Design Systems"],
    seoTitle: "Custom Web Design Services | Drape Digital",
    seoDesc: "Premium custom web design agency focused on stunning aesthetics and conversion.",
    magnetTitle: "Get a Free Design Audit of Your Current Site",
    startingPrice: "From $2,500",
    schemaPrice: "2500",
    packages: [
      { name: "Basic", price: "$2,500", deliverables: ["5-page design", "1 revision round", "Mobile responsive", "Figma handoff"] },
      { name: "Standard", price: "$4,500", highlight: true, deliverables: ["Up to 10 pages", "3 revision rounds", "Animation design", "Design system", "Mobile + tablet"] },
      { name: "Premium", price: "$8,500", deliverables: ["Unlimited pages", "Unlimited revisions", "Full brand identity", "Interactive prototypes", "Priority delivery"] },
    ],
  },
  "development": {
    title: "Web Development",
    desc: "We build on modern architectures (React, Next.js, Headless CMS) to ensure your website is lightning fast, accessible, and ready to scale without technical debt.",
    details: ["Frontend Engineering", "Headless CMS Integration", "API & Webhook connecting", "Performance Tuning"],
    seoTitle: "Frontend Web Development Agency | Drape Digital",
    seoDesc: "Expert React and modern stack web development for businesses.",
    magnetTitle: "Download Our Tech Stack Selection Guide",
    startingPrice: "From $3,500",
    schemaPrice: "3500",
    packages: [
      { name: "Basic", price: "$3,500", deliverables: ["React / Vite SPA", "Up to 8 pages", "Contact form", "CMS integration"] },
      { name: "Standard", price: "$6,500", highlight: true, deliverables: ["Next.js + SSR", "Unlimited pages", "API integrations", "Auth system", "Performance audit"] },
      { name: "Premium", price: "$12,000", deliverables: ["Full-stack app", "Custom backend", "Database design", "DevOps setup", "90-day support"] },
    ],
  },
  "ecommerce": {
    title: "E-Commerce",
    desc: "We build custom Shopify themes and scalable e-commerce platforms engineered to increase Average Order Value (AOV) and reduce cart abandonment.",
    details: ["Custom Shopify Themes", "Conversion Rate Optimization", "Subscription Models", "Re-platforming"],
    seoTitle: "Shopify & E-Commerce Development | Drape Digital",
    seoDesc: "Custom Shopify development agency building high-converting online stores.",
    magnetTitle: "Get the 10-Point Checkout Conversion Checklist",
    startingPrice: "From $4,500",
    schemaPrice: "4500",
    packages: [
      { name: "Basic", price: "$4,500", deliverables: ["Custom Shopify theme", "Up to 50 products", "Payment gateway", "Mobile optimized"] },
      { name: "Standard", price: "$8,500", highlight: true, deliverables: ["Headless commerce", "Unlimited products", "Subscription model", "CRO setup", "Analytics"] },
      { name: "Premium", price: "$16,000", deliverables: ["Multi-channel store", "ERP integration", "Custom checkout", "A/B testing setup", "90-day support"] },
    ],
  },
  "seo": {
    title: "SEO & Performance",
    desc: "A beautiful site is useless if no one finds it. We engineer SEO directly into the DOM, focusing on Core Web Vitals, Structured Data, and proper semantic hierarchy.",
    details: ["Technical SEO Audits", "Core Web Vitals Optimization", "Schema/JSON-LD Setup", "Content Strategy"],
    seoTitle: "Technical SEO Services for Business | Drape Digital",
    seoDesc: "Improve your rankings with our technical SEO and performance optimization services.",
    magnetTitle: "Request a Free Technical SEO Audit",
    startingPrice: "From $699",
    schemaPrice: "699",
    packages: [
      { name: "Basic", price: "$699", deliverables: ["Full site audit", "Top 20 fixes", "Meta optimization", "XML sitemap"] },
      { name: "Standard", price: "$1,499", highlight: true, deliverables: ["Everything in Basic", "Core Web Vitals fix", "Schema markup", "Content gap analysis", "Monthly report"] },
      { name: "Premium", price: "$2,999", deliverables: ["Full technical overhaul", "Competitor analysis", "Link audit", "AI content strategy", "Priority support"] },
    ],
  },
  "email-automation": {
    title: "Email Automation",
    desc: "Turn passive traffic into active leads. We design and integrate lead magnets and multi-step drip campaigns to nurture your prospects on autopilot.",
    details: ["Lead Magnet Creation", "Drip Campaign Setup", "CRM Integration", "A/B Testing flows"],
    seoTitle: "Email Automation & Lead Gen Hub | Drape Digital",
    seoDesc: "Capture and convert more leads with automated email marketing setups.",
    magnetTitle: "Get Our Top 3 High-Converting Email Templates",
    startingPrice: "From $1,200",
    schemaPrice: "1200",
    packages: [
      { name: "Basic", price: "$1,200", deliverables: ["Lead magnet design", "5-email drip sequence", "Mailchimp / Klaviyo setup", "Opt-in form"] },
      { name: "Standard", price: "$2,400", highlight: true, deliverables: ["3 lead magnets", "12-email sequence", "CRM integration", "Segmentation", "A/B test setup"] },
      { name: "Premium", price: "$4,500", deliverables: ["Full funnel build", "Unlimited sequences", "Multi-CRM sync", "SMS integration", "Ongoing optimization"] },
    ],
  },
  "seo-backlinks": {
    title: "Off-Page SEO & Link Building",
    desc: "High-authority white hat backlink campaigns that build domain power and push your rankings to page one. We build clean, contextual placements on real sites — no spam, no shortcuts.",
    details: ["White Hat Contextual Backlinks", "Detailed Delivery Report", "Premium Indexing Service", "High DA/DR Domains", "Dofollow Links Only", "Anchor Text Diversification"],
    seoTitle: "Off-Page SEO & Link Building Service | Drape Digital",
    seoDesc: "Premium white hat off-page SEO and link building service to improve your Google rankings. High DA/DR contextual backlinks from Drape Digital.",
    magnetTitle: "Get a Free Backlink Profile Audit",
    startingPrice: "From $499",
    schemaPrice: "499",
    packages: [
      { name: "Basic", price: "$499", deliverables: ["35 high-quality backlinks", "DA 40+ domains", "4-day delivery", "Detailed report"] },
      { name: "Standard", price: "$899", highlight: true, deliverables: ["80 high-quality backlinks", "DA 50+ domains", "Contextual placements", "Indexing service", "Anchor diversity"] },
      { name: "Premium", price: "$1,499", deliverables: ["170 high-quality backlinks", "DA 60+ domains", "Full campaign strategy", "Monthly drip delivery", "Priority support"] },
    ],
  },
  "dofollow-backlinks": {
    title: "High DA Dofollow Backlinks",
    desc: "Contextual dofollow placements on DR 60–90 domains. Built manually, indexed correctly, and designed to compound ranking power over time.",
    details: ["Dofollow Contextual Links", "DR 60–90 Domains", "Manual Outreach Only", "Detailed Report", "Premium Indexing", "100% White Hat"],
    seoTitle: "High DA Dofollow Backlinks Service | Drape Digital",
    seoDesc: "Build your domain authority with high DA dofollow backlinks. DR 60–90 placements, 100% white hat. Starting from $599.",
    magnetTitle: "Request a Free Domain Authority Analysis",
    startingPrice: "From $599",
    schemaPrice: "599",
    packages: [
      { name: "Basic", price: "$599", deliverables: ["35 DA 60+ dofollow links", "Contextual placement", "5-day delivery", "Full report"] },
      { name: "Standard", price: "$999", highlight: true, deliverables: ["75 DA 70+ dofollow links", "Niche-relevant sites", "Indexing included", "Anchor strategy"] },
      { name: "Premium", price: "$1,799", deliverables: ["160 DA 80+ dofollow links", "DR 70+ guaranteed", "Drip schedule", "Ahrefs tracking", "Priority delivery"] },
    ],
  },
  "local-seo": {
    title: "Local SEO & Google My Business",
    desc: "Dominate your local market with GMB profile optimization, citation building, geo-targeted keyword strategy, and review management — so your business shows up first when it matters most.",
    details: ["Google My Business Optimization", "NAP Citation Building", "Geo-Targeted Content", "Review Strategy", "Local Schema Markup", "Map Pack Ranking"],
    seoTitle: "Local SEO & Google My Business Optimization | Drape Digital",
    seoDesc: "Rank higher in local search and Google Maps. Expert local SEO, GMB optimization, and citation building starting from $399.",
    magnetTitle: "Get a Free Local SEO Visibility Report",
    startingPrice: "From $399",
    schemaPrice: "399",
    packages: [
      { name: "Basic", price: "$399", deliverables: ["GMB profile optimization", "50 citations", "Local keyword audit", "Schema setup"] },
      { name: "Standard", price: "$799", highlight: true, deliverables: ["Full GMB overhaul", "200 citations", "Review strategy", "Geo content", "Monthly report"] },
      { name: "Premium", price: "$1,299", deliverables: ["Multi-location setup", "500 citations", "Competitor tracking", "Map pack strategy", "Ongoing management"] },
    ],
  },
  "ai-seo": {
    title: "GEO / AEO / AI Search Visibility",
    desc: "The future of search is AI. We build your brand's authority so ChatGPT, Gemini, Perplexity, and Google AI Overviews cite and recommend you — using GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) strategies.",
    details: ["AI Overview Visibility", "ChatGPT & Gemini Citations", "Structured Data for AI", "Entity SEO", "AEO Content Strategy", "LLMs.txt Setup"],
    seoTitle: "GEO / AEO / AI Search Visibility Service | Drape Digital",
    seoDesc: "Get your business cited by ChatGPT, Gemini, and Perplexity. Expert GEO and AEO services to rank in the AI search era. Starting from $499.",
    magnetTitle: "Get Your Free AI Search Visibility Audit",
    startingPrice: "From $499",
    schemaPrice: "499",
    packages: [
      { name: "Basic", price: "$499", deliverables: ["AI visibility audit", "LLMs.txt setup", "Entity optimization", "Structured data review"] },
      { name: "Standard", price: "$999", highlight: true, deliverables: ["Full AEO strategy", "AI content writing", "Schema overhaul", "Citation building", "AI crawler setup"] },
      { name: "Premium", price: "$1,999", deliverables: ["Full GEO campaign", "Monthly AI content", "Competitor gap analysis", "Multi-platform AI presence", "Monthly reporting"] },
    ],
  },
  "monthly-seo": {
    title: "Monthly SEO Retainer",
    desc: "A fully managed, results-driven SEO operation handled entirely by our team — on-page, off-page, technical fixes, content production, and a monthly performance report. You focus on your business; we handle the rankings.",
    details: ["On-Page & Technical SEO", "Off-Page Link Building", "Monthly Content Production", "Keyword Rank Tracking", "Core Web Vitals Monitoring", "Monthly Strategy Report"],
    seoTitle: "Monthly SEO Retainer Service | Drape Digital",
    seoDesc: "Fully managed monthly SEO service including on-page, off-page, technical, content, and reporting. From $999/month.",
    magnetTitle: "Get a Free Monthly SEO Roadmap for Your Site",
    startingPrice: "From $999/mo",
    schemaPrice: "999",
    packages: [
      { name: "Starter", price: "$999/mo", deliverables: ["Technical SEO fixes", "20 backlinks/mo", "2 blog posts/mo", "Monthly report"] },
      { name: "Growth", price: "$1,999/mo", highlight: true, deliverables: ["Everything in Starter", "50 backlinks/mo", "5 blog posts/mo", "Competitor tracking", "Quarterly strategy call"] },
      { name: "Authority", price: "$3,999/mo", deliverables: ["Full SEO management", "100+ backlinks/mo", "Daily monitoring", "Dedicated strategist", "Weekly reporting"] },
    ],
  },
  "seo-content": {
    title: "SEO Copywriting & Blog Writing",
    desc: "Expert-written, keyword-optimized articles, landing pages, and blog posts engineered to rank on Google and convert readers into customers.",
    details: ["Keyword-Targeted Articles", "E-E-A-T Optimized Writing", "Internal Linking Strategy", "Meta Tags & Schema", "24–48h Turnaround", "Royalty-Free Images Included"],
    seoTitle: "SEO Copywriting & Blog Writing Service | Drape Digital",
    seoDesc: "Professional SEO article writing and blog posts optimized to rank on Google. Expert copywriting from $599.",
    magnetTitle: "Get a Free SEO Content Audit of Your Top 5 Pages",
    startingPrice: "From $599",
    schemaPrice: "599",
    packages: [
      { name: "Basic", price: "$599", deliverables: ["5 SEO articles", "1,500 words each", "Keyword research", "Meta tags included"] },
      { name: "Standard", price: "$1,199", highlight: true, deliverables: ["12 SEO articles", "Up to 2,500 words", "Internal linking", "Images included", "24h turnaround"] },
      { name: "Premium", price: "$2,499", deliverables: ["30 articles/month", "Landing page copy", "Full content calendar", "Topic cluster strategy", "Priority delivery"] },
    ],
  },
  "google-maps-citations": {
    title: "Google Maps Citations & Local Presence",
    desc: "Thousands of NAP-consistent citations across authoritative local directories, data aggregators, and niche platforms — so Google trusts your business location and keeps you in the map pack.",
    details: ["NAP-Consistent Citations", "Data Aggregator Submission", "Google Maps Optimization", "Local Directory Listings", "Duplicate Removal", "Detailed Submission Report"],
    seoTitle: "Google Maps Citations & Local SEO Service | Drape Digital",
    seoDesc: "Build local authority with thousands of NAP-consistent Google Maps citations. Local SEO citation building from $299.",
    magnetTitle: "Get a Free Local Citation Audit",
    startingPrice: "From $299",
    schemaPrice: "299",
    packages: [
      { name: "Basic", price: "$299", deliverables: ["5,000 citations", "Tier-1 directories", "NAP consistency check", "Full report"] },
      { name: "Standard", price: "$599", highlight: true, deliverables: ["19,000 citations", "Data aggregators", "Duplicate removal", "Google Maps focus", "7-day delivery"] },
      { name: "Premium", price: "$999", deliverables: ["95,000 citations", "Full local web coverage", "Niche directories", "Ongoing monitoring", "Priority delivery"] },
    ],
  },
  "technical-seo": {
    title: "Technical SEO & On-Page Optimization",
    desc: "A deep technical audit and complete implementation — Core Web Vitals, crawlability, schema markup, canonicals, site architecture, and on-page SEO — everything Google needs to rank you higher.",
    details: ["Full Technical Audit", "Core Web Vitals Fixes", "Schema / JSON-LD Implementation", "Canonical & Redirect Fixes", "Page Speed Optimization", "On-Page SEO (titles, H-tags, meta)"],
    seoTitle: "Technical SEO & On-Page Optimization Service | Drape Digital",
    seoDesc: "Complete technical SEO audit and implementation. Core Web Vitals, schema, canonicals, and on-page optimization from $699.",
    magnetTitle: "Get a Free Technical SEO Score for Your Site",
    startingPrice: "From $699",
    schemaPrice: "699",
    packages: [
      { name: "Basic", price: "$699", deliverables: ["Full technical audit", "Top 20 priority fixes", "Core Web Vitals report", "Meta optimization"] },
      { name: "Standard", price: "$1,299", highlight: true, deliverables: ["Everything in Basic", "Full implementation", "Schema markup", "Page speed fixes", "Sitemap & robots.txt"] },
      { name: "Premium", price: "$2,499", deliverables: ["Complete on-page overhaul", "Site architecture redesign", "Internal linking rebuild", "Monthly monitoring", "Priority support"] },
    ],
  },
  "authority-backlinks": {
    title: "White Hat Authority Backlinks (DR 70+)",
    desc: "Premium manual link placements on DR 70+ domains. Built through genuine outreach — no PBNs, no spam, no shortcuts. Just high-trust, high-authority links that move the needle.",
    details: ["DR 70+ Guaranteed Domains", "100% Manual Outreach", "No PBNs or Spam", "Contextual Dofollow Placements", "Ahrefs-Verified Reports", "Permanent Links"],
    seoTitle: "White Hat Authority Backlinks DR 70+ | Drape Digital",
    seoDesc: "Premium DR 70+ white hat authority backlinks built through manual outreach. No PBNs. Permanent, contextual, dofollow links. From $799.",
    magnetTitle: "Get a Free Authority Gap Analysis vs. Your Competitors",
    startingPrice: "From $799",
    schemaPrice: "799",
    packages: [
      { name: "Basic", price: "$799", deliverables: ["10 DR 70+ links", "Manual outreach", "Permanent placement", "Ahrefs report"] },
      { name: "Standard", price: "$1,499", highlight: true, deliverables: ["25 DR 70+ links", "Niche-relevant sites", "Contextual copy", "Indexing service", "Full report"] },
      { name: "Premium", price: "$2,999", deliverables: ["60 DR 70+ links", "DR 80+ target", "Anchor strategy", "Drip delivery", "Priority support"] },
    ],
  },
  "guest-posts": {
    title: "Guest Posts on DA 90+ Sites",
    desc: "Editorial-quality guest posts published on DA 90+ websites in your niche. Each placement is permanent, dofollow, and written to editorial standard — no advertorial disclaimers, no thin content.",
    details: ["DA 90+ Host Sites", "Editorial-Standard Content", "Permanent Dofollow Links", "Niche-Relevant Placements", "No Advertorial Disclosures", "Full Transparency Reports"],
    seoTitle: "Guest Posts on DA 90+ Websites | Drape Digital",
    seoDesc: "High-authority guest post placements on DA 90+ websites. Permanent dofollow links, editorial-standard content. From $499.",
    magnetTitle: "Get a Free Guest Post Opportunity Report for Your Niche",
    startingPrice: "From $499",
    schemaPrice: "499",
    packages: [
      { name: "Basic", price: "$499", deliverables: ["2 DA 90+ guest posts", "500-word articles", "1 dofollow link each", "Placement report"] },
      { name: "Standard", price: "$999", highlight: true, deliverables: ["5 DA 90+ guest posts", "800-word articles", "Niche matching", "Anchor diversity", "7-day delivery"] },
      { name: "Premium", price: "$1,999", deliverables: ["12 DA 90+ guest posts", "1,500-word articles", "Premium site selection", "Link indexing", "Priority delivery"] },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "captcha_error">("idle");
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    setCaptcha(prev => ({ ...prev, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 }));
  }, [slug]);

  const handleCheckout = async (pkg: Package) => {
    setCheckoutLoading(pkg.name);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: service.title,
          packageName: pkg.name,
          price: pkg.price,
          slug,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
        setCheckoutLoading(null);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      setCheckoutLoading(null);
    }
  };

  useEffect(() => {
    setCaptcha(prev => ({ ...prev, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 }));
  }, []);

  if (!service) {
    return <div className="pt-40 container mx-auto px-6 text-center text-xl">Service not found.</div>;
  }

  const canonicalUrl = `https://drape.digital/services/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drape.digital/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://drape.digital/services" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": canonicalUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "description": service.seoDesc,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "@id": "https://drape.digital/#organization",
      "name": "Drape Digital",
    },
    "offers": {
      "@type": "Offer",
      "price": service.schemaPrice,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-12-31",
      "url": canonicalUrl,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "346",
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  const faqs = [
    {
      q: `What is the timeline for your ${service.title} service?`,
      a: "Our standard turnaround time depends on the package selected. Basic packages typically complete within 1-2 weeks, while more complex Premium implementations may take 3-6 weeks. We prioritize quality and thoroughness over rushing.",
    },
    {
      q: `Do you offer ongoing support after the ${service.title} project is complete?`,
      a: "Yes. Our standard and premium packages include dedicated support periods. Beyond that, we offer monthly retainers to ensure your system continues to perform optimally as your business scales.",
    },
    {
      q: "Can I upgrade my package later?",
      a: "Absolutely. Many of our clients start with a basic or standard tier and upgrade as their revenue and requirements grow. We design everything with scale in mind.",
    },
    {
      q: "What makes your approach different from other agencies?",
      a: "We believe in a 'Show, Don't Tell' model. We don't just send you wireframes or abstract proposals. We deliver fully functioning, high-end assets that command authority in your niche.",
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const handleMagnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      setStatus("captcha_error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, service: service.title, companyName: "Lead Magnet Request", url: "" }),
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
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 container mx-auto">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="text-sm font-semibold text-agency-muted hover:text-agency-white mb-8 inline-block uppercase tracking-widest border-b border-agency-muted/30 hover:border-agency-white pb-1 transition-colors">
              &larr; Back to Services
            </Link>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">{service.title}</h1>
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="font-mono text-agency-accent font-bold text-lg">{service.startingPrice}</span>
              <span className="text-agency-white/30">·</span>
              <div className="flex gap-1 text-agency-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <span className="text-sm font-semibold text-agency-white/80">4.9/5</span>
              <span className="text-agency-white/30">·</span>
              <span className="text-sm text-agency-white/50">3 tiers available</span>
            </div>
            <p className="text-xl md:text-3xl font-light text-agency-muted leading-relaxed">{service.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Details & Features */}
      <section className="py-20 bg-agency-gray border-y border-agency-white/5">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-8">
            <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            <span>What we deliver</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {service.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b border-agency-white/10 pb-6">
                <CheckCircle2 className="text-agency-accent shrink-0" />
                <span className="text-lg md:text-xl text-agency-white/80">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-agency-black border-b border-agency-white/5">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-12">
            <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            <span>Pricing Packages</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  pkg.highlight
                    ? "border-agency-accent bg-agency-accent/5 shadow-xl shadow-agency-accent/10"
                    : "border-agency-white/10 bg-agency-gray"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-agency-accent text-agency-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-agency-muted mb-2">{pkg.name}</p>
                  <p className="text-4xl font-black text-agency-white">{pkg.price}</p>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {pkg.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-agency-white/70 text-sm">
                      <CheckCircle2 size={16} className="text-agency-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(pkg)}
                  disabled={checkoutLoading !== null}
                  className={`text-center py-3 px-6 rounded-full font-bold text-sm uppercase tracking-tight transition-all flex items-center justify-center gap-2 w-full ${
                    pkg.highlight
                      ? "accent-gradient text-agency-white shadow-lg hover:opacity-90"
                      : "border border-agency-white/20 text-agency-white hover:bg-agency-white/5"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {checkoutLoading === pkg.name ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : (
                    <>Get Started <ArrowRight size={14} /></>  
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-agency-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-12">
            <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            <span>Frequently Asked Questions</span>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-agency-white/10 rounded-xl overflow-hidden bg-agency-gray/50">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-agency-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-agency-white">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="text-agency-accent shrink-0" />
                  ) : (
                    <ChevronDown className="text-agency-white/40 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-agency-white/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-32 relative overflow-hidden bg-agency-white text-agency-black">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">{service.magnetTitle}</h2>
          <p className="mb-10 text-xl text-agency-black/70">Enter your email and we'll send it straight to your inbox. No spam.</p>
          <form onSubmit={handleMagnetSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="email"
                required
                placeholder="Your professional email"
                className="flex-1 bg-agency-black/5 border border-agency-black/20 text-agency-black px-6 py-4 rounded-full outline-none focus:border-agency-black/50 transition-colors font-semibold"
                value={email}
                onChange={(e) => { setStatus("idle"); setEmail(e.target.value); }}
                disabled={status === 'loading' || status === 'success'}
              />
              <input
                type="text"
                required
                placeholder={`${captcha.num1} + ${captcha.num2} = ?`}
                className={`w-full sm:w-32 bg-agency-black/5 border ${status === 'captcha_error' ? 'border-red-500 text-red-500' : 'border-agency-black/20'} text-agency-black px-6 py-4 rounded-full outline-none focus:border-agency-black/50 transition-colors font-semibold`}
                value={captcha.answer}
                onChange={(e) => { setStatus("idle"); setCaptcha(prev => ({ ...prev, answer: e.target.value })); }}
                disabled={status === 'loading' || status === 'success'}
                title="Please solve this simple math question to verify you are human"
              />
            </div>
            {status === "captcha_error" && <p className="text-red-500 text-sm font-semibold">Incorrect math answer. Please try again.</p>}
            {status === 'error' && <p className="text-red-500 mt-2 font-semibold">Something went wrong. Please try again.</p>}
            <button
              type="submit"
              className="accent-gradient text-agency-white px-8 py-4 rounded-full font-bold text-sm tracking-tight uppercase shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full mt-2"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Get It Now'}
              {status !== 'success' && status !== 'loading' && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
