'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');

  const navItems = [
    { label: t('networkSolutions'), href: '/network-solutions' },
    { label: t('services'), href: '/services' },
    { label: t('partnerHub'), href: '/partner-hub' },
    { label: t('company'), href: '/company' },
    { label: t('contact'), href: '/#contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-12 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight" style={{ color: 'var(--color-primary-900)' }}>
                GOODMAN
              </span>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-accent-orange)' }}>
                GLS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative font-semibold text-gray-700 hover:text-orange-500 transition-colors group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <LanguageToggle />
              <Link 
                href="/partner-hub#login" 
                className="px-5 py-2.5 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Partner Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 px-4 font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 pb-2 px-4 space-y-3 border-t border-gray-200 mt-4">
              <LanguageToggle />
              <Link 
                href="/partner-hub#login" 
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Partner Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
