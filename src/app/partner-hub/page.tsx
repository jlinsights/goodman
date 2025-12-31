import Link from "next/link";

export const metadata = {
  title: "Partner Hub - Join Our Global Network | GOODMAN GLS",
  description: "Exclusive resources for GOODMAN GLS partners including agent registration, market insights, and tariff access.",
};

export default function PartnerHubPage() {
  return (
    <main>
      {/* Header */}
      <section className="gradient-primary text-white py-20">
        <div className="container text-center">
          <h1 className="text-white mb-6">Partner Hub</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Exclusive Resources for Our Global Network
          </p>
        </div>
      </section>

      {/* Agent Zone */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 style={{ color: 'var(--color-primary-900)' }}>Agent Zone</h2>
              <p className="text-xl text-gray-600 mt-4">
                Registration, Tariffs & Partnership Resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <svg className="w-12 h-12 text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-700)' }}>
                  New Partner Registration
                </h3>
                <p className="text-gray-700 mb-6">
                  Join our network of trusted logistics partners. Complete our partnership application to get started.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li>✓ Quick approval process</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ Exclusive rates & capacity</li>
                </ul>
                <Link href="#registration-form" className="btn btn-primary w-full">
                  Apply Now
                </Link>
              </div>

              <div className="card">
                <svg className="w-12 h-12 text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-700)' }}>
                  Tariff & Rate Access
                </h3>
                <p className="text-gray-700 mb-6">
                  Access our standard rate sheets and submit requests for customized pricing based on your volume.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li>✓ Air & Ocean rate sheets</li>
                  <li>✓ Volume-based discounts</li>
                  <li>✓ Quarterly rate updates</li>
                </ul>
                <button className="btn btn-outline w-full">
                  Request Tariff Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 style={{ color: 'var(--color-primary-900)' }}>Market Insights</h2>
              <p className="text-xl text-gray-600 mt-4">
                Korea Trade Intelligence & Market Reports
              </p>
            </div>

            <div className="card mb-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-primary-700)' }}>
                Why Korea Market Intelligence Matters
              </h3>
              <p className="text-gray-700 mb-6">
                South Korea is the 10th largest economy globally and a critical hub for semiconductors, automotive, and consumer electronics. Understanding Korean market trends gives you a competitive edge in the Asia-Pacific region.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">$644B</div>
                  <div className="text-sm text-gray-600 mt-2">Annual Export Value</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">#5</div>
                  <div className="text-sm text-gray-600 mt-2">Global Exporter Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">14%</div>
                  <div className="text-sm text-gray-600 mt-2">High-Tech Export Share</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "December 2024 - Korea Air Freight Rate Trends", date: "Dec 1, 2024", type: "Market Report" },
                { title: "Q4 2024 - Ocean Freight Capacity Update", date: "Nov 15, 2024", type: "Capacity Report" },
                { title: "Korea Export Forecast 2025", date: "Nov 1, 2024", type: "Industry Analysis" },
              ].map((report, index) => (
                <div key={index} className="card flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-500">{report.date} • {report.type}</p>
                  </div>
                  <button className="btn btn-outline">
                    Download PDF
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 card bg-blue-50 border-2 border-blue-200">
              <h4 className="font-bold mb-3" style={{ color: 'var(--color-primary-700)' }}>
                📧 Subscribe to Monthly Market Updates
              </h4>
              <p className="text-gray-700 mb-4">
                Get monthly Korea logistics market intelligence delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 style={{ color: 'var(--color-primary-900)' }} className="mb-8">
              Partner Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "🤝", title: "Dedicated Support", desc: "Personal account manager for all your needs" },
                { icon: "💰", title: "Competitive Rates", desc: "Volume-based pricing and special promotions" },
                { icon: "📊", title: "Business Insights", desc: "Exclusive market data and trend reports" },
                { icon: "🌐", title: "Network Access", desc: "Connect with 1000+ vetted global partners" },
                { icon: "⚡", title: "Priority Service", desc: "Fast-track processing for urgent shipments" },
                { icon: "🎓", title: "Training", desc: "Regular webinars and best practice sharing" },
              ].map((benefit, index) => (
                <div key={index} className="card">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--color-primary-700)' }}>
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href="/#contact" className="btn btn-secondary btn-large">
                Contact Partnership Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
