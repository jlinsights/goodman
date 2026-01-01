'use client';

import Link from 'next/link';
import { useTranslations } from '@/contexts/LanguageContext';

interface Service {
  icon: string;
  nameKey: string;
  taglineKey: string;
  descriptionKey: string;
}

export default function ServicesShowcase() {
  const t = useTranslations('services');

  const services: Service[] = [
    {
      icon: '✈️',
      nameKey: 'air.name',
      taglineKey: 'air.tagline',
      descriptionKey: 'air.description',
    },
    {
      icon: '🚢',
      nameKey: 'ocean.name',
      taglineKey: 'ocean.tagline',
      descriptionKey: 'ocean.description',
    },
    {
      icon: '📦',
      nameKey: 'project.name',
      taglineKey: 'project.tagline',
      descriptionKey: 'project.description',
    },
  ];

  return (
    <section className="section-md bg-white">
      <div className="container">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="display-serif text-primary text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-base md:text-xl text-gray-600 mt-3 md:mt-4">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`card hover-lift-glow opacity-0 animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl md:text-2xl mb-2 text-primary font-bold">
                {t(service.nameKey)}
              </h3>
              <p className="text-accent font-semibold mb-3 text-sm md:text-base">
                {t(service.taglineKey)}
              </p>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                {t(service.descriptionKey)}
              </p>
              <Link href="/services" className="btn btn-outline w-full group">
                <span>{t('learnMore') || 'Learn More'}</span>
                <svg 
                  className="w-4 h-4 inline-block ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
