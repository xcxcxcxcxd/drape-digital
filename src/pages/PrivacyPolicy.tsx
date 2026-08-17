import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Drape Digital</title>
        <meta name="description" content="Drape Digital's Privacy Policy — how we collect, use, and protect your personal data." />
        <link rel="canonical" href="https://drape.digital/privacy-policy" />
      </Helmet>
      <section className="pt-32 md:pt-40 pb-24 px-6 container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-tight">Privacy Policy</h1>
        <p className="text-agency-muted text-sm mb-16">Last updated: 20 July 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-10 text-agency-white/80 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">1. Who We Are</h2>
            <p>Drape Digital ("we", "our", "us") is a digital agency providing web design, development, SEO, and digital marketing services. Our website is <a href="https://drape.digital" className="text-agency-accent hover:underline">https://drape.digital</a> and our contact email is contact@drape.digital.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-agency-white">Contact Information:</strong> Name, email address, company name, and website URL when you submit a contact or quote request form.</li>
              <li><strong className="text-agency-white">Payment Information:</strong> When you purchase a service, payment processing is handled by Stripe. We do not store your card details on our servers. Stripe's privacy policy applies: <a href="https://stripe.com/privacy" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</li>
              <li><strong className="text-agency-white">Analytics Data:</strong> We use Google Analytics (GA4) and Microsoft Clarity to understand how visitors use our site. These tools may collect your IP address, browser type, device, and pages visited.</li>
              <li><strong className="text-agency-white">Technical Data:</strong> Log files, cookies, and similar technologies used to maintain site functionality.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your enquiries and deliver requested services.</li>
              <li>To process payments and send order confirmations.</li>
              <li>To send you relevant follow-up communications (you can opt out at any time).</li>
              <li>To improve our website and service offerings through analytics.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p>For users in the European Economic Area (EEA) and UK, we process your data based on:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-agency-white">Contractual necessity</strong> — to deliver services you have purchased or requested.</li>
              <li><strong className="text-agency-white">Legitimate interests</strong> — for analytics and service improvement.</li>
              <li><strong className="text-agency-white">Consent</strong> — for marketing communications (where applicable).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-agency-white">Stripe</strong> — payment processing.</li>
              <li><strong className="text-agency-white">Google</strong> — analytics (GA4) and advertising.</li>
              <li><strong className="text-agency-white">Trustpilot</strong> — review invitation service.</li>
              <li><strong className="text-agency-white">Microsoft</strong> — Clarity heatmap analytics.</li>
              <li>Service providers who assist us in operating our website and business, under confidentiality obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">6. Data Retention</h2>
            <p>We retain your data for as long as necessary to provide our services and comply with legal obligations. Contact enquiry data is typically retained for up to 3 years. Payment records are retained for 7 years as required by law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Object to or restrict processing.</li>
              <li>Data portability.</li>
              <li>Withdraw consent at any time (where processing is based on consent).</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a>.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">8. Cookies</h2>
            <p>We use cookies and similar tracking technologies. Please see our <a href="/cookie-policy" className="text-agency-accent hover:underline">Cookie Policy</a> for full details.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">9. International Transfers</h2>
            <p>Your data may be transferred to and processed in countries outside your country of residence, including Spain and the United States. We ensure appropriate safeguards are in place for such transfers.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">11. Contact</h2>
            <p>For any privacy-related queries, contact us at: <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a></p>
          </div>

        </div>
      </section>
    </>
  );
}
