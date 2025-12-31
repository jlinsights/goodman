import Link from "next/link";

export const metadata = {
  title: "Services - Air, Ocean & Project Cargo | GOODMAN GLS",
  description: "Time-critical air freight, ocean freight, and project cargo solutions with GSA/CSA expertise.",
};

export default function ServicesPage() {
  const services = [
    {
      name: "Air Freight",
      icon: "✈️",
      tagline: "When Every Minute Counts",
      overview: "Our air freight division specializes in time-critical and temperature-sensitive cargo. With GSA/CSA partnerships across major airlines, we offer priority booking and competitive rates.",
      features: [
        "Express & Next Flight Out service",
        "Temperature-controlled solutions",
        "Dangerous goods certified",
        "Hand-carry services",
        "Charter arrangements"
      ],
      caseStudy: {
        title: "Semiconductor Equipment - Seoul to Austin",
        challenge: "72-hour delivery window for critical manufacturing equipment",
        solution: "Direct charter arrangement with specialized packaging",
        result: "Delivered in 48 hours, zero damage, production line met deadline"
      }
    },
    {
      name: "Ocean Freight",
      icon: "🚢",
      tagline: "Global Reach, Local Expertise",
      overview: "Full-service ocean freight solutions including FCL, LCL, and specialized container services. Our network reaches every major port worldwide.",
      features: [
        "FCL & LCL services",
        "Reefer containers",
        "Out-of-gauge cargo",
        "Door-to-door deliveries",
        "Customs brokerage"
      ],
      caseStudy: {
        title: "Manufacturing Equipment - Busan to Hamburg",
        challenge: "Oversized machinery requiring specialized container",
        solution: "Flat rack container with custom securing arrangements",
        result: "Safe transit, on-time delivery, 20% cost savings vs. air"
      }
    },
    {
      name: "Project Cargo",
      icon: "📦",
      tagline: "Complex Solutions Made Simple",
      overview: "Specialized project logistics for oversized, heavy-lift, and high-value cargo. Full project management from planning to final installation.",
      features: [
        "Route surveys & feasibility studies",
        "Multi-modal transportation",
        "Heavy-lift capabilities",
        "On-site project management",
        "Insurance & risk management"
      ],
      caseStudy: {
        title: "Power Plant Turbine - Korea to Vietnam",
        challenge: "180-ton turbine requiring multi-modal transport",
        solution: "Combined sea, river barge, and specialized road transport",
        result: "Flawless execution, 3-month project completed 2 weeks early"
      }
    }
  ];

  return (
    <main>
      {/* Header */}
      <section className="section-md gradient-primary text-white">
        <div className="container text-center px-4">
          <h1 className="text-white mb-4 md:mb-6">Our Services</h1>
          <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto">
            Time-Critical. Mission-Critical. Trust GOODMAN.
          </p>
        </div>
      </section>

      {/* Services Details */}
      {services.map((service, index) => (
        <section key={index} className={`section-md ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">{service.icon}</div>
                <h2 className="text-primary">{service.name}</h2>
                <p className="text-base md:text-xl text-accent font-semibold mt-2">{ service.tagline}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
                <div className="card">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                    Overview
                  </h3>
                  <p className="text-gray-700 mb-6 text-sm md:text-base">{service.overview}</p>
                  
                  <h4 className="font-bold mb-3 text-primary text-base md:text-lg">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card card-gradient">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                    Case Study
                  </h3>
                  <h4 className="font-bold text-base md:text-lg mb-3 text-accent">
                    {service.caseStudy.title}
                  </h4>
                  <div className="space-y-3 text-gray-700 text-sm md:text-base">
                    <div>
                      <div className="font-semibold text-xs md:text-sm text-gray-500 uppercase">Challenge</div>
                      <p>{service.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-xs md:text-sm text-gray-500 uppercase">Solution</div>
                      <p>{service.caseStudy.solution}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-xs md:text-sm text-gray-500 uppercase">Result</div>
                      <p className="text-green-700 font-medium">{service.caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-md gradient-primary text-white text-center">
        <div className="container px-4">
          <h2 className="text-white mb-4 md:mb-6">Ready to Ship?</h2>
          <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto">
            Get a customized quote for your logistics needs
          </p>
          <Link href="/#contact" className="btn btn-primary w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
