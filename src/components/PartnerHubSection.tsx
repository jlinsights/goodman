'use client';

import Link from 'next/link';
import { useTranslations } from '@/contexts/LanguageContext';

export default function PartnerHubSection() {
  const t = useTranslations('partnerHub');

  const features = [
    { key: 'agentZone', icon: '✓' },
    { key: 'marketInsights', icon: '✓' },
    { key: 'dedicatedManagement', icon: '✓' },
  ];

  return (
    <section className="section-md bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="card card-gradient">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h2 className="display-serif text-primary text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
                  {t('title')}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-3 md:mb-4">
                  {t('subtitle')}
                </p>
                <ul className="space-y-2 md:space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <li key={feature.key} className={`flex items-start gap-2 md:gap-3 opacity-0 animate-fade-in-up stagger-${index + 2}`}>
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeDasharray="100"
                        style={{
                          animation: `checkmark-draw 0.5s ease-out ${0.3 + index * 0.2}s forwards`,
                          strokeDashoffset: 100
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base">
                        {t(feature.key)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/partner-hub" className="btn btn-secondary btn-large w-full md:w-auto group">
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
              <div className="hidden md:block">
                <div className="aspect-square bg-gradient-primary rounded-lg flex items-center justify-center group">
                  <svg
                    className="w-24 h-24 md:w-32 md:h-32 text-accent-foreground transition-transform duration-700 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
