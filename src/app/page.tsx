import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      name: "Air Freight",
      tagline: "When Every Minute Counts",
      description: "Express and time-critical air cargo solutions with GSA/CSA expertise for major carriers.",
      icon: "✈️",
    },
    {
      name: "Ocean Freight",
      tagline: "Global Reach, Local Expertise",
      description: "Full container load (FCL) and less than container load (LCL) services worldwide.",
      icon: "🚢",
    },
    {
      name: "Project Cargo",
      tagline: "Complex Solutions Made Simple",
      description: "Specialized handling for oversized, heavy, and high-value project shipments.",
      icon: "📦",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Services Section */}
      <section className="section-md bg-white">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-primary">
              Specialized Logistics Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-3 md:mt-4">
              Time-Critical. Mission-Critical. Trust GOODMAN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl md:text-2xl mb-2 text-primary">
                  {service.name}
                </h3>
                <p className="text-accent font-semibold mb-3 text-sm md:text-base">{service.tagline}</p>
                <p className="text-gray-600 mb-6 text-sm md:text-base">{service.description}</p>
                <Link href="/services" className="text-accent font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-2 text-sm md:text-base">
                  Learn More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSA/CSA Expertise */}
      <section className="section-md gradient-primary text-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white mb-4 md:mb-6">GSA/CSA Expertise</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-3 md:mb-4">Your Gateway to the Korean Market</p>
            <p className="text-sm md:text-base text-gray-300 mb-8 md:mb-10 px-4">
              As General Sales Agent and Cargo Sales Agent for multiple airlines, we provide unparalleled access to capacity and competitive rates on key routes connecting Korea to the world.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              {['Seoul-LA', 'Seoul-NYC', 'Seoul-Frankfurt', 'Seoul-Singapore'].map((route) => (
                <div key={route} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <div className="text-accent-foreground font-bold text-sm md:text-lg">{route}</div>
                  <div className="text-xs md:text-sm text-gray-300 mt-1">Daily Service</div>
                </div>
              ))}
            </div>

            <Link href="/network-solutions" className="btn btn-primary btn-large">
              View Our Airline Partners
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Hub CTA */}
      <section className="section-md bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="card card-gradient">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <h2 className="text-primary mb-3 md:mb-4">
                    Partner Hub
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 mb-3 md:mb-4">
                    Exclusive Resources for Our Global Network
                  </p>
                  <ul className="space-y-2 md:space-y-3 mb-6">
                    <li className="flex items-start gap-2 md:gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base">Agent Zone - Partner Registration & Tariff Access</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base">Market Insights - Korea Trade Intelligence Reports</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base">Dedicated Account Management</span>
                    </li>
                  </ul>
                  <Link href="/partner-hub" className="btn btn-secondary btn-large w-full md:w-auto">
                    Access Partner Portal
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="aspect-square bg-gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 md:w-32 md:h-32 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-md bg-white">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-primary">Let's Connect</h2>
            <p className="text-lg md:text-xl text-gray-600 mt-3 md:mt-4">24/7 Support for Your Logistics Needs</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Info */}
              <div className="card">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                  Get in Touch
                </h3>
                <div className="space-y-3 md:space-y-4 text-gray-700">
                  <div className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-sm md:text-base">Office Location</div>
                      <div className="text-xs md:text-sm">Seoul, Republic of Korea</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-sm md:text-base">Email</div>
                      <div className="text-xs md:text-sm">contact@goodmangls.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-sm md:text-base">Office Hours</div>
                      <div className="text-xs md:text-sm">Mon-Fri 9:00-18:00 KST</div>
                      <div className="text-xs md:text-sm text-accent mt-1">Emergency: 24/7 via WhatsApp/WeChat</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Form */}
              <div className="card">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                  Quick Inquiry
                </h3>
                <form className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors"
                  ></textarea>
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
