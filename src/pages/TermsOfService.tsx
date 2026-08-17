import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Drape Digital</title>
        <meta name="description" content="Drape Digital Terms of Service — the rules and conditions governing use of our services." />
        <link rel="canonical" href="https://drape.digital/terms-of-service" />
      </Helmet>
      <section className="pt-32 md:pt-40 pb-24 px-6 container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-tight">Terms of Service</h1>
        <p className="text-agency-muted text-sm mb-16">Last updated: 20 July 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-10 text-agency-white/80 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using the services provided by Drape Digital ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">2. Services</h2>
            <p>Drape Digital provides web design, web development, e-commerce, SEO, link building, content writing, local SEO, and email automation services. Service specifications, deliverables, and timelines are outlined at the time of purchase or in a separate written agreement.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">3. The Build-First Model</h2>
            <p>For web design and development projects, we operate a "build-first" model where we create a functional demo of your website before any payment is due. This demo is hosted on a private subdomain (yourbusiness.drape.digital). You are only charged if you approve the demo and wish to proceed. Demos that are not approved within 30 days may be removed from our servers.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">4. Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are displayed in USD unless stated otherwise.</li>
              <li>Payments are processed securely via Stripe. By making a payment, you also agree to Stripe's <a href="https://stripe.com/legal/consumer" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a>.</li>
              <li>One-time payments are charged immediately upon purchase.</li>
              <li>Monthly retainer services are billed on a recurring monthly basis. You may cancel at any time with 30 days' written notice.</li>
              <li>All payments are non-refundable unless stated in our Refund Policy below or agreed in writing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">5. Client Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide accurate and timely information required to complete your project.</li>
              <li>Ensure that any content, images, or materials you supply do not infringe third-party intellectual property rights.</li>
              <li>Review and approve deliverables within agreed timescales.</li>
              <li>Not use our services for any unlawful, harmful, or fraudulent purpose.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">6. Intellectual Property</h2>
            <p>Upon receipt of full payment, you own all rights to the final deliverables (website design, content, code) created specifically for your project, except for any third-party components (fonts, stock images, libraries) which are subject to their own licences.</p>
            <p className="mt-3">We retain the right to display your project in our portfolio unless you request otherwise in writing.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">7. SEO & Marketing Services</h2>
            <p>SEO results are not guaranteed. We implement best-practice strategies, but search engine rankings depend on many factors outside our control (algorithm changes, competitor activity, domain age, etc.). We do not guarantee specific ranking positions or traffic targets.</p>
            <p className="mt-3">All link-building work is conducted using white hat, Google-compliant methods.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Drape Digital shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services or website. Our total liability to you shall not exceed the amount you paid for the specific service giving rise to the claim.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">9. Governing Law</h2>
            <p>These Terms are governed by the laws of Morocco. Any disputes shall be subject to the exclusive jurisdiction of the courts of Tetouan, Morocco, unless otherwise required by applicable consumer protection law in your jurisdiction.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">10. Changes to Terms</h2>
            <p>We may update these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms. We will notify active clients of material changes by email.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">11. Contact</h2>
            <p>Questions? Email us at <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a>.</p>
          </div>

        </div>
      </section>
    </>
  );
}
