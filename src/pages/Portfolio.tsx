import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const projects = [
  { id: 1, name: "Aura Skincare", type: "E-Commerce", year: "2024", color: "bg-amber-900", link: "/demos/aura/", image: "/demos/aura/assets/hero-aura.png" },
  { id: 2, name: "Nexus FinTech", type: "Web App", year: "2023", color: "bg-blue-900", link: "/demos/nexus/", image: "/demos/nexus/assets/nexus-dashboard.png" },
  { id: 3, name: "Lumina Architecture", type: "Portfolio", year: "2024", color: "bg-stone-800", link: "/demos/lumina/", image: "/demos/lumina/assets/lumina-hero.png" },
  { id: 4, name: "Vertex Consulting", type: "Corporate", year: "2023", color: "bg-emerald-900", link: "/demos/vertex/", image: "/demos/vertex/assets/vertex-hero.png" },
  { id: 5, name: "Solstice Energy", type: "B2B SaaS", year: "2024", color: "bg-orange-950", link: "/demos/solstice/", image: "/demos/solstice/assets/solstice-hero.png" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Transform vertical scroll to horizontal movement
  // We use exactly matching string templates so Framer Motion can interpolate the numbers properly.
  // -100% (of the w-max container) + 100vw (the screen width) aligns the right edge perfectly.
  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);

  return (
    <>
      <Helmet>
        <title>Portfolio & Case Studies | Drape Digital</title>
        <meta name="description" content="View our portfolio of custom website designs and high-converting e-commerce sites." />
      </Helmet>

      <section className="pt-32 md:pt-40 pb-20 px-6 container mx-auto">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase leading-[0.9] text-center md:text-left">Select Work.</h1>
        <p className="text-xl md:text-2xl text-agency-muted max-w-2xl font-light text-center md:text-left">
          A collection of digital experiences designed to convert, perform, and establish market dominance.
        </p>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-agency-black">
           <motion.div style={{ x }} className="flex w-max gap-8 px-6 md:px-24">
             {projects.map((project, idx) => {
                const CardWrapper = project.link ? 'a' : 'div';
                const props = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};
                return (
                <CardWrapper key={project.id} {...(props as any)} className="w-[85vw] md:w-[60vw] h-[60vh] shrink-0 relative group cursor-pointer overflow-hidden rounded-2xl block">
                   {/* Background Image or Color */}
                   <div className={`absolute inset-0 ${project.color} transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100`}>
                     {project.image && <img src={project.image} alt={project.name} className="w-full h-full object-cover" />}
                   </div>
                   
                   {/* Project Details Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-agency-black/90 via-agency-black/20 to-transparent flex flex-col justify-end p-10 md:p-16 transition-all duration-500">
                     <div className="flex justify-between items-end">
                       <div>
                         <span className="font-mono text-sm tracking-widest uppercase text-agency-white/60 mb-4 block">
                           {project.type} &mdash; {project.year}
                         </span>
                         <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight transform group-hover:translate-x-4 transition-transform duration-500">
                           {project.name}
                         </h2>
                       </div>
                       <div className="hidden md:flex w-16 h-16 rounded-full bg-agency-white/10 items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-agency-white/20">
                          <ArrowRight className="text-agency-white" />
                       </div>
                     </div>
                   </div>
                </CardWrapper>
                );
             })}
           </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-agency-white text-agency-black text-center px-6">
         <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">Ready for your own site?</h2>
         <a href="/contact" className="text-xl inline-flex items-center gap-2 border-b-2 border-agency-black pb-1 hover:pr-4 transition-all hover:text-agency-black/70 hover:border-agency-black/70">
           Request a demo <ArrowRight />
         </a>
      </section>
    </>
  );
}
