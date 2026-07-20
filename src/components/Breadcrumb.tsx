import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";

const routeLabels: Record<string, string> = {
  services: "Services",
  portfolio: "Portfolio",
  about: "About",
  contact: "Contact",
  // Web services
  "web-design": "Web Design",
  development: "Web Development",
  ecommerce: "E-Commerce",
  seo: "SEO & Performance",
  "email-automation": "Email Automation",
  // SEO services
  "seo-backlinks": "Off-Page SEO & Link Building",
  "dofollow-backlinks": "High DA Dofollow Backlinks",
  "local-seo": "Local SEO & Google My Business",
  "ai-seo": "GEO / AEO / AI Search Visibility",
  "monthly-seo": "Monthly SEO Retainer",
  "seo-content": "SEO Copywriting & Blog Writing",
  "google-maps-citations": "Google Maps Citations",
  "technical-seo": "Technical SEO & On-Page Optimization",
  "authority-backlinks": "White Hat Authority Backlinks",
  "guest-posts": "Guest Posts on DA 90+ Sites",
};

export function Breadcrumb() {
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === "/") return null;

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((seg, idx) => ({
      label: routeLabels[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href: "/" + segments.slice(0, idx + 1).join("/"),
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      item: `https://drape.digital${crumb.href}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-agency-black/60 border-b border-agency-white/5 backdrop-blur-sm pt-[104px] pb-4"
      >
        <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          {crumbs.map((crumb, idx) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {idx < crumbs.length - 1 ? (
                <>
                  <Link
                    to={crumb.href}
                    className="text-agency-muted hover:text-agency-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight size={12} className="text-agency-white/20" />
                </>
              ) : (
                <span className="text-agency-accent">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
}
