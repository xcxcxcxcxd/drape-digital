import { Helmet } from "react-helmet-async";

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy | Drape Digital</title>
        <meta name="description" content="Drape Digital Refund Policy — our fair and transparent refund terms for all services." />
        <link rel="canonical" href="https://drape.digital/refund-policy" />
      </Helmet>
      <section className="pt-40 pb-24 px-6 container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-tight">Refund Policy</h1>
        <p className="text-agency-muted text-sm mb-16">Last updated: 20 July 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-10 text-agency-white/80 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Our Commitment</h2>
            <p>At Drape Digital, we operate on a build-first model — for web design and development projects, you see a fully working demo before you pay. This means you only pay for work you've already seen and approved. We stand behind the quality of everything we deliver.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Web Design & Development Projects</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-agency-white">Before payment:</strong> No charge, no obligation. If you don't love the demo, you don't pay.</li>
              <li><strong className="text-agency-white">After payment (within 48 hours):</strong> If you experience a technical issue that prevents delivery of the agreed scope, contact us and we will resolve it or issue a full refund.</li>
              <li><strong className="text-agency-white">After 48 hours / work in progress:</strong> Refunds are not available once the revision and handover process has begun, unless we are unable to deliver the agreed deliverables.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">SEO & Link Building Services</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-agency-white">If we fail to deliver</strong> the agreed number of links or placements within the stated timeframe, we will either complete the remaining deliverables at no extra cost or issue a pro-rated refund.</li>
              <li><strong className="text-agency-white">No guarantee of rankings.</strong> Refunds are not issued on the basis of search ranking outcomes, as rankings are influenced by many external factors outside our control.</li>
              <li><strong className="text-agency-white">Completed campaigns</strong> are non-refundable once all deliverables have been provided and reported.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Monthly SEO Retainer</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>You may cancel your retainer at any time with 30 days' written notice to contact@drape.digital.</li>
              <li>The current billing cycle will not be refunded upon cancellation — you will retain access to all services until the end of that paid period.</li>
              <li>If we fail to deliver the agreed monthly deliverables, a pro-rated credit or refund will be issued.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">SEO Copywriting & Content</h2>
            <p>Refunds are available if:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Content has not yet been delivered.</li>
              <li>Delivered content does not meet the agreed brief and we are unable to resolve this with revisions.</li>
            </ul>
            <p className="mt-3">No refunds are issued for delivered and approved content.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Guest Posts & Backlinks</h2>
            <p>If a confirmed guest post placement or backlink is removed within 12 months of delivery, we will replace it at no additional cost. This replacement guarantee does not apply to domains that change ownership or shut down.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">How to Request a Refund</h2>
            <p>Email us at <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a> with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your order/payment reference</li>
              <li>The service purchased</li>
              <li>Your reason for the refund request</li>
            </ul>
            <p className="mt-3">We will respond within 2 business days. Approved refunds are processed within 5–10 business days via the original payment method (Stripe).</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Contact</h2>
            <p>Questions? <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a></p>
          </div>

        </div>
      </section>
    </>
  );
}
