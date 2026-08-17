import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPostBySlug } from "../data/blogData";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{post.title} | Drape Digital</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pt-28 md:pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-agency-white/40 hover:text-agency-white transition-colors mb-10">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="flex items-center gap-4 text-xs font-mono text-agency-white/40 mb-6">
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="w-1 h-1 bg-agency-white/20 rounded-full" />
              <span className="text-agency-accent/80">{post.category}</span>
              <span className="w-1 h-1 bg-agency-white/20 rounded-full" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-8">
              {post.title}
            </h1>

            {/* Split content by double newlines to render paragraphs */}
            <div className="section-prose space-y-6">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-agency-white/10 bg-agency-gray/30 rounded-2xl p-8 md:p-12 text-center border">
              <h3 className="text-2xl font-bold mb-4">Need help with this?</h3>
              <p className="text-agency-white/60 mb-8 max-w-md mx-auto">
                We implement this exact strategy for emergency trades every day. Book a call and we'll show you how it works for your business.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 accent-gradient rounded-full font-bold text-sm tracking-tight shadow-xl shadow-agency-accent/20 hover:shadow-agency-accent/40 transition-all group"
              >
                Book a strategy call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
