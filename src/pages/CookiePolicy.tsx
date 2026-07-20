import { Helmet } from "react-helmet-async";

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | Drape Digital</title>
        <meta name="description" content="Drape Digital Cookie Policy — what cookies we use and how you can control them." />
        <link rel="canonical" href="https://drape.digital/cookie-policy" />
      </Helmet>
      <section className="pt-40 pb-24 px-6 container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-tight">Cookie Policy</h1>
        <p className="text-agency-muted text-sm mb-16">Last updated: 20 July 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-10 text-agency-white/80 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, analyse traffic, and improve user experience. Cookies cannot run programs or deliver viruses to your computer.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Cookies We Use</h2>

            <div className="mt-4 space-y-6">
              <div className="p-6 rounded-xl border border-agency-white/10 bg-agency-gray">
                <h3 className="text-lg font-bold text-agency-white mb-2">Essential Cookies</h3>
                <p className="text-sm">Required for the website to function correctly. These cannot be disabled.</p>
                <table className="w-full mt-4 text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-agency-white/10">
                      <th className="text-left py-2 text-agency-white/60">Cookie</th>
                      <th className="text-left py-2 text-agency-white/60">Purpose</th>
                      <th className="text-left py-2 text-agency-white/60">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-agency-white/5">
                      <td className="py-2 font-mono text-agency-accent">session</td>
                      <td className="py-2">Maintains site session</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-agency-white/5">
                      <td className="py-2 font-mono text-agency-accent">__stripe_mid</td>
                      <td className="py-2">Stripe fraud prevention</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-agency-accent">__stripe_sid</td>
                      <td className="py-2">Stripe session ID</td>
                      <td className="py-2">30 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-6 rounded-xl border border-agency-white/10 bg-agency-gray">
                <h3 className="text-lg font-bold text-agency-white mb-2">Analytics Cookies</h3>
                <p className="text-sm">Help us understand how visitors interact with our site. All data is anonymised.</p>
                <table className="w-full mt-4 text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-agency-white/10">
                      <th className="text-left py-2 text-agency-white/60">Cookie</th>
                      <th className="text-left py-2 text-agency-white/60">Provider</th>
                      <th className="text-left py-2 text-agency-white/60">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-agency-white/5">
                      <td className="py-2 font-mono text-agency-accent">_ga</td>
                      <td className="py-2">Google Analytics</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-agency-white/5">
                      <td className="py-2 font-mono text-agency-accent">_ga_*</td>
                      <td className="py-2">Google Analytics (GA4)</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-agency-white/5">
                      <td className="py-2 font-mono text-agency-accent">_clck</td>
                      <td className="py-2">Microsoft Clarity</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-agency-accent">_clsk</td>
                      <td className="py-2">Microsoft Clarity</td>
                      <td className="py-2">1 day</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-6 rounded-xl border border-agency-white/10 bg-agency-gray">
                <h3 className="text-lg font-bold text-agency-white mb-2">Marketing Cookies</h3>
                <p className="text-sm">Used to track visitors across websites and display relevant advertisements.</p>
                <table className="w-full mt-4 text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-agency-white/10">
                      <th className="text-left py-2 text-agency-white/60">Cookie</th>
                      <th className="text-left py-2 text-agency-white/60">Provider</th>
                      <th className="text-left py-2 text-agency-white/60">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 font-mono text-agency-accent">_gcl_au</td>
                      <td className="py-2">Google Ads</td>
                      <td className="py-2">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">How to Control Cookies</h2>
            <p>You can control and delete cookies through your browser settings:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p className="mt-3">Note: Disabling essential cookies may affect website functionality.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Opt Out of Analytics</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li>Microsoft Clarity: <a href="https://privacy.microsoft.com/en-us/privacystatement" className="text-agency-accent hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Privacy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-agency-white mb-3">Contact</h2>
            <p>Questions about our cookie use? Email <a href="mailto:contact@drape.digital" className="text-agency-accent hover:underline">contact@drape.digital</a>.</p>
          </div>

        </div>
      </section>
    </>
  );
}
