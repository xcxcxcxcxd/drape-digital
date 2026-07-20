import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Helmet>
        <title>404 Not Found | Drape Digital</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-9xl font-display font-medium text-agency-white/10 mb-8">404</h1>
      <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Page not found</h2>
      <p className="text-xl text-agency-white/60 mb-10 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="px-8 py-4 bg-agency-white text-agency-black font-medium rounded-full hover:bg-agency-accent transition-all">
        Return Home
      </Link>
    </div>
  );
}
