import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';

// Pages
import Home from './pages/Home';
import TradePage from './pages/TradePage';
import Pricing from './pages/Pricing';
import FreeHomepage from './pages/FreeHomepage';
import HowItWorks from './pages/HowItWorks';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import CookiePolicy from './pages/CookiePolicy';

// Demo Pages
import LocksmithDemo from './pages/demo/LocksmithDemo';

function AppLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/free-homepage" element={<FreeHomepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Trade Pages handled dynamically. If slug not found in tradeData, it returns NotFound */}
        <Route path="/:slug" element={<TradePage />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Demo routes without Layout */}
          <Route path="/demo/locksmith" element={<LocksmithDemo />} />
          
          {/* Main App Routes with Layout */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
