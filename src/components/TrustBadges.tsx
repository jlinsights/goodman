'use client';

import { useTranslations } from '@/contexts/LanguageContext';

export default function TrustBadges() {
  const t = useTranslations('trust');

  const memberships = [
    { name: 'WCA', desc: t('wca') },
    { name: 'MPL', desc: t('mpl') },
    { name: 'EAN', desc: t('ean') },
    { name: 'IATA', desc: t('iata') },
  ];

  return (
    <div className="bg-gray-50 py-8 md:py-10 border-y border-gray-200">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider w-full md:w-auto text-center">
            {t('subtitle')}
          </span>
          {memberships.map((member) => (
            <div key={member.name} className="trust-badge hover-lift">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-primary-700)' }}>
                  {member.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">{member.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
