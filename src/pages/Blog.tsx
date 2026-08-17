import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { blogPosts } from "../data/blogData";

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | Drape Digital</title>
        <meta name="description" content="Local SEO, Google Ads, and conversion strategies for emergency trades. Real numbers, no filler." />
      </Helmet>

      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-6">
              Notes on the trade.
            </h1>
            <p className="text-lg text-agency-white/60 max-w-xl mb-16">
              We don't write "5 Tips for Choosing a Locksmith." This is the actual mechanics of ranking local service businesses and getting the phone to ring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block p-8 bg-agency-gray rounded-2xl border border-agency-white/5 hover:border-agency-accent/30 transition-all group h-full flex flex-col"
                >
                  <div className="flex items-center gap-4 text-xs font-mono text-agency-white/40 mb-4">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="w-1 h-1 bg-agency-white/20 rounded-full" />
                    <span className="text-agency-accent/80">{post.category}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-agency-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-agency-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="text-xs font-bold uppercase tracking-widest text-agency-white/30 group-hover:text-agency-white/70 transition-colors mt-auto">
                    Read article →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
