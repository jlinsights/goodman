'use client';

import Link from 'next/link';
import { useTranslations } from '@/contexts/LanguageContext';

export default function GSASection() {
  const t = useTranslations('gsa');

  const routes = [
    { key: 'la', label: 'Seoul-LA' },
    { key: 'nyc', label: 'Seoul-NYC' },
    { key: 'frankfurt', label: 'Seoul-Frankfurt' },
    { key: 'singapore', label: 'Seoul-Singapore' },
  ];

  return (
    <section className="section-md gradient-primary text-white">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="display-serif text-white text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            {t('title')}
          </h2>
          <p className="text-base md:text-xl text-gray-200 mb-3 md:mb-4">
            {t('subtitle')}
          </p>
          <p className="text-sm md:text-base text-gray-300 mb-8 md:mb-10 px-4">
            {t('description')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
            {routes.map((route, index) => (
              <div
                key={route.key}
                className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 md:p-4 hover-lift-glow animate-pulse-glow opacity-0 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="text-accent-foreground font-bold text-sm md:text-lg">
                  {t(`routes.${route.key}`) || route.label}
                </div>
                <div className="text-xs md:text-sm text-gray-300 mt-1">
                  {t('routes.dailyService') || 'Daily Service'}
                </div>
              </div>
            ))}
          </div>

          <Link href="/network-solutions" className="btn btn-primary btn-large group">
            <span>{t('cta')}</span>
            <svg 
              className="w-5 h-5 inline-block ml-2 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
