'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QuickToolsBar() {
  const [showRateInquiry, setShowRateInquiry] = useState(false);

  return (
    <>
      <div className="bg-gradient-primary text-white py-3.5 sticky top-0 z-50 shadow-lg">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setShowRateInquiry(true)}
                className="flex items-center gap-2.5 hover:text-orange-300 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="hidden md:inline">Rate Inquiry</span>
                <span className="md:hidden">Rate</span>
              </button>
              
              <Link href="#track-trace" className="flex items-center gap-2.5 hover:text-orange-300 transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline">Track & Trace</span>
                <span className="md:hidden">Track</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm opacity-90">24/7 Support</span>
              <a 
                href="tel:+82" 
                className="flex items-center gap-2 px-4 py-1.5 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Inquiry Modal */}
      {showRateInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4" onClick={() => setShowRateInquiry(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowRateInquiry(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary-900)' }}>Request a Rate Quote</h3>
            <p className="text-gray-600 mb-8">Get competitive rates for your shipment within 24 hours</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Service Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors">
                    <option>Air Freight</option>
                    <option>Ocean Freight</option>
                    <option>Project Cargo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Shipment Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors">
                    <option>Import</option>
                    <option>Export</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Origin</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" placeholder="City, Country" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Destination</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" placeholder="City, Country" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Cargo Details</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" rows={3} placeholder="Weight, dimensions, commodity..."></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Company</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone (with country code)</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary btn-large w-full mt-6">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
