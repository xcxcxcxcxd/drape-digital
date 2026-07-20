import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Monitor, Zap } from "lucide-react";
import * as THREE from "three";
import Testimonials from "../components/Testimonials";

// --- 3D Components ---
function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#00D1FF"
          emissive="#0066FF"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <HeroObject />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}

// --- Typing Animation Component ---
function SubdomainTyper() {
  const [typedText, setTypedText] = useState("");
  const words = ["joesbarbershop", "acme-corp", "local-bakery", "yourbusiness"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypedText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      } else {
        setTypedText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === currentWord) {
        if (wordIndex === words.length - 1) {
          // Stop at the last word
          setTypingSpeed(9999999);
          return;
        }
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, typingSpeed, words]);

  return (
    <div className="font-mono text-sm md:text-lg text-agency-accent bg-[#111] border border-[#333] px-4 py-2 rounded-md inline-block shadow-lg">
      <span className="text-agency-white">{typedText}</span>
      <span className="text-agency-accent/70">.drape.digital</span>
      <span className="animate-pulse inline-block w-[2px] h-4 md:h-5 bg-agency-white align-middle ml-1"></span>
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Drape Digital | Premium Custom Website Design Agency</title>
        <meta name="description" content="We design and build custom websites for businesses. Experience our unique 'see-your-site-before-you-pay' approach." />
        {/* JSON-LD structured data is in index.html (global @graph) */}
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute -top-48 -right-48 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-agency-accent-dark/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-agency-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <HeroScene />
        
        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center"
          style={{ y: yParallax, opacity: opacityParallax }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-3 text-agency-accent font-bold tracking-widest text-[10px] uppercase mb-8">
              <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
              <span>The Zero-Risk Agency</span>
              <span className="w-8 h-[1px] bg-agency-accent-dark"></span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              WE BUILD IT <br />
              <span className="text-outline">BEFORE</span> YOU <br />
              <span className="text-agency-accent">PAY.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-agency-muted max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Most agencies sell you promises. We sell you the finished product. See your custom site live on a private subdomain before signing a single contract.
            </p>
            
            <SubdomainTyper />
            
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="glass p-1 rounded-full flex items-center sm:pr-6 space-x-4 flex-col sm:flex-row gap-4 sm:gap-0">
                <Link to="/contact" className="accent-gradient px-8 py-4 rounded-full font-bold text-sm tracking-tight shadow-xl shadow-agency-accent/20 w-full sm:w-auto text-center hover:opacity-90 transition-opacity">
                  Request Your Demo
                </Link>
                <div className="text-xs text-agency-muted hidden sm:block text-left">
                  <span className="block font-bold text-agency-white">Live in 72h</span>
                  Zero obligation
                </div>
              </div>
              
              <Link to="/portfolio" className="px-8 py-4 bg-transparent border border-agency-white/20 text-agency-white font-bold text-sm tracking-tight rounded-full hover:bg-agency-white/5 transition-all duration-300 w-full sm:w-auto text-center">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Architecture / How it works */}
      <section className="py-32 bg-agency-black relative z-10 border-t border-agency-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">A frictionless approach to web design.</h2>
            <p className="text-xl text-agency-white/60">Most agencies sell you a promise. We build the product first, so you know exactly what you're getting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "The Pitch",
                desc: "We analyze your current presence, build a bespoke design direction, and reach out to you with a tailored concept.",
                icon: <Zap size={32} className="text-agency-white/50" />
              },
              {
                step: "02",
                title: "The Live Demo",
                desc: "We build a functional prototype of your new site and host it on a private subdomain for you to interact with on your own devices.",
                icon: <Monitor size={32} className="text-agency-white/50" />
              },
              {
                step: "03",
                title: "The Handover",
                desc: "You review the live site. If you love it, we finalize the details, migrate it to your domain, and hand you the keys.",
                icon: <Code size={32} className="text-agency-white/50" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-agency-gray p-10 rounded-2xl border border-agency-white/5 hover:border-agency-white/20 transition-colors group"
              >
                <div className="flex justify-between items-start mb-8">
                  {item.icon}
                  <span className="font-mono text-sm text-agency-white/30 group-hover:text-agency-white/60 transition-colors">{item.step}</span>
                </div>
                <h3 className="text-2xl font-display font-medium mb-4">{item.title}</h3>
                <p className="text-agency-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Snapshot */}
      <section className="py-32 bg-agency-black relative z-10 border-t border-agency-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-3xl md:text-5xl font-display font-medium max-w-2xl">Digital experiences that command attention.</h2>
            <Link to="/services" className="border-b border-agency-white pb-1 hover:text-agency-white/70 hover:border-agency-white/70 transition-colors shrink-0">
              Explore All Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-agency-white/10">
            {/* Mock Services */}
            {["Web Design", "Development", "E-Commerce", "SEO"].map((service, i) => (
              <Link 
                key={i} 
                to={`/services/${service.toLowerCase().replace(' ', '-')}`}
                className="group bg-agency-black p-12 hover:bg-agency-gray transition-colors relative overflow-hidden"
              >
                <h3 className="text-3xl font-display font-medium mb-4">{service}</h3>
                <p className="text-agency-white/50 max-w-sm mb-12">Crafting high-performance digital environments tailored to your brand.</p>
                <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-agency-white/30 group-hover:text-agency-white transition-colors">
                  Learn More <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-40 relative z-10 bg-agency-white text-agency-black text-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tight mb-8">Ready to see your new site?</h2>
          <p className="text-xl md:text-2xl text-agency-black/60 mb-12 font-light">
            Request a zero-commitment demo build. We'll send you a link to a live site built just for your business.
          </p>
          <Link to="/contact" className="px-10 py-5 bg-agency-black text-agency-white font-medium rounded-full hover:bg-agency-gray transition-all shadow-xl hover:shadow-2xl text-lg inline-block">
            Start the Process
          </Link>
        </motion.div>
      </section>
    </>
  );
}
