import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="gradient-primary text-white">
      <div className="container py-12 md:py-16 lg:py-20 px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">GOODMAN GLS</h3>
              <p className="text-lg md:text-xl text-orange-400 font-semibold mb-4 md:mb-6">
                Your Strategic Partner in Korea & Beyond
              </p>
            </div>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
              Connecting global trade with velocity, trust, and expertise since 2004. 
              We deliver mission-critical logistics solutions across air, ocean, and project cargo.
            </p>
            
            {/* Social/Contact Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <a 
                href="mailto:contact@goodmangls.com" 
                className="px-5 md:px-6 py-2.5 md:py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 text-sm font-semibold text-center"
              >
                Email Us
              </a>
              <a 
                href="/#contact" 
                className="px-5 md:px-6 py-2.5 md:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 text-sm font-semibold text-center"
              >
                Get Quote
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-300">
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/network-solutions" className="hover:text-orange-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Network & Solutions
                </Link>
              </li>
              <li>
                <Link href="/partner-hub" className="hover:text-orange-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Partner Hub
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-orange-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-white">Contact</h4>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-300">
              <li className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Seoul, Republic of Korea</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@goodmangls.com" className="hover:text-orange-400 transition-colors break-all">
                  contact@goodmangls.com
                </a>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-orange-400 font-semibold text-sm md:text-base">Mon-Fri 9:00-18:00 KST</div>
                  <div className="text-xs md:text-sm mt-1">Emergency: 24/7</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Memberships */}
        <div className="border-t border-white border-opacity-20 pt-8 md:pt-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs md:text-sm">
            <span className="font-semibold text-gray-300">Proud Member of:</span>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <span className="px-4 md:px-5 py-2 md:py-2.5 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all rounded-lg font-semibold text-xs md:text-sm">WCA</span>
              <span className="px-4 md:px-5 py-2 md:py-2.5 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all rounded-lg font-semibold text-xs md:text-sm">MPL</span>
              <span className="px-4 md:px-5 py-2 md:py-2.5 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all rounded-lg font-semibold text-xs md:text-sm">EAN</span>
              <span className="px-4 md:px-5 py-2 md:py-2.5 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all rounded-lg font-semibold text-xs md:text-sm">IATA Certified</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs md:text-sm text-gray-400 border-t border-white border-opacity-20 pt-6 md:pt-8">
          <p>&copy; 2025 GOODMAN Global Logistics Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
